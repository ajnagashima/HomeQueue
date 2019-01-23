import React, {Component} from 'react'
import {
    View, 
    StyleSheet, 
    Text, 
    TouchableHighlight,
    ListView,
} from 'react-native'

var SpotifyWebApi = require('spotify-web-api-js')

import {getConfig, getAuthToken} from '../globals.js'

import {exportQueue} from '../globalQueue.js'

const providers = ['Spotify']

import ItemCard from './ItemCard'

ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})

export default class Queue extends Component{
    constructor(props){
        super(props)
        this.state = {
            configs:{},
            dataSource:ds.cloneWithRows(exportQueue()),
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

    setupApi(){
        if (this.state.configs.Spotify != undefined){
            spotifyApi = new SpotifyWebApi()
            spotifyApi.setAccessToken(this.state.configs.Spotify.auth_token)
        }else{
            spotifyApi = null
        }
    }

    render(){
        return(
            <View style={styles.container}>
            <TouchableHighlight style = {styles.header}
            onPress={() => this.props.navigation.toggleDrawer()}>
                <Text>In Queue</Text>
            </TouchableHighlight>
            <View style={styles.queueContainer}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <ItemCard
                    data = {rowData}
                    callback = {(data) => console.log(data)}
                    />
                }
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
    backgroundColor:'#84bd00',
    padding: 10,
    height:50,
  },
  queueContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#3c5c93',
  }
});
