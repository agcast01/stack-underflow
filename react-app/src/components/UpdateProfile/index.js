import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../../store/user"
import { useHistory, useParams } from "react-router"

const UpdateProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { userId } = useParams()

  const user = useSelector(state => state.session.user)

  const [location, setLocation] = useState(user.location)
  const [title, setTitle] = useState(user.title)
  const [about, setAbout] = useState(user.about_me)
  const [website, setWebsite] = useState(user.website_url)
  const [twitter, setTwitter] = useState(user.twitter_url)
  const [github, setGithub] = useState(user.github_url)

  const handleSubmit = async (e) => {
    e.preventDefault();
    user.location = location
    user.title = title
    user.about_me = about
    user.website_url = website
    user.twitter_url = twitter
    user.github_url = github

    await dispatch(updateProfile(user, userId))
    history.push(`/users/${userId}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label>Location</label>
          <input
            type='text'
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}

          />
        </div>
        <div>
          <label>About Me</label>
          <textarea
            value={about}
            onChange={e => setAbout(e.target.value)}

            className="textarea"
          />
        </div>
        <div>
          <label>Website Url</label>
          <input
            type='url'
            value={website}
            onChange={e => setWebsite(e.target.value)}

          />
        </div>
        <div>
          <label>Twitter Url</label>

          <input
            type='url'
            value={twitter}
            onChange={e => setTwitter(e.target.value)}

          />
        </div>
        <div>
          <label>Github Url</label>
        
        <input
          type='url'
          value={github}
          onChange={e => setGithub(e.target.value)}
        />
        </div>
        <button disabled={user === null}>Update Profile</button>
      </form>
    </div>
  )
}

export default UpdateProfile