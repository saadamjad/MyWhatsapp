import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, View, Text, VirtualizedList, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput, Keyboard, SafeAreaView } from 'react-native';
import _ from 'underscore';

export default class Message extends PureComponent {

    constructor() {
        super();
    }

    render() {
        const {message} = this.props;
        console.log("messsage => ",this.props.message)
        // const chatLength = this.props.userChatData.length
        // let DateShow = false;
        // let lableDate = '';
        // let islast = false;
        // const replayMsg = data.replayMsg
        // this.currDate = moment(data.msgTime).format('DD/MM');
        // if (this.prevDate == '') {
        //     this.prevDate = this.currDate;
        // }
        // if (this.currDate != this.prevDate || (!this.state.isInvertible && rowID == 0)) {
        //     DateShow = true;
        //     lableDate = this.prevDate
        //     this.prevDate = moment(data.msgTime).format('DD/MM');
        // }
        // if (chatLength == (parseInt(rowID) + 1) && this.state.isInvertible) {
        //     DateShow = true;
        //     islast = true;
        //     lableDate = this.currDate;
        //     this.prevDate = ''
        // }
        // if (!data.readBy || data.readBy.indexOf(this.state.userId) < 0) {
        //     this.props.userChatAction.readMessage(this.state.userId, this.state.selectedUser.userId, data.chatKey, data.readBy || []);
        // }

        return (
            <View style={{ paddingVertical: 5 }}>
                <Text>{message.msg}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
