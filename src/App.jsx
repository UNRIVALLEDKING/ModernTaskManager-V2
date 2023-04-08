import React, { useEffect, useMemo, useState } from "react";
import { AddIcon, EditIcon, DeleteIcon } from "./assets/Icons/icons_index";
import "./App.css";
import Card from "./components/card/Card";
import Form from "./components/form/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataCard from "./components/noDataCard/NoDataCard";
import AddEffect from "./assets/Audio/Add_sound_effect.wav";
import CompEffect from "./assets/Audio/Complete_sound_effect.wav";
import Welcome from "./components/welcomeMessage/Welcome";
import { API_URL } from "./constant/constant";

function App() {
  // console.log("api", API_URL);

  // States
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return JSON.parse(token);
    } else {
      return null;
    }
  });

  const [editingName, setEditingName] = useState(false);
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  const [sound, setSound] = useState(() => {
    const effect = localStorage.getItem("sound");
    if (effect) {
      return JSON.parse(effect);
    } else {
      return true;
    }
  });
  const [greeting, setGreeting] = useState(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      return true;
    } else {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    const username = localStorage.getItem("username");
    if (username !== null) {
      return JSON.parse(username);
    } else {
      return null;
    }
  });

  const [form, setForm] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  const [allProjects, setAllProjects] = useState([]);

  // Sound Effects
  const AddAudio = new Audio(AddEffect);
  const compAudio = new Audio(CompEffect);

  // Functions
  const getProjects = () => {
    console.log("get", token);
    if (token !== null) {
      try {
        fetch(API_URL + "/getProjects/" + token).then((res) => {
          res.json().then((data) => {
            // console.log("allProjects", data);
            setAllProjects(data);
          });
        });
      } catch (err) {
        console.log("err", err);
      }
    }
  };
  const openModal = () => {
    setForm(true);
  };

  const closeModal = () => {
    setForm(false);
  };
  const disposeAll = () => {
    if (sound) {
      AddAudio.play();
    }
    setDeleteAllModal(true);
  };

  const editName = () => {
    setEditingName(true);
  };

  const handleNewUser = (e) => {
    setUser(e.target.value);
  };

  const upDateUser = (event) => {
    if (user.length <= 15) {
      if (sound) {
        AddAudio.play();
      }
      const userData = { id: token, username: user };
      try {
        fetch(API_URL + "/updateUser", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }).then((res) => {
          res.json().then((data) => {
            if (res.status === 200) {
              toast("UserName Changed!");
              localStorage.setItem("username", JSON.stringify(user));
            } else {
              toast(data.message);
            }
          });
        });
      } catch (err) {
        console.log(err.message);
      }

      setEditingName(false);
    } else {
      event.preventDefault();
      toast("Username can't be more than 15 letters");
    }
  };

  const confirmDeleteAll = () => {
    if (sound) {
      AddAudio.play();
    }
    try {
      fetch(API_URL + "/deleteAll/" + token, {
        method: "DELETE",
      }).then((res) => {
        res.json().then((data) => {
          if (res.status === 200) {
            toast("Deleted All Tasks");
            getProjects();
            setDeleteAllModal(false);
          } else {
            toast(data.message);
          }
        });
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  const SoundEffect = () => {
    setSound(!sound);
    localStorage.setItem("sound", JSON.stringify(!sound));
  };
  useEffect(() => {
    getProjects();
  }, []);
  useEffect(() => {
    getProjects();
  }, [token]);

  return (
    <>
      <ToastContainer />

      {deleteAllModal ? (
        <>
          <div id="myModal" className="modal" style={{ display: "block" }}>
            <div className="modal-content w-[80%] sm:w-[50%]">
              <>
                <div className="max-w-md m-auto">
                  <div className="rounded-2xl pending-card box">
                    <div className="circle"></div>

                    <div className="text-center p-3 sm:pr-8 ">
                      <h3 className="text-xl font-bold title pb-4">Warning!</h3>
                    </div>

                    <p className="paragraph min-h-[20px]">
                      This will delete all your Task's Data. After Deletion,
                      Data can't be retrieved. Proceed at your own risk.
                    </p>
                    <br />

                    <div className="flex justify-around">
                      <div className="circle2">
                        <button
                          onClick={confirmDeleteAll}
                          className="form_btn te xt-center p-0"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="circle2">
                        <button
                          onClick={() => setDeleteAllModal(false)}
                          className="form_btn text-center p-0"
                        >
                          Abort
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {dashboard ? (
        <>
          <Welcome
            allProjects={allProjects}
            setDashboard={setDashboard}
            setUser={setUser}
            user={user}
            greeting={greeting}
            setGreeting={setGreeting}
            AddAudio={AddAudio}
            setToken={setToken}
            compAudio={compAudio}
            SoundEffect={SoundEffect}
            sound={sound}
            setSound={setSound}
          />
        </>
      ) : (
        <></>
      )}
      {editingName ? (
        <>
          <div id="myModal" className="modal" style={{ display: "block" }}>
            <div className="modal-content w-[80%] sm:w-[50%]">
              <>
                <form onSubmit={upDateUser}>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input-field my-2"
                    value={user}
                    onChange={handleNewUser}
                  />
                  <div className="flex justify-between my-8">
                    <p className="paragraph text-2xl">Sound Effect</p>
                    <div className="circle3">
                      <button
                        type="button"
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
                        type="submit"
                        className="form_btn text-center p-0"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              </>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="line"></div>
      <div className="base -mx-5 sm:m-auto">
        <span className="bord"></span>
        <span className="bord"></span>
        <span className="bord"></span>
        <span className="bord"></span>
        {form ? (
          <>
            <Form
              setGreeting={setGreeting}
              userToken={token}
              form={form}
              setDashboard={setDashboard}
              getProjects={getProjects}
              setForm={setForm}
              closeModal={closeModal}
              allProjects={allProjects}
              setAllProjects={setAllProjects}
              addEffect={AddAudio}
              sound={sound}
            />
          </>
        ) : (
          <></>
        )}
        <h1 className="header under">ToDoMatic</h1>
        <div className=" flex items-center my-3">
          <h2 className="header text-[1.2rem] xxs:text-[1.8rem] mr-1">
            {user}
          </h2>
          <div className="flex w-full justify-around">
            <button
              onClick={openModal}
              className="bg-transparent add-btn"
              aria-label="Add Projects"
            >
              <AddIcon />
            </button>
            <button
              onClick={editName}
              className="bg-transparent add-btn"
              aria-label="Edit Username"
            >
              <EditIcon />
            </button>
            <button
              onClick={disposeAll}
              className="bg-transparent add-btn"
              aria-label="Delete All Projects"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
        <div className="card-container">
          {allProjects.length > 0 ? (
            <>
              {allProjects.map((item, id) => (
                <Card
                  allProjects={allProjects}
                  setAllProjects={setAllProjects}
                  item={item}
                  key={id}
                  id={id}
                  getProjects={getProjects}
                  addEffect={AddAudio}
                  completeEffect={compAudio}
                  sound={sound}
                />
              ))}
            </>
          ) : (
            <>
              <NoDataCard openModal={openModal} />
            </>
          )}
        </div>
      </div>
      <div className="mt-4 text-[22px]">
        <p>
          source code available on{" "}
          <a
            className="border border-current rounded px-4 py-2 hover:text-[#35f8ff]"
            href="https://github.com/UNRIVALLEDKING/ModernTaskManager-V2"
          >
            github
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
