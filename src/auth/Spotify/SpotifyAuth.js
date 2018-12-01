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
import SpotifyAuthButton from './SpotifyAuthButton'

const spotifyConfig = getConfig('Spotify')

export default class SpotifyAuth extends Component{
  constructor(props){
    super(props)
    this.state = {
        url: null,
        loginStatus: spotifyConfig.auth_token == null ? false : true,
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

  logout(){
    var url = 'https://www.spotify.com/us/logout/'
    this.displayURL(url)
  }

  displayURL(url){
    newState = this.state
    newState.url = url
    this.setState(newState)
  }

  checkForTarget(webViewState){
    if(webViewState.url.includes(spotifyConfig.redirectURI))
        this.loggedin(webViewState.url)
    if(webViewState.url == spotifyConfig.logoutRedirect)
        this.loggedOut()
  }

  loggedin(url){
    const {callback} = this.props
    vals = {}
    queryString = url.split('#')[1]
    arr = queryString.split('&')
    for (i = 0; i < arr.length; i++){
        a = arr[i].split('=')
        vals[a[0]]=a[1]
    }
    spotifyConfig.auth_token = vals['access_token'] ? vals['access_token'] : null
    spotifyConfig.token_type = vals['token_type'] ? vals['token_type'] : null
    this.setState({
        url:null,
        loginStatus:spotifyConfig.auth_token != null ? true : false,
    })
  }

  loggedOut(){
    spotifyConfig.auth_token = null
    spotifyConfig.token_type = null
    this.setState({
        url:null,
        loginStatus:false,
    })
  }

  render(){
    return(
          <View>
            <SpotifyAuthButton
            loginStatus={this.state.loginStatus}
            onPress={this.state.loginStatus ? this.logout.bind(this):this.login.bind(this)}/>
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
                  onNavigationStateChange={this.checkForTarget.bind(this)}
                  source={{uri:this.state.url}}
                  />
            </Modal>
          </View>
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
