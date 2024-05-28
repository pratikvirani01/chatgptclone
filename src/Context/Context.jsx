import { createContext, useState } from "react";
import runChat from "../Config/chetgpt";

export   const Context = createContext();

const ContextProvider = (props) => {

    const[input,setInput] = useState("");
    const[recentprompt,setRecentprompt] = useState("");
    const[prevprompt,setPrevprompt] = useState([]);
    const[showResult,setShowResult] = useState(false);
    const[loading,setLoading] = useState(false);    
    const[resultData,setResultData] = useState("");

    const delaypara =(index,nextword ) =>{
        setTimeout(function(){
            setResultData(prev=>prev+nextword);
        },75*index)
    }

const onSent = async (prompt) => {

    setResultData("")
    setLoading(true)
    setShowResult(true)
    setRecentprompt(input)
    setPrevprompt(prev=>[...prev,input])
    const response = await runChat(input)
    let responseArray = response.split("**");
    let newResponse;
    for(let i=0; i < responseArray.length; i++)
        {
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse +="<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArray = newResponse2.split(" ");
    for(let i =0; i<newResponseArray.length;i++)
        {
            const nextword = newResponseArray[i];
            delaypara(i,nextword+" ")
        }
    setLoading(false)
    setInput("")
}

const contextValue = {
        prevprompt,
        setPrevprompt,
        onSent,
        setRecentprompt,
        recentprompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
}
return(
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
)

}
export  default ContextProvider