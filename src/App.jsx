import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
import Form from "./components/form/Form";

function App() {
  const [form, setForm] = useState(false);
  const [allProjects, setAllProjects] = useState(() => {
    const savedData = localStorage.getItem("projects");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });
  const openModal = () => {
    setForm(true);
  };

  const closeModal = () => {
    setForm(false);
  };
  console.log(allProjects);

  useEffect(() => {
    localStorage.getItem("projects");
  }, []);

  return (
    <>
      <div className="line"></div>
      <div className="base -mx-5 sm:m-auto">
        {form ? (
          <>
            <Form
              form={form}
              setForm={setForm}
              closeModal={closeModal}
              allProjects={allProjects}
            />
          </>
        ) : (
          <></>
        )}
        <h1 className="header under">ToDoMatic</h1>
        <div className="flex justify-around my-3">
          <h1 className="header">Projects</h1>
          <button onClick={openModal} className="bg-transparent add-btn">
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        <div className="card-container">
          {allProjects?.map((item, id) => (
            <Card item={item} id={id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
