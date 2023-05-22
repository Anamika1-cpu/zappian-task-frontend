import { Link, useNavigate } from "react-router-dom";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import photo from "../7294793.jpg";
import {
  deleteUserAction,
  updateUserAction,
} from "../redux/slices/user/userSlice";

const UsersListItem = (user) => {
  //dispatch
  const dispatch = useDispatch();
  console.log(user);
  const history = useNavigate();

  return (
    <>
      <div className='p-8 mb-4 bg-white shadow rounded'>
        <div className='flex flex-wrap items-center -mx-4'>
          <div className='w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0'>
            <img
              className='w-10 h-10 mr-4 object-cover rounded-full'
              src={photo}
              alt='profile'
            />
            <div>
              <p className='text-sm font-medium'>{user?.user?.name}</p>
              <p className='text-xs text-gray-500'>{user?.user?.email}</p>
            </div>
          </div>

          <div className='w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0'>
            <button
              onClick={() => dispatch(deleteUserAction(user?.user?._id))}
              className='inline-block py-1 px-2 text-center bg-red-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded'
            >
              delete
            </button>
            <Link
              to={`/update/${user?.user?._id}`}
              onClick={() => dispatch(updateUserAction(user?.user?._id))}
              className='inline-block py-1 px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded'
            >
              update
            </Link>
          </div>
          <div className='w-full lg:w-1/12 px-4'></div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
