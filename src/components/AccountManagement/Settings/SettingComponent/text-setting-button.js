import React, { useState } from "react";
import { SettingContext } from "../../../../Contexts/SettingContextProvider";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
const TextSettingButton = (props) => {
  const { theme } = React.useContext(SettingContext);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}
    >
      <View style={styles.textContainer}>
        <Text style={{ color: theme.c_white }}>{props.item.title}</Text>
        {props.item.desc ? (
          <Text style={{ color: theme.c_gray, fontSize: 12 }}>
            {props.item.desc}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 2,
    minHeight: 50,
  },
  textContainer: {
    flex: 1,
    maxWidth: width * 0.8,
    flexDirection: "column",
    justifyContent: "center",
  },
});
export default TextSettingButton;
