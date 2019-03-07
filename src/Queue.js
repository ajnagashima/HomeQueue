import React, {Component} from 'react'
import {
    View, 
    StyleSheet, 
    Text, 
    TouchableHighlight,
    FlatList,
} from 'react-native'
import DraggableFlatList from './DraggableFlatList.js'

var SpotifyWebApi = require('spotify-web-api-js')

import {getConfig, getAuthToken} from '../globals.js'

import {exportQueue, remove} from '../globalQueue.js'

const providers = ['Spotify']

import ItemCard from './ItemCard'

export default class Queue extends Component{
    constructor(props){
        super(props)
        this.state = {
            configs:{},
            queue:exportQueue(),
        }
    }

    componentWillMount(){
        configs = {}
        for (i = 0; i < providers.length; i++){
            if(getAuthToken(providers[i])!=null){
                config = getConfig(providers[i])
                configs[providers[i]]={
                    auth_token:config.auth_token,
                    token_type:config.token_type,
                }
            }
        }
        newState = this.state
        newState.configs=configs
        this.setState(newState)
        this.setupApi()
    }

    updateQueue(){
        //Create temporary state
        tempState = this.state
        //Update queue field of temp state
        tempState['queue'] = exportQueue()
        //Set state to edited temp state
        this.setState(tempState)
    }

    setupApi(){
        if (this.state.configs.Spotify != undefined){
            spotifyApi = new SpotifyWebApi()
            spotifyApi.setAccessToken(this.state.configs.Spotify.auth_token)
        }else{
            spotifyApi = null
        }
    }

    play(data) {
        console.log(data)
        spotifyApi.play({
            'uris':[data.uri],
            'position_ms':0
        });
    }

    render(){
        return(
            <View style={styles.container}>
            <TouchableHighlight style = {styles.header}
            onPress={() => this.props.navigation.toggleDrawer()}>
                <Text>In Queue</Text>
            </TouchableHighlight>
            <View style={styles.queueContainer}>
            <DraggableFlatList
                data={this.state.queue}
                renderItem={({item, index}) =>
                    <ItemCard
                    data = {item}
                    callback={()=>{
                        this.play(item)
                        //remove(item)
                        this.updateQueue()
                    }}
                    />
                }
                ItemSeparatorComponent = {()=>(<View style={styles.itemSeparator}/>)}
                keyExtractor={(item, index)=>item+index}
            />
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
  header:{
    justifyContent:'center',
    backgroundColor:'#1190cb',
    padding: 10,
    height:50,
  },
  queueContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#3c5c93',
  },
  itemSeparator: {
    height:1,
    marginTop:2,
    marginBottom:2,
    backgroundColor: 'gray',
  },
});
