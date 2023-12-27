"use client";
import { Button } from '../../app/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react'


function UserAcountNav() {

  return (
    <>
     <Button onClick={()=> signOut({
        callbackUrl: 'http://172.16.202.63:3000/sign-in',
        redirect: true,
     })} variant='destructive'>Sign Out</Button>
    </>
   
  )
}

export default UserAcountNav
