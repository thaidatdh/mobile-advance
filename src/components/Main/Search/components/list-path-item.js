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
const ListPathItem = (props) => {
  const { theme } = React.useContext(SettingContext);
  return (
    <TouchableOpacity style={{...styles.item, borderBottomColor: theme.c_gray}}>
      <Image
        source={require("../../../../../assets/bg.png")}
        style={styles.image}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{...styles.title, color: theme.c_white}}>{props.item.title}</Text>
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
    flex: 1,
    alignSelf: "center",
  },
});
export default ListPathItem;
