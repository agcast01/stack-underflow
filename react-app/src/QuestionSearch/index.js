import { useState } from "react"
import { useDispatch } from "react-redux"
import { getQuestions } from "../store/question"

function QuestionSearch(){
    const dispatch = useDispatch()
    const [filter, setFilter] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(getQuestions(filter))
    }
    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type='text' value={filter} onChange={e => setFilter(e.target.value)}/>
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}

export default QuestionSearch