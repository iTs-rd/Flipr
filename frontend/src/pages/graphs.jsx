import React from 'react'
import Plot from '../components/chart'
import Divider from '@mui/material/Divider';

export default function OverView () {
    return(
        <div>
            <Plot />
            <Divider light sx={{ borderBottomWidth: 5, width: '95%' }} />
        </div>
    )
}