import React from 'react';
import { useTheme } from '../../Context';
import './Loader.css';
function Loader() {

  const { Theme } = useTheme()

  return (
    <div className={`loader padding--small ${Theme==="dark" ? 'loader--dark': ''}`}>
      <div className="sp sp-circle"></div>
    </div>
  )
}

export { Loader }