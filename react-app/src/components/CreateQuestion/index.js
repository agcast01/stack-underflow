import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createQuestion } from "../../store/question"
import { useHistory } from "react-router"

function CreateQuestion(){
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
    <form onSubmit = {handleSubmit} className='form'>
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
