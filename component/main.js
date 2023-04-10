import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";

import useRoute  from "../router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";

const auth = getAuth(db);

const Main = () => {
   
    const {stateChange} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authStateChangeUser())
    }, [])



  const routing = useRoute(stateChange);
    return (
        <NavigationContainer>
        {routing}
        </NavigationContainer>
    )
}

export default Main;