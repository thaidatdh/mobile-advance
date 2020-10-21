import React, { useState } from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import ImageButton from '../../Common/image-button'
import SectionCategories from './SectionCategories/section-categories'
import SectionCourses from './SectionCourses/section-courses'
import SignInSection from './SignInSection/sign-in-section'

const Home = (props) => {
  const [isSignedIn, setSignedIn] = useState(false);
    const onPressNewReleaseButton = () => {
        console.log('clicked New Release');
    }
    return <ScrollView style={styles.container}>
          <SignInSection style={isSignedIn ? styles.signedIn : styles.notSignedIn} isSignedIn={isSignedIn}/>
          <ImageButton title='New Releases' onPress={onPressNewReleaseButton()}/>
          <ImageButton title='Recommended for you' onPress={onPressNewReleaseButton()}/>
          <SectionCategories title="test"/>
          <SectionCourses title='Continue learning'/>
          <SectionCourses title='Path'/>
          <SectionCourses title='Channel'/>
          <SectionCourses title='Bookmark'/>
      </ScrollView>
}
const styles = StyleSheet.create({
    container: {
      flex:1, 
      backgroundColor: '#0E0F13',
    },
    signedIn: {
      margin: 10
    },
    notSignedIn: {
      margin: 0
    },
  });
export default Home;