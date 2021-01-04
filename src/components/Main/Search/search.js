import React, { useRef, useState } from "react";
import { SafeAreaView, Dimensions, Platform, StatusBar } from "react-native";
import { TextInput } from "react-native-paper";
import SearchData from "./search-data";
import SearchEmpty from "./search-empty";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../Contexts/DataContextProvider";
import ApiServices from "../../../services/api-services";
const { width, height } = Dimensions.get("window");
const Search = ({navigation}) => {
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [authorData, setAuthorData] = useState([]);
  const [authorsInfo, setAuthorsInfo] = useState({ total: 0, inRange: 0});
  const [coursesInfo, setCoursesInfo] = useState({ total: 0, inRange: 0 });
  const {
    searchHistory,
    addSearchHistory,
    removeAllSearchHistory,
  } = React.useContext(AuthContext);
  const {
    searchCourses,
    getSearchCourses,
    categories,
    loadCategories,
  } = React.useContext(DataContext);
  const onPressCourse = (course) => {
    navigation.navigate("Course", { course: course });
  };
  const onPressAuthor = (author) => {
    navigation.navigate("Author", { author: author });
  }
  const onPressSeeAllCourse = (courses) => {
    navigation.navigate("List Courses", { courses: courses, title: searchValue });
  }
  const onPressSeeAllAuthor = (authors) => {
    navigation.navigate("List Authors", {
      authors: authors,
      title: searchValue,
    });
  };
  const onTextChangeSearchValue = (text) => {
    setInputValue(text);
    if (text === undefined || text === "") {
      setSearchValue("");
      setIsSearched(false);
      setCourseData([]);
      setAuthorData([]);
      setAuthorsInfo({ total: 0, inRange: 0 });
      setCoursesInfo({ total: 0, inRange: 0 });
    }
  };
  const onSearch = async (text) => {
    setInputValue(text);
    if (text === undefined || text === "") {
      return;
    }
    setSearchValue(text);
    if (!searchHistory.includes(text)) {
      addSearchHistory(text);
    }
    if (
      categories == undefined ||
      categories == null ||
      categories.length == 0
    ) {
      await loadCategories();
    }
    const category_id = categories.map((n) => n.id);
    try {
      /*let res = await ApiServices.search(category_id, text, 10, 0);
      let response = await res.json();

      if (
        response.payload !== undefined &&
        response.payload.rows != undefined
      ) {
        await setCourseData(response.payload.rows);
      } else {
        setCourseData([]);
      }*/
      let res = await ApiServices.searchV2(text, 10, 0);
      let response = await res.json();
      if (
        response.payload !== undefined &&
        response.payload.courses != undefined &&
        response.payload.courses.data != undefined
      ) {
        await setCourseData(response.payload.courses.data);
        const info = {
          total: response.payload.courses.total,
          inRange: response.payload.courses.totalInPage,
        };
        await setCoursesInfo(info);
      } else {
        setCourseData([]);
        const info = { total: 0, inRange: 0 };
        setCoursesInfo(info);
      }
      if (
        response.payload !== undefined &&
        response.payload.instructors != undefined &&
        response.payload.instructors.data != undefined
      ) {
        await setAuthorData(response.payload.instructors.data);
        const info = {
          total: response.payload.instructors.total,
          inRange: response.payload.instructors.totalInPage,
        };
        await setAuthorsInfo(info);
      } else {
        setAuthorData([]);
        const info = { total: 0, inRange: 0 };
        setAuthorsInfo(info);
      }
      setIsSearched(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0E0F13",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <TextInput
        style={{
          backgroundColor: "#1f242a",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          paddingLeft: 10,
          paddingRight: 10,
        }}
        placeholderTextColor="white"
        placeholder="Search..."
        theme={{ colors: { text: "white" } }}
        returnKeyType="search"
        value={inputValue}
        multiline={false}
        onSubmitEditing={(e) => {
          onSearch(e.nativeEvent.text);
        }}
        onChangeText={onTextChangeSearchValue}
      ></TextInput>
      {isSearched === false ? (
        <SearchEmpty
          onSearch={onSearch}
          history={searchHistory}
          onClearAll={removeAllSearchHistory}
        />
      ) : (
        <SearchData
          searchValue={searchValue}
          coursesData={courseData}
          coursesInfo={coursesInfo}
          authorsData={authorData}
          authorsInfo={authorsInfo}
          onPressCourse={onPressCourse}
          onPressAuthor={onPressAuthor}
          onPressSeeAllCourse={onPressSeeAllCourse}
          onPressSeeAllAuthor={onPressSeeAllAuthor}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
