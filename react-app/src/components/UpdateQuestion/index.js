import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateQuestion } from "../../store/question"
import { useHistory, useParams } from "react-router"

function UpdateQuestion(){
  const dispatch = useDispatch()
  const history = useHistory()
  const {questionId} = useParams()
 
  const user = useSelector(state => state.session.user)
  const questions = useSelector(state => state.questions)

  const question = questions[questionId]
  console.log(question)

  console.log("user", user)
  const [text, setText] = useState(question.question)
  const [title, setTitle] = useState(question.title)



  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = []
    question.question = text;
    question.title = title

    await dispatch(updateQuestion(question, questionId))
    history.push(`/questions/${questionId}`)
  }

  return (
   <div>
    <form onSubmit = {handleSubmit}>
      <input 
      type='text' 
      value={title}
      onChange={e => setTitle(e.target.value)}
      />
      <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      />
      <button disabled={user === null}>Update</button>
    </form>
   </div>
  )
}

export default UpdateQuestion