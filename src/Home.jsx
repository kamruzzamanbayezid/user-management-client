import { Link, useLoaderData } from "react-router-dom";
import { GrEdit, GrClose } from "react-icons/gr";
import { useState } from "react";
import Swal from "sweetalert2";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
// import { useState } from "react";

const Home = () => {

      const loadedUsers = useLoaderData();
      const [users, setUsers] = useState(loadedUsers);

      const handleDelete = id => {

            const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                  },
                  buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  reverseButtons: true
            }).then((result) => {
                  if (result.isConfirmed) {
                        fetch(`https://user-management-server-8wi41ig11-kamruzzaman-bayezids-projects.vercel.app/users/${id}`, {
                              method: 'DELETE'
                        })
                              .then(res => res.json())
                              .then(data => {
                                    const remaining = users.filter(user => user._id !== id);
                                    setUsers(remaining)
                                    if (data.deletedCount > 0) {
                                          swalWithBootstrapButtons.fire(
                                                'Deleted!',
                                                'Your file has been deleted.',
                                                'success'
                                          )
                                    }
                              })

                  } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                  ) {
                        swalWithBootstrapButtons.fire(
                              'Cancelled',
                              'Your imaginary file is safe :)',
                              'error'
                        )
                  }
            })


      }

      return (
            <div className="max-w-5xl mx-auto border">
                  <div className="my-20">
                        <button className="p-4 lg:p-0 text-lg font-medium mb-8 text-blue-700">
                              <Link className="flex items-center " to='/addUser'><MdKeyboardDoubleArrowLeft className="text-2xl"></MdKeyboardDoubleArrowLeft>Add new users</Link>
                        </button>
                        <div className="overflow-x-auto">
                              <table className="table">
                                    {/* head */}
                                    <thead>
                                          <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Gender</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {
                                                users?.map((user, index) => <tr key={user._id}>
                                                      <th>{index + 1}</th>
                                                      <td>{user.name}</td>
                                                      <td>{user.email}</td>
                                                      <td>{user.gender}</td>
                                                      <td>{user.status}</td>
                                                      <td>
                                                            <Link to={`users/${user._id}`}>
                                                                  <button className="btn btn-sm mr-2"><GrEdit></GrEdit></button>
                                                            </Link>
                                                            <button onClick={() => handleDelete(user._id)} className="btn btn-sm mr-2"><GrClose></GrClose></button>
                                                      </td>
                                                </tr>)
                                          }

                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
};

export default Home;