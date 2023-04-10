import app from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

const auth = getAuth();

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user SignInUser", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };


export const authSignUpUser =
  ({ email, password, userName }) =>
  async (dispatch, getSatte) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

       await updateProfile(user, {
        displayName: userName,
      });

      const { displayName, uid } = await auth.currentUser;
      
      const userUpdateProfile = {
          userId: uid,
          userName: displayName,
      }
     
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
await  onAuthStateChanged(auth, (user) => {
  if (user) {

    const userUpdateProfile = {
       userId: user.uid,
       userName: user.displayName,
    }
    dispatch(updateUserProfile(userUpdateProfile));
    dispatch(authStateChange({stateChange: true}));
       }
        
      });
}
export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};