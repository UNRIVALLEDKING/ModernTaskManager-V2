import React from "react";
import { useState } from "react";
import "./welcome.css";
import CreateAccount from "../form/auth/CreateAccount";
import Login from "../form/auth/Login";
import { toast } from "react-toastify";

export default function Welcome({
  allProjects,
  setDashboard,
  user,
  setUser,
  setGreeting,
  greeting,
  AddAudio,
  compAudio,
  SoundEffect,
  sound,
  setSound,
}) {
  const [authState, setAuthState] = useState("Login");

  const close = () => {
    if (sound) {
      compAudio.play();
    }
    setDashboard(false);
  };
  const completedProjects = allProjects.filter((item) => {
    return item.status === "Completed";
  });

  function logout() {
    if (sound) {
      compAudio.play();
    }
    // console.log("logout");
    localStorage.clear();
    setGreeting(false);
    toast("logout");
  }

  return (
    <>
      <div id="myModal" className="modal" style={{ display: "block" }}>
        <div className="modal-content w-[80%] sm:w-[50%]">
          {greeting ? (
            <>
              <div className="max-w-md m-auto">
                <div className="rounded-2xl pending-card box">
                  <div className="circle"></div>

                  <div className="text-center p-3 sm:pr-8 ">
                    <h3 className="text-xl font-bold title pb-4">
                      Hello, {user}
                    </h3>
                  </div>

                  <p className="paragraph min-h-[20px]">
                    This is ToDoMatic, Your project or task manager. This will
                    help you maintain your day-to-day tasks or projects
                    everything that you have to do.
                  </p>
                  <br />
                  <div className="flex justify-between">
                    <p className="paragraph">
                      Total Projects :- {allProjects.length}
                    </p>
                    <p className="paragraph">
                      Completed Projects :- {completedProjects.length}
                    </p>
                  </div>
                  <div className="flex justify-between items-center my-8">
                    <p className="paragraph text-2xl">Sound Effect</p>
                    <div className="circle3">
                      <button
                        onClick={SoundEffect}
                        className="form_btn text-center p-0 h-16 w-16"
                      >
                        {sound ? "On" : "Off"}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <div className="circle2">
                      <button
                        onClick={logout}
                        className="form_btn te xt-center p-0"
                      >
                        Logout
                      </button>
                    </div>
                    <div className="circle2">
                      <button
                        onClick={close}
                        className="form_btn text-center p-0"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {authState === "Register" ? (
                <>
                  <CreateAccount
                    authState={authState}
                    setAuthState={setAuthState}
                    sound={sound}
                    setUser={setUser}
                    setGreeting={setGreeting}
                    AddAudio={AddAudio}
                    setSound={setSound}
                  />
                </>
              ) : (
                <>
                  <Login
                    authState={authState}
                    setAuthState={setAuthState}
                    sound={sound}
                    setUser={setUser}
                    setGreeting={setGreeting}
                    AddAudio={AddAudio}
                    setSound={setSound}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
