import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
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
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={()=>this.buttonPressed()}>
          <Image source={require("../../../assets/Spotify/Spotify_Logo_RGB_Green.png")}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius:5
  },
  buttonContainer:{
    backgroundColor: '#000000',
    paddingVertical:15,
    borderRadius:5,
  },
})
