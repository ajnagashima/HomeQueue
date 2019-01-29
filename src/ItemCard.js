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
        const {data, callback} = this.props
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
                <TouchableOpacity style={styles.cardTouch}
                onPress={()=>callback()}
                >
                    <Image
                        style={styles.cardThumbnail}
                        source={images}
                    />
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={styles.cardHeader}>
                            {data.name.name +" : "+ data.type.toUpperCase()}
                        </Text>
                        <Text numberOfLines={1} style={styles.cardText}>
                            PlaceHolder Text qwertyasdfgh I hope that a majority of this text will not make it
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
    },
    cardTouch:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        height:50
    },
    textContainer:{
        flex:1,
        flexDirection: 'column',
    },
    //The card Header
    cardHeader:{
        fontWeight:'bold',
        padding: 5,
        paddingBottom:1,
        paddingLeft:3,
        alignItems:'center',
        justifyContent:'flex-end',
        color:'white',
    },
    //The card flavor text if any (if no card text, card header will still be the same)
    cardText:{
        height:25,
        paddingTop:1,
        paddingLeft:3,
        fontSize:12,
        paddingTop:1,
        alignItems:'center',
        color:'white',
    //    justifyingContent:'center',
    },
    //The image associated with this card
    cardThumbnail:{
        padding:2,
        height: 48,
        width:48,
        resizeMode: 'contain',
    },
    //The action button for this card, should have same placement for all cards
    cardAction:{
    },
})
