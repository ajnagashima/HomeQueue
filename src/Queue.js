import React, {Component} from 'react'
import {
    View,
    ListView,
} from 'react-native'

var SpotifyWebApi = require('spotify-web-api-js')

import {getConfig, getAuthToken} from '../globals.js'

const providers = ['Spotify']

export default class Queue extends Component{
    constructor(props){
        super(props)
        this.state = {
            configs:{},

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
            <View>
            </View>
        )
    }
}
