import "./App.css";

import { Micro } from "react-micro";
import React, { useState } from "react";

function App() {
  console.log("### container-render");

  const [teste, setTeste] = useState("alo");

  const click = () => {
    setTeste(Date.now());
  };
  return (
    <div>
      <div>
        <h1>Click in the paragraph to cause a re-render</h1>
        <p onClick={click}>{teste}</p>
      </div>

      <Micro
        name="MicroCar"
        manifestSRC="asset-manifest.json"
        host="http://localhost:4000"
      />
    </div>
  );
}

export default App;
