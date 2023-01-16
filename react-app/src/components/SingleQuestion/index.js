import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { destroyQuestion, getQuestions } from '../../store/question'

function SingleQuestion(){
  const dispatch = useDispatch()
  const history = useHistory()
  const {questionId} = useParams()
  const questions = useSelector(state => state.questions)
  const user = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch])


  const question = questions[questionId]

  const handleDelete = async () => {
    await dispatch(destroyQuestion(questionId)).then(() => history.push('/questions'))
    
  }
  if (!question || !user) return null
  return (
    <div>
      <h2>
        {question.user.username}
      </h2>
      <h1>
        {question.title}
      </h1>
      <button onClick={e => history.push(`/questions/edit/${question.id}`)}>Edit Question</button>
      <button onClick={e => {handleDelete()}}>Delete</button>
      <p>{question.question}</p>
      <ul>
        {question.answers.map((answer) => {
          return (
            <li key={answer.id}>
              <h3>{answer.user.username}</h3>
              <h2>{answer.answer}</h2>
            </li>
          )
        } )}
      </ul>
    </div>
  )
}

export default SingleQuestion
