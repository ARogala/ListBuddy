import React from 'react';
import PropTypes from 'prop-types';

class ToDoListInput extends React.Component {
	render() {
		const toDoItem                  = this.props.toDoItem;
		const handleToDoItemTextChange  = this.props.handleToDoItemTextChange;
		const clearToDoInputText        = this.props.clearToDoInputText;
		const saveToDoListItem          = this.props.saveToDoListItem;
		return (
			<div className="toDoInput">
				<label htmlFor="toDoItem">Input a list item</label>
				<input
					type="text"
					className="toDoInput__item"
					id="toDoItem"
					placeholder="Enter a list item..."
					value={toDoItem}
					onChange={(e) => handleToDoItemTextChange(e.target.value)}
					onKeyPress={(e) => {
						if(e.key === 'Enter') {
							saveToDoListItem();
						}
					}}
				/>
				<div className="toDoInput__btnbox">
					<button
						onClick={() => saveToDoListItem()}
					>
						Add Item
					</button>
					<button
						onClick={() => clearToDoInputText()}
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}
}

export default ToDoListInput;

ToDoListInput.propTypes = {
  toDoItem: PropTypes.string.isRequired,
  handleToDoItemTextChange: PropTypes.func.isRequired,
  clearToDoInputText: PropTypes.func.isRequired,
  saveToDoListItem: PropTypes.func.isRequired
}