import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import MainComponent from './MainComponent'
function App() {
    return (
        <BrowserRouter>  
            <MainComponent />
        </BrowserRouter>
    )
}

export default App
