import React, { useRef, useState } from "react";
import { SafeAreaView, Dimensions, Platform, StatusBar } from "react-native";
import { TextInput } from "react-native-paper";
import SearchData from "./search-data";
import SearchEmpty from "./search-empty";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../Contexts/DataContextProvider";
const { width, height } = Dimensions.get("window");
const Search = ({navigation}) => {
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const {
    searchHistory,
    addSearchHistory,
    removeAllSearchHistory,
  } = React.useContext(AuthContext);
  const { courses, authors, searchCourses, searchAuthor } = React.useContext(DataContext);
  const onPressCourse = (course) => {
    navigation.navigate("Course", { course: course });
  };
  const onTextChangeSearchValue = (text) => {
    setInputValue(text);
    if (text === undefined || text === "") {
      setSearchValue("");
    }
  };
  const onSearch = (text) => {
    setInputValue(text);
    if (text === undefined || text === "") {
      return;
    }
    setSearchValue(text);
    if (!searchHistory.includes(text)) {
      addSearchHistory(text);
    }
    setCourseData(searchCourses(text));
    setAuthorData(searchAuthor(text));
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
        onSubmitEditing={(e) => {
          onSearch(e.target.value);
        }}
        onChangeText={onTextChangeSearchValue}
      ></TextInput>
      {searchValue === "" ? (
        <SearchEmpty
          onSearch={onSearch}
          history={searchHistory}
          onClearAll={removeAllSearchHistory}
        />
      ) : (
        <SearchData
          searchValue={searchValue}
          coursesData={courseData}
          authorsData={authorData}
          onPressCourse={onPressCourse}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
