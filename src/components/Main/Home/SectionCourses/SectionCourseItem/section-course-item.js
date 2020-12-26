import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {DataContext} from "../../../../../Contexts/DataContextProvider"
const { width, height } = Dimensions.get("window");
const SectionCourseItem = ({onPress, item}) => {
  const star = require("../../../../../../assets/star-rating.png");
  const [courseData, setCourseData] = useState(item);
  const [instructorName, setInstructorName] = useState('');
  const { getCourse, selectedCourse, authors } = useContext(DataContext);
  useEffect(() => {
    const getData = async(id) => {
      let data = await getCourse(id);
      if (data) {
        await setCourseData(data);
        let author = authors.find((n) => n.id == data.instructorId);
        if (author) {
          setInstructorName(author["user.name"]);
        }
      }
    }
    setInstructorName(
      courseData.instructorName
        ? courseData.instructorName
        : courseData["instructor.user.name"]
    );
    getData(item.id);
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
        <Text style={styles.darkText}>
          {instructorName}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#2b2c30",
          }}
        >
          <Text style={{ color: "#f1c40f" }}>
            {courseData.courseAveragePoint
              ? courseData.courseAveragePoint.toFixed(2)
              : courseData.ratedNumber
              ? courseData.ratedNumber.toFixed(2)
              : 0}
          </Text>
          <Text style={styles.darkText}>
            (
            {courseData.courseSoldNumber
              ? courseData.courseSoldNumber
              : courseData.soldNumber
              ? courseData.soldNumber
              : 0}
            )
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
