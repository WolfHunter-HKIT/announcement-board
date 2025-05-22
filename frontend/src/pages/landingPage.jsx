import React, { useEffect, useState } from 'react';
import '../styles/landingPage.css';
import VerifyLogin from '../auth/VerifyLogin';
import NavBar from '../components/NavBar';
import FetchAll from '../components/snippets/FetchAll';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [user, setUser] = useState(null);
	const [likes, setLikes] = useState([]);
	const [likeCounts, setLikeCounts] = useState({});
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [sortByLikes, setSortByLikes] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const userData = await VerifyLogin();
			setUser(userData?.user || null);

			const fetchedAnnouncements = await FetchAll('announcements');
			setAnnouncements(fetchedAnnouncements || []);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchLikes = async () => {
			try {
				const res = await axios.get('http://localhost:3000/likes');
				const allLikes = res.data || [];

				// Count likes per announcement
				const counts = {};
				allLikes.forEach((like) => {
					counts[like.announcementID] = (counts[like.announcementID] || 0) + 1;
				});
				setLikeCounts(counts);

				// User's own likes
				if (user?.userID) {
					const userLikes = allLikes.filter((like) => like.userID === user.userID);
					setLikes(userLikes);
				}
			} catch (error) {
				console.error('Error fetching likes:', error);
			}
		};

		fetchLikes();
	}, [user]);

	const handleLike = async (announcementID) => {
		if (!user) return alert('You must be logged in to like announcements.');

		const existingLike = likes.find((like) => like.userID === user.userID && like.announcementID === announcementID);

		try {
			if (existingLike) {
				await axios.delete(`http://localhost:3000/likes/${existingLike.likeID}`);
				setLikes(likes.filter((like) => like.likeID !== existingLike.likeID));
				setLikeCounts((prev) => ({
					...prev,
					[announcementID]: Math.max((prev[announcementID] || 1) - 1, 0),
				}));
			} else {
				await axios.post(`http://localhost:3000/likes`, {
					userID: user.userID,
					announcementID,
				});
				const updatedLikes = await axios.get(`http://localhost:3000/likes/${user.userID}`);
				setLikes(updatedLikes.data || []);
				setLikeCounts((prev) => ({
					...prev,
					[announcementID]: (prev[announcementID] || 0) + 1,
				}));
			}
		} catch (error) {
			console.error('Error handling like:', error);
		}
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
	};

	const filteredAnnouncements = announcements.filter((a) => {
		const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
		const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
		if (!sortByLikes) return 0;
		return (likeCounts[b.announcementID] || 0) - (likeCounts[a.announcementID] || 0);
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

				<div className='filters sort-controls'>
					<input type='text' className='search-bar sort-select' placeholder='Search by title...' value={searchQuery} onChange={handleSearchChange} />

					<select className='category-dropdown sort-select' value={selectedCategory} onChange={handleCategoryChange}>
						<option value='All'>All Categories</option>
						<option value='General'>General</option>
						<option value='Maintenance'>Maintenance</option>
						<option value='Event'>Event</option>
						<option value='Security'>Security</option>
					</select>

					<button onClick={() => setSortByLikes(!sortByLikes)} className={`sort-button ${sortByLikes ? 'active' : ''}`}>
						Sort by Likes
					</button>
				</div>

				<ul className='announcement-list'>
					{filteredAnnouncements.map((a) => {
						const isLiked = likes.some((like) => like.userID === user?.userID && like.announcementID === a.announcementID);
						return (
							<li key={a.announcementID} className='announcement-item'>
								<div className='announcement-info'>
									<Link to={`/announcement/${a.announcementID}`} className='announcement-title'>
										{a.title}
									</Link>
									<span className='announcement-category'>{a.category}</span>
								</div>
								<div className='announcement-actions'>
									<button className='like-button' onClick={() => handleLike(a.announcementID)}>
										{likes.some((like) => like.announcementID === a.announcementID && like.userID === user?.userID) ? '❤️' : '🖤'}
									</button>
									<span className='like-count'>{likeCounts[a.announcementID] || 0}</span>

									{user?.isAdmin && <button className='delete-button'>🗑️</button>}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default LandingPage;
