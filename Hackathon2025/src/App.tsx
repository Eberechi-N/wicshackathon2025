import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  //This is basically saying make a variable called array
  //setArray is the function we use to update the variable "array"
  //the "useState([])" says to initialize "array" to an empty array
  //Now, whenever setarray() is used, it will fill in "array" with an array as the argument
  //See below
  const [array, setArray] = useState([]);

  //This is used to connect to the backend server
  const fetchAPI = async () => {
    //This is where the server is hosted. This should probably not change.
    const response = await axios.get("http://localhost:8080/api");

    //setArray is declared in the useState above. We are using
    //array from the server to fill in the array called "array"
    //which is also declared above
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
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
        {
          //we are basically looping through "array" and doing something with each element
          //arrow functions are basically the same as writing out a function that doesn't need
          //to exist 100% of the time. The first () have "fruits" which stands for the actual
          //elements in the array. Index is used for if you need to keep track of which div has
          //which fruit. It isnt important here (and i honestly never need to reference the div
          //after the fact), but yeah. The arrow points to the block of code to be executed.
          array.map((fruit, index) => (
            //use {curly braces} to use arguments from the function
            <div key={index}>
              <p>{fruit}</p>
              <br />
            </div>
          ))
        }
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
