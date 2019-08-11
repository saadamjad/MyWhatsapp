import firebase from 'react-native-firebase';
const firestore = firebase.firestore();

export function registerUser(signupData) {
  return function (dispatch, getState) {
    // const fcmToken = getState().fcmToken.fcmToken;
    // data['fcmToken'] = fcmToken;
    // data['timeZone'] = moment.tz.guess();
    return new Promise(async (resolve, rejects) => {
      
      let userData = await firestore.collection('users').where('mobileNo', '==', signupData.mobileNo).get();
      
      if (!userData.docs.length) {

        let newUserData = await firestore.collection('users').add(signupData);
        let userId = newUserData.id;

        if (signupData.userImageData) {
          let storageRef = firebase.storage().ref().child(`userImages/${userId}.jpg`);

          storageRef.putFile(signupData.imagePath);
        }

        // dispatch({
        //   type: 'userSignup',
        //   subtype: 'success',
        //   user: { userId, ...data },
        // });
        // resolve()
      }

    })
  }
}

