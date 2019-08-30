import React, { Component } from 'react';
import { View, Text, ImageBackground, VirtualizedList, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput, Keyboard, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'underscore';
import ChatMessages from './../../components/chat/ChatMessages';
import ChatInput from './../../components/chat/ChatInput';
import ChatHeader from './../../components/chat/ChatHeader';

export default class UserChat extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <ImageBackground style={{flex:1}} source={require('./../../assets/chatBG.png')}>
                <ChatHeader {...this.props} />
                <ChatMessages />
                <ChatInput />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 60,
        paddingHorizontal: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    }
})
