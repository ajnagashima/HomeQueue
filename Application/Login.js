import React, {Component} from 'react'
import {View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Image,
  WebView,
  Modal,
  Alert
} from 'react-native'
import LoginForm from './LoginForm'
import {getConfig} from '../globals'

//const redirectURI = 'https://localhost:8888'
//scope = 'user-read-email'
//client_id = 'b610b0bf7b7644fab5905b20ad6f03e1'

const spotifyConfig = getConfig('Spotify')

export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
        url: null,
    }
  }

  loginPress(username, password){
    var url = 'https://accounts.spotify.com/authorize'
    url += '?response_type=token'
    url += '&client_id='+encodeURIComponent(spotifyConfig.client_id)
    url += '&scope='+encodeURIComponent(spotifyConfig.scope)
    url += '&redirect_uri='+encodeURIComponent(spotifyConfig.redirectURI)
    this.displayURL(url)
  }

  displayURL(url){
    this.setState({
        url: url,
    })
  }

  checkForToken(webViewState){
    if(webViewState.url.includes(spotifyConfig.redirectURI))
        this.loggedin(webViewState.url)
  }

  loggedin(url){
    this.setState({
        url:null,
    })
    this.props.navigation.navigate('Main')
  }

  render(){
    return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                {
                    this.state.url != null && 
                    <Modal
                    visible ={this.state.url != null}
                    animationtype = "slide"
                    transparent ={false}
                    onRequestClose={() => 
                        {
                            this.setState({url:null})
                        }
                    }
                    >
                        <WebView
                            onNavigationStateChange={this.checkForToken.bind(this)}
                            source={{uri:this.state.url}}
                        />
                    </Modal>
                }
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
