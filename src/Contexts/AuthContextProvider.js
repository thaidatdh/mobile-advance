import React, { useState } from "react";
import {
  usersData,
  searchHistoryData,
  coursesData,
  authorsData,
} from "../data/dataMockup";
export const AuthContext = React.createContext(null);

export default ({ children }) => {
  const [user, setUser] = useState();
  const [searchHistory, setSearchHistory] = useState(searchHistoryData);
  const [downloaded, setDownloaded] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const login = (username, password) => {
    let user = usersData.find(
      (e) => e.username == username && e.password == password
    );
    if (user) {
      setUser(user);
    }
  };
  const logout = () => {
    setUser(null);
    setBookmark([]);
    setDownloaded([]);
  };
  const addDownloaded = (course) => {
    let newDownloaded = downloaded.splice().push(course);
    setDownloaded(newDownloaded);
  };
  const removeDownloaded = (course) => {
    let newDownloaded = downloaded.filter((e) => e !== course);
    setDownloaded(newDownloaded);
  };
  const removeAllDownloaded = () => {
    setDownloaded([]);
  };
  const addBookmark = (course) => {
    let newBookmark = bookmark.splice().push(course);
    setBookmark(newBookmark);
  };
  const removeBookmark = (course) => {
    let newBookmark = bookmark.filter((e) => e !== course);
    setBookmark(newBookmark);
  };
  const addSearchHistory = (searchValue) => {
    let newSearchHistory = searchHistory.splice().push(searchValue);
    setSearchHistory(newSearchHistory);
  };
  const removeSearchHistory = (searchValue) => {
    let newSearchHistory = searchHistory.filter((e) => e !== searchValue);
    setSearchHistory(newSearchHistory);
  };
  const removeAllSearchHistory = () => {
    setSearchHistory([]);
  };
  const store = {
    user,
    searchHistory,
    downloaded,
    bookmark,
    login: login,
    logout: logout,
    addDownloaded: addDownloaded,
    removeDownloaded: removeDownloaded,
    removeAllDownloaded: removeAllDownloaded,
    addBookmark: addBookmark,
    removeBookmark: removeBookmark,
    addSearchHistory: addSearchHistory,
    removeAllSearchHistory: removeAllSearchHistory,
    removeSearchHistory: removeSearchHistory,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
