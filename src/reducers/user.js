const initialState = {
};

export default function user(state =initialState, action = {} ) {
  switch (action.type) {
    case 'userRegistered': {
      return {
        ...state,
        signupError: action.error ? action.error : null,
        signupSuccess: action.subtype === 'success',
        userData: action.subtype === 'success' ? action.userData : state.userData
      }
    };
    case 'userLogout': {
      return {
        ...state,
        userData: {}
      }
    };
    case 'fcmToken': {
      return {
        ...state,
        fcmToken: action.fcmToken || state.fcmToken
      }
    };
    default:
      return state;
  }
}
