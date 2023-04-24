import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/User/userActions';

import { registration, userInfo } from '../../services';
import { useInput } from '../../hooks';

import { Input } from '../../components/Input';

import {
	Main,
	PageWrapper,
} from '../../theme/GlobalComponents/GlobalComponents.style';
import {
	ContentContainer,
	ContentWrapper,
	Form,
	FormTitle,
	FormWrapper,
	Line,
	MainBlock,
	SwitchLoginBlock,
	Title,
	BlockWrapper,
	AgreementText,
} from './RegistrationPage.style';

export const RegistrationPage = () => {
	const [isValidForm, setValidForm] = useState(false);
	const [isExistEmail, setExistEmail] = useState(false);
	const [isExistUsername, setExistUsername] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();
	const email = useInput('', { isEmpty: true, isEmail: true });
	const fullName = useInput('', { isEmpty: true, minLength: 6, maxLength: 50 });
	const password = useInput('', {
		isEmpty: true,
		minLength: 6,
		maxLength: 100,
	});
	const username = useInput('', {
		isEmpty: true,
		isUsername: true,
		maxLength: 25,
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (
			email.inputValid &&
			fullName.inputValid &&
			password.inputValid &&
			username.inputValid
		) {
			setValidForm(true);
		} else {
			setValidForm(false);
		}
	}, [email, fullName, password, username]);

	const onSumitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await registration({
				email: email.value,
				password: password.value,
				fullName: fullName.value,
				username: username.value,
			});

			localStorage.setItem('x-auth-token', res.data.token);

			const userData = await userInfo();
			dispatch(setUser(userData.data));
			setTimeout(() => {
				navigate(`/${username.value}`);
			}, 300);
		} catch (e) {
			console.log(e);
			if (e.toJSON().status === 409) {
				const { field, errors } = e.response.data;

				setExistEmail(field === 'email' ? true : false);
				setExistUsername(field === 'username' ? true : false);
				setErrorMessage(errors);
			}
		}
	};

	return (
		<PageWrapper>
			<Main>
				<ContentWrapper>
					<ContentContainer>
						<MainBlock>
							<Title>Memory</Title>
							<FormWrapper>
								<Form onSubmit={onSumitHandler}>
									<FormTitle>
										Реєструйся щоб побачити фото та відео друзів.
									</FormTitle>
									<BlockWrapper>
										<Line />
									</BlockWrapper>
									{(isExistEmail || isExistUsername) && (
										<BlockWrapper color={'#ff1744'}>
											{errorMessage}
										</BlockWrapper>
									)}
									<BlockWrapper>
										<Input error={isExistEmail} label='Пошта' input={email} />
									</BlockWrapper>
									<BlockWrapper>
										<Input label="Повне ім'я" input={fullName} />
									</BlockWrapper>
									<BlockWrapper>
										<Input
											error={isExistUsername}
											label='Кличка'
											input={username}
										/>
									</BlockWrapper>
									<BlockWrapper>
										<Input label='Пароль' input={password} />
									</BlockWrapper>
									<BlockWrapper>
										<Button
											disabled={!isValidForm}
											type='submit'
											variant='contained'
											fullWidth
										>
											Реєстрація
										</Button>
									</BlockWrapper>
									<AgreementText>
										By signing up, you agree to our Terms, Date, Policy and
										Cookies Policy.
									</AgreementText>
								</Form>
							</FormWrapper>
						</MainBlock>
						<SwitchLoginBlock>
							<p>
								Уже зареєстровані?
								<Link to='/login'>Вхід</Link>
							</p>
						</SwitchLoginBlock>
					</ContentContainer>
				</ContentWrapper>
			</Main>
		</PageWrapper>
	);
};
