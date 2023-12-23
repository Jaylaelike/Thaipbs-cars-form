import { Button } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

import { useEffect, useState } from "react";
interface Props {
  licenseprops: string;
}

function CloseCarsJobs({ licenseprops }: Props) {
  const [data, setData] = useState([]);
  const [idLicense, setIdLicense] = useState("");
  const [selcectedDesinations, setSelcectedDesinations] = useState("");

  const [goMiles, setGoMiles] = useState<number | null>(0)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5500/api/miles/check/update/${licenseprops}`
      );
      const data = await response.json();
      setData(data);
      console.log(data);
      console.log();
      setIdLicense(data && data[0] && data[0].id || undefined);
      setSelcectedDesinations(data && data[0] && data[0].สถานที่ปลายทาง || undefined);

      setGoMiles(data && data[0] && data[0].เลขไมค์ไป || undefined);
      console.log(data && data[0] && data[0].เลขไมค์ไป || undefined);
      
     
      console.log("idLicense", idLicense);
      console.log("selcectedDesinations", selcectedDesinations);
      
    };
    fetchData();
  }, [licenseprops]);

 


  const handleSubmit = (event: {
    preventDefault: () => void;
    target: {
      เลขไมค์กลับ: { value: number | null };

      สถานที่ปลายทาง: { value: string | null };
     
      Status: { value: string | null };

      วันที่เดินทางกลับ: { value: string | null };
      ปลายทาง: { value: string | null };
      รายละเอียดการใช้งาน: { value: string | null };
      เลขไมค์ระยะรวม: { value: number | null };
      

    };
  }) => {
    event.preventDefault();

    // update carsform table
    const dataUpdate = {
      เลขไมค์กลับ: event.target.เลขไมค์กลับ.value || null,
      วันที่เดินทางกลับ: event.target.วันที่เดินทางกลับ.value || null,
      เลขไมค์ระยะรวม: (event.target.เลขไมค์กลับ.value !== null && goMiles !== null) ? event.target.เลขไมค์กลับ.value - goMiles : null,
      Status: "Stand By" || null,
    };
    // update license table
    const dataStatusUpdate = {

      ต้นทาง: null,
      ผู้ใช้รถ: null,
      Status: "Stand By" || null,
      ปลายทาง: null,
      รายละเอียดการใช้งาน: `จอดอยู่ที่ ${selcectedDesinations}` || null,
    }

    console.log(dataUpdate);
    console.log(dataStatusUpdate);
    

      Promise.all([
        //update license table
        fetch(`http://localhost:4000/license/${licenseprops}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataStatusUpdate),
        }),
        //update carsform table
        fetch(`http://localhost:4000/carsform/${idLicense}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUpdate),
        }),
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => {
          console.log(data1);
          console.log(data2);
          alert(data1.message);
          alert(data2.message);
          if (data1.status === 200 && data2.status === 200) {
            console.log(data1.message);
            console.log(data2.message);
            window.location.href = "/user";
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div>
      <h1>ปิดเลขไมล์ปลายทาง รถทะเบียน: {licenseprops}</h1>
      {data.map((item: any) => (
        <div key={item.id}>
          <h1>{item.id}</h1>
          <h1> {item.เลขทะเบียนรถ}</h1>
          <h1>เลขไมล์ไป {item.เลขไมค์ไป}</h1>
          <h1>เลขไมล์เติมน้ำมัน {item.เลขไมล์เติมน้ำมัน}</h1>
        </div>
      ))}
      <form
        className="flex flex-col items-center justify-center p-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center p-4 ">
        <div>
            <label className="form-label">วันที่เดินทางกลับ</label>
            <input
              type="text"
              id="วันที่เดินทางกลับ"
              name="วันที่เดินทางกลับ"
              value={dayjs().format("YYYY-MM-DD")}
             
            />
          </div>
          <div>
            <label className="form-label">เลขไมค์กลับ</label>
            <input
              type="text"
              placeholder=" เลขไมค์กลับ"
              id="เลขไมค์กลับ"
              name="เลขไมค์กลับ"
              // value={}
            />
          </div>
        </div>

        <Button variant="text" color="primary" type="submit">
          update ปิดเลขไมล์
        </Button>
      </form>
    </div>
  );
}

export default CloseCarsJobs;
