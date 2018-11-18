import React from 'react';
import PropTypes from 'prop-types';

class ToDoList extends React.Component {
	render() {
		const toDoListItems = this.props.toDoListItems;
		const toDoItems = toDoListItems.map((item, index) => {
			return(
				<li key={index} className="toDoList__item">
					<input type="checkbox" id={`${item.toDoItem.trim().replace(/\s/g, '')}${index}`}/>
					<label htmlFor={`${item.toDoItem.trim().replace(/\s/g, '')}${index}`}>{item.toDoItem}</label>
				</li>
			);
		});
		//console.log(toDoItems);
		return (
			<div>
				<h3>To Do List</h3>
				<ul className="toDoList">
					{toDoItems}
				</ul>
			</div>
		);
	}
}

export default ToDoList;

ToDoList.propTypes = {
  toDoListItems: PropTypes.array.isRequired
}