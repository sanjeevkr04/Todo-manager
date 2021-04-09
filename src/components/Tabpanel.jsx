import React from 'react'

function Tabpanel({ children, value, index, ...other }) {
    return (
        <div
            style={{width: '100%', display: value===index ? 'flex': "none"}}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
      {value === index && 
        children
      }
            
        </div>
    )
}

export default Tabpanel
