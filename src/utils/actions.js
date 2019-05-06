import axios from 'axios';

// export async function receiveUsers() {
//     const { data } = await axios.get('/users');
//     return {
//         type: 'RECEIVE_USERS',
//         users: data.users
//     };
// }

export async function receiveRelations() {
    const { data } = await axios.get('/api/relations');
    console.log(data);
    
    return {
        type: 'RECEIVE_RELATIONS',
        profiles: data.profData,
        relations: data.friendData,
        images: data.images,
    };
}

// export async function makeNot(id) {
//     const { data } = await axios.post('/not/' + id);
//     return {
//         type: 'MAKE_NOT',
//         id
//     };
// }