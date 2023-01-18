

const UPDATE = 'user/updateProfile'


const update = (user) => {
  return {
    type: UPDATE,
    user
  }
}


export const updateProfile = (data, userId) => async dispatch => {
  const response = await fetch(`/api/users/${Number(userId)}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const updatedProfile = await response.json()
  dispatch(update(updatedProfile))
  return updatedProfile
}


let initialState = {}

const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE: {
      const newState = { ...state }
      newState[action.user.id] = action.user
      return newState
    }
    default: return state
  }
}

export default user
