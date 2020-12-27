CREATE TABLE "Category" (
  "id" SERIAL PRIMARY KEY,
  "name" nvarchar(255),
  "describe" nvarchar(255),
  "createdAt" date
);

CREATE TABLE "SubCategory" (
  "id" SERIAL PRIMARY KEY,
  "name" nvarchar(255),
  "describe" nvarchar(255),
  "categoryId" int,
  "createdAt" date
);

CREATE TABLE "Course" (
  "id" SERIAL PRIMARY KEY,
  "title" nvarchar(255),
  "description" nvarchar(1000),
  "fullDescription" nvarchar(4000),
  "subCategoryId" int,
  "categoryId" int,
  "avatar" int,
  "price" long,
  "active" boolean,
  "createdAt" date
);

CREATE TABLE "Promotion" (
  "id" SERIAL PRIMARY KEY,
  "name" int,
  "description" nvarchar(255),
  "discout" int,
  "courseId" int,
  "createdAt" date
);

CREATE TABLE "Join" (
  "id" SERIAL PRIMARY KEY,
  "userId" int,
  "courseId" int,
  "createdAt" date
);

CREATE TABLE "CourseChapter" (
  "id" SERIAL PRIMARY KEY,
  "name" nvarchar(255),
  "description" nvarchar(255),
  "preview" boolean,
  "courseId" int,
  "createdAt" date
);

CREATE TABLE "CourseDocument" (
  "id" SERIAL PRIMARY KEY,
  "name" nvarchar(255),
  "type" int,
  "description" nvarchar(255),
  "link" nvarchar(255),
  "preview" boolean,
  "courseChapterId" int,
  "createdAt" date
);

CREATE TABLE "WatchList" (
  "id" SERIAL PRIMARY KEY,
  "userId" int,
  "courseId" int,
  "createdAt" date
);

CREATE TABLE "Rate" (
  "id" SERIAL PRIMARY KEY,
  "point" int,
  "comment" nvarchar(4000),
  "courseId" int,
  "createdAt" date
);

CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "name" nvarchar(255),
  "email" nvarchar(255),
  "password" nvarchar(255),
  "rfToken" nvarchar(255),
  "active" boolean,
  "roleId" int,
  "createdAt" date
);

CREATE TABLE "OTP" (
  "id" SERIAL PRIMARY KEY,
  "userId" int,
  "code" nvarchar(8),
  "active" boolean,
  "createdAt" date
);

CREATE TABLE "Role" (
  "id" SERIAL PRIMARY KEY,
  "name" int,
  "createdAt" date
);

ALTER TABLE "User" ADD FOREIGN KEY ("roleId") REFERENCES "Role" ("id");

ALTER TABLE "OTP" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id");

ALTER TABLE "WatchList" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id");

ALTER TABLE "Rate" ADD FOREIGN KEY ("courseId") REFERENCES "Course" ("id");

ALTER TABLE "WatchList" ADD FOREIGN KEY ("courseId") REFERENCES "Course" ("id");

ALTER TABLE "CourseChapter" ADD FOREIGN KEY ("courseId") REFERENCES "Course" ("id");

ALTER TABLE "Promotion" ADD FOREIGN KEY ("courseId") REFERENCES "Course" ("id");

ALTER TABLE "CourseDocument" ADD FOREIGN KEY ("courseChapterId") REFERENCES "CourseChapter" ("id");

ALTER TABLE "Course" ADD FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory" ("id");

ALTER TABLE "Course" ADD FOREIGN KEY ("categoryId") REFERENCES "Category" ("id");

ALTER TABLE "SubCategory" ADD FOREIGN KEY ("categoryId") REFERENCES "Category" ("id");
