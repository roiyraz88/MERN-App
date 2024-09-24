import React from "react";
import UserList from "../components/UsersList";

function Users(){

    const USERS = [{
        id: 'u1',
        name: 'Roie Raz',
        image: '/assets/pexels-jaime-reimer-1376930-2662116.jpg',
        places: 3
    }]; 


    return <UserList items = {USERS}/>
}

export default Users;