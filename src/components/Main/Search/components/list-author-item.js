import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
const ListAuthorItem = (props) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.imageView}>
        <Image
          source={require("../../../../../assets/bg.png")}
          style={styles.image}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.darkText}>{props.item.coursesCount} Courses</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    height: height * 0.1,
    maxHeight: 100,
  },
  imageView: {
    width: width * 0.2,
    height: "80%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: width * 0.2 > height * 0.1 ? height * 0.1 : width * 0.2,
    height: width * 0.2 > height * 0.1 ? height * 0.1 : width * 0.2,
    borderRadius:
      width * 0.2 > height * 0.1 ? height * 0.1 * 0.5 : width * 0.2 * 0.5,
    paddingBottom: 5,
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    color: "white",
  },
  darkText: {
    color: "darkgray",
    textTransform: "capitalize",
  },
  options: {
    flex: 1,
    alignSelf: "center",
  },
});
export default ListAuthorItem;
