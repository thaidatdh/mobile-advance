import React from 'react'
import {Image, View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'

const ListCourseItem = (props) => {
    return <TouchableOpacity style={styles.item} onPress={() => { 
            Alert.alert('Info','Flatlist item pressed', [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('cancel');
                    }
                },
                {
                    text: 'OK',
                    onPress: () => {
                        console.log('OK');
                    }
                }
            ])
        }}>
        <Image source={require('../../../../assets/bg.png')} style={styles.image}/>
        <View style={{margin: 5}}>
            <Text>{props.item.title}</Text>
            <Text style={styles.darkText}>{props.item.author}</Text>
            <Text style={styles.darkText}>{props.item.level} - {props.item.released} - {props.item.duration}</Text>
            
        </View>
    </TouchableOpacity>
};
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        margin: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    image: {
        width: 100,
        height: 50
    },
    title: {
        fontWeight: "bold"
    },
    darkText: {
        color: 'darkgray'
    }
});
export default ListCourseItem;