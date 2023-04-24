import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { $api } from '../../http/index';
import { setUser } from '../../redux/User/userActions';

import {
	RecommendationHeader,
	RecommendationContainer,
	RecommendationRow,
	RecommendationLink,
	RecommendationAvatar,
	RecommendationUsername,
	RecommendationBtn
} from './RecommendationsToFollow.style';

export const RecommendationsToFollow = ({ updateReels, setUpdateReels }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [recommendations, setRecommendations] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await $api.get('/profile/recommendation');

			setRecommendations(result.data);
		};

		fetchData();
	}, [updateReels]);

	const handleFollow = async (userId) => {
		try {
			await $api.post('/profile/following/add', {
				id: userId
			});
			const result = await $api.get('/auth');
			dispatch(setUser(result.data));
			
			setUpdateReels(!updateReels);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<RecommendationHeader>Рекомендації для вас</RecommendationHeader>
			<RecommendationContainer>
				{recommendations.map(({user, avatar, username}) => (
					<RecommendationRow key={user}>
						<RecommendationLink onClick={() => navigate(username)}>
							<RecommendationAvatar src={avatar}/>
							<RecommendationUsername>{username}</RecommendationUsername>
						</RecommendationLink>
						<RecommendationBtn onClick={() => handleFollow(user)}>Стежити</RecommendationBtn>
					</RecommendationRow>
				))}
			</RecommendationContainer>
		</>
	)
}
