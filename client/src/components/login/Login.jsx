import React, { useState, useEffect } from "react";
import "./Login.scss";
import { useNavigate, useParams } from "react-router-dom";
// import { useSignIn } from "react-auth-kit";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");

    // If a token is present, redirect the user to another page (e.g., home)
    if (token) {
      navigate("/"); // Update the target route accordingly
    }
  }, [navigate]);

  // let signIn = useSignIn();
  const [loginRegister, setLoginRegister] = useState("login");
  const [credentials, setcredentials] = useState({
    userName: "",
    password: "",
  });
  const [registerCredentials, setRegisterCredentials] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const loginAndGetToken = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let rawData = JSON.stringify({
      userName: credentials.userName,
      password: credentials.password,
    });
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: rawData,
      redirect: "follow",
    };
    const response = await fetch("http://localhost:5000/login", requestOptions);
    const data = await response.json();
    console.log(data);
    setcredentials({ userName: "", password: "" });
    if (data.message == "success") {
      // signIn({
      //   token: data.token,
      //   expiresIn: 3600,
      //   tokenType: "Bearer",
      //   authState: "user"
      // });
      localStorage.setItem("token", data.token);
      navigate(`/${data.token}`);
    } else {
      window.alert("invalid credentails !");
      setcredentials({ userName: "", password: "" });
    }
  };
  const RegisterUser = async () => {
    let { userName, password, confirmPassword } = registerCredentials;
    // console.log("details : ", { userName, password, confirmPassword });
    if (password === confirmPassword) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let rawData = JSON.stringify({
        userName,
        password,
        confirmPassword,
      });
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: rawData,
        redirect: "follow",
      };
      const response = await fetch(
        "http://localhost:5000/login/register",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (data.reason == "ER_DUP_ENTRY") {
        return window.alert("try using different user name password");
      }
      if (data.message == "success") {
        window.alert("registered successfully");
        setLoginRegister("login");
        setcredentials({ userName: "", password: "" });
      }
    } else {
      window.alert("password and confirm password not match !");
    }
  };
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="row">
            {loginRegister == "login" ? <h2>Login </h2> : <h2>Register</h2>}
          </div>
          <div className="row">
            <h1>User Name</h1>
            <input
              type="text"
              value={
                loginRegister == "login"
                  ? credentials.userName
                  : registerCredentials.userName
              }
              onChange={(e) => {
                loginRegister == "login" ? (
                  setcredentials({ ...credentials, userName: e.target.value })
                ) : (
                  <>
                    {" "}
                    {setRegisterCredentials({
                      ...registerCredentials,
                      userName: e.target.value,
                    })}
                  </>
                );
              }}
              placeholder="User Name"
            />
          </div>
          <div className="row">
            <h1>Password</h1>
            <input
              type="text"
              value={
                loginRegister == "login"
                  ? credentials.password
                  : registerCredentials.password
              }
              onChange={(e) => {
                loginRegister == "login"
                  ? setcredentials({ ...credentials, password: e.target.value })
                  : setRegisterCredentials({
                      ...registerCredentials,
                      password: e.target.value,
                    });
              }}
              placeholder="Password"
            />
          </div>
          {loginRegister == "register" ? (
            <div className="row">
              <h1>confirm Password</h1>
              <input
                type="text"
                value={registerCredentials.confirmPassword}
                onChange={(e) =>
                  setRegisterCredentials({
                    ...registerCredentials,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Password"
              />
            </div>
          ) : (
            <></>
          )}

          <div className="row create-user">
            <p onClick={() => setLoginRegister("login")}>sign In</p>
            <p>Forgot Password?</p>
            <p onClick={() => setLoginRegister("register")}>New Register</p>
          </div>
          {loginRegister == "login" ? (
            <>
              {" "}
              <div className="row">
                <button onClick={() => loginAndGetToken()}>Login</button>
              </div>
            </>
          ) : (
            <>
              <div className="row">
                <button
                  onClick={() => {
                    loginRegister == "login"
                      ? loginAndGetToken()
                      : RegisterUser();
                  }}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Login;
