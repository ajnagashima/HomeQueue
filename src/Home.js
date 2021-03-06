import React, {Component} from 'react'
import {
    View, 
    StyleSheet, 
    Text, 
    TouchableHighlight
} from 'react-native'

import {getConfig, getAuthToken} from '../globals.js'
import Queue from './Queue'


export default class Home extends Component{
  static navigationOptions = ({navigation}) => {
    return {
        header:{
            visible:true,
            headerTitle: <Text>HomeQueue</Text>,
            headerRight: (
                <TouchableHighlight
                onPress={() => navigation.toggleDrawer()}
                >
                    <Text>OH HELLO</Text>
                </TouchableHighlight>
            ),
            style: styles.header
        }
    }
  }
  
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <View style={styles.container}>
        <TouchableHighlight style = {styles.header}
        onPress={() => this.props.navigation.toggleDrawer()}>
            <Text>Home</Text>
        </TouchableHighlight>
        <View style={styles.homeContainer}>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
  header:{
    justifyContent:'center',
    backgroundColor:'#1190cb',
    padding: 10,
    height:50,
  },
  homeContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#3c5c93',
  }
});
