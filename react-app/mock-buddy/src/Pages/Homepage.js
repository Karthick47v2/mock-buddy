import React, {useState, useEffect} from 'react'
import { Form } from '../Components/form'

export const Homepage = () => {

    const [userName, setUserName] = useState('')

    const handleFormChange = (userIp) => {
        setUserName(userIp)
    }

    const handleFormSubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                content: userName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.json())
          .then(msg => {
              console.log(msg)
            setUserName('')
        })
    }

    return(
        <Form userInput={userName} onFormChanged={handleFormChange} onFormSubmit={handleFormSubmit}/>
    )
}
