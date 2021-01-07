import React, { useState, useEffect } from "react";
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
import { DataContext } from "../../../../Contexts/DataContextProvider";
import { SettingContext } from "../../../../Contexts/SettingContextProvider";
import ApiServices from "../../../../services/api-services";
import PhoneStorage from "../../../../services/phone-storage";
const { width, height } = Dimensions.get("window");
const ListCourseItem = (props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [authors, setAuthors] = useState(props.author);
  const [course, setCourse] = useState(props.item);
  const [imageUrl, setImageUrl] = useState(
    props.item.courseImage ? props.item.courseImage : props.item.imageUrl
  );
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
  const { theme, language } = React.useContext(SettingContext);
  const { isInternetReachable } = React.useContext(DataContext);
  useEffect(() => {
    const fetchData = (id) => {
      ApiServices.getCourseDetails(id, user ? user.id : id)
        .then((res) => res.json())
        .then((response) => {
          if (response.payload !== undefined && response.payload !== null) {
            setCourse(response.payload);
            PhoneStorage.save(
              "@course_detail_info_" + id,
              JSON.stringify(response.payload)
            );
            if (response.payload.instructor) {
              setAuthors(response.payload.instructor.name);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          if (!isInternetReachable) {
            PhoneStorage.load("@course_detail_info_" + id, "json").then(
              (persistData) => {
                if (persistData) {
                  setCourse(persistData);
                  if (persistData.instructor) {
                    setAuthors(persistData.instructor.name);
                  }
                }
              }
            );
          }
        });
    };
    const getImage = async () => {
      const url = props.item.courseImage
        ? props.item.courseImage
        : props.item.imageUrl;
      setImageUrl(url);
      if (!isInternetReachable) {
        const courseImage = await FileSystemApi.getCourseImage(
          props.item.id,
          url
        );
        if (courseImage) {
          await setImageUrl(courseImage);
        }
      }
    };
    setCourse(props.item);
    try {
      getImage();
    } catch (err) {}
    try {
      fetchData(props.item.id);
    } catch (err) {}
  }, []);
  const onMenuOpen = () => {
    setIsMenuVisible(true);
  };
  const onMenuDismiss = () => {
    setIsMenuVisible(false);
  };
  const onShare = async () => {
    try {
      const message =
        (course.title ? course.title : course.courseTitle) +
        "\n" +
        language.AveragePoint +
        ": " +
        course.averagePoint;
      const result = await Share.share({
        message: message,
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
  const onRemoveDownload = () => {
    removeDownloaded(props.item);
  };
  const onBookmark = () => {
    addBookmark(course.id);
  };
  const onRemoveBookmark = () => {
    removeBookmark(course.id);
  };
  const onChannel = () => {
    if (course.price === 0) addChannel(course.id);
  };
  const onRemoveChannel = () => {
    //removeChannel(props.item);
  };
  useEffect(() => {
    //​
    const fetchDataAuth = (id) => {
      ApiServices.getInstructorDetail(id)
        .then((res) => res.json())
        .then((response) => {
          if (response.payload !== undefined) {
            setAuthors(response.payload.name);
            PhoneStorage.save(
              "@instructor_name_" + id,
              JSON.stringify(response.payload.name)
            );
          }
        })
        .catch((err) => {
          console.log(err);
          if (!isInternetReachable) {
            PhoneStorage.load("@instructor_name_" + id, "json").then(
              (persistData) => {
                if (persistData) {
                  setAuthors(persistData);
                }
              }
            );
          }
        });
    };
    if (
      (authors === null || authors === undefined || authors === "") &&
      course.instructorId
    )
      fetchDataAuth(course.instructorId);
  }, []);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.onPress(props.item)}
    >
      <Image
        source={{
          uri: course.imageUrl ? course.imageUrl : course.courseImage,
        }}
        style={styles.image}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ ...styles.title, color: theme.c_white }}>
          {course.title ? course.title : course.courseTitle}
        </Text>
        <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
          {authors}
        </Text>
        <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
          {course.status ? course.status + " | " : ""}
          {course.createdAt
            ? course.createdAt.substring(0, 10) + " | "
            : course.updatedAt
            ? course.updatedAt.substring(0, 10) + " | "
            : course.latestLearnTime
            ? language.Latestlearntime +
              ": " +
              course.latestLearnTime.substring(0, 10)
            : ""}
          {course.totalHours
            ? course.totalHours.toFixed(2) + " " + language.hours
            : ""}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
            {language.Rating}
            {": "}
          </Text>
          <Text style={{ color: theme.c_f1c40f }}>
            {course.averagePoint ? course.averagePoint + " " : ""}
          </Text>
          <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
            {course.ratedNumber ? "(" + course.ratedNumber + ")" : ""}
          </Text>
        </View>
      </View>

      <Menu
        visible={isMenuVisible}
        onDismiss={onMenuDismiss}
        anchor={
          <TouchableOpacity style={styles.options} onPress={onMenuOpen}>
            <FontAwesome5
              style={{ color: theme.c_lightgray, alignSelf: "flex-end" }}
              name="ellipsis-v"
              size={20}
            />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={onShare} title={language.Share} />
        {user ? (
          !isBookmarked(course.id) ? (
            <Menu.Item onPress={onBookmark} title={language.AddBookmark} />
          ) : (
            <Menu.Item
              onPress={onRemoveBookmark}
              title={language.RemoveBookmark}
            />
          )
        ) : null}
        {user ? (
          !isChanneled(course.id) ? (
            <Menu.Item onPress={onChannel} title={language.BuyCourse} />
          ) : null
        ) : /*<Menu.Item onPress={onRemoveChannel} title="Remove Channel" />*/
        null}
        {isDownloaded(course.id) ? (
          <Menu.Item
            onPress={onRemoveDownload}
            title={language.RemoveDownloaded}
          />
        ) : null}
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
    width: width * 0.05,
    height: "80%",
  },
});
export default ListCourseItem;
