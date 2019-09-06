import firebase from 'react-native-firebase';
const firestore = firebase.firestore();
import moment from 'moment-timezone';
import Contacts from 'react-native-contacts'
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

        if (signupData.hasProfileImage && signupData.imagePath) {
          let storageRef = firebase.storage().ref().child(`userImages/${userId}.jpg`);
          await storageRef.putFile(signupData.imagePath);
          userImage = await storageRef.getDownloadURL();
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

export function contact(forceUpdate=false) {
  return async function (dispatch, getState) {
    let userContacts = getState().user && getState().user.allContacts;
    console.log("state user contacts => ",userContacts)
    if(!userContacts || forceUpdate){
      Contacts.getAll(async (err, allContacts) => {
      
        let resContacts = [...allContacts];
        if (resContacts && resContacts.length) {
  
          let newCont = {},appContacts=[];
  
          let myProfileData = getState().user.userData;
          let myCountryCode = myProfileData.countryCode;
          
          let requests = resContacts.map((contact) => {
            return new Promise(async (resolve) => {
              let phoneNumbers = contact.phoneNumbers;
              let user = await checkUser(phoneNumbers,myCountryCode);
             
              if (user) {
                contact['imgUrl'] = user.imgUrl;
                delete contact['thumbnailPath']
                contact['userID'] = user.userID;
                contact['phoneNumbers'] = [user.defaultNo];
                contact['isVerified'] = user.isVerified;
                newCont[user.userID] = contact;
                appContacts.push(user)
                resolve()
              }
              else {
                const key = phoneNumbers[0] && phoneNumbers[0].number.replace(/[^0-9]/g, "");
                if (key)
                  newCont[key] = contact;
                resolve()
              }
            })
          });
  
          await Promise.all(requests);
  
          console.log("?new conctact => ",newCont);
          console.log("appw conctact => ",appContacts);
          dispatch({
            type: 'contact',
            val: newCont
          });
          dispatch({
            type: 'appContacts',
            val: appContacts
          });
  
        }
      })
    }
    
  }
}

async function checkUser(phoneNumbers,myCountryCode) {
  let finalData;
  const user = phoneNumbers.map(k => (async () => {
    const number = k.number.replace(`+${myCountryCode}`,'').replace(/\D/g,'');
      const snapshot = await firestore.collection('users').where('mobileNo', '==', number).get();
      if (snapshot.docs.length > 0) {
        let userData = snapshot.docs[0].data();
        finalData = { ...userData, userID: snapshot.docs[0].id, defaultNo: k };
      }
  })())
  await Promise.all(user);
  return finalData
}