"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation"; // ✅ استدعاء useRouter
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckoutFormSchema, checkoutSchema } from "@/schema/chekoutScheama";
import onlineCash from "@/chekoutCartCash/page";

export default function CheckoutCashPage() {
  const params = useParams();
  const router = useRouter(); // ✅ تعريف router
  const id = params?.id as string | null;

  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function handleChekout(values: CheckoutFormSchema) {
    if (!id) {
      toast.error("Cart ID not found in URL!");
      return;
    }

    try {
      const res = await onlineCash(id, values);
      if (res.status === "success") {
        toast.success("✅ Order placed successfully with cash!");
        setTimeout(() => {
          router.push("/"); // ✅ يرجع للهوم بعد النجاح
        }, 1500); // هيمهل 1.5 ثانية علشان رسالة التوست تبان
      } else {
        toast.error("❌ Something went wrong!");
      }
      console.log("Order Response:", res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete cash checkout");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout (Cash)</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleChekout)} className="space-y-4">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Place Order (Cash)
          </Button>
        </form>
      </Form>
    </div>
  );
}
