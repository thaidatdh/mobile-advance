import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

const SectionCourseItem = (props) => {
  return (
    <View style={styles.item}>
      <Image
        source={require("../../../../../assets/bg.png")}
        style={styles.image}
      />
      <View>
        <Text>{props.item.title}</Text>
        <Text style={styles.darkText}>{props.item.author}</Text>
        <Text style={styles.darkText}>
          {props.item.level} - {props.item.released} - {props.item.duration}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    margin: 5,
    width: 200,
    height: 200,
    backgroundColor: "lightgray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.33,
    shadowRadius: 4.44,
    elevation: 6,
  },
  image: {
    height: 100,
    resizeMode: "stretch",
  },
  title: {
    fontWeight: "bold",
  },
  darkText: {
    color: "darkgray",
  },
});
export default SectionCourseItem;
