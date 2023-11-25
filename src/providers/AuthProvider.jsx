import { Children, createContext, useEffect, useState } from "react";
import app from "../config/firebase.config";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);
// console.log(auth)
const AuthProvider = ({ children }) => {
    const brandName = import.meta.env.VITE_brandName
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        // console.log('here')
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth)
    }

    const signInUser = (email, password) => {
        setLoading(true);

        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);

        return signInWithPopup(auth, GoogleAuthProvider);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userEmail = { email: currentUser.email };
                axiosPublic.post('user/jwt', userEmail)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                 localStorage.removeItem('access-token')
            }
            setLoading(false);

        });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const authinfo = {
        brandName,
        user,
        createUser,
        signInUser,
        signInWithGoogle,
        logout,
        loading,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;