import "./css/App.css";
import { useState } from "react";
import Axios from "axios";
import Menu from './components/Menu'
import Header from './components/Header'
import { Sling as Hamburger } from 'hamburger-react'

function App() {
  const [citizens, setCitizens] = useState([""])
  const [showMenu, setShowMenu] = useState(false)
  const [render, setRender] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const useEffect = () => {
    if(showMenu){
      setTimeout(() => {
        setRender(true)
      }, 2000)
    } else{
      setRender(false)
    }
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
      <div className="flex-row">
        {showMenu? <Menu /> : ''}
        <Hamburger onToggle={() => {
          toggleMenu()
        }}  />
      </div>
    </div>
  );
}

export default App;
