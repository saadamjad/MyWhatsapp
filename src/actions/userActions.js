import firebase from 'react-native-firebase';
const firestore = firebase.firestore();
import moment from 'moment-timezone';
import _ from 'underscore';

export function saveFcmToken(fcmToken) {
  return function (dispatch, getState) {
    dispatch({
      type: 'fcmToken',
      fcmToken
    });
  }
}

export function logout(fcmToken) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch({ type: 'userLogout' });
      resolve();
    })
  }
}

export function registerUser(signupData) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, reject) => {

      const fcmToken = getState().user && getState().user.fcmToken;

      signupData['fcmToken'] = fcmToken;
      signupData['timeZone'] = moment.tz.guess();

      let userData = await firestore.collection('users').where('mobileNo', '==', signupData.mobileNo).get();

      if (!userData.docs.length) {
        let userImage = null;

        let newUserData = await firestore.collection('users').add(signupData);
        let userId = newUserData.id;
        console.log("got suser id => ",userId)
        
        if (signupData.hasProfileImage && signupData.imagePath ) {
          let storageRef = firebase.storage().ref().child(`userImages/${userId}.jpg`);
          await storageRef.putFile(signupData.imagePath);
          userImage = await storageRef.getDownloadURL();
          console.log("got user image => ",userImage)
        }
        
        delete signupData.imagePath;

        dispatch({
          type: 'userRegistered',
          subtype: 'success',
          userData: { userId, ...signupData, userImage },
        });
        resolve()
      }

    })


  }
}

