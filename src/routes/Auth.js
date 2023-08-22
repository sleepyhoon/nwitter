
import React, { useState } from "react";
import { authService, firebaseInstance } from "../fBase";
import {
    createUserWithEmailAndPassword,
    GithubAuthProvider, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    signInWithPopup,
} from "@firebase/auth";
const Auth = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(true);
    const [error,setError] = useState("");
    const onChange=(event)=>{
        const {target: {name,value}} = event;
        if(name==="email"){
            setEmail(value);
        } else if(name==="password"){
            setPassword(value);
        }
    }
    const onSubmit=async(event)=>{
        event.preventDefault(); // 새로고침 하는것을 방지한다.(기본행위 방지)
        try {
            let data;
            if(newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
                } else {
                data = await signInWithEmailAndPassword(authService, email, password);
                }
                console.log(data);
        } catch(error){
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev)=>!prev);
    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;
        let provider;
        if(name==="google"){
            provider = new GoogleAuthProvider(); // 이렇게 바꾸니까 잘 돌아간다...이유는 모르겠다.
        }
        else if(name === "github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            value={email}
            onChange={onChange} 
            />
            <input 
            name="password"
            type="password" 
            placeholder="Password"
            required 
            value={password}
            onChange={onChange}
            />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount?"Sign in":"Create Account"}</span>
        <div>
            <button onClick={onSocialClick} name="github">Continue with GitHub</button>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
        </div>
    </div>
);
}
export default Auth;