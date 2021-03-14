import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => (
    <nav>
        <div className="nav-wrapper purple darken-4 px1">
            <NavLink to='/' className="brand-logo">React + TypeScript</NavLink>
            <ul className="right hide-on-med-and-down">
                <li><NavLink to='/'>Список дел</NavLink></li>
                <li><NavLink to='/about'>Информация</NavLink></li>
            </ul>
        </div>
    </nav>
)