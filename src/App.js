import React from 'react';


import Navigation from './components/Navigation';
import ToDoListInput from './components/ToDoListInput';
import ToDoList from './components/ToDoList';

import ListTypeForm from './components/ListTypeForm';
import ListItemForm from './components/ListItemForm';
import TemplateList from './components/TemplateList';

import list from './list.svg';
import GitHub from './img/github.svg';
import LinkedIn from './img/linkedin.svg';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoListItems: JSON.parse(localStorage.getItem('toDoListItems') || '[]'),
      toDoItem: '',
      template: 'To Do',
      templateListItems: JSON.parse(localStorage.getItem('templateListItems') || '[]')
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
    this.setState({toDoItem: ''});
  }

  deleteToDoList() {
    const result = window.confirm("Do you really want to delete your list?");
    if(result === true) {
      this.setState({toDoListItems: []});
      localStorage.removeItem('toDoListItems');
    }
  }

  saveToDoListProgress(toDoListRef) {
    const toDoListItems = this.state.toDoListItems;
    for(let i = 0; i < toDoListRef.length; i++) {
      toDoListItems[i].checked = toDoListRef[i].childNodes[0].checked;
    }
    localStorage.setItem('toDoListItems', JSON.stringify(toDoListItems));
    this.setState({toDoListItems: toDoListItems});
  }

  //template lists here
  updateTemplate(template) {
    //console.log(template);
    //localStorage.setItem('template', JSON.stringify(template));
    this.setState({template: template});
  }

  saveTemplateListItem(item, category) {
    console.log(item);
    console.log(category);
    console.log(this.state.template);
    const templateListItems = this.state.templateListItems;
    //push a new empty object on the templateListItems array
    templateListItems.push({});

    const newIndex = templateListItems.length - 1;
    templateListItems[newIndex].item = item;
    templateListItems[newIndex].category = category;
    templateListItems[newIndex].checked = false;
    templateListItems[newIndex].id = newIndex;
    templateListItems[newIndex].template = this.state.template;

    localStorage.setItem('templateListItems', JSON.stringify(templateListItems));
    this.setState({templateListItems: templateListItems});
  }



  render() {
    return (
      <div className="App">
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
              <ListItemForm
                saveTemplateListItem={(item, category)=> this.saveTemplateListItem(item,category)}
                template={this.state.template}
              />
              <TemplateList
                templateListItems={this.state.templateListItems}
                template={this.state.template}
              />
            </div>
          )}

        </section>

        <footer className="footer">
          <div className="footer__container">
            <img src={GitHub} alt="github"/>
            <img src={LinkedIn} alt="linkedIn"/>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
