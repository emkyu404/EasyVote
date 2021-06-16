import "./css/App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [citizens, setCitizens] = useState([""]);

  const getCitizens = () => {
    console.log("aaa");
    Axios.get("http://localhost:3001/citizens").then((response) => {
      setCitizens(response.data);
    });
  };

  return (
    <div className="App">
      <button onClick={() => getCitizens()}>+</button>
      {citizens[0].nomCitoyen}
    </div>
  );
}

export default App;
