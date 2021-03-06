import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context'
import { LoaderOverlay } from '../../Components';
import './Auth.css';

function Login() {

  const { signIn, isLoading } = useAuthContext();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')
  const [errorValues, seterrorValues] = useState({})

  const validateSubmit = () => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(email.length === 0){
      errors.email = "Email Required"
    }else if(!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }

    if(password.length === 0){
      errors.password = "Password Required"
    }

    return errors
  }

  const loginhandler = () => {
    const errors = validateSubmit()
    if(Object.keys(errors).length === 0){
      signIn({ email, password })
      setemail('')
      setpassword('')
      seterrorValues({})
    }else{
      seterrorValues(errors)
    }
    
  }

  const loginwithtesthandler = () => {
    signIn({ email: 'test@test.com', password: 'test123'})
    setemail('')
    setpassword('')
  }

  return (
    <div className="auth__container">
      <div className="auth__contents">
          <h3 className="text--center margin-tb--medium">Login</h3>
          <div className="auth__section">
              <label className="auth-label form-label--required text--medium">Enter Email</label>
              <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} className="form-field margin-tb--small" placeholder="abc@example.com"/>
              <span className="error--message">{errorValues.email}</span>
          </div>
          <div className="auth__section">
              <label className="auth-label form-label--required text--medium">Enter Password</label>
              <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-field margin-tb--small" placeholder="Password"/>
              <span className="error--message">{errorValues.password}</span>
          </div>
          <button onClick={loginhandler} className="btn btn-auth margin-bottom--medium">Login</button>
          <button onClick={loginwithtesthandler} className="btn btn-auth margin-bottom--medium">Login with test credentials</button>

          <Link className="auth__link margin-tb--medium" to="/signup">Create New Account</Link>
          { isLoading && <LoaderOverlay /> }
          
      </div>
    </div>
  )
}

export { Login }