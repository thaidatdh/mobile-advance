import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const AuthorTag = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{props.author}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {marginRight: 10, color:'white', backgroundColor: '#394249', borderRadius: 15, padding: 5, paddingLeft: 10, paddingRight: 10},
  title: {color: 'white', marginLeft: 5},
});

export default AuthorTag;
