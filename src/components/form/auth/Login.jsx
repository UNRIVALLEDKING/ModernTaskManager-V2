import React, { useRef, useState } from "react";
import { API_URL } from "../../../constant/constant";
import { toast } from "react-toastify";

export default function Login({
  authState,
  setAuthState,
  sound,
  setSound,
  setUser,
  AddAudio,
  setGreeting,
  setToken,
}) {
  const [showPass, setShowPass] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginUser = (event) => {
    event.preventDefault();
    if (sound) {
      AddAudio.play();
    }
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // console.log("User", userData.email.length);
    if (userData.email.length > 0) {
      if (userData.password.length > 0) {
        try {
          fetch(API_URL + "/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }).then((res) => {
            res.json().then((data) => {
              // console.log("resData", data);
              if (res.status === 200 && data.token) {
                localStorage.setItem("token", JSON.stringify(data.token));
                setToken(data.token);
                setGreeting(true);
                localStorage.setItem("sound", JSON.stringify(sound));
                localStorage.setItem("username", JSON.stringify(data.username));
                setUser(data.username);
                toast(data.message);
              } else {
                toast(data.message);
              }
            });
          });
        } catch (err) {
          console.log("err", err);
        }
      } else {
        toast("Enter Password");
      }
    } else {
      toast("Enter Email");
    }
  };
  return (
    <form onSubmit={loginUser}>
      <div className="text-center p-3 sm:pr-8 ">
        <h3 className="text-xl font-bold title pb-4">Login</h3>
      </div>
      <input
        type="email"
        placeholder="Email"
        className="input-field my-2"
        ref={emailRef}
      />

      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          className="input-field my-2"
          ref={passwordRef}
        />
        <a
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-0 p-5 bg-transparent transition-all"
        >
          {showPass ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </>
          )}
        </a>
      </div>

      <div className="flex justify-between my-8">
        <p className="paragraph text-2xl">Sound Effect</p>
        <div className="circle3">
          <button
            type="button"
            onClick={() => setSound(!sound)}
            className="form_btn text-center p-0 h-16 w-16"
          >
            {sound ? "On" : "Off"}
          </button>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="circle2">
          <button type="submit" className="form_btn text-center p-0">
            Login
          </button>
        </div>
        <div className="circle2">
          <button
            onClick={() => setAuthState("Register")}
            type="button"
            className="form_btn text-center p-0"
          >
            Create Account
          </button>
        </div>
      </div>
    </form>
  );
}
