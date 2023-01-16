import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { publicRequest } from "../requestMethods";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function App() {
  const [folio, setFolio] = React.useState('BSE.NS');
  const [time, setTime] = React.useState('5y');
  const [labels, setLabels] = React.useState();
  const [data, setData] = React.useState();

  React.useEffect(() => {
  const items = JSON.parse(localStorage.getItem('dataKey'));
  if (items) {
   setFolio(items);
  }
  }, []);

  React.useEffect(() => {
    const makeRequest = async ()=>{
      const res = await publicRequest.get(`api/get_data/?category=${time}&symbol=${ folio }`);
      setLabels(res.data.data.map(a => a.date));
      setData(res.data.data.map(a => a.high));
    };
    makeRequest();
  }, [folio, time]);

  const handleChange = (e) => {
    ;
    window.location.reload(false);
  };
  console.log(time);
  return (
    <Grid container spacing={2}>
        <Grid item xs={10} md={8}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-small">Listing</InputLabel>
        <Select
          labelId="select-small"
          id="select-small"
          value={time}
          label="Listing"
          onChange={(e)=>setTime(e.target.value)}
        >
          <MenuItem value={'3m'}>3 Months</MenuItem>
          <MenuItem value={'6m'}>6 Months</MenuItem>
          <MenuItem value={'1y'}>1 Year</MenuItem>
          <MenuItem value={'5y'}>5 Year</MenuItem>
        </Select>
      </FormControl>
            <Box sx={{paddingLeft:'10%'}}>
                <Line options={{
  
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: folio,
    },
  },
}}
 data={{
  labels,
  datasets: [
    {
      fill: true,
      label: folio,
      data: data,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}} />

            </Box>
        </Grid> 
      </Grid>
    
  )
}