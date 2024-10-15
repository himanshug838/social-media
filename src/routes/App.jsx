import 'bootstrap/dist/css/bootstrap.min.css' 
import './App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SiderBar from '../components/SiderBar'
import { useState } from 'react'
import PostListProvider from '../store/post-list-store'
import { Outlet } from 'react-router-dom'

function App() {     

  const [selectedTab, setSetselectedTab] = useState("Home")

  return (
    <>
    <PostListProvider>
      <div className="app-container">
        <SiderBar selectedTab={selectedTab} setSetselectedTab={setSetselectedTab}/>
          <div className="content"> 
            <Header />
            <Outlet />
            <Footer />
          </div>
      </div>
    </PostListProvider>
    </>
  )
}


export default App 