import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
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
        return (
            <View style={styles.cardView}>
                <TouchableOpacity style={styles.cardTouch}>
                    <Image
                        style={styles.cardThumbnail}
                        source={images}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.cardHeader}>
                            {data.name.name +" : "+ data.type.toUpperCase()}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //The main card container
    cardView:{
        flex:1,
        height:80,
        flexDirection: 'row',
    },
    cardTouch:{
        flex:1,
    },
    textContainer:{
        flexDirection: 'column',
    },
    //The card Header
    cardHeader:{
        fontSize: 10,
        fontWeight: 'bold',
        color:'white',
    },
    //The card flavor text if any (if no card text, card header will still be the same)
    cardText:{
        fontSize: 7,
    },
    //The image associated with this card
    cardThumbnail:{
        height: 50,
        width:50,
        resizeMode: 'contain',
    },
    //The action button for this card, should have same placement for all cards
    cardAction:{
    },
})
