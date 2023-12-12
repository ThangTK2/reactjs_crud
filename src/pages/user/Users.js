import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const Users = () => {
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [error, setError ] = useState(false);

  useEffect(() => {
    viewUsers() // gọi lại function để thực thi
  }, []);

  const viewUsers = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:3000/users/${id}`)
      const { data, status } = res
      if (status === 200) {
        setUser(data)
        setLoading(false)
        toast.success('View user successfully')
      }
      // console.log("view user: ", res)
    } catch (error) {
      setError(true)
      toast.error("View user error!!!")
    }
  }

  return (
    <>
      {loading && 'Loading...'}
      {error && 'Something went wrong!!!'}
      <div className="h-full w-full flex flex-col mt-32 justify-center items-center">         
        {user && (
          <table class="border-separate border border-slate-400 ...">
            <thead>
              <tr>
                <th class="border border-slate-300 ...">#</th>
                <th class="border border-slate-300 ...">Name</th>
                <th class="border border-slate-300 ...">Email</th>
                <th class="border border-slate-300 ...">Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-slate-300 ...">{user.id}</td>
                <td class="border border-slate-300 ...">{user.name}</td>
                <td class="border border-slate-300 ...">{user.email}</td>
                <td class="border border-slate-300 ...">{user.phone}</td>
              </tr>
            </tbody>
          </table>
        )}
        
        <Link to={`/`} className="hover:bg-pink-300 bg-white hover:shadow-md outline-none rounded-xl font-bold border mt-8 hover:text-teal-200 text-slate-500 border-zinc-400 py-4 px-4 pl-4">
          Back To Home
        </Link>  
      </div>
    </>
  )
}

export default Users
