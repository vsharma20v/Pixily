import styles from "./Favourites.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthProvider";
import { Link } from "react-router-dom";
import MenuIcon from "../../components/MenuIcon/MenuIcon";
import Photos from "../../components/Photos/Photos";
import PixilyLogo from "../../components/PixilyLogo/PixilyLogo";
import { SearchContext } from "../../store/SearchProvider";

const GRID_CELLS_HEIGHT = [
  7, 7, 5, 9, 5, 9, 9, 5, 5, 7, 7, 9, 9, 5, 9, 7, 5, 7, 7, 5,
];

const Favourites = ({
  onShowMenu,
  isPhotoLoading,
  setIsPhotoLoading,
  showAlertHandler,
}) => {
  const [photos, setPhotos] = useState([]);

  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;
  const searchContext = useContext(SearchContext);
  const { resetAll } = searchContext;

  const updateFavouritePhotos = (photo) => {
    const updatedPhotos = photos.filter((p) => p.id !== photo.id);
    setPhotos(updatedPhotos);
  };

  useEffect(() => {
    if (currentUser) {
      resetAll();
      const data = [];
      const dataObject = currentUser.favourite;
      for (const key in dataObject) {
        data.push({ ...dataObject[key] });
      }
      if (data.length > GRID_CELLS_HEIGHT.length) {
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
      } else {
        let difference = GRID_CELLS_HEIGHT.length - data.length;
        while (difference > 0) {
          GRID_CELLS_HEIGHT.pop();
          difference--;
        }
      }
      setPhotos(data);
      setIsPhotoLoading(false);
    }
    return () => {
      setIsPhotoLoading(true);
    };
  }, [currentUser, setIsPhotoLoading, resetAll]);

  return (
    <main className={styles["favourites"]}>
      <section className={styles["favourites-header"]}>
        <Link to="/" className={styles["favourites-header__logo-link"]}>
          <PixilyLogo />
          <div className={styles["favourites-header__logo-tagline"]}>
            Pixel Perfect Photos For Everyone
          </div>
        </Link>
        <MenuIcon onShowMenu={onShowMenu} />
      </section>
      <section>
        <p className={styles["favourites-term"]}>Your Favourites</p>
        <Photos
          isDataLoading={isPhotoLoading}
          gridCellsHeight={GRID_CELLS_HEIGHT}
          isHomePage={false}
          isFavouritesPage={true}
          photos={photos}
          updateFavouritePhotos={updateFavouritePhotos}
          showAlertHandler={showAlertHandler}
        />
        {photos.length === 0 && isPhotoLoading === false && (
          <p className={styles["favourites-noresult__message"]}>
            No favourite pixily found.
          </p>
        )}
      </section>
    </main>
  );
};

export default Favourites;
