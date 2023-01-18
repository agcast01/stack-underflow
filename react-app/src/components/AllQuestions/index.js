import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getQuestions } from '../../store/question'
import CreateQuestion from '../CreateQuestion'
import './index.css'

function AllQuestions(){
  const dispatch = useDispatch()
  const history = useHistory()
  const questions = useSelector(state => state.questions)

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch])

  if (!questions) return null

  return (
    <div className='questions_container'>
      
      <div className='header'>
        <h1>All Questions</h1>
        <button onClick = {e => history.push(`/questions/new`)}>Ask Question</button>
      </div>
      <ul className='questions'>
        {Object.values(questions).map((question) => {
          return (
            <li key={question.id} className='question'>
              <span className='stats'>
                <p>{question.answers.length} answers</p>
              </span>
              <span className='information'>
              <Link to={`/questions/${question.id}`}>
              {question.title}
              </Link>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AllQuestions
