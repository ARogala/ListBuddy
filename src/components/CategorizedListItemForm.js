import React from 'react';
import PropTypes from 'prop-types';

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
		this.props.saveCategorizedListItem(this.state.item, this.state.itemCategory);
		this.resetForm();
	}

	resetForm() {
		this.setState({
			item: '',
			itemCategory: '--Please Select an Item Category--'
		});
	}

	render() {
		const template = this.props.template;
		let select;
		//console.log(template);
		if(template === 'Grocery') {
			select = (
				<div>
					<label htmlFor="category">Item Category:</label>
					<select className="categoriezedListForm__select" id="category" value={this.state.itemCategory} onChange={(e) => this.handleCategoryChange(e)}>
						<option value="--Please Select an Item Category--">--Please Select an Item Category--</option>
						<option value="Produce">Produce</option>
						<option value="Meat">Meat</option>
						<option value="Dairy">Dairy</option>
						<option value="Canned">Canned</option>
						<option value="Frozen">Frozen</option>
						<option value="Dry/Baking">Dry/Baking</option>
					</select>
				</div>
 			);
		}
		else if(template === 'Travel') {
			select = (
				<div>
					<label htmlFor="category">Item Category:</label>
					<select className="categoriezedListForm__select" id="category" value={this.state.itemCategory} onChange={(e) => this.handleCategoryChange(e)}>
						<option value="--Please Select an Item Category--">--Please Select an Item Category--</option>
						<option value="Clothes">Clothes</option>
						<option value="Medicine/First Aid">Medicine/First Aid</option>
						<option value="Technology">Technology</option>
						<option value="Miscellaneous">Miscellaneous</option>
						<option value="Camping/Hiking">Camping/Hiking</option>
						<option value="Toiletry">Toiletry</option>
						<option value="Food">Food</option>
					</select>
				</div>
			);
		}

		return (
			<form className="categorizedListForm" onSubmit={(e) => this.handleSubmit(e)}>
				<fieldset>
					<legend>Enter Item and Item Category</legend>
					<div>
						<label htmlFor="categorizedItem">List Item:</label>
						<input
							type="text"
							id="categorizedItem"
							name="categorizedList_item"
							required
							className="categorizedListForm__input"
							value={this.state.item}
							onChange={(e) => this.handleItemChange(e)}
						/>
					</div>

					{select}
					<div className="categorizedListForm__btnContainer">
						<button
							type="submit"
							value="Submit"
							className="categorizedListForm__btn"
						>
							Add Item
						</button>
						<button
							type="button"
							value="Reset"
							className="categorizedListForm__btn"
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

export default CategorizedListItemForm;

CategorizedListItemForm.propTypes = {
  saveCategorizedListItem: PropTypes.func.isRequired,
  template: PropTypes.string.isRequired
}