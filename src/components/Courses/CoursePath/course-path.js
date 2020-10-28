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
import ListCourseItem from "../ListCourses/ListCourseItem/list-course-item";
const {width, height} = Dimensions.get("window");
const CoursePath = (props) => {
  const courses = [
    {
      title: 'course 1',
      data: [
        {
          id: 1,
          title: "title 1",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38h",
          rating: 4.5,
          ratingCount: 10,
        },
        {
          id: 2,
          title: "title 2",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10h",
          rating: 4.2,
          ratingCount: 10,
        },
        {
          id: 3,
          title: "title 3",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38h",
          rating: 4.8,
          ratingCount: 10,
        },
      ]
    }, 
    {
      title: 'course 2',
      data: [
        {
          id: 4,
          title: "title 4",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10h",
          rating: 4.2,
          ratingCount: 11,
        },
        {
          id: 5,
          title: "title 1",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38h",
          rating: 5,
          ratingCount: 15,
        },
        {
          id: 6,
          title: "title 2",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10h",
          rating: 3.5,
          ratingCount: 20,
        },
        {
          id: 7,
          title: "title 3",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38h",
          rating: 4,
          ratingCount: 12,
        },
        {
          id: 8,
          title: "title 4",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10h",
          rating: 2.5,
          ratingCount: 10,
        },
        {
          id: 9,
          title: "title 3",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38h",
          rating: 4,
          ratingCount: 12,
        },
        {
          id: 10,
          title: "title 4",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10h",
          rating: 2.5,
          ratingCount: 10,
        },
      ]
    }
  ];

  const renderItem = (course) => {
    return <ListCourseItem key={course.id.toString()} item={course} />;
  }
  return (
    <View style={{backgroundColor: "#0E0F13"}}>
      <View style={{marginLeft: 10, marginTop: 20, marginBottom: 20, color: 'white'}}>
        <Text style={{color: 'white', fontSize: 20}}>{props.title}</Text>
      </View>
      
      <SectionList sections={courses} renderItem={({item}) => renderItem(item)} renderSectionHeader={({section: {title}}) => <Text style={{color:'white', padding: 20}}>{title}</Text>}/>
    </View>
  );
};

export default CoursePath;
