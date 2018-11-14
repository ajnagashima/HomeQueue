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


const redirectURI = 'https://localhost:8888'
scope = 'user-read-email'
client_id = 'b610b0bf7b7644fab5905b20ad6f03e1'

export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
        view: null,
        show: false,
    }
  }

  loginPress(username, password){
    var scopes = 'user-read-email'
    var url = 'https://accounts.spotify.com/authorize'
    url += '?response_type=token'
    url += '&client_id='+encodeURIComponent(client_id)
    url += '&scope='+encodeURIComponent(scopes)
    url += '&redirect_uri='+encodeURIComponent(redirectURI)
    this.displayURL(url)
  }

  displayURL(url){
    this.setState({
        url: url,
    })
  }

  checkForToken(webViewState){
    if(webViewState.url.includes(redirectURI))
        this.loggedin(webViewState.url)
  }

  loggedin(url){
    this.setState({
        url:null,
    })
    console.log(url)
    
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
