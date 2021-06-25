import React, { useReducer } from "react";

const defaultSearchState = {
  photos: [],
  searchTerm: "",
  hasMore: false,
  pageNumber: 1,
};

const removeDuplicate = (arr) => {
  return arr.filter(
    (element, index, self) =>
      index === self.findIndex((t) => t.id === element.id)
  );
};

export const SearchContext = React.createContext({
  photos: [],
  searchTerm: "",
  hasMore: false,
  pageNumber: 1,
  setPhotos: (value) => {},
  setSearchTerm: (value) => {},
  setHasMore: (value) => {},
  incrementPageNumber: (value) => {},
  resetAll: (value) => {},
});

const searchReducer = (state, action) => {
  let updatedSearchState = null;
  if (action.type === "UPDATE PHOTOS") {
    updatedSearchState = {
      photos: removeDuplicate([...state.photos, ...action.photos]),
      searchTerm: state.searchTerm,
      hasMore: state.hasMore,
      pageNumber: state.pageNumber,
    };
  } else if (action.type === "UPDATE SEARCHTERM") {
    updatedSearchState = {
      photos: state.photos,
      searchTerm: action.searchTerm,
      hasMore: state.hasMore,
      pageNumber: state.pageNumber,
    };
  } else if (action.type === "UPDATE HASMORE") {
    updatedSearchState = {
      photos: state.photos,
      searchTerm: state.searchTerm,
      hasMore: action.hasMore,
      pageNumber: state.pageNumber,
    };
  } else if (action.type === "INCREMENT PAGENUMBER") {
    updatedSearchState = {
      photos: state.photos,
      searchTerm: state.searchTerm,
      hasMore: state.hasMore,
      pageNumber: state.pageNumber + action.pageNumber,
    };
  } else if (action.type === "RESET ALL") {
    updatedSearchState = defaultSearchState;
  }
  return updatedSearchState;
};

const SearchProvider = (props) => {
  const [searchState, dispatchSearchAction] = useReducer(
    searchReducer,
    defaultSearchState
  );

  const setSearchTerm = (value) => {
    dispatchSearchAction({
      type: "UPDATE SEARCHTERM",
      searchTerm: value,
    });
  };

  const setPhotos = (value) => {
    dispatchSearchAction({
      type: "UPDATE PHOTOS",
      photos: value,
    });
  };

  const setHasMore = (value) => {
    dispatchSearchAction({
      type: "UPDATE HASMORE",
      hasMore: value,
    });
  };

  const incrementPageNumber = () => {
    dispatchSearchAction({
      type: "INCREMENT PAGENUMBER",
      pageNumber: 1,
    });
  };

  const resetAll = () => {
    dispatchSearchAction({
      type: "RESET ALL",
    });
  };

  const searchContext = {
    photos: searchState.photos,
    searchTerm: searchState.searchTerm,
    hasMore: searchState.hasMore,
    pageNumber: searchState.pageNumber,
    setPhotos: setPhotos,
    setSearchTerm: setSearchTerm,
    setHasMore: setHasMore,
    incrementPageNumber: incrementPageNumber,
    resetAll: resetAll,
  };

  return (
    <SearchContext.Provider value={searchContext}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
