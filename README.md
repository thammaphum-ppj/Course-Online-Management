# Course-Online-Management


**Figma**
- สำหรับออกแบบการทำงานระบบทั้งหมด
- https://www.figma.com/design/nkL9a5XWFPCo9YQSevkRGQ/Course-Online?node-id=34-2&t=CTPSqLPECrIuXxJa-1


## เทคโนโลยีและเครื่องมือที่ใช้

### Backend
- **Nest.js**  
  ใช้พัฒนา API และรองรับ Server-Side Rendering (SSR) ช่วยให้ระบบทำงานเร็วและเหมาะกับ SEO
- **Prisma ORM**  
  เชื่อมต่อและจัดการฐานข้อมูล PostgreSQL ด้วย Object-Relational Mapping (ORM) ทำให้เขียนคำสั่งฐานข้อมูลง่ายและปลอดภัย
- **PostgreSQL**  
  ฐานข้อมูลเชิงสัมพันธ์หลักสำหรับจัดเก็บข้อมูลผู้ใช้ คอร์ส รายการสั่งซื้อ และข้อมูลอื่น ๆ
- **Docker**  
  ใช้สำหรับรันฐานข้อมูล PostgreSQL ในคอนเทนเนอร์ เพื่อความสะดวกในการตั้งค่าและจัดการฐานข้อมูล
- **JWT (JSON Web Token)**  
  ใช้สำหรับระบบยืนยันตัวตน (Authentication) และกำหนดสิทธิ์การเข้าถึง (Authorization) อย่างปลอดภัย

### Frontend
- **Vue.js**  
  Framework JavaScript สำหรับสร้าง User Interface แบบ Reactive และ Component-based ช่วยให้พัฒนา UI ได้เร็วและจัดการสถานะข้อมูลง่าย
- **Tailwind CSS / Vuetify**    
  - Vuetify เป็น UI Library ที่สร้างบน Vue.js พร้อม Component 

#### ฟีเจอร์หลัก:
- การจัดการผู้ใช้ (Authentication, Authorization)
- การจัดการคอร์ส (CRUD: Create, Read, Update, Delete)
- ระบบการลงทะเบียนเรียนและจัดการคำสั่งซื้อคอร์ส  
- ระบบจัดการบทเรียนและเนื้อหาในคอร์ส  
- Dashboard สำหรับผู้สอนและผู้ดูแลระบบ  
- ระบบ Inbox สำหรับผู้สอนตอบคำถามผู้เรียน  
- ระบบแสดงคอร์สที่ผู้ใช้สนใจ (Favorite)  
- ระบบจัดการสถานะคำสั่งซื้อ เช่น ยืนยัน ยกเลิก และจบคอร์ส
- API สำหรับให้ Front-End ดึงข้อมูล

## หลักการทำงาน
- ใช้ JWT สำหรับยืนยันตัวตนและจัดการสิทธิ์ผู้ใช้งาน  
- Backend พัฒนาโดย Next.js พร้อม Prisma ORM เชื่อมต่อฐานข้อมูล PostgreSQL  
- Frontend ใช้ Vue.js ดึงข้อมูลผ่าน API และแสดงผลแบบไดนามิก  
- ใช้ Tailwind CSS / Vuetify เพื่อทำให้ UI ตอบสนองได้ดีในทุกหน้าจอ  
- Modal และฟอร์มช่วยให้ผู้ใช้เพิ่ม แก้ไข หรือลบข้อมูลได้สะดวก  
- ระบบจัดการสถานะและข้อมูลต่าง ๆ อย่างเป็นระบบ โดยใช้ Vue.js State Management  


### ฐานข้อมูล
  - ใช้ฐานข้อมูล PostgreSQL
  - การตั้งค่าฐานข้อมูล: ใช้ Docker เพื่อสร้าง Container สำหรับ PostgreSQL


## การติดตั้งและใช้งาน
1. ติดตั้ง Node.js และ Docker  
2. รันฐานข้อมูล PostgreSQL ผ่าน Docker Container  
3. รัน Backend ด้วยคำสั่ง `npm start` (email: 'emailAdmin@gmail.com', password: '!admin')
4. รัน Front-end ด้วย  `npm run dev` 
5. เปิด Frontend ในเว็บเบราว์เซอร์เริ่มใช้งานระบบได้ทันที

