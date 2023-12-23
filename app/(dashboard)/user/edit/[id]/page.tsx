"use client";

import { Button } from "@mui/material";

import { useState, useEffect } from "react";

interface User {
  เลขทะเบียนรถ: string;
  วันที่เดินทางไป: string;
  วันที่เดินทางกลับ: string;
  รายละเอียดของงาน: string;
  สถานที่ต้นทาง: string;
  สถานที่ปลายทาง: string;
  เลขไมค์ไป: number;
  เลขไมค์กลับ: number;
  เลขไมค์ระยะรวม: number;
  เลขไมล์เติมน้ำมัน: number;
  การเติมน้ำมันจำนวน: number;
  การเติมน้ำมันราคา: number;
  การเติมน้ำมันสถานีบริการ: string;
  การเติมน้ำมันจังหวัด: string;
  ผู้ใช้รถ: string;
  ผู้ขับรถ: string;
  Status: string;
}

export default function page({ params }: { params: { id: number } }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState({} as User);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    try {
      fetch(`http://localhost:4000/carsform/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Not found id") {
            console.log(data.message);
            alert(`ไม่พบข้อมูลของ id: ${params.id}`);
            window.location.href = "/user";
          }
          setUser(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (  event: {
    preventDefault: () => void;
    target: { 
    เลขทะเบียนรถ: { value: string | null} 
    วันที่เดินทางไป: { value: string | null }
    วันที่เดินทางกลับ: { value: string | null }
    รายละเอียดของงาน: { value: string | null }
    สถานที่ต้นทาง: { value: string | null }
    สถานที่ปลายทาง: { value: string | null }
    เลขไมค์ไป: { value: number | null }
    เลขไมค์กลับ: { value: number | null }
    เลขไมค์ระยะรวม: { value: number | null }
    เลขไมล์เติมน้ำมัน: { value: number | null }
    การเติมน้ำมันจำนวน: { value: number | null }
    การเติมน้ำมันราคา: { value: number | null }
    การเติมน้ำมันสถานีบริการ: { value: string | null }
    การเติมน้ำมันจังหวัด: { value: string | null }
    ผู้ใช้รถ: { value: string | null }
    ผู้ขับรถ: { value: string | null }
    Status: { value: string | null }



  };
  }) => {
    event.preventDefault();

    const data = {
      "เลขทะเบียนรถ": event.target.เลขทะเบียนรถ.value || null,
      "วันที่เดินทางไป": event.target.วันที่เดินทางไป.value || null,
      "วันที่เดินทางกลับ": event.target.วันที่เดินทางกลับ.value || null,
      "รายละเอียดของงาน": event.target.รายละเอียดของงาน.value || null,
      "สถานที่ต้นทาง": event.target.สถานที่ต้นทาง.value || null,
      "สถานที่ปลายทาง": event.target.สถานที่ปลายทาง.value || null,
      "เลขไมค์ไป": event.target.เลขไมค์ไป.value || null,
      "เลขไมค์กลับ": event.target.เลขไมค์กลับ.value || null,
      "เลขไมค์ระยะรวม": event.target.เลขไมค์ระยะรวม.value || null,
      "เลขไมล์เติมน้ำมัน": event.target.เลขไมล์เติมน้ำมัน.value || null,
      "การเติมน้ำมันจำนวน": event.target.การเติมน้ำมันจำนวน.value || null,
      "การเติมน้ำมันราคา": event.target.การเติมน้ำมันราคา.value || null,
      "การเติมน้ำมันสถานีบริการ": event.target.การเติมน้ำมันสถานีบริการ.value || null,
      "การเติมน้ำมันจังหวัด": event.target.การเติมน้ำมันจังหวัด.value || null,
      "ผู้ใช้รถ": event.target.ผู้ใช้รถ.value || null,
      "ผู้ขับรถ": event.target.ผู้ขับรถ.value || null,
      "Status": event.target.Status.value || null,
    };
    console.log(data);

    fetch(`http://localhost:4000/carsform/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      
        if (data.status === 200) {
          console.log(data.message);
          alert(`แก้ไขข้อมูลของ id: ${params.id} สำเร็จ`);
          window.location.href = "/user";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <h1>Edit {params.id}</h1>

      <form
        className="flex flex-col items-center justify-center p-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center p-4 ">
          <div>
            <label className="form-label">เลขทะเบียนรถ : </label>
            <input
              type="text"
              placeholder="9กฬ-305"
              id="เลขทะเบียนรถ"
              name="เลขทะเบียนรถ"
              value={user.เลขทะเบียนรถ}
              onChange={(e) => {
                setUser({ ...user, เลขทะเบียนรถ: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">วันที่เดินทางไป : </label>
            <input
              type="text"
              placeholder="วันที่เดินทางไป"
              id="วันที่เดินทางไป"
              name="วันที่เดินทางไป"
              value={user.วันที่เดินทางไป}
              onChange={(e) => {
                setUser({ ...user, วันที่เดินทางไป: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">วันที่เดินทางกลับ : </label>
            <input
              type="text"
              placeholder="วันที่เดินทางกลับ"
              id="วันที่เดินทางกลับ"
              name="วันที่เดินทางกลับ"
              value={user.วันที่เดินทางกลับ}
              onChange={(e) => {
                setUser({ ...user, วันที่เดินทางกลับ: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="form-label">รายละเอียดของงาน : </label>
            <input
              type="text"
              placeholder="รายละเอียดของงาน"
              id="รายละเอียดของงาน"
              name="รายละเอียดของงาน"
              value={user.รายละเอียดของงาน}
              onChange={(e) => {
                setUser({ ...user, รายละเอียดของงาน: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">สถานที่ต้นทาง : </label>
            <input
              type="text"
              placeholder="สถานที่ต้นทาง"
              id="สถานที่ต้นทาง"
              name="สถานที่ต้นทาง"
              value={user.สถานที่ต้นทาง}
              onChange={(e) => {
                setUser({ ...user, สถานที่ต้นทาง: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">สถานที่ปลายทาง : </label>
            <input
              type="text"
              placeholder="สถานที่ปลายทาง"
              id="สถานที่ปลายทาง"
              name="สถานที่ปลายทาง"
              value={user.สถานที่ปลายทาง}
              onChange={(e) => {
                setUser({ ...user, สถานที่ปลายทาง: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="form-label">เลขไมค์ไป : </label>
            <input
              type="text"
              placeholder="เลขไมค์ไป"
              id="เลขไมค์ไป"
              name="เลขไมค์ไป"
              value={user.เลขไมค์ไป} 
              onChange={(e) => {
                setUser({ ...user, เลขไมค์ไป: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">เลขไมค์กลับ : </label>
            <input
              type="text"
              placeholder="เลขไมค์กลับ"
              id="เลขไมค์กลับ"
              name="เลขไมค์กลับ"
              value={user.เลขไมค์กลับ}  
              onChange={(e) => {
                setUser({ ...user, เลขไมค์กลับ: e.target.value  });
              }}
            />
          </div>
          <div>
            <label className="form-label">เลขไมค์ระยะรวม : </label>
            <input
              type="text"
              placeholder="เลขไมค์ระยะรวม"
              id="เลขไมค์ระยะรวม"
              name="เลขไมค์ระยะรวม"
              value={user.เลขไมค์ระยะรวม}
              onChange={(e) => {
                setUser({ ...user, เลขไมค์ระยะรวม: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">เลขไมล์เติมน้ำมัน : </label>
            <input
              type="text"
              placeholder="เลขไมล์เติมน้ำมัน"
              id="เลขไมล์เติมน้ำมัน"
              name="เลขไมล์เติมน้ำมัน"
              value={user.เลขไมล์เติมน้ำมัน}
              onChange={(e) => {
                setUser({ ...user, เลขไมล์เติมน้ำมัน: e.target.value  });
              }}
            />
          </div>
          <div>
            <label className="form-label">การเติมน้ำมันจำนวน : </label>
            <input
              type="text"
              placeholder="การเติมน้ำมันจำนวน"
              id="การเติมน้ำมันจำนวน"
              name="การเติมน้ำมันจำนวน"
              value={user.การเติมน้ำมันจำนวน}
              onChange={(e) => {
                setUser({ ...user, การเติมน้ำมันจำนวน: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">การเติมน้ำมันราคา : </label>
            <input
              type="text"
              placeholder="การเติมน้ำมันราคา"
              id="การเติมน้ำมันราคา"
              name="การเติมน้ำมันราคา"
              value={user.การเติมน้ำมันราคา}
              onChange={(e) => {
                setUser({ ...user, การเติมน้ำมันราคา:e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">การเติมน้ำมันสถานีบริการ : </label>
            <input
              type="text"
              placeholder="การเติมน้ำมันสถานีบริการ"
              id="การเติมน้ำมันสถานีบริการ"
              name="การเติมน้ำมันสถานีบริการ"
              value={user.การเติมน้ำมันสถานีบริการ}
              onChange={(e) => {
                setUser({ ...user, การเติมน้ำมันสถานีบริการ: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="form-label">การเติมน้ำมันจังหวัด : </label>
            <input
              type="text"
              placeholder="การเติมน้ำมันจังหวัด"
              id="การเติมน้ำมันจังหวัด"
              name="การเติมน้ำมันจังหวัด"
              value={user.การเติมน้ำมันจังหวัด}
              onChange={(e) => {
                setUser({ ...user, การเติมน้ำมันจังหวัด: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">ผู้ใช้รถ : </label>
            <input
              type="text"
              placeholder="ผู้ใช้รถ"
              id="ผู้ใช้รถ"
              name="ผู้ใช้รถ"
              value={user.ผู้ใช้รถ}
              onChange={
                (e) => {
                setUser({ ...user, ผู้ใช้รถ: e.target.value });

              }

              }
        
            />
          </div>
          <div>
            <label className="form-label">ผู้ขับรถ : </label>
            <input
              type="text"
              placeholder="ผู้ขับรถ"
              id="ผู้ขับรถ"
              name="ผู้ขับรถ"
              value={user.ผู้ขับรถ}
              onChange={(e) => {
                setUser({ ...user, ผู้ขับรถ: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="form-label">Status : </label>
            <input
              type="text"
              placeholder="Status"
              id="Status"
              name="Status"
              value={user.Status}
              onChange={(e) => {
                setUser({ ...user, Status: e.target.value });
              }}
            />
          </div>
        </div>

        <Button variant="text" color="primary" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}
