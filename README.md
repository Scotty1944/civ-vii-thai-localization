# Sid Meier's Civilization VII - 🇹🇭 Thai Localization Mod

## Description
ม็อดภาษาไทย จัดทำเพื่อให้ใครหลายคนที่เป็นแฟนเกมได้เข้าใจในเกม Civilization VII มากขึ้น และอยากให้คนเอนจอยกับเกม
คำแปลมีฐานมาจาก GPT-4o ซึ่งเป็นเครื่องมือช่วยในการแปลให้เร็วขึ้น ทำให้ครอบคลุมได้ 100% และเราได้มีการพิสูจน์อักษรเกือบทุกบรรทัดภายในเกม และมีการแก้คำ การแปลใหม่อยู่ตลอด
หากมีคำผิดหรืออะไรยังไงขออภัยด้วยครับตรวจคนเดียวดูได้ไม่หมดเพราะมีมากกว่า 50,000 บรรทัด และเป็นศัพท์เฉพาะผสมกันไปมา สามารถช่วยกันแก้ไขได้ครับ ถ้าใช้ Github ไม่ได้ทักมาหาก็ได้

ตัว UI ในเกมมีการแก้ไขเพิ่มใน 'Base/modules/core/ui/cohtml.js" เพื่อให้เพิ่ม ฟอนต์ไทย และให้รองรับภาษาไทยได้ดีขึ้น และจะทำให้เวลาเปลี่ยนกลับไปใช้ภาษาอังกฤษแล้ว ฟอนต์ไม่ดูแปลกๆ

## 📖 Preview
![preview](https://i.imgur.com/DY3B583.jpeg)

## 📖 Proof Reading
สำหรับเวอร์ชั่น 1.2.0

เปอร์เซ็นต์ในการตรวจและแก้ไขคำแปลในแต่ละหมวด
| Section | Percentage |
|---------|---------|
| เมือง (City)    | 99% |
| ยูนิต (Unit)    | 99% |
| อาคาร (Building) | 99% |
| ผู้นำ (Leader) | 99% |
| อารยธรรม (Civilization) | 99% |
| แนวคิด (Civic) | 99% |
| เทคโนโลยี (Technology) | 100% |
| คำคม (Quote) | 100% |
| ศาสนา (Religious) | 99% |
| เหตุการณ์เล่าเรื่อง (Narrative Event) | 90% 
| ความก้าวหน้า (Challenge) | 100% |
| หน้า UI (UI Interface) | 100% |
| ซิวิโลพิเดีย (Civilopedia) | 55% |

## 📦 Installation
1. เข้าไปที่หน้า Release ของ Repository นี้แล้วกด Download เวอร์ชั่นล่าสุดได้เลย
2. จะมีให้เลือกสำหรับ Windows จะมีตัวติดตั้งพร้อมใช้งานให้ และแบบ Manual คือต้องนำไปติดตั้งเอง (MacOS ต้องลงแบบ Manual)

ตัว Installation นั้นจะเข้าไปเปลี่ยนภาษาให้โดยอัตโนมัติด้วย พร้อมลงไฟล์ภาษาให้ครบ

## 📦 Installation (Windows)
หากดาวน์โหลดเวอร์ชั่น Installation ให้ทำตามนี้
1. ดับเบิ้ลคลิกที่ civ7-111-th.104-windows64.exe และรอจนกว่าจะมีข้อความต้อนรับ, หรือจะคลิกขวาแล้วเลือก Run as administrator เพื่อรันแบบแอดมิน
2. จะมีข้อความให้กดยืนยันว่าจะติดตั้งขั้นตอนนี้ให้พิมพ์ 'Y' แล้วกด Enter
3. ตัวติดตั้งจะทำการก๊อปปี้ไฟล์ภาษาไปยังโฟลเดอร์ตัวเกมพร้อมกับเปลี่ยนภาษาให้เลย
4. สามารถเข้าเกมได้เลย เกมก็น่าจะเป็นภาษาไทยแล้ว พร้อมซับไตเติ้ล

ตัวนี้เทสแล้วบน Windows 11 ที่ซื้อเกมและเล่นผ่านระบบ Steam, ถ้ามีปัญหาให้ใช้แบบ Manual ลงมือเอา

![install](https://i.imgur.com/JwIikvd.png)

## 📦 Installation (Manual)
สำหรับการลงแบบ Manual ไม่ยากให้ทำตามนี้
1. ดาวน์โหลดจากหน้าหลัก ปุ่มเขียว Code > Download Zip
2. แตกไฟล์ civ-vii-thai-localization-main.zip
3. เข้าไปที่โฟล์เดอร์และก๊อปปี้โฟลเดอร์ 'Base' และ 'DLC' (Ctrl+C)
4. ให้ไปที่ที่เราติดตั้งเกมไว้ สมมุติว่า 'C:\Program Files (x86)\Steam\steamapps\common\Sid Meier's Civilization VII'
5. ให้วาง (Ctrl+V) ลงแล้วกดตกลงหากมีหน้าต่างขึ้นมา
6. เข้าเกมไป 1 รอบและไปที่ Options ไปเปลี่ยนเป็นภาษาไทยแล้วออกจากเกม จากนั้นถ้าเข้าไปก็น่าจะเป็นภาษาไทยแล้ว

## 📦 Installation MacOS (Manual)
สำหรับ MacOS จะต้องลงแบบ Manual เท่านั้นซึ่งจะยุ่งยากเพิ่มขึ้น
1. ดาวน์โหลดจากหน้าหลัก ปุ่มเขียว Code > Download Zip
2. แตกไฟล์ civ-vii-thai-localization-main.zip
3. เข้าไปที่โฟล์เดอร์และก๊อปปี้โฟลเดอร์ 'Base' และ 'DLC' (Command+C)
4. ให้ไปที่ที่เราติดตั้งเกมไว้ '/Users/admin/Library/Application Support/Steam/steamapps/common/Sid Meier's Civilization VII'<br>
หรือ ไปคลิกขวาที่เกมใน Steam เลือก Properties แล้วไปหน้า Installed File เลือก Browse
5. จะมี CivilizationVII.app อยู่ให้ คลิกขวาเลือก Show Package Content จะเข้าไปข้างในได้
6. เข้าไปใน 'Contents/Resources/' จะพบตัวไฟล์เกมใน MacOS
7. ให้วาง (Command+V) ลง หากมีหน้าต่างขึ้นมา กด Merge แล้วติ๊กถูกที่ Apply to All (ห้ามกด Replace ไฟล์เกมจะหายไปด้วย)
8. เข้าเกมไป 1 รอบและไปที่ Options ไปเปลี่ยนเป็นภาษาไทยแล้วออกจากเกม จากนั้นถ้าเข้าไปก็น่าจะเป็นภาษาไทยแล้ว

![installmac](https://i.imgur.com/j67uZWq.png)
![installmac](https://i.imgur.com/xFSzTqd.png)

## 🪙 Credits

- **Project Lead**: Scotty1944
- **Contributors**: 
  - Kudo (Dog)
  - Zindi (QA)

ของขวัญวันเกิดอายุ 1 ขวบ ให้คุโด้หมารัก (14 กุมภาพันธ์ 2025)<br>
หากสนใจซื้อ อาหารบาร์ฟ ให้น้องทักมาส่วนตัวได้ 😂

![kudo](https://i.imgur.com/n9iOV0R.jpeg)

## 🪪 License
ไม่อนุญาติให้นำไปขายต่อใดๆทั้งสิ้น โปรเจกต์นี้จัดทำเพื่อสาธารณะทุกคนควรได้โหลดฟรี

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
