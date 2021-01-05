import React, { useState } from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Switch } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SettingContext } from "../../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");
const CheckSettingButton = (props) => {
  const { theme } = React.useContext(SettingContext);
  const updateCheck = () => {
    props.onChange();
  }
  return (
    <View style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {props.item.icon ? (
            <FontAwesome5Icon
              name={props.item.icon}
              color={theme.c_white}
              size={20}
              style={{ marginRight: 5 }}
            />
          ) : null}
          <Text style={{ color: theme.c_white }}>{props.item.title}</Text>
        </View>
        {props.item.desc ? (
          <Text style={{ color: theme.c_gray, fontSize: 12 }}>
            {props.item.desc}
          </Text>
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
