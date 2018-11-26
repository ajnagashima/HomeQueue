import React from 'react'

import {createDrawerNavigator, createSwitchNavigator} from 'react-navigation';
import {Linking} from 'react-native'
import {WebBrowser} from 'expo'

import Login from './src/Login'
import Main from './src/Main'
import Sidebar from './src/Sidebar'

const Drawer = createDrawerNavigator(
  {
    Login: {screen: Login},
    Main: {screen: Main},
  },
  {
    initialRouteName: "Login",
    contentOptions: {
      activeTintColor: "#1190cb"
    },
    contentComponent: props => <Sidebar {...props} />
  }
)

const App = createSwitchNavigator(
  {
    Drawer: {screen: Drawer},
    Main
  },
  {
    initialRouteName: 'Drawer'
  }
)

export default App
