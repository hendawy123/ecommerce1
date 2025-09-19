"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
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
import onlinePayment from "@/ckekoutActions/onlineChekOut.Actions";

export default function Checkout() {
  const params = useParams();
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
      const res = await onlinePayment(id, "http://localhost:3000/", values);

      if (res?.session?.url) {
        toast.success("✅ Redirecting to payment...");
        window.location.href = res.session.url; // تحويل لصفحة الدفع
      } else {
        toast.error("Payment session URL not found!");
        console.log("Response:", res);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete checkout");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout Now</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleChekout)} className="space-y-4">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your details"
                    {...field}
                  />
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
                  <Input
                    type="tel"
                    placeholder="Enter your phone"
                    {...field}
                  />
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
                  <Input
                    type="text"
                    placeholder="Enter your city"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Pay now
          </Button>
        </form>
      </Form>
    </div>
  );
}
