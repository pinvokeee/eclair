import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import numeral from 'numeral'

numeral.register("locale", "jp", {
    
    delimiters: {
        thousands: ',',
        decimal: '.'
    },

    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },

    ordinal : function (number) {
        
        if (number == 1) return "st";
        if (number == 2) return "nd";
        if (number == 3) return "rd";

        return "th";
    },
    
    currency: {
        symbol: '￥'
    }
});

numeral.locale('jp');

console.log("WAKE");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
