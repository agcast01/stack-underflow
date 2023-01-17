import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import { getSpotThunk, updateSpotThunk } from '../../store/spots';

const UpdateProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { userId } = useParams()
  const user = useSelector(state => state.session.user)
  console.log('User details: ', user)

  const [location, setLocation] = useState(user.location)
  const [title, setTitle] = useState(user.title)
  const [aboutMe, setAboutMe] = useState(user.location)
  const [website, setWebsite] = useState(user.about_me)
  const [twitter, setTwitter] = useState(user.website_url)
  const [github, setGithub] = useState(user.github_url)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // answer.answer = text

    // let payload = answer
    // payload.userId = answer.user.id

    // let newAnswer = await dispatch(updateAnswer(payload, answer.id))
    // await dispatch(getQuestions())

    history.push(`/users/${userId}`)
    // return newAnswer

  }


}

export default UpdateProfile