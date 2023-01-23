import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Link } from 'react-router-dom'
import { destroyQuestion, getQuestions } from '../../store/question'
import { destroyAnswer } from '../../store/answer'
import * as questions from '../../store/question'
import * as answers from '../../store/answer'
import CreateAnswer from '../CreateAnswer'
import './SingleQuestion.css'
function SingleQuestion() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { questionId } = useParams()
  const questionList = useSelector(state => state.questions)
  const user = useSelector(state => state.session.user)


  const question = questionList[questionId]
  console.log(question)
  const handleDelete = async () => {
    await dispatch(destroyQuestion(questionId)).then(() => history.push('/'))

  }

  const upvoteCheck = async (object, method) => {
    if (user === null) return null
    if (user.id === object.user.id) return null
    if (object.userUpvotes.includes(user.id)) {
      await dispatch(method.removeUpvote(object, user.id))
    } else {
      await dispatch(method.addUpvote(object, user.id))
    }

    if (object.userDownvotes.includes(user.id)) {
      await dispatch(method.removeDownvote(object, user.id))
    }

    await dispatch(getQuestions())
  }

  const downvoteCheck = async (object, method) => {
    if (user === null) return null
    if (user.id === object.user.id) return null
    if (object.userDownvotes.includes(user.id)) {
      await dispatch(method.removeDownvote(object, user.id))
    }
    else {
      await dispatch(method.addDownvote(object, user.id))
    }

    if (object.userUpvotes.includes(user.id)) {
      await dispatch(method.removeUpvote(object, user.id))
    }

    await dispatch(getQuestions())
  }

  function userAnswerCheck(answers) {

    if (!answers.length) return true
    let tempArr = [...answers];
    const answer = tempArr.shift();
    if (user !== null && answer.user.id === user.id) return false
    return userAnswerCheck(tempArr)

  }
  if (!question) return null

  return (
    <div className="componentBody">
      <div id="question_answers">
        <h1 id='title'>
          {question.title}
        </h1>
        <div style={{'display': 'flex'}}>
        <div className="votes">
                    <span class="material-symbols-outlined" id={user !== null && user.id !== question.user.id ? "not_owned" : "owned"} onClick={async e => upvoteCheck(question, questions)} >
                      arrow_drop_up
                    </span>
                    <span>{question.userUpvotes.length - question.userDownvotes.length}</span>
                    <span class="material-symbols-outlined" id={user !== null && user.id !== question.user.id ? "not_owned" : "owned"} onClick={async e => downvoteCheck(question, questions)}>
                      arrow_drop_down
                    </span>
                  </div>
        <p id="question">{question.question}</p>
        </div>
        <div id="under_question">
          {user !== null && user.id === question.user.id && (<div>
            <button className='user_buttons edit_button' onClick={e => history.push(`/questions/edit/${question.id}`)}>Edit</button>
          </div>)}
          {user !== null && user.id === question.user.id && (<div>
            <button className='user_buttons delete_button' onClick={e => { handleDelete() }}>Delete</button>
          </div>)}
          <p className="username">
            asked by <Link to={`/users/${question.user.id}`}>{question.user.username}</Link>
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
                  <div className="votes">
                    <span class="material-symbols-outlined" id={user !== null && user.id !== answer.user.id ? "not_owned" : "owned"} onClick={async e => upvoteCheck(answer, answers)} >
                      arrow_drop_up
                    </span>
                    <span>{answer.userUpvotes.length - answer.userDownvotes.length}</span>
                    <span class="material-symbols-outlined" id={user !== null && user.id !== answer.user.id ? "not_owned" : "owned"} onClick={async e => downvoteCheck(answer, answers)}>
                      arrow_drop_down
                    </span>
                  </div>
                  <li key={answer.id}>
                    <p>{answer.answer}</p>
                    <div id="under_answer">
                      {user !== null && user.id === answer.user.id && (<div>
                        <button className='user_buttons edit_button' onClick={e => history.push(`/answers/${answer.id}`)}>Edit</button>
                      </div>)}
                      {user !== null && user.id === answer.user.id && (<div>
                        <button className='user_buttons delete_button' onClick={async e => {
                          await dispatch(destroyAnswer(answer.id))
                          await dispatch(getQuestions())
                        }}>Delete</button>
                      </div>)}
                      <p className='username'><Link to={`/users/${answer.user.id}`}>{answer.user.username}</Link></p>
                    </div>
                  </li>
                </div>
              )
            })}
          </ul>
        </div>
        {userAnswerCheck(question.answers) && user !== null && user.id !== question.user.id && <CreateAnswer />}
      </div>
    </div>
  )
}

export default SingleQuestion
