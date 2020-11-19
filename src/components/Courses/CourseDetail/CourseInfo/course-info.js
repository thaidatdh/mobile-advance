import React, { useState } from "react";
import {View, Dimensions, StyleSheet, Text, Image,FlatList, ScrollView, TouchableOpacity } from 'react-native'
import {Button} from 'react-native-paper'
import ActionButton from "./components/action-button";
import AuthorTag from "./components/author-tag";
import SectionContent from "./components/section-content";
import SectionDescription from "./components/section-description";

const {width, height} = Dimensions.get("window");

const CourseInfo = (props) => {
  const [isMinDesc, setIsMinDesc] = useState(true);
  const [isInContent, setIsInContent] = useState(0);
  const onPressContent = () => {
    setIsInContent(1);
  }
  const onPressTranscript = () => {
    setIsInContent(2);
  }
  const onPressDescription = () => {
    setIsInContent(0);
  }
  const onChangeIsMinDesc = () => {
    setIsMinDesc(!isMinDesc);
  }
  const onPressBookmark = () => {

  }
  const onPressAddToChannel = () => {
    
  }
  const onPressDownload = () => {
    
  }

  const renderAuthors = (authors) => {
    return Array.isArray(authors) ? (
      authors.map((item) => <AuthorTag key={item.name} author={item} />)
    ) : (
      <AuthorTag key={authors} author={authors} />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Text style={styles.title}>{props.course.title}</Text>
        <View style={styles.authors}>
          {renderAuthors(props.course.author)}
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
          <Button style={styles.buttons}>
            <Text style={{color: 'white', textTransform: 'none'}}>Take a learning check</Text>
          </Button>
          <Button style={styles.buttons}>
            <Text style={{color: 'white', textTransform: 'none'}}>View related Paths and courses</Text>
          </Button>
        </View>
      </View>

      <View style={{height: height * 0.05, backgroundColor: '#1f242a', flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity style={isInContent !=0 ? styles.buttonSwitch : styles.buttonSwitchSelected} onPress={onPressDescription}>
          <Text style={isInContent!= 0 ? styles.buttonText : styles.buttonTextSelect}>Description</Text>
        </TouchableOpacity>
        <TouchableOpacity style={isInContent!=1 ? styles.buttonSwitch : styles.buttonSwitchSelected} onPress={onPressContent}>
          <Text style={isInContent!=1 ? styles.buttonText : styles.buttonTextSelect}>Content</Text>
        </TouchableOpacity>
        <TouchableOpacity style={isInContent!=2 ? styles.buttonSwitch : styles.buttonSwitchSelected} onPress={onPressTranscript}>
          <Text style={isInContent!=2 ? styles.buttonText : styles.buttonTextSelect}>Transcript</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentView}>
        {isInContent == 0 ? <SectionDescription description={props.course.description}/> : (isInContent == 1 ? <SectionContent content={props.course.content}/> : <SectionDescription description={props.course.transcript}/>)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  infoSection: {padding: 10, height: height * 0.45, backgroundColor: '#1f242a', color: 'white'},
  title: {color:'white', fontSize: 17, marginTop: 10},
  authors: {flexDirection: 'row', marginTop: 10, marginBottom: 10},
  buttonSwitch : {backgroundColor:'#1f242a', width: width * 0.3},
  buttonSwitchSelected : {backgroundColor:'#1f242a', borderBottomWidth: 2,borderBottomColor: '#2384ae', width: width * 0.3},
  buttonText: {color: 'white', alignSelf: 'center', textTransform: 'uppercase'},
  buttonTextSelect: {color: '#2384ae', alignSelf: 'center', textTransform: 'uppercase'},
  contentView: {
    height: height * 0.58, 
    backgroundColor: 'white'
  },
  buttons: {
    width: width * 0.9,
    backgroundColor: "#394249",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  }
});

export default CourseInfo;