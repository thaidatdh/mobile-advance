import React from "react";
import { coursesData, authorsData } from "../data/dataMockup";
export const DataContext = React.createContext(null);

export default ({ children }) => {
  const [courses, setCourses] = React.useState(coursesData);
  const [authors, setAuthors] = React.useState(authorsData);

  const store = {
    courses: [courses, setCourses],
    authors: [authors, setAuthors],
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};