import Grid from '@mui/material/Grid/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination/Pagination';
import {useState } from 'react';
import { createFilterOptions } from '@mui/material/useAutocomplete/useAutocomplete';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField/TextField';

type emojiList = {
    name: string,
    category: string,
    group: string,
    htmlCode: Array<string>,
    unicode: Array<string>,
}

const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: any) => option,
  });

function BasicCard({data}:{data:emojiList}) {
  return (
    <Card sx={{ maxWidth: 250, maxHeight:150, display:"inline-block", width:250,height:150 }}>
      <CardContent>
        <Grid><Grid><div style={{width:"200%",height:"200%"}} dangerouslySetInnerHTML={{ __html: `<code>${data.htmlCode}</code>` }}></div></Grid>
        <Grid><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <b>Name: </b>{data.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <b>Group: </b>{data.group}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <b>Category: </b>{data.category}
        </Typography></Grid></Grid>
      </CardContent>
    </Card>
  );
}
export const CardList = ({emojiData,filterList}:{emojiData:Array<emojiList>,filterList:any})=>{
    function GenerateCardList(){
        return(currentCards.map((data:emojiList,idx:number)=>{
            //console.log(data);
            return(<div key={data.unicode+":"+idx} style={{padding:5,maxWidth: 250, maxHeight:150, display:"inline-block", width:250,height:150}}><BasicCard data={data}/></div>);
        }))
    }
    const [filterData,setFilterData] = useState(emojiData)
    const cardsPerPage = 12;
    const totalPages = Math.ceil(filterData.length/cardsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCards,setCurrentCards] = useState(filterData.slice(1 * cardsPerPage - cardsPerPage, 1 * cardsPerPage));
    const handleChange = (event: any, value: number) => {
        setCurrentPage(value);
        setCurrentCards(filterData.slice((value * cardsPerPage) - cardsPerPage, value * cardsPerPage));
        console.log(currentCards.length);
      };
    return(<>
    <Autocomplete
      id="filter-demo"
      options={filterList}
      getOptionLabel={(option) => option}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Custom filter" />}
      onChange={
        (event,value)=>{
            const newData = emojiData.filter((d)=>{
                if(d.category == value){
                    return d;
                }
            })
            setFilterData(newData);
            handleChange(undefined,1);
        }
      }
    />
    {GenerateCardList()}
    <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
    </>)
}