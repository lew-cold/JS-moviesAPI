import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from "react-router-dom"
import MoviePage from './pages/MoviesPage'
import HomePage from './pages/HomePage'
import logo from './logo.svg'
import SignInForm from './components/SignInForm'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      movies: null,
      token: localStorage.getItem('token')
    }
  }

  handleCreateMovie = (movie) => {
    fetch('/movies', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => { return Promise.resolve(json) })
    .then(movie => {
      this.setState((prevState) => {
        const allMovies = [movie].concat(prevState.movies)
        return { movies: allMovies }
      })
    })
  }

  handleEditMovie = (movie) => {
    fetch(`/movies/update`, {
      method: 'PUT',
      body: JSON.stringify(movie),
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => { return Promise.resolve(json) })
    .then(movie => {
      this.setState((prevState) => {
        const allMovies = [movie].concat(prevState.movies)
        return { movies: allMovies }
      })
    })
  }

  handleDeleteMovie = (movie) => {
    fetch(`/movies/delete`, {
      method: 'DELETE',
      body: JSON.stringify(movie),
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => { return Promise.resolve(json) })
    this.setState(() => {
        return { movies: [] }
      })
    this.componentDidMount()
  }


  
  handleLogIn = (user) => {
    fetch('/auth', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => { return Promise.resolve(json) })
    .then(token => {
      localStorage.setItem('token', token.token)
      this.setState(prevState => ({
        movies: prevState.movies,
        token: token.token
      }))
      this.componentDidMount()
    })
  }

  handleLogOut = () => {
    localStorage.removeItem('token')
    this.setState(prevState => ({
      movies: [],
      token: null
    }))
  }

  componentDidMount() {
    fetch('/movies', {
      method: 'GET',
      headers: { "Authorization": `Bearer ${this.state.token}` }
    })
    .then(resp => {
      if (!resp.ok) {
        return Promise.reject(resp)
      } else {
        return resp
      }
    })
    .then(resp => resp.json())
    .then(json => this.setState({ movies: json }))
    .catch(resp => {
      alert('You are not signed in')
      this.setState({ movies: [] })
    })
  }

  render() {
      const isSignedIn = () => {
        return !!this.state.token
      }
      return (
        <Router>
          <main>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Movies!</h1>
              </header>

              <nav>
                <NavLink exact to='/' activeClassName='selected'> Home </NavLink>
                {
                    isSignedIn() ? (
                    <NavLink exact to='/signout' activeClassName='selected'> Sign Out </NavLink>
                  ) : (
                    <NavLink exact to='/signin' activeClassName='selected'> Sign In </NavLink>
                  )
                }
                <NavLink exact to='/movies' activeClassName='selected'> Movies </NavLink>
                <NavLink exact to='/movies/new' activeClassName='selected'>New Movie </NavLink>
              </nav>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/movies' render={
                  () => <MoviePage movies={this.state.movies} onCreateMovie={this.handleCreateMovie} onEditMovie={this.handleEditMovie} onDeleteMovie={this.handleDeleteMovie} />
                }/>
                <Route path='/signin' render={
                  () => (
                    isSignedIn() ? (
                      <Redirect to='/movies' />
                    ) : (
                      <SignInForm onLogIn={this.handleLogIn} />
                    )
                  )
                } />
                <Route path='/signout' render={
                  () => {
                    this.handleLogOut()
                    return <Redirect to='/signin' />
                  }
                } />
                
              </Switch>
            </div>
            </main>
        </Router>
        );
  }

}

export default App;