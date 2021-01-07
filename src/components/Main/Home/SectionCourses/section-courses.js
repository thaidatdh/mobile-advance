import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SectionCourseItem from "./SectionCourseItem/section-course-item";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { coursesData } from "../../../../data/dataMockup";
import { SettingContext } from "../../../../Contexts/SettingContextProvider";
const SectionCourses = ({ onSeeAll, title, onPressCourse, coursesList }) => {
  const { theme, language } = React.useContext(SettingContext);
  const renderListItems = (courses) => {
    return courses
      ? courses.map((item) => (
          <SectionCourseItem
            key={item.id}
            item={item}
            onPress={onPressCourse}
          />
        ))
      : null;
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{...styles.titleText, color: theme.c_white}}>{title}</Text>
        <TouchableOpacity
          style={styles.seeAllButtonView}
          onPress={() => onSeeAll(title, coursesList)}
        >
          <Text style={{ color: theme.c_lightgray, fontSize: 10 }}>
            {language.SeeAll}{" "}
            <FontAwesome5 name={"angle-right"} color={theme.c_lightgray} size={10} />
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ paddingLeft: 10 }} horizontal={true}>
        {renderListItems(coursesList)}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  titleText: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10,
    fontSize: 16,
    color: "white",
  },
  seeAllButtonView: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    borderRadius: 8,
    height: 20,
    alignSelf: "flex-end",
    marginRight: 5,
  },
});
export default SectionCourses;
