import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateQuestion } from "../../store/question"
import { useHistory, useParams } from "react-router"

function UpdateQuestion() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { questionId } = useParams()

  const user = useSelector(state => state.session.user)
  const questions = useSelector(state => state.questions)

  const question = questions[questionId]

  const [text, setText] = useState(question.question)
  const [title, setTitle] = useState(question.title)
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = []

    if (!text) errors.push("Question field is required")
    if (!title) errors.push("Title field is required")

    setValidationErrors(errors)
  }, [text, title])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      question.question = text;
      question.title = title

      await dispatch(updateQuestion(question, questionId))
      history.push(`/questions/${questionId}`)
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        <label htmlFor="title">Title</label>
        <input
          name='title'
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="question">Question</label>
        <textarea
          name="question"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='textarea'
        />
        <button disabled={user === null}>Update</button>
      </form>
    </div>
  )
}

export default UpdateQuestion
