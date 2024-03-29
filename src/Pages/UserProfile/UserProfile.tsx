import React, { useState, useReducer } from 'react';
import { useAuthContext } from '../../Context';
import { userProfileReducerFn } from '../../Reducers';
import { toastsuccess, toasterror } from '../../Utilities';
import { db } from '../../firebase';
import './UserProfile.css';

function UserProfile() : JSX.Element {

  const [editmode, seteditmode] = useState(false)

  const auth = useAuthContext()

  const user = auth?.user;
  const setuser = auth?.setuser

  const [userProfile, userProfileDispatch ] = useReducer( userProfileReducerFn , user )

  const { userName, firstName, lastName, email, phone, gender } = userProfile

  const onUpdateSubmit = async ()=> {
      try{
            const usersRef = db.ref('/users');
            if(user){
                usersRef.orderByChild('uid').equalTo(user?.uid).on("value", function(snapshot) {
                    const data = snapshot.val()
                    const key = Object.keys(data)[0]
    
                    const userRef = db.ref('users/'+key);
                    userRef.update(userProfile)
                    if(setuser){
                        setuser(userProfile)
                    }
                });
    
                toastsuccess("Updated User Succesfully")
            }
            
      }catch(err){
            console.error(err)
            userProfileDispatch({ type: 'resetProfile', payload: user})
            toasterror("There was an Error")
      }
      seteditmode(false)
  }

  return (
    <div className='user-profile--section'>
        <div className="user-profile__container">
        <h2 className="text--center margin-tb--medium">User Profile</h2>
        <div className="form">

            <div className="form-element">
                <label className="form-label form-label--required">User Name</label>
                <input 
                type="text"
                onChange={(e) => userProfileDispatch({ type: "updateUserName", payload: e.target.value})}
                className="form-field"
                value={userName}
                placeholder="Username"
                disabled={!editmode} />
            </div>
            
            <div className="form-element">
                <label className="form-label form-label--required">First Name</label>
                <input
                type="text"
                onChange={(e) => userProfileDispatch({ type: 'updateFirstName', payload: e.target.value})}
                className="form-field"
                value={firstName}
                placeholder="Enter First Name"
                disabled={!editmode} />
            </div>
            
            <div className="form-element">
                <label className="form-label form-label--required">Last Name</label>
                <input 
                type="text"
                onChange={(e)=> userProfileDispatch({ type: 'updateLastName', payload: e.target.value})}
                className="form-field"
                value={lastName}
                placeholder="Enter Last Name"
                disabled={!editmode} />
            </div>

            <div className="form-element">
                <label className="form-label form-label--required">Email</label>
                <input 
                type="email" 
                className="form-field form-field--text-only" 
                value={email} 
                disabled={true} />
            </div>

            <div className="form-element">
                <label className="form-label form-label--required">Phone No.</label>
                <input 
                type="text" 
                onChange={(e) => userProfileDispatch({ type: 'updatePhone', payload: e.target.value})} 
                className="form-field" 
                value={phone || ''} 
                disabled={!editmode} />
            </div>

            <div className="form-element">
                <label className="form-label">Gender</label>

                <input 
                type="radio" 
                onChange={(e) => userProfileDispatch({ type: 'updateGender', payload: e.target.value})}
                checked={gender==='Male'}
                className="form-radio"
                name="gender" 
                value="Male" 
                disabled={!editmode} />

                <span> Male </span>

                <input 
                type="radio" 
                onChange={(e) => userProfileDispatch({ type: 'updateGender', payload: e.target.value})} 
                checked={gender==='Female'} 
                className="form-radio" 
                name="gender" 
                value="Female" 
                disabled={!editmode} />

                <span> Female</span>
            </div>
            {editmode ? <button onClick={onUpdateSubmit} className="btn btn--light margin--small">Save</button> : 
                        <button onClick={()=> seteditmode(true)}className="btn btn--light margin--small">Edit</button> }
            
        </div>
    </div>
    </div>
  )
}

export { UserProfile }