import styles from "./Search.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../store/SearchProvider";
import SearchBar from "../../components/SearchBar/SearchBar";
import Photos from "../../components/Photos/Photos";
import PixilyLogo from "../../components/PixilyLogo/PixilyLogo";
import MenuIcon from "../../components/MenuIcon/MenuIcon";

const Search = ({
  onShowMenu,
  setIsPhotoLoading,
  isPhotoLoading,
  error,
  signInHandler,
  showAlertHandler,
  fetchPhotos,
  gridCellsHeight,
}) => {
  const searchContext = useContext(SearchContext);
  const { searchTerm, photos } = searchContext;
  return (
    <main className={styles["search"]}>
      <section className={styles["search-header"]}>
        <Link to="/" className={styles["search-header__logo-link"]}>
          <PixilyLogo />
          <div className={styles["search-header__logo-tagline"]}>
            Pixel Perfect Photos For Everyone
          </div>
        </Link>
        <MenuIcon onShowMenu={onShowMenu} />
      </section>
      <section className={styles["search-searchbar"]}>
        <SearchBar
          setIsPhotoLoading={setIsPhotoLoading}
          showAlertHandler={showAlertHandler}
          fetchPhotos={fetchPhotos}
          isHomeSearch={false}
        />
      </section>
      <section>
        <p className={styles["search-term"]}>{searchTerm}</p>
        {error && <p className={styles["search-error__message"]}>{error}</p>}
        {!error && (
          <Photos
            isDataLoading={isPhotoLoading}
            gridCellsHeight={gridCellsHeight}
            isHomePage={false}
            isFavouritesPage={false}
            photos={photos}
            signInHandler={signInHandler}
            showAlertHandler={showAlertHandler}
            fetchPhotos={fetchPhotos}
          />
        )}
        {!error && photos.length === 0 && isPhotoLoading === false && (
          <p className={styles["search-noresult__message"]}>No pixily found.</p>
        )}
      </section>
    </main>
  );
};

export default Search;
