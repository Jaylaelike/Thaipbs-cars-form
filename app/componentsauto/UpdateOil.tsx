import React, { useEffect, useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useToast } from '@/components/ui/use-toast';

interface Props {
  provinceOil: string;
  litersOil: number;
  priceOil: number;
  licensPropsProductions: string;
}

const postFormSchema = z.object({
  เลขไมล์เติมน้ำมัน: z.string().min(1, { message: "กรุณากรอกเลขไมค์" }),
  การเติมน้ำมันสถานีบริการ: z.string().min(1, { message: "กรุณากรอกสถานีบริการ" }),
  การเติมน้ำมันจังหวัด: z.string().min(1, { message: "กรุณากรอกจังหวัด" }),
  การเติมน้ำมันราคา: z.string().min(1, { message: "กรุณากรอกราคา" }),
  การเติมน้ำมันจำนวน: z.string().min(1, { message: "กรุณากรอกจำนวน(ลิตร)" }),
});

function UpdateOil({
  provinceOil,
  litersOil,
  priceOil,
  licensPropsProductions,
}: Props) {
  const { toast } = useToast()
  const router = useRouter();
  const [data, setData] = useState([]);
  const [idLicense, setIdLicense] = useState<string | number | undefined>("");

  const [calculatLitersOils, setCalculateLitersOils] = useState<number | null>(
    null
  );
  const [calculatPriceOils, setCalculatePriceOils] = useState<number | null>(
    null
  );

  const [provinceResults, setProvinceResults] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5500/api/miles/check/update/${licensPropsProductions}`
      );
      const data = await response.json();
      setData(data);
      console.log(data);
      console.log();

      setIdLicense((data && data[0] && data[0].id) || undefined);

      console.log(data[0].id);
    };
    fetchData();
  }, [licensPropsProductions]);

  const form = useForm<z.infer<typeof postFormSchema>>({
    // fetch data from api and set default value
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      เลขไมล์เติมน้ำมัน: "",
      การเติมน้ำมันสถานีบริการ: "ปตท.",
      การเติมน้ำมันจังหวัด: '',
      การเติมน้ำมันราคา: '',
      การเติมน้ำมันจำนวน: '',
    },
  });

  console.log(form.watch("เลขไมล์เติมน้ำมัน"));
  console.log(form.watch("การเติมน้ำมันสถานีบริการ"));
  console.log(form.watch("การเติมน้ำมันจังหวัด"));
  console.log(form.watch("การเติมน้ำมันราคา"));
  console.log(form.watch("การเติมน้ำมันจำนวน"));

  // const dataUpdate = {

  //   เลขไมล์เติมน้ำมัน: event.target.เลขไมล์เติมน้ำมัน.value || null,
  //   การเติมน้ำมันสถานีบริการ: event.target.การเติมน้ำมันสถานีบริการ.value || null,
  //   การเติมน้ำมันจังหวัด: event.target.การเติมน้ำมันจังหวัด.value + "," + provinceOil || null,
  //   การเติมน้ำมันราคา: (Number(event.target.การเติมน้ำมันราคา.value) || 0) + priceOil || null,
  //   การเติมน้ำมันจำนวน: (Number(event.target.การเติมน้ำมันจำนวน.value) || 0) + litersOil || null,
  // };

  const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
    console.log(values);

    try {
      const respone = await axios.patch(
        `http://localhost:4000/carsform/${idLicense}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(respone.data);

      if (respone.data.status === 200) {
        //update ค่า การเติมน้ำมันจำนวน และ การเติมน้ำมันราคา
        const patchData = {
          การเติมน้ำมันจังหวัด: provinceResults,
          การเติมน้ำมันราคา: calculatPriceOils,
          การเติมน้ำมันจำนวน: calculatLitersOils,
        };
        const pathRespone = await axios.patch(
          `http://localhost:4000/carsform/${idLicense}`,
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
          variant: "default",
         
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id} className="p-3">
          <h1>ID : {item.id}</h1>
          <h1>เลขทะเบียนรถ : {item.เลขทะเบียนรถ}</h1>
          <h1>เลขไมล์เติมน้ำมันก่อนหน้า : {item.เลขไมล์เติมน้ำมัน}</h1>
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
              render={() => (
                <FormItem>
                  <FormLabel>การเติมน้ำมันจังหวัด</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="การเติมน้ำมันจังหวัด"
                      {...form.register("การเติมน้ำมันจังหวัด")}
                      onChange={(e) => {
                        setProvinceResults(e.target.value + "," + provinceOil);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="การเติมน้ำมันราคา"
              render={() => (
                <FormItem>
                  <FormLabel>การเติมน้ำมันราคา</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="การเติมน้ำมันราคา"
                      {...form.register("การเติมน้ำมันราคา")}
                      //onchange คำนวน ผลรวมราคา
                      onChange={(e) => {
                        setCalculatePriceOils(
                          Number(e.target.value) + priceOil
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
              name="การเติมน้ำมันจำนวน"
              render={() => (
                <FormItem>
                  <FormLabel>การเติมน้ำมันจำนวน</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="การเติมน้ำมันจำนวน"
                      {...form.register("การเติมน้ำมันจำนวน")}
                      //onchange คำนวน ผลรวมจำนวน
                      onChange={(e) => {
                        setCalculateLitersOils(
                          Number(e.target.value) + litersOil
                        );
                      }}
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

export default UpdateOil;
