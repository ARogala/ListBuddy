import React from 'react';


import Navigation from './components/Navigation';
import InputListItem from './components/InputListItem';
import List from './components/List';

import ListTypeForm from './components/ListTypeForm';
import ListItemForm from './components/ListItemForm';

import list from './list.svg';
import GitHub from './img/github.svg';
import LinkedIn from './img/linkedin.svg';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: JSON.parse(localStorage.getItem('listItems') || '[]'),
      inputItemText: '',
      template: 'To Do',
      templateListItems: JSON.parse(localStorage.getItem('templateListItems') || '[]')
    };
  }

  handleInputItemTextChange(inputItemText) {
    this.setState({inputItemText: inputItemText});
  }

  clearInputText() {
    this.setState({inputItemText: ''});
  }

  saveListItem() {
    const listItems = this.state.listItems;
    const item = this.state.inputItemText.trim();
    if(item.length !== 0) {
      listItems.push(item);
      localStorage.setItem('listItems', JSON.stringify(listItems));
      this.setState({listItems: listItems})
      this.setState({inputItemText: ''});
    }
  }

  deleteList() {
    const result = window.confirm("Do you really want to delete your list?");
    if(result === true) {
      this.setState({listItems: []});
      localStorage.removeItem('listItems');
    }
  }

  //template lists here
  updateTemplate(template) {
    //console.log(template);
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
              <InputListItem
                inputItemText={this.state.inputItemText}
                handleInputItemTextChange={(inputItemText)=>this.handleInputItemTextChange(inputItemText)}
                clearInputText={()=>this.clearInputText()}
                saveListItem={()=>this.saveListItem()}
              />
              <List
                listItems={this.state.listItems}
              />
              <button onClick={() => this.deleteList()}>Trash List</button>
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
