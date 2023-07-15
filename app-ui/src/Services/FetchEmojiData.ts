import axios from "axios"
type emojiList = {
    name: string,
    category: string,
    group: string,
    htmlCode: Array<string>,
    unicode: Array<string>,
}

export const FetchEmojiData = async ()=>{
    const response:emojiList[]=await axios.get("https://emojihub.yurace.pro/api/all").then((res)=>{
        return res.data;
    })
    return response;
}