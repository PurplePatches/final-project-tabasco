export default function(state = {}, action) {
  if (action.type == 'RECEIVE_RELATIONS') {
      state = {
          ...state,
          profiles: action.profiles,
          relations: action.relations,
          images: action.images,
      };
  }
  if (action.type == 'MAKE_HOT' || action.type == 'MAKE_NOT') {
      state = {
 
      }
  }
  return state;
}