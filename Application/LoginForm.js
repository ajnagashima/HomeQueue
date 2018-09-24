import React, {Component} from 'react'
import {View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyBoardAvoidingView,
  TextInput,
} from 'react-native'


export default class LoginForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      password: '',
      username: ''
    }
  }

  buttonPressed(){
    const {onPress} = this.props
    onPress(this.state.username, this.state.password)
  }

  handleChange(id, text){
    tempState = this.state
    tempState[id] = text
    this.setState(tempState)
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onChangeText={(text) => this.handleChange("username",text)}
          placeholder='Spotify Username'
          placeholderTextColor='#a9a9a9'
        />
        <TextInput
          style={styles.input}
          returnKeyType="go"
          ref="PasswordInput"
          onChangeText={(text) => this.handleChange("password", text)}
          autoCapitalize="none"
          placeholder='Password'
          placeholderTextColor='#a9a9a9'
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={()=>this.buttonPressed()}>
          <Text style={styles.buttonText}>LOGIN TO SPOTIFY</Text>
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
  input: {
    height: 40,
    backgroundColor: '#3c5c93',
    marginBottom:10,
    padding: 10,
    borderRadius: 5,
    color: '#a9a9a9',
  },
  buttonContainer:{
    backgroundColor: '#1190cb',
    paddingVertical:15,
    borderRadius:5,
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})
