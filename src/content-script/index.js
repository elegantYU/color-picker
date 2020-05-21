import React from 'react'
import ReactDOM from 'react-dom'
import Home from './feature/Home.jsx'

if (!document.querySelector('#elegantYu-colorPicker-root')) {
  let dom = document.createElement('div') 
  dom.id = 'elegantYu-colorPicker-root'
  document.body.appendChild(dom)
}

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("elegantYu-colorPicker-root")
);
