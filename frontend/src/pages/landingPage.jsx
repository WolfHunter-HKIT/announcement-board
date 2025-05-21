import React, { useEffect, useState } from 'react';
import '../styles/landingPage.css';
import VerifyLogin from '../auth/VerifyLogin';
import NavBar from '../components/NavBar';
import FetchAll from '../components/snippets/FetchAll';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [user, setUser] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	useEffect(() => {
		const fetchData = async () => {
			const userData = await VerifyLogin();
			setUser(userData?.user || null);

			const fetchedAnnouncements = await FetchAll('announcements');
			setAnnouncements(fetchedAnnouncements || []);
		};

		fetchData();
	}, []);

	const handleLike = (announcement) => {
		console.log(user.userID, announcement);
	};

	// Handle search input
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Handle category change
	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
	};

	// Filter announcements based on category and search query
	const filteredAnnouncements = announcements.filter((announcement) => {
		const matchesCategory = selectedCategory === 'All' || announcement.category === selectedCategory;
		const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

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

				<div className='filters'>
					<input type='text' className='search-bar' placeholder='Search by title...' value={searchQuery} onChange={handleSearchChange} />

					<select className='category-dropdown' value={selectedCategory} onChange={handleCategoryChange}>
						<option value='All'>All Categories</option>
						<option value='General'>General</option>
						<option value='Maintenance'>Maintenance</option>
						<option value='Event'>Event</option>
						<option value='Security'>Security</option>
					</select>
				</div>

				<ul className='announcement-list'>
					{filteredAnnouncements.map((a) => (
						<li key={a.announcementID} className='announcement-item'>
							<div className='announcement-info'>
								<Link to={`/announcement/${a.announcementID}`} className='announcement-title'>
									{a.title}
								</Link>
								<span className='announcement-category'>{a.category}</span>
							</div>
							<div className='announcement-actions'>
								<button className='like-button' onClick={() => handleLike(a.announcementID)}>
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
