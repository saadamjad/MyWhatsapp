import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image, Animated } from 'react-native';
import PageHeader from './../../components/PageHeader'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import colors from './../../appConfig/color';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './../../actions/userActions';

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

class SettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editProfile: false
        }
        this.animatedValue = new Animated.Value(0);
        this.animatedImageWidth = new Animated.Value(0);
        this.animatedOpacity = new Animated.Value(0);
    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    animateMyProfile() {
        Animated.parallel([
            Animated.timing(this.animatedValue,
                {
                    toValue: 1, // Animate to final value of 1
                    useNativeDriver: true,
                    duration: 250
                }
            ),
            Animated.timing(this.animatedImageWidth,
                {
                    toValue: 1,
                    duration: 250
                }
            ),
            Animated.timing(this.animatedOpacity,
                {
                    toValue: 1,
                    duration: 100
                }
            )
        ]).start(() => {
            this.setState({
                editProfile: true
            })
        });
    }

    backToSettings() {
        this.setState({
            editProfile: false
        }, () => {
            Animated.parallel([
                Animated.timing(this.animatedValue,
                    {
                        toValue: 0, // Animate to final value of 1
                        useNativeDriver: true,
                        duration: 250
                    }
                ),
                Animated.timing(this.animatedImageWidth,
                    {
                        toValue: 0,
                        duration: 250
                    }
                ),
                Animated.timing(this.animatedOpacity,
                    {
                        toValue: 0,
                        duration: 100
                    }
                )
            ]).start();
        })
    }

    render() {
        //top:70,left:75
        const position = {
            transform: [
                {
                    translateX: this.animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [15, (DEVICE_WIDTH / 2 - 70 - 15)]
                    })
                },
                {
                    translateY: this.animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [5, 50]
                    })
                }
            ]
        };

        let imageHeight = this.animatedImageWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [70, 140]
        });

        let opacity = this.animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });

        let isEditProfile = this.state.editProfile;
        return (
            <SafeAreaView style={styles.container}>

                <PageHeader title={isEditProfile ? 'Profile' : 'Settings'} onBackPress={() => isEditProfile ? this.backToSettings() : this.onBackPress()} />

                <Animated.View style={[position, styles.row]}>
                    <TouchableOpacity onPress={() => this.animateMyProfile()}>
                        <Animated.Image style={{ height: imageHeight, width: imageHeight, borderRadius: 70 }} source={require('./../../assets/users/tony.jpg')} />
                    </TouchableOpacity>
                    <Animated.View style={[styles.nameContainer, { opacity }]}>
                        <Text style={styles.userName}> Tony Stark </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.statusText}>Get lost squidward!</Text>
                    </Animated.View>
                </Animated.View>

                {
                    this.state.editProfile &&
                    <Animatable.View animation={'fadeIn'} delay={0} iterationCount={1} style={{ marginTop: 50,paddingHorizontal:10 }}>
                        <View style={[styles.settingRow,{justifyContent:'space-between',borderBottomWidth:1,borderColor:'#ddd',paddingHorizontal:0,paddingVertical:10}]}>
                            <MaterialIcons style={styles.settingIcon} size={23} name={'chat'} color={colors.lightThemeColor} />
                            <View style={{justifyContent:'space-between',padding:10,flex:1}}>
                                <Text style={{color:'#888',fontSize:14}}>Display Name </Text>
                                <Text style={{color:'black',fontSize:15}}>Ravi Sojitra</Text>
                            </View>
                            <MaterialCommunityIcons style={styles.settingIcon} size={23} name={'pencil'} color={colors.lightgray} />
                        </View>

                        <View style={[styles.settingRow,{justifyContent:'space-between',borderBottomWidth:1,borderColor:'#ddd',paddingHorizontal:0,paddingVertical:10}]}>
                            <MaterialIcons style={styles.settingIcon} size={23} name={'info-outline'} color={colors.lightThemeColor} />
                            <View style={{justifyContent:'space-between',padding:10,flex:1}}>
                                <Text style={{color:'#888',fontSize:14}}>About </Text>
                                <Text style={{color:'black',fontSize:15}}>This is so cool!!! isn't it?</Text>
                            </View>
                            <MaterialCommunityIcons style={styles.settingIcon} size={23} name={'pencil'} color={colors.lightgray} />
                        </View>

                        <View style={[styles.settingRow,{justifyContent:'space-between',borderBottomWidth:1,borderColor:'#ddd',paddingHorizontal:0,paddingVertical:10}]}>
                            <MaterialIcons style={styles.settingIcon} size={23} name={'phone'} color={colors.lightThemeColor} />
                            <View style={{justifyContent:'space-between',padding:10,flex:1}}>
                                <Text style={{color:'#888',fontSize:14}}>Phone </Text>
                                <Text style={{color:'black',fontSize:15}}>+91 95745 89874</Text>
                            </View>
                        </View>
                    </Animatable.View>
                }

                <Animated.View style={{ opacity }}>
                    <View style={[styles.settingRow, styles.accountSettings]}>
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
                </Animated.View>



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
        justifyContent: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    accountSettings: {
        borderColor: '#eee',
        borderTopWidth: 1,
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
    inviteRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingVertical: 20,
        paddingHorizontal: 15,
        justifyContent: 'flex-start',
    }
})
