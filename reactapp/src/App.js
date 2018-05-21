import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Launcher } from 'react-chat-window';
import logo from './logo.svg';
import './App.css';
import { userSendsMsg } from './actions/chatActions';
import {
  fetch_TodoList,
  add_todolist,
  del_todolist
} from './actions/crudActions';
import Docs from './components/docs';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messageList: []
    };
    this.getTodolist = this.getTodolist.bind(this);
    this.add = this.add.bind(this);
    // this.edit = this.edit.bind(this);
    this.del = this.del.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetch_TodoList());
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.chatResponse);
    console.log(nextProps.chatResponse);
    console.log(this.state.messageList);
    let botResponse = {};
    if (nextProps.chatResponse !== '') {
      if (nextProps.chatResponse !== this.props.chatResponse) {
        botResponse.author = 'Axa';
        botResponse.type = 'text';
        botResponse.data = { text: nextProps.chatResponse };
        this.state.messageList.push(botResponse);
      }
    }

    if (nextProps.addCRUD !== null) {
      if (nextProps.addCRUD !== this.props.addCRUD) {
        let slno = '';
        let todo = '';
        nextProps.todolist.map(todo => {
          slno = todo.slno + 1;
        });
        todo = nextProps.addCRUD;
        this.props.dispatch(add_todolist({ slno: slno, todo: todo }));
      }
    }
    if (nextProps.delCRUD !== null) {
      if (nextProps.delCRUD !== this.props.delCRUD) {
        let slno = '';
        let todo = '';
        let obj = {};
        nextProps.todolist.map(todo => {
          if (nextProps.delCRUD === todo.todo) {
            obj._id = todo._id;
            obj.slno = todo.slno;
            obj.todo = todo.todo;
          }
        });
        this.props.dispatch(del_todolist(obj));
      }
    }
  }

  getTodolist() {
    if (this.props.todolist !== null) {
      return this.props.todolist.map(todo => {
        return (
          <tr>
            <td>{todo.slno}</td>
            <td>{todo.todo}</td>
            {/* <td><input type="button" value="Edit" onClick={() => this.edit(todo)} /><input type="button" value="Del" onClick={() => this.del(todo)} /></td> */}
            <td>
              <input type="button" value="Del" onClick={() => this.del(todo)} />
            </td>
          </tr>
        );
      });
    }
  }

  _onMessageWasSent(message) {
    if (this.props.crudquesValue !== null) {
      console.log(this.props.crudquesValue);
      let createdCrudText = {
        text: `${this.props.crudquesValue} ${message.data.text}`
      };
      console.log(createdCrudText);
      this.setState({
        messageList: [...this.state.messageList, message]
      });
      this.props.dispatch(userSendsMsg(createdCrudText));
    } else {
      this.setState({
        messageList: [...this.state.messageList, message]
      });
      this.props.dispatch(userSendsMsg(message.data));
    }
  }

  add() {
    const addedTodo = document.getElementById('addtodotext');
    let slno = '';
    let todo = '';
    if (addedTodo.value === '') {
      alert('add some text');
      addedTodo.focus();
    } else {
      this.props.todolist.map(todo => {
        slno = todo.slno + 1;
      });
      todo = addedTodo.value;
      this.props.dispatch(add_todolist({ slno: slno, todo: todo }));
    }
  }

  del(data) {
    console.log(data);
    this.props.dispatch(del_todolist(data));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Axa - the chatbot</h1>&copy; Copyright
          <div className="createdByDiv">
            <h4 className="createdby-title">Created By Phani</h4>
            www.linkedin.com/in/phaneendra-kosanam-3b4756aa<br />
          </div>
        </header>
        <br />
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div className="tableListDiv">
          <h3>TO DO LIST</h3>
          <div className="tableListtableDiv">
            <div>
              <form>
                <input id="addtodotext" type="text" placeholder="to do item" />
                <input type="button" value="Add" onClick={this.add} />
              </form>
            </div>
            <br />

            <table>
              <tr>
                <th>SNo.</th>
                <th>To Do Item</th>
                <th>Actions</th>
              </tr>
              {this.getTodolist()}
            </table>
          </div>
        </div>
        <div className="docsDiv">
          <Docs />
        </div>
        <div>
          <Launcher
            agentProfile={{
              teamName: 'Axa Assistant',
              imageUrl:
                'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            onMessageWasSent={this._onMessageWasSent.bind(this)}
            messageList={this.state.messageList}
            showEmoji
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chatResponse: state.chatReducer.chatResponse,
    todolist: state.crudReducer.todolist,
    addCRUD: state.chatReducer.addCRUD,
    delCRUD: state.chatReducer.delCRUD,
    crudquesValue: state.chatReducer.crudquesValue
  };
}

export default connect(mapStateToProps)(App);
