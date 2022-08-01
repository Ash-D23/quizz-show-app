import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Context'
import { LoaderOverlay } from '../../Components';

function SignUp() {

  const { signUp, isLoading } : any= useAuthContext()
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [errorValues, seterrorValues] = useState<any>({})

  const validateSubmit = () => {
    const errors : any = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(email.length === 0){
      errors.email = "Email Required"
    }else if(!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }

    if(password.length === 0){
      errors.password = "Password Required"
    }else if(password.length < 6){
      errors.password = "Password should be atleast 6 characters long"
    }

    if(confirmpassword!==password){
      errors.confirmpassword = "Password doesn't match"
    }

    return errors
  }

  const signUpHandler = () => {
    const errors = validateSubmit()
    if(Object.keys(errors).length === 0){
      signUp({ email, password})
      setemail('')
      setpassword('')
      setconfirmpassword('')
      seterrorValues('')
    }else{
      seterrorValues(errors)
    }
    
  }

  return (
    <div className="auth__container">
      <div className="auth__contents">
          <h3 className="text--center margin-tb--medium">Sign Up</h3>
          <div className="auth__section">
              <label className="auth-label form-label--required text--medium">Enter Email</label>
              <input value={email} onChange={(e)=> setemail(e.target.value)} type="text" className="form-field margin-tb--small" placeholder="abc@example.com"/>
              <span className="error--message">{errorValues.email}</span>
          </div>
          <div className="auth__section">
              <label className="auth-label form-label--required text--medium">Enter Password</label>
              <input value={password} onChange={(e)=> setpassword(e.target.value)} type="password" className="form-field margin-tb--small" placeholder="Password"/>
              <span className="error--message">{errorValues.password}</span>
          </div>
          <div className="auth__section">
              <label className="auth-label form-label--required text--medium">Confirm Password</label>
              <input value={confirmpassword} onChange={(e)=> setconfirmpassword(e.target.value)} type="password" className="form-field margin-tb--small" placeholder="Password"/>
              <span className="error--message">{errorValues.confirmpassword}</span>
          </div>
          <div className="auth__description">
              <input type="checkbox" className="form-checkbox" /> 
              <span>I accept all Terms and Conditions </span>
          </div>
          <button onClick={signUpHandler} className="btn btn-auth margin-bottom--medium">Sign Up</button>

          <Link className="auth__link margin-tb--medium" to="/login">Already have an account</Link>
          { isLoading && <LoaderOverlay /> }
      </div>
    </div>
  )
}
export { SignUp }