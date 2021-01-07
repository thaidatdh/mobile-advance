import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SettingContext } from "../../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");

const SearchHeader = (props) => {
  const { theme, language } = React.useContext(SettingContext);
  return (
    <View
    style={{
      marginLeft: 10,
      marginTop: 20,
      marginBottom: 20,
      marginRight: 20,
      color: theme.c_white,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <Text style={{ color: theme.c_white, fontSize: 15 }}>
      {props.dataLength} {props.data}
    </Text>
    <TouchableOpacity onPress={props.onPress}>
    {props.dataLength > 0 ? <Text
      style={{
        color: theme.c_2384ae,
        textTransform: "uppercase",
      }}
    >
      {" "}
      {language.SeeAll}
    </Text> : null}
  </TouchableOpacity>
  </View>
  );
};
const styles = StyleSheet.create({

});
export default SearchHeader;
