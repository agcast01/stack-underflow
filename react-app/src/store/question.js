

const LOAD = 'question/getQuestions'
const QUESTIONLOAD = 'question/getQuestion'
const CREATE = 'question/createQuestion'
const UPDATE = 'question/updateQuestion'
const DELETE = 'question/deleteQuestion'

const load = (questions) => {
  return {
    type: LOAD,
    questions
  }
}

const questionLoad = (question) => {
  return {
    type: QUESTIONLOAD,
    question
  }
}

const create = (question) => {
  return {
    type: CREATE,
    question
  }
}

const update = (question) => {
  return {
    type: UPDATE,
    question
  }
}

const destroy = (questionId) => {
  return {
    type: DELETE,
    questionId
  }
}

export const getQuestions = () => async dispatch => {
  const response = await fetch(`/api/questions/`)

  if (response.ok) {
    const questions = await response.json()
    dispatch(load(questions))
  }
}

export const getQuestion = (questionId) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}`)

  if (response.ok) {
    const question = await response.json()
    dispatch(questionLoad(question))
  }
}

export const destroyQuestion = (questionId) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}`, {
    method: 'delete'
  })
    if (response.ok){
      dispatch(destroy(questionId))
    }
}

export const createQuestion = (data) => async dispatch => {
  const response = await fetch(`/api/questions/new`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newQuestion = await response.json()
  dispatch(create(newQuestion))
  return newQuestion
}

export const updateQuestion = (data, questionId) => async dispatch => {
  const response = await fetch(`/api/questions/${Number(questionId)}`, {
  method: 'put',
  headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const updatedQuestion = await response.json()
  dispatch(update(updatedQuestion))
  return updatedQuestion
}


let initialState = {}

const questions = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const newState = {}
      let questionsArr = action.questions.questions
      questionsArr.forEach(question => {
        newState[question.id] = question
      })
      return newState
    }
    case CREATE: {
      const newState = {...state}
      newState[action.question.id] = action.question
      return newState
    }
    case UPDATE: {
      const newState = {...state}
      newState[action.question.id] = action.question
      return newState
    }
    case DELETE: {
      const newState = {...state}
      delete newState[action.questionId]
      return newState
    }
    default: return state
  }
}

export default questions
