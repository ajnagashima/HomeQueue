import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import {createDrawerNavigator, createStackNavigator,} from 'react-navigation';
import {Linking} from 'react-native'
import {WebBrowser} from 'expo'

import Login from './src/Login'
import Home from './src/Home'
import Players from './src/Players'
import Sidebar from './src/Sidebar'
import Queue from './src/Queue'
import Search from './src/Search'

const Drawer = createDrawerNavigator(
  {
    Home: {screen: Home},
    Login: {screen:Login},
    Players: {screen: Players},
    Queue: {screen: Queue},
    Search: {screen: Search},
  },
  {
    initialRouteName: 'Login',
    contentOptions: {
      activeTintColor: "#1190cb"
    },
    contentComponent: props => <Sidebar {...props} />,
  }
)

const App = createStackNavigator(
  {
    Drawer: {screen: Drawer},
    Login: {screen: Login},
  },
  {
    initialRouteName: 'Login',
    header:null,
  }
)

export default App
