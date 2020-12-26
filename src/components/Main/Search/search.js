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
  const [isSearched, setIsSearched] = useState(false);
  //const [authorData, setAuthorData] = useState([]);
  const {
    searchHistory,
    addSearchHistory,
    removeAllSearchHistory,
  } = React.useContext(AuthContext);
  const {
    searchCourses,
    searchAuthor,
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
    navigation.navigate("List Courses", { courses: courses, title: "Search" });
  }
  const onPressSeeAllAuthor = (authors) => {
    navigation.navigate("List Authors", { authors: authors, title: "Search" });
  };
  const onTextChangeSearchValue = (text) => {
    setInputValue(text);
    if (text === undefined || text === "") {
      setSearchValue("");
      setIsSearched(false);
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
    const url = "http://api.dev.letstudy.org/course/search";
    const requestOptionsUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: text,
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

      if (
        response.payload !== undefined &&
        response.payload.rows != undefined
      ) {
        await setCourseData(response.payload.rows);
      } else {
        setCourseData([]);
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
      {isSearched === "" ? (
        <SearchEmpty
          onSearch={onSearch}
          history={searchHistory}
          onClearAll={removeAllSearchHistory}
        />
      ) : (
        <SearchData
          searchValue={searchValue}
          coursesData={courseData}
          //authorsData={authorData}
          onPressCourse={onPressCourse}
          //onPressAuthor={onPressAuthor}
          onPressSeeAllCourse={onPressSeeAllCourse}
          //onPressSeeAllAuthor={onPressSeeAllAuthor}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
