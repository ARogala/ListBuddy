import React from 'react';
import PropTypes from 'prop-types';

import groupBy from './groupBy.js';

class TemplateList extends React.Component {
	render() {
		const template = this.props.template;
		const listItems = this.props.templateListItems;
		console.log(listItems);
		let templateListItems = groupBy(listItems, 'template');
		let groupedListItems;
		for(let i in templateListItems) {
			if(i === template) {
				groupedListItems = groupBy(templateListItems[i], 'category');
			}
		}
		//console.log(groupedListItems);
		const allCategories = Object.keys(groupedListItems);
		//console.log(allCategories);

		/*
			for each category if the number of items is greater than 1
			build the DOM
		*/
		const multItemsInCat = [];
		for(let i = 0; i < allCategories.length; i++) {
			if(groupedListItems[allCategories[i]].length > 1) {
				console.log(groupedListItems[allCategories[i]]);
				multItemsInCat.push(
					<li key={i}>
						<span>{allCategories[i]}</span>
						<ul>
							{groupedListItems[allCategories[i]].map((item)=>{
								return(
									<li key={item.id}>{item.item}</li>
								);
							})}
						</ul>
					</li>
				);
			}
		}

		//build the DOM for the categories with one item
		const singleItemInCat = [];
		for(let i = 0; i < allCategories.length; i++) {
			if(groupedListItems[allCategories[i]].length === 1) {
				singleItemInCat.push(
					<li key={i}>
						<span>{allCategories[i]}</span>
						<ul>
							<li key={groupedListItems[allCategories[i]][0].id}>{groupedListItems[allCategories[i]][0].item}</li>
						</ul>
					</li>
				);
			}
		}

		return (
			<div>{template}
				<ul>
					{multItemsInCat}
					{singleItemInCat}
				</ul>
			</div>
		);
	}
}

export default TemplateList;

TemplateList.propTypes = {
  templateListItems: PropTypes.array.isRequired,
  template: PropTypes.string.isRequired

}