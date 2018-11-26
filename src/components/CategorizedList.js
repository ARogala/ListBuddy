import React from 'react';
import PropTypes from 'prop-types';

import groupBy from './groupBy.js';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  btnContainer: {
  	textAlign: 'center'
  },
  checked: {
	'& + $label': {
		fontWeight: 'normal',
	  	textDecoration: 'line-through'
	},
  },
  label : {
  	fontWeight: 'bold'
  }
});

class CategorizedList extends React.Component {
	render() {
		const { classes } = this.props;
		const template    = this.props.template;
		const listItems   = this.props.categorizedListItems;
		let categorizedListItems = groupBy(listItems, 'template');

		let renderLogic = false;
		for(let i = 0; i < Object.keys(categorizedListItems).length; i++) {
			// console.log(Object.keys(categorizedListItems)[i]);
			// console.log(template);
			if(Object.keys(categorizedListItems)[i] === template) {
				renderLogic = true;
			}
		}
		// console.log(renderLogic);
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
						<li key={i} className="categorizedList__category">
							<span>{allCategories[i]}</span>
							<ul className="categorizedList__categoryUL">
								{groupedListItems[allCategories[i]].map((item, index)=>{
									return(
										<li key={item.id} className="categorizedList__item">
											<input type="checkbox" defaultChecked={item.checked} id={`${item.item.trim().replace(/\s/g, '')}${index}`}/>
											<label htmlFor={`${item.item.trim().replace(/\s/g, '')}${index}`}>{item.item}</label>
										</li>
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
						<li key={i} className="categorizedList__category">
							<span>{allCategories[i]}</span>
							<ul className="categorizedList__categoryUL">
								<li key={groupedListItems[allCategories[i]][0].id} className="categorizedList__item">
									<input
										type="checkbox"
										defaultChecked={groupedListItems[allCategories[i]][0].checked}
										id={`${groupedListItems[allCategories[i]][0].item.trim().replace(/\s/g, '')}${i}`}
									/>
									<label
										htmlFor={`${groupedListItems[allCategories[i]][0].item.trim().replace(/\s/g, '')}${i}`}
									>
										{groupedListItems[allCategories[i]][0].item}
									</label>
								</li>
							</ul>
						</li>
					);
				}
			}
			return (
				<div>
					<h3>{template} List</h3>
					<ul className="categorizedList">
						{multItemsInCat}
						{singleItemInCat}
					</ul>
					<div className={classes.btnContainer}>
						<Button
							className={classes.button}
							variant="contained"
							color="primary"
							// onClick={() => saveToDoListProgress(this.toDoList.current.childNodes)}
						>
							Save Progress
						</Button>
						<Button
							className={classes.button}
							variant="contained"
							color="secondary"
							// onClick={() => deleteToDoList()}
						>
							Trash List
						</Button>
					</div>
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

export default withStyles(styles)(CategorizedList);

CategorizedList.propTypes = {
  categorizedListItems: PropTypes.array.isRequired,
  template: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}