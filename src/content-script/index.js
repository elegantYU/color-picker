import React from 'react'
import ReactDOM from 'react-dom'
import Pointer from './feature/Pointer.jsx'
import Panel from './feature/Panel.jsx'

if (!document.querySelector('#elegantYu-colorPicker-root')) {
  let dom = document.createElement('div') 
  dom.id = 'elegantYu-colorPicker-root'
  document.body.appendChild(dom)
}

ReactDOM.render(
  <React.StrictMode>
    <Pointer />
    <Panel />
  </React.StrictMode>,
  document.getElementById("elegantYu-colorPicker-root")
);
