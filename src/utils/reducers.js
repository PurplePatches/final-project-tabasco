export default function(state = {}, action) {
  if (action.type == 'RECEIVE_RELATIONS') {
      state = {
        ...state,
        id: action.id,
        profiles: action.profiles,
        relations: action.relations,
        requests: action.relations.filter(el => !el.friends),
        friends: action.relations.filter(el => el.friends),
        images: action.images,
      };
  }
  if (action.type == 'MAKE_HOT' || action.type == 'MAKE_NOT') {
      state = {
 
      }
  }
  return state;
}