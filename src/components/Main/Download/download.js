import React, {useState} from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  SectionList,
  Text,
  Dimensions
} from "react-native";
import DownloadData from "./download-data";
import DownloadEmpty from "./download-empty"
const {width, height} = Dimensions.get("window");
const Download = (props) => {
  const courses = [
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
  ];
  const [isEmpty, setIsEmpty] = useState(props.isEmpty === null ? true : props.isEmpty);

  return (
    <View style={{flex:1, backgroundColor: "#0E0F13"}}>
      {isEmpty ? <DownloadEmpty onCheckNotEmpty={() => setIsEmpty(false)}/> : <DownloadData courses={courses} onCheckEmpty={() => setIsEmpty(true)}/>}
    </View>
  );
};

export default Download;
