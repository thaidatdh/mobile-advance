import React, { useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import {
  usersData,
  searchHistoryData,
  coursesData,
  authorsData,
  defaultSetting,
} from "../data/dataMockup";
import ApiServices from "../services/api-services";
import PhoneStorage from "../services/phone-storage";
export const AuthContext = React.createContext(null);

export default ({ children }) => {
  const [usersList, setUsersList] = useState(usersData);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [downloaded, setDownloaded] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [settings, setSettings] = useState(defaultSetting);
  const [channel, setChannel] = useState([]);
  const getFavoriteCourses = () => {
    ApiServices.getFavoriteCourses(token)
      .then((resBookmark) => {
        return resBookmark.json();
      })
      .then((responseBookmark) => {
        if (responseBookmark.payload !== undefined) {
          setBookmark(responseBookmark.payload);
          PhoneStorage.save(
            "@bookmark",
            JSON.stringify(responseBookmark.payload)
          );
        } else {
          setBookmark([]);
        }
      })
      .catch((err) => {
        console.log("err at load fav");
        console.log(err);
        PhoneStorage.load("@bookmark", "json").then((persistBookmark) => {
          if (persistBookmark) {
            setBookmark(persistBookmark);
          } else {
            setBookmark([]);
          }
        });
      });
  };
  const getProcessCourses = () => {
    ApiServices.getProcessCourses(token)
      .then((resProcess) => resProcess.json())
      .then((responseProcess) => {
        if (responseProcess.payload !== undefined) {
          PhoneStorage.save(
            "@processCourses",
            JSON.stringify(responseProcess.payload)
          );
          setChannel(responseProcess.payload);
        } else {
          setChannel([]);
        }
      })
      .catch((err) => {
        console.log("err at load progress");
        console.log(err);
        PhoneStorage.load("@processCourses", "json").then((persistProcess) => {
          if (persistProcess) {
            setChannel(persistProcess);
          } else {
            setChannel([]);
          }
        });
      });
  };
  const login = async (email, password) => {
    try {
      let resLogin = await ApiServices.login(email, password).then();
      let responseLogin = await resLogin.json();
      if (responseLogin.error || responseLogin.message != "OK") {
        return responseLogin.message;
      }
      await setUser(responseLogin.userInfo);
      await setToken("Bearer " + responseLogin.token);
      await PhoneStorage.save("@token", "Bearer " + responseLogin.token);
      await PhoneStorage.save("@user", JSON.stringify(responseLogin.userInfo));
      ApiServices.getFavoriteCourses("Bearer " + responseLogin.token)
        .then((resBookmark) => resBookmark.json())
        .then((responseBookmark) => {
          if (responseBookmark.payload !== undefined) {
            setBookmark(responseBookmark.payload);
            PhoneStorage.save(
              "@bookmark",
              JSON.stringify(responseBookmark.payload)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
      ApiServices.getProcessCourses("Bearer " + responseLogin.token)
        .then((resProcess) => resProcess.json())
        .then((responseProcess) => {
          if (responseProcess.payload !== undefined) {
            setChannel(responseProcess.payload);
            PhoneStorage.save(
              "@processCourses",
              JSON.stringify(responseProcess.payload)
            );
            setChannel(responseProcess.payload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      return err.message;
    }
    return "";
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      PhoneStorage.remove("@token");
      PhoneStorage.remove("@user");
    } catch {}
  };
  const loadPersistUserData = async () => {
    try {
      const oldSettings = await PhoneStorage.load("@settings", "json");
      if (oldSettings) {
        await setSettings(oldSettings);
      }
      const searchHist = await PhoneStorage.load("@searchHist", "json");
      if (searchHist) {
        await setSearchHistory(searchHist);
      }
      const tokenValue = await PhoneStorage.load("@token", "string");
      if (tokenValue != null) await setToken(tokenValue);
      const userInfo = await PhoneStorage.load("@user", "json");
      if (userInfo) {
        await setUser(userInfo);
        try {
          ApiServices.getFavoriteCourses(tokenValue)
            .then((resBookmark) => resBookmark.json())
            .then((responseBookmark) => {
              if (responseBookmark.payload !== undefined)
                setBookmark(responseBookmark.payload);
              else {
                console.log("error load fav");
                NetInfo.fetch().then((state) => {
                  if (!state.isInternetReachable) {
                    PhoneStorage.load("@bookmark", "json").then(
                      (persistBookmark) => {
                        console.log(persistBookmark);
                        if (persistBookmark) {
                          setBookmark(persistBookmark);
                        } else {
                          setBookmark([]);
                        }
                      }
                    );
                  } else {
                    logout();
                  }
                });
              }
            })
            .catch((err) => console.log(err));
          ApiServices.getProcessCourses(tokenValue)
            .then((resProcess) => resProcess.json())
            .then((responseProcess) => {
              if (responseProcess.payload !== undefined)
                setChannel(responseProcess.payload);
              else {
                console.log("error load pro");
                NetInfo.fetch().then((state) => {
                  if (!state.isInternetReachable) {
                    PhoneStorage.load("@processCourses", "json").then(
                      (persistProcess) => {
                        console.log(persistProcess);
                        if (persistProcess) {
                          setChannel(persistProcess);
                        } else {
                          setChannel([]);
                        }
                      }
                    );
                  } else {
                    logout();
                  }
                });
              }
            })
            .catch((err) => console.log(err));
        } catch (err) {
          console.log("err at load");
          console.log(err);
          return err.message;
        }
      }
    } catch (e) {
      console.log("error at load 2");
      console.log(e);
      logout();
      // error reading value
    }
  };
  const register = async (user) => {
    try {
      let res = await ApiServices.register(user);
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
  const addBookmark = async (course_id) => {
    await ApiServices.changeLikeCourse(course_id, token);
    await getFavoriteCourses();
  };
  const removeBookmark = async (course_id) => {
    await ApiServices.changeLikeCourse(course_id, token);
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
    await ApiServices.getFreeCourses(course_id, token);
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
  const addSearchHistory = async (searchValue) => {
    let newSearchHistory = searchHistory.slice().concat(searchValue);
    await setSearchHistory(newSearchHistory);
    PhoneStorage.save("@searchHist", JSON.stringify(searchHistory));
  };
  const removeSearchHistory = async (searchValue) => {
    let newSearchHistory = searchHistory
      .slice()
      .filter((e) => e !== searchValue);
    await setSearchHistory(newSearchHistory);
    PhoneStorage.save("@searchHist", JSON.stringify(searchHistory));
  };
  const removeAllSearchHistory = async () => {
    await setSearchHistory([]);
    PhoneStorage.save("@searchHist", JSON.stringify(searchHistory));
  };
  const updateSetting = async (title, updateAttribute) => {
    var index = settings.findIndex((x) => x.title === title);
    if (index !== -1) {
      setSettings([
        ...settings.slice(0, index),
        Object.assign({}, settings[index], updateAttribute),
        ...settings.slice(index + 1),
      ]);
      await PhoneStorage.save("@settings", JSON.stringify(settings));
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
    loadPersistUserData,
    setUser,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
