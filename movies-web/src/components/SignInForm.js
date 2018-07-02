import React from 'react'

const handleSubmit = (event, onLogIn) => {
    event.preventDefault()
    const form = event.target
    const email = form["user[email]"].value
    const password = form["user[password]"].value
    const user = { "email": email, "password": password }
    onLogIn(user)

}

function SignInForm ({ onLogIn }) {
    return (
        <form onSubmit={(event) => { handleSubmit(event, onLogIn) }}>
            <label>
                <span>Email:</span>
                <input name="user[email]" />
            </label>
            <br />
            <label>
                <span>Password:</span>
                <input type="password" name="user[password]" />
            </label>
            <br />
            <button type="submit">Log In!</button>
        </form>
    )
}

export default SignInForm

