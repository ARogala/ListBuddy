import React from 'react';
import PropTypes from 'prop-types';

class InputListItem extends React.Component {
	render() {
		const inputItemText             = this.props.inputItemText;
		const handleInputItemTextChange = this.props.handleInputItemTextChange;
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
				/>
			</div>

		);
	}
}

export default InputListItem;

InputListItem.propTypes = {
  inputItemText: PropTypes.string.isRequired,
  handleInputItemTextChange: PropTypes.func.isRequired
}