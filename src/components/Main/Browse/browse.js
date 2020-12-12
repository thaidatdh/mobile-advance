import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import ImageButton from "../../Common/image-button";
import SectionCategories from "./SectionCategories/section-categories";
import SignInSection from "./SignInSection/sign-in-section";
import SectionTags from "./SectionTags/section-tag";
import SectionAuthor from "./SectionAuthors/section-authors";
import SectionPath from "./SectionPaths/section-path";
import MAppBar from "../app-bar";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../Contexts/DataContextProvider";
const Browse = ({ navigation }) => {
  const imageButtonData = [
    {
      id: 1,
      title: ["New", "Releases"],
    },
    {
      id: 2,
      title: ["Top Sell"],
    },
  ];
  const { user, token } = React.useContext(AuthContext);
  const {
    courses,
    authors,
    loadNewReleased,
    newReleased,
    topSell,
    loadTopSell,
  } = React.useContext(DataContext);
  const [categoryCourse, setCategoryCourse] = useState([]);
  useEffect(() => {
    loadNewReleased();
    loadTopSell();
  }, []);
  const onPressNewReleaseButton = () => {
    navigation.navigate("List Courses", {
      title: "New Released",
      courses: newReleased,
    });
  };
  const onPressRecommendedButton = () => {
    navigation.navigate("List Courses", {
      title: "Top Sell",
      courses: topSell,
    });
  };
  const onPressCategory = async (categoryName, categoryId) => {
    const url = "http://api.dev.letstudy.org/course/search";
    const requestOptionsUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: "",
        opt: {
          sort: {
            attribute: "price",
            rule: "DESC",
          },
          category: [categoryId],
          time: [{ min: 0 }],
          price: [
            {
              min: 0,
            },
          ],
        },
        limit: 10,
        offset: 1,
      }),
    };
    try {
      let res = await fetch(url, requestOptionsUser);
      let response = await res.json();
      console.log(response.payload.rows);
      if (response.payload !== undefined && response.payload.rows != undefined) {
        await setCategoryCourse(response.payload.rows);
      } else {
        setCategoryCourse([]);
      }
    } catch (err) {
      console.log(err);
    }
    navigation.navigate("List Courses", {
      title: categoryName,
      courses: categoryCourse,
    });
  };
  const onPressSkills = (skills) => {
    /*const data = topSell.filter((n) => n.title.includes(skills));
    navigation.navigate("List Courses", {
      title: skills,
      courses: data,
    });*/
  };
  const onPressSignIn = () => {
    navigation.navigate("Sign In");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <MAppBar navigation={navigation} title="Browse" />
      <ScrollView style={styles.container}>
        <SignInSection
          style={user ? styles.signedIn : styles.notSignedIn}
          isSignedIn={user ? true : false}
          onPress={onPressSignIn}
        />
        <ImageButton
          key={imageButtonData[0].id}
          title={imageButtonData[0].title}
          onPress={onPressNewReleaseButton}
        />
        <ImageButton
          key={imageButtonData[1].id}
          title={imageButtonData[1].title}
          onPress={onPressRecommendedButton}
        />
        <SectionCategories onPress={onPressCategory} />
        {/*<SectionTags title="Popular Skills" onPress={onPressSkills} />
        <SectionPath title="Paths" />*/}
        <SectionAuthor
          title="Top Authors"
          authors={authors}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  signedIn: {
    margin: 10,
  },
  notSignedIn: {
    margin: 0,
  },
});
export default Browse;
