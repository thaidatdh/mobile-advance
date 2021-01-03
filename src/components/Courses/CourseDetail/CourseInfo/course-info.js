import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import ActionButton from "./components/action-button";
import AuthorTag from "./components/author-tag";
import SectionContent from "./components/section-content";
import SectionRating from "./components/section-rating";
import SectionDescription from "./components/section-description";
import { AuthContext } from "../../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../../Contexts/DataContextProvider";
import { coursesData } from "../../../../data/dataMockup";
import ApiServices from "../../../../services/api-services";
import PhoneStorage from "../../../../services/phone-storage";
const { width, height } = Dimensions.get("window");

const CourseInfo = (props) => {
  const [isInContent, setIsInContent] = useState(0);
  const [authors, setAuthors] = useState(null);
  const {
    user,
    token,
    addDownloaded,
    removeDownloaded,
    addBookmark,
    removeBookmark,
    addChannel,
    removeChannel,
    isBookmarked,
    isChanneled,
    isDownloaded,
  } = React.useContext(AuthContext);
  const { getCourse, selectedCourse, isInternetReachable } = React.useContext(
    DataContext
  );
  const [transcript, setTranscript] = useState("");
  const [isDownloadedCourse, setIsDownloadedCourse] = useState(
    isDownloaded(props.course.title)
  );
  const [isChannelCourse, setIsChannelCourse] = useState(
    isChanneled(props.course.title)
  );
  const [isBookmarkedCourse, setIsBookmarkedCourse] = useState(
    isBookmarked(props.course.title)
  );
  const [courseDetail, setCourseDetail] = useState(props.course);
  useEffect(() => {
    if (authors === undefined || authors == null || authors == "") {
      if (props.course.instructor) setAuthors(props.course.instructor.name);
    }
  }, []);
  useEffect(() => {
    //​
    const fetchDataAuth = async (id) => {
      try {
        let res = await ApiServices.getInstructorDetail(id);
        let response = await res.json();
        if (response.payload !== undefined) {
          await setAuthors(response.payload.name);
          PhoneStorage.save(
            "@instructor_name_" + id,
            JSON.stringify(response.payload.name)
          );
        }
      } catch (err) {
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
      }
    };
    setAuthors(props.course["instructor.user.name"]);
    if (props.course.instructor) {
      setAuthors(props.course.instructor.name);
    }
    if (authors === null || authors === undefined || authors === "")
      fetchDataAuth(props.course.instructorId);
  }, []);
  const onPressContent = () => {
    setIsInContent(1);
  };
  const onPressTranscript = () => {
    setIsInContent(2);
  };
  const onPressDescription = () => {
    setIsInContent(0);
  };
  const onPressRating = () => {
    setIsInContent(3);
  };
  const onChangeTranscript = (text) => {
    setTranscript(text);
  };
  const onPressBookmark = () => {
    if (!user) {
      return;
    }
    if (!isBookmarkedCourse) {
      addBookmark(props.course.id);
      setIsBookmarkedCourse(true);
    } else {
      removeBookmark(props.course.id);
      setIsBookmarkedCourse(false);
    }
  };
  const onPressAddToChannel = () => {
    if (!user) {
      return;
    }
    if (!isChannelCourse && props.course.price === 0) {
      addChannel(props.course.id);
      setIsChannelCourse(true);
    } else {
      //removeChannel(props.course);
      //setIsChannelCourse(false);
    }
  };
  const onPressDownload = () => {
    if (!user) {
      return;
    }
    if (!isDownloadedCourse) {
      addDownloaded(props.course);
      setIsDownloadedCourse(true);
    } else {
      removeDownloaded(props.course);
      setIsDownloadedCourse(false);
    }
  };
  const renderAuthors = (authors) => {
    if (authors === null || authors === undefined || authors === "") {
      return null;
    }
    return Array.isArray(authors) ? (
      authors.map((item) => (
        <AuthorTag
          key={item.name}
          author={item}
          onPress={() => props.onPressAuthor(item)}
        />
      ))
    ) : (
      <AuthorTag
        key={authors}
        author={authors}
        onPress={() => props.onPressAuthor(authors)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Text style={styles.title}>
          {courseDetail.title ? courseDetail.title : courseDetail.courseTitle}
        </Text>
        <View style={styles.authors}>{renderAuthors(authors)}</View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "lightgray", fontSize: 12 }}>
            {courseDetail.status ? courseDetail.status + " - " : ""}
            {courseDetail.createdAt
              ? courseDetail.createdAt.substring(0, 10) + " - "
              : ""}
            {courseDetail.totalHours
              ? courseDetail.totalHours.toFixed(2) + " hours"
              : ""}
          </Text>
          <Text
            style={{
              color: "orange",
              fontSize: 12,
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            {courseDetail.averagePoint
              ? courseDetail.averagePoint
              : courseDetail.contentPoint}
          </Text>
          <Text style={{ color: "lightgray", fontSize: 12 }}>
            {courseDetail.ratedNumber != undefined
              ? "(" + courseDetail.ratedNumber + ")"
              : ""}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <ActionButton
            title={!isBookmarkedCourse ? "Bookmark" : "Bookmarked"}
            icon="bookmark"
            onPress={onPressBookmark}
          />
          <ActionButton
            title={!isChannelCourse ? "Buy Course" : "Owned"}
            icon="plus"
            onPress={onPressAddToChannel}
          />
          {/*<ActionButton
            title={!isDownloadedCourse ? "Download" : "Downloaded"}
            icon="download"
            onPress={onPressDownload}
          />*/}
        </View>

        <View>
          <Button style={styles.buttons}>
            <Text style={{ color: "white", textTransform: "none" }}>
              Price: {courseDetail.price}
            </Text>
          </Button>
          <Button style={styles.buttons}>
            <Text style={{ color: "white", textTransform: "none" }}>
              {courseDetail.videoNumber}
            </Text>
          </Button>
        </View>
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          height: height * 0.05,
          backgroundColor: "#1f242a",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          key="course_description"
          style={
            isInContent != 0 ? styles.buttonSwitch : styles.buttonSwitchSelected
          }
          onPress={onPressDescription}
        >
          <Text
            style={
              isInContent != 0 ? styles.buttonText : styles.buttonTextSelect
            }
          >
            Description
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="course_rating"
          style={
            isInContent != 3 ? styles.buttonSwitch : styles.buttonSwitchSelected
          }
          onPress={onPressRating}
        >
          <Text
            style={
              isInContent != 3 ? styles.buttonText : styles.buttonTextSelect
            }
          >
            Ratings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="course_section"
          style={
            isInContent != 1 ? styles.buttonSwitch : styles.buttonSwitchSelected
          }
          onPress={onPressContent}
        >
          <Text
            style={
              isInContent != 1 ? styles.buttonText : styles.buttonTextSelect
            }
          >
            Content
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="course_transcript"
          style={
            isInContent != 2 ? styles.buttonSwitch : styles.buttonSwitchSelected
          }
          onPress={onPressTranscript}
        >
          <Text
            style={
              isInContent != 2 ? styles.buttonText : styles.buttonTextSelect
            }
          >
            Transcript
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.contentView}>
        {isInContent == 0 ? (
          <SectionDescription
            description={
              courseDetail
                ? courseDetail.description +
                  (courseDetail.subtitle ? "\n" + courseDetail.subtitle : "") +
                  (courseDetail.requirement
                    ? "\nRequirement:\n - " +
                      courseDetail.requirement.join("\n - ")
                    : "") +
                  (courseDetail.learnWhat
                    ? "\nLearn:\n - " + courseDetail.learnWhat.join("\n - ")
                    : "")
                : ""
            }
          />
        ) : isInContent == 1 ? (
          <SectionContent
            content={props.course.section}
            onChangeVideo={props.onChangeVideo}
            onChangeTranscript={onChangeTranscript}
          />
        ) : isInContent == 2 ? (
          <SectionDescription description={transcript} />
        ) : (
          <SectionRating content={props.course.ratings} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  infoSection: {
    padding: 10,
    height: height * 0.45,
    backgroundColor: "#1f242a",
    color: "white",
  },
  title: { color: "white", fontSize: 17, marginTop: 10 },
  authors: { flexDirection: "row", marginTop: 10, marginBottom: 10 },
  buttonSwitch: { backgroundColor: "#1f242a", width: width * 0.3 },
  buttonSwitchSelected: {
    backgroundColor: "#1f242a",
    borderBottomWidth: 2,
    borderBottomColor: "#2384ae",
    width: width * 0.3,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonTextSelect: {
    color: "#2384ae",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  contentView: {
    height: height * 0.58,
    backgroundColor: "white",
  },
  buttons: {
    width: width * 0.9,
    backgroundColor: "#394249",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default CourseInfo;
