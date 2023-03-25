import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
    <main className="App">
        <header className='NavBar'>
            <p className='Logo'>Liase & Direct</p>
            <Link to="/">Strona główna</Link>
            <Link to="/announcements">Ogłoszenia</Link>
            <Link to="/messenger">Wiadomości</Link>
            <Link to="/login">Logowanie</Link>
        </header>
        <Outlet />
    </main>
    );
};

export default Layout;