import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useToast } from '@/components/ui/use-toast';

interface Props {
  licensPropsProductions: string;
}
const postFormSchema = z.object({
  เลขไมล์เติมน้ำมัน: z.string().min(1, { message: "กรุณากรอกเลขไมค์" }),
  การเติมน้ำมันสถานีบริการ: z.string().min(1, { message: "กรุณากรอกสถานีบริการ" }),
  การเติมน้ำมันจังหวัด: z.string().min(1, { message: "กรุณากรอกจังหวัด" }),
  การเติมน้ำมันราคา: z.string().min(1, { message: "กรุณากรอกราคา" }),
  การเติมน้ำมันจำนวน: z.string().min(1, { message: "กรุณากรอกจำนวน(ลิตร)" }),
});

function OilAdditon({ licensPropsProductions }: Props) {
  const { toast } = useToast()
  const router = useRouter();
  const [data, setData] = useState([]);
  const [idLicense, setIdLicense] = useState<string | number | undefined>("");
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

      console.log(data[0].id);

      console.log("idLicense", idLicense);
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof postFormSchema>>({
    // fetch data from api and set default value
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      เลขไมล์เติมน้ำมัน: "",
      การเติมน้ำมันสถานีบริการ: "ปตท.",
      การเติมน้ำมันจังหวัด: "",
      การเติมน้ำมันราคา: "",
      การเติมน้ำมันจำนวน: "",
    },
  });

  console.log(form.watch("เลขไมล์เติมน้ำมัน"));
  console.log(form.watch("การเติมน้ำมันสถานีบริการ"));
  console.log(form.watch("การเติมน้ำมันจังหวัด"));
  console.log(form.watch("การเติมน้ำมันราคา"));
  console.log(form.watch("การเติมน้ำมันจำนวน"));

  

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
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <h1>ID : {item.id}</h1>
          <h1>เลขทะเบียนรถ : {item.เลขทะเบียนรถ}</h1>
          <h1>เลขไมค์ไป : {item.เลขไมค์ไป}</h1>
        </div>
      ))}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-3">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="เลขไมล์เติมน้ำมัน"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เลขไมล์เติมน้ำมัน</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="เลขไมล์เติมน้ำมัน"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="การเติมน้ำมันสถานีบริการ"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>การเติมน้ำมันสถานีบริการ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="การเติมน้ำมันสถานีบริการ"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="การเติมน้ำมันจังหวัด"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>การเติมน้ำมันจังหวัด</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="การเติมน้ำมันจังหวัด"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="การเติมน้ำมันราคา"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>การเติมน้ำมันราคา</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="การเติมน้ำมันราคา"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="การเติมน้ำมันจำนวน"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>การเติมน้ำมันจำนวน</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="การเติมน้ำมันจำนวน"
                      {...field}
                      value={field.value || ""}
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
    </div>
  );
}

export default OilAdditon;
