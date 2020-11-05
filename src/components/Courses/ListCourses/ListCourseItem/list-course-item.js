import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Dimensions,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const { width, height } = Dimensions.get("window");
const ListCourseItem = (props) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share " + props.item.title,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Image
        source={require("../../../../../assets/bg.png")}
        style={styles.image}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.darkText}>{props.item.author}</Text>
        <Text style={styles.darkText}>
          {props.item.level} - {props.item.released} - {props.item.duration}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "#f1c40f" }}>{props.item.rating}/5 </Text>
          <Text style={styles.darkText}>({props.item.ratingCount})</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.options} onPress={onShare}>
        <FontAwesome5
          style={{ color: "lightgray", alignSelf: "flex-end" }}
          name="ellipsis-v"
          size={15}
        />
      </TouchableOpacity>
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
    height: height * 0.15,
    maxHeight: 100,
  },
  image: {
    width: width * 0.2,
    height: "80%",
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
    alignSelf: "center",
  },
});
export default ListCourseItem;
