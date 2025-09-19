"use client";
import { useCart } from "@/context/cartContext";
import addToCart from "@/cartActions/addToCart.Action";
import deleteCartItem from "@/cartActions/removeCartiem.Action";
import updateQuantityCart from "@/cartActions/updateCartQuantitye.Action";
import clearCartActions from "@/cartActions/cleaCartAction";
import { toast } from "sonner";

export function useCartActions() {
  const { refreshCart } = useCart();

  const addProductToCart = async (productId: string) => {
    try {
      const res = await addToCart(productId);
      if (res.status === "success") {
        await refreshCart();
        toast.success("✅ Product added to cart");
        return true;
      } else {
        toast.error("Failed to add product to cart");
        return false;
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add product to cart");
      return false;
    }
  };

  const removeProductFromCart = async (productId: string) => {
    try {
      const res = await deleteCartItem(productId);
      if (res.status === "success") {
        await refreshCart();
        toast.success("✅ Product removed from cart");
        return true;
      } else {
        toast.error("Failed to remove product from cart");
        return false;
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error("Failed to remove product from cart");
      return false;
    }
  };

  const updateProductQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await updateQuantityCart(productId, quantity);
      if (res.status === "success") {
        await refreshCart();
        toast.success("✅ Quantity updated");
        return true;
      } else {
        toast.error("Failed to update quantity");
        return false;
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      toast.error("Failed to update quantity");
      return false;
    }
  };

  const clearCart = async () => {
    try {
      const res = await clearCartActions();
      console.log("Clear cart response:", res); // للتشخيص
      
      // تحقق من عدة حالات للنجاح
      if (res.message === "success" || 
          res.message === "succsess" || // للتوافق مع الخطأ الإملائي في API
          res.status === "success" ||
          res.message?.toLowerCase().includes("success") ||
          res.message?.toLowerCase().includes("clear")) {
        await refreshCart();
        toast.success("🗑️ Cart cleared");
        return true;
      } else {
        console.error("Clear cart failed:", res);
        toast.error(res.message || "Failed to clear cart");
        return false;
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Failed to clear cart");
      return false;
    }
  };

  return {
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    clearCart,
  };
}
