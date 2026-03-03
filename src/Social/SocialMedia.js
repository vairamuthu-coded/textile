import React from 'react'
import SocialHome from './SocialHome'
import SocialNewPost from './SocialNewPost'
import SocialPostPage from './SocialPostPage'
import SocialMissing from './SocialMissing'
import Header from '../Header'
import SocialAbout from './SocialAbout'
import {Route, Routes } from 'react-router-dom'
import SocialNav from './SocialNav'
import SocialEdit from './SocialEdit'
import { DataProvider } from '../context/CreateContext'
const SocialMedia = ({colorValue}) => {
  return(
    <>  
    <DataProvider>
    <Header title="Anugraha Fashion Mill Private Limited" colorValue={colorValue}  />
    <SocialNav colorValue={colorValue} />
      <Routes>
        <Route path="/" element={<SocialHome  />}/>   
        <Route path="/SocialPostPage" >
            <Route index element={<SocialNewPost  />} />           
              <Route path=':id' element={<SocialPostPage />} />
        </Route>      
        <Route path='/edit/:id' element={<SocialEdit  />} />
        <Route path="/About" element={<SocialAbout colorValue={colorValue}/>}/>
        <Route path="*" element={<SocialMissing colorValue={colorValue}/>}/>     
      </Routes> 
    </DataProvider>

 </>

  )
}

export default SocialMedia
