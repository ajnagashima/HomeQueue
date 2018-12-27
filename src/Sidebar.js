import React, {Component} from 'react'


import {
    View,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
} from 'react-native'


const links = [
    {
        name: "Home",
        route: "Home",
    },
    {
        name: "PlayBack Devices",
        route: "Players",
    },
    {
        name: "Queue",
        route: "Queue",
    },
    {
        name: "Search",
        route: "Search",
    }
];

export default class Sidebar extends Component{
    constructor(props){
        super(props)
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state= {
            dataSource: ds.cloneWithRows(links),
        }
    }

    route(routeName){
        this.props.navigation.navigate(routeName);
    }

    render() {
        return ( 
            <View style={styles.container}>
                <View>
                    
                </View>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>  
                        <TouchableHighlight
                        onPress = {() => this.route(rowData.route)}
                        style={styles.item}
                        underlayColor='#243c66'

                        >
                            <Text style={styles.itemText}>{rowData.name}</Text>
                        </TouchableHighlight>}
                    renderSeparator = {(sectionId,rowId) => <View key={rowId} style={styles.itemSeparator}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#1190cb',
    },
    item: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 15,
    },
    itemText: {
        fontWeight: 'bold',
        color: 'white',
        
    },
    itemSeparator: {
        flex:1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
    },
});
