/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import React from "react";


const User = () => {
  const { data: session } = useSession();
  console.log(session);



  // return  <pre>{JSON.stringify(session)}</pre>

  return (
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="avatar online">
        <div className="w-10 rounded-full">
          <img alt="userAvatar" src={session?.user?.image_url} />
        </div>
      </div>
    </div>
  );
};

export default User;
