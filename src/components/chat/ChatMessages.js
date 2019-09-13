import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, View, Text, VirtualizedList, Dimensions, FlatList, StyleSheet, TouchableOpacity, TextInput, Keyboard, SafeAreaView,Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Message from './Message';

import _ from 'underscore';

export default class ChatMessages extends PureComponent {

    constructor() {
        super();
        this.state = {
            data: [{ sent: true }, { sent: false },{ sent: true }, { sent: false },{ sent: true }, { sent: false },{ sent: true }, { sent: false },{ sent: true }, { sent: false },{ sent: true }, { sent: false },{ sent: true }, { sent: false },{ sent: true }, { sent: false },{ sent: true }, { sent: false },{ sent: true }, { sent: false },{ sent: true }, { sent: false }]
        }
    }

    getMoreMessage() {
        // this.props.userChatAction.getMoreMessages(this.state.selectedUser.userId)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === 'android' ? null : 'padding'} enabled style={{ flex: 1 }}>
                    <VirtualizedList
                        data={this.state.data}
                        renderItem={({ item, index }) => <Message key={index} message={item} />}
                        onEndReached={() => this.getMoreMessage()}
                        ref={listRef => { this.messageList = listRef; }}
                        windowSize={30}
                        keyExtractor={(item, index) => item.key}
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
