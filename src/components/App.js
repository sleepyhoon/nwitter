import AppRouter from "./Router";
import { useEffect, useState } from "react";
import {authService} from "../fBase";
function App() {
  const [init, setInit] = useState(false);
  const [userObj,setUserObj] = useState(null); // user정보 저장
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{ // 로그인,로그아웃, 어플리케이션 초기화때 실행
      if(user){
        user ? setUserObj(user) : setUserObj(null)
      }
      setInit(true); // 로그인 유무와 상관없이 항상 초기화는 진행해야함 
    },[]);
    })
  return (
    <div>
      <> 
      {init ? <AppRouter 
      isLoggedIn={Boolean(userObj)} //userObj가 있다면 true를 반환
      userObj={userObj}
      /> : "initializing..."}
      </>
    </div>
  );
}

export default App;
