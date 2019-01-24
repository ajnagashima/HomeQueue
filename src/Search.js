import React, {Component} from 'react'
import {
    View, 
    StyleSheet, 
    Text, 
    TouchableHighlight,
    TextInput,
    ListView,
    SectionList,
} from 'react-native'

import ItemCard from './ItemCard'

var SpotifyWebApi = require('spotify-web-api-js')

import {getConfig, getAuthToken} from '../globals.js'
const providers = ['Spotify']

import {add} from '../globalQueue.js'

export default class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            configs:{},
            query:'',
            results:[],
        }
    }

    componentWillMount(){
        configs = {}
        for (i = 0; i < providers.length; i++){
            if(getAuthToken(providers[i])!=null){
                config = getConfig(providers[i])
                configs[providers[i]]={
                    auth_token:config.auth_token,
                    token_type:config.token_type,
                }
            }
        }
        newState = this.state
        newState.configs=configs
        this.setState(newState)
        this.setupApi()
    }

    handleChange(id, text){
        tempState = this.state
        tempState[id] = text
        this.setState(tempState)
    }

    async submitQuery(){
        if(this.state.query != '' && spotifyApi != null){
            rawResults = await spotifyApi.search(
                this.state.query,
                ['album','artist','track','playlist'])
            results = []
            //simplify each result section
            results = results.concat({title:'Songs', data:rawResults.tracks.items.map(this.simplify.bind(this))})
            results = results.concat({title:'Albums', data:rawResults.albums.items.map(this.simplify.bind(this))})
            results = results.concat({title:'Artists', data:rawResults.artists.items.map(this.simplify.bind(this))})
            results = results.concat({title:'Playlists', data:rawResults.playlists.items.map(this.simplify.bind(this))})
            
            this.updateData(results)
        }

    }

    updateData(results){
        tempState = this.state
        tempState['results'] = results
        this.setState(tempState)
    }

    simplify(item){
        type = item.type
        result = {}
        switch(type){
        case 'track':
            result = {
                type:item.type,
                name:{
                    name:item.name,
                    id:item.id,
                    href:item.href,
                },
                artists:item.artists.map(this.simplify),
                images: item.album.images,
            }
            break
        case 'album':
            result = {
                type:item.type,
                name:{
                    name:item.name,
                    id:item.id,
                    href:item.href,
                },
                artists:item.artists.map(this.simplify),
                images: item.images,
            }
            break
        case 'artist':
            result = {
                type:item.type,
                name:{
                    name:item.name,
                    id:item.id,
                    href:item.href,
                },
                images: item.images,
            }
            break
        case 'playlist':
            result = {
                type:item.type,
                name:{
                    name: item.name,
                    id: item.id,
                    href:item.href,
                },
                images: item.images,
            }
            break
        default :
            break
        }
        return result
    }

    extractArtists(artist){
        e = {
            name:artist.name,
            id:artist.id,
        }
        return e
    }

    setupApi(){
        if (this.state.configs.Spotify != undefined){
            spotifyApi = new SpotifyWebApi()
            spotifyApi.setAccessToken(this.state.configs.Spotify.auth_token)
 
        }else{
            spotifyApi = null
        }
    }

    render(){
        return(
            <View style={styles.container}>
            <TouchableHighlight style = {styles.header}
            onPress={() => this.props.navigation.toggleDrawer()}>
                <Text>In Search</Text>
            </TouchableHighlight>
            <View style={styles.searchContainer}>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={true}
                returnKeyType="search"
                onChangeText={(text)=> this.handleChange("query",text)}
                onSubmitEditing={() => this.submitQuery()}
                placeholder='Search'
                placeholderTextColor='#a9a9a9'
            />
            <SectionList
                sections={this.state.results}
                renderItem={({item, index, section}) =>
                    <ItemCard
                    data = {item}
                    callback={add}
                    />
                }
                renderSectionHeader={({section: {title}}) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                )}
                ItemSeparatorComponent = {()=>(<View style={styles.itemSeparator}/>)}
                keyExtractor={(item, index)=>item+index}
            />
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
  searchContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor: '#243c66',
  },
  header:{
    justifyContent:'center',
    backgroundColor:'#84bd00',
    padding: 10,
    height:50,
  },
  sectionHeader: {
    height: 20,
    flex:1,
    paddingRight: 10,
    marginBottom:4,
    alignItems:'flex-start',
    justifyContent:'center',
  },
  sectionHeaderText: {
    fontWeight:'bold',
    fontSize: 15,
    color:'white',
  },
  input:{
    height: 40,
    backgroundColor: '#3c5c93',
    marginBottom:10,
    padding:10,
    borderRadius: 5,
    color: '#a9a9a9',
  },
  itemSeparator: {
    height:1,
    marginTop:2,
    marginBottom:2,
    backgroundColor: 'gray',
  },
})
