import { useState } from 'react'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const reset = useField()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }

    const handleReset = (event) => {
      content.clear()
      author.clear()
      info.clear()
    }

    
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.input} />
          </div>
          <div>
            author
            <input {...author.input} />
          </div>
          <div>
            url for more info
            <input {...info.input} />
          </div>
          <button>create</button>
          <button type='button' onClick={handleReset}>reset</button>
        </form>
      </div>
    )
}

export default CreateNew