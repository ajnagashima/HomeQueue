import React, {Component} from 'react'
import {
    View,
    TouchableHighlight,
    Text,
} from 'react-native'

export default class ItemCard extends Component{
    constructor(props){
        super(props)
    }

    render(){
        {type, artist, album, track, playlist} = this.props
        return (
            <View style={styles.cardView}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardHeader}>
                        {track}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = Stylesheet.create({
    //The main card container
    cardView:{
        height:20,
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
    },
    //The action button for this card, should have same placement for all cards
    cardAction:{
    },
})
