import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {Animated, PanResponder, StyleSheet} from 'react-native';

const AUTOSCROLL_INTERVAL = 100
const ZINDEX = Platform.OS === 'ios' ? 'zIndex' : 'elevation'

export default class Row extends Component{
    static propTypes = {
        children: PropTypes.node,
        animated: PropTypes.bool,
        disabled: PropTypes.bool,
        horizontal: PropTypes.bool,
        style: Animated.View.propTypes.style,
        location: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
        manuallyActivateRows: PropTypes.bool,
        activationTime: PropTypes.number,

        // for long press
        onActivate: PropTypes.func,
        onLayout: PropTypes.func,
        onPress: PropTypes.func,

        // for when the view is directly moved
        onMove: PropTypes.func,

        // Called when the user releases the view
        onRelease: PropTypes.func,
    }

    static defaultProps = {
        location: {x:0, y:0},
        activationTime: 200,
    }

    constructor(props){
        super(props);

        this._animatedLocation = new Animated.ValueXY(props.location);
        this._location = props.location;

        this._animatedLocation.addListener(this._onChangeLocation);
    }

    _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => !this._isDisabled(),

        onMoveShouldSetPanResponder: (e, gestureState) => {
            if (this._isDisabled()) return false;

            const vy = Math.abs(gestureState.vy)
            const vx = Math.abs(gestureState.vx)

            return this._active && (this.props.horizontal ? vx > vy : vy > vx);
        },

        onShouldBlockNativeResponder: () => {
            return false;
        },

        onPanResponderGrant: (e, gestureState) => {
            e.persist();

            this._target = e.nativeEvent.target:
            this._prevGestureState = {
                ...gestureState,
                moveX: gestureState.x0,
                movey: gestureState.y0,
            }

            if (this.props.manuallyActivateRows) return;

            this._longPressTimer = setTimeout(() => {
                if (this._active) return;

                this._toggleActive(e, gestureState);
            }, this.props.activationTime);
        },

        onPanResponderMove: (e, gestureState) => {
            if (!this._active ||
                gestureState.numberActiveTouches > 1 ||
                e.nativeEvent.target !== this._target) {
                if (!this._isTouchInsideElement(e)) {
                    this._cancelLongPress();
                }

                return;
            }

            const elementMove = this._mapGestureToMove(this._prevGestureState, gestureState);
            this.moveBy(elementMove);
            this._prevGestureState = {...gestureState};

            if (this.props.onMove) {
                this.props.onMove(e, gestureState, this._nextLocation);
            }
        },

        onPanResponderRelease: (e, gestureState) => {
            if (this._active) {
                this._toggleActive(e, gestureState);
            } else {
                this._cancelLongPress();
                if (this._isTouchInsideElement(e) && this.props.onPress) {
                    this.props.onPress();
                }
            }
        },

        onPanResponderTerminationRequest: () => {
            if (this._active) {
                return false;
            }

            this._cancelLongPress();

            return true;
        },

        onPanResponderTerminate: (e, gestureState) => {
            this._cancelLongPress();

            if (this._active) {
                this._toggleActive(e, gestureState);

                //TODO
                if (/**equivelancy**/){
                    this._relocate(this.props.location)
                }
            }
        },
    })

}
