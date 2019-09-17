import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, View, Text, VirtualizedList, Dimensions, FlatList, StyleSheet, TouchableOpacity, TextInput, Keyboard, SafeAreaView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './../../actions/userActions';
import * as chatActions from './../../actions/chatActions';

import Message from './Message';

import _ from 'underscore';

class ChatMessages extends PureComponent {

    constructor(props) {
        super(props);
        let { userData } = props.navigation.state.params;
        this.state = {
            data: [],
            chatData: props.userChatData[userData.userID] || []
        }
    }

    componentWillMount() {
        let { userData } = this.props.navigation.state.params;
        if (userData) {
            this.props.chatAction.getUserMsg(userData.userID);
        }

    }

    componentWillReceiveProps(nextProps) {
        let { userData } = this.props.navigation.state.params;
        if (nextProps.userChatData && nextProps.userChatData[userData.userID].length > 0) {
            // this.resetReadData(this.state.userID, this.state.selectedUser.userID);
            this.setState({ chatData: nextProps.userChatData[userData.userID] },()=>{
                // this.messageList.scrollToEnd()
            });
            // this.flatList && this.flatList.scrollToEnd({ animated: true })
            // if (nextProps.userChatData[this.state.selectedUser.userID].length >= 8)
            //     this.setState({ isInvertible: true, chatData: nextProps.userChatData[this.state.selectedUser.userID] })
            // else
            //     this.setState({ isInvertible: false, chatData: nextProps.userChatData[this.state.selectedUser.userID] })
        }
    }

    getMoreMessage() {
        // this.props.userChatAction.getMoreMessages(this.state.selectedUser.userID)
    }

    render() {
        const chatData = _.sortBy(this.state.chatData, (k) => { return k.msgTime });
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === 'android' ? null : 'padding'} enabled style={{ flex: 1 }}>
                    <VirtualizedList
                        data={chatData}
                        renderItem={({ item, index }) => <Message key={index} message={item} />}
                        onEndReached={() => this.getMoreMessage()}
                        ref={listRef => { this.messageList = listRef; }}
                        windowSize={30}
                        keyExtractor={(item, index) => item.key}
                        initialScrollIndex={10}
                        getItem={(data, index) => data[index]}
                        style={{ paddingHorizontal: 10 }}
                        getItemCount={data => data.length}
                        onEndReachedThreshold={0.5}
                        progressViewOffset={300} //android support
                        maxToRenderPerBatch={20}
                        initialNumToRender={20}
                        getItemLayout={(data, index) => (
                            { length: 100, offset: 100 * index, index }
                        )}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    console.log("state.Chat.userChatData => ", state.Chat.userChatData)
    return {
        // userData: state.user.userData,
        userChatData: state.Chat.userChatData
        // appContacts: state.user.appContacts,

    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
        chatAction: bindActionCreators(chatActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
