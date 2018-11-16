import React from 'react';
import PropTypes from 'prop-types';

class ListItemForm extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			item: '',
			itemCategory: '--Please Select a Category--'
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
		this.props.saveTemplateListItem(this.state.item, this.state.itemCategory);
		this.resetForm();
	}

	resetForm() {
		this.setState({
			item: '',
			itemCategory: '--Please Select a Category--'
		});
	}

	render() {
		return (
			<form className="listForm" onSubmit={(e) => this.handleSubmit(e)}>
				<fieldset>
					<legend>Enter Item and Item Category</legend>
					<div>
						<label htmlFor="item">List Item:</label>
						<input
							type="text"
							id="item"
							name="list_item"
							required
							className="listForm__input"
							value={this.state.item}
							onChange={(e) => this.handleItemChange(e)}
						/>
					</div>
					<div>
						<label htmlFor="category">Item Category:</label>
						<select className="listForm__select" id="category" value={this.state.itemCategory} onChange={(e) => this.handleCategoryChange(e)}>
							<option value="--Please Select a Category--">--Please Select a Category--</option>
							<option value="Produce">Produce</option>
							<option value="Meat">Meat</option>
							<option value="Dairy">Dairy</option>
							<option value="Canned">Canned</option>
							<option value="Dry/Baking">Dry/Baking</option>
						</select>
					</div>

					<div className="listForm__btnContainer">
						<button
							type="submit"
							value="Submit"
							className="listForm__btn"
						>
							Add Item
						</button>
						<button
							type="button"
							value="Reset"
							className="listForm__btn"
							onClick={() => this.resetForm()}
						>
							Cancel
						</button>
					</div>
				</fieldset>
			</form>
		);
	}
}

export default ListItemForm;

ListItemForm.propTypes = {
  saveTemplateListItem: PropTypes.func.isRequired,

}