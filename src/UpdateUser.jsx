import { useState } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {

      const loadedUsers = useLoaderData();

      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [gender, setGender] = useState('');
      const [status, setStatus] = useState('');

      const handleUpdateUser = e => {
            e.preventDefault();
            const user = {
                  name,
                  email,
                  gender,
                  status
            }
            fetch(`https://user-management-server-8wi41ig11-kamruzzaman-bayezids-projects.vercel.app/users/${loadedUsers._id}`, {
                  method: 'PUT',
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(user)
            })
                  .then(res => res.json())
                  .then(data => {
                        if (data.modifiedCount > 0) {
                              Swal.fire(
                                    'Good job!',
                                    'User Updated Successfully!',
                                    'success'
                              )
                        }
                  })
      }

      return (
            <div>

                  <div className="my-16">
                        <button className="p-4 lg:p-0 text-lg font-medium md:ml-40 text-blue-700">
                              <Link className="flex items-center " to='/'><MdKeyboardDoubleArrowLeft className="text-2xl"></MdKeyboardDoubleArrowLeft>All users</Link>
                        </button>
                        <h2 className="text-2xl font-medium text-center">Update User </h2>
                        <p className="font-normal text-center text-gray-500">Use the below form to update user</p>
                        <form onSubmit={handleUpdateUser} className="p-4 md:p-0 md:w-3/4 md:mx-auto">
                              <div className="form-control">
                                    <label className="label">
                                          <span className="label-text text-lg font-medium">Name</span>
                                    </label>
                                    <label className="input-group">
                                          <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Your name.." className="input input-bordered w-full" />
                                    </label>
                              </div>
                              <div className="form-control">
                                    <label className="label">
                                          <span className="label-text text-lg font-medium">Email</span>
                                    </label>
                                    <label className="input-group">
                                          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@site.com" className="input input-bordered w-full" />
                                    </label>
                              </div>
                              <div className="flex items-center gap-6 mt-5">
                                    <span className="label-text text-lg font-medium">Gender</span>
                                    <div className="flex items-center gap-5">
                                          <div className="flex items-center gap-1">
                                                <label htmlFor="male">Male</label>
                                                <input id="male" type="radio" name="male" checked={gender === 'male'} onChange={() => setGender('male')} className="radio radio-info" />
                                          </div>
                                          <div className="flex items-center gap-1">
                                                <label htmlFor="female">Female</label>
                                                <input id="female" type="radio" name="female" checked={gender === 'female'} onChange={() => setGender('female')} className="radio radio-info" />
                                          </div>
                                    </div>
                              </div>
                              <div className="flex items-center gap-6 mt-5">
                                    <span className="label-text text-lg font-medium">Status</span>
                                    <div className="flex items-center gap-5">
                                          <div className="flex items-center gap-1">
                                                <label htmlFor="active">Active</label>
                                                <input id="active" type="radio" name="active" value='active' checked={status === 'active'} onChange={() => setStatus('active')} className="radio radio-accent" />

                                          </div>
                                          <div className="flex items-center gap-1">
                                                <label htmlFor="inactive">Inactive</label>
                                                <input id="inactive" type="radio" name="inactive" value='inactive' checked={status === 'inactive'} onChange={() => setStatus('inactive')} className="radio radio-accent" />

                                          </div>
                                    </div>
                              </div>
                              <button className="btn btn-block bg-emerald-500 mt-6 text-xl" type="submit">Save</button>

                        </form>
                  </div>
            </div>
      );
};

export default UpdateUser;