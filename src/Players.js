import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native'
import SpotifyAuth from './auth/Spotify/SpotifyAuth'

export default class Players extends Component{
  static navigationOptions = ({navigation}) => {
    return {
        header:{
            headerTitle: <Text>HomeQueue</Text>,
            headerRight: (
                <TouchableHighlight
                onPress={() => navigation.toggleDrawer()}
                >
                    <Text>OH HELLO</Text>
                </TouchableHighlight>
            ),
        }
    }
  }
  
  constructor(props){
    super(props)
  }
  
  componentDidMount(){
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableHighlight style={styles.header}
        onPress={() => this.props.navigation.toggleDrawer()}>
            <Text>Players</Text>
        </TouchableHighlight>
        <View style={styles.playerContainer}>
            <Text style={styles.headerText}>
            Spotify
            </Text>
            <SpotifyAuth/> 
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
  loginButton:{
    flex: 1,
    justifyContent:'center',
    backgroundColor:'#84bd00',
  },
  header:{
    justifyContent: 'center',
    backgroundColor: '#1190cb',
    height: 50,
    padding: 10,
  },
  playerContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#3c5c93',
  },
});
