# การพัฒนาระบบการจัดการคอร์สออนไลน์

#### หน้าจอระบบการจัดการคอร์สออนไลน์
https://anyflip.com/lmzum/gpaw/ 

**Figma**
- สำหรับออกแบบการทำงานระบบทั้งหมด
- https://www.figma.com/design/nkL9a5XWFPCo9YQSevkRGQ/Course-Online?node-id=34-2&t=CTPSqLPECrIuXxJa-1
#### Admin
https://www.figma.com/proto/nkL9a5XWFPCo9YQSevkRGQ/Course-Online?node-id=37-6&p=f&t=VOrwWydDwNwXuhsA-1&scaling=min-zoom&content-scaling=fixed&page-id=34%3A2&starting-point-node-id=37%3A6
#### User
https://www.figma.com/proto/nkL9a5XWFPCo9YQSevkRGQ/Course-Online?node-id=179-4752&p=f&t=CTPSqLPECrIuXxJa-0&scaling=min-zoom&content-scaling=fixed&page-id=34%3A3&starting-point-node-id=75%3A10431&show-proto-sidebar=1


## การพัฒนาระบบการจัดการคอร์สออนไลน์ พัฒนาระบบด้วย 

## เทคโนโลยีและเครื่องมือที่ใช้

### Backend
- **Next.js**  
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
  ใช้ตกแต่งหน้าตาเว็บให้สวยงามและรองรับการแสดงผลในทุกอุปกรณ์  
  - Tailwind CSS เน้นเขียน CSS แบบ Utility-first  
  - Vuetify เป็น UI Library ที่สร้างบน Vue.js พร้อม Component ให้ใช้งานจำนวนมาก

---

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

--- 
## หลักการทำงาน
- ใช้ JWT สำหรับยืนยันตัวตนและจัดการสิทธิ์ผู้ใช้งาน  
- Backend พัฒนาโดย Next.js พร้อม Prisma ORM เชื่อมต่อฐานข้อมูล PostgreSQL  
- Frontend ใช้ Vue.js ดึงข้อมูลผ่าน API และแสดงผลแบบไดนามิก  
- ใช้ Tailwind CSS / Vuetify เพื่อทำให้ UI ตอบสนองได้ดีในทุกหน้าจอ  
- Modal และฟอร์มช่วยให้ผู้ใช้เพิ่ม แก้ไข หรือลบข้อมูลได้สะดวก  
- ระบบจัดการสถานะและข้อมูลต่าง ๆ อย่างเป็นระบบ โดยใช้ Vue.js State Management  

---

### ฐานข้อมูล
  - ใช้ฐานข้อมูล PostgreSQL
  - การตั้งค่าฐานข้อมูล: ใช้ Docker เพื่อสร้าง Container สำหรับ PostgreSQL

#### ตารางหลัก:
- `users`: ข้อมูลผู้ใช้งาน เช่น ผู้สอนและผู้เรียน
- `user_favorite_courses`: ข้อมูลการกดชื่นชอบคอร์ส
- `role`: บทบาทของผู้ใช้ แอดมิน อาจารย์ ผู้ใช้
- `question`: เก็บคำถามสำหรับผู้ใช้ และบุคคลทั่วไป
- `order`: ออเดอร์คอร์สที่ทำการซื้อเรียบร้อยแล้ว
- `courses`: ข้อมูลคอร์ส เช่น ชื่อคอร์ส, คำอธิบาย, ผู้สอน
- `image`: รูปภาพข้อมูลบทเรียน
- `category`: หมวดหมู่คอร์สเรียน


#### ฟีเจอร์: หน้าจอสำหรับผู้ใช้
- หน้าเข้าสู่ระบบ
- หน้าสมัครสมาชิก
- หน้าแรก
- หน้าแสดงคอร์สทั้งหมด
- หน้ารายละเอียดคอร์ส
- หน้าข้อมูลคอร์สของฉัน
- หน้าข้อมูลคอร์สที่สนใจ
- หน้าแก้ใขโปรไฟล์
- หน้าเปลี่ยนรหัสผ่าน
- หน้าแสดงรายละเอียดคอร์ส
- กล่องข้อความสำหรับสอบถามเพิ่มเติม
##### หน้าจอสำหรับแอดมินหรือผู้สอน
- หน้า Dashboard ของผู้สอนและผู้เรียน
- หน้า Inbox สำหรับตอบคำถามสำหรับผู้สอน
- หน้าจัดการคอร์ส
- หน้าเพิ่มคอร์ส
- หน้าแก้ไขคอร์ส (เพิ่ม, ลบ, แก้ไขหมวดหมู่)
- หน้าจัดการผู้ใช้
- หน้าจัดการหมวดหมู่ (เพิ่ม, ลบ, แก้ไขหมวดหมู่)
- หน้าแก้ไขข้อมูลอาจารย์ผู้สอน
- หน้าคอร์สออเดอร์
- หน้า Confirmed Course
- หน้า Cancel Course
- หน้า Comple Courser 

## การติดตั้งและใช้งาน
1. ติดตั้ง Node.js และ Docker  
2. รันฐานข้อมูล PostgreSQL ผ่าน Docker Container  
3. ตั้งค่าฐานข้อมูลตาม schema ที่เตรียมไว้  
4. รัน Backend ด้วยคำสั่ง `npm start` (Next.js) (email: 'emailAdmin@gmail.com', password: '!admin')
5. รัน Front-end ด้วย  `npm run dev` 
6. เปิด Frontend ในเว็บเบราว์เซอร์  
7. ลงทะเบียนและเริ่มใช้งานระบบได้ทันที


## ติดต่อ
หากต้องการข้อมูลเพิ่มเติมหรือสอบถามเกี่ยวกับโปรเจกต์นี้ ติดต่อได้ที่ cholthicha.bfc@gmail.com 
