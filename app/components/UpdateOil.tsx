import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
interface Props {
  provinceOil: string;
  litersOil: number;
  priceOil: number;
    licenseprops: string;
}

function UpdateOil({ provinceOil, litersOil, priceOil , licenseprops}: Props) {
    const [data, setData] = useState([]);
    const [idLicense, setIdLicense] = useState<string | number | undefined >("");
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
        
        console.log(data[0].id );
      
      };
      fetchData();
    }, []);
    
    const handleSubmit = (event: {
        preventDefault: () => void;
        target: {
         
          เลขไมล์เติมน้ำมัน: { value: number | null };
          การเติมน้ำมันสถานีบริการ: { value: string | null };
          การเติมน้ำมันจังหวัด: { value: string | null };
          การเติมน้ำมันราคา: { value: number | null };
          การเติมน้ำมันจำนวน: { value: number | null };
        };
      }) => {
        event.preventDefault();
    
        const dataUpdate = {
         
          เลขไมล์เติมน้ำมัน: event.target.เลขไมล์เติมน้ำมัน.value || null,
          การเติมน้ำมันสถานีบริการ: event.target.การเติมน้ำมันสถานีบริการ.value || null,
          การเติมน้ำมันจังหวัด: event.target.การเติมน้ำมันจังหวัด.value + "," + provinceOil || null,
          การเติมน้ำมันราคา: (Number(event.target.การเติมน้ำมันราคา.value) || 0) + priceOil || null,
          การเติมน้ำมันจำนวน: (Number(event.target.การเติมน้ำมันจำนวน.value) || 0) + litersOil || null,
        };
    
        console.log(dataUpdate);
    
        fetch(`http://localhost:4000/carsform/${idLicense}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUpdate),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            alert(data.message);
            if (data.status === 200) {
              console.log(data.message);
              window.location.href = "/user";
            }
          })
          .catch((err) => {
            console.log(err);
          });
    
    
      };

  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <h1>{item.id}</h1>
          <h1> {item.เลขทะเบียนรถ}</h1>
          <h1> {item.เลขไมล์เติมน้ำมัน}</h1>
        </div>
      ))}
      <form
        className="flex flex-col items-center justify-center p-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center p-4 ">
          <h1>Update การเติมน้ำมัน</h1>
          <div>
            <label className="form-label">เลขไมล์เติมน้ำมัน</label>
            <input
              type="text"
              placeholder="เลขไมล์เติมน้ำมัน"
              id="เลขไมล์เติมน้ำมัน"
              name="เลขไมล์เติมน้ำมัน"
              // value={}
            />
          </div>

          <div>
            <label className="form-label">สถานีบริการ</label>
            <input
              type="text"
              placeholder="ปตท. , บางจาก"
              id="การเติมน้ำมันสถานีบริการ"
              name="การเติมน้ำมันสถานีบริการ"
              value={"ปตท."}
            />
          </div>
          <div>
            <label className="form-label">สถานที่จังหวัด</label>
            <input
              type="text"
              placeholder="สถานที่จังหวัด"
              id="การเติมน้ำมันจังหวัด"
              name="การเติมน้ำมันจังหวัด"
            />
          </div>
          <div>
            <label className="form-label">ราคา(บาท)</label>
            <input
              type="text"
              placeholder="การเติมน้ำมันราคา"
              id="การเติมน้ำมันราคา"
              name="การเติมน้ำมันราคา"
            />
          </div>

          <div>
            <label className="form-label">การเติมน้ำมันจำนวน(ลิตร)</label>
            <input
              type="text"
              placeholder="การเติมน้ำมันจำนวน"
              id="การเติมน้ำมันจำนวน"
              name="การเติมน้ำมันจำนวน"
              // value={}
            />
          </div>
        </div>

        <Button variant="text" color="primary" type="submit">
          update เติมน้ำมัน
        </Button>
      </form>
    </div>
  );
}

export default UpdateOil;
