/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */

import Link from "next/link";

import { CarTaxiFront } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

import UserAcountNav from "./userAcountNav";
import { buttonVariants } from "./ui/button";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className=" bg-zinc-100  border-b border-s-zinc-200 fixed w-full z-0 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/user">
          <div className="p-3">
            <CarTaxiFront />
          </div>
        </Link>

        {session?.user ? (
          <div className="flex flex-nowrap">

            <div className="grid grid-row justify-between">
            <h4 className="text-base ">
              ยินดีต้อนรับ : {session?.user?.name}
            </h4>
            <h4 className="text-base">
            รหัสพนักงาน : {session?.user?.employeeId}
            </h4>
            </div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img
                    alt="userAvatar"
                    src={session?.user?.image_url}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {session?.user ? (
          <UserAcountNav />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
