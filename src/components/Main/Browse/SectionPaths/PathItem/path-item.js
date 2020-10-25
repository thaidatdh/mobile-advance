import React from "react";
import { Image, View, Text, StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");
const PathItem = (props) => {
  return (
    <View style={styles.item}>
    <View style={styles.imageView}>
      <Image
          source={require("../../../../../../assets/bg.png")}
          style={styles.image}
      />
    </View>
      
      <View style={styles.textArea}>
        <Text style={styles.text}>{props.item.title}</Text>
        <Text style={styles.darkText}>{props.item.courses} courses</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    margin: 5,
    width: width * 0.5,
    maxWidth: 300,
    minHeight: height * 0.25,
    backgroundColor: "#2b2c30",
  },
  imageView: {
    height: height * 0.12,
    backgroundColor: 'black'
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "stretch",
  },
  title: {
    fontWeight: "bold",
  },
  textArea: {
    padding: 5
  },
  darkText: {
    color: "darkgray",
  },
  text: {
    color: "white",
  },
});
export default PathItem;
