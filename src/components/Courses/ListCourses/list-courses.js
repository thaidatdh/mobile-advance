import React from "react";
import {
  FlatList,
  TextInput,
  View,
  Button,
  SectionList,
  Text,
} from "react-native";
import ListCourseItem from "../ListCourseItem/list-course-item";

const ListCourses = (props) => {
  const courses = [
    {
      id: 1,
      title: "title 1",
      author: "author 1",
      level: "beginner",
      released: "June 6, 2020",
      duration: "38 hours",
    },
    {
      id: 2,
      title: "title 2",
      author: "author 1",
      level: "advance",
      released: "June 6, 2020",
      duration: "10 hours",
    },
    {
      id: 3,
      title: "title 3",
      author: "author 1",
      level: "beginner",
      released: "June 6, 2020",
      duration: "38 hours",
    },
    {
      id: 4,
      title: "title 4",
      author: "author 1",
      level: "advance",
      released: "June 6, 2020",
      duration: "10 hours",
    },
    {
      id: 5,
      title: "title 1",
      author: "author 1",
      level: "beginner",
      released: "June 6, 2020",
      duration: "38 hours",
    },
    {
      id: 6,
      title: "title 2",
      author: "author 1",
      level: "advance",
      released: "June 6, 2020",
      duration: "10 hours",
    },
    {
      id: 7,
      title: "title 3",
      author: "author 1",
      level: "beginner",
      released: "June 6, 2020",
      duration: "38 hours",
    },
    {
      id: 8,
      title: "title 4",
      author: "author 1",
      level: "advance",
      released: "June 6, 2020",
      duration: "10 hours",
    },
  ];
  const coursesSection = [
    {
      title: "Section 1",
      data: [
        {
          id: 1,
          title: "title 1",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38 hours",
        },
        {
          id: 2,
          title: "title 2",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10 hours",
        },
        {
          id: 3,
          title: "title 3",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38 hours",
        },
        {
          id: 4,
          title: "title 4",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10 hours",
        },
        {
          id: 5,
          title: "title 1",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38 hours",
        },
        {
          id: 6,
          title: "title 2",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10 hours",
        },
        {
          id: 7,
          title: "title 3",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38 hours",
        },
        {
          id: 8,
          title: "title 4",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10 hours",
        },
      ],
    },
    {
      title: "Section 2",
      data: [
        {
          id: 1,
          title: "title 1",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38 hours",
        },
        {
          id: 2,
          title: "title 2",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10 hours",
        },
        {
          id: 3,
          title: "title 3",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38 hours",
        },
        {
          id: 4,
          title: "title 4",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10 hours",
        },
        {
          id: 5,
          title: "title 1",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38 hours",
        },
        {
          id: 6,
          title: "title 2",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10 hours",
        },
        {
          id: 7,
          title: "title 3",
          author: "author 1",
          level: "beginner",
          released: "June 6, 2020",
          duration: "38 hours",
        },
        {
          id: 8,
          title: "title 4",
          author: "author 1",
          level: "advance",
          released: "June 6, 2020",
          duration: "10 hours",
        },
      ],
    },
  ];
  const searchView = () => {
    return (
      <View style={{ flexDirection: "row", margin: 5 }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "lightgray",
            color: "white",
            borderRadius: 5,
          }}
          placeholder="Search text"
        />
        <Button
          style={{ width: 60, height: 40 }}
          onPress={() => {
            console.log("search");
          }}
          title="Search"
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={courses}
        renderItem={({ item }) => <ListCourseItem item={item} />}
        ListHeaderComponent={() => searchView()}
      />
    </View>
  );
};

export default ListCourses;
