import React from 'react'
import NavBar from './NavBar'
import { Route, Routes } from 'react-router-dom'
import AllRecipes from './AllRecipes'
import AddYours from './AddYours'
import Recipe from './Recipe'
import GetStarted from './GetStarted'
import Category from './Category'

export default function Home() {

  return (
    <>
      <Routes>
        <Route element={<><GetStarted /></>} path='/' />
        <Route element={<><NavBar /><AllRecipes /></>} path='/all' />
        <Route path='/category' element={<Category />}/>
        <Route element={<AddYours />} path='/addyours' />
        <Route path='/recipe'>
          <Route path=':id' element={<Recipe />} />
        </Route>
      </Routes>

    </>
  )
}
