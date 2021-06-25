import styles from "./Photos.module.css";
import Photo from "../Photo/Photo";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from "react";
import { SearchContext } from "../../store/SearchProvider";

const Photos = ({
  gridCellsHeight,
  isDataLoading,
  photos,
  isHomePage,
  isFavouritesPage,
  updateFavouritePhotos,
  signInHandler,
  showAlertHandler,
  fetchPhotos,
}) => {
  const searchContext = useContext(SearchContext);
  const { hasMore, searchTerm } = searchContext;

  if (isHomePage || isFavouritesPage) {
    return (
      <ul
        className={`${styles["photos"]} ${
          isHomePage ? styles["photos-homepage"] : ""
        }`} 
      >
        {photos.map((photo, index) => (
          <Photo
            isDataLoading={isDataLoading}
            isHomePage={isHomePage}
            isFavouritesPage={isFavouritesPage}
            key={photo.id}
            photo={photo}
            cellHeight={`span-${gridCellsHeight[index]}`}
            updateFavouritePhotos={updateFavouritePhotos}
            signInHandler={signInHandler}
            showAlertHandler={showAlertHandler}
          />
        ))}
      </ul>
    );
  }
  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={() => fetchPhotos(searchTerm)}
      hasMore={hasMore}
    >
      <ul className={styles["photos"]}>
        {photos.map((photo, index) => (
          <Photo
            isDataLoading={isDataLoading}
            isHomePage={isHomePage}
            isFavouritesPage={isFavouritesPage}
            key={photo.id}
            photo={photo}
            cellHeight={`span-${gridCellsHeight[index]}`}
            updateFavouritePhotos={updateFavouritePhotos}
            signInHandler={signInHandler}
            showAlertHandler={showAlertHandler}
          />
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default Photos;
