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
const { width, height } = Dimensions.get("window");
const Author = ({ navigation, route }) => {
  const { getAuthorCourses } = React.useContext(DataContext);
  const [author, setAuthor] = useState(route.params.author);
  const [courses, setCourses] = useState(
    getAuthorCourses(route.params.author.title)
  );
  useEffect(() => {
    navigation.setOptions({ title: route.params.author.title });
  }, []);
  const onPressCourse = (course) => {
    navigation.navigate("Course", { course: course });
  };
  const renderItems = (coursesList) => {
    return coursesList.map((item) => (
      <ListCourseItem
        key={item.id.toString()}
        item={item}
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
          <Image
            source={require("../../../../assets/bg.png")}
            style={styles.image}
          />
          <Text style={styles.authorName}>{author.title}</Text>
          <Text style={styles.desc}>{author.description}</Text>
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
    height: height,
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
  desc: {
    color: "white",
    width: width * 0.8,
    textAlign: "justify",
    marginBottom: 20,
    alignSelf: 'center'
  },
});
export default Author;
