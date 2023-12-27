/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Autocomplete } from "@mui/joy";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/input";

import OilAdditon from "@/app/componentsauto/OilAdditon";

import UpdateOil from "@/app/componentsauto/UpdateOil";
import CloseCarsJobs from "@/app/componentsauto/CloseCarsJobs";
import BackButton from "@/app/components/BackButton";
import Timeline from "@/app/componentsauto/Timeline";
import TimelineInit from "@/app/componentsauto/TimelineInit";

import { useSession } from "next-auth/react";


import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "../../../../lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import axios from "axios";
import { useRouter } from "next/navigation";


import { create } from "zustand";
import { useToast } from '@/components/ui/use-toast';

interface Models {
  id: number;
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

const postFormSchema = z.object({
  เลขทะเบียนรถ: z.string().nullable(),
  วันที่เดินทางไป: z.string({
    required_error: "A date is required.",
  }),
  รายละเอียดของงาน: z.string().min(1, "กรุณากรอกรายละเอียดของงาน"),
  สถานที่ต้นทาง: z.string().min(1, "กรุณากรอกสถานที่ต้นทาง"),
  สถานที่ปลายทาง: z.string().min(1, "กรุณากรอกสถานที่ปลายทาง"),
  เลขไมค์ไป: z.string().nullable(),
  ผู้ใช้รถ: z.string().nullable(),
  ผู้ขับรถ: z.string().nullable(),
  Status: z.string().nullable(),
});

interface StoreState {
  selectedlicenses: string | null;
  setSelectedlicenseNew: (selectedlicense: string) => void;
}

function page({ params }: { params: { id: number } }) {
  const { toast } = useToast()
  const router = useRouter();

  const { data: session } = useSession();

  console.log(session?.user?.name);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dataStatus, setdataStatus] = useState<Models[]>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [getStatus, setGetStatus] = useState<String | null>(null);

  const [selectedlicense, setSelectedlicense] = useState<string | null>(null);
  const [selcectedSections, setSelectedSections] = useState<string | null>(
    null
  );
  const [milesStart, setMilesStart] = useState<Number | null>(null);

  const [getStateOil, setStateOil] = useState<string | null>(null);

  const [getStationOilProvice, setStationOilProvice] = useState<string | null>(
    null
  );
  const [getPriceOil, setPriceOil] = useState<number | null>(0);
  const [getAmountOilLiters, setAmountOilLiters] = useState<number | null>(0);

  const [stringDate, setStringDate] = useState<string>(
    dayjs().format("YYYY-MM-DD") || ""
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CARSFORM_URL + `${params.id}`
      );
      const data = await response.json();
      setdataStatus(data);
      console.log(data);

      setGetStatus(data.Status);
      console.log(data.Status);

      setSelectedlicense(data.เลขทะเบียนรถ);
      setSelectedSections(data.Section);
      setMilesStart(data.เลขไมค์กลับ);

      setAmountOilLiters(data.การเติมน้ำมันจำนวน);
      setPriceOil(data.การเติมน้ำมันราคา);
      setStationOilProvice(data.การเติมน้ำมันจังหวัด);
    };
    fetchData();
  }, [params.id]);

  console.log(selectedlicense);

  // Create your Zustand store from selectedlicense
  const useStore = create<StoreState>()((set) => ({
    selectedlicenses: selectedlicense,
    setSelectedlicenseNew: (selectedlicense) =>
      set({ selectedlicenses: selectedlicense }),
  }));

  //useStore
  const selectedlicenseStore = useStore((state) => state.selectedlicenses);

  console.log(selectedlicenseStore);

  const form = useForm<z.infer<typeof postFormSchema>>({
    // fetch data from api and set default value
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      เลขทะเบียนรถ: selectedlicenseStore || undefined,
      วันที่เดินทางไป: stringDate || undefined,
      รายละเอียดของงาน: "",
      สถานที่ต้นทาง: "",
      สถานที่ปลายทาง: "",
      เลขไมค์ไป: milesStart?.toString() || undefined,
      ผู้ใช้รถ: session?.user?.name,
      ผู้ขับรถ: session?.user?.name,
      Status: "ใช้งาน",
    },
  });

  console.log(form.watch("เลขไมค์ไป"));
  console.log(form.watch("เลขทะเบียนรถ"));
  console.log(form.watch("วันที่เดินทางไป"));

  const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
    console.log(values);

    try {
      const respone = await axios.post(
        process.env.NEXT_PUBLIC_CARSFORM_URL as string,
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
          Section: selcectedSections,
          Car: selectedlicense,
          ต้นทาง: values.สถานที่ต้นทาง,
          ปลายทาง: values.สถานที่ปลายทาง,
          รายละเอียดการใช้งาน: values.รายละเอียดของงาน,
          ผู้ใช้รถ: values.ผู้ใช้รถ,
          Status: values.Status,
        };
        const pathRespone = await axios.patch(
          process.env.NEXT_PUBLIC_CARSFORM_LICENSE_URL + `${selectedlicense}`,
          patchData
        );
        console.log(pathRespone.data);

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

  return (
    <div className="bg-slate-200 p-10 rounded-md pt-10 z-30">
   
      <div className="grid grid-cols-1 p-10 z-20">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 p-10 z-20">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 p-10 z-20">
        <BackButton />
      </div>
      
    

      {getStatus === "Stand By" ? (
        <div className="w-full">
          <h1 className="text-center">เพิ่มข้อมูลต้นทาง</h1>
          <h1>{`Status is : ${getStatus} `}</h1>

          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="เลขทะเบียนรถ"
                  render={() => (
                    <FormItem>
                      <FormLabel>เลขทะเบียนรถ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="เลขทะเบียนรถ"
                          {...form.register("เลขทะเบียนรถ")}
                          //Get selectedlicense to value input

                          value={selectedlicenseStore || undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="วันที่เดินทางไป"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>วันที่เดินทางไป</FormLabel>
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
                                format(date ? new Date(date) : new Date(), "yyyy-MM-dd")
                              );
                              setStringDate(
                                format(date ?? new Date(), dayjs().format("YYYY-MM-DD"))
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
                <FormField
                  control={form.control}
                  name="รายละเอียดของงาน"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รายละเอียดของงาน</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="รายละเอียดของงาน"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="สถานที่ต้นทาง"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>สถานที่ต้นทาง</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="สถานที่ต้นทาง"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="สถานที่ปลายทาง"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>สถานที่ปลายทาง</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="สถานที่ปลายทาง"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="เลขไมค์ไป"
                  render={() => (
                    <FormItem>
                      <FormLabel>เลขไมค์ไป</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="เลขไมค์ไป"
                          {...form.register("เลขไมค์ไป")}
                          value={milesStart?.toString() || undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ผู้ใช้รถ"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ผู้ใช้รถ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ผู้ใช้รถ"
                          {...field}
                          value={session?.user?.name || undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ผู้ขับรถ"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ผู้ขับรถ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ผู้ขับรถ"
                          {...field}
                          value={session?.user?.name || undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Status"
                          {...field}
                          value={"ใช้งาน"}
                        />
                      </FormControl>
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

          <TimelineInit />
        </div>
      ) : getStatus === "ใช้งาน" ? (
        <div className="flex flex-col items-center justify-center gap-5 mt-10">
          <h1>{`Status is ${getStatus} Please select again`}</h1>
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
              {getPriceOil === null && getAmountOilLiters === null ? (
                <OilAdditon licensPropsProductions={selectedlicense || ""} />
              ) : (
                <div>
                  <h1>เติมน้ำมันแล้ว</h1>
                  <UpdateOil
                    provinceOil={getStationOilProvice || ""}
                    litersOil={Number(getAmountOilLiters) || 0}
                    priceOil={Number(getPriceOil) || 0}
                    licensPropsProductions={selectedlicense || ""}
                  />
                </div>
              )}
              <Timeline
                license={selectedlicense || ""}
                getStateolis={getStateOil}
              />
            </div>
          ) : getStateOil === "ปิดเลขไมล์" ? (
            <div>
              <CloseCarsJobs licensPropsProductions={selectedlicense || ""} />
              <Timeline
                license={selectedlicense || ""}
                getStateolis={getStateOil}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default page;
