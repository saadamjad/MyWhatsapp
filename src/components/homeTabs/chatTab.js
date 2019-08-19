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
import colors from './../../appConfig/color';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const chatData = [
    {
        "name": "Tony Stark",
        "time": "8:54 AM",
        "message": "Get lost squidward.",
        "icon": "done",
        "isViewed": "false",
        "image": require("./../../assets/users/tony.jpg")
    },
    {
        "time": "11:56 AM",
        "message": "Space invasion",
        "icon": "done",
        "isViewed": true,
        "name": "Captain Marvel",
        "image": require("./../../assets/users/captain_marvel.jpg")
    },
    {
        "time": "1:34 AM",
        "message": "I can do this all day.",
        "icon": "done-all",
        "iconColor":"msgReadColor",
        "isViewed": "false",
        "name": "Captain America",
        "image": require("./../../assets/users/captain.jpg")
    },
    {
        "time": "2:12 AM",
        "message": "Puny god",
        "icon": "done-all",
        "isViewed": true,
        "name": "Hulk",
        "image": require("./../../assets/users/hulk.jpg")
    },
    {
        "time": "11:23 AM",
        "message": "Hey, big guy. Sun's getting real low",
        "icon": "done",
        "isViewed": "false",
        "name": "Natasha Romanoff",
        "image": require("./../../assets/users/natasha.jpg")
    },
    {
        "time": "12:36 PM",
        "message": "Bring me thanos!",
        "icon": "done-all",
        "isViewed": true,
        "name": "Thor",
        "image": require("./../../assets/users/thor.jpg")
    },
    {
        "time": "5:06 AM",
        "message": "Yibambe! Yibambe!",
        "icon": "done-all",
        "isViewed": true,
        "name": "Black panther",
        "image": require("./../../assets/users/panther.jpg")
    },
    {
        "time": "11:28 PM",
        "message": "You have my respect, Stark.",
        "icon": "done-all",
        "isViewed": "false",
        "name": "Thanos",
        "image": require("./../../assets/users/thanos.jpg")
    },
    {
        "time": "3:15 PM",
        "message": "And the new girl, she is a risk.",
        "icon": "done",
        "isViewed": "false",
        "name": "Nick Fury",
        "image": require("./../../assets/users/nick.jpg")
    },
    
];

class ChatTab extends React.Component {
    constructor() {
        super();
    }

    renderRow(props) {
        return (
            <TouchableOpacity activeOpacity={0.5} >
                <View style={styles.row}>
                    <Image source={props.image} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{props.name}</Text>
                            <Text style={styles.time}>{props.time}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <MaterialIcons
                                name={props.icon} size={15} 
                                color={colors[props.iconColor] || "#b3b3b3"}
                                style={{ marginLeft: 15, marginRight: 5 }}
                            />
                            <Text style={styles.msgTxt}>{props.message}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
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
                <TouchableOpacity style={styles.textStatusButton} activeOpacity={0.5}>
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
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#666',
        fontSize: 12,
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
