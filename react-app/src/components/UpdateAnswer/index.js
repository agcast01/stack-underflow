import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { updateAnswer } from "../../store/answer"
import { getQuestions } from "../../store/question"

function UpdateAnswer() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { answerId } = useParams()
  const user = useSelector(state => state.session.user)
  const answers = useSelector(state => state.answers)
  const answer = answers[answerId]
  const [text, setText] = useState(answer.answer)
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = []

    if (!text) errors.push("Answer field is required")

    setValidationErrors(errors)
  }, [text])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      answer.answer = text
      let payload = answer
      payload.userId = answer.user.id

      let newAnswer = await dispatch(updateAnswer(payload, answer.id))
      await dispatch(getQuestions())

      history.push(`/questions/${answer.questionId}`)
      return newAnswer
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
        <div>
          <textarea className="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button disabled={user === null}>Answer</button>
      </form>
    </div>
  )
}

export default UpdateAnswer