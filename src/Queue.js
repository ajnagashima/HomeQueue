import React, {Component} from 'react'
import {
    View, 
    StyleSheet, 
    Text, 
    TouchableHighlight,
    Animated, 
    Easing, 
    Dimensions,
    Platform,
    TouchableOpacity,
} from 'react-native'
import SortableList from 'react-native-sortable-list'

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

    render(){
        console.log(this.state.queue.length)
        return(
            <View style={styles.container}>
            <TouchableHighlight style = {styles.header}
            onPress={() => this.props.navigation.toggleDrawer()}>
                <Text>In Queue</Text>
            </TouchableHighlight>
            <View style={styles.queueContainer}>
            <SortableList
                data={this.state.queue}
                renderRow={this._renderRow}
                manuallyActivateRows
            />
            </View>
            </View>
        )
    }

    _renderRow = ({data, active, index}) => {
        return <Row data={data} active={active} index={index} callback={() => this.updateQueue()}/>
    }
}

class Row extends Component {
    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    }],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.07],
                        }),
                    }],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            })
        };
    }

    updateQueue(){
        //Create temporary state
        tempState = this.state
        //Update queue field of temp state
        tempState['queue'] = exportQueue()
        //Set state to edited temp state
        this.setState(tempState)
    }

    componenetWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    render() {
        const {data, active, index, callback} = this.props;
        return (
            <Animated.View style={[this._style]}>
                <TouchableOpacity
                onPress={ ()=>{
                    remove(index)
                }}
                onLongPress={this.props.toggleRowActive}
                >
                    <ItemCard
                        data = {data}
                    />
                </TouchableOpacity>
            </Animated.View> 
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
