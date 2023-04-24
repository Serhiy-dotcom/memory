import { useState } from 'react';
import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';
import { Button } from '@mui/material';

import { Row, TitleRow, LoadingIcon } from './AvatarModal.style';

import axios from 'axios';
import { $api, API_URL } from '../../http';
import {
	useNavigate,
	useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAvatar } from '../../redux/User/userActions';

export const AvatarModal = ({ modalControl }) => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const handleChangeAvatar = (file) => {
		setLoading(true);

		axios({
			method: 'post',
			url: `${API_URL}/shared/host/png`,
			data: file,
			headers: {
				'x-auth-token': localStorage.getItem('x-auth-token'),
			},
		})
			.then(async (result) => {
				await $api.post('/profile/avatar', {
					avatar: result.data,
				});

				setTimeout(() => {
					console.log(result.data);
					dispatch(setAvatar(result.data));

					modalControl.handleCloseModal();
					navigate(location.pathname);
				}, 300);
			})
			.catch((err) => console.log(err));
	};

	const removeAvatar = async () => {
		setLoading(true);

		await $api.post('/profile/avatar', {
			avatar:
				'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1',
		});

		setTimeout(() => {
			dispatch(
				setAvatar(
					'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'
				)
			);

			modalControl.handleCloseModal();
			navigate(location.pathname);
		}, 300);
	};

	return (
		<>
			{loading && (
				<LoadingIcon>
					<ColorRing
						visible={true}
						height="80"
						width="80"
						ariaLabel="blocks-loading"
						wrapperStyle={{}}
						wrapperClass="blocks-wrapper"
						colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
					/>
				</LoadingIcon>
			)}
			<TitleRow>
				<h3>Змінити фото</h3>
			</TitleRow>
			<Row>
				<Button variant='text' component='label' fullWidth>
					Завантажити світлину
					<input
						onChange={(e) =>
							handleChangeAvatar(Object(e.currentTarget.files)[0])
						}
						type='file'
						accept='.jpg, .jpeg, .png'
						hidden
					/>
				</Button>
			</Row>
			<Row>
				<Button
					variant='text'
					color='error'
					fullWidth
					onClick={() => removeAvatar()}
				>
					Видалити поточну світлину
				</Button>
			</Row>
			<Row>
				<Button
					onClick={modalControl.handleCloseModal}
					variant='text'
					fullWidth
					color='inherit'
				>
					Скасувати
				</Button>
			</Row>
		</>
	);
};

AvatarModal.propTypes = {
	modalControl: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		handleCloseModal: PropTypes.func.isRequired,
	}).isRequired,
};
