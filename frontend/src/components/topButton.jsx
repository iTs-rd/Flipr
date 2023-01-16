import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function SelectSmall() {
  const [folio, setFolio] = React.useState('BSE.NS');

  const handleChange = (e) => {
    localStorage.setItem('dataKey', JSON.stringify(e.target.value));
    window.location.reload(false);
  };
   
  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem('dataKey'));
    if (items) {
     setFolio(items);
    }
  }, [folio]);

  const logout =async (e)=>{
    e.preventDefault();
    localStorage.removeItem('authorized');
    window.location.replace("/");
}

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-small">Listing</InputLabel>
        <Select
          labelId="select-small"
          id="select-small"
          value={folio}
          label="Listing"
          onChange={handleChange}
        >
          <MenuItem value={'BSE.NS'}>BSE.NS</MenuItem>
          <MenuItem value={'NSE.V'}>NSE.V</MenuItem>
          <MenuItem value={'ASHOKLEY.NS'}>ASHOKLEY.NS</MenuItem>
          <MenuItem value={'CIPLA.NS'}>CIPLA.NS</MenuItem>
          <MenuItem value={'EICHERMOT.NS'}>EICHERMOT.NS</MenuItem>
          <MenuItem value={'RELIANCE.NS'}>RELIANCE.NS</MenuItem>
          <MenuItem value={'TATASTEEL.NS'}>TATASTEEL.NS</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={logout} sx={{marginLeft:'50%', marginTop:'5%'}}>Logout</Button>
    </div>
  )
}