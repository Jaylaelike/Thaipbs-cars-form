import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./components/ui/button";

import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import User from "./components/User";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-10">
      <Image
        src="https://res.cloudinary.com/satjay/image/upload/v1703229021/dfbrj76awk9ohhktymda.png"
        alt="Logo"
        width={300}
        height={300}
        priority
      />
 
      <Link className={buttonVariants()} href="/user">
        ไปหน้า เพิ่มข้อมูล
      </Link>

      
      <h2 className="text-3xl font-bold">Welcome to user page</h2>
      <User />
   

      <pre>{JSON.stringify(session)}</pre>
      
    </div>
  );
}
