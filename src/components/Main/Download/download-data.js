import React from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  SectionList,
  Text,
  Dimensions
} from "react-native";
import ListCourseItem from "../../Courses/ListCourses/ListCourseItem/list-course-item";
import { Languages, SettingContext } from "../../../Contexts/SettingContextProvider";
const {width, height} = Dimensions.get("window");
const DownloadData = (props) => {
  const { theme, language } = React.useContext(SettingContext);
  const renderItems = (coursesList) => {
    return coursesList.map((item) => (
      <ListCourseItem
        key={item.id.toString()}
        item={item}
        onPress={props.onPressCourse}
      />
    ));
  }
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.c_0E0F13 }}>
      <View
        style={{
          marginLeft: 10,
          marginTop: 20,
          marginBottom: 20,
          marginRight: 20,
          color: "white",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: theme.c_white, fontSize: 15 }}>
          {props.courses.length}
          {" " + language.courses_lower}
        </Text>
        <Text
          style={{
            color: theme.c_2384ae,
            textTransform: "uppercase",
            fontSize: 15,
          }}
          onPress={props.onCheckEmpty}
        >
          {" "}
          {language.RemoveAll}
        </Text>
      </View>
      <ScrollView>{renderItems(props.courses)}</ScrollView>
    </View>
  );
};

export default DownloadData;
