import React from 'react'
import Deets from '../components/deets'
import Divider from '@mui/material/Divider';
import ReviewDay from '../components/reviewDay'
import TopButton from '../components/topButton'

export default function OverView () {
    React.useEffect(() => {
        const id = JSON.parse(localStorage.getItem('authorized'));
        if(!id){
          window.location.replace("/login");
        }
      }, []);
    return(
        <div>
            <TopButton />
            <Deets />
            <ReviewDay />
            <Divider light sx={{ borderBottomWidth: 5, width: '95%' }} />
        </div>
    )
}

