import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'


export default class SpotifyAuthButton extends Component{
  constructor(props){
    super(props)
  }

  buttonPressed(){
    const {onPress} = this.props
    onPress()
  }

  render(){
    const {loginStatus} = this.props
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={loginStatus ? styles.buttonLogout:styles.buttonLogin}
          onPress={()=>this.buttonPressed()}
          underlayColor='#fff'>
          {(!loginStatus && 
            <Image 
                style={styles.buttonImage}
                source={require("../../../assets/Spotify/Spotify_Logo_RGB_Black.png")}
                resizeMode='contain'
                resizeMethod='resize'
                />) || 
            (loginStatus &&
                <Text style={styles.buttonText}>Logout</Text>)}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius:5
  },
  buttonLogin:{
    backgroundColor: '#1db954',
    borderRadius:35,
    height: 70,
    padding:10,
    borderColor:'#191414',
    borderWidth: 2,
  },
  buttonLogout:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#1db954',
    borderRadius:35,
    height: 70,
    padding:10,
    borderColor:'#191414',
    borderWidth: 2,
  },
  buttonImage:{
    flex:1,
    height: undefined,
    width:undefined,
  },
  buttonText: {
    fontSize:35,
    fontWeight: 'bold',
    color: '#191414',
  },
})
