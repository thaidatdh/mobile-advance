import React from 'react'
import {FlatList, View, Text} from 'react-native'
import SmallImageButton from '../../../Common/small-image-button'

const SectionCategories = (props) => {
    const categories = ["1", "2","3","4","5","6","7","8","9","10"];

    const renderListItems = (category) => {
        return <View style={{ margin: 5 }}>
            <SmallImageButton key={category[0]} title={category[0]}/>
            {category.length > 1 ? <SmallImageButton key={category[1]} title={category[1]}/> : null }
         </View>;
    }
    var arrays = [];
    var size = 2;
    while (categories.length > 0)
      arrays.push(categories.splice(0, size));
    return <View>
        <View>
            <Text>{props.title}</Text>
        </View>
        <FlatList data={arrays}
          horizontal={true}
          renderItem={({ item, index }) => renderListItems(item)} />
    </View>
};

export default SectionCategories;