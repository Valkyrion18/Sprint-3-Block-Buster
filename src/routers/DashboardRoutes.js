import {
    Routes, Route,
    Navigate
} from 'react-router-dom';
import Favorites from '../components/Favorites';
import { Home } from '../components/Home';
import { NavBar} from '../components/NavBar';

export const DashboardRoutes = () => {
    return (
        <>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favs" element={<Favorites />} />
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </div>

        </>
    )
}
