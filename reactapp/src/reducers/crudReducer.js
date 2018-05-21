const initialState = {
  todolist: null
};

export default function crudReducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case 'FETCH_TODOLIST': {
      st = { ...state, todolist: action.payload }
      break;
    }
    case 'ADD_TOTODO': {
      let todolistClone = [];
      st.todolist.map((todo) => {
        todolistClone.push(todo);
      });
      todolistClone.push(action.payload);
      st = { ...state, todolist: todolistClone }
      break;
    }
    case 'DEL_TOTODO': {
      console.log(action.payload);
      let todolistClone = [];
      st.todolist.map((todo) => {
        if (todo['_id'] === action.payload['_id']) {
          // do nothing
        } else {
          todolistClone.push(todo);
        }
      });
      st = { ...state, todolist: todolistClone }
      break;
    }
    default: {
      return st;
    }
  }
  console.log(`AFTER::${action.type},${JSON.stringify(st)}`);
  return st;
}
