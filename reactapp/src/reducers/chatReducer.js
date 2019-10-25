const initialState = {
  chatResponse: '',
  addCRUD: null,
  delCRUD: null,
  crudquesValue: null
};

export default function chatReducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case 'CHAT_RESPONSE': {
      if (action.payload.entities.intent) {
        switch (action.payload.entities.intent[0].value) {
          case 'aboutme': {
            if (action.payload.entities.greet) {
              let greetValue = '';
              action.payload.entities.greet.map(greetData => {
                greetValue = greetData.value;
              });
              st = {
                ...state,
                chatResponse: `${greetValue}, this is Axa, How can I help you`
              };
            }
            if (action.payload.entities.myself) {
              st = { ...state, chatResponse: 'I am Axa your Assistant' };
              if (action.payload.entities.myself[0].value === 'gender') {
                st = { ...state, chatResponse: 'lol.. I am a robot' };
              }
              if (action.payload.entities.myself[0].value === 'task') {
                st = {
                  ...state,
                  chatResponse:
                    'Try Adding / Deleting data from TO DO LIST.. also, we can have a casual chat instead'
                };
              }
              if (action.payload.entities.myself[0].value === 'concern') {
                st = { ...state, chatResponse: 'I am energized, thank you' };
              }
              if (action.payload.entities.myself[0].value === 'parent') {
                st = {
                  ...state,
                  chatResponse:
                    'I am created by Phani and he is my father too..'
                };
              }
              if (action.payload.entities.myself[0].value === 'birthwhen') {
                st = { ...state, chatResponse: 'I was born in April 2018' };
              }
              if (action.payload.entities.myself[0].value === 'birthwhere') {
                st = {
                  ...state,
                  chatResponse: 'In the mind of my creator.. from India'
                };
              }
              if (action.payload.entities.myself[0].value === 'aboutcreator') {
                let creatorProfile =
                  'www.linkedin.com/in/phaneendra-kosanam-3b4756aa';
                st = {
                  ...state,
                  chatResponse: `He is a MERN stack Developer, with a good humour.\nOpen this link to know more about him ${creatorProfile}`
                };
              }
            }
            if (action.payload.entities.endchat) {
              st = { ...state, chatResponse: 'thank you, see you again..' };
            }
            break;
          }
          case 'sarcasm': {
            switch (action.payload.entities.sarcasm[0].value) {
              case 'marry me': {
                st = { ...state, chatResponse: 'Lol.. try humans' };
                return st;
                break;
              }
              case 'i love you': {
                st = { ...state, chatResponse: 'I only love talking to you..' };
                return st;
                break;
              }
              case 'joke': {
                st = {
                  ...state,
                  chatResponse: 'Hm.. I am actually not programmed for that..!!'
                };
                return st;
                break;
              }
              case 'date me': {
                st = {
                  ...state,
                  chatResponse: 'lol.. Try finding a human partner instead..'
                };
                return st;
                break;
              }
            }
            if (action.payload.entities.myself) {
              st = { ...state, chatResponse: 'Sorry, am just a Robot' };
            }
            break;
          }
          case 'abusive': {
            if (action.payload.entities.abuse) {
              st = { ...state, chatResponse: 'I am a Robot you Idiot' };
            }
            break;
          }
          case 'endchat': {
            if (action.payload.entities.endchat) {
              let endchatValue = '';
              action.payload.entities.endchat.map(end => {
                endchatValue = end.value;
              });
              st = { ...state, chatResponse: `${endchatValue} for trying me` };
            }
            if (action.payload.entities.endchat[0].value === 'closechat') {
              st = { ...state, chatResponse: 'Good Bye' };
            }
            if (action.payload.entities.endchat[0].value === 'you too') {
              st = { ...state, chatResponse: "It's nice talking to you too" };
            }
            break;
          }
          case 'crud': {
            if (action.payload.entities.crud) {
              switch (action.payload.entities.crud[0].value) {
                case 'add': {
                  let typedText = action.payload._text;
                  let splittedText = typedText.split('add ');
                  let addText = splittedText[1];
                  st = {
                    ...state,
                    chatResponse: `Yes, Added ${addText}`,
                    addCRUD: addText,
                    crudquesValue: null
                  };
                  return st;
                  break;
                }
                case 'delete': {
                  let typedText = action.payload._text;
                  let splittedText = typedText.split('delete ');
                  let delText = splittedText[1];
                  st = {
                    ...state,
                    chatResponse: `Yes, Deleted ${delText}`,
                    delCRUD: delText,
                    crudquesValue: null
                  };
                  return st;
                  break;
                }
              }
            }
            // if (action.payload.entities.crudques) {
            //   let quesValue = '';
            //   action.payload.entities.crudques.map(ques => {
            //     quesValue = ques.value;
            //   });
            //   st = {
            //     ...state,
            //     chatResponse: `yes.. ${quesValue} what ?`,
            //     crudquesValue: quesValue
            //   };
            // }
            break;
          }
          case 'crudques': {
            if (action.payload.entities.crudques) {
              let quesValue = '';
              action.payload.entities.crudques.map(ques => {
                quesValue = ques.value;
              });
              st = {
                ...state,
                chatResponse: `yes.. ${quesValue} what ?`,
                crudquesValue: quesValue
              };
            }
            break;
          }
        }
      } else {
        if (action.payload.entities.abuse) {
          st = {
            ...state,
            chatResponse: `Sorry, I did not understand ${
              action.payload.entities.abuse[0].value
            }`,
            crudquesValue: null
          };
        }
      }
      break;
    }
    default: {
      return st;
    }
  }
  console.log(`AFTER::${action.type},${JSON.stringify(st)}`);
  return st;
}
