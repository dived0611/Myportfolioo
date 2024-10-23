import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Content from './components/content/content.jsx'
import Scene from './scene/scene.jsx'
import Nav from './components/Navbar/Nav.jsx'
import Loading from './components/loading/Loading.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode >
    
    <Loading/>
    <Scene/>
    <Nav/>
    <Content/>
    
  </StrictMode>,
)
