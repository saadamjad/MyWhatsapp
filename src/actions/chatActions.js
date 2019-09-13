import firebase from 'react-native-firebase';
const firestore = firebase.firestore();
import moment from 'moment-timezone';
import Contacts from 'react-native-contacts'
import _ from 'underscore';

export function sentChatMsg(chatObj, toUserID, selectedImages) {
    return async function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            let loginUserId = getState().user.userData.userId;
            let userIDUrl = (loginUserId < toUserID) ? (loginUserId + '_' + toUserID) : (toUserID + '_' + loginUserId);

            firestore.collection('chat').doc('ChatCollections').collection(userIDUrl).add(chatObj);

        })

    }
}