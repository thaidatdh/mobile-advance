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
const {width, height} = Dimensions.get("window");
const DownloadData = (props) => {
  const renderItems = (coursesList) => {
    return coursesList.map(item => <ListCourseItem key={item.id.toString()} item={item} />);
  }
  return (
    <View style={{flex:1, backgroundColor: "#0E0F13"}}>
      <View style={{marginLeft: 10, marginTop: 20, marginBottom: 20, marginRight: 20, color: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: 'white', fontSize: 15}}>{props.courses.length} courses</Text>
        <Text style={{color: '#2384ae', textTransform: 'uppercase', fontSize: 15}} onPress={props.onCheckEmpty}> Remove all</Text>
      </View>
      <ScrollView>
        {renderItems(props.courses)}
      </ScrollView>
    </View>
  );
};

export default DownloadData;
