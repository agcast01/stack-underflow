import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { updateAnswer } from "../../store/answer"
import { getQuestions } from "../../store/question"

function UpdateAnswer(){
  const dispatch = useDispatch()
  const history = useHistory()
  const {answerId} = useParams()
  const user = useSelector(state => state.session.user)
  const answers = useSelector(state => state.answers)
  const answer = answers[answerId]
  const [text, setText] = useState(answer.answer)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(answer)
    answer.answer = text
    let payload = answer
    payload.userId = answer.user.id

    let newAnswer = await dispatch(updateAnswer(payload, answer.id))
    await dispatch(getQuestions())

    history.push(`/questions/${answer.questionId}`)
    return newAnswer

  }

  return (
   <div>
    <form onSubmit = {handleSubmit}>
      <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      />
      <button disabled={user === null}>Answer</button>
    </form>
   </div>
  )
}

export default UpdateAnswer