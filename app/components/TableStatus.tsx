'use client';
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";

interface Status {
  id: number;
  Car: string;
  Status: string;

  ต้นทาง: string;
  ปลายทาง: string;
  รายละเอียดการใช้งาน: string;
  ผู้ใช้รถ: string;
  Section: string;
}

function TableStatus() {
  const [status, setStatus] = React.useState<Status[]>([]);
  const [license, setLicense] = React.useState<number>(0);

  const [selectLicense, setSelectLicense] = React.useState<string | null>(null);
  const [checkStatus, setCheckStatus] = React.useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_CARSFORM_LICENSE_URL as string);
      const data = await response.json();

      setCheckStatus(data && data.map((data: any) => data.Status));
      console.log(data && data.map((data: any) => data.Status));

      setStatus(data);
      console.log(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_MILES_CHECK_URL + `${selectLicense}`
      );
      const data = await response.json();

      setLicense((data && data[0] && data[0].id) || null);
      console.log((data && data[0] && data[0].id) || null);
    };

    fetchData();
  }, [selectLicense]);

  const handleClick = (car: string) => {
    setSelectLicense(car);
  };

  const router = useRouter();

  const handleClose = () => {
    router.push(`/user/edit-license-create/${license}`);
  };

  return (
    <div>
      <h1>Table Cars Status</h1>

      <div className="overflow-x-auto grid grid-cols-1">
        <table className="table table-xs table-pin-rows table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th></th>

              <th>Status</th>
              <th>sections</th>
              <th>ต้นทาง</th>
              <th>ปลายทาง</th>
              <th>รายละเอียดการใช้งาน</th>
              <th>ผู้ใช้รถ</th>
            </tr>
          </thead>
          <tbody>
            {status.map((status: Status) => (
              <tr key={status.id}>
                <td>
                  <button
                    type="button"
                    className={`btn ${
                      status.Status === "ใช้งาน" ? "btn-warning" : "btn-primary"
                    }`}
                    
                    onClick={() => {
                      handleClick(status.Car);
                      const modalElement = document.getElementById(
                        "my_modal_1"
                      ) as HTMLDialogElement | null;
                      if (modalElement) {
                        modalElement.showModal();
                      }
                    }}
                    
                  >
                    {status.Car}
                  </button>

                  
                </td>
                

                <td>{status.Status}</td>
                <td>{status.Section}</td>
                <td>{status.ต้นทาง}</td>
                <td>{status.ปลายทาง}</td>
                <td>{status.รายละเอียดการใช้งาน}</td>
                <td>{status.ผู้ใช้รถ}</td>

                <td>
                  {/* <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClose}
                  >
                    แก้ไข
                  </button>

                  <button type="button" className="btn btn-danger">
                    ลบ
                  </button> */}

                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h2 className="text-lg">
                        คุณต้องการจะแก้ไขรถ : {selectLicense}
                      </h2>
                      <p>คุณต้องการจะแก้ไขรถ id : {license}</p>
                      <div className="modal-action">
                        <button className="btn" onClick={handleClose}>
                          เพิ่มข้อมูล
                        </button>
                      </div>
                    </div>
                  </dialog>
                </td>

                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableStatus;
