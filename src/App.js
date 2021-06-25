import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "./store/SearchProvider";
import { AuthContext } from "./store/AuthProvider";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Search from "./pages/Search/Search";
import Favourites from "./pages/Favourites/Favourites";
import Spinner from "./components/Spinner/Spinner";
import Alert from "./components/Alert/Alert";

let setTimeOutInstance = null;
const URL = `https://api.unsplash.com/search/photos?per_page=20&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&`;
let GRID_CELLS_HEIGHT = [
  7, 7, 5, 9, 5, 9, 9, 5, 5, 7, 7, 9, 9, 5, 9, 7, 5, 7, 7, 5,
];

const App = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const searchContext = useContext(SearchContext);
  const { searchTerm, pageNumber, incrementPageNumber, setHasMore, setPhotos } =
    searchContext;
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;

  const hideMenuHandler = () => {
    setIsMenuVisible(false);
  };

  const showMenuHandler = () => {
    setIsMenuVisible(true);
  };

  const hideFormHandler = () => {
    setIsFormVisible(false);
  };

  const showFormHandler = () => {
    setIsFormVisible(true);
  };

  const signInHandler = () => {
    hideMenuHandler();
    showFormHandler();
    setIsSignUpVisible(false);
    setIsSignInVisible(true);
  };
  const signUpHandler = () => {
    hideMenuHandler();
    showFormHandler();
    setIsSignInVisible(false);
    setIsSignUpVisible(true);
  };

  const showLoaderHandler = () => {
    setShowLoader(true);
  };
  const hideLoaderHandler = () => {
    setShowLoader(false);
  };

  const showAlertHandler = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  const hideAlertHandler = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const fetchPhotos = (term, pageNo) => {
    const abortController = new AbortController();
    if (pageNo) {
      GRID_CELLS_HEIGHT = [
        7, 7, 5, 9, 5, 9, 9, 5, 5, 7, 7, 9, 9, 5, 9, 7, 5, 7, 7, 5,
      ];
    } else {
      GRID_CELLS_HEIGHT.push(
        7,
        7,
        5,
        9,
        5,
        9,
        9,
        5,
        5,
        7,
        7,
        9,
        9,
        5,
        9,
        7,
        5,
        7,
        7,
        5
      );
    }
    const url = URL + `query=${term}&page=${pageNo ? pageNo : pageNumber}`;
    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong! Couldn't fetch the photos.");
        }
        return res.json();
      })
      .then((data) => {
        const modifiedData = data.results.map((d) => ({
          id: d.id,
          alt: d.alt_description,
          urls: d.urls,
          userLink: d.user.links.html,
          userName: d.user.name,
        }));
        setHasMore(data.results.length > 0);
        setPhotos(modifiedData);
        setError("");
        setIsPhotoLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
          if (!navigator.onLine) {
            showAlertHandler("You are offline. Check your connection.");
          }
          setIsPhotoLoading(false);
        }
      });
    incrementPageNumber();
    return abortController;
  };

  useEffect(() => {
    if (alertMessage) {
      setTimeOutInstance = setTimeout(() => {
        hideAlertHandler();
      }, 1500);
    }
    return () => {
      clearTimeout(setTimeOutInstance);
    };
  }, [alertMessage]);

  return (
    <BrowserRouter>
      <Layout
        isMenuVisible={isMenuVisible}
        onHideMenu={hideMenuHandler}
        signInHandler={signInHandler}
        signUpHandler={signUpHandler}
        hideFormHandler={hideFormHandler}
        isFormVisible={isFormVisible}
        isSignInVisible={isSignInVisible}
        isSignUpVisible={isSignUpVisible}
        showLoaderHandler={showLoaderHandler}
        hideLoaderHandler={hideLoaderHandler}
        showAlertHandler={showAlertHandler}
      >
        <Switch>
          <Route exact path="/">
            <Home
              onShowMenu={showMenuHandler}
              setIsPhotoLoading={setIsPhotoLoading}
              showAlertHandler={showAlertHandler}
              fetchPhotos={fetchPhotos}
            />
          </Route>
          <Route exact path="/search">
            {searchTerm ? (
              <Search
                onShowMenu={showMenuHandler}
                isPhotoLoading={isPhotoLoading}
                setIsPhotoLoading={setIsPhotoLoading}
                signInHandler={signInHandler}
                showAlertHandler={showAlertHandler}
                error={error}
                gridCellsHeight={GRID_CELLS_HEIGHT}
                fetchPhotos={fetchPhotos}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/favourites">
            {currentUser ? (
              <Favourites
                onShowMenu={showMenuHandler}
                isPhotoLoading={isPhotoLoading}
                setIsPhotoLoading={setIsPhotoLoading}
                showAlertHandler={showAlertHandler}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
      <Spinner isVisible={showLoader} />
      <Alert isVisible={showAlert} onHide={hideAlertHandler}>
        {alertMessage}
      </Alert>
    </BrowserRouter>
  );
};

export default App;
