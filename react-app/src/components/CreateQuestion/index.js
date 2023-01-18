import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createQuestion } from "../../store/question"
import { useHistory } from "react-router"

function CreateQuestion() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const [text, setText] = useState("")
  const [title, setTitle] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = []

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={user === null}>Ask</button>
      </form>
    </div>
  )
}

export default CreateQuestion
