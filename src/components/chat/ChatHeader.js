import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'underscore';
import colors from './../../appConfig/color'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ChatHeader extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <SafeAreaView style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'md-arrow-back'} color='white' size={30} />
                        <Image source={require('./../../assets/users/natasha.jpg')} style={styles.pic} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: '400' }}>Natasha</Text>
                        <Text style={{ fontSize: 12, color: 'white' }}>Online</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name="videocam" size={25} color="white"
                        style={{ marginRight: 15 }}
                    />
                    <Icon
                        name="call" size={25} color="white"
                        style={{ marginRight: 15 }}
                    />
                    <Icon
                        name="more-vert" size={25} color="white"
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: colors.themeColor,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    userInfo: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pic: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginLeft: 5,
        marginRight: 10
    },
})
