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
import SectionDescription from "./components/section-description";
import { AuthContext } from "../../../../Contexts/AuthContextProvider";
import { coursesData } from "../../../../data/dataMockup";
const { width, height } = Dimensions.get("window");

const CourseInfo = (props) => {
  const [isInContent, setIsInContent] = useState(0);
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
    //​
    const fetchData = async (id) => {
      const url =
        "http://api.dev.letstudy.org/course​/detail-with-lesson​/" + id;
      console.log(url);
      const requestOptionsUser = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      };
      console.log(token);
      try {
        let res = await fetch(url, requestOptionsUser);
        let response = await res.json();
        console.log(response);
        if (response.payload !== undefined) {
          await setCourseDetail(response.payload);
          console.log(response.payload.section);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(props.course.id);
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
  const onPressBookmark = () => {
    if (!user) {
      return;
    }
    if (!isBookmarkedCourse) {
      addBookmark(props.course);
      setIsBookmarkedCourse(true);
    } else {
      removeBookmark(props.course);
      setIsBookmarkedCourse(false);
    }
  };
  const onPressAddToChannel = () => {
    if (!user) {
      return;
    }
    if (!isChannelCourse) {
      addChannel(props.course);
      setIsChannelCourse(true);
    } else {
      removeChannel(props.course);
      setIsChannelCourse(false);
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
    return Array.isArray(authors) ? (
      authors.map((item) => (
        <AuthorTag
          key={item.name}
          author={item}
          onPress={() => props.onPressAuthor(item)}
        />
      ))
    ) : ( authors === undefined ? null :
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
        <Text style={styles.title}>{courseDetail.title}</Text>
        <View style={styles.authors}>
          {renderAuthors(courseDetail.instructorName)}
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "lightgray", fontSize: 12 }}>
            {courseDetail.status} - {courseDetail.createdAt.substring(0, 10)} -{" "}
            {courseDetail.totalHours.toFixed(3)} hours
          </Text>
          <Text
            style={{
              color: "orange",
              fontSize: 12,
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            {courseDetail.ratedNumber}
          </Text>
          <Text style={{ color: "lightgray", fontSize: 12 }}>
            ({courseDetail.ratedNumber})
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
            title={!isChannelCourse ? "Add to Channel" : "Remove Channel"}
            icon="plus"
            onPress={onPressAddToChannel}
          />
          <ActionButton
            title={!isDownloadedCourse ? "Download" : "Downloaded"}
            icon="download"
            onPress={onPressDownload}
          />
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

      <View
        style={{
          height: height * 0.05,
          backgroundColor: "#1f242a",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
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
      </View>

      <View style={styles.contentView}>
        {isInContent == 0 ? (
          <SectionDescription description={courseDetail.description} />
        ) : isInContent == 1 ? (
          <SectionContent content={courseDetail.section} />
        ) : (
          <SectionDescription
            description={
              courseDetail.subtitle +
              "\nRequirement:\n - " +
              courseDetail.requirement.join("\n - ") +
              "\nLearn:\n - " +
              courseDetail.learnWhat.join("\n - ")
            }
          />
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
