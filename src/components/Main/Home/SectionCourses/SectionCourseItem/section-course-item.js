import React from "react";
import { Image, View, Text, StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get("window");
const SectionCourseItem = (props) => {
  const star = require("../../../../../../assets/star-rating.png");
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
        <Text style={styles.darkText}>{props.item.author}</Text>
        <Text style={styles.darkText}>
          {props.item.level} - {props.item.released} - {props.item.duration}
        </Text>
        <View style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#2b2c30"
        }}>
          <Text style={{color:"#f1c40f"}}>{props.item.rating}/5 </Text>
          <Text style={styles.darkText}>({props.item.ratingCount})</Text>
        </View>
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
    textTransform: "capitalize"
  },
  text: {
    color: "white",
  },
});
export default SectionCourseItem;
