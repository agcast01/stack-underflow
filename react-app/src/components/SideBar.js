import { NavLink } from "react-router-dom"

function SideBar({location, setLocation}) {
    console.log(location)
    return (
        <nav className="sidebar">
        <ul>
            <li className={location === '/' ? 'current' : ''}>
                <NavLink to='/'  onClick={e => setLocation('/')}>Home</NavLink>
            </li>
            <li>
                Public
                <ul>
                    <li className={location === '/questions' ? 'current' : ''}>
                        <NavLink to='/'  onClick={e => setLocation('/questions')}>Questions</NavLink>
                    </li>
                    <li className={location === '/users' ? 'current' : ''}>
                        <NavLink to='/users'  onClick={e => setLocation('/users')}>Users</NavLink>
                    </li>
                </ul>
            </li>
        </ul>
        </nav>
    )
}

export default SideBar