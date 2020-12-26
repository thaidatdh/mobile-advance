import react from "react";
import React, { useEffect } from "react";
import { coursesData, authorsData } from "../data/dataMockup";
export const DataContext = React.createContext(null);
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
export default ({ children }) => {
  const [courses, setCourses] = React.useState([]);
  const [newReleased, setNewReleased] = React.useState([]);
  const [topSell, setTopSell] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [searchCourses, setSearchCourses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const loadNewReleased = async () => {
    if (newReleased !== undefined && newReleased.length > 0) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        limit: 100,
        page: 1,
      }),
    };
    try {
      let res = await fetch(
        "http://api.dev.letstudy.org/course/top-new",
        requestOptions
      );
      let response = await res.json();
      setNewReleased(response.payload);
    }
    catch (err) 
    {
      console.log(err);
    };
  }
  const loadTopSell = async () => {
    if (topSell !== undefined && topSell.length > 0) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        limit: 100,
        page: 1,
      }),
    };
    try {
      let res = await fetch(
        "http://api.dev.letstudy.org/course/top-sell",
        requestOptions
      );
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
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        limit: 100,
        page: 1,
      }),
    };
    try {
      let res = await fetch(
        "http://api.dev.letstudy.org/course/top-rate",
        requestOptions
      );
      let response = await res.json();
      setTopRated(response.payload);
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
    const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        let res = await fetch(
          "http://api.dev.letstudy.org/category/all",
          requestOptions
        );
        let response = await res.json();
        if (response.payload !== undefined) 
          await setCategories(response.payload);
      } catch (err) {
        console.log(err);
      }
  }
  const loadAuthors = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let res = await fetch("http://api.dev.letstudy.org/instructor", requestOptions);
      let response = await res.json();
      setAuthors(response.payload);
    }
    catch (err) 
    {
      console.log(err);
    };
  };
  const getAuthorCourses = async (authorId) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let courseResult = [];
    try {
      let res = await fetch("http://api.dev.letstudy.org/instructor/detail/" + authorId, requestOptions);
      let response = await res.json();
      courseResult = response.payload.courses;
    }
    catch (err) 
    {
      console.log(err);
    };
    
    /*const courseResult = courses
      .slice()
      .filter(
        (n) =>
          (!Array.isArray(n.author) && n.author === authorName) ||
          (Array.isArray(n.author) && n.author.includes(authorName))
      );*/
    return courseResult;
  };
  const searchCourses_old = (courseName) => {
    const courseResult = courses
      .slice()
      .filter((n) => n.title.toUpperCase().includes(courseName.toUpperCase()));
    const courseOfAuthor = courses
      .slice()
      .filter(
        (n) =>
          ((Array.isArray(n.author) && n.author.includes(courseName)) ||
            (!Array.isArray(n.author) &&
              n.author.toUpperCase().includes(courseName.toUpperCase()))) &&
          !courseResult.includes(n)
      );
    return courseResult.concat(courseOfAuthor).slice();
  };
  const getSearchCourses = async (courseName) => {
    if (categories == undefined || categories == null || categories.length == 0) {
      await loadCategories();
    }
    const category_id = categories.map(n => n.id);
    const url = "http://api.dev.letstudy.org/course/search";
    const requestOptionsUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: courseName,
        opt: {
          sort: {
            attribute: "price",
            rule: "DESC",
          },
          category: category_id,
          time: [{ min: 0 }],
          price: [
            {
              min: 0,
            },
          ],
        },
        limit: 10,
        offset: 1,
      }),
    };
    try {
      let res = await fetch(url, requestOptionsUser);
      let response = await res.json();
      
      if (response.payload !== undefined && response.payload.rows != undefined) {
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
  }
  const getCourse = async (course_id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let res = await fetch(
        "http://api.dev.letstudy.org/course/get-course-info?id=" + course_id,
        requestOptions
      );
      let response = await res.json();
      let rs = response.payload;
      return rs;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  const searchAuthor = (authorSearch) => {
    const authorsResult = authors
      .slice()
      .filter((n) =>
        n.title.toUpperCase().includes(authorSearch.toUpperCase())
      );
    const courseOfAuthor = courses
      .slice()
      .filter((n) =>
        n.title.toUpperCase().includes(authorSearch.toUpperCase())
      );
    const authorNameHasCourses = courseOfAuthor
      .slice()
      .filter((n) => n.title.toUpperCase().includes(authorSearch.toUpperCase()))
      .map((n) => n.author)
      .flat()
      .filter(onlyUnique);
    const authorHasCourses = authors
      .slice()
      .filter(
        (n) =>
          authorNameHasCourses.includes(n.title) && !authorsResult.includes(n)
      );
    let result = [];
    authorsResult
      .concat(authorHasCourses)
      .slice()
      .forEach((n) => {
        const count = courses.filter(
          (c) =>
            (Array.isArray(c.author) && c.author.includes(n.title)) ||
            (!Array.isArray(c.author) && c.author === n.title)
        ).length;
        let tempAuthor = Object.assign({ coursesCount: count }, n);
        result = result.concat(tempAuthor);
      });
    return result;
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
    searchAuthor,
    getAuthorCourses,
    getAuthors,
    getAllNewData,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
