import {  useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createQuestion } from "../../store/question"
import { useHistory } from "react-router"

function CreateQuestion() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const [text, setText] = useState("")
  const [title, setTitle] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []


  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([])
    if (!text) errors.push("Question field is required")
    if (!title) errors.push("Title field is required")
    if (title.length > 30) errors.push("Title field must be less than 30 characters")

    if (errors.length) return setValidationErrors(errors)


      const payload = {
        question: text,
        userId: user.id,
        title
      }

      let newQuestion = await dispatch(createQuestion(payload))
      history.push(`/questions/${newQuestion.id}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name='title'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="question">Question</label>
          <textarea
            name="question"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='textarea'
          />
        </div>
        <button disabled={user === null}>Ask</button>
      </form>
    </div>
  )
}

export default CreateQuestion
