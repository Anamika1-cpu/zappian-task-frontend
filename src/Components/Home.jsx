import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersAction } from '../redux/slices/user/userSlice';
import UsersListItem from './userListItem';
import { Link } from 'react-router-dom';
import {logoutUserAction} from "../redux/slices/user/userSlice"
const Home = () => {
  const user = useSelector((state) => state?.users);
  const { usersList,appErr, serverErr, loading} =
    user;
  const list = user?.usersList?.users;
  console.log(list);
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [dispatch]);
  return (
    <div >
      <h1 className='text-yellow-400'>Home</h1>
      <Link to={`/register`}>Register</Link>

      <br />
      <Link to={`/login`}>Login</Link>
      <br />
      <button className='bg-red-800' onClick={()=>{dispatch(logoutUserAction())}}>Logout</button>
      <h2> all users</h2>
      <section>
        {
          list?.map((user) => <UsersListItem user={user}/>)
        }
      </section>
    </div>
  )
}

export default Home