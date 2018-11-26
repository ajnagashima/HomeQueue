import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'

export default class Main extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>You have entered Main</Text>
      </View>
    )
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
