import AppRouter from "./Router";
import { useEffect, useState } from "react";
import {authService} from "../fBase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
        setInit(true);
    },[]);
    })
  return (
    <div>
      <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
      </>
    </div>
  );
}

export default App;
