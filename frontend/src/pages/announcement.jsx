import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';
import '../styles/announcementPage.css';
import VerifyLogin from '../auth/VerifyLogin';
import GetCurrentDate from '../components/snippets/GetCurrentDate';

const AnnouncementPage = () => {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [announcement, setAnnouncement] = useState(null);
	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');
	const textareaRef = useRef(null);

	useEffect(() => {
		const fetchUser = async () => {
			const user = await VerifyLogin();
			setUser(user.user);
		};

		const fetchAnnouncement = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/announcements/${id}`);
				setAnnouncement(response.data);
			} catch (error) {
				console.error('Error fetching announcement:', error);
			} finally {
				setLoading(false);
			}
		};

		const fetchComments = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/comments/announcement/${id}`);
				const commentData = res.data || [];

				// Fetch usernames in parallel
				const enrichedComments = await Promise.all(
					commentData.map(async (comment) => {
						try {
							const userRes = await axios.get(`http://localhost:3000/users/${comment.userID}`);
							return {
								...comment,
								username: userRes.data.displayName || 'Unknown',
							};
						} catch {
							return { ...comment, username: 'Unknown' };
						}
					})
				);

				setComments(enrichedComments);
			} catch (error) {
				console.error('Error fetching comments:', error);
			}
		};

		fetchUser();
		fetchAnnouncement();
		fetchComments();
	}, [id]);

	const handleInput = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (!newComment.trim()) return;
		const date = GetCurrentDate();

		console.log(data);

		try {
			const res = await axios.post(`http://localhost:3000/comments/`, {
				userID: user.userID,
				announcementID: id,
				content: newComment,
				date: date,
			});
			setComments((prev) => [...prev, res.data]);
			setNewComment('');
		} catch (error) {
			console.error('Error posting comment:', error);
		}
	};

	const handleDeleteComment = async (commentID) => {
		if (!window.confirm('Are you sure you want to delete this comment?')) return;
		try {
			await axios.delete(`http://localhost:3000/comments/${commentID}`);
			setComments((prev) => prev.filter((c) => c.commentID !== commentID));
		} catch (error) {
			console.error('Error deleting comment:', error);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (!announcement) return <div>Announcement not found.</div>;

	return (
		<div className='announcement-page'>
			<NavBar />
			<div className='announcement-container'>
				<h2 className='announcement-title'>{announcement.title}</h2>
				<span className='announcement-category'>{announcement.category}</span>
				<p className='announcement-content'>{announcement.content}</p>

				<div className='comments-section'>
					<h3>Comments</h3>
					<ul className='comment-list'>
						{comments.map((c) => (
							<li key={c.commentID} className='comment-item'>
								<div className='comment-header'>
									<span className='comment-author'>Posted by: {c.username}</span>
									{user?.isAdmin && (
										<button className='delete-comment-button' onClick={() => handleDeleteComment(c.commentID)}>
											🗑️
										</button>
									)}
								</div>
								<p>{c.content}</p>
							</li>
						))}
					</ul>

					{user ? (
						<form onSubmit={handleCommentSubmit} className='comment-form'>
							<textarea ref={textareaRef} value={newComment} onChange={(e) => setNewComment(e.target.value)} onInput={handleInput} placeholder='Write a comment...' rows={1} />
							<button type='submit'>Post Comment</button>
						</form>
					) : (
						<p className='login-prompt'>You must be logged in to post a comment.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default AnnouncementPage;
