import React from 'react'
import { Link } from "react-router-dom"
import Header from '../../components/header/Header'

export const Page404 = () => {
  return (
    <>
    <Header/>
      <h1>404 NOT FOUND</h1>
      <p>The page you are looking for could not be found.</p>
      <Link to="/">Top</Link>
    </>
  )
}