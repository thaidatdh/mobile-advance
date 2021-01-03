import react from "react";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { coursesData, authorsData } from "../data/dataMockup";
import ApiServices from "../services/api-services";
import PhoneStorage from "../services/phone-storage";
export const DataContext = React.createContext(null);
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
export default ({ children }) => {
  const [isInternetReachable, setInternetReachable] = useState(true);
  const [courses, setCourses] = React.useState([]);
  const [newReleased, setNewReleased] = React.useState([]);
  const [topSell, setTopSell] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);
  const [recommended, setRecommended] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [searchCourses, setSearchCourses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const loadNewReleased = async () => {
    if (newReleased !== undefined && newReleased.length > 0) {
      return;
    }
    try {
      let res = await ApiServices.getTopNew(10, 1);
      let response = await res.json();
      setNewReleased(response.payload);
      PhoneStorage.save("@newreleased", JSON.stringify(response.payload));
    } catch (err) {
      console.log(err);
      if (!isInternetReachable) {
        PhoneStorage.load("@newreleased", "json").then((persistData) => {
          if (persistData) {
            setNewReleased(persistData);
          } else {
            setNewReleased([]);
          }
        });
      }
    }
  };
  const loadTopSell = async () => {
    if (topSell !== undefined && topSell.length > 0) {
      return;
    }
    try {
      let res = await ApiServices.getTopSell(10, 1);
      let response = await res.json();
      setTopSell(response.payload);
      PhoneStorage.save("@topsell", JSON.stringify(response.payload));
    } catch (err) {
      console.log(err);
      if (!isInternetReachable) {
        PhoneStorage.load("@topsell", "json").then((persistData) => {
          if (persistData) {
            setTopSell(persistData);
          } else {
            setTopSell([]);
          }
        });
      }
    }
  };
  const loadTopRated = async () => {
    if (topRated !== undefined && topRated.length > 0) {
      return;
    }
    try {
      let res = await ApiServices.getTopRated(10, 1);
      let response = await res.json();
      setTopRated(response.payload);
      PhoneStorage.save("@toprated", JSON.stringify(response.payload));
    } catch (err) {
      console.log(err);
      if (!isInternetReachable) {
        PhoneStorage.load("@toprated", "json").then((persistData) => {
          if (persistData) {
            setTopRated(persistData);
          } else {
            setTopRated([]);
          }
        });
      }
    }
  };
  const loadRecommended = async (token, user_id) => {
    if (recommended !== undefined && recommended.length > 0) {
      return;
    }
    try {
      let res = await ApiServices.loadRecommended(token, user_id, 10, 1);
      let response = await res.json();
      setRecommended(response.payload);
    } catch (err) {
      console.log(err);
    }
  };
  const getAuthors = async () => {
    if (authors === undefined || authors.length == 0) {
      loadAuthors();
    }
  };
  const loadCategories = async () => {
    try {
      let res = await ApiServices.getAllCategory();
      let response = await res.json();
      if (response.payload !== undefined) {
        await setCategories(response.payload);
        PhoneStorage.save("@categoryList", JSON.stringify(response.payload));
      }
    } catch (err) {
      console.log(err);
      if (!isInternetReachable) {
        PhoneStorage.load("@categoryList", "json").then((persistData) => {
          if (persistData) {
            setCategories(persistData);
          } else {
            setCategories([]);
          }
        });
      }
    }
  };
  const loadAuthors = async () => {
    try {
      let res = await ApiServices.getAllInstructor();
      let response = await res.json();
      setAuthors(response.payload);
      PhoneStorage.save("@instructorList", JSON.stringify(response.payload));
    } catch (err) {
      console.log(err);
      if (!isInternetReachable) {
        PhoneStorage.load("@instructorList", "json").then((persistData) => {
          if (persistData) {
            setAuthors(persistData);
          } else {
            setAuthors([]);
          }
        });
      }
    }
  };
  const getAuthorCourses = async (authorId) => {
    let courseResult = [];
    try {
      let res = await ApiServices.getInstructorDetail(authorId);
      let response = await res.json();
      courseResult = response.payload.courses;
      PhoneStorage.save(
        "@authorcourse_" + authorId,
        JSON.stringify(response.payload.courses)
      );
    } catch (err) {
      console.log(err);
      if (!isInternetReachable) {
        const persistData = await PhoneStorage.load(
          "@authorcourse_" + authorId,
          "json"
        );
        if (persistData) {
          courseResult = persistData;
        }
      }
    }
    return courseResult;
  };
  const getSearchCourses = async (courseName) => {
    if (
      categories == undefined ||
      categories == null ||
      categories.length == 0
    ) {
      await loadCategories();
    }
    const category_id = categories.map((n) => n.id);
    try {
      let res = await ApiServices.search(category_id, courseName, 10, 1);
      let response = await res.json();

      if (
        response.payload !== undefined &&
        response.payload.rows != undefined
      ) {
        await setSearchCourses(response.payload.rows);
      } else {
        setSearchCourses([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllNewData = async () => {
    await loadNewReleased();
    await loadTopRated();
    await loadTopSell();
    await loadCategories();
  };
  const getCourse = async (course_id) => {
    try {
      let res = await ApiServices.getCourseInfo(course_id);
      let response = await res.json();
      let rs = response.payload;
      PhoneStorage.save(
        "@courseInfo_" + course_id,
        JSON.stringify(response.payload)
      );
      return rs;
    } catch (err) {
      console.log(err);
      let courseResult = [];
      if (!isInternetReachable) {
        const persistData = await PhoneStorage.load(
          "@courseInfo_" + course_id,
          "json"
        );
        if (persistData) {
          courseResult = persistData;
        }
      }
      return persistData;
    }
  };
  const setIsInternetReachable = (value) => {
    setInternetReachable(value);
  };
  const store = {
    courses,
    authors,
    newReleased,
    topSell,
    topRated,
    selectedCourse,
    getCourse,
    loadTopRated,
    categories,
    loadCategories,
    loadTopSell,
    loadNewReleased,
    getAuthors,
    searchCourses,
    getSearchCourses,
    getAuthorCourses,
    getAuthors,
    getAllNewData,
    recommended,
    loadRecommended,
    isInternetReachable,
    setIsInternetReachable: setIsInternetReachable,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
