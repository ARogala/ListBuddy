import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	formControl: {
		margin: theme.spacing.unit,
		paddingRight: '20px',
		width: '100%'
	},
	button: {
		margin: theme.spacing.unit,
	},
	container: {
		textAlign: 'center'
	}
});


class ListTypeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			template: 'Choose a Template'
		};
	}

	handleTemplateChange(e) {
		this.setState({template: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.updateTemplate(this.state.template);
		this.resetForm();
	}

	resetForm() {
		this.setState({
			template: 'Choose a Template'
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<form onSubmit={(e) => this.handleSubmit(e)}>
				<fieldset>
					<legend>Select A List Template</legend>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="template">List Templates</InputLabel>
						<NativeSelect
							value={this.state.template}
							onChange={(e) => this.handleTemplateChange(e)}
							input={<Input name="template" id="template"/>}
						>
							<option value="Choose a Template" disabled>Choose a Template</option>
							<option value="To Do">To Do</option>
							<option value="Grocery">Grocery</option>
							<option value="Travel">Travel</option>
						</NativeSelect>
					</FormControl>
					<div className={classes.container}>
						<Button
							type="submit"
							value="Submit"
							className={classes.button}
							variant="contained"
							color="primary"
						>
							Use Template
						</Button>
						<Button
							type="button"
							value="Reset"
							className={classes.button}
							variant="contained"
							color="default"
							onClick={() => this.resetForm()}
						>
							Cancel
						</Button>
					</div>
				</fieldset>
			</form>
		);
	}
}

export default withStyles(styles)(ListTypeForm);

ListTypeForm.propTypes = {
  updateTemplate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired

}