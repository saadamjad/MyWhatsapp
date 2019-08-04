const initialState = {
};

export default function user(state =initialState, action = {} ) {
  switch (action.type) {
    case 'appLaunching': {
      return {
        ...state,
        app_launch: action.launch,
      }
    };
    default:
      return state;
  }
}
