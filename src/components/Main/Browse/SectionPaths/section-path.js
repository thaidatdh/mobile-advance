import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";
import PathItem from "./PathItem/path-item";

const SectionPath = (props) => {
  const tagsList = [
    {
      id: 1,
      title: "Angular",
      courses: 94,
    },
    {
      id: 2,
      title: "JavaScript",
      courses: 94,
    },
    {
      id: 3,
      title: "C#",
      courses: 94,
    },
    {
      id: 4,
      title: "Java",
      courses: 94,
    },
    {
      id: 5,
      title: "Data Analysisssssssss sssssss",
      courses: 94,
    },
    {
      id: 6,
      title: "ASP.NET",
      courses: 94,
    },
    {
      id: 7,
      title: "Node.js",
      courses: 94,
    },
  ];

  const renderListItems = (tags) => {
    return tags.map((item) => <PathItem key={item.id} item={item} />);
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
        <Text style={styles.titleText}>{props.title}</Text>
        <TouchableOpacity style={styles.seeAllButtonView}>
          <Text style={{ color: "lightgray", fontSize: 10 }}>See all <FontAwesome5 name={"angle-right"} color="lightgray" size={10}/></Text>
         
        </TouchableOpacity>
      </View>
      <ScrollView style={{ paddingLeft: 10 }} horizontal={true}>
        {renderListItems(tagsList)}
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
export default SectionPath;
