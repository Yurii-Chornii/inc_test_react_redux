import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import User from "../user/User";
import {set_users} from '../../redux/action-creators'
import './Users.css';


export default function Users({history}) {
    const users = useSelector(({users : {users}}) => users);
    const dispatch = useDispatch();
    const getUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(value => value.json())
            .then(value => dispatch(set_users(value)))
    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        users && (
            <div>
                <h2 className='users-title'>Users</h2>
                <div>
                    {users.map((user) => <User user={user} history={history} key={user.id}/>)}
                </div>
            </div>
        )
    );
}
