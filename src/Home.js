import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native'

import {getConfig} from '../globals.js'

const providers = ['Spotify']
const configs = {}

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
  
  componentDidMount(){
    for (i = 0; i < providers.length; i++){
        configs[providers[i]]=getConfig(providers[i])
    }
    console.log(configs)
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableHighlight
        onPress={() => this.props.navigation.toggleDrawer()}>
            <Text>woop</Text>
        </TouchableHighlight>
        <Text>Welcome to home</Text>
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
  header:{
    flex: 1,
    justifyContent:'center',
    backgroundColor:'#84bd00',
  }
});
