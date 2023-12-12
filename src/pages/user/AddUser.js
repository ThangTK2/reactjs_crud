import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading ] = useState(false);
  const [error, setError ] = useState(false);

  const navigate = useNavigate();

  const data = {
    name: name,
    email: email,
    phone: phone,
  };

  const AddUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post("http://localhost:3000/users", data)
      const { status } = res
      if (status === 201) {
        setLoading(false)
        navigate("/")
        toast.success('Add user successfully')
      }
      // console.log("create user: ", res)
    } catch (error) {
      setError(true)
      toast.error("Add user error!!!")
    }
  }

  return (
    <>
      {loading && 'Loading...'}
      {error && 'Something went wrong!!!'}
      <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
        <h2 className="text-2xl font-bold">ADD USER</h2>
        <form className="w-[50%] h-full flex flex-col mt-2">
          <input className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />
          <input className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            type="email"
            placeholder="Enter your email"
          />
          <input className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            placeholder="Enter your phone no."
          />
          <button className="bg-pink-300 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4 rounded-md"
            type="submit"
            onClick={AddUser}
          >
            ADD USER
          </button>
        </form>
      </div>
    </>
  )
}

export default AddUser
