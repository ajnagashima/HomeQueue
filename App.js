import {createSwitchNavigator} from 'react-navigation';
import {Linking} from 'react-native'
import {WebBrowser} from 'expo'

import Login from './Application/Login'
import Main from './Application/Main'

const App = createSwitchNavigator(
  {
    Login,
    Main
  },
  {
    initialRouteName: 'Login'
  }
)

export default App
