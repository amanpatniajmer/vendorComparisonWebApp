import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'

const Navbar = ({heading="Dashboard", active="Home"}) => {
    const [query, setQuery] = useState(window.location.search)
    let location = useLocation();

    useEffect(()=>{
        setQuery(window.location.search)
    }, [location])
    
  return (
    <div className='navbar'>
        <Header heading={heading}/>
        <ul>
            <li>
            <Link to='/' className={active === "Home" ? 'active' : ''}>Home</Link>
            </li>
            <li>
            <Link to={'/capability-assessment-dashboard' + query} className={active === "Capabilities" ? 'active' : ''}>Capabilities</Link>
            </li>
            <li>
            <Link to={'/feature-assessment-dashboard' + query} className={active === "Features" ? 'active' : ''}>Features</Link>
            </li>
            <li>
            <Link to={'/activities-assessment-dashboard' + query} className={active === "Activities" ? 'active' : ''}>Activities</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar