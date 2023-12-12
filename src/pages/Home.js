import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [error, setError ] = useState(false);
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    ListUsers()
  }, [])

  const ListUsers = async () => {
    try {
      setLoading(true)
      const res = await axios.get("http://localhost:3000/users")
      const { data, status } = res
      if (status === 200) {
        setUsers(data)
        setLoading(false)
      }
      console.log("list user: ", res)
    } catch (error) {
      setError(true)
    }
  }

  //DELETE USER
  const handleDeleteUser = async (id) => {
    try {
      setLoading(true)
      const res = await axios.delete(`http://localhost:3000/users/${id}`)
      const { status } = res
      if (status === 200) {
        setLoading(false)
        setLoading(false)
        toast.success('Delete user successfully')
      }
      ListUsers()
      console.log("Delete user: ", res)
    } catch (error) {
      setError(true)
      toast.error("Delete user error!!!")
    }
  }

  //Paginate
  const handlePageClick = (e) => {
    setTotalPages(e.selected + 1)
  }

  return (
    <>
      {loading && 'Loading...'}
      {error && 'Something went wrong!!!'}
      <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
        <h1 className="text-3xl font-bold">DATA TABLE</h1>
        <div className="flex flex-col">
            <div className="overflow-x-auto mt-8 sm:-mx-6 items-center lg:-mx-8">
              <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center">
                    <thead className="border-b bg-gray-800">
                      <tr>
                        <th scope="col" className="text-sm font-medium text-white px-6 py-4" > # </th>
                        <th scope="col" className="text-sm font-lg text-white px-6 py-4" > Name </th>
                        <th scope="col" className="text-sm font-lg text-white px-6 py-4" > Email </th>
                        <th scope="col" className="text-sm font-lg text-white px-6 py-4" > Phone </th>
                        <th scope="col"className="text-sm font-lg text-white px-6 py-4" > Action </th>
                      </tr>
                    </thead>
                    <tbody className="border-black border-b-2">
                      {users.map((item, index) =>
                        <tr key={index} className="bg-white border-b-2 border-black" >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                            {index + 1}
                          </td>
                          <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                            {item.email}
                          </td>
                          <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                            {item.phone}
                          </td>
                          <td className="text-sm flex justify-between  items-center text-gray-900 font-bold px-6 py-4 space-x-4 whitespace-nowrap">
                            <Link to={`/users/${item.id}`} className="bg-teal-600 text-white px-6 py-2 rounded-lg" >
                              View
                            </Link>
                            <Link to={`/edit-user/${item.id}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg" >
                              Edit
                            </Link>
                            <Link onClick={()=>handleDeleteUser(item.id)} to={"/"}className="bg-red-600 text-white px-6 py-2 rounded-lg">
                              Delete
                            </Link>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGINATE */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={99}
        previousLabel="<<"
        renderOnZeroPageCount={null}

        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />
    </>
  )
}

export default Home
