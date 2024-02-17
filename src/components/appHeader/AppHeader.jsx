import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const onHandleStyle = ({ isActive }) => ({ color: isActive ? '#9f0013' : '' });

const AppHeader = () => {
   return (
      <header className="app__header">
         <h1 className="app__title">
            <Link to="/">
               <span>Marvel</span> information portal
            </Link>
         </h1>
         <nav className="app__menu">
            <ul>
               <NavLink to="/" style={onHandleStyle}>
                  Characters
               </NavLink>
               /
               <NavLink to="/comics" style={onHandleStyle}>
                  Comics
               </NavLink>
            </ul>
         </nav>
      </header>
   );
};

export default AppHeader;
