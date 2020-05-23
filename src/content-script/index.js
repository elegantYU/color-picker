import React from 'react'
import ReactDOM from 'react-dom'
import Home from './feature/Home.jsx'

const createInstance = () => {
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
}

const destoryInstance = () => {
  document.querySelector('#elegantYu-colorPicker-root').remove()
}

chrome.runtime.onMessage.addListener((message) => {
  const { command } = message

  if (command === 'create') {
    console.log('create')
    createInstance()
  } else if (command === 'destory') {
    destoryInstance()
  }

  return true
})