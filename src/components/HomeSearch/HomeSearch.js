import styles from "./HomeSearch.module.css";
import MenuIcon from "../MenuIcon/MenuIcon";
import PixilyLogo from "../PixilyLogo/PixilyLogo";
import SearchBar from "../SearchBar/SearchBar";
import HeartIcon from "../HeartIcon/HeartIcon";

const HomeSearch = ({
  onShowMenu,
  setIsPhotoLoading,
  fetchPhotos,
  showAlertHandler,
}) => {
  return (
    <section className={styles["homesearch"]}>
      <div className={styles["homesearch-header"]}>
        <PixilyLogo />
        <MenuIcon onShowMenu={onShowMenu} />
      </div>
      <div className={styles["homesearch-tagline"]}>
        Pixel Perfect Photos For Everyone
      </div>
      <div className={styles["homesearch-input"]}>
        <p className={styles["homesearch-input__label"]}>
          Search the pixily of anything
        </p>
        <SearchBar
          setIsPhotoLoading={setIsPhotoLoading}
          showAlertHandler={showAlertHandler}
          fetchPhotos={fetchPhotos}
          isHomeSearch={true}
        />
      </div>
      <p className={styles["homesearch-footer"]}>
        Made with <HeartIcon fill={"#2c2c2c"} fillOpacity={"1"} /> by{" "}
        <a
          href="https://www.linkedin.com/in/vaibhav-sharma-front-end/"
          target="_blank"
          rel="noreferrer"
        >
          Vaibhav
        </a>
      </p>
    </section>
  );
};

export default HomeSearch;
