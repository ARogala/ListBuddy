import React from 'react';
import PropTypes from 'prop-types';

class InputListItem extends React.Component {
	render() {
		const inputItemText             = this.props.inputItemText;
		const handleInputItemTextChange = this.props.handleInputItemTextChange;
		const clearInputText            = this.props.clearInputText;
		const saveListItem              = this.props.saveListItem;
		return (
			<div className="input">
				<label htmlFor="item">Input a list item</label>
				<input
					type="text"
					className="input__item"
					id="item"
					placeholder="Enter a list item..."
					value={inputItemText}
					onChange={(e) => handleInputItemTextChange(e.target.value)}
					onKeyPress={(e) => {
						if(e.key === 'Enter') {
							saveListItem();
						}
					}}
				/>
				<div className="input__btnbox">
					<button
						onClick={() => saveListItem()}
					>
						Add Item
					</button>
					<button
						onClick={() => clearInputText()}
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}
}

export default InputListItem;

InputListItem.propTypes = {
  inputItemText: PropTypes.string.isRequired,
  handleInputItemTextChange: PropTypes.func.isRequired,
  clearInputText: PropTypes.func.isRequired,
  saveListItem: PropTypes.func.isRequired
}