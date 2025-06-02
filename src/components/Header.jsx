import SearchForm from './SearchForm';
import {Link} from 'react-router-dom'

const Header = () => {

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link to={'/'} className='navbar-brand'>Meetup</Link>
                    <SearchForm />
                </div>
            </nav>
        </>
    )
}
export default Header;