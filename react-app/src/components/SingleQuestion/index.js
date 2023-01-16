import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getQuestions } from '../../store/question'

function SingleQuestion(){
  const dispatch = useDispatch()
  const {questionId} = useParams()
  const questions = useSelector(state => state.questions)
  console.log("questions!!!!!!!!!!", questions)

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch])

  if (!questions) return null
  const question = questions[questionId]

  return (
    <div>
      <h2>
        {question.user.username}
      </h2>
      <h1>
        {question.question}
      </h1>
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
