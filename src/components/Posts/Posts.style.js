import styled from 'styled-components';
import { color5, color2 } from '../../theme/colors';

export const PostsWrapper = styled.div`
	@media (max-width: 735px) {
		border-top: ${color5};
	}
`;

export const PostsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 30px;
	grid-auto-rows: 1fr;

	img {
		max-width: 100%;
		height: 100%;
		object-fit: cover;
	}

	video {
		max-height: 230px;
		margin: 0 auto;
		max-width: 100%;

		@media (max-width: 768px) {
			max-height: 170px;
		}
	}

	@media (max-width: 426px) {
		gap: 5px;
	}
`;

export const PostLinks = styled.div`
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
	opacity: 0;
	transition: 0.2s;
	color: ${color2};
	display: flex;
	z-index: 2;

	span {
		display: flex;
		align-items: center;

		&:first-child {
			margin-right: 30px;
		}

		svg {
			margin-right: 10px;
		}
	}
`;

export const PostItem = styled.div`
	position: relative;
	cursor: pointer;
	background: #000;
	display: flex;
	max-height: 250px;
	max-width: 270px;
    justify-content: center;

	&:before {
		content: '';
		transition: 0.3s;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0);
	}

	&:hover {
		&:before {
			opacity: 1;
			background-color: rgba(0, 0, 0, 0.5);
		}
		${PostLinks} {
			opacity: 1;
		}
	}
`;
