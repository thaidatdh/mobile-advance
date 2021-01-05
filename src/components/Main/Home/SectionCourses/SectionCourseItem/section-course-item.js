import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { DataContext } from "../../../../../Contexts/DataContextProvider";
import { AuthContext } from "../../../../../Contexts/AuthContextProvider";
import { SettingContext } from "../../../../../Contexts/SettingContextProvider";
import ApiServices from "../../../../../services/api-services";
import PhoneStorage from "../../../../../services/phone-storage";
import FileSystemApi from "../../../../../services/file-system-api";
const { width, height } = Dimensions.get("window");
const SectionCourseItem = ({ onPress, item }) => {
  const star = require("../../../../../../assets/star-rating.png");
  const [courseData, setCourseData] = useState(item);
  const [instructorName, setInstructorName] = useState("");
  const [learnedTime, setLearnedTime] = useState("");
  const [imageUrl, setImageUrl] = useState(
    item.courseImage ? item.courseImage : item.imageUrl
  );
  const { theme } = React.useContext(SettingContext);
  const {
    getCourse,
    selectedCourse,
    authors,
    isInternetReachable,
  } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        let res = await ApiServices.getCourseDetails(id, user ? user.id : id);
        let response = await res.json();
        if (response.payload !== undefined && response.payload !== null) {
          await setCourseData(response.payload);
          PhoneStorage.save(
            "@course_detail_info_" + id,
            JSON.stringify(response.payload)
          );
          if (response.payload.instructor) {
            await setInstructorName(response.payload.instructor.name);
          }
        }
      } catch (err) {
        console.log(err);
        if (!isInternetReachable) {
          PhoneStorage.load("@course_detail_info_" + id, "json").then(
            (persistData) => {
              if (persistData) {
                setCourseData(persistData);
                if (persistData.instructor) {
                  setInstructorName(persistData.instructor.name);
                }
              }
            }
          );
        }
      }
    };
    if (item.latestLearnTime) {
      setLearnedTime(item.latestLearnTime);
      PhoneStorage.save("@LAST_LEARN_" + item.id, item.latestLearnTime);
    } else {
      const lastestLearnTime = PhoneStorage.load("@LAST_LEARN_" + item.id);
      if (lastestLearnTime) {
        setLearnedTime(lastestLearnTime);
      }
    }
    const getImage = async () => {
      const url = item.courseImage ? item.courseImage : item.imageUrl;
      setImageUrl(url);
      if (!isInternetReachable) {
        const courseImage = await FileSystemApi.getCourseImage(item.id, url);
        if (courseImage) {
          await setImageUrl(courseImage);
        }
      }
    };
    try {
      getImage();
    } catch (err) {}
    setCourseData(item);
    fetchData(item.id);
  }, []);
  return (
    <TouchableOpacity
      style={{ ...styles.item, backgroundColor: theme.c_2b2c30 }}
      onPress={() => onPress(courseData)}
    >
      <View style={{ ...styles.imageView, backgroundColor: theme.c_black }}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.textArea}>
        <Text style={{...styles.text, color: theme.c_white}}>
          {courseData.courseTitle ? courseData.courseTitle : courseData.title}
        </Text>
        <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
          {instructorName}
        </Text>
        <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
          {(courseData.createdAt
            ? courseData.createdAt.substring(0, 10) + " | "
            : "") +
            (courseData.totalHours
              ? courseData.totalHours.toFixed(3) + "h"
              : "")}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: theme.c_2b2c30,
          }}
        >
          <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
            Rating:{" "}
          </Text>
          <Text style={{ color: theme.c_f1c40f }}>
            {courseData.averagePoint
              ? courseData.averagePoint
              : courseData.courseAveragePoint
              ? courseData.courseAveragePoint.toFixed(2)
              : 0}
          </Text>
          <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
            {courseData.ratedNumber ? " (" + courseData.ratedNumber + ")" : 0}
          </Text>
        </View>
        {learnedTime && learnedTime != "" && learnedTime.length > 16 ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: theme.c_2b2c30,
            }}
          >
            <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
              Last Learn:{" "}
            </Text>
            <Text style={{ ...styles.darkText, color: theme.c_darkgray }}>
              {learnedTime.substring(0, 10) +
                " " +
                learnedTime.substring(11, 16)}
            </Text>
          </View>
        ) : null}
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
