import React from 'react';

class InputListItem extends React.Component {
	render() {
		return (
			<div>
				<label htmlFor="item">Input a list item</label>
				<input id="item" type="text"/>
			</div>

		);
	}
}

export default InputListItem;