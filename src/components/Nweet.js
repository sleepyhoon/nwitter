import React, { useState } from "react";
import { dbService } from "../fBase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";

const Nweet = ({nweetObj, isOwner})=>{
    const [editing,setEditing] = useState(false); //edit모드인지 아닌지 체크
    const [newNweet,setNewNweets] = useState(nweetObj.text); // input에 입력된 text, 및 수정
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            const NweetText = doc(dbService,"nweets",`${nweetObj.id}`);//delete nweet
            await deleteDoc(NweetText);
        }
    }
    const toggleEditing = () => setEditing((prev)=>!prev);
    const onSubmit = async(event)=>{ //edit 제출하기
        event.preventDefault();
        const NweetText =doc(dbService, "nweets", `${nweetObj.id}`);
        await updateDoc(NweetText,{
            text: newNweet
        });
        setEditing(false);
    };
    const onChange = (event) => { //빈칸에 value 입력하기
        const {
            target:{value},
        } = event;
        setNewNweets(value);
    };
    return (
        <div>
                {editing ? (
                    <>
                        {isOwner && (
                        <>
                            <form onSubmit={onSubmit}>
                                <input 
                                onChange={onChange} 
                                type="text" 
                                placeholder="Edit yout Nweet" 
                                value={newNweet} 
                                required
                                />
                                <input 
                                type="submit"
                                value="Update Nweet"
                                />
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                        </>
                    )}
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        )}
                    </>
                )}
        </div>
    )
    }

export default Nweet;