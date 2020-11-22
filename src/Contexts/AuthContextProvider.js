import React, { useState } from "react";
import {
  usersData,
  searchHistoryData,
  coursesData,
  authorsData,
  defaultSetting,
} from "../data/dataMockup";
export const AuthContext = React.createContext(null);

export default ({ children }) => {
  const [user, setUser] = useState(usersData[0]);
  const [searchHistory, setSearchHistory] = useState(searchHistoryData);
  const [downloaded, setDownloaded] = useState([]);
  const [bookmark, setBookmark] = useState(coursesData.slice(0, 3));
  const [settings, setSettings] = useState(defaultSetting);
  const [channel, setChannel] = useState(coursesData.slice(5, 7));
  const login = (username, password) => {
    let user = usersData.find(
      (e) => e.username == username && e.password == password
    );
    if (user) {
      setUser(user);
      return "";
    } else {
      return "Username or Password is incorrect!";
    }
  };
  const logout = () => {
    setUser(null);
    setBookmark([]);
    setDownloaded([]);
  };
  const addDownloaded = (course) => {
    let newDownloaded = downloaded.slice().concat(course);
    setDownloaded(newDownloaded);
  };
  const removeDownloaded = (course) => {
    let newDownloaded = downloaded.filter((e) => e !== course);
    setDownloaded(newDownloaded);
  };
  const removeAllDownloaded = () => {
    setDownloaded([]);
  };
  const isDownloaded = (courseTitle) => {
    const course = downloaded.find((e) => e.title === courseTitle);
    if (course) {
      return true;
    }
    return false;
  };
  const addBookmark = (course) => {
    let newBookmark = bookmark.slice().concat(course);
    setBookmark(newBookmark);
  };
  const removeBookmark = (course) => {
    let newBookmark = bookmark.filter((e) => e !== course);
    setBookmark(newBookmark);
  };
  const isBookmarked = (courseTitle) => {
    const bookmarked = bookmark.find((e) => e.title === courseTitle);
    if (bookmarked) {
      return true;
    }
    return false;
  };
  const addChannel = (course) => {
    let newChannel = channel.slice().concat(course);
    setChannel(newChannel);
  };
  const removeChannel = (course) => {
    let newChannel = channel.filter((e) => e !== course);
    setChannel(newChannel);
  };
  const isChanneled = (courseTitle) => {
    const channeled = channel.find((e) => e.title === courseTitle);
    if (channeled) {
      return true;
    }
    return false;
  };
  const addSearchHistory = (searchValue) => {
    let newSearchHistory = searchHistory.slice().concat(searchValue);
    setSearchHistory(newSearchHistory);
  };
  const removeSearchHistory = (searchValue) => {
    let newSearchHistory = searchHistory
      .slice()
      .filter((e) => e !== searchValue);
    setSearchHistory(newSearchHistory);
  };
  const removeAllSearchHistory = () => {
    setSearchHistory([]);
  };
  const updateSetting = (title, updateAttribute) => {
    var index = settings.findIndex((x) => x.title === title);
    if (index !== -1) {
      setSettings([
        ...settings.slice(0, index),
        Object.assign({}, settings[index], updateAttribute),
        ...settings.slice(index + 1),
      ]);
    }
  };
  const store = {
    user,
    searchHistory,
    downloaded,
    bookmark,
    channel,
    settings,
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
    updateSetting: updateSetting,
    addChannel: addChannel,
    removeChannel: removeChannel,
    isBookmarked,
    isChanneled,
    isDownloaded,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
