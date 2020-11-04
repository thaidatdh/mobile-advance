import React, { useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  SectionList,
  Text,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import SearchData from "./search-data";
import SearchEmpty from "./search-empty";
const { width, height } = Dimensions.get("window");
const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchHistory, setSearchHistory] = useState([".net", "bob", "react"]);

  const onTextChangeSearchValue=(text) => {
    setInputValue(text);
    if (!text || text === '') {
      setSearchValue('');
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#0E0F13" }}>
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
        returnKeyType='search'
        value={inputValue}
        onSubmitEditing={(e) => {setSearchValue(e.target.value); setSearchHistory(searchHistory.concat(e.target.value))}}
        onChangeText={onTextChangeSearchValue}
      ></TextInput>
      {!searchValue ? (
        <SearchEmpty onSearch={setSearchValue} history={searchHistory} onClearAll={() => setSearchHistory([])} />
      ) : (
        <SearchData />
      )}
    </View>
  );
};

export default Search;
