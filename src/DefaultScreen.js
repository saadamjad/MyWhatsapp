import React, { Component } from "react";
import { View } from "react-native";
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';

class DefualtScreen extends Component {

  resetAction(routeName) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  redirectToApp() {
    console.log(this.props)
    if (this.props.userData && this.props.userData.userId) {
      this.resetAction("Home");
    }
    else {
      this.resetAction("Signup");
    }
  }

  componentDidMount(){
    this.redirectToApp();
  }

  componentWillReceiveProps(props) {
    this.redirectToApp()
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }} />
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user && state.user.userData,
  };
}

export default connect(mapStateToProps, null)(DefualtScreen);
