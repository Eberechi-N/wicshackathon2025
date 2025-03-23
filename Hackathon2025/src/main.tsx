import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <Transactons />
    </Theme>
  </StrictMode>
);

// import "./index.css";
// import App from "./App.tsx";
// import Signup from "./pages/Signup.tsx";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById("root")!);
// root.render(
//   <BrowserRouter>
//     <Signup />
//   </BrowserRouter>
// );
