import React, { useEffect, useRef, useState } from "react";
import { dbService } from "../fBase";
import { addDoc, collection, getDocs, query , onSnapshot , orderBy } from "firebase/firestore";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
    const [nweet,setNweet] = useState(""); // 하나의 nweet을 의미
    const [nweets,setNweets] = useState([]); // nweet들을 담아둘 배열
    const [attachment,setAttachment] = useState();
    const fileInput = useRef(); // [Clear버튼 클릭 후 file input에 남아 있는 이미지 파일명 지우기]
    /*
        const getNweets = async() => {
        const dbnweets = await getDocs(query(collection(dbService,"nweets")));
        dbnweets.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id:doc.id,
            }
            setNweets(prev => [nweetObj,...prev]);
        });
    }
    */
    useEffect(()=>{
        const q = query(
            collection(dbService,"nweets"),
            orderBy("createdAt","desc")
        );
        onSnapshot(q, (snapshot) => { //nweet이 바뀌는 것을 실시간으로 나타내줌,내가 뭘하든 항상 실행
            const nweetArr = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
            }));
            setNweets(nweetArr); //위의 foreach를 이용한 방법과 결과는 같다. 이게 좀더 신식? 방법
            });
        }, []);
    const onSubmit = async (event) =>{
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            createrId: userObj.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
       setNweet("");
    }
    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNweet(value);    
    }
    const onFileChange = (event) => { //사진 출력을 위한 함수
        const {target:{files},} = event; 
        const theFile = files[0]; // 사진 1개만 필요하므로 [0]
        const reader = new FileReader(); //reader 선언
        reader.onloadend = (finishedevent) => { //onloadend 함수는 파일 읽기 작업이 끝나면 호출함.
            const {currentTarget:{result}} = finishedevent; //currentTarget,result 모두 개발자 도구에서 확인
            setAttachment(result);
        };
        reader.readAsDataURL(theFile); // theFile에 들어있는 텍스트를 이미지로 바꿔줌.
    }
    const onClearAttachment = () => {
        setAttachment(null);
        fileInput.current.value = null;
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
                <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
                <input type="submit" value="Nweet" />
                {attachment && (
                <div>
                    <img src={attachment} width="50px" height="40px" alt="preview" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div> 
                )}
            </form>
            <div>
                {nweet}
                {nweets.map(nweet=>(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createrId === userObj.uid}/>
                ))}            
            </div>
        </div>
    )
}
export default Home;