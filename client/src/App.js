import "./css/App.css";
import { useState } from "react";
import Axios from "axios";
import Menu from './components/Menu'
import Header from './components/Header'

function App() {
  const [citizens, setCitizens] = useState([""]);
  const [showMenu, setShowMenu] = useState(true)

  const toggleMenu = () => {
    
  }

  const getCitizens = () => {
    console.log("aaa");
    Axios.get("http://localhost:3001/citizens").then((response) => {
      setCitizens(response.data);
    });
  };

  return (
    <div className="App">
      <Header />
      <Menu />
    </div>
  );
}

export default App;
