import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Image, Keyboard } from 'react-native';
import PageHeader from './../../components/PageHeader'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from './../../appConfig/color';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './../../actions/userActions';

class SettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <PageHeader title={'Settings'} onBackPress={() => this.onBackPress()} />
                <View style={styles.row}>
                    <Image style={{ height: 70, width: 70, borderRadius: 35 }} source={require('./../../assets/users/tony.jpg')} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.userName}> Tony Stark </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.statusText}>Get lost squidward!</Text>
                    </View>
                </View>
                <View style={styles.settingRow}>
                    <MaterialCommunityIcons style={styles.settingIcon} size={23} name={'key-variant'} color={colors.lightThemeColor} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.settingKey}> Account </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.settingInfo}>Privacy, security, change number</Text>
                    </View>
                </View>
                <View style={styles.settingRow}>
                    <MaterialIcons style={styles.settingIcon} size={23} name={'chat'} color={colors.lightThemeColor} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.settingKey}> Chats </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.settingInfo}>Backup, history, wallpaper</Text>
                    </View>
                </View>
                <View style={styles.settingRow}>
                    <MaterialCommunityIcons style={styles.settingIcon} size={23} name={'bell'} color={colors.lightThemeColor} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.settingKey}> Notifications </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.settingInfo}>Message, group & call tones</Text>
                    </View>
                </View>
                <View style={styles.settingRow}>
                    <MaterialIcons style={styles.settingIcon} size={23} name={'data-usage'} color={colors.lightThemeColor} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.settingKey}> Notifications </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.settingInfo}>Message, group & call tones</Text>
                    </View>
                </View>
                <View style={styles.settingRow}>
                    <MaterialIcons style={styles.settingIcon} size={23} name={'help-outline'} color={colors.lightThemeColor} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.settingKey}> Help </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.settingInfo}>FAQ, contact us, privacy policy</Text>
                    </View>
                </View>
                <View style={styles.inviteRow}>
                    <MaterialIcons style={styles.settingIcon} size={23} name={'person'} color={colors.lightThemeColor} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.settingKey}> Invite a friend </Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
export default SettingsScreen
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#eee',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    nameContainer: {
        justifyContent: 'space-between',
        paddingRight: 10
    },
    userName: {
        marginLeft: 10,
        color: '#222',
        fontSize: 16,
    },
    statusText: {
        color: '#666',
        fontSize: 15,
        marginLeft: 15,
        maxHeight: 22
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
        justifyContent: 'flex-start',
    },
    settingIcon: {
        width: 50,
        textAlign: 'center'
    },
    settingKey: {
        marginLeft: 10,
        color: '#222',
        fontSize: 15,
    },
    settingInfo: {
        color: '#666',
        fontSize: 14,
        marginLeft: 15,
        maxHeight: 22
    },
    inviteRow:{
        flexDirection: 'row',
        borderTopWidth:1,
        borderColor:'#eee',
        paddingVertical: 20,
        paddingHorizontal: 15,
        justifyContent: 'flex-start',
    }
})
