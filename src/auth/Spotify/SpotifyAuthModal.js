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
import {getConfig} from '../../../globals'

const spotifyConfig = getConfig('Spotify')

export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
        url: null,
    }
  }

  login(){
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
    const {callback} = this.props
    this.setState({
        url:null,
    })
  }

  render(){
    return(
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
