import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../../store/user"
import { useHistory, useParams } from "react-router"

const UpdateProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { userId } = useParams()

  const user = useSelector(state => state.session.user)

  const [location, setLocation] = useState(user.location || "")
  const [title, setTitle] = useState(user.title || "")
  const [about, setAbout] = useState(user.about_me || "")
  const [website, setWebsite] = useState(user.website_url || "")
  const [twitter, setTwitter] = useState(user.twitter_url || "")
  const [github, setGithub] = useState(user.github_url || "")
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = []

    if (location.length > 30) errors.push("Location field must be less than 30 characters")
    if (title.length > 30) errors.push("Title field must be less than 30 characters")
    if (about.length > 255) errors.push("About me field must be less than 255 characters")
    if (website.length > 50) errors.push("Website url field must be less than 50 characters")
    if (twitter.length > 50) errors.push("Twitter url field must be less than 50 characters")
    if (github.length > 50) errors.push("Github url field must be less than 50 characters")

    setValidationErrors(errors)
  }, [location, title, about, website, twitter, github])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      user.location = location
      user.title = title
      user.about_me = about
      user.website_url = website
      user.twitter_url = twitter
      user.github_url = github

      await dispatch(updateProfile(user, userId))
      history.push(`/users/${userId}`)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
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