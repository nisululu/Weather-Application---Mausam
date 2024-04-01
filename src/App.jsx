import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Weather from "./pages/Weather"
import { useState } from "react"

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/weather/:id" Component={Weather} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
