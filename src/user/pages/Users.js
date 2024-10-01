import React from "react";
import UserList from "../components/UsersList";

function Users(){

    const USERS = [
        {
        id: 'u1',
        name: 'Roie Raz',
        image: 'https://scontent.ftlv1-1.fna.fbcdn.net/v/t39.30808-6/434712687_25533154849608920_4942308445496564261_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hWuki_TN91gQ7kNvgG1UAmk&_nc_ht=scontent.ftlv1-1.fna&_nc_gid=Ad7yaS5HQ1uFIh04dl1Lohb&oh=00_AYAXxK3rTTveJ5AiU8QqOFqCRjcNRBXVuMaOBhMDK1Kaeg&oe=66F866FB',
        places: 3
    }
]; 


    return <UserList items = {USERS}/>
}

export default Users;