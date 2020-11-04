import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  SectionList,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
const { width, height } = Dimensions.get("window");
const SearchEmpty = (props) => {
  const renderItems = (coursesList) => {
    return coursesList.map((item) => (
      <TouchableOpacity
        key={item}
        style={{ backgroundColor: "transparent", padding: 10, paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}
        onPress={() => props.onSearch(item)}
      >
        <FontAwesome5Icon name="history" color="white" />
        <Text style={{ color: "white", marginLeft: 10 }}>{item}</Text>
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
        <TouchableOpacity onPress={props.onClearAll}>
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
      <ScrollView>{renderItems(props.history)}</ScrollView>
    </View>
  );
};

export default SearchEmpty;
