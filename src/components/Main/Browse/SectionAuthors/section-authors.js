import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import SectionAuthorItem from "./SectionAuthorItem/section-author-item";

const SectionAuthor = (props) => {
  const [authors] = useState(props.authors);
  const renderListItems = (tags) => {
    return tags.map((item) => (
      <SectionAuthorItem key={item.id} author={item}/>
    ));
  };

  return (
    <View>
      <View>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <ScrollView style={{paddingLeft: 10}} horizontal={true}>{renderListItems(authors)}</ScrollView>
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
    color:'white'
  },
});
export default SectionAuthor;