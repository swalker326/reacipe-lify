import { Auth } from "aws-amplify";

const signIn = async (email, password) => {
  try {
    console.log("Signing In"); //eslint disable line
    const response = await Auth.signIn(email, password);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const signUp = async (username, password) => {
  try {
    const response = await Auth.signUp({ username, password });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmSignUp = async (email, code) => {
  try {
    const response = await Auth.confirmSignUp(email, code, {
      forceAliasCreation: true,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const signOut = async () => {
  try {
    const response = await Auth.signOut();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkAuth = async () => {
  try {
    const response = await Auth.currentAuthenticatedUser();
    const { attributes, signInUserSession } = response;
    return { attributes, jwtToken: signInUserSession.accessToken.jwtToken };
  } catch (error) {
    if (error === "The user is not authenticated") {
      signOut();
    }
    console.log("error :", error); //eslint disable line
    throw new Error(error.message);
  }
};
const updateUser = async (attributes) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, { ...attributes });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { signIn, signOut, checkAuth, signUp, confirmSignUp, updateUser };
