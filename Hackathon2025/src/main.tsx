// import "./index.css";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "@radix-ui/themes/styles.css";
// import { Theme } from "@radix-ui/themes";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <Theme>
//       <App />
//     </Theme>
//   </StrictMode>
// );

import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Accounts from "./pages/Accounts"; // Import the Accounts page

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Accounts /> {/* Render Accounts directly */}
  </StrictMode>
);
