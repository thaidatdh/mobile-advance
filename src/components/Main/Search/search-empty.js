import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  SectionList,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
const { width, height } = Dimensions.get("window");
const SearchEmpty = (props) => {
  const [historyList, setHistoryList] = useState(props.history);
  const onClearAll = () => {
    setHistoryList([]);
  };
  const renderItems = (coursesList) => {
    return coursesList.map((item) => (
      <TouchableOpacity
        key={item}
        style={{ backgroundColor: "transparent", padding: 10 }}
        onPress={() => props.onSearch(item)}
      >
        <Text style={{ color: "white" }}>{item}</Text>
      </TouchableOpacity>
    ));
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <View
        style={{
          marginLeft: 10,
          marginTop: 20,
          marginBottom: 20,
          marginRight: 20,
          color: "white",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>Recent searches</Text>
        <TouchableOpacity onPress={onClearAll}>
          <Text
            style={{
              color: "#2384ae",
              textTransform: "uppercase",
              fontSize: 15,
            }}
          >
            {" "}
            Clear all
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>{renderItems(historyList)}</ScrollView>
    </View>
  );
};

export default SearchEmpty;
