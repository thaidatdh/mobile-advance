import React from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import ImageButton from '../../Common/image-button'
import SectionCourses from './SectionCourses/section-courses'

const Home = (props) => {
    const onPressNewReleaseButton = () => {
        console.log('clicked New Release');
    }
    return <ScrollView style={styles.container}>
        <ImageButton title='New Release' onPress={onPressNewReleaseButton()}/>
        <SectionCourses title='Continue learning'/>
        <SectionCourses title='Path'/>
        <SectionCourses title='Channel'/>
        <SectionCourses title='Bookmark'/>
    </ScrollView>
}
const styles = StyleSheet.create({
    container: {
      flex:1, 
      backgroundColor: '#0E0F13'
    }
  });
export default Home;