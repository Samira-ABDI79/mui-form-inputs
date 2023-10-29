# استفاده از یک تصویر پایه Node.js
FROM node:latest

# مسیر کاری درون کانتینر
WORKDIR /app

# کپی کردن فایل‌های پروژه به داخل کانتینر
COPY package.json .
COPY package-lock.json .

# نصب وابستگی‌های پروژه
RUN npm install --legacy-peer-deps
# کپی کردن سایر فایل‌های پروژه به داخل کانتینر
COPY . .

# بیلد پروژه
RUN npm run build

# پورتی که برنامه React بر روی آن اجرا می‌شود
EXPOSE 3000

# دستور اجرای برنامه
CMD ["npm", "start"]