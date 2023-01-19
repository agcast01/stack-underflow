import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { createAnswer } from "../../store/answer"
import { getQuestions } from "../../store/question"

function CreateAnswer() {
  const dispatch = useDispatch()
  const { questionId } = useParams()
  const user = useSelector(state => state.session.user)
  const [text, setText] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []


  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([])

    if (!text) errors.push("Answer field is required")

    if (errors.length) return setValidationErrors(errors)

      const payload = {
        answer: text,
        userId: user.id,
        questionId: Number(questionId)
      }

      let newAnswer = await dispatch(createAnswer(payload))
      await dispatch(getQuestions())
      setText('')
      return newAnswer
  }

  return (
    <div className='answer-question'>
      <div>
        Your Answer
      </div>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        <textarea
          className="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={user === null} id='answer-button'>Answer</button>
      </form>
    </div>
  )
}

export default CreateAnswer
