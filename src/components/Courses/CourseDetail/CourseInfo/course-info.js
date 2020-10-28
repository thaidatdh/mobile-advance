import React from "react";
import {View, Dimensions, StyleSheet, Text, Image,FlatList, ScrollView } from 'react-native'
import ActionButton from "./components/action-button";
import AuthorTag from "./components/author-tag";

const {width, height} = Dimensions.get("window");

const CourseInfo = (props) => {

  const onPressBookmark = () => {

  }
  const onPressAddToChannel = () => {
    
  }
  const onPressDownload = () => {
    
  }

  const renderAuthors = (authors) => {
    return authors.map((item) => <AuthorTag key={item.name} author={item}/>)
  }
  return (
    <View style={styles.container}>
      <View style={{padding: 10, height: height * 0.4, backgroundColor: '#1f242a', color: 'white'}}>
        <Text style={{color:'white', fontSize: 20, marginTop: 10}}>{props.course.title}</Text>
        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
          {renderAuthors(props.course.authors)}
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'lightgray', fontSize: 12}}>{props.course.level} - {props.course.released} - {props.course.duration}</Text>
          <Text style={{color: 'orange', fontSize: 12, paddingRight: 10, paddingLeft: 10}}>{props.course.rating}/5</Text>
          <Text style={{color: 'lightgray', fontSize: 12}}>({props.course.ratingCount})</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 20}}>
          <ActionButton title="Bookmark" icon="bookmark" onPress={onPressBookmark}/>
          <ActionButton title="Add to Channel" icon="plus" onPress={onPressAddToChannel}/>
          <ActionButton title="Download" icon="download" onPress={onPressDownload}/>
        </View>

        <View>
          <Text style={{color: 'white'}}>{props.course.descriptions}</Text>
        </View>

        <View>

        </View>
      </View>

      <View style={{height: height * 0.075, backgroundColor: 'white'}}>

      </View>
      <View style={{height: height *0.525}}>
        <View style={{height: height}}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  imageView: {
    width: width,
    height: height * 0.3
  },
  image: {
    height: "100%",
    width: "100%"
  }
});

export default CourseInfo;