"use client";
import { Button } from "../../app/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

function UserAcountNav() {
  return (
    <>
      <Button
        onClick={() =>
          signOut({
            callbackUrl: `${window.location.origin}/sign-in`,
            redirect: true,
          })
        }
        variant="destructive"
      >
        Sign Out
      </Button>
    </>
  );
}

export default UserAcountNav;
