import React, { useState } from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Switch } from "react-native-paper";
const { width, height } = Dimensions.get("window");
const CheckSettingButton = (props) => {
  const updateCheck = () => {
    props.onChange(props.item.title, { isCheck: !props.item.isCheck });
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{ color: "white" }}>{props.item.title}</Text>
        {props.item.desc ? (
          <Text style={{ color: "gray", fontSize: 12 }}>{props.item.desc}</Text>
        ) : null}
      </View>
      <View style={styles.checkContainer}>
        <Switch
          color="#2384ae"
          value={props.item.isCheck}
          tintColor="white"
          onValueChange={updateCheck}
        />
      </View>
    </View>
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
    width: "100%",
  },
  textContainer: {
    flex: 1,
    maxWidth: width * 0.8,
    flexDirection: "column",
    justifyContent: "center",
  },
  checkContainer: {
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10
  },
});
export default CheckSettingButton;
