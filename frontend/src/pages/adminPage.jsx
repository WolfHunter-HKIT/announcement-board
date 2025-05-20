import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerifyLogin from '../auth/VerifyLogin';
import '../styles/AdminPage.css';
import FetchUsers from '../components/snippets/FetchUsers';
import axios from 'axios';
import NavBar from '../components/NavBar';

const AdminPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [users, setUsers] = useState([]);
	const [editingUser, setEditingUser] = useState(null); // for modal
	const [editPayload, setEditPayload] = useState({}); // editable object

	useEffect(() => {
		const checkAdmin = async () => {
			try {
				const data = await VerifyLogin();
				if (data?.user?.isAdmin) {
					setIsAdmin(true);
					await fetchUsers();
				} else {
					navigate('/');
				}
			} catch (error) {
				console.error('Error verifying admin:', error);
				navigate('/login');
			} finally {
				setIsLoading(false);
			}
		};

		const fetchUsers = async () => {
			try {
				const res = await FetchUsers();
				setUsers(res);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		checkAdmin();
	}, [navigate]);

	const handleEdit = (userID) => {
		const user = users.find((u) => u.userID === userID);
		console.log(user);
		if (user) {
			setEditingUser(user);
			setEditPayload({ displayName: user.displayName, email: user.email }); // initial payload = current user data
		}
	};

	const handleEditSubmit = async () => {
		try {
			console.log(editPayload);
			await axios.put(`http://localhost:3000/users/${editingUser.userID}`, editPayload);
			setUsers((prev) => prev.map((u) => (u.userID === editingUser.userID ? { ...u, ...editPayload } : u)));
			closeModal();
		} catch (error) {
			console.error('Error updating user:', error);
		}
	};

	const closeModal = () => {
		setEditingUser(null);
		setEditPayload({});
	};

	const handleDelete = async (userId) => {
		if (!window.confirm('Are you sure you want to delete this user?')) return;

		try {
			await axios.delete(`http://localhost:3000/users/${userId}`);
			setUsers((prev) => prev.filter((user) => user.userID !== userId));
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (!isAdmin) return null;

	return (
		<div className='admin-page'>
			<h2>Admin Panel</h2>
			<table className='user-table'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>Email</th>
						<th>Admin</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.userID}>
							<td>{user.userID}</td>
							<td>{user.displayName}</td>
							<td>{user.email}</td>
							<td>{user.isAdmin ? 'Yes' : 'No'}</td>
							<td>
								{user.isAdmin ? (
									<span>Protected</span>
								) : (
									<>
										<button onClick={() => handleEdit(user.userID)}>Edit</button>
										<button onClick={() => handleDelete(user.userID)}>Delete</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Modal */}
			{editingUser && (
				<div className='modal'>
					<div className='modal-content'>
						<h3>Editing User: {editingUser.displayName}</h3>

						<label>
							Username:
							<input
								type='text'
								value={editPayload.displayName || ''}
								onChange={(e) =>
									setEditPayload((prev) => ({
										...prev,
										displayName: e.target.value,
									}))
								}
							/>
						</label>

						<label>
							Email:
							<input
								type='email'
								value={editPayload.email || ''}
								onChange={(e) =>
									setEditPayload((prev) => ({
										...prev,
										email: e.target.value,
									}))
								}
							/>
						</label>

						<div className='modal-actions'>
							<button onClick={handleEditSubmit}>Save</button>
							<button onClick={closeModal}>Cancel</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminPage;
