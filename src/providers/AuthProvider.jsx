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
    const [usersMongoData,setUserMongoData]=useState([])
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


    

    const signInWithGoogle = async () => {
        console.log('google innser called')
        setLoading(true);
        //console.log(GoogleAuthProvider)
        console.log(auth)
        return await signInWithPopup(auth, GoogleAuthProvider);
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
                axiosPublic.post('users/jwt', userEmail)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
               
                    axiosPublic.get(`/users/${currentUser.email}`)
                    .then(res => {
                        setUserMongoData(res.data)
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
        usersMongoData,
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