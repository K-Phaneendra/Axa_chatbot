import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

class Docs extends Component {
  render() {
    return (
      <div>
        <h3>Docs</h3>
        <div>
          <p>Axa, a Robot which can chat with humans</p>
          <h5>Things Axa can do</h5>
          <ul className="docsulList">
            <li>
              <p>use 'add' keyword to add data into 'TO DO LIST'</p>
              <p className="examplePara">ex: add flight @ 8pm</p>
            </li>
            <li>
              <p>use 'delete' keyword to delete data in 'TO DO LIST'</p>
              <p className="examplePara">ex: delete flight @ 8pm</p>
            </li>
            <li>
              <p>You can also have a casual/sarcastic chat with Axa</p>
              <p className="examplePara">ex: how are you</p>
              <p className="examplePara">ex: will you marry me</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Docs;
