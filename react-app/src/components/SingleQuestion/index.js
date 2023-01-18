import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { destroyQuestion, getQuestions } from '../../store/question'
import CreateAnswer from '../CreateAnswer'
import { destroyAnswer, addUpvote, addDownvote, removeDownvote, removeUpvote } from '../../store/answer'
import './SingleQuestion.css'
function SingleQuestion() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { questionId } = useParams()
  const questions = useSelector(state => state.questions)
  const user = useSelector(state => state.session.user)


  const question = questions[questionId]
  const handleDelete = async () => {
    await dispatch(destroyQuestion(questionId)).then(() => history.push('/questions'))

  }

  const upvoteCheck = async (answer) => {
    if (user === null) return null
    if (answer.userUpvotes.includes(user.id)) {
      await dispatch(removeUpvote(answer, user.id))
    } else {
      await dispatch(addUpvote(answer, user.id))
    }

    if (answer.userDownvotes.includes(user.id)) {
      await dispatch(removeDownvote(answer, user.id))
    }

    await dispatch(getQuestions())
  }

  const downvoteCheck = async (answer) => {
    if (user === null) return null
    if (answer.userDownvotes.includes(user.id)) {
      await dispatch(removeDownvote(answer, user.id))
    }
    else {
      await dispatch(addDownvote(answer, user.id))
    }

    if (answer.userUpvotes.includes(user.id)) {
      await dispatch(removeUpvote(answer, user.id))
    }

    await dispatch(getQuestions())
  }

  function userAnswerCheck(answers) {

    if (!answers.length) return true
    let tempArr = [...answers];
    const answer = tempArr.shift();
    if (answer.user.id === user.id) return false
    return userAnswerCheck(tempArr)

  }

  if (!question) return null
  return (
    <div className="componentBody">
      <div id="question_answers">
        <h1 id='title'>
          {question.title}
        </h1>
        <p id="question">{question.question}</p>
        <div id="under_question">
          {user.id === question.user.id && (<div>
            <button className='user_buttons edit_button' onClick={e => history.push(`/questions/edit/${question.id}`)}>Edit</button>
          </div>)}
          {user.id === question.user.id && (<div>
            <button className='user_buttons delete_button' onClick={e => { handleDelete() }}>Delete</button>
          </div>)}
          <p className="username">
            asked by {question.user.username}
          </p>
        </div>
        <div id="answer_count">
          {question.answers.length === 1 ? <p>{question.answers.length} Answer </p> : <p>{question.answers.length} Answers</p>}
        </div>
        <div>
          <ul id="answers">
            {question.answers.map((answer) => {
              return (
                <div id='answer_body'>
                  {user.id && user.id !== answer.user.id && <div className="votes">
                    <span class="material-symbols-outlined" onClick={async e => upvoteCheck(answer)} >
                      arrow_drop_up
                    </span>
                    <span>{answer.userUpvotes.length - answer.userDownvotes.length}</span>
                    <span class="material-symbols-outlined" onClick={async e => downvoteCheck(answer)}>
                      arrow_drop_down
                    </span>
                  </div>}
                  <li key={answer.id}>
                    <p>{answer.answer}</p>
                    <div id="under_answer">
                      {user.id === answer.user.id && (<div>
                        <button className='user_buttons edit_button' onClick={e => history.push(`/answers/${answer.id}`)}>Edit</button>
                      </div>)}
                      {user.id === answer.user.id && (<div>
                        <button className='user_buttons delete_button' onClick={async e => {
                          await dispatch(destroyAnswer(answer.id))
                          await dispatch(getQuestions())
                        }}>Delete</button>
                      </div>)}
                      <p className='username'>{answer.user.username}</p>
                    </div>
                  </li>
                </div>
              )
            })}
          </ul>
        </div>
        {userAnswerCheck(question.answers) && user.id !== question.user.id && <CreateAnswer />}
      </div>
    </div>
  )
}

export default SingleQuestion
