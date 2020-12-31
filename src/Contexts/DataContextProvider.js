import react from "react";
import React, { useEffect, useState } from "react";
import { coursesData, authorsData } from "../data/dataMockup";
import ApiServices from "../services/api-services";
export const DataContext = React.createContext(null);
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
export default ({ children }) => {
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
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
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
      if (response.payload !== undefined) await setCategories(response.payload);
    } catch (err) {
      console.log(err);
    }
  };
  const loadAuthors = async () => {
    try {
      let res = await ApiServices.getAllInstructor();
      let response = await res.json();
      setAuthors(response.payload);
    } catch (err) {
      console.log(err);
    }
  };
  const getAuthorCourses = async (authorId) => {
    let courseResult = [];
    try {
      let res = await ApiServices.getInstructorDetail(authorId);
      let response = await res.json();
      courseResult = response.payload.courses;
    } catch (err) {
      console.log(err);
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
      return rs;
    } catch (err) {
      console.log(err);
      return null;
    }
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
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
