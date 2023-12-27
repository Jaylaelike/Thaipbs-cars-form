/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import dayjs from "dayjs";
import OilAdditon from "@/app/components/OilAdditon";
import CloseCarsJobs from "@/app/components/CloseCarsJobs";

import UpdateOil from "@/app/components/UpdateOil";

const superSections: string[] = ["สำนักวิศวกรรม"];

function page() {
  const [options, setOptions] = React.useState<string[]>(["เลือกทั้งหมด"]);

  const [sections, setSections] = React.useState<string[]>(["เลือกทั้งหมด"]);

  const [selectedsections, setSelectedsections] = React.useState<string | null>(
    "เลือกทั้งหมด"
  );
  const [selectedDivitions, setSelecteDivitions] = React.useState<
    string | null
  >("เลือกทั้งหมด");

  const [selectedlicense, setSelecteLicense] = React.useState<string | null>(
    "เลือกทั้งหมด"
  );
  const [getlicnese, setLicense] = React.useState<string[]>(["เลือกทั้งหมด"]);

  //set status from license for get data for check before insrt to database
  const [status, setStatus] = React.useState<string[]>([""]);
  const [selcectedStatus, setSelcectedStatus] = React.useState<string | null>(
    ""
  );

  const [milesStarts, setMilesStarts] = React.useState<string | null>("");

  const [dataSetCheck, setDataCheck] = React.useState<string[]>([]);

  const [getStateOil, setStateOil] = React.useState<string | null>("");

  const [getPriceOil, setPriceOil] = React.useState<number | null>(null);
  const [getAmountOilLiters, setAmountOilLiters] = React.useState<
    number | null
  >(null);
  const [getStationOilProvice, setStationOilProvice] = React.useState<
    string | null
  >(null);

  //fetch Status from license for get data for check before insert to database
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.LICENSE_CHECK_URL + `${selcectedStatus}`
      );
      const data = await response.json();
      setStatus(data.map((item: { Status: string }) => item.Status));

      console.log(data);
      console.log(data.map((item: { Status: string }) => item.Status));
      console.log(
        data.map((item: { เลขไมค์กลับ: string }) => item.เลขไมค์กลับ)
      );
    };
    fetchData();
  }, [selcectedStatus]);

  //fetch เลขไมค์กลับ from carforms for get data for check before insrt to database
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.MILES_CHECK_URL +`${selcectedStatus}`
      );
      const data = await response.json();
      setMilesStarts(
        data.map((item: { เลขไมค์กลับ: string }) => item.เลขไมค์กลับ)
      );

      setAmountOilLiters(Number(data?.[0]?.การเติมน้ำมันจำนวน) || 0);
      console.log(Number(data?.[0]?.การเติมน้ำมันจำนวน) || 0);

      setPriceOil(Number(data?.[0]?.การเติมน้ำมันราคา) || 0);

      console.log(Number(data?.[0]?.การเติมน้ำมันราคา) || 0);

      (data && data[0] && data[0].id) || undefined;
      setStationOilProvice(
        (data && data[0] && data[0].การเติมน้ำมันจังหวัด) || null || undefined
      );
      console.log(
        (data && data[0] && data[0].การเติมน้ำมันจังหวัด) || null || undefined
      );

      console.log(data);
      console.log(
        data.map((item: { เลขไมค์กลับ: string }) => item.เลขไมค์กลับ)
      );
    };
    fetchData();
  }, [selcectedStatus]);

  //check status for get data for check before insrt to database
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.LICENSE_CHECK_URL + `${selcectedStatus}`
      );
      const data = await response.json();
      setStatus(data.map((item: { Status: string }) => item.Status));
      console.log(`statusPrime is ${status}`);

      console.log(`status is ${dataSetCheck}`);
      console.log(data.map((item: { Status: string }) => item.Status));
      setDataCheck(data.map((item: { Status: string }) => item.Status));
    };

    fetchData();
  }, [selcectedStatus, getlicnese]);

  // useEffect(() => {
  //   prevDataSetCheck.current = dataSetCheck;
  // }, [dataSetCheck]); // This runs whenever dataSetCheck changes

  // // Now you can use prevDataSetCheck.current to access the previous state
  // console.log(prevDataSetCheck.current);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
      process.env.CARS_DEPARTMENT_URL + `${superSections}`
      );
      const data = await response.json();
      setOptions(data.map((item: { Divition: string }) => item.Divition));
      console.log(data.map((item: { Divition: string }) => item.Divition));
    };
    fetchData();
  }, [superSections]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.CARS_DEPARTMENT_URL + `${selectedDivitions}/${selectedsections}`
      );
      const data = await response.json();
      setSections(data.map((item: { Section: string }) => item.Section));
      console.log(data.map((item: { Section: string }) => item.Section));
    };
    fetchData();
  }, [selectedDivitions, selectedsections]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
       process.env.LICENSE_URL + `${selectedlicense}`
      );
      const data = await response.json();
      setLicense(data.map((item: { Car: string }) => item.Car));
      console.log(data.map((item: { Car: string }) => item.Car));
    };
    fetchData();
  }, [selectedlicense]);

  const handleSubmit = (event: {
    preventDefault: () => void;
    target: {
      เลขทะเบียนรถ: { value: string | null };
      วันที่เดินทางไป: { value: string | null };

      รายละเอียดของงาน: { value: string | null };
      สถานที่ต้นทาง: { value: string | null };
      สถานที่ปลายทาง: { value: string | null };
      เลขไมค์ไป: { value: number | null };

      ผู้ใช้รถ: { value: string | null };
      ผู้ขับรถ: { value: string | null };
      Status: { value: string | null };
    };
  }) => {
    event.preventDefault();

    const dataInsert = {
      เลขทะเบียนรถ: event.target.เลขทะเบียนรถ.value || null,
      วันที่เดินทางไป: event.target.วันที่เดินทางไป.value || null,

      รายละเอียดของงาน: event.target.รายละเอียดของงาน.value || null,
      สถานที่ต้นทาง: event.target.สถานที่ต้นทาง.value || null,
      สถานที่ปลายทาง: event.target.สถานที่ปลายทาง.value || null,
      เลขไมค์ไป: event.target.เลขไมค์ไป.value || null,

      ผู้ใช้รถ: event.target.ผู้ใช้รถ.value || null,
      ผู้ขับรถ: event.target.ผู้ขับรถ.value || null,
      Status: event.target.Status.value || null,
    };

    const dataUpdate = {
      Section: selectedlicense,
      Car: selcectedStatus,
      ต้นทาง: event.target.สถานที่ต้นทาง.value || null,
      ปลายทาง: event.target.สถานที่ปลายทาง.value || null,
      รายละเอียดการใช้งาน: event.target.รายละเอียดของงาน.value || null,
      ผู้ใช้รถ: event.target.ผู้ใช้รถ.value || null,
      Status: event.target.Status.value || null,
    };

    console.log(dataInsert);
    console.log(dataUpdate);

    Promise.all([
      fetch(process.env.CARSFORM_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataInsert),
      }),
      fetch(process.env.CARSFORM_LICENSE_URL +`${selcectedStatus}`, {
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
    <>
      <h1 className="text-center">เพิ่มข้อมูลต้นทาง</h1>
      <div className="p-3 flex flex-auto justify-items-center">
        <Autocomplete
          placeholder="เลือกสำนัก"
          options={superSections}
          onChange={(event, value) => {
            setSelecteDivitions(value);
            console.log(value);
          }}
          sx={{ width: 300 }}
        />
        <Autocomplete
          placeholder="เลือกส่วนงานภูมิภาค"
          options={
            selectedDivitions === "เลือกทั้งหมด"
              ? options
              : ["เลือกทั้งหมด", ...options]
          }
          onChange={(event, value) => setSelectedsections(value)}
          sx={{ width: 300 }}
        />
        <Autocomplete
          placeholder="เลือกส่วนงาน"
          options={
            selectedsections === "เลือกทั้งหมด"
              ? sections
              : ["เลือกทั้งหมด", ...sections]
          }
          onChange={(event, value) => {
            setSelecteLicense(value);
            console.log(value);
          }}
          sx={{ width: 300 }}
        />
        <Autocomplete
          placeholder="เลือกส่วนงาน"
          options={
            selectedlicense === "เลือกทั้งหมด"
              ? getlicnese
              : ["เลือกทั้งหมด", ...getlicnese]
          }
          onChange={(event, value) => {
            value;
            setSelcectedStatus(value);

            console.log(value);
          }}
          sx={{ width: 300 }}
        />
      </div>

      {dataSetCheck[0] === "Stand By" ? (
        <div>
          <h1>{`Status is ${dataSetCheck} Please select again`}</h1>
          <form
            className="flex flex-col items-center justify-center p-4 "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center justify-center p-4 ">
              <div>
                <label className="form-label">เลขทะเบียนรถ</label>
                <input
                  type="text"
                  placeholder="9กฬ-305"
                  id="เลขทะเบียนรถ"
                  name="เลขทะเบียนรถ"
                  value={selcectedStatus || undefined}
                />
              </div>
              <div>
                <label className="form-label">วันที่เดินทางไป</label>
                <input
                  type="text"
                  placeholder="วันที่เดินทางไป"
                  id="วันที่เดินทางไป"
                  name="วันที่เดินทางไป"
                  value={dayjs().format("YYYY-MM-DD")}
                />
              </div>

              <div>
                <label className="form-label">รายละเอียดของงาน</label>
                <input
                  type="text"
                  placeholder="รายละเอียดของงาน"
                  id="รายละเอียดของงาน"
                  name="รายละเอียดของงาน"
                />
              </div>
              <div>
                <label className="form-label">สถานที่ต้นทาง</label>
                <input
                  type="text"
                  placeholder="สถานที่ต้นทาง"
                  id="สถานที่ต้นทาง"
                  name="สถานที่ต้นทาง"
                />
              </div>
              <div>
                <label className="form-label">สถานที่ปลายทาง</label>
                <input
                  type="text"
                  placeholder="สถานที่ปลายทาง"
                  id="สถานที่ปลายทาง"
                  name="สถานที่ปลายทาง"
                />
              </div>

              <div>
                <label className="form-label">เลขไมค์ไป</label>
                <input
                  type="text"
                  placeholder="เลขไมค์ไป"
                  id="เลขไมค์ไป"
                  name="เลขไมค์ไป"
                  value={milesStarts || undefined}
                />
              </div>

              <div>
                <label className="form-label">ผู้ใช้รถ</label>
                <input
                  type="text"
                  placeholder="ผู้ใช้รถ"
                  id="ผู้ใช้รถ"
                  name="ผู้ใช้รถ"
                />
              </div>
              <div>
                <label className="form-label">ผู้ขับรถ</label>
                <input
                  type="text"
                  placeholder="ผู้ขับรถ"
                  id="ผู้ขับรถ"
                  name="ผู้ขับรถ"
                />
              </div>
              <div>
                <label className="form-label">Status</label>
                <input
                  type="text"
                  placeholder="Status"
                  id="Status"
                  name="Status"
                  value={"ใช้งาน"}
                />
              </div>
            </div>

            <Button variant="text" color="primary" type="submit">
              submit
            </Button>
          </form>
        </div>
      ) : dataSetCheck[0] === "ใช้งาน" ? (
        <div className="flex flex-col items-center justify-center gap-5 mt-10">
          <h1>{`Status is ${dataSetCheck} Please select again`}</h1>
          <Autocomplete
            placeholder="เติมน้ำมัน"
            options={["เติมน้ำมัน", "ปิดเลขไมล์"]}
            onChange={(event, value) => {
              value;
              setStateOil(value);
              console.log(value);
            }}
            sx={{ width: 300 }}
          />
          {getStateOil === "เติมน้ำมัน" ? (
            <div>
              {getPriceOil === 0 && getAmountOilLiters === 0  ? (
                <OilAdditon licenseprops={selcectedStatus || ""} />
              ) : (
                <div>
                  <h1>เติมน้ำมันแล้ว</h1>
                  <UpdateOil
                    provinceOil={getStationOilProvice || ""}
                    litersOil={Number(getAmountOilLiters) || 0}
                    priceOil={Number(getPriceOil) || 0}
                    licenseprops={selcectedStatus || ""}
                  />
                </div>
              )}
            </div>
          ) : getStateOil === "ปิดเลขไมล์" ? (
            <div>
              <CloseCarsJobs licenseprops={selcectedStatus || ""} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default page;

// export async function getServerSideProps() {

//   const res = await createData(

//   );

//   return { props: { res }};
// }
