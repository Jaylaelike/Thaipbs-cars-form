/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./NavBar";

const User = () => {
  const { data: session } = useSession();
  console.log(session);

  const [imageUrl, setImageUrl] = useState(null);

  const employeeId = session?.user?.employeeId;
  console.log(employeeId);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:5400/api/employee/code/${employeeId}`
      );
      setImageUrl(result.data.image_url);

      console.log(result.data.image_url);
    };
    fetchData();
  }, [employeeId]);

  // return  <pre>{JSON.stringify(session)}</pre>

  return (
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="avatar online">
        <div className="w-10 rounded-full">
          <img alt="userAvatar" src={imageUrl ? imageUrl : ""} />
        </div>
      </div>
    </div>
  );
};

export default User;
