import React, { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import {	
	ImgTag,
	FollowerInfo,
	Profile,
	ProfileAvatar,
	ProfileText,
	Name,
	Link,
	Cansel,
	Row,
	CenteredText,
	LoadingIcon
} from './FollowingModal.style';

import { $api } from '../../http';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/User/userActions';

export const FollowingModal = ({ refreshData, modalControl }) => {
	const [following, setFollowing] = useState([]);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const result = await $api.get('/profile/following');
			setFollowing(result.data);
			setLoading(false);
		};

		fetchData();
	}, []);

	const handleUnfollow = async (id) => {
		try {
			await $api.post('/profile/following/remove', {
				id: id,
			});
			const result = await $api.get('/profile/following');
			setFollowing(result.data);
			const userInfo = await $api.get('/auth');
			dispatch(setUser(userInfo.data));
			refreshData();
		} catch (err) {
			console.log(err);
		}
	};

	const handleRedirect = (username) => {
		modalControl.handleCloseModal();
		navigate(`/${username}`);
	}

	return (
		<>
			<Row>
				Відстежуються
				<CloseIcon
					style={{
						position: 'absolute',
						top: '10px',
						right: '15px',
						cursor: 'pointer',
					}}
					onClick={() => modalControl.handleCloseModal()}
				></CloseIcon>
			</Row>

			<FollowerInfo>
				{loading ? (
					<LoadingIcon>
						<ColorRing
							visible={true}
							height="70"
							width="70"
							ariaLabel="blocks-loading"
							wrapperStyle={{}}
							wrapperClass="blocks-wrapper"
							colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
						/>
					</LoadingIcon>
				) : (
					!following.length ? (
						<CenteredText>Ви наразі нікого не відстежуєте.</CenteredText>
					) : (
						following.map((follow) => (
							<Profile>
								<ProfileAvatar onClick={() => handleRedirect(follow?.username)}>
									<ImgTag src={follow?.avatar} />
								</ProfileAvatar>
								<ProfileText onClick={() => handleRedirect(follow?.username)}>
									<Link
										style={{
											textDecoration: 'none',
											color: '#000',
										}}
									>
										<Name>{follow?.username}</Name>
									</Link>
									<Name style={{ color: '#8e8e8e' }}>{follow?.fullName}</Name>
								</ProfileText>
		
								<Cansel onClick={() => handleUnfollow(follow?.user)}>
									Не стежити
								</Cansel>
							</Profile>
						))
					)
				)}
			</FollowerInfo>
		</>
	);
};
