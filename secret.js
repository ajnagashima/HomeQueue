import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

var client_id = 'b5e1176eb2b44b998b9eb45039801c3d';
var client_secret = '496f5afc6b594a84872a96ce67abf05f';
var redirect_uri = 'rediect';

export default class App extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.login()}
          title="Log in to Spotify"
          style = {styles.loginButton}
        />
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton:{
    flex: 1,
    justifyContent:'center',
    backgroundColor:'#84bd00',
  }
});
