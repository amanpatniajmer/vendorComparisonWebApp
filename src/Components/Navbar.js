import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const Navbar = ({heading="Dashboard", active="Home"}) => {

    useEffect(() => {
        document.querySelectorAll(".navbar ul li a").forEach((item) => {
            if (active === item.getAttribute('name')) {
              item.className = "active";
            }
            else item.className = "";
        });
    }, [active])
    
  return (
    <div className='navbar'>
        <Header heading={heading}/>
        <ul>
            <li>
            <Link to='/' name="Home">Home</Link>
            </li>
            <li>
            <Link to='/capability-assessment-dashboard' name="Capabilities">Capabilities</Link>
            </li>
            <li>
            <Link to='/feature-assessment-dashboard' name="Features">Features</Link>
            </li>
            <li>
            <Link to='/activities-assessment-dashboard' name="Activities">Activities</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar