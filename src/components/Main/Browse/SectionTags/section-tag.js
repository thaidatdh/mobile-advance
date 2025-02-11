import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

const SectionTags = (props) => {
  const tagsList = [{
    id:1,
    title:"Angular"
  },
  {
    id:2,
    title:"JavaScript"
  },
  {
    id:3,
    title:"C#"
  },
  {
    id:4,
    title:"Java"
  },
  {
    id:5,
    title:"Data Analysis"
  },
  {
    id:6,
    title:"ASP.NET"
  },
  {
    id:7,
    title:"Node.js"
  },
  {
    id:8,
    title:"Design Patterns"
  },
  {
    id:9,
    title:"Python"
  },
  {
    id:10,
    title:"React"
  },
  {
    id:11,
    title:".NET"
  },
  {
    id:12,
    title:"SQL Server"
  },
  {
    id:13,
    title:"Database Administration"
  },
  {
    id:14,
    title:"Part Modeling"
  },
  {
    id:15,
    title:"Information Security"
  },
  {
    id:16,
    title:"ASP.NET Core"
  },
  {
    id:17,
    title:"TypeScript"
  },
  {
    id:18,
    title:"Machine Learning"
  },
  {
    id:19,
    title:"Android"
  }];

  const renderListItems = (tags) => {
    return tags.map((item) => (
      <TouchableOpacity key={item.id} onPress={() => props.onPress(item.title)}>
        <Text style={styles.tag}>{item.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      <View>
        <Text style={{marginLeft: 15, marginBottom: 5, marginTop: 10, fontSize: 16, color:'white'}}>{props.title}</Text>
      </View>
      <ScrollView style={{paddingLeft: 10}} horizontal={true}>{renderListItems(tagsList)}</ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  tag: {
    backgroundColor: '#2b2c30',
    borderRadius: 20,
    margin: 5,
    color: 'white',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
});
export default SectionTags;
