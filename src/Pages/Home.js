import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ComparisonForm from '../Components/ComparisonForm'
import Header from '../Components/Header'
import homeImage from '../images/home.jpg'

const Home = ({setActive}) => {
  let location = useLocation();
  const [queryInBinary, setQueryInBinary] = useState('')

  let allComparisons = ["Alvaria","CXOne","NICE","Verint","Calabrio","Genesys Cloud","AWS","Playvox"]

  useEffect(() => {
    setActive("Home")
    const { search } = location;
    let query = new URLSearchParams(search).get('q');
    if (query !== null) {
        setQueryInBinary(query)
    }
    // eslint-disable-next-line
}, [location])
  
  return (
    <div id='homePage'>
      <div>
        <img src={homeImage} alt='random home page'/>
      </div>
      <div className='content'>
        <Header heading={"We bring our analysis on different workforce management disciplines across vendor partners with our industry experience and projects delivered."}/>
        <br/><br/><br/>
        {"Please select the vendor partners you would like to compare :"}
        <ComparisonForm comparisonKeys={allComparisons}/>
        <Link to={`/capability-assessment-dashboard?q=${queryInBinary}`}><button>Let`s compare!</button></Link>
      </div>
    </div>
  )
}

export default Home