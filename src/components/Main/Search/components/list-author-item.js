import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SettingContext } from "../../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");
const ListAuthorItem = (props) => {
  const { theme } = React.useContext(SettingContext);
  return (
    <TouchableOpacity
      style={{ ...styles.item, borderBottomColor: theme.c_gray}}
      onPress={() => props.onPress(props.item)}
    >
      <View style={styles.imageView}>
        <Image source={{ uri: props.item.avatar }} style={styles.image} />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{...styles.title, color: theme.c_white}}>{props.item.name}</Text>
        <Text style={{...styles.darkText, color: theme.c_darkgray}}>
          Number Courses: {props.item.numcourses}
        </Text>
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
