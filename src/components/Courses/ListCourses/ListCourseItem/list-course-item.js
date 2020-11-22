import React, { useState } from "react";
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
import { Menu } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../../../Contexts/AuthContextProvider";
const { width, height } = Dimensions.get("window");
const ListCourseItem = (props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const {
    user,
    addBookmark,
    addChannel,
    addDownloaded,
    isBookmarked,
    isChanneled,
    isDownloaded,
    removeChannel,
    removeBookmark,
    removeDownloaded,
  } = React.useContext(AuthContext);
  const onMenuOpen = () => {
    setIsMenuVisible(true);
  };
  const onMenuDismiss = () => {
    setIsMenuVisible(false);
  };
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
  const onDownload = () => {
    if (user) {
      addDownloaded(props.item);
    }
    else {
      props.navigation.navigate('Sign In');
    }
  }
  const onRemoveDownload = () => {
    removeDownloaded(props.item);
  };
  const onBookmark = () => {
    addBookmark(props.item);
  }
  const onRemoveBookmark = () => {
    removeBookmark(props.item);
  }
  const onChannel = () => {
    addChannel(props.item);
  }
  const onRemoveChannel = () => {
    removeChannel(props.item);
  }
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.onPress(props.item)}
    >
      <Image
        source={require("../../../../../assets/bg.png")}
        style={styles.image}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.darkText}>
          {Array.isArray(props.item.author)
            ? props.item.author[0]
            : props.item.author}
        </Text>
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

      <Menu
        visible={isMenuVisible}
        onDismiss={onMenuDismiss}
        anchor={
          <TouchableOpacity style={styles.options} onPress={onMenuOpen}>
            <FontAwesome5
              style={{ color: "lightgray", alignSelf: "flex-end" }}
              name="ellipsis-v"
              size={15}
            />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={onShare} title="Share" />
        {user ? (
          !isBookmarked(props.item.title) ? (
            <Menu.Item onPress={onBookmark} title="Add Bookmark" />
          ) : (
            <Menu.Item onPress={onRemoveBookmark} title="Remove Bookmark" />
          )
        ) : null}
        {user ? (
          !isChanneled(props.item.title) ? (
            <Menu.Item onPress={onChannel} title="Add Channel" />
          ) : (
            <Menu.Item onPress={onRemoveChannel} title="Remove Channel" />
          )
        ) : null}
        {!isDownloaded(props.item.title) ? (
          <Menu.Item onPress={onDownload} title="Download" />
        ) : (
          <Menu.Item onPress={onRemoveDownload} title="Remove Downloaded" />
        )}
      </Menu>
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
