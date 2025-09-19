# تشخيص مشكلة نسيان كلمة المرور

## المشكلة
عند إدخال البريد الإلكتروني، يظهر رسالة "reset code sent to your email" ولكن يحدث خطأ.

## الحلول المطبقة

### 1. إزالة Token من APIs
- ✅ `forgetPassword.ts` - لا يحتاج token
- ✅ `verifyResetCode.ts` - لا يحتاج token  
- ✅ `resetPassword.ts` - لا يحتاج token

### 2. إضافة معالجة أخطاء شاملة
- ✅ التحقق من حالة HTTP response
- ✅ معالجة الأخطاء مع رسائل واضحة
- ✅ إضافة console.log للتشخيص

### 3. تحسين رسائل الخطأ
- ✅ رسائل خطأ باللغة الإنجليزية
- ✅ رسائل نجاح واضحة
- ✅ معالجة حالات الفشل

## كيفية التشخيص

### 1. افتح Developer Tools
- اضغط F12 في المتصفح
- اذهب إلى تبويب Console
- جرب إرسال البريد الإلكتروني مرة أخرى

### 2. ابحث عن الرسائل التالية في Console:
```
Forget password response: {status: "success", message: "..."}
Forget password error: Error: ...
```

### 3. تحقق من Network Tab
- اذهب إلى تبويب Network
- جرب إرسال البريد الإلكتروني
- ابحث عن طلب `forgotPasswords`
- تحقق من:
  - Status Code (يجب أن يكون 200)
  - Response Body
  - Request Headers

## الأخطاء المحتملة وحلولها

### 1. خطأ 400 (Bad Request)
- تحقق من صحة البريد الإلكتروني
- تأكد من أن البريد الإلكتروني مسجل في النظام

### 2. خطأ 500 (Server Error)
- مشكلة في الخادم
- جرب مرة أخرى بعد قليل

### 3. خطأ CORS
- مشكلة في إعدادات الخادم
- تأكد من أن الخادم يدعم CORS

### 4. خطأ Network
- تحقق من الاتصال بالإنترنت
- تأكد من أن الخادم يعمل

## اختبار الـ APIs مباشرة

يمكنك اختبار الـ APIs مباشرة باستخدام curl:

```bash
# اختبار forgetPassword
curl -X POST https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com"}'

# اختبار verifyResetCode
curl -X POST https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode \
  -H "Content-Type: application/json" \
  -d '{"resetCode":"123456"}'

# اختبار resetPassword
curl -X PUT https://ecommerce.routemisr.com/api/v1/auth/resetPassword \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","newPassword":"newPassword123"}'
```

## الخطوات التالية

1. جرب إرسال البريد الإلكتروني مرة أخرى
2. تحقق من Console للأخطاء
3. تحقق من Network Tab للاستجابة
4. إذا استمر الخطأ، شارك رسالة الخطأ الدقيقة
