// /* eslint-disable react-hooks/rules-of-hooks */
// "use client";

// import React, { useEffect, useState } from "react";
// // import fetchDataTable from "../api/fetchData";
// import Link from "next/link";
// import { Button, Tab } from "@mui/material";
// import { authOptions } from "@/app/lib/auth";
// import { getServerSession } from "next-auth";

// import TableStatus from "../../components/TableStatus";

// type data = {
//   id: number;
//   เลขทะเบียนรถ: string;
//   วันที่เดินทางไป: string;
//   วันที่เดินทางกลับ: string;
//   รายละเอียดของงาน: string;
//   สถานที่ต้นทาง: string;
//   สถานที่ปลายทาง: string;
//   ระยะทาง: string;
//   เลขไมค์ไป: string;
//   เลขไมค์กลับ: string;
//   เลขไมค์ระยะรวม: string;
//   เลขไมล์เติมน้ำมัน: string;
//   การเติมน้ำมันจำนวน: string;
//   การเติมน้ำมันราคา: string;
//   การเติมน้ำมันสถานีบริการ: string;
//   การเติมน้ำมันจังหวัด: string;
//   ผู้ใช้รถ: string;
//   ผู้ขับรถ: string;
//   Status: string;
// };

// // eslint-disable-next-line @next/next/no-async-client-component
// const page = async () => {
//   const session = await getServerSession(authOptions);
//   console.log(session);
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   // const [data, setData] = useState([]);

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   // useEffect(() => {
//   //   fetchDataTable().then((res) => {
//   //     console.log(res.props.data);

//   //     setData(res.props.data);
//   //   });
//   // }, []);

//   // const handelDelete = (id: number) => {
//   //   fetch(`http://localhost:4000/carsform/${id}`, {
//   //     method: "DELETE",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //   }).then((res) => {
//   //     if (res.ok) {
//   //       if (window.confirm(`คุณต้องการจะลบ ${id} ใช่ไหม?`)) {
//   //         fetch(`http://localhost:4000/carsform/${id}`, {
//   //           method: "DELETE",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //           },
//   //         }).then((res) => {
//   //           if (res.ok) {
//   //             alert(`ลบข้อมูล ${id} สำเร็จ`);
//   //             window.location.reload();
//   //           } else {
//   //             alert("Delete fail");
//   //           }
//   //         });
//   //       }
//   //     } else {
//   //       alert("Delete fail");
//   //     }
//   //   });
//   // };

//   if (session?.user) {
//     return (
//       <div>
//         <h2 className="text-2xl">
//           Admin Page - welcome back {session?.user?.name}
//         </h2>
//         <h3 className="text-2xl">Email: {session?.user?.email}</h3>

//         <div className="items-center justify-center overflow-x-auto pl-8 pr-8">
//           <TableStatus />

//           <Button variant="text" color="primary">
//             <Link href="/user/create">Create data</Link>
//           </Button>
//         </div>

//         {/* <ul>
//         {data.map((item: data) => (
//           <li key={item.id}>
//             {item.เลขทะเบียนรถ} {item.วันที่เดินทางไป} {item.วันที่เดินทางกลับ}{" "}
//             {item.รายละเอียดของงาน} {item.สถานที่ต้นทาง} {item.สถานที่ปลายทาง}{" "}
//             {item.ระยะทาง} {item.เลขไมค์ไป} {item.เลขไมค์กลับ}{" "}
//             {item.เลขไมค์ระยะรวม} {item.เลขไมล์เติมน้ำมัน}{" "}
//             {item.การเติมน้ำมันจำนวน} {item.การเติมน้ำมันราคา}{" "}
//             {item.การเติมน้ำมันสถานีบริการ} {item.การเติมน้ำมันจังหวัด}{" "}
//             {item.ผู้ใช้รถ} {item.ผู้ขับรถ} {item.Status}
//             <Button type="button" color="primary">
//               <Link href={`/user/edit/${item.id}`}>Edit</Link>
//             </Button>
//             <Button
//               type="button"
//               color="primary"
//               onClick={() => {
//                 handelDelete(item.id);
//               }}
//             >
//               Delete
//             </Button>
//           </li>
//         ))}
//       </ul> */}
//       </div>
//     );
//   }
//   return (

//       <div>
//         <h2 className="text-2xl">Please Login to see this admin page</h2>
//       </div>

//   );
// };

// export default page;

// 'use client';
// import TableStatus from '@/app/components/TableStatus'
// import React from 'react'
// import Link from "next/link";
// import { Button, Tab } from "@mui/material";
// import { authOptions } from "@/app/lib/auth";
// import { getServerSession } from "next-auth";

// const  page = async () => {

// return (
//   <TableStatus />
// )
// }

// export default page

import React from "react";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import TableStatus from "@/app/components/TableStatus";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return (
      <>


<div className="grid grid-cols-1 justify-items-center">
          <Card>
        <ScrollArea className="h-[500px] w-auto rounded-md border p-4">
          <TableStatus />
        </ScrollArea>
        </Card>
        </div>
       
      </>
    );
  }

  return (
    <div>
      <h2 className="text-2xl">กรุณา Login เพื่อเข้าใช้งานระบบ</h2>
    </div>
  );
};

export default page;
