import React, { PureComponent } from 'react';
import { View, Text, StatusBar, VirtualizedList, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput, Keyboard, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'underscore';
import colors from './../../appConfig/color'

export default class SingleContact extends PureComponent {

    constructor() {
        super();
    }

    componentDidMount(){
        console.log(this.props)
    }

    render() {
        let {contact} = this.props;
        let userImage = 'https://firebasestorage.googleapis.com/v0/b/mywhatsapp-202fa.appspot.com/o/userImages%2FcpxA4wgfF0807DuklTZY.jpg?alt=media&token=5eb939d1-c425-44cb-8e3e-99ba796768ef';
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('UserChat')}>
                <View style={styles.row}>
                    <Image source={{uri:userImage}} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{contact && contact.userName}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>asdf</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#f7f7f7',
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    pic: {
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 15,
    },
    msgContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#666',
        fontSize: 12,
        marginLeft: 15,
    },
})
