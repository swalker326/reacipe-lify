export const authReducer = (prevState, action) => {
  console.log('reducer :', action ); //eslint disable line
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        userEmail: action.userEmail,
        isLoading: false
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userEmail: action.userEmail,
        userToken: action.token
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        userEmail: null
      };
    default:
      return prevState;
  }
};