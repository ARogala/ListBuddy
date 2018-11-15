import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {

	render() {
		const listItems = this.props.listItems;
		const items = listItems.map((item,index) => {
			return(
				<li key={index} className="list__item">
					<input type="checkbox" id={`${item}${index}`}/>
					<label htmlFor={`${item}${index}`}>{item}</label>
				</li>
			);
		});
		//console.log(items);
		return (
			<ul className="list">
				{items}
			</ul>
		);
	}
}

export default List;

List.propTypes = {
  listItems: PropTypes.array.isRequired
}