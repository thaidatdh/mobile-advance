import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import SectionCourseItem from '../SectionCourseItem/section-course-item';

const SectionCourses = (props) => {
    const courses = [
        {
            id: 1,
            title: 'title 1',
            author: 'author 1',
            level: 'beginner',
            released: 'June 6, 2020',
            duration: '38 hours'
        },
        {
            id: 2,
            title: 'title 2',
            author: 'author 1',
            level: 'advance',
            released: 'June 6, 2020',
            duration: '10 hours'
        },
        {
            id: 3,
            title: 'title 3',
            author: 'author 1',
            level: 'beginner',
            released: 'June 6, 2020',
            duration: '38 hours'
        },
        {
            id: 4,
            title: 'title 4',
            author: 'author 1',
            level: 'advance',
            released: 'June 6, 2020',
            duration: '10 hours'
        },
        {
            id: 5,
            title: 'title 1',
            author: 'author 1',
            level: 'beginner',
            released: 'June 6, 2020',
            duration: '38 hours'
        },
        {
            id: 6,
            title: 'title 2',
            author: 'author 1',
            level: 'advance',
            released: 'June 6, 2020',
            duration: '10 hours'
        },
        {
            id: 7,
            title: 'title 3',
            author: 'author 1',
            level: 'beginner',
            released: 'June 6, 2020',
            duration: '38 hours'
        },
        {
            id: 8,
            title: 'title 4',
            author: 'author 1',
            level: 'advance',
            released: 'June 6, 2020',
            duration: '10 hours'
        }
    ];

    const renderListItems = (courses) => {
        return courses.map(item => <SectionCourseItem key={item.id} item={item}/>);
    }

    return <View>
        <View>
            <Text>{props.title}</Text>
        </View>
        <ScrollView horizontal={true}>
            {renderListItems(courses)}
        </ScrollView>
    </View>
};

export default SectionCourses;