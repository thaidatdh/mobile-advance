import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");
const SectionCourseItem = ({onPress, item}) => {
  const star = require("../../../../../../assets/star-rating.png");
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
      <View style={styles.imageView}>
        <Image
          source={require("../../../../../../assets/bg.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.textArea}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.darkText}>{item.author}</Text>
        <Text style={styles.darkText}>
          {item.level} - {item.released} - {item.duration}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#2b2c30",
          }}
        >
          <Text style={{ color: "#f1c40f" }}>{item.rating}/5 </Text>
          <Text style={styles.darkText}>({item.ratingCount})</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    backgroundColor: "black",
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
    padding: 5,
  },
  darkText: {
    color: "darkgray",
    textTransform: "capitalize",
  },
  text: {
    color: "white",
  },
});
export default SectionCourseItem;
