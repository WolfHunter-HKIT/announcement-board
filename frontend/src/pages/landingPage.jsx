import React, { useEffect, useState } from 'react';
import '../styles/landingPage.css';
import VerifyLogin from '../auth/VerifyLogin';
import NavBar from '../components/NavBar';
import FetchAll from '../components/snippets/FetchAll';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const userData = await VerifyLogin();
			setUser(userData?.user || null);

			const announcements = await FetchAll('announcements');
			setAnnouncements(announcements || []);
		};

		fetchData();
	}, []);

	const handleLike = (e) => {
		console.log(e);
	};

	return (
		<div id='app'>
			<NavBar />
			<div className='landing-container'>
				<div className='landing-header'>
					<h2>Announcements</h2>
					<Link to='/createAnnouncement' className='create-button'>
						+ Create Announcement
					</Link>
				</div>

				<ul className='announcement-list'>
					{announcements.map((a) => (
						<li key={a.announcementID} className='announcement-item'>
							<div className='announcement-info'>
								<span className='announcement-title'>{a.title}</span>
								<span className='announcement-category'>{a.category}</span>
							</div>
							<div className='announcement-actions'>
								<button className='like-button' onClick={handleLike}>
									❤️
								</button>
								{user?.isAdmin && <button className='delete-button'>🗑️</button>}
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default LandingPage;
