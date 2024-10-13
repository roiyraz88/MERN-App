import React from "react";
import UserList from "../components/UsersList";
import Map from "../../shared/components/UIElements/Map";



function Users(){
    

    const USERS = [
        {
        id: 'u1',
        name: 'Roie Raz',
        image: 'https://static.wixstatic.com/media/c05dc9_e4b5b2d556c449a1918b627db525b279~mv2.jpg',
        places: 3
    }
]; 


    return <UserList items = {USERS}/>
}

export default Users;