import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { updateUserAction } from "../redux/slices/user/userSlice";

//Form schema
const formSchema = Yup.object({
  name: Yup.string().required(" Name is required"),
  email: Yup.string().required("Email is required"),
});

const UpdateProfileForm = () => {
  const { id } = useParams();
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchUserAction(id));
  }, [dispatch, id]);

  //get user from store
  const user = useSelector((state) => state?.users);
  const { userProfile, isUpdated, appErr, serverErr, loading } = user;
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      email: userProfile?.email,
    },
    onSubmit: (values) => {
      //dispath the action
      dispatch(updateUserAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });
  if (isUpdated) return <Navigate to={`/profile/${id}`} />;
  return (
    <div className='min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h3 className='mt-6 text-center text-3xl font-extrabold text-gray-300'>
          Hey buddy!{" "}
          <span className='text-grenn-300'>
            {userProfile?.firstName} {userProfile?.lastName}{" "}
          </span>
          Do you want to update your profile?
        </h3>
        {/* ERR */}
        {serverErr || appErr ? (
          <h2 className='text-red-400 text-center'>
            {appErr}
            {serverErr}
          </h2>
        ) : null}
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <div className='mt-1'>
                {/* First name */}
                <input
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='firstName'
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='text-red-500'>
                {formik.touched.firstName && formik.errors.firstName}
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <div className='mt-1'>
                {/* Email */}
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              {/* err msg */}
              <div className='text-red-500'>
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div>
              {/* Err msg */}
              <div className='text-red-500'>
                {formik.touched.bio && formik.errors.bio}
              </div>
            </div>
            <div>
              {/* submit btn */}
              {loading ? (
                <button
                  disabled
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                 shadow-sm text-sm font-medium text-white bg-gray-600'
                >
                  Loading...
                </button>
              ) : (
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Update
                </button>
              )}
            </div>
          </form>

          <div className='mt-4 mb-3'>
            <div className='relative'>
              <div className='flex flex-col justify-center items-center'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
