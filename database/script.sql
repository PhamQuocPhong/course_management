CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "describe" varchar(255),
  "createdAt" date
);

CREATE TABLE "subCategory" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "describe" varchar(255),
  "categoryId" int NOT NULL,
  "createdAt" date
);

CREATE TABLE "course" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "description" varchar(1000),
  "fullDescription" varchar(4000),
  "subCategoryId" int NOT NULL,
  "categoryId" int NOT NULL,
  "avatar" varchar(255),
  "price" bigint,
  "active" boolean NOT NULL default TRUE,
  "createdAt" date
);

CREATE TABLE "promotion" (
  "id" SERIAL PRIMARY KEY,
  "name" int,
  "description" varchar(255),
  "discout" int not null,
  "courseId" int not null,
  "createdAt" date
);

CREATE TABLE "join" (
  "id" SERIAL PRIMARY KEY,
  "userId" int NOT NULL,
  "courseId" int NOT NULL,
  "createdAt" date
);

CREATE TABLE "courseChapter" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "description" varchar(255),
  "preview" boolean,
  "courseId" int NOT NULL,
  "createdAt" date
);

CREATE TABLE "courseDocument" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "type" int NOT NULL default 0,
  "description" varchar(255),
  "link" varchar(255),
  "preview" boolean,
  "courseChapterId" int NOT NULL,
  "createdAt" date
);

CREATE TABLE "watchList" (
  "id" SERIAL PRIMARY KEY,
  "userId" int NOT NULL,
  "courseId" int NOT NULL,
  "createdAt" date
);

CREATE TABLE "rate" (
  "id" SERIAL PRIMARY KEY,
  "point" int NOT NULL,
  "comment" varchar(4000),
  "courseId" int NOT NULL ,
  "createdAt" date
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255),
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "rfToken" varchar(255) NOT NULL,
  "active" boolean NOT NULL default FALSE,
  "roleId" int,
  "createdAt" date
);

CREATE TABLE "OTP" (
  "id" SERIAL PRIMARY KEY,
  "userId" int,
  "code" varchar(8),
  "active" boolean,
  "createdAt" date
);

CREATE TABLE "role" (
  "id" SERIAL PRIMARY KEY,
  "name" int,
  "createdAt" date
);

ALTER TABLE "user" ADD FOREIGN KEY ("roleId") REFERENCES "role" ("id");

ALTER TABLE "OTP" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "watchList" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "rate" ADD FOREIGN KEY ("courseId") REFERENCES "course" ("id");

ALTER TABLE "watchList" ADD FOREIGN KEY ("courseId") REFERENCES "course" ("id");

ALTER TABLE "courseChapter" ADD FOREIGN KEY ("courseId") REFERENCES "course" ("id");

ALTER TABLE "promotion" ADD FOREIGN KEY ("courseId") REFERENCES "course" ("id");

ALTER TABLE "courseDocument" ADD FOREIGN KEY ("courseChapterId") REFERENCES "courseChapter" ("id");

ALTER TABLE "course" ADD FOREIGN KEY ("subCategoryId") REFERENCES "subCategory" ("id");

ALTER TABLE "course" ADD FOREIGN KEY ("categoryId") REFERENCES "category" ("id");

ALTER TABLE "subCategory" ADD FOREIGN KEY ("categoryId") REFERENCES "category" ("id");


------------------
ALTER TABLE category ADD COLUMN category_tsv tsvector

CREATE OR REPLACE FUNCTION vn_unaccent(text)
  RETURNS text AS
$func$
SELECT lower(translate($1,
'¹²³ÀÁẢẠÂẤẦẨẬẪÃÄÅÆàáảạâấầẩẫậãäåæĀāĂẮẰẲẴẶăắằẳẵặĄąÇçĆćĈĉĊċČčĎďĐđÈÉẸÊẾỀỄỆËèéẹêềếễệëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨÌÍỈỊÎÏìíỉịîïĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÒÓỎỌÔỐỒỔỖỘỐỒỔỖỘƠỚỜỞỠỢÕÖòóỏọôốồổỗộơớờỡợởõöŌōŎŏŐőŒœØøŔŕŖŗŘřßŚśŜŝŞşŠšŢţŤťŦŧÙÚỦỤƯỪỨỬỮỰÛÜùúủụûưứừửữựüŨũŪūŬŭŮůŰűŲųŴŵỹỸÝýÿŶŷŸŹźŻżŽžёЁ',
'123AAAAAAAAAAAAAAaaaaaaaaaaaaaaAaAAAAAAaaaaaaAaCcCcCcCcCcDdDdEEEEEEEEEeeeeeeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIIIIiiiiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnOOOOOOOOOOOOOOOOOOOOOOOooooooooooooooooooOoOoOoEeOoRrRrRrSSsSsSsSsTtTtTtUUUUUUUUUUUUuuuuuuuuuuuuUuUuUuUuUuUuWwyYYyyYyYZzZzZzеЕ'));
$func$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION category_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.category_tsv =
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.name))), 'A') ||
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.describe))), 'C');
RETURN NEW;
END $$;

CREATE TRIGGER category_tsv_trigger BEFORE INSERT OR UPDATE
OF "name", "describe" ON category FOR EACH ROW
EXECUTE PROCEDURE category_tsv_trigger_func();

CREATE INDEX category_idx ON category USING GIN(category_tsv);


------------------------------
ALTER TABLE course ADD COLUMN course_tsv tsvector

CREATE OR REPLACE FUNCTION course_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.course_tsv =
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.title))), 'A') ||
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.description))), 'C') ||
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.fullDescription))), 'D') ;
RETURN NEW;
END $$;

CREATE TRIGGER course_tsv_trigger BEFORE INSERT OR UPDATE
OF "title", "description", "fullDescription" ON course FOR EACH ROW
EXECUTE PROCEDURE course_tsv_trigger_func();

CREATE INDEX course_idx ON course USING GIN(course_tsv);

--------------------------------

ALTER TABLE "subCategory" ADD COLUMN "subCategory_tsv" tsvector

CREATE OR REPLACE FUNCTION subCategory_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.category_tsv =
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.name))), 'A') ||
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.describe))), 'C');
RETURN NEW;
END $$;

CREATE TRIGGER subCategory_tsv_trigger BEFORE INSERT OR UPDATE
OF "name", "describe" ON "subCategory" FOR EACH ROW
EXECUTE PROCEDURE subCategory_tsv_trigger_func();

CREATE INDEX "subCategory_idx" ON "subCategory" USING GIN("subCategory_tsv");
