import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice"; // adjust path if needed
import { BASE_URL } from "../utils/constants"; // make sure this exists

const Body = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));

      // Navigate based on role AFTER user is added to redux
      const r = res?.data?.role;
      if (r === "registrar") navigate("/registrar");
      else if (r === "judge") navigate("/judge");
      else if (r === "lawyer") navigate("/lawyer");
      else console.error("Unknown role");
    } catch (err) {
      navigate("/login");
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      userProfile();
    }
  }, [user]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
