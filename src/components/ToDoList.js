import React from 'react';
import PropTypes from 'prop-types';

class ToDoList extends React.Component {
	constructor(props) {
	    super(props);
	    this.toDoList = React.createRef();
  	}

	render() {
		const toDoListItems        = this.props.toDoListItems;
		const saveToDoListProgress = this.props.saveToDoListProgress;
		const deleteToDoList       = this.props.deleteToDoList;

		const toDoItems = toDoListItems.map((item, index) => {
			return(
				<li key={index} className="toDoList__item" >
					<input type="checkbox" defaultChecked={item.checked} id={`${item.toDoItem.trim().replace(/\s/g, '')}${index}`}/>
					<label htmlFor={`${item.toDoItem.trim().replace(/\s/g, '')}${index}`}>{item.toDoItem}</label>
				</li>
			);
		});
		//console.log(toDoItems);
		return (
			<div>
				<h3>To Do List</h3>
				<ul className="toDoList" ref={this.toDoList}>
					{toDoItems}
				</ul>
				<button onClick={() => saveToDoListProgress(this.toDoList.current.childNodes)}>Save Progress</button>
				<button onClick={() => deleteToDoList()}>Trash List</button>
			</div>
		);
	}
}

export default ToDoList;

ToDoList.propTypes = {
  toDoListItems: PropTypes.array.isRequired,
  saveToDoListProgress: PropTypes.func.isRequired,
  deleteToDoList: PropTypes.func.isRequired
}