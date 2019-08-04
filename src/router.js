import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createAppContainer, StackNavigator, DrawerNavigator, TabNavigator, NavigationActions, StackActions, TabBarBottom, createStackNavigator } from "react-navigation";

import DefualtScreen from './DefaultScreen';
import Signup from './containers/signup'
import OtpVerify from './containers/signup/otpVerify'
import ProfileInfo from "./containers/profile/profileInfo";

const AppNavigator = createStackNavigator(
  {
    DefualtScreen: {
      screen: DefualtScreen,
    },
    Signup: {
      screen: Signup
    },
    OtpVerify: {
      screen: OtpVerify
    },
    ProfileInfo: {
      screen: ProfileInfo
    }
  },
  {
    initialRouteName: "DefualtScreen",
    headerMode: "none",
    cardStyle: {
      backgroundColor: "white"
    }
  });

const App = createAppContainer(AppNavigator);

export default App;

// var firebaseConfig = {
//   apiKey: "AIzaSyDo9k3Cio4Bwt2oA1-GPyoahqtMGfg9_Uw",
//   authDomain: "mywhatsapp-202fa.firebaseapp.com",
//   databaseURL: "https://mywhatsapp-202fa.firebaseio.com",
//   projectId: "mywhatsapp-202fa",
//   storageBucket: "",
//   messagingSenderId: "716284620805",
//   appId: "1:716284620805:web:54a16ed50bb4465c"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);



