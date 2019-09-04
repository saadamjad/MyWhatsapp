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

export function contact() {
  return async function (dispatch, getState) {
    let number = '9510810524';
    console.log("number => ",number)
    firestore.collection('users').where('mobileNo', '==', number).get().then((data)=>{
      if(data.docs.length){
        console.log(data.docs[0].data())
      }
    }).catch((err)=>{
      console.log("error => ",err)
    });
    console.log("snapshot => ",snapshot);
    console.log(snapshot.docs.length);
    console.log(snapshot.docs[0].data())
    Contacts.getAll(async (err, allContacts) => {
      console.log("all contacts => ",allContacts)
      let resContacts = [...allContacts];
      if (resContacts && resContacts.length) {

        let newCont = {};

        let myProfileData = getState().user.userData;
        let myCountryCode = myProfileData.countryCode;

        let requests = resContacts.map((contact) => {
          return new Promise(async (resolve) => {
            let phoneNumbers = contact.phoneNumbers;
            let user = await checkUser(phoneNumbers,myCountryCode);
            if (user) {
              contact['imgUrl'] = user.imgUrl;
              delete contact['thumbnailPath']
              contact['userId'] = user.userID;
              contact['phoneNumbers'] = [user.defaultNo];
              contact['isVerified'] = user.isVerified;
              newCont[user.userId] = contact;
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

        console.log("?new conctact => ",newCont)
        dispatch({
          type: 'contact',
          val: newCont
        });

      }
    })
  }
}

async function checkUser(phoneNumbers,myCountryCode) {
  let finalData;
  const user = phoneNumbers.map(k => (async () => {
    const number = k.number.replace(`+${myCountryCode}`,'').replace(/\D/g,'');
    
    const snapshot = await firestore.collection('users').where('mobileNo', '==', number).get();
    if (snapshot.docs.length > 0) {
      console.log("snapshot docs => ",snapshot.docs)
      let userData = snapshot.docs[0].data();
      finalData = { ...userData, userID: snapshot.docs[0].id, defaultNo: k };
    }
  })())
  await Promise.all(user);
  return finalData
}