import React, {Component} from 'react'
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    Image
} from 'react-native'

export default class ItemCard extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {data} = this.props
        images = undefined
        if (data.images != undefined)
            images = data.images.map((image)=>{
                return {
                    height:image.height,
                    width:image.width,
                    uri:image.url,
                }
            })
        console.log(images)
        return (
            <View style={styles.cardView}>
                <Image
                    style = {styles.cardThumbnail}
                    source={images}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.cardHeader}>
                        {data.name.name +" : "+ data.type.toUpperCase()}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //The main card container
    cardView:{
        height:80,
        flexDirection: 'column',
    },
    textContainer:{
        flexDirection: 'row',
    },
    //The card Header
    cardHeader:{
        fontSize: 10,
        fontWeight: 'bold',
    },
    //The card flavor text if any (if no card text, card header will still be the same)
    cardText:{
        fontSize: 7,
    },
    //The image associated with this card
    cardThumbnail:{
        resizeMode: 'contain',
    },
    //The action button for this card, should have same placement for all cards
    cardAction:{
    },
})
