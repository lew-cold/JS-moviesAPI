import React from 'react'
    
    const handleSubmit = (event, onCreate, onEdit, items, isEditing) => {
        const form = event.target
        const title = form['movie[title]'].value
        const yearReleased = form['movie[yearReleased]'].value
        const ratingCode = form['movie[ratingCode]'].value
        const ratingDescription = form['movie[ratingDescription]'].value
        // const comments = form['movie[comment]']
        const rating = { code: ratingCode, description: ratingDescription }
        if(isEditing()) {
            const _id = items._id
            onEdit({ _id, title, yearReleased, rating })
        } else {
            onCreate({ title, yearReleased, rating })
        }
    }

    const MovieForm = ({ items, onCreate, onEdit }) => {
        const isEditing = () => {
            if(window.location.href.indexOf("edit") > -1 ) {
            return true
          } else {
              return false
          }
        }
        return (
            <div>
                {
                    isEditing() ? (
                        <h4>Editing Movie: {items.title}</h4>
                    ) : (
                        <h4>Create a new Movie</h4>
                    )
                }
                <form onSubmit={(event) => handleSubmit(event, onCreate, onEdit, items, isEditing)}>
                    <label>
                        <span>Title:</span>
                        <input name="movie[title]" defaultValue={isEditing() ? (items.title) : (null)} />
                    </label>
                    <label>
                        <span>Year Released:</span>
                        <input name="movie[yearReleased]" defaultValue={isEditing() ? (items.yearReleased) : (null)}/>
                    </label>
                    <label>
                        <span>Rating Code:</span>
                        <input name="movie[ratingCode]" defaultValue={isEditing() ? (items.rating.code) : (null)}/>
                    </label>
                    <label>
                        <span>Rating Description:</span>
                        <input name="movie[ratingDescription]" defaultValue={isEditing() ? (items.rating.description) : (null)}/>
                    </label>
                    <button type='submit'>Submit!</button>
                </form>
            </div>
        )
    }

export default MovieForm