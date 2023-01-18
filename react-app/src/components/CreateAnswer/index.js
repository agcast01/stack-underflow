import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { createAnswer } from "../../store/answer"
import { getQuestions } from "../../store/question"

function CreateAnswer(){
  const dispatch = useDispatch()
  const {questionId} = useParams()
  const user = useSelector(state => state.session.user)

  const [text, setText] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();

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
   <div>
    <div>
      Your Answer
    </div>
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

export default CreateAnswer
