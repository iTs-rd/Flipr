import * as React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import DayView from './slides'



export default function Insight() {
  const dataDraft = {
    'BSE.NS':{'current':532.5, 'upDown':-0.69, 'dayLow':531, 'dayHigh':538.950, 'yrLow':526.25, 'yrHigh':1010.15},
    'NSE.V':{'current':0.17, 'upDown':-10.52, 'dayLow':0.17, 'dayHigh':0.19, 'yrLow':0.16, 'yrHigh':1.45},
    'ASHOKLEY.NS':{'current':146.80, 'upDown':-1.77, 'dayLow':146, 'dayHigh':150.60, 'yrLow':99.15, 'yrHigh':166.55},
    'CIPLA.NS':{'current':1061.15, 'upDown':1.3, 'dayLow':1043.15, 'dayHigh':1064.09, 'yrLow':867.45, 'yrHigh':1173.40},
    'EICHERMOT.NS':{'current':3103.25, 'upDown':-1.09, 'dayLow':3095, 'dayHigh':3152.94, 'yrLow':2256, 'yrHigh':3850},
    'RELIANCE.NS':{'current':2471.60, 'upDown':-2.16, 'dayLow':2465, 'dayHigh':2532.5, 'yrLow':1841.95, 'yrHigh':2819.85},
    'TATASTEEL.NS':{'current':118.10, 'upDown':-0.63, 'dayLow':117.60, 'dayHigh':119.25, 'yrLow':83.81, 'yrHigh':137.07}
  }
  const [folio, setFolio] = React.useState('BSE.NS');

  React.useEffect(() => {
  const items = JSON.parse(localStorage.getItem('dataKey'));
  if (items) {
   setFolio(items);
  }
}, []);

    return (
      <Box sx={{paddingLeft:'5%' }}>
        <Typography variant="h5" gutterBottom>
            <b>{ folio }</b>
        </Typography>
        <Divider light sx={{ borderBottomWidth: 5, width: '95%' }} />
        <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
              <b>{ dataDraft[folio].current }</b>
          </Typography>
          
          {dataDraft[folio].upDown >= 0 &&
            <Typography variant="h6" gutterBottom sx={{ color: 'green' }}>
              <ArrowCircleUpOutlinedIcon /><b>{ dataDraft[folio].upDown }</b>
            </Typography>
          }
          {dataDraft[folio].upDown < 0 &&
            <Typography variant="h6" gutterBottom sx={{ color: 'red' }}>
              <ArrowCircleDownOutlinedIcon /><b>{ dataDraft[folio].upDown }</b>
            </Typography>
          }
          
          <Typography variant="caption" gutterBottom sx={{ color: 'grey'  }}>
              As on 12 Feb, 2023 16:10 IST
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="p" gutterBottom sx={{ color: 'grey', paddingLeft:'2.5%' }}>
              Day Range:-
          </Typography>
          <DayView def={ ((dataDraft[folio].current)-(dataDraft[folio]?.dayLow))/((dataDraft[folio]?.dayHigh)-(dataDraft[folio]?.dayLow)) } low={ dataDraft[folio].dayLow } high={ dataDraft[folio].dayHigh } />
          <Typography variant="p" gutterBottom sx={{ color: 'grey', paddingLeft:'2.5%'}}>
              52-Week Range:-
          </Typography>
          <DayView  def={ 100*((dataDraft[folio].current-dataDraft[folio].yrLow))/(dataDraft[folio].yrHigh-dataDraft[folio].yrLow) } low={ dataDraft[folio].yrLow } high={ dataDraft[folio].yrHigh } />
        </Grid>
      </Grid>
      <Divider light sx={{ borderBottomWidth: 5, width: '95%', paddingTop:'5%'}} />
      </Box>
    );
  }