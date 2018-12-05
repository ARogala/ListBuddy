import React from 'react';
import PropTypes from 'prop-types';

import groupBy from './groupBy.js';

import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  },
  listItem: {
  	flexWrap: 'wrap'
  },
  subList: {
  	width: '100%'
  },
  listText: {
  	textAlign: 'center',
  	padding: '0'
  }
});

class CategorizedList extends React.Component {
	constructor(props) {
	    super(props);
	    this.categorizedList = React.createRef();
  	}

	render() {
		const { classes }                 = this.props;
		const template                    = this.props.template;
		const listItems                   = this.props.categorizedListItems;
		const deleteCategorizedList       = this.props.deleteCategorizedList;
		const saveCategorizedListProgress = this.props.saveCategorizedListProgress;

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
						<ListItem key={i} className={classes.listItem}>
							<ListItemText className={classes.listText} primary={allCategories[i]}/>
							<List className={classes.subList}>
								{groupedListItems[allCategories[i]].map((item, index)=>{
									return(
										<ListItem key={item.id}>
											<FormControlLabel
												classes={{label: classes.label}}
												control={
													<Checkbox
														color="primary"
														defaultChecked={item.checked}
														classes={{checked: classes.checked}}
														value={Number(item.id).toString()}
													/>
												}
												label={item.item}
											/>
										</ListItem>
									);
								})}
							</List>
						</ListItem>
					);
				}
			}

			//build the DOM for the categories with one item
			const singleItemInCat = [];
			for(let i = 0; i < allCategories.length; i++) {
				if(groupedListItems[allCategories[i]].length === 1) {
					singleItemInCat.push(
						<ListItem key={i} className={classes.listItem}>
							<ListItemText className={classes.listText} primary={allCategories[i]} />
							<List className={classes.subList}>
								<ListItem key={groupedListItems[allCategories[i]][0].id}>
									<FormControlLabel
										classes={{label: classes.label}}
										control={
											<Checkbox
												color="primary"
												defaultChecked={groupedListItems[allCategories[i]][0].checked}
												classes={{checked: classes.checked}}
												value={Number(groupedListItems[allCategories[i]][0].id).toString()}
											/>
										}
										label={groupedListItems[allCategories[i]][0].item}
									/>
								</ListItem>
							</List>
						</ListItem>
					);
				}
			}
			return (
				<div>
					<h3>{template} List</h3>
					<FormGroup>
						<RootRef rootRef={this.categorizedList}>
							<List>
								{multItemsInCat}
								{singleItemInCat}
							</List>
						</RootRef>
					</FormGroup>
					<div className={classes.btnContainer}>
						<Button
							className={classes.button}
							variant="contained"
							color="primary"
							onClick={() => saveCategorizedListProgress(this.categorizedList.current.childNodes)}
						>
							Save Progress
						</Button>
						<Button
							className={classes.button}
							variant="contained"
							color="secondary"
							onClick={() => deleteCategorizedList()}
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
  deleteCategorizedList: PropTypes.func.isRequired,
  saveCategorizedListProgress: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}