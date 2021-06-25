import styles from "./Home.module.css";
import HomeSearch from "../../components/HomeSearch/HomeSearch";
import HomePhotoGrid from "../../components/HomePhotoGrid/HomePhotoGrid";

const Home = ({
  onShowMenu,
  setIsPhotoLoading,
  fetchPhotos,
  showAlertHandler,
}) => {
  return (
    <main className={styles["home"]}>
      <HomeSearch
        onShowMenu={onShowMenu}
        setIsPhotoLoading={setIsPhotoLoading}
        showAlertHandler={showAlertHandler}
        fetchPhotos={fetchPhotos}
      />
      <HomePhotoGrid />
    </main>
  );
};

export default Home;
