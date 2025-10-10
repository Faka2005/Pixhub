import { Link } from "react-router-dom";
function Navbar(){
    return 
    (
        <nav>
            <ul>
                <li>
                    <Link to={'/login'}>Se connecter</Link>
                </li>
                <li>
                    <Link to={'/signup'}>S'inscrire</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;