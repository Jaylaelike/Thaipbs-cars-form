import dayjs from "dayjs";
import React from "react";

import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { format, set } from "date-fns";
import { useToast } from '@/components/ui/use-toast';

interface Props {
  licensPropsProductions: string;
}

const postFormSchema = z.object({
  เลขไมค์กลับ: z.string().min(1, { message: "กรุณากรอกเลขไมค์" }),
  วันที่เดินทางกลับ: z.string().nullable(),
  Status: z.string().nullable(),
});

function CloseCarsJobs({ licensPropsProductions }: Props) {
  const router = useRouter();
  const { toast } = useToast()
  const [data, setData] = useState([]);
  const [idLicense, setIdLicense] = useState("");
  const [selcectedDesinations, setSelcectedDesinations] = useState("");
  const [stringDate, setStringDate] = useState<string>(
    dayjs().format("YYYY-MM-DD") || ""
  );

  // const [calculateDistanceMiles, setCalculateDistanceMiles] = useState<
  //   string | null
  // >(null);

  const [calculateDistanceMiles, setCalculateDistanceMiles] = useState<number | null>(null);

 


  const [goMiles, setGoMiles] = useState<number | null>(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.MILES_CHECK_URL + `${licensPropsProductions}`
      );
      const data = await response.json();
      setData(data);
      console.log(data);
      console.log();
      setIdLicense((data && data[0] && data[0].id) || undefined);
      console.log((data && data[0] && data[0].id) || undefined);
      setSelcectedDesinations(
        (data && data[0] && data[0].สถานที่ปลายทาง) || undefined
      );
      console.log((data && data[0] && data[0].สถานที่ปลายทาง) || undefined);

      setGoMiles((data && data[0] && data[0].เลขไมค์ไป) || undefined);
      console.log((data && data[0] && data[0].เลขไมค์ไป) || undefined);

      console.log("idLicense", idLicense);
      console.log("selcectedDesinations", selcectedDesinations);
    };
    fetchData();
  }, [ licensPropsProductions]);

  const form = useForm<z.infer<typeof postFormSchema>>({
    // fetch data from api and set default value
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      เลขไมค์กลับ: "",
      วันที่เดินทางกลับ: stringDate || null,
      Status: "Stand By",
    },
  });

  console.log(form.watch("เลขไมค์กลับ"));
  console.log(form.watch("วันที่เดินทางกลับ"));
  console.log(form.watch("Status"));

 
  console.log("calculateDistanceMiles", calculateDistanceMiles);
  


  const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
    console.log(values);

    try {
      const respone = await axios.patch(
        process.env.CARSFORM_URL + `${idLicense}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(respone.data);

      if (respone.data.status === 200) {
        const patchData = {
          ต้นทาง: null,
          ผู้ใช้รถ: null,
          Status: "Stand By",
          ปลายทาง: null,
          รายละเอียดการใช้งาน: `จอดอยู่ที่ ${selcectedDesinations}`,
        };
        const pathRespone = await axios.patch(
         process.env.CARSFORM_LICENSE_URL + `${licensPropsProductions}`,
          patchData
        );
        console.log(pathRespone.data);

        // update distance miles
        const updateDistanceMiles = {
          เลขไมค์ระยะรวม: calculateDistanceMiles,
        };
        const updateDistanceMilesRespone = await axios.patch(
         process.env.CARSFORM_URL + `${idLicense}`,
          updateDistanceMiles
        );

        console.log(updateDistanceMilesRespone.data);
        

       
        toast({
          title: "Success",
          description: "ส่งข้อมูลสำเร็จ",
          variant: "default",
         
        })
        router.push("/user");
        router.refresh();
      } else {
        
        toast({
          title: "Error",
          description: "ส่งข้อมูลไม่สำเร็จ",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = (event: {
  //   preventDefault: () => void;
  //   target: {
  //     เลขไมค์กลับ: { value: number | null };

  //     สถานที่ปลายทาง: { value: string | null };

  //     Status: { value: string | null };

  //     วันที่เดินทางกลับ: { value: string | null };
  //     ปลายทาง: { value: string | null };
  //     รายละเอียดการใช้งาน: { value: string | null };
  //     เลขไมค์ระยะรวม: { value: number | null };

  //   };
  // }) => {
  //   event.preventDefault();

  //   // update carsform table
  //   const dataUpdate = {
  //     เลขไมค์กลับ: event.target.เลขไมค์กลับ.value || null,
  //     วันที่เดินทางกลับ: event.target.วันที่เดินทางกลับ.value || null,
  //     เลขไมค์ระยะรวม: (event.target.เลขไมค์กลับ.value !== null && goMiles !== null) ? event.target.เลขไมค์กลับ.value - goMiles : null,
  //     Status: "Stand By" || null,
  //   };
  //   // update license table
  //   const dataStatusUpdate = {

  //     ต้นทาง: null,
  //     ผู้ใช้รถ: null,
  //     Status: "Stand By" || null,
  //     ปลายทาง: null,
  //     รายละเอียดการใช้งาน: `จอดอยู่ที่ ${selcectedDesinations}` || null,
  //   }

  //   console.log(dataUpdate);
  //   console.log(dataStatusUpdate);

  //     Promise.all([
  //       //update license table
  //       fetch(`http://localhost:4000/license/${licensPropsProductions}`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(dataStatusUpdate),
  //       }),
  //       //update carsform table
  //       fetch(`http://localhost:4000/carsform/${idLicense}`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(dataUpdate),
  //       }),
  //     ])
  //       .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
  //       .then(([data1, data2]) => {
  //         console.log(data1);
  //         console.log(data2);
  //         alert(data1.message);
  //         alert(data2.message);
  //         if (data1.status === 200 && data2.status === 200) {
  //           console.log(data1.message);
  //           console.log(data2.message);
  //           window.location.href = "/user";
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // };

  return (
    <div>
      <h1>ปิดเลขไมล์ปลายทาง รถทะเบียน: {licensPropsProductions}</h1>
      {data.map((item: any) => (
        <div key={item.id} className="p-4">
          <h1>เลขทะเบียนรถ : {item.เลขทะเบียนรถ}</h1>
          <h1>เลขไมล์ไป : {item.เลขไมค์ไป}</h1>
          <h1>เลขไมล์เติมน้ำมัน : {item.เลขไมล์เติมน้ำมัน}</h1>
        </div>
      ))}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-3">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="เลขไมค์กลับ"
              render={() => (
                <FormItem>
                  <FormLabel>เลขไมค์กลับ</FormLabel>
                  <FormControl>
                    
                    <Input
                      type="number"
                      placeholder="เลขไมค์กลับ"
                      {...form.register("เลขไมค์กลับ")}
                      //onchange คำนวณเลขไมค์ระยะทางรวม
                      onChange={(e) => {
                        setCalculateDistanceMiles(
                          e.target.value !== null && goMiles !== null
                            ? Number(e.target.value) - goMiles
                            : null
                        );
                      }}




                    />

                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="วันที่เดินทางกลับ"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>วันที่เดินทางกลับ</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? format(new Date(field.value), "dd MMMM yyyy")
                            : "เลือกวันที่"}

                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        // selected={field.value ? new Date(field.value) : undefined}
                        // onSelect={field.onChange}

                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(
                            format(
                              date ? new Date(date) : new Date(),
                              "yyyy-MM-dd"
                            )
                          );
                          setStringDate(
                            format(
                              date ?? new Date(),
                              dayjs().format("YYYY-MM-DD")
                            )
                          );
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-6" type="submit">
            บันทึกข้อมูล
          </Button>
        </form>
      </Form>

  
    </div>
  );
}

export default CloseCarsJobs;
