export default function (state = [], action) {
  switch(action.type){
    case 'ADD_BG_ENTRY':
      return [
        action.entry,
        ...state
      ];
    default:
      return state;
  }
}
