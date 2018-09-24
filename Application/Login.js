import React, {Component} from 'react'
import {View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from 'react-native'
import LoginForm from './LoginForm'

export default class Login extends Component{
  constructor(props){
    super(props)
  }

  loginPress(username, password){
    console.log(password)
    console.log(username)
    if(password !== '' && username !== '')
      this.props.navigation.navigate('Main')
  }

  render(){
    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              style={styles.logoContainer}
              source={require('../Resources/logo.png')}/>
          </View>
          <View style={styles.loginContainer}>
            <LoginForm onPress={this.loginPress.bind(this)}/>
          </View>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#243c66'
  },
  logoContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  loginContainer: {
    alignItems: 'stretch',
    flex:1
  }
});
