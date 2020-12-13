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
  const [usersList, setUsersList] = useState(usersData);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [searchHistory, setSearchHistory] = useState(searchHistoryData);
  const [downloaded, setDownloaded] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [settings, setSettings] = useState(defaultSetting);
  const [channel, setChannel] = useState([]);
  const login = async (email, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    try {
      let resLogin = await fetch(
        "http://api.dev.letstudy.org/user/login",
        requestOptions
      );
      let responseLogin = await resLogin.json();
      if (responseLogin.error || responseLogin.message != "OK") {
        return responseLogin.message;
      }
      setUser(responseLogin.userInfo);
      setToken("Bearer " + responseLogin.token);

      const requestOptionsUser = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + responseLogin.token,
        },
      };
      fetch(
        "http://api.dev.letstudy.org/user/get-favorite-courses",
        requestOptionsUser
      )
        .then((resBookmark) => resBookmark.json())
        .then((responseBookmark) => {
          if (responseBookmark.payload !== undefined)
            setBookmark(responseBookmark.payload);
          else setBookmark([]);
        })
        .catch((err) => console.log(err));
      fetch(
        "http://api.dev.letstudy.org/user/get-process-courses",
        requestOptionsUser
      )
        .then((resProcess) => resProcess.json())
        .then((responseProcess) => {
          if (responseProcess.payload !== undefined)
            setChannel(responseProcess.payload);
          else setChannel([]);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      return err.message;
    }
    return "";
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    setBookmark([]);
    setChannel([]);
  };
  const register = async (user) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        username: user.username,
        phone: user.phone,
      }),
    };
    try {
      let res = await fetch(
        "http://api.dev.letstudy.org/user/register",
        requestOptions
      );
      let response = await res.json();

      if (response.message != "OK") {
        return response.message;
      } else {
        return "";
      }
    } catch (err) {
      console.log(err);
      return err.message;
    }
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
  const getFavoriteCourses = () => {
    const requestOptionsUser = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    fetch(
      "http://api.dev.letstudy.org/user/get-favorite-courses",
      requestOptionsUser
    )
      .then((resBookmark) => resBookmark.json())
      .then((responseBookmark) => {
        if (responseBookmark.payload !== undefined)
          setBookmark(responseBookmark.payload);
        else setBookmark([]);
      })
      .catch((err) => console.log(err));
  };
  const getProcessCourses = () => {
    const requestOptionsUser = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    fetch(
      "http://api.dev.letstudy.org/user/get-process-courses",
      requestOptionsUser
    )
      .then((resProcess) => resProcess.json())
      .then((responseProcess) => {
        if (responseProcess.payload !== undefined)
          setChannel(responseProcess.payload);
        else setChannel([]);
      })
      .catch((err) => console.log(err));
  };
  const addBookmark = async (course_id) => {
    const requestOptionsUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        courseId: course_id,
      }),
    };
    try {
      let res = await fetch(
        "http://api.dev.letstudy.org/user/like-course",
        requestOptionsUser
      );
    } catch (err) {
      console.log(err);
    }
    await getFavoriteCourses();
  };
  const removeBookmark = async (course_id) => {
    const requestOptionsUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        courseId: course_id,
      }),
    };
    try {
      await fetch(
        "http://api.dev.letstudy.org/user/like-course",
        requestOptionsUser
      );
    } catch (err) {
      console.log(err);
    }
    await getFavoriteCourses();
  };
  const isBookmarked = (courseTitle) => {
    const bookmarked = bookmark.find((e) => e.courseTitle === courseTitle);
    if (bookmarked) {
      return true;
    }
    return false;
  };
  const addChannel = async (course_id) => {
    const requestOptionsUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        courseId: course_id,
      }),
    };
    try {
      let res = await fetch(
        "http://api.dev.letstudy.org/payment/get-free-courses",
        requestOptionsUser
      );
      let response = await res.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    await getProcessCourses();
  };
  const removeChannel = (course) => {
    let newChannel = channel.filter((e) => e !== course);
    setChannel(newChannel);
  };
  const isChanneled = (courseTitle) => {
    const channeled = channel.find((e) => e.courseTitle === courseTitle);
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
    token,
    register,
    searchHistory,
    downloaded,
    bookmark,
    channel,
    settings,
    login: login,
    logout: logout,
    addDownloaded,
    removeDownloaded,
    removeAllDownloaded,
    addBookmark,
    removeBookmark,
    addSearchHistory,
    removeAllSearchHistory,
    removeSearchHistory,
    updateSetting,
    addChannel,
    removeChannel,
    isBookmarked,
    isChanneled,
    isDownloaded,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
