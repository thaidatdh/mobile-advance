import React from "react";
import { coursesData, authorsData } from "../data/dataMockup";
export const DataContext = React.createContext(null);
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
export default ({ children }) => {
  const [courses, setCourses] = React.useState(coursesData);
  const [authors, setAuthors] = React.useState(authorsData);
  const searchCourses = (courseName) => {
    const courseResult = courses
      .slice()
      .filter((n) => n.title.toUpperCase().includes(courseName.toUpperCase()));
    const courseOfAuthor = courses
      .slice()
      .filter(
        (n) =>
          n.author.toUpperCase().includes(courseName.toUpperCase()) &&
          !courseResult.includes(n)
      );
    return courseResult.concat(courseOfAuthor).slice();
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
        const count = courses.filter((c) => c.author === n.title).length;
        let tempAuthor = Object.assign({ coursesCount: count }, n);
        result = result.concat(tempAuthor);
      });
    return result;
  };
  const store = {
    courses,
    authors,
    searchCourses,
    searchAuthor,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
