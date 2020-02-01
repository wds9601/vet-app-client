// Packages
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Custom components
import PetForm from './pages/PetForm'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import PetShow from './pages/PetShow'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Vets from './pages/Vets'

const Content = props => {
  return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" render={
            () => <Login user={props.user} updateUser={props.updateUser} />
          } />
          <Route path="/profile" render={
            () => <Profile user={props.user} />
          } />
          <Route path="/pets/new" render={
            () => <PetForm user={props.user} updateUser={props.updateUser} />
          } />
          <Route path="/pets/show/:id" render={
            () => <PetShow user={props.user} />
          } component={PetShow} />
          <Route path="/vets" render={
          () => <Vets user={props.user} />
          } />
          <Route path="/signup" render={
            () => <Signup user={props.user} updateUser={props.updateUser} />
          } />
          <Route path="*" component={Error} />
        </Switch>
      </div>
  )
}

export default Content
