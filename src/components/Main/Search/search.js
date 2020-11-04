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
  const searches = [".net", "bob", "react"];
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
        value={searchValue}
        onChangeText={(value) => setSearchValue(value)}
      ></TextInput>
      {!searchValue ? (
        <SearchEmpty onSearch={setSearchValue} history={searches} />
      ) : (
        <SearchData />
      )}
    </View>
  );
};

export default Search;
