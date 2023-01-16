import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { destroyQuestion, getQuestions } from '../../store/question'
import CreateAnswer from '../CreateAnswer'
import { destroyAnswer, addUpvote, addDownvote, removeDownvote, removeUpvote } from '../../store/answer'

function SingleQuestion(){
  const dispatch = useDispatch()
  const history = useHistory()
  const {questionId} = useParams()
  const questions = useSelector(state => state.questions)
  const user = useSelector(state => state.session.user)


  const question = questions[questionId]

  const handleDelete = async () => {
    await dispatch(destroyQuestion(questionId)).then(() => history.push('/questions'))
    
  }

  const upvoteCheck = async (answer) => {
    if(answer.userUpvotes.includes(user.id)) {
      await dispatch(removeUpvote(answer, user.id))
    } else {
      await dispatch(addUpvote(answer, user.id))
    }

    if(answer.userDownvotes.includes(user.id)) {
      await dispatch(removeDownvote(answer, user.id))
    }

    await dispatch(getQuestions())
  }

  const downvoteCheck = async (answer) => {
    if(answer.userDownvotes.includes(user.id)) {
      await dispatch(removeDownvote(answer, user.id))
    }
    else {
      await dispatch(addDownvote(answer, user.id))
    }

    if(answer.userUpvotes.includes(user.id)) {
      await dispatch(removeUpvote(answer, user.id))
    }

    await dispatch(getQuestions())
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
              <div>
              <button onClick={e => history.push(`/answers/${answer.id}`)}>Update</button>
              <button onClick={async e => {
                await dispatch(destroyAnswer(answer.id))
                await dispatch(getQuestions())
              }}>Delete</button>
              </div>
              <div>
                <button onClick={async e => upvoteCheck(answer)}>Upvote</button>
                <span>{answer.userUpvotes.length - answer.userDownvotes.length}</span>
                <button onClick={async e => downvoteCheck(answer)}>Downvote</button>
              </div>
            </li>
          )
        } )}
      </ul>
      <CreateAnswer/>
    </div>
  )
}

export default SingleQuestion
