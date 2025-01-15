/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, updateProfile, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const GlobalContext = createContext(null);

const AuthProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // variables for google signin login
    const googleProvider = new GoogleAuthProvider();

    // create user with email
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // update profile
    const updateUserProfile = (updatedProfile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedProfile);
    }

    // google sigin
    const createUserWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // login user with email
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // google login
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // logout user
    const userLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const globalInfo = {
        createUser,
        user,
        setUser,
        loading,
        setLoading,
        updateUserProfile,
        createUserWithGoogle,
        loginUser,
        loginWithGoogle,
        userLogOut,
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser?.email) {
                const user = { email: currentUser.email };
                const res = await axiosPublic.post('/jwt', user);
                if (res.data.token) {
                    localStorage.setItem('access-token', res.data.token);
                    setLoading(false);
                }
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            unsubscribe();
        }
    }, [auth, axiosPublic]);

    return (
        <GlobalContext.Provider value={globalInfo}>{children}</GlobalContext.Provider>
    );
};

export default AuthProvider;