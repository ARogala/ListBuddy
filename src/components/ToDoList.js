import React from 'react';
import PropTypes from 'prop-types';

class ToDoList extends React.Component {
	render() {
		const toDoListItems = this.props.toDoListItems;
		const items = toDoListItems.map((item,index) => {
			return(
				<li key={index} className="list__item">
					<input type="checkbox" id={`${item}${index}`}/>
					<label htmlFor={`${item}${index}`}>{item}</label>
				</li>
			);
		});
		//console.log(items);
		return (
			<div>
				<h3>To Do List</h3>
				<ul className="list">
					{items}
				</ul>
			</div>
		);
	}
}

export default ToDoList;

ToDoList.propTypes = {
  toDoListItems: PropTypes.array.isRequired
}