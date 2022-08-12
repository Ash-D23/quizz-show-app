import React from 'react'
import { useTheme } from '../../Context'

function LoaderOverlay() {
  const ThemeValue  = useTheme()
  const Theme = ThemeValue?.Theme

  return (
    <>
        <div className={`loader loader--overlay center  ${Theme==="dark" ? 'dark--overlay': ''}`}>
            <div className="sp sp-circle"></div>
        </div>
        <div className={`loader__container--overlay ${Theme==="dark" ? 'dark__container--overlay': ''}`}>

        </div>
    </>
    
  )
}

export { LoaderOverlay }