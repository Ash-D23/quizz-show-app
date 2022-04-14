import { useLocalStorage } from "./LocalStorage";
import { auth } from "../firebase"
import { db } from '../firebase';
import { toasterror, toastsuccess } from "../Utilities/ToastMessage";

export const useAuth = () => {
    
    const [user, setuser] = useLocalStorage("user", null);

    const signin = async (data) => {
        try {
            const res = await auth.signInWithEmailAndPassword(data.email, data.password)
            const usersRef = db.ref('/users');

            usersRef.orderByChild('uid').equalTo(res.user.uid).on("value", function(snapshot) {
                const data = snapshot.val()
                const key = Object.keys(data)[0]

                setuser(data[key])
            });

            toastsuccess("Login Succesfull")
        } catch (err) {
            console.error(err);
            toasterror("An Error Occuered")
        }
    };

    const signup = async (data) => {
        try {
            const res = await auth.createUserWithEmailAndPassword(data.email, data.password)

            const user = res.user;

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
        }
    };

    const signout = async () => {
        try{
            await auth.signOut()
            setuser(null);
            toastsuccess("Logout Succesfull")
        }catch(err){
            console.error(err)
            toasterror("An Error Occuered")
        }
    };

    return { user, setuser, signin, signup, signout };
};
