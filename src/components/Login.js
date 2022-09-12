import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import logo from '../images/loginNew.gif'
import '../App.css'
import AuthService from "../services/auth.service"
import jwtDecode from "jwt-decode";
import { Button } from "@material-ui/core";
import  Google from "../images/google.png";
import Facebook from "../images/facebook.png";
import Github from "../images/github.png";
import FacebookLogin from 'react-facebook-login';
import { color } from "@mui/system";
import { useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';



const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {

  const [user,setUser] =useState({});
  let navigate = useNavigate();

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID Token:"+ response.credential);
    var userObject=jwtDecode(response.credential);
    console.log(userObject);
    userObject.id=userObject.iat;
    userObject.accessToken=response.credential;
    userObject.roles=["ROLE_USER"];
    setUser(userObject); 
    console.log(JSON.stringify(userObject))
    document.getElementById("signInDiv").hidden=true;
    // if (userObject.) {
    localStorage.setItem("user", JSON.stringify(userObject));

    navigate("/profile");
    window.location.reload();
  }


  const { linkedInLogin } = useLinkedIn({
    clientId: '86g8xpbf8wdysl',
    redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden=false;
  }

  const responseFacebook = (response) => {
    console.log("response:"+response);
    var userObject=response;
    console.log("user object:"+response);
    console.log("user object:"+response.picture.data);
    userObject.roles=["ROLE_USER"];
    userObject.picture=response.picture.data.url;
    // userObject.picture=response.picture.url;
    // console.log("url:"+respon);
    setUser(response); 
    localStorage.setItem("user", JSON.stringify(userObject));
    navigate("/profile");
    window.location.reload();
    // localStorage.setItem("user", JSON.stringify(response));
  }
  
  const componentClicked=(data)=>{
    console.warn("Warn:"+data);
  }

 useEffect(()=>{
/*global google*/
    google.accounts.id.initialize({
      client_id:"354829973196-g6hqfg6og1ns3gn119014o86uvo060dm.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme:"outline",size:"large"
      }
    );

    google.accounts.id.prompt();
 },[])



  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  // If we have no user:Sign in button
  // If we have a user :Show th log out button

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const myStyle={
//     backgroundImage: 
// "url('https://i.ytimg.com/vi/4UX2wyCSVG8/maxresdefault.jpg')",
    // height:'100vh',
    // marginTop:'-70px',
    // fontSize:'50px',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
};



  return (
    <div className="col-md-12" style={myStyle}>
      <div className="card card-container" >
<img src={logo} className="img img-responsive img-circle" alt="login"   style={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          overflow: 'hidden',
          // borderWidth: 3,
          borderColor:"black",
          alignItems:'center',
          marginLeft:50
        
        }}/>

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
<hr/>
          <div className="orN">OR</div>
          <br/>
          {/* <div className="loginButton google">
            <img src={Google} alt="" className="icon"></img>
Google
          </div> */}

{/* <br/>
          <div className="loginButton facebook">
            <img src={Facebook} alt="" className="icon"></img>
Facebook
          </div> */}
          {/* <br/>
          <div className="loginButton github">
            <img src={Github} alt="" className="icon"></img>
Github
          </div> */}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

      <div id="signInDiv"></div>
<br/>
      <FacebookLogin 
    appId="1197442684166112"
    // autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook}
    icon="fa-facebook" 
    cssClass="btnFacebook"
    textButton = "&nbsp;&nbsp;Sign In with Facebook"     />,

<img
      onClick={linkedInLogin}
      className="btnLinkedin"
      src={linkedin}
      alt="Sign in with Linked In"
      style={{cursor: 'pointer' }}
    />

      {
        Object.keys(user).length!=0 &&
        <Button  onClick={(e)=>handleSignOut(e)} className="btn btn-primary btn-block" >Sign Out</Button>
      }
      
        {
          user &&
          <div>
            <img src={user.picture}></img>
            <h3>{user.name}</h3>
          </div>
        }
      </div>

      {/* <div className="right-box">
    <span className="signinwith">Sign in with<br/>Social Network     </span>

    <button className="social facebook">Log in with Facebook</button>
    <button className="social twitter">Log in with Twitter</button>
    <button className="social google">Log in with Google+</button>


  </div>
  <div className="or">OR</div> */}

    </div>
  );
};

export default Login;
