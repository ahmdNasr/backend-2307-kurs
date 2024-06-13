// import { useState } from "react";
import { postRegistration } from "../utils/api";
// import { useShopState } from "../zustand";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // const [name, setName] =
  const navigate = useNavigate()
  const handleSubmit = async (event) =>{
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const result = await postRegistration(formData)
    if (result.ok) {
      form.reset()
      navigate('/login')
    } else {
      console.log(result)
    }
  }
  

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <label>
        First name
        <input className="bg-gray-100" type="text" name="firstname" />
      </label>
      <br />
      <label>
        Last name
        <input className="bg-gray-100" type="text" name="lastname" />
      </label>
      <br />
      <label>
        Email
        <input className="bg-gray-100" type="text" name="email" />
      </label>
      <br />
      <label>
        Password
        <input className="bg-gray-100" type="password" name="password" />
      </label>
      <br />
      <label>
        Profile Image
        <input className="" type="file" name="image" />
      </label>
      <br />
      <button className="bg-green-600 text-white p-4" type="submit">Register!</button>
    </form>
  );
};

export default RegisterPage;
