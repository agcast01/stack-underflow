const LOAD = 'answer/getAnswers'
const CREATE = 'answer/createAnswer'
const UPDATE = 'answer/updateAnswer'
const DELETE = 'answer/deleteAnswer'

const load = answers => {
    return {
        type: LOAD,
        answers
    }
}

const create = answer => {
    return {
        type: CREATE,
        answer
    }
}

const update = answer => {
    return {
        type: UPDATE,
        answer
    }
}

const destroy = (answerId) => {
    return {
        type: DELETE,
        answerId
    }
}

export const getAnswers = () => async dispatch => {
    const response = await fetch('/api/answers/')

    if (response.ok) {
        const answers = await response.json()
        dispatch(load(answers))
    }
}

export const destroyAnswer = (answerId) => async dispatch => {
    const response = await fetch(`/api/answers/${answerId}`, {
        method: 'delete'
    })

    if (response.ok){
        dispatch(destroy(answerId))
    }
}

export const createAnswer = (data) => async dispatch => {
    console.log('Data: ', data)
    const response = await fetch(`/api/answers/new`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

    const newAnswer = await response.json()

    dispatch(create(newAnswer))
    return newAnswer
}

export const updateAnswer = (data, answerId) => async dispatch => {
    const response = await fetch(`/api/answers/${Number(answerId)}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    const updatedAnswer = await response.json()

    dispatch(update(updatedAnswer))
    return updatedAnswer
}

let initialState = {}

const answers = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {}
            let answersArr = action.answers.answers
            answersArr.forEach(answer => newState[answer.id] = answer)
            return newState
        }
        case CREATE: {
            const newState={...state}
            newState[action.answer.id] = action.answer
            return newState
        }
        case UPDATE: {
            const newState={...state}
            newState[action.answer.id] = action.answer
            return newState
        }
        case DELETE: {
            const newState = {...state}
            delete newState[action.answerId]
            return newState
        }
        default: return state
    }
}

export default answers