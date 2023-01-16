import * as React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default function Insight() {
  const [folio, setFolio] = React.useState('BSE.NS');
  const dataDraft = {
    'BSE.NS':{'current':532.5, 'upDown':-0.69, 'dayLow':531, 'dayHigh':538.950, 'yrLow':526.25, 'yrHigh':1010.15, prev:536.20, opn:538.95},
    'NSE.V':{'current':0.17, 'upDown':-10.52, 'dayLow':0.17, 'dayHigh':0.19, 'yrLow':0.16, 'yrHigh':1.45, prev:0.19, opn:0.19},
    'ASHOKLEY.NS':{'current':146.80, 'upDown':-1.77, 'dayLow':146, 'dayHigh':150.60, 'yrLow':99.15, 'yrHigh':166.55, prev:149.44, opn:144.49},
    'CIPLA.NS':{'current':1061.15, 'upDown':1.3, 'dayLow':1043.15, 'dayHigh':1064.09, 'yrLow':867.45, 'yrHigh':1173.40, prev:1047.60, opn:1052.80},
    'EICHERMOT.NS':{'current':3103.25, 'upDown':-1.09, 'dayLow':3095, 'dayHigh':3152.94, 'yrLow':2256, 'yrHigh':3850, prev:3137.25, opn:3150},
    'RELIANCE.NS':{'current':2471.60, 'upDown':-2.16, 'dayLow':2465, 'dayHigh':2532.5, 'yrLow':1841.95, 'yrHigh':2819.85, prev:2526.15, opn:2524.85},
    'TATASTEEL.NS':{'current':118.10, 'upDown':-0.63, 'dayLow':117.60, 'dayHigh':119.25, 'yrLow':83.81, 'yrHigh':137.07, prev:118.85, opn:118.95}
  }
  React.useEffect(() => {
  const items = JSON.parse(localStorage.getItem('dataKey'));
  if (items) {
   setFolio(items);
  }
}, []);

    return (
      <Box sx={{margin:'4% 0'}}>
        <Typography variant="h6" sx={{padding:'1% 4% 0 4%'}} gutterBottom>
            <b>{ folio }</b>
        </Typography>

        <Divider sx={{ margin:'2% 2%' }}/>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={3}>
              <Box sx={{paddingLeft:'15%' ,textAlign:'left'}}>
                  <Box>
                    <Typography variant="p" sx={{ color:'grey',  borderBottomStyle:'dashed' }} gutterBottom>
                      Open
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" sx={{ color:'grey',  borderBottomStyle:'dashed' }} gutterBottom>
                      Previous Close
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" sx={{ color:'grey',  borderBottomStyle:'dashed' }} gutterBottom>
                      Day High
                    </Typography>
                  </Box>
              </Box>
            </Grid>
            <Grid item xs={4} md={3}>
              <Box sx={{textAlign:'left'}}>
                  <Box>
                    <Typography variant="p" gutterBottom>
                    <b>{ dataDraft[folio].opn }</b>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" gutterBottom>
                    <b>{ <b>{ dataDraft[folio].prev }</b> }</b>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" gutterBottom>
                    <b>{ dataDraft[folio].dayHigh }</b>
                    </Typography>
                  </Box>
              </Box>
            </Grid>
            <Grid item xs={8} md={3}>
              <Box sx={{paddingLeft:'15%' ,textAlign:'left'}}>
                  <Box>
                    <Typography variant="p" sx={{ color:'grey',  borderBottomStyle:'dashed' }} gutterBottom>
                      Day Low
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" sx={{ color:'grey',  borderBottomStyle:'dashed' }} gutterBottom>
                      52 Week High
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" sx={{ color:'grey',  borderBottomStyle:'dashed' }} gutterBottom>
                      52 Week Low
                    </Typography>
                  </Box>
              </Box>
            </Grid>
            <Grid item xs={4} md={3}>
              <Box sx={{textAlign:'left'}}>
                  <Box>
                    <Typography variant="p" gutterBottom>
                    <b>{ dataDraft[folio].dayLow }</b>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" gutterBottom>
                    <b>{ dataDraft[folio].yrHigh }</b>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" gutterBottom>
                      <b>{ dataDraft[folio].yrLow }</b>
                    </Typography>
                  </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    )}