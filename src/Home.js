import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native'

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
        <TouchableHighlight
        onPress={() => this.props.navigation.toggleDrawer()}>
            <Text>woop</Text>
        </TouchableHighlight>
        <Text>You have entered Home</Text>
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
