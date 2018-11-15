import React from 'react';


import Navigation from './components/Navigation';
import InputListItem from './components/InputListItem';
import List from './components/List';

import list from './list.svg';
import GitHub from './img/github.svg';
import LinkedIn from './img/linkedin.svg';



class App extends React.Component {
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

        <section className="list">
          <InputListItem />
          <List />
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
