import React, { useState } from "react";
import {View, Dimensions, StyleSheet, Text, ScrollView } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const {width, height} = Dimensions.get("window");

const ContentSubsection = (props) => {
  const renderListContent = (contents) => {
    return contents.map(item => 
    <View key={item.title} style={styles.item}>
      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <View style={{backgroundColor: 'gray', borderRadius: 10, height: 10, width: 10, marginRight: 10}}></View>
        <Text style={{color: 'white'}}>{item.title}</Text>
      </View>
      <Text style={{color: 'white'}}>{item.time}</Text>
    </View>);
  }
  return (
      <View style={{width: width, marginBottom: 20, alignItems: 'center'}}>
        <View style={{height: height * 0.1, justifyContent: 'center', flexDirection:'row', alignItems: 'center' }}>
          <View style={{flexDirection:'row', width: width*0.9}}>
            <View style={{backgroundColor: '#1f242a', borderBottomWidth: 3, borderColor: '#394249', width: width*0.2,height: height*0.08, maxWidth: 100, maxHeight: 90, justifyContent: "center"}}>
              <Text style={{color: 'white', fontSize: 20, alignSelf: 'center'}}>{props.item.id}</Text>
            </View>
            <Text style={{color: 'white', width: width*0.9,paddingLeft: 20, alignSelf: 'center'}}>{props.item.title}</Text>
          </View>
        </View>
         <View style={{width: width*0.9}}>
          {renderListContent(props.item.content)}
         </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0E0F13",
  },
  item: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  }
});

export default ContentSubsection;