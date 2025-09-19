# إصلاح تحديث السلة في الوقت الفعلي

## المشكلة
- عدد المنتجات في السلة لا يتحدث تلقائياً
- حذف المنتجات لا يظهر فوراً بدون إعادة تحميل
- تحديث الكمية لا يظهر فوراً

## الحلول المطبقة

### 1. إصلاح Cart Context
- ✅ إضافة دالة `refreshCart()` لتحديث السلة
- ✅ إضافة hook `useCart()` لسهولة الاستخدام
- ✅ توحيد أنواع البيانات مع `cartType`

### 2. إنشاء useCartActions Hook
- ✅ `addProductToCart()` - إضافة منتج للسلة
- ✅ `removeProductFromCart()` - حذف منتج من السلة
- ✅ `updateProductQuantity()` - تحديث كمية المنتج
- ✅ `clearCart()` - مسح السلة بالكامل
- ✅ جميع الدوال تحدث Cart Context تلقائياً

### 3. تحديث صفحة السلة
- ✅ استخدام `useCart()` بدلاً من state محلي
- ✅ استخدام `useCartActions()` للعمليات
- ✅ إزالة الكود المكرر
- ✅ تحديث فوري للواجهة

### 4. تحديث الـ Navbar
- ✅ استخدام `useCart()` لعرض عدد المنتجات
- ✅ تحديث فوري للعداد

## الملفات المحدثة

### 1. `src/context/cartContext.tsx`
```typescript
interface CartContextType {
  cart: cartType | null;
  setCart: React.Dispatch<React.SetStateAction<cartType | null>>;
  refreshCart: () => Promise<void>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}
```

### 2. `src/hooks/useCartActions.ts`
```typescript
export function useCartActions() {
  const { refreshCart } = useCart();

  const addProductToCart = async (productId: string) => {
    // إضافة منتج + تحديث Context
  };

  const removeProductFromCart = async (productId: string) => {
    // حذف منتج + تحديث Context
  };

  const updateProductQuantity = async (productId: string, quantity: number) => {
    // تحديث كمية + تحديث Context
  };

  const clearCart = async () => {
    // مسح السلة + تحديث Context
  };

  return {
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    clearCart,
  };
}
```

### 3. `src/app/Cart/page.tsx`
```typescript
export default function Cart() {
  const { cart } = useCart();
  const { removeProductFromCart, updateProductQuantity, clearCart } = useCartActions();

  // استخدام الدوال الجديدة
  async function deleteUserCart(id: string) {
    await removeProductFromCart(id);
  }

  async function updateCartUser(id: string, count: number) {
    await updateProductQuantity(id, count);
  }

  async function clearAllCartActions() {
    await clearCart();
  }
}
```

### 4. `src/app/_Components/navbar/page.tsx`
```typescript
export default function Navbar() {
  const { cart } = useCart();
  const numberOfCartItems = cart?.data?.products
    ? cart.data.products.reduce((acc, item) => acc + item.count, 0)
    : 0;

  // العداد يتحدث تلقائياً
}
```

## النتيجة

### ✅ تحديث فوري للعداد
- عدد المنتجات في الـ Navbar يتحدث فوراً
- لا حاجة لإعادة تحميل الصفحة

### ✅ تحديث فوري للسلة
- حذف المنتجات يظهر فوراً
- تحديث الكمية يظهر فوراً
- مسح السلة يظهر فوراً

### ✅ رسائل نجاح/خطأ
- رسائل toast واضحة لكل عملية
- معالجة أخطاء شاملة

### ✅ كود نظيف ومنظم
- إزالة الكود المكرر
- استخدام hooks مخصصة
- فصل الاهتمامات

## كيفية الاستخدام

### في أي صفحة تريد إضافة منتج للسلة:
```typescript
import { useCartActions } from "@/hooks/useCartActions";

function ProductPage() {
  const { addProductToCart } = useCartActions();

  const handleAddToCart = async (productId: string) => {
    await addProductToCart(productId);
    // سيتم تحديث العداد تلقائياً
  };
}
```

### في أي صفحة تريد عرض عدد المنتجات:
```typescript
import { useCart } from "@/context/cartContext";

function AnyPage() {
  const { cart } = useCart();
  const itemCount = cart?.data?.products?.reduce((acc, item) => acc + item.count, 0) || 0;
  
  return <div>Items in cart: {itemCount}</div>;
}
```

الآن السلة تعمل بشكل مثالي مع تحديث فوري! 🎉
