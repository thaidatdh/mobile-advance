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
import ApiServices from "../../../services/api-services";
import PhoneStorage from "../../../services/phone-storage";
import { SettingContext } from "../../../Contexts/SettingContextProvider";
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
    {
      id: 3,
      title: ["Top Rated"],
    },
    {
      id: 4,
      title: ["Recommended"],
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
    loadTopRated,
    topRated,
    recommended,
    loadRecommended,
    isInternetReachable,
  } = React.useContext(DataContext);
  const { theme } = React.useContext(SettingContext);
  const [categoryCourse, setCategoryCourse] = useState([]);
  useEffect(() => {
    loadNewReleased();
    loadTopSell();
    loadTopRated();
    if (user) loadRecommended(token, user.id);
  }, []);
  const onPressNewReleaseButton = () => {
    navigation.navigate("List Courses", {
      title: "New Released",
      courses: newReleased,
      offset: 1,
      onLoadMore: "top-new",
    });
  };
  const onPressRecommendedButton = () => {
    navigation.navigate("List Courses", {
      title: "Recommended",
      courses: recommended,
      offset: 1,
      onLoadMore: "recommended",
    });
  };
  const onPressRatedButton = () => {
    navigation.navigate("List Courses", {
      title: "Top Rated",
      courses: topRated,
      offset: 1,
      onLoadMore: "top-rated",
    });
  };
  const onPressSellButton = () => {
    navigation.navigate("List Courses", {
      title: "Top Sell",
      courses: topSell,
      offset: 1,
      onLoadMore: "top-sell",
    });
  };
  const onPressCategory = async (categoryName, categoryId) => {
    try {
      let categoryList = [categoryId];
      let res = await ApiServices.search(categoryList, "", 10, 0);
      let response = await res.json();
      if (
        response.payload !== undefined &&
        response.payload.rows != undefined
      ) {
        await setCategoryCourse(response.payload.rows);
        PhoneStorage.save(
          "@category_course_" + categoryId,
          JSON.stringify(response.payload.rows)
        );
      } else {
        setCategoryCourse([]);
      }
    } catch (err) {
      console.log(err);
      if (!isInternetReachable) {
        PhoneStorage.load("@category_course_" + categoryId, "json").then(
          (persistData) => {
            if (persistData) {
              setCategoryCourse(persistData);
            } else {
              setCategoryCourse([]);
            }
          }
        );
      }
    }
    navigation.navigate("List Courses", {
      title: categoryName,
      courses: categoryCourse,
      offset: categoryId,
      onLoadMore: "category",
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
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.c_0E0F13} />
      <MAppBar navigation={navigation} title="Browse" />
      <ScrollView
        style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}
      >
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
        {user ? (
          <ImageButton
            key={imageButtonData[3].id}
            title={imageButtonData[3].title}
            onPress={onPressRecommendedButton}
          />
        ) : null}
        <ImageButton
          key={imageButtonData[1].id}
          title={imageButtonData[1].title}
          onPress={onPressSellButton}
        />
        <ImageButton
          key={imageButtonData[2].id}
          title={imageButtonData[2].title}
          onPress={onPressRatedButton}
        />
        <SectionCategories onPress={onPressCategory} />
        {/*<SectionTags title="Popular Skills" onPress={onPressSkills} />
        <SectionPath title="Paths" />*/}
        <SectionAuthor
          title="Instructors"
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
