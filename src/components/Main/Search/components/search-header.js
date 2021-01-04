import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
const SearchHeader = (props) => {
  return (
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
    <Text style={{ color: "white", fontSize: 15 }}>
      {props.dataLength} {props.data}
    </Text>
    <TouchableOpacity onPress={props.onPress}>
    {props.dataLength > 0 ? <Text
      style={{
        color: "#2384ae",
        textTransform: "uppercase",
      }}
    >
      {" "}
      See All
    </Text> : null}
  </TouchableOpacity>
  </View>
  );
};
const styles = StyleSheet.create({

});
export default SearchHeader;
