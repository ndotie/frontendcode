import { UnprotectedLayout } from "../layouts/unprotectedLayout"
import { useState } from 'react';
import axios from "axios";
import { BASE_URL, isLoggedIn, storeTokens, storeUser } from "../commons";
import { useNavigate } from "react-router-dom";
export const LoginPage = props => {
    const [isLogin, setIsLogin ] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ error, setError ] = useState([]) 
    const navigate = useNavigate();


   
    const tryLogin = async (e) => {
        e.preventDefault();
        // if(!email.length) return setError("Fill your email address")
        // if(!password.length) return setError("Fill your password")

        setIsLogin( true );
        setError([])
        try{
            let results = await axios.post(`${BASE_URL}auth/login`, {
                email,password
            })
            console.log( results );
            if( results.data.user.admin  ){
            }else if ( results.data.user.level === 2 ){

            }else {
              setError(['Student logins to mobile app'])
              return;
            }
            if( results.status === 200 ){//logged in successfully
                if( results.data.user ){
                    storeUser( results.data.user )
                }
                if( results.data.token ) {
                    storeTokens( results.data.token )
                }
            }
            navigate('/')
        }catch(ex){
            let collect = []
            console.log( ex );
             
            if( ex.response.data && ex.response.data.errors ){
                    if(ex.response.data.errors.email){
                        collect.push(ex.response.data.errors.email)
                    }
                    if(ex.response.data.errors.password){
                        collect.push(ex.response.data.errors.password)
                    } 
               setError( collect ); 
            }else if(ex.response.data && ex.response.data.message ){
                setError([ex.response.data.message])
            }else {
                setError(["An error have occured please try again!"])
            }
        }finally{
            setIsLogin( false );
        }
    }
    return <UnprotectedLayout>
        <div className="card mb-3">
    <div className="card-body">
      <div className="pt-4 pb-2">
        <h5 className="card-title text-center pb-0 fs-4">
          Login to Your Account
        </h5>
        <p className="text-center small">
          Enter your username &amp; password to login
        </p>
      </div>
      <form className="row g-3 needs-validation" noValidate="">
        <div className="col-12">
          <label htmlFor="yourUsername" className="form-label">
            Username
          </label>
          <div className="input-group has-validation">
            <span
              className="input-group-text"
              id="inputGroupPrepend"
            >
              @
            </span>
            <input
              type="text"
              name="username"
              className="form-control"
              id="yourUsername"
              value = {email}
              onChange = {e => setEmail(e.target.value)}
              required=""
            />
            <div className="invalid-feedback">
              Please enter your email.
            </div>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="yourPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="yourPassword"
            value = {password}
            onChange={e => setPassword(e.target.value)}
            required=""
          />
          <div className="invalid-feedback">
            Please enter your password!
          </div>
        </div>
        {/* <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="remember"
              defaultValue="true"
              id="rememberMe"
            />
            <label
              className="form-check-label"
              htmlFor="rememberMe"
            >
              Remember me
            </label>
          </div>
        </div> */}
        <div className="col-12">
          {error.length ? error.map((ee,idx) => <><small key = {idx} className="text-center text-danger">{ee.email || ee.password || ee}</small><br/></>) : null}
          <button className="btn btn-primary w-100" type="submit" onClick = {tryLogin}>
            Login
          </button>
        </div>
        
      </form>
    </div>
  </div>
  </UnprotectedLayout>
}