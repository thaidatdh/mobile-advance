import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { SettingContext } from "../../../../../Contexts/SettingContextProvider";
const ActionButton = (props) => {
  const { theme } = React.useContext(SettingContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.imageView, backgroundColor: theme.c_394249 }}
        onPress={props.onPress}
      >
        <FontAwesome5
          style={styles.image}
          name={props.icon}
          color={theme.c_white}
          size={20}
          style={{ alignSelf: "center" }}
          solid={props.solid ? props.solid : false}
        />
      </TouchableOpacity>
      <Text style={{ ...styles.title, color: theme.c_white }}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { color: "white", marginTop: 5, alignSelf: 'center', textAlign: 'center' },
  container: {
    width: 100,
    justifyContent: "center",
    alignSelf: "center",
  },
  imageView: {
    backgroundColor: "#394249",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  image: { alignSelf: "center" },
});

export default ActionButton;
