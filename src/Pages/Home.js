import React, { useEffect } from 'react'
import ComparisonForm from '../Components/ComparisonForm'
import Header from '../Components/Header'

const Home = ({setActive}) => {
  let allComparisons = ["ASPECT","CXOne","NICE","Verint","Calabrio","Genesys Cloud","AWS","Playvox"]

  useEffect(() => {
    setActive("Home")
  })
  
  return (
    <>
      <Header heading={"Please select - "} className='center'/>
      <ComparisonForm comparisonKeys={allComparisons}/>
    </>
  )
}

export default Home