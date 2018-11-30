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
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>You have entered Players</Text>
        </View>
        <TouchableHighlight style={styles.headerContainer}
        onPress={() => this.props.navigation.toggleDrawer()}>
            <Text>woop</Text>
        </TouchableHighlight>
        <Text style={styles.headerText}>
          Spotify
        </Text>
        <SpotifyAuth/> 
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
  headerContainer:{
    justifyContent: 'center',
    backgroundColor: '#1190cb',
    height: 30,
    padding: 10,
  },
  headerText:{
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  }
});
