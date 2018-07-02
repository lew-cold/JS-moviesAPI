import React from 'react'
import CommentList from './CommentList'
import { Link } from 'react-router-dom'

const Rating = ({ code, description }) => {
    return (<span>{code} {description}</span>)
}

const Movie = ({ _id, title, yearReleased, rating, comments }) => {
    return (<div><Link to={`/movies/${_id}`}>{title}</Link>{_id} {yearReleased} <Rating {...rating} /> <CommentList items={comments}/><Link to={`/movies/edit/${_id}`}>Edit</Link><Link to={`/movies/delete/${_id}`}>Delete</Link></div>)
}

export default Movie