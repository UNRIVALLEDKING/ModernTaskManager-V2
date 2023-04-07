import React, { useRef, useState } from "react";
import "./form.css";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../../constant/constant";

export default function Form({
  addEffect,
  closeModal,
  getProjects,
  token,
  sound,
  setGreeting,
  setDashboard,
}) {
  const projectRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();

  const addProject = (e) => {
    e.preventDefault();
    if (projectRef.current.value.trim().length > 0) {
      if (sound) {
        addEffect.play();
      }
      const project = {
        title: projectRef.current.value,
        desc: descRef.current.value,
        deadline: dateRef.current.value,
        token: token,
        progress: 0,
        status: "Active",
      };
      // console.log(project);
      // const updatedProjects = [...allProjects, project];
      // setAllProjects(updatedProjects);
      // localStorage.setItem("projects", JSON.stringify(updatedProjects));
      try {
        fetch(API_URL + "/addProject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        }).then((res) => {
          res.json().then((data) => {
            // console.log("res", res.status);
            if (res.status === 201) {
              toast("Project Added!");
              closeModal();
              // console.log("resData", data);
              getProjects();
            } else {
              toast(data.message);
              setTimeout(() => {
                localStorage.clear();
                closeModal();
                setGreeting(false);
                setDashboard(true);
              }, 3000);
            }
          });
        });
      } catch (err) {
        toast(err.message);
      }
    } else {
      toast("Fill Project Details to Continue");
    }
  };

  return (
    <>
      <ToastContainer />
      <div id="myModal" className="modal" style={{ display: "block" }}>
        <div className="modal-content w-[80%] sm:w-[50%]">
          <form onSubmit={addProject}>
            <input
              type="text"
              placeholder="Project Name"
              className="input-field my-2"
              ref={projectRef}
            />
            <input
              type="text"
              placeholder="Description"
              className="input-field my-2"
              ref={descRef}
            />
            <input
              type="date"
              placeholder="deadline"
              className="input-field my-2"
              ref={dateRef}
            />
            <div className="flex justify-around">
              <div className="circle2">
                <button type="submit" className="form_btn">
                  ADD
                </button>
              </div>
              <div className="circle2">
                <button type="button" onClick={closeModal} className="form_btn">
                  ABORT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
