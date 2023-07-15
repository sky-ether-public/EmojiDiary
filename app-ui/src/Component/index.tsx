import { useEffect, useState } from "react"
import { FetchEmojiData } from "../Services/FetchEmojiData";
import { CardList } from "./List/CreateCardList";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
type emojiList = {
    name: string,
    category: string,
    group: string,
    htmlCode: Array<string>,
    unicode: Array<string>,
}

export const Home = ()=>{
    const [emojiData,setEmojiData] =  useState<emojiList[]>();
    const [filterList,setFilterList] = useState<string[]>();
    function createFilterList(){
        const filterListData = new Set("");
        emojiData?.forEach((res)=>{
            filterListData.add(res.category);
        })
        setFilterList(Array.from(filterListData));
    }
    useEffect(()=>{
        FetchEmojiData().then((res:emojiList[])=>setEmojiData(res));
        createFilterList();
        //console.log(emojiData);
    },[emojiData])
    return(<>
        {emojiData?<CardList emojiData={emojiData} filterList={filterList}/>:<CircularProgress />}
    </>)
}