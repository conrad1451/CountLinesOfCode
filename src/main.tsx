import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import ScanProcessingJS from "./ScanProcessingJS";
import TestFile from "./TestFile";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
{/*     <ScanProcessingJS /> */}
      <TestFile />
  </React.StrictMode>,
);
