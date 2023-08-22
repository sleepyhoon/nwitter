import React, { useState } from "react";
import { dbService } from "../fBase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
    const [nweet,setNweet] = useState("");
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.collection("nweets").add({ //여기가 작동을 안해 시발
            nweet,
            createdAt : Date.now(),
       });
       setNweet("");
    }
    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNweet(value);    
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text"
                 value={nweet} 
                 onChange={onChange} 
                 placeholder="What's on your mind?" 
                 maxLength={120} 
                 />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    )
}
export default Home;