import { useLocalStorage } from "./LocalStorage";
import { auth } from "../firebase"
import { db } from '../firebase';
import { toasterror, toastsuccess } from "../Utilities/ToastMessage";
import { useEffect, useState } from "react";

type dataType = {
    email: string,
    password: string
}

export const useAuth = () => {
    
    const [user, setuser] = useLocalStorage("user", null);
    const [isLoading, setisLoading] = useState(false)

    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                const usersRef = db.ref('/users');

                usersRef.orderByChild('uid').equalTo(user.uid).on("value", function(snapshot) {
                    const data = snapshot.val()
                    const key = Object.keys(data)[0]

                    setuser(data[key])
                });
            } else {
                setuser(null)
            }
        })
    }, [])

    const signIn = async (data: dataType) => {
        setisLoading(true)
        try{
            const res : any = await auth.signInWithEmailAndPassword(data.email, data.password)
            const usersRef = db.ref('/users');

            usersRef.orderByChild('uid').equalTo(res.user.uid).on("value", function(snapshot) {
                const data = snapshot.val()
                const key = Object.keys(data)[0]

                setuser(data[key])
            });

            toastsuccess("Login Succesfull")
        }catch (err) {
            console.error(err);
            toasterror("An Error Occuered")
        }finally{
            setisLoading(false)
        }
    };

    const signUp = async (data: dataType) => {
        setisLoading(true)
        try {
            const res = await auth.createUserWithEmailAndPassword(data.email, data.password)

            const user : any = res.user;

            const usersRef = db.ref(`/users`);

            const item = {
                uid: user.uid,
                email: user.email,
            }

            await usersRef.push().set(item)
            setuser(item)
            toastsuccess("SignUp Succesfull")
        } catch (err) {
            console.error(err);
            toasterror("An Error Occuered")
        }finally{
            setisLoading(false)
        }
    };

    const signOut = async () => {
        setisLoading(true)
        try{
            await auth.signOut()
            setuser(null);
            toastsuccess("Logout Succesfull")
        }catch(err){
            console.error(err)
            toasterror("An Error Occuered")
        }finally{
            setisLoading(false)
        }
    };

    return { user, setuser, signIn, signUp, signOut, isLoading };
};
