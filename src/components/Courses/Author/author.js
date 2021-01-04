import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
} from "react-native";
import ListCourseItem from "../ListCourses/ListCourseItem/list-course-item";
import { DataContext } from "../../../Contexts/DataContextProvider";
import FileSystemApi from "../../../services/file-system-api";
const { width, height } = Dimensions.get("window");
const Author = ({ navigation, route }) => {
  const { getAuthorInfo, isInternetReachable } = React.useContext(DataContext);
  const [author, setAuthor] = useState(route.params.author);
  const [courses, setCourses] = useState([]);
  const [imageUrl, setImageUrl] = useState(
    route.params.author["user.avatar"]
      ? route.params.author["user.avatar"]
      : route.params.author.avatar
  );
  useEffect(() => {
    navigation.setOptions({
      title: route.params.author["user.name"]
        ? route.params.author["user.name"]
        : route.params.author.name,
    });
    getAuthorInfo(route.params.author.id).then((res) => {
      if (res) {
        setCourses(res.courses);
        setAuthor(res);
      }
    });
  }, []);

  useEffect(() => {
    const getImage = () => {
      const url = route.params.author["user.avatar"]
        ? route.params.author["user.avatar"]
        : route.params.author.avatar;
      setImageUrl(url);
      if (!isInternetReachable) {
        FileSystemApi.getInstructorImage(route.params.author.id, url)
          .then((courseImage) => {
            if (courseImage) {
              setImageUrl(courseImage);
            }
          })
          .catch((err) => {});
      }
    };
    try {
      getImage();
    } catch (err) {}
  }, []);
  const onPressCourse = (course) => {
    navigation.popToTop();
    navigation.navigate("Course", { course: course });
  };
  const renderItems = (coursesList) => {
    return coursesList.map((item) => (
      <ListCourseItem
        key={item.id.toString()}
        item={item}
        author={author["user.name"]}
        onPress={onPressCourse}
        navigation={navigation}
      />
    ));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <ScrollView>
        <View key="AuthorInfo" style={styles.authorInfoView}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.authorName}>
            {author["user.name"] ? author["user.name"] : author.name}
          </Text>
          {author.intro ? (
            <Text style={styles.desc}>{author.intro}</Text>
          ) : null}
          <View style={styles.descView}>
            <Text style={styles.desc}>Email:</Text>
            <Text style={styles.desc}>
              {author["user.email"] ? author["user.email"] : author.email}
            </Text>
          </View>
          {author.skills ? (
            <View style={styles.descView}>
              <Text style={styles.desc}>Skills:</Text>
              <Text style={styles.desc}>{author.skills.join(", ")}</Text>
            </View>
          ) : null}
          {author.major ? (
            <View style={styles.descView}>
              <Text style={styles.desc}>Major:</Text>
              <Text style={styles.desc}>{author.major}</Text>
            </View>
          ) : null}
          {author.phone ? (
            <View style={styles.descView}>
              <Text style={styles.desc}>Phone:</Text>
              <Text style={styles.desc}>{author.phone}</Text>
            </View>
          ) : null}
          {author.totalCourse ? (
            <View style={styles.descView}>
              <Text style={styles.desc}>Total Courses:</Text>
              <Text style={styles.desc}>{author.totalCourse}</Text>
            </View>
          ) : null}
        </View>
        {renderItems(courses)}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  authorInfoView: {
    flex: 1,
    justifyContent: "center",
    height: height * 0.7,
  },
  image: {
    height: width * 0.3,
    width: width * 0.3,
    maxHeight: 400,
    maxWidth: 400,
    borderRadius: width * 0.3 > 400 ? 200 : width * 0.3 * 0.5,
    margin: 20,
    alignSelf: "center",
  },
  authorName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    marginTop: 20,
  },
  descView: {
    width: width * 0.8,
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
  },
  desc: {
    color: "white",
    textAlign: "justify",
    marginBottom: 20,
    alignSelf: "center",
  },
});
export default Author;
