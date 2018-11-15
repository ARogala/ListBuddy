import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {

	render() {
		const listItems = this.props.listItems;
		const items = listItems.map((item,index) => {
			return(
				<li key={index}>{item}</li>
			);
		});
		console.log(items);
		return (
			<ul>
				{items}
			</ul>
		);
	}
}

export default List;

List.propTypes = {
  listItems: PropTypes.array.isRequired
}