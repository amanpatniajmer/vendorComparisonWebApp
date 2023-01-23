import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'

const Navbar = ({heading="Dashboard", active="Home"}) => {
    const [query, setQuery] = useState(window.location.search)
    let location = useLocation();

    useEffect(() => {
        document.querySelectorAll(".navbar ul li a").forEach((item) => {
            if (active === item.getAttribute('name')) {
              item.className = "active";
            }
            else item.className = "";
        });
    }, [active])

    useEffect(()=>{
        setQuery(window.location.search)
    }, [location])
    
  return (
    <div className='navbar'>
        <Header heading={heading}/>
        <ul>
            <li>
            <Link to='/' name="Home">Home</Link>
            </li>
            <li>
            <Link to={'/capability-assessment-dashboard' + query} name="Capabilities">Capabilities</Link>
            </li>
            <li>
            <Link to={'/feature-assessment-dashboard' + query} name="Features">Features</Link>
            </li>
            <li>
            <Link to={'/activities-assessment-dashboard' + query} name="Activities">Activities</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar