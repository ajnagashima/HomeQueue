import React, {Component} from 'react'
import {
    View,
    FlatList,
    Dimensions,
    PanResponder,
    Animated,
    InteractionManager,
} from 'react-native'


export default class DraggableFlatList extends Component{
    constructor(props){
        super(props)
        this.state={
            pan: new Animated.ValueXY(),
        }
    }


    componentWillMount(){
    }

    render(){
        const {data, renderItem, ItemSeparatorComponent, keyExtractor} = this.props
        return(
            <FlatList
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent = {ItemSeparatorComponent}
                keyExtractor={keyExtractor}
            />
        )
    }
}
