import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getQuestions } from '../../store/question'

function AllQuestions(){
  const dispatch = useDispatch()
  const questions = useSelector(state => state.questions)
  console.log("questions!!!!!!!!!!", questions)

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch])

  return (
    <div>hello</div>
  )
}

export default AllQuestions
