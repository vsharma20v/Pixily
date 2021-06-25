import styles from "./SearchBar.module.css";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../../store/SearchProvider";

let controller = null;

const SearchBar = ({
  setIsPhotoLoading,
  showAlertHandler,
  fetchPhotos,
  isHomeSearch,
}) => {
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  const { searchTerm, setSearchTerm, resetAll } = searchContext;
  const [inputSearchValue, setInputSearchValue] = useState(searchTerm);

  const submitHandler = (e) => {
    e.preventDefault();
    document.activeElement.blur();
    setIsPhotoLoading(true);
    const term = inputSearchValue.trim();
    if (term.length > 1) {
      if (term !== searchTerm) {
        resetAll();
        setSearchTerm(term);
        controller = fetchPhotos(term, 1);
      } else {
        setIsPhotoLoading(false);
      }
      if (history.location.pathname !== "/search") {
        history.push(`/search`);
      }
    } else {
      showAlertHandler("Please enter a valid value");
      return;
    }
  };

  const searchInputHandler = (e) => {
    controller?.abort();
    setInputSearchValue(e.target.value);
  };

  return (
    <form onSubmit={submitHandler} className={styles["searchbar-form"]}>
      <div className={styles["searchbar-searchicon"]}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="https://www.w3.org/2000/svg"
        >
          <g
            transform="translate(1 1)"
            stroke="#2c2c2cb3"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="7.5" cy="7.5" r="7.5" />
            <path d="M18 18l-5.2-5.2" />
          </g>
        </svg>
      </div>
      <input
        className={`${styles["searchbar-input"]} ${
          isHomeSearch ? styles["searchbar-input-home"] : ""
        }`}
        value={inputSearchValue}
        type="search"
        name="search"
        id="search"
        placeholder="coffee, laptop, forest ..."
        required
        minLength="2"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="true"
        onChange={searchInputHandler}
      />
    </form>
  );
};

export default SearchBar;
