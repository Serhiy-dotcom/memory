import styled from 'styled-components';

export const RecommendationHeader = styled.h3`
	font-weight: 600;
	font-size: 14px;
	line-height: 18px;
	color: #8e8e8e;
	margin-top: 15px;
`;

export const RecommendationContainer = styled.div``;

export const RecommendationRow = styled.div`
	display: flex;
	align-items: center;
	margin-top: 15px;
`;

export const RecommendationLink = styled.a`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #000;
	cursor: pointer;
`;

export const RecommendationAvatar = styled.img`
	height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
`;

export const RecommendationUsername = styled.span``;

export const RecommendationBtn = styled.a`
	cursor: pointer;
    color: #0095f6;
    margin-left: auto;
	font-size: 14px;
`;