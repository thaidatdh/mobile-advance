import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FileSystemApi from "../../../../../services/file-system-api";
import { DataContext } from "../../../../../Contexts/DataContextProvider";
import { SettingContext } from "../../../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");

const SectionAuthorItem = (props) => {
  const { theme } = React.useContext(SettingContext);
  const { isInternetReachable } = useContext(DataContext);
  const [imageUrl, setImageUrl] = useState(props.author["user.avatar"]);
  useEffect(() => {
    const getImage = async () => {
      const url = props.author["user.avatar"];
      setImageUrl(url);
      if (!isInternetReachable) {
        const courseImage = await FileSystemApi.getInstructorImage(
          props.author.id,
          url
        );
        if (courseImage) {
          await setImageUrl(courseImage);
        }
      }
    };
    try {
      getImage();
    } catch (err) {}
  }, []);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.onPress(props.author)}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.titleView}>
        <Text style={{...styles.title, color: theme.c_white}}>{props.author["user.name"]}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    width: width * 0.2,
    height: width * 0.3,
    maxWidth: 100,
    maxHeight: 150,
    color: "white",
    alignItems: "center",
  },
  image: {
    height: width * 0.2,
    width: width * 0.2,
    maxHeight: 100,
    maxWidth: 100,
    borderRadius: width * 0.15 > 100 ? 50 : width * 0.2 * 0.5,
  },
  titleView: {
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
export default SectionAuthorItem;
