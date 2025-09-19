# Password Reset Flow

## تدفق نسيان كلمة المرور

### 1. صفحة نسيان كلمة المرور (`/forgetPassword`)
- المستخدم يدخل البريد الإلكتروني
- يتم إرسال طلب إلى API `forgotPasswords`
- في حالة النجاح، يتم التوجيه إلى صفحة التحقق من الكود

### 2. صفحة التحقق من الكود (`/getCode`)
- المستخدم يدخل الكود المرسل إلى البريد الإلكتروني
- يتم التحقق من الكود عبر API `verifyResetCode`
- في حالة النجاح، يتم التوجيه إلى صفحة إعادة تعيين كلمة المرور

### 3. صفحة إعادة تعيين كلمة المرور (`/resetPassword`)
- المستخدم يدخل كلمة المرور الجديدة
- يتم التحقق من تطابق كلمة المرور
- يتم إرسال طلب إلى API `resetPassword`
- في حالة النجاح، يتم التوجيه إلى صفحة تسجيل الدخول

## الملفات المطلوبة

### Schemas
- `src/schema/forgetPassword.ts` - للتحقق من البريد الإلكتروني
- `src/schema/verifyCode.ts` - للتحقق من الكود
- `src/schema/resetPassword.ts` - لإعادة تعيين كلمة المرور

### APIs
- `src/api/passwordActionsForget/forgetPassword.ts` - إرسال طلب نسيان كلمة المرور
- `src/api/passwordActionsForget/getcodeForgetPassowrd.ts` - التحقق من الكود
- `src/api/passwordActionsForget/resetPassword.ts` - إعادة تعيين كلمة المرور

### Pages
- `src/app/forgetPassword/page.tsx` - صفحة نسيان كلمة المرور
- `src/app/getCode/page.tsx` - صفحة التحقق من الكود
- `src/app/resetPassword/page.tsx` - صفحة إعادة تعيين كلمة المرور

## API Endpoints المستخدمة

1. `POST /api/v1/auth/forgotPasswords` - إرسال كود إعادة تعيين كلمة المرور
2. `POST /api/v1/auth/verifyResetCode` - التحقق من كود إعادة التعيين
3. `PUT /api/v1/auth/resetPassword` - إعادة تعيين كلمة المرور

## التحسينات المضافة

- ✅ معالجة الأخطاء الشاملة
- ✅ رسائل toast مناسبة لكل حالة
- ✅ التحقق من صحة البيانات باستخدام Zod
- ✅ واجهة مستخدم متجاوبة وجميلة
- ✅ روابط للتنقل بين الصفحات
- ✅ التحقق من وجود البريد الإلكتروني في URL
- ✅ قيود على طول كلمة المرور وتعقيدها
