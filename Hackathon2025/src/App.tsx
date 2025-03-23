import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { motion } from "framer-motion";
import { CircleUserRound } from 'lucide-react';
import { Dialog } from "radix-ui";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./loginpages/signup_form";
import LoginForm from "./loginpages/loginform";
import Dashboard from "./loginpages/Usersahboard";


interface Fruit {
  id: number;
  name: string;
}

function App() {

  const [count, setCount] = useState(0);

  //This is basically saying make a variable called array
  //setArray is the function we use to update the variable "array"
  //the "useState([])" says to initialize "array" to an empty array
  //Now, whenever setarray() is used, it will fill in "array" with an array as the argument
  //See below
  //same thing but with the db now
  const [fruits, setFruits] = useState<Fruit[]>([]);




  //This is used to connect to the backend server
  const fetchAPI = async () => {
    try {
      //This is where the server is hosted. This should probably not change.
      // but if u going to a set table add the name
      const response = await axios.get<Fruit[]>(
        "http://localhost:8080/api/fruits"
      ); //
      setFruits(response.data); //Store database data in state
      console.log("Fetched fruits:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {/* This is the radix comment */}
        <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="Button violet">Edit profile</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="name">
                Name
              </label>
              <input className="Input" id="name" defaultValue="Pedro Duarte" />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="username">
                Username
              </label>
              <input className="Input" id="username" defaultValue="@peduarte" />
            </fieldset>
            <div
              style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
            >
              <Dialog.Close asChild>
                <button className="Button green">Save changes</button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      </div>
        {/* This is the icon comment */}
        <CircleUserRound size={18}/>

      <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.3 }}>
        {/* This is the fruit comment */}
        <h1>Fruit List</h1>
        <ul>
          {fruits.map((fruit) => (
            <>
              {/* Render real database data  + how comment work-> use <> </> when inside map*/}
              <li key={fruit.id}>{fruit.name}</li>
            </>
          ))}
        </ul>
      </motion.div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
