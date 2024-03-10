import { useState } from 'react'
import './App.css'
import { SummaryTable } from './features/summaryTable/SummaryTable'
import { View } from './features/monitor/View'
import { Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material'

function App() {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#00658e",
                contrastText: "#ffffff",
            },

            background: {
                default: "#fcfcff",
                paper: "#fcfcff",
            },

            text: {
                primary: "#191c1e",
                secondary: "#191c1e",
                disabled: "#41484d",
            }
        },
    })

    return (<>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <View></View>
    </ThemeProvider></>)
}

export default App
