import styles from "./Photo.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthProvider";
import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import HeartIcon from "../HeartIcon/HeartIcon";

let setTimeOutInstance = null;
let abortController = null;

const Photo = ({
  isDataLoading,
  isHomePage,
  photo,
  cellHeight,
  isFavouritesPage,
  updateFavouritePhotos,
  signInHandler,
  showAlertHandler,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);

  const authContext = useContext(AuthContext);
  const { currentUser, writeUserFavourite } = authContext;

  useEffect(() => {
    if (loaded === total && total !== 0) {
      setTimeOutInstance = setTimeout(() => {
        setLoaded((loaded) => 0);
        setTotal((total) => 0);
      }, 2000);
    }
    return () => {
      clearTimeout(setTimeOutInstance);
    };
  }, [total, loaded]);

  const imageLoadHandler = () => {
    setIsImageLoaded(true);
  };

  const favouriteHandler = () => {
    if (currentUser) {
      writeUserFavourite(currentUser.id, photo);
      showAlertHandler("Added to favourites successfully");
    } else {
      signInHandler();
    }
  };
  const favouriteRemoveHandler = () => {
    if (currentUser) {
      writeUserFavourite(currentUser.id, photo, "REMOVE");
      updateFavouritePhotos(photo);
      showAlertHandler("Removed from favourites successfully");
    } else {
      signInHandler();
    }
  };

  const downloadHandler = () => {
    showAlertHandler("Starting download");
    clearTimeout(setTimeOutInstance);
    abortController?.abort();
    let contentLength = 0;
    let total = 0;
    const url = `https://api.unsplash.com/photos/${photo.id}/download?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
    abortController = new AbortController();
    fetch(url, { signal: abortController.signal })
      .then((res) => res.json())
      .then((res) => fetch(res.url))
      .then((res) => {
        contentLength = res.headers.get("content-length");
        total = parseInt(contentLength, 10);
        let loaded = 0;
        const response = new Response(
          new ReadableStream({
            async start(controller) {
              const reader = res.body.getReader();
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                loaded += value.byteLength;
                setLoaded(loaded);
                setTotal(total);
                controller.enqueue(value);
              }
              controller.close();
            },
          })
        );
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.download = "photo.jpeg";
        document.body.appendChild(link);
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        document.body.removeChild(link);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          showAlertHandler(err.message);
        }
      });
  };

  if (isHomePage) {
    const { id, src, alt } = photo;
    return (
      <li
        className={`${styles["photo"]} ${
          isImageLoaded && styles["box-shadow"]
        } ${styles[cellHeight]}`}
      >
        <div id={id} className={styles["photo-img__container"]}>
          <img
            src={src}
            alt={alt}
            className={styles["photo-img"]}
            onLoad={imageLoadHandler}
            style={{
              visibility: isDataLoading ? "hidden" : "visible",
              opacity: isImageLoaded ? 1 : 0,
            }}
          />
        </div>
      </li>
    );
  }

  const { id, urls, alt, userName, userLink } = photo;

  return (
    <li
      className={`${styles["photo"]} ${isImageLoaded && styles["box-shadow"]} ${
        styles[cellHeight]
      }`}
    >
      <ProgressBar loaded={loaded} total={total} />
      {!isFavouritesPage && (
        <button
          className={styles["photo-favourite__btn"]}
          onClick={favouriteHandler}
          title="Add to favourites"
          style={{
            visibility: isDataLoading ? "hidden" : "visible",
            opacity: isImageLoaded ? 1 : 0,
          }}
        >
          <HeartIcon fill={"#f8f8f8"} fillOpacity={"1"} />
        </button>
      )}
      {isFavouritesPage && (
        <button
          className={styles["photo-favourite__remove-btn"]}
          onClick={favouriteRemoveHandler}
          title="Remove from favourites"
          style={{
            visibility: isDataLoading ? "hidden" : "visible",
            opacity: isImageLoaded ? 1 : 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M1 17L17 1M17 17L1 1"
              stroke="#f8f8f8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      <div id={id} className={styles["photo-img__container"]}>
        <img
          src={urls.regular}
          alt={alt}
          className={styles["photo-img"]}
          onLoad={imageLoadHandler}
          style={{
            visibility: isDataLoading ? "hidden" : "visible",
            opacity: isImageLoaded ? 1 : 0,
          }}
          loading="lazy"
        />
      </div>
      <div
        className={styles["photo-username"]}
        style={{
          visibility: isDataLoading ? "hidden" : "visible",
          opacity: isImageLoaded ? 1 : 0,
        }}
      >
        <a href={userLink} target="_blank" rel="noreferrer">
          {userName}
        </a>
      </div>
      <button
        className={styles["photo-download_btn"]}
        onClick={downloadHandler}
        title="Download photo"
        style={{
          visibility: isDataLoading ? "hidden" : "visible",
          opacity: isImageLoaded ? 1 : 0,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.59 7.09L10 9.67V0H8V9.67L5.41 7.09L4 8.5L9 13.5L14 8.5L12.59 7.09ZM16 16V9H18V16C18 17.1 17.1 18 16 18H2C0.9 18 0 17.1 0 16V9H2V16H16Z"
            fill="#f8f8f8"
            fillOpacity="1"
          />
        </svg>
      </button>
    </li>
  );
};

export default React.memo(Photo);
