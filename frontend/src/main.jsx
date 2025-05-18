import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';

// Routes
import LandingPage from './pages/landingPage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import AdminPage from './pages/adminPage';

export const database = 'http://localhost:3000/';

const container = document.getElementById('root');

// Store the root globally so it's only created once
if (!container._root) {
	container._root = createRoot(container);
}

container._root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/signup' element={<SignupPage />} />
			<Route path='/admin' element={<AdminPage />} />
		</Routes>
	</BrowserRouter>
);
