import React from 'react';
import PropTypes from 'prop-types';

import groupBy from './groupBy.js';

class CategorizedList extends React.Component {
	render() {
		const template = this.props.template;
		const listItems = this.props.categorizedListItems;
		let categorizedListItems = groupBy(listItems, 'template');
		//console.log(Object.keys(categorizedListItems));
		let renderLogic;
		for(let i = 0; i < Object.keys(categorizedListItems).length; i++) {
			if(Object.keys(categorizedListItems)[i] === template) {
				renderLogic = true;
			}
			else {
				renderLogic = false;
			}
		}
		if(renderLogic) {
			let groupedListItems;
			for(let i in categorizedListItems) {
				if(i === template) {
					groupedListItems = groupBy(categorizedListItems[i], 'category');
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
					//console.log(groupedListItems[allCategories[i]]);
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
		else {
			return (
				<div>Add some items to your {template} list</div>
			);
		}
	}
}

export default CategorizedList;

CategorizedList.propTypes = {
  categorizedListItems: PropTypes.array.isRequired,
  template: PropTypes.string.isRequired
}