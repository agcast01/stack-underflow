import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getQuestions } from '../../store/question'
import CreateQuestion from '../CreateQuestion'

function AllQuestions(){
  const dispatch = useDispatch()
  const history = useHistory()
  const questions = useSelector(state => state.questions)
  console.log("questions!!!!!!!!!!", questions)

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch])

  if (!questions) return null

  return (
    <div>
      <h1>All Questions</h1>
      <div>
      <button onClick = {e => history.push(`/questions/new`)}>Ask Question</button>
      </div>
      <ul>
        {Object.values(questions).map((question) => {
          return (
            <li key={question.id}>
              <Link to={`/questions/${question.id}`}>
              {question.question}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AllQuestions
