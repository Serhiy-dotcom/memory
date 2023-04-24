import { Button, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material/.';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/User/userActions';
import { userInfo } from '../../services';
import { API_URL } from '../../http'

import {
	ContentContainer,
	ContentWrapper,
	Form,
	FormWrapper,
	Line,
	MainBlock,
	PageWrapper,
	SwitchLoginBlock,
	Title,
	BlockWrapper,
} from './LogPage.style';

export const LogPage = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function submitForm(e) {
		e.preventDefault();

		const reg =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (reg.test(e.target.email.value) && e.target.password.value.length > 4) {
			setError('');
			axios({
				method: 'post',
				url: `${API_URL}/auth`,
				data: {
					email: e.target.email.value,
					password: e.target.password.value,
				},
			}).then(async (data) => {
				localStorage.setItem('x-auth-token', data.data.token);

				const userData = await userInfo();

				dispatch(setUser(userData.data));

				setTimeout(() => {
					navigate(`/${userData.data.username}`);
				}, 300);
			});
		} else {
			setError('error');
		}
	}

	return (
		<PageWrapper>
			<ContentWrapper>
				<ContentContainer>
					<MainBlock>
						<Title>Memory</Title>
						<FormWrapper>
							<Form onSubmit={(e) => submitForm(e)}>
								<BlockWrapper>
									<Line />
								</BlockWrapper>
								<BlockWrapper>
									<TextField
										label='Пошта'
										name='email'
										className={error ? 'error' : ''}
										variant='filled'
										size='small'
										fullWidth
									/>
								</BlockWrapper>
								<BlockWrapper>
									<TextField
										label='Пароль'
										variant='filled'
										name='password'
										size='small'
										className={error ? 'error' : ''}
										fullWidth
										type='text'
									/>
								</BlockWrapper>
								<BlockWrapper>
									<Button
										type='submit'
										variant='contained'
										fullWidth
										sx={{
											fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
											'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
											sans-serif`,
										}}
									>
										Вхід
									</Button>
								</BlockWrapper>
							</Form>
						</FormWrapper>
					</MainBlock>
					<SwitchLoginBlock>
						<p>
							Немає акаунту?
							<Link to='/registration'>Реєстрація</Link>
						</p>
					</SwitchLoginBlock>
				</ContentContainer>
			</ContentWrapper>
		</PageWrapper>
	);
};
