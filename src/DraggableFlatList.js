import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    ScrollView,
    View,
    StyleSheet,
    Platform,
    RefreshControl,
    ViewPropTypes
} from 'react-native'
//import Row from '/DraggableRow'

const AUTOSCROLL_INTERVAL = 100
const ZINDEX = Platform.OS === 'ios' ? 'zIndex' : 'elevation'

export default class DraggableFlatList extends Component{
    constructor(props){
        super(props)
        const {data} = this.props
        this.state={
            pan: new Animated.ValueXY(),
            data: data
        }
    }

    componentWillMount(){
    }

    swapItems(curIdx, swapIdx) {
        if (curIdx == swapIdx)
            return

        if (curIdx > swapIdx)
            [curIdx, swapIdx] = [swapIdx, curIdx]

        this.state.data = [
            ...this.state.data.slice(0, curIdx),
            this.state.data[swapIdx],
            ...this.state.data.slice(curIdx+1, swapIdx),
            this.state.data[curIdx],
            ...this.state.data.slice(swapIdx+1)
        ]
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
