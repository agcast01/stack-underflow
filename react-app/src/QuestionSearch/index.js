import { useState } from "react"
import { useDispatch } from "react-redux"
import { getQuestions } from "../store/question"

function QuestionSearch() {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(getQuestions(filter))
    }
    return (
        <form onSubmit={e => handleSubmit(e)} className='search'>
            <span class="material-symbols-outlined">
                search
            </span>
            <input type='text' value={filter} onChange={e => setFilter(e.target.value)} placeholder='Search questions...'  id="search-box"/>
        </form>
    )
}

export default QuestionSearch