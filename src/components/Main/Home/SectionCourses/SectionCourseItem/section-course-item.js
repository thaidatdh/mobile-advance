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
import ApiServices from "../../../../../services/api-services";
import PhoneStorage from "../../../../../services/phone-storage";
const { width, height } = Dimensions.get("window");
const SectionCourseItem = ({ onPress, item }) => {
  const star = require("../../../../../../assets/star-rating.png");
  const [courseData, setCourseData] = useState(item);
  const [instructorName, setInstructorName] = useState("");
  const { getCourse, selectedCourse, authors, isInternetReachable } = useContext(DataContext);
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        let res = await ApiServices.getCourseDetails(id);
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
    setCourseData(item);
    fetchData(item.id);
  }, []);
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(courseData)}>
      <View style={styles.imageView}>
        <Image
          source={{
            uri: courseData.courseImage
              ? courseData.courseImage
              : courseData.imageUrl,
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.textArea}>
        <Text style={styles.text}>
          {courseData.courseTitle ? courseData.courseTitle : courseData.title}
        </Text>
        <Text style={styles.darkText}>{instructorName}</Text>
        <Text style={styles.darkText}>
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
            backgroundColor: "#2b2c30",
          }}
        >
          <Text style={styles.darkText}>Rating: </Text>
          <Text style={{ color: "#f1c40f" }}>
            {courseData.averagePoint
              ? courseData.averagePoint
              : courseData.courseAveragePoint
              ? courseData.courseAveragePoint.toFixed(2)
              : 0}
          </Text>
          <Text style={styles.darkText}>
            {courseData.ratedNumber ? " (" + courseData.ratedNumber + ")" : 0}
          </Text>
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
