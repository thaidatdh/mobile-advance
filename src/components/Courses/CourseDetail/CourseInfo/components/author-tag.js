import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SettingContext } from "../../../../../Contexts/SettingContextProvider";
const AuthorTag = (props) => {
  const { theme } = React.useContext(SettingContext);
  return (
    <TouchableOpacity style={{...styles.container, backgroundColor: theme.c_394249}} onPress={props.onPress}>
      <Text style={{...styles.title, color: theme.c_white}}>{props.author}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {marginRight: 10, color:'white', backgroundColor: '#394249', borderRadius: 15, padding: 5, paddingLeft: 10, paddingRight: 10},
  title: {color: 'white', marginLeft: 5},
});

export default AuthorTag;
