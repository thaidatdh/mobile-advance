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
  Alert,
  Share,
} from "react-native";
import { Button } from "react-native-paper";
import ActionButton from "./components/action-button";
import AuthorTag from "./components/author-tag";
import SectionContent from "./components/section-content";
import SectionRating from "./components/section-rating";
import SectionDescription from "./components/section-description";
import { AuthContext } from "../../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../../Contexts/DataContextProvider";
import { SettingContext } from "../../../../Contexts/SettingContextProvider";
import { coursesData } from "../../../../data/dataMockup";
import ApiServices from "../../../../services/api-services";
import PhoneStorage from "../../../../services/phone-storage";
import RatingDialog from "./components/rating-dialog";
const { width, height } = Dimensions.get("window");

const CourseInfo = (props) => {
  const [isInContent, setIsInContent] = useState(0);
  const [authors, setAuthors] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const { theme, language } = React.useContext(SettingContext);
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
    isDownloaded(props.course.id)
  );
  const [isChannelCourse, setIsChannelCourse] = useState(
    isChanneled(props.course.id)
  );
  const [isBookmarkedCourse, setIsBookmarkedCourse] = useState(
    isBookmarked(props.course.id)
  );
  const [courseDetail, setCourseDetail] = useState(props.course);
  useEffect(() => {
    if (authors === undefined || authors == null || authors == "") {
      if (props.course.instructor) setAuthors(props.course.instructor.name);
    }
  }, []);
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
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const onPressBookmark = () => {
    if (!user) {
      Alert.alert(
        props.course.title ? props.course.title : props.course.courseTitle,
        language.LogintoBookmark
      );
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
      Alert.alert(
        props.course.title ? props.course.title : props.course.courseTitle,
        language.Logintobuy
      );
      return;
    }
    if (!isChannelCourse && props.course.price === 0) {
      addChannel(props.course.id);
      setIsChannelCourse(true);
    } else {
      Alert.alert(
        props.course.title ? props.course.title : props.course.courseTitle,
        language.Cannotbuyselectedcourse
      );
    }
  };
  const onPressDownload = () => {
    if (!user) {
      Alert.alert(
        props.course.title ? props.course.title : props.course.courseTitle,
        language.LogintoDownload
      );
      return;
    }
    if (!isChannelCourse) {
      Alert.alert(
        props.course.title ? props.course.title : props.course.courseTitle,
        language.Youhavetoowncoursetodownload
      );
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
  const onPressComment = () => {
    if (!user) {
      Alert.alert(
        props.course.title ? props.course.title : props.course.courseTitle,
        language.LogintoRatethiscourse
      );
      return;
    }
    if (!isChannelCourse) {
      Alert.alert(
        props.course.title ? props.course.title : props.course.courseTitle,
        language.Youhavetoowncoursetorate
      );
      return;
    }
    showDialog();
  };
  const handleSaveRating = (
    formalityPoint,
    presentationPoint,
    contentPoint,
    content
  ) => {
    ApiServices.ratingCourse(
      token,
      props.course.id,
      formalityPoint,
      presentationPoint,
      contentPoint,
      content
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.message == "OK") {
          props.onReload();
        }
      })
      .catch((err) => console.log(err));
  };
  const onPressShare = async () => {
    try {
      const message =
        (props.course.title ? props.course.title : props.course.courseTitle) +
        "\n" +
        language.AveragePoint +
        ": " +
        props.course.averagePoint;
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
  const buttonSwitch = {
    ...styles.buttonSwitch,
    backgroundColor: theme.c_1f242a,
  };
  const buttonSwitchSelected = {
    ...styles.buttonSwitchSelected,
    backgroundColor: theme.c_1f242a,
    borderBottomColor: theme.c_2384ae,
  };
  const buttonText = {
    ...styles.buttonText,
    color: theme.c_white,
  };
  const buttonTextSelect = {
    ...styles.buttonTextSelect,
    color: theme.c_2384ae,
  };
  return (
    <View style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}>
      <View
        style={{
          ...styles.infoSection,
          backgroundColor: theme.c_1f242a,
          color: theme.c_white,
        }}
      >
        <Text style={{ ...styles.title, color: theme.c_white }}>
          {courseDetail.title ? courseDetail.title : courseDetail.courseTitle}
        </Text>
        <View style={styles.authors}>{renderAuthors(authors)}</View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: theme.c_lightgray, fontSize: 12 }}>
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
              ? typeof courseDetail.averagePoint == "string"
                ? parseFloat(courseDetail.averagePoint).toFixed(1)
                : courseDetail.averagePoint.toFixed(1)
              : courseDetail.contentPoint}
          </Text>
          <Text style={{ color: theme.c_lightgray, fontSize: 12 }}>
            {courseDetail.ratedNumber != undefined
              ? "(" + courseDetail.ratedNumber + ")"
              : ""}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
            marginBottom: 20,
          }}
          horizontal={true}
        >
          <ActionButton
            key="likebtn"
            title={
              !isBookmarkedCourse ? language.Bookmark : language.Bookmarked
            }
            icon="bookmark"
            solid={isBookmarkedCourse}
            onPress={onPressBookmark}
          />
          <ActionButton
            key="buybtn"
            title={!isChannelCourse ? language.BuyCourse : language.Owned}
            icon={!isChannelCourse ? "plus" : "check"}
            onPress={onPressAddToChannel}
          />
          <ActionButton
            key="downloadbtn"
            title={
              !isDownloadedCourse ? language.Download_2 : language.Downloaded
            }
            icon="download"
            onPress={onPressDownload}
          />
          <ActionButton
            key="sharebtn"
            title={language.Share}
            icon="share"
            onPress={onPressShare}
          />
          <ActionButton
            key="ratebtn"
            title={language.Rate}
            icon="comment-alt"
            onPress={onPressComment}
          />
        </ScrollView>

        <View>
          <Button
            style={{ ...styles.buttons, backgroundColor: theme.c_394249 }}
          >
            <Text style={{ color: theme.c_white, textTransform: "none" }}>
              {language.Price}: {courseDetail.price}
            </Text>
          </Button>
          {props.learnedTime &&
          props.learnedTime != "" &&
          props.learnedTime.length > 16 ? (
            <Button
              style={{ ...styles.buttons, backgroundColor: theme.c_394249 }}
            >
              <Text style={{ color: theme.c_white, textTransform: "none" }}>
                {language.LastLearn +
                  ": " +
                  props.learnedTime.substring(0, 10) +
                  " " +
                  props.learnedTime.substring(11, 16)}
              </Text>
            </Button>
          ) : null}
        </View>
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          height: height * 0.05,
          backgroundColor: theme.c_1f242a,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          key="course_description"
          style={isInContent != 0 ? buttonSwitch : buttonSwitchSelected}
          onPress={onPressDescription}
        >
          <Text style={isInContent != 0 ? buttonText : buttonTextSelect}>
            {language.Description}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="course_rating"
          style={isInContent != 3 ? buttonSwitch : buttonSwitchSelected}
          onPress={onPressRating}
        >
          <Text style={isInContent != 3 ? buttonText : buttonTextSelect}>
            {language.Ratings}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="course_section"
          style={isInContent != 1 ? buttonSwitch : buttonSwitchSelected}
          onPress={onPressContent}
        >
          <Text style={isInContent != 1 ? buttonText : buttonTextSelect}>
            {language.Content}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="course_transcript"
          style={isInContent != 2 ? buttonSwitch : buttonSwitchSelected}
          onPress={onPressTranscript}
        >
          <Text style={isInContent != 2 ? buttonText : buttonTextSelect}>
            {language.Transcript}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={{ ...styles.contentView, backgroundColor: theme.c_white }}>
        {isInContent == 0 ? (
          <SectionDescription
            description={
              courseDetail
                ? courseDetail.description +
                  (courseDetail.subtitle ? "\n" + courseDetail.subtitle : "") +
                  (courseDetail.requirement
                    ? "\n" +
                      language.Requirement +
                      ":\n - " +
                      courseDetail.requirement.join("\n - ")
                    : "") +
                  (courseDetail.learnWhat
                    ? "\n" +
                      language.Learn +
                      ":\n - " +
                      courseDetail.learnWhat.join("\n - ")
                    : "")
                : ""
            }
          />
        ) : isInContent == 1 ? (
          <SectionContent
            content={props.course.section}
            onChangeVideo={props.onChangeVideo}
            onChangeTranscript={onChangeTranscript}
            currentLesson={props.currentLesson}
          />
        ) : isInContent == 2 ? (
          <SectionDescription description={transcript} />
        ) : (
          <SectionRating content={props.course.ratings} />
        )}
      </View>
      <RatingDialog
        visible={visible}
        hideDialog={hideDialog}
        onSave={handleSaveRating}
      />
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
