import React from 'react'

export const Form = ({ userName, onFormChanged, onFormSubmit })=>{
    const handleChange = (event) => {
        onFormChanged(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' required value={userName} onChange={handleChange}></input>
                <input type='submit'></input>
            </form>
        </div>
    )
}