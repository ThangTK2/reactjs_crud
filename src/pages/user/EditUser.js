import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading ] = useState(false);
  const [error, setError ] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    EditUser() // gọi lại function để thực thi
  }, []);

  const EditUser = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:3000/users/${id}`)
      const { status } = res
      if (status === 200) {
        setName(res.data.name)
        setEmail(res.data.email)
        setPhone(res.data.phone)
        setLoading(false)
        toast.success('Edit user successfully')
      }
      console.log("edit user: ", res)
    } catch (error) {
      setError(true)
      toast.error("Edit user error!!!")
    }
  }

  const data = {
    name: name,
    email: email,
    phone: phone,
  };

  const handleUpdateUser = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.put(`http://localhost:3000/users/${id}`, data)
      const { status } = res
      if (status === 200) {
        setLoading(false)
        navigate("/")
        toast.success('Update user successfully')
      }
      console.log("create user: ", res)
    } catch (error) {
      setError(true)
      toast.error("Update user error!!!")
    }
  }
  
  return (
    <>
      {loading && 'Loading...'}
      {error && 'Something went wrong!!!'}
      <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
        <h2 className="text-2xl font-bold">User Details</h2>
        <form className="w-[50%] h-full flex flex-col mt-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
            type="text"
            placeholder="Enter your name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
            type="phone"
            placeholder="Enter your phone no."
          />
          <button className="bg-pink-300 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4 rounded-md"
            type="submit"
            onClick={handleUpdateUser}
          >
            UPDATE USER
          </button>
        </form>
      </div>
    </>
  );
}

export default EditUser;