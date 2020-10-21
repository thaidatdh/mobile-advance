import React from 'react';
import {TextInput, View, StyleSheet, ScrollView} from 'react-native';
import SectionCourseItem from '../../Main/Home/SectionCourseItem/section-course-item';

const Login = (props) => {

    return <View>
        <TextInput name="username" style={styles.input}
          placeholder="Username (or Email)"
          value=''
        />
        <TextInput name="password" style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value=''
        />
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex:1, 
    display:"flex",
    backgroundColor: '#0E0F13',
    alignItems: 'center',
    justifyContent: "center",

  },
  input: {
    flex: 1,
    display:"flex",
    backgroundColor: '#1f242a',
    paddingLeft: 10,
    color: 'white'
  }
});

export default Login;