import React from 'react';
import { Field, reduxForm } from 'redux-form';

import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const customStyle = makeStyles((theme) => ({
	search: { height: '100%', width: '100%', backgroundColor: '#fff', padding: '0 10px' },
	dropdown: { height: '100%', width: '100%', backgroundColor: '#fff' },
	checkbox: { textAlign: 'center', display: 'block', color: '#fff' },
	formControl: {
		margin: '0',
		width: '100%',
		height: '100%',
		'& select': {
			height: '100%',
			padding: '0px 32px 0 6px',
		},
	},
	buttonWrap: { textAlign: 'right' },
	button: { backgroundColor: '#fff' },
}));

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => {
	const classes = customStyle();
	return (
		<InputBase className={classes.search} label={label} placeholder={label} error={touched && invalid} {...input} {...custom} />
	);
};

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => {
	const classes = customStyle();
	return (
		<FormControl error={touched && error} className={classes.formControl}>
			<NativeSelect
				{...input}
				{...custom}
				className={classes.dropdown}
				inputProps={{
					name: 'age',
					id: 'age-native-simple',
				}}
			>
				{children}
			</NativeSelect>
		</FormControl>
	);
};

const GreenCheckbox = withStyles({
	root: {
		color: '#227587',
		'&$checked': {
			color: '#2D566A',
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

const renderCheckbox = ({ input, label }) => {
	const classes = customStyle();
	return (
		<div>
			<FormControlLabel
				className={classes.checkbox}
				control={<GreenCheckbox checked={input.value ? true : false} />}
				label={label}
				onChange={input.onChange}
			/>
		</div>
	);
};

const ListRocketsForm = (props) => {
	const { handleSubmit, handleFormSubmit, pristine, reset, submitting, change } = props;
	const mainClass = customStyle();

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={5}>
					<Field name="search" component={renderTextField} label="Search" />
				</Grid>
				<Grid item xs={4} sm={3}>
					<Field variant="filled" name="sortBy" component={renderSelectField} label="Favorite Color">
						<option value="" disabled>
							Sort By
						</option>
						<option value={'height_ASC'}>Height ASC</option>
						<option value={'height_DESC'}>Height DESC</option>
						<option value={'diameter_ASC'}>Diameter ASC</option>
						<option value={'diameter_DESC'}>Diameter DESC</option>
					</Field>
				</Grid>
				<Grid item xs={4} sm={2}>
					<Field name="active" component={renderCheckbox} label="Active" />
				</Grid>
				<Grid item xs={4} sm={2} className={mainClass.buttonWrap}>
					<Button
						type="button"
						className={mainClass.button}
						variant="contained"
						disabled={pristine || submitting}
						onClick={reset}
					>
						Reset
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default reduxForm({
	form: 'ListRocketsForm',
	onChange: (values, dispatch, props, previousValues) => {
		props.handleFormSubmit(values);
	},
	enableReinitialize: true,
})(ListRocketsForm);
