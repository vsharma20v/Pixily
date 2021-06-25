import styles from "./HomePhotoGrid.module.css";
import Photos from "../Photos/Photos";
import useFetchRandomPhotos from "../../hooks/useFetchRandomPhotos";

const GRID_CELLS_HEIGHT = [
  9, 7, 5, 7, 5, 9, 5, 7, 7, 5, 7, 5, 7, 5, 7, 9, 9, 7, 5, 5, 7, 7, 5, 7, 6, 5,
  8, 8, 7,
];

const HomePhotoGrid = () => {
  const { photos, error, isLoading } = useFetchRandomPhotos();

  return (
    <section className={styles["homephotogrid"]}>
      {error && (
        <p className={styles["homephotogrid-error__message"]}>{error}</p>
      )}
      {!error && (
        <div className={styles["homephotogrid-container"]}>
          <Photos
            isDataLoading={isLoading}
            gridCellsHeight={GRID_CELLS_HEIGHT}
            photos={photos}
            isHomePage={true}
            isFavouritesPage={false}
          />
        </div>
      )}
    </section>
  );
};

export default HomePhotoGrid;
