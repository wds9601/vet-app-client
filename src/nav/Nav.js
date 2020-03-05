import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
.navbar { background-color: #41545E; }
a, .navbar-nav, .navbar-light .nav-link {
color: #87A693;
&:hover { color: #99CAC9; }
}
`;

const NavigationBar = props => {
  const handleLogout = e => {
    e.preventDefault()
    // Remove the token from localstorage (or cookies)
    localStorage.removeItem('userToken')
    // Update the state of the App
    props.updateUser(null)

    //Redirect back to Login Page
    return <Redirect to="/" />
  }

  let links = (
    <span>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </span>
  )

  // If the user is logged in, show profile page and logout links
  if (props.user) {
    links = (
      <span>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/pets/new">Add A Pet</Link>
        </li>
        <li>
          <Link to="/vets">See Vets</Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </li>
      </span>
    )
  }

  return (
    <Styles>
      <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <img className="nav-logo" alt="logo" src="https://i.imgur.com/YyfzRKI.png?1" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav">
                {links}
              </Nav>
          </Navbar.Collapse>
      </Navbar>
    </Styles>
  )
}

export default NavigationBar




