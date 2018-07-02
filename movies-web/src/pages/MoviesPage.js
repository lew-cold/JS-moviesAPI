import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MovieList from '../components/MovieList'
import Movie from '../components/Movie'
import MovieForm from './CreateMovie'


export default ({ movies, onCreateMovie, onEditMovie, onDeleteMovie }) => {
    return (
        !!movies ? (
            <Switch>
                <Route path='/movies/edit/:id' render={
                    ({ match: { params: { id } } }) => {
                        const movie = movies.find(movie => movie._id === id)
                        return (!!movie) ? (<MovieForm items={movie} onEdit={onEditMovie} edit={true} />) : (<p>Unknown Movie</p>)
                    }
                } />
                <Route path='/movies/delete/:id' render={
                    ({ match: { params: { id } } }) => {
                        const movie = movies.find(movie => movie._id === id)
                        onDeleteMovie(movie)
                        return <Redirect to='/movies' />
                    }
                } />
                <Route path='/movies/new' render={
                    () => (<MovieForm onCreate={onCreateMovie} />)
                } />
                <Route path='/movies/:id' render={
                    ({ match: { params: { id } } }) => {
                        const movie = movies.find(movie => movie._id === id)
                        return (!!movie) ? (<Movie {...movie} />) : (<p>Unknown Movie</p>)
                    }
                } />
                <Route path='/movies' render={
                    () => (<MovieList items={movies} onDeleteMovie={onDeleteMovie} />)
                } />
            </Switch>
        ) : (
            <p>Loading...</p>
        )
    )
}