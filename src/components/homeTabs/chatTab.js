import React from 'react';
import {
    View,
    ListView,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './../../appConfig/color';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const chatData = [
    {
        "name": "Tony Stark",
        "time": "8:54 AM",
        "message": "Get lost squidward.",
        "icon": "done",
        "isViewed": "false",
        "image": require("./../../assets/users/tony.jpg"),
        showReadBy: false,
        readBy: true,
        lastMsgType: 'image',
        unReedCount:2
    },
    {
        "time": "11:56 AM",
        "message": "Space invasion",
        "icon": "done",
        "isViewed": true,
        "name": "Captain Marvel",
        "image": require("./../../assets/users/captain_marvel.jpg"),
        showReadBy: true,
        readBy: true,
        lastMsgType: 'text',
    },
    {
        "time": "1:34 AM",
        "message": "I can do this all day.",
        "icon": "done-all",
        "iconColor": "msgReadColor",
        "isViewed": "false",
        "name": "Captain America",
        showReadBy: false,
        lastMsgType: 'text',
        readBy: false,
        "image": require("./../../assets/users/captain.jpg")
    },
    {
        "time": "2:12 AM",
        "message": "Puny god",
        "icon": "done-all",
        "isViewed": true,
        "name": "Hulk",
        showReadBy: true,
        lastMsgType: 'image',
        readBy: true,
        "image": require("./../../assets/users/hulk.jpg")
    },
    {
        "time": "11:23 AM",
        "message": "Hey, big guy. Sun's getting real low",
        "icon": "done",
        "isViewed": "false",
        "name": "Natasha Romanoff",
        showReadBy: false,
        lastMsgType: 'text',
        readBy: false,
        "image": require("./../../assets/users/natasha.jpg")
    },
    {
        "time": "12:36 PM",
        "message": "Bring me thanos!",
        "icon": "done-all",
        "isViewed": true,
        "name": "Thor",
        showReadBy: true,
        lastMsgType: 'text',
        readBy: false,
        "image": require("./../../assets/users/thor.jpg")
    },
    {
        "time": "5:06 AM",
        "message": "Yibambe! Yibambe!",
        "icon": "done-all",
        "isViewed": true,
        "name": "Black panther",
        showReadBy: false,
        lastMsgType: 'image',
        readBy: false,
        "image": require("./../../assets/users/panther.jpg")
    },
    {
        "time": "11:28 PM",
        "message": "You have my respect, Stark.",
        "icon": "done-all",
        "isViewed": "false",
        "name": "Thanos",
        showReadBy: true,
        lastMsgType: 'text',
        readBy: true,
        "image": require("./../../assets/users/thanos.jpg")
    },
    {
        "time": "3:15 PM",
        "message": "And the new girl, she is a risk.",
        "icon": "done",
        "isViewed": "false",
        "name": "Nick Fury",
        showReadBy: false,
        lastMsgType: 'image',
        readBy: false,
        "image": require("./../../assets/users/nick.jpg")
    },

];

class ChatTab extends React.Component {
    constructor() {
        super();
    }

    renderRow(props) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=> this.props.navigation.navigate('UserChat')}>
                <View style={styles.row}>
                    <Image source={props.image} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{props.name}</Text>
                            <Text style={[styles.time,{color:props.unReedCount > 0 ? colors.themeColor : '#777'}]}>{props.time}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            {
                                props.lastMsgType == 'text' ?
                                    <Text style={styles.msgTxt}>
                                        {
                                            props.showReadBy ?
                                                props.readBy ?
                                                    <MaterialCommunityIcons name={'check-all'} size={15} color={"#34b7f1"} style={{ marginRight: 5 }} />
                                                    :
                                                    <MaterialCommunityIcons name={'check'} size={15} color={colors.lightgray} style={{ marginRight: 5 }} />
                                                :
                                                null
                                        }
                                        {props.message}
                                    </Text>
                                    :
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.msgTxt}>
                                        {
                                            props.showReadBy ?
                                                props.readBy ?
                                                    <MaterialCommunityIcons style={{ marginRight: 5 }} name={'check-all'} color={'#2d89e6'} size={15} />
                                                    :
                                                    <MaterialCommunityIcons style={{ marginRight: 5 }} color={'#aaa'} name={'check'} size={15} />
                                                :
                                                null
                                        }
                                        <MaterialCommunityIcons name={'camera'} size={15} />
                                        {' Photo'}
                                    </Text>
                            }
                            {
                                props.unReedCount > 0 ?
                                    <View style={{height:20,width:20,justifyContent:'center',alignItems:'center',backgroundColor:colors.themeColor,borderRadius:10}}>
                                        <Text style={{ textAlign: 'center',lineHeight:20, color: 'white', fontSize: 12 }}>{props.unReedCount}</Text>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    openContacts(){
        this.props.navigation.navigate('ContactList');
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <ListView
                    dataSource={ds.cloneWithRows(chatData)}
                    renderRow={props => (
                        this.renderRow(props)
                    )}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                />
                <TouchableOpacity style={styles.textStatusButton} onPress={()=> this.openContacts()} activeOpacity={0.5}>
                    <MaterialIcons color={'white'} name={'chat'} size={22} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ChatTab;

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
        borderRadius: 30,
        width: 60,
        height: 60,
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
    time: {
        fontWeight: '200',
        fontSize: 13,
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
    textStatusButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: colors.themeColor,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
});
