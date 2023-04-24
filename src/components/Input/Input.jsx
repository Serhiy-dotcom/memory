import PropTypes from 'prop-types';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	FilledInput,
	FormControl,
	IconButton,
	InputAdornment,
} from '@mui/material';

import { CustomInputLabel, CustomTextField } from './Input.style';

export const Input = ({ input, label, type, error }) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const setMUIColor = () => {
		if (!input.isDirty) return '';
		if (input.inputValid && !error) {
			return 'success';
		}
		return 'error';
	};

	const setCustomColor = () => {
		if (!input.isDirty) return '#2b2b2b';
		if ((input.isDirty && !input.inputValid) || error) return '#ff1744';
		if (input.isDirty && input.inputValid) return '#00a152';
		return '#3d5afe';
	};

	return (
		<>
			{type !== 'password' ? (
				<CustomTextField
					onBlur={input.onBlur}
					onChange={input.onChange}
					value={input.value}
					type={type}
					label={label}
					variant='filled'
					size='small'
					color={setMUIColor()}
					customcolor={setCustomColor()}
					fullWidth
				/>
			) : (
				<FormControl variant='filled' color={setMUIColor()} fullWidth>
					<CustomInputLabel
						htmlFor='filled-password'
						customcolor={setCustomColor()}
					>
						Password
					</CustomInputLabel>
					<FilledInput
						id='filled-password'
						type={showPassword ? 'text' : 'password'}
						value={input.value}
						onChange={input.onChange}
						onBlur={input.onBlur}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={handleClickShowPassword} edge='end'>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			)}
		</>
	);
};

Input.defaultProps = {
	type: 'text',
};

Input.propTypes = {
	input: PropTypes.shape({
		isDirty: PropTypes.bool.isRequired,
		inputValid: PropTypes.bool.isRequired,
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
	}).isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
};
