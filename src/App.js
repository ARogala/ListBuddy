import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './components/Navigation';
import ToDoListInput from './components/ToDoListInput';
import ToDoList from './components/ToDoList';

import ListTypeForm from './components/ListTypeForm';
import CategorizedListItemForm from './components/CategorizedListItemForm';
import CategorizedList from './components/CategorizedList';

import list from './list.svg';
import GitHub from './img/github.svg';
import LinkedIn from './img/linkedin.svg';

//materialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
  footer: {
    textAlign: 'center',
    margin: '10px'
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoListItems: JSON.parse(localStorage.getItem('toDoListItems') || '[]'),
      toDoItem: '',
      template: 'To Do',
      categorizedListItems: JSON.parse(localStorage.getItem('categorizedListItems') || '[]')
    };
  }

  handleToDoItemTextChange(toDoItem) {
    this.setState({toDoItem: toDoItem});
  }

  clearToDoInputText() {
    this.setState({toDoItem: ''});
  }

  saveToDoListItem() {
    const toDoListItems = this.state.toDoListItems;
    const toDoItem = this.state.toDoItem.trim();

    //push empty object onto toDoListItems array
    toDoListItems.push({});
    const newIndex = toDoListItems.length - 1;
    toDoListItems[newIndex].toDoItem = toDoItem;
    toDoListItems[newIndex].checked = false;

    localStorage.setItem('toDoListItems', JSON.stringify(toDoListItems));
    this.setState({toDoListItems: toDoListItems});
    this.clearToDoInputText();
  }

  deleteToDoList() {
    const result = window.confirm("Do you really want to delete your list?");
    if(result === true) {
      this.setState({toDoListItems: []});
      localStorage.removeItem('toDoListItems');
    }
  }

  saveToDoListProgress(toDoListRef) {
    console.log(toDoListRef);
    console.log(toDoListRef[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1]);
    const toDoListItems = this.state.toDoListItems;
    for(let i = 0; i < toDoListRef.length; i++) {
      toDoListItems[i].checked = toDoListRef[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1].checked;
    }
    localStorage.setItem('toDoListItems', JSON.stringify(toDoListItems));
    this.setState({toDoListItems: toDoListItems});
  }

  //categorized list methods
  updateTemplate(template) {
    //console.log(template);
    //localStorage.setItem('template', JSON.stringify(template));
    this.setState({template: template});
  }

  saveCategorizedListItem(item, category) {
    // console.log(item);
    // console.log(category);
    // console.log(this.state.template);
    const categorizedListItems = this.state.categorizedListItems;
    //push a new empty object on the categorizedListItems array
    categorizedListItems.push({});

    const newIndex = categorizedListItems.length - 1;
    categorizedListItems[newIndex].item = item;
    categorizedListItems[newIndex].category = category;
    categorizedListItems[newIndex].checked = false;
    categorizedListItems[newIndex].id = newIndex;
    categorizedListItems[newIndex].template = this.state.template;

    localStorage.setItem('categorizedListItems', JSON.stringify(categorizedListItems));
    this.setState({categorizedListItems: categorizedListItems});
  }

  deleteCategorizedList() {
    const result = window.confirm("Do you really want to delete your list?");
    if(result === true) {
      this.setState({categorizedListItems: []});
      localStorage.removeItem('categorizedListItems');
    }
  }



  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CssBaseline />
            <Navigation />
            <header className="header">
              <div className="header__container">
                <img src={list} className="header__logo" alt="logo" />
                <h1 className="header__title">List Buddy</h1>
              </div>
            </header>
            <section>
              {(this.state.template === 'To Do') ? (
                <div>
                  <ListTypeForm
                    updateTemplate={(template) => this.updateTemplate(template)}
                  />
                  <ToDoListInput
                    toDoItem={this.state.toDoItem}
                    handleToDoItemTextChange={(toDoItem)=>this.handleToDoItemTextChange(toDoItem)}
                    clearToDoInputText={()=>this.clearToDoInputText()}
                    saveToDoListItem={()=>this.saveToDoListItem()}
                  />
                  <ToDoList
                    toDoListItems={this.state.toDoListItems}
                    saveToDoListProgress={(toDoListRef) => this.saveToDoListProgress(toDoListRef)}
                    deleteToDoList={() => this.deleteToDoList()}
                  />
                </div>
              ):(
                <div>
                  <ListTypeForm
                    updateTemplate={(template) => this.updateTemplate(template)}
                  />
                  <CategorizedListItemForm
                    saveCategorizedListItem={(item, category)=> this.saveCategorizedListItem(item,category)}
                    template={this.state.template}
                  />
                  <CategorizedList
                    categorizedListItems={this.state.categorizedListItems}
                    template={this.state.template}
                    deleteCategorizedList={() => this.deleteCategorizedList()}
                  />
                </div>
              )}
            </section>
            <footer className={classes.footer}>
              <div>
                <a href="https://github.com/ARogala"><img src={GitHub} alt="github"/></a>
                <a href="https://www.linkedin.com/in/andrew-rogala"><img src={LinkedIn} alt="linkedIn"/></a>
              </div>
            </footer>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

//export default App;
export default withStyles(styles)(App);