import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CreateAnnouncement.css';
import axios from 'axios';

const CreateAnnouncement = () => {
	const [form, setForm] = useState({
		title: '',
		content: '',
		category: '',
	});
	const navigate = useNavigate();

	const categories = ['General', 'Maintenance', 'Event', 'Security'];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Submitting announcement:', form);
		axios.post('http://localhost:3000/announcements', form).then(() => {
			navigate('/');
		});
	};

	return (
		<div className='create-announcement-page'>
			<Link to='/' className='back-button'>
				← Back
			</Link>
			<h2>Create an Announcement</h2>
			<form className='announcement-form' onSubmit={handleSubmit}>
				<label>
					Title:
					<input type='text' name='title' value={form.title} onChange={handleChange} required />
				</label>

				<label>
					Content:
					<textarea name='content' value={form.content} onChange={handleChange} required />
				</label>

				<label>
					Category:
					<select name='category' value={form.category} onChange={handleChange} required>
						<option value='' disabled>
							Select a category
						</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</label>

				<button type='submit'>Post</button>
			</form>
		</div>
	);
};

export default CreateAnnouncement;
