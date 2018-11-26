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

class CategorizedListItemForm extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			item: '',
			itemCategory: '--Please Select an Item Category--'
		};
	}

	handleItemChange(e) {
		this.setState({item: e.target.value});
	}

	handleCategoryChange(e) {
		this.setState({itemCategory: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		if(this.state.itemCategory === '--Please Select an Item Category--') {
			alert('Pleae Select and Item Category');
		}
		else {
			this.props.saveCategorizedListItem(this.state.item, this.state.itemCategory);
			this.resetForm();
		}
	}

	resetForm() {
		this.setState({
			item: '',
			itemCategory: '--Please Select an Item Category--'
		});
	}

	render() {
		const { classes } = this.props;
		const template = this.props.template;
		let select;
		//console.log(template);
		if(template === 'Grocery') {
			select = (
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="category">Item Category</InputLabel>
					<NativeSelect
						value={this.state.itemCategory}
						onChange={(e) => this.handleCategoryChange(e)}
						input={<Input name="category" id="category"/>}
					>
						<option value="--Please Select an Item Category--" disabled>--Please Select an Item Category--</option>
						<option value="Produce">Produce</option>
						<option value="Meat">Meat</option>
						<option value="Dairy">Dairy</option>
						<option value="Canned">Canned</option>
						<option value="Frozen">Frozen</option>
						<option value="Dry/Baking">Dry/Baking</option>
					</NativeSelect>
				</FormControl>
 			);
		}
		else if(template === 'Travel') {
			select = (
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="category">Item Category</InputLabel>
					<NativeSelect
						value={this.state.itemCategory}
						onChange={(e) => this.handleCategoryChange(e)}
						input={<Input name="category" id="category"/>}
					>
						<option value="--Please Select an Item Category--" disabled>--Please Select an Item Category--</option>
						<option value="Clothes">Clothes</option>
						<option value="Medicine/First Aid">Medicine/First Aid</option>
						<option value="Technology">Technology</option>
						<option value="Miscellaneous">Miscellaneous</option>
						<option value="Camping/Hiking">Camping/Hiking</option>
						<option value="Toiletry">Toiletry</option>
						<option value="Food">Food</option>
					</NativeSelect>
				</FormControl>
			);
		}

		return (
			<form onSubmit={(e) => this.handleSubmit(e)}>
				<fieldset>
					<legend>Enter Item and Item Category</legend>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="categorizedItem">List Item</InputLabel>
						<Input
							type="text"
							id="categorizedItem"
							name="categorizedItem"
							required
							value={this.state.item}
							onChange={(e) => this.handleItemChange(e)}
						/>
					</FormControl>
					{select}
					<div className={classes.container}>
						<Button
							type="submit"
							value="Submit"
							className={classes.button}
							variant="contained"
							color="primary"
						>
							Add Item
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

export default withStyles(styles)(CategorizedListItemForm);

CategorizedListItemForm.propTypes = {
  saveCategorizedListItem: PropTypes.func.isRequired,
  template: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}