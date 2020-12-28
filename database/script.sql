CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "description" varchar(255),
  "parent_id" int,
  "created_at" date
);

CREATE TABLE "course" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "description" varchar(1000),
  "full_description" varchar(4000),
  "category_id" int NOT NULL,
  "avatar" varchar(255),
  "price" bigint,
  "active" boolean NOT NULL default TRUE,
  "created_at" date
);

CREATE TABLE "promotion" (
  "id" SERIAL PRIMARY KEY,
  "name" int,
  "description" varchar(255),
  "discout" int not null,
  "course_id" int not null,
  "created_at" date
);

CREATE TABLE "course_teacher" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int NOT NULL,
  "course_id" int NOT NULL,
  "created_at" date
);

CREATE TABLE "course_student" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int NOT NULL,
  "course_id" int NOT NULL,
  "created_at" date
);

CREATE TABLE "course_chapter" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "description" varchar(255),
  "preview" boolean,
  "course_id" int NOT NULL,
  "created_at" date
);

CREATE TABLE "course_document" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "type" int NOT NULL default 0,
  "description" varchar(255),
  "link" varchar(255),
  "preview" boolean,
  "course_chapter_id" int NOT NULL,
  "created_at" date
);

CREATE TABLE "watch_list" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int NOT NULL,
  "course_id" int NOT NULL,
  "created_at" date
);

CREATE TABLE "rate" (
  "id" SERIAL PRIMARY KEY,
  "point" int NOT NULL,
  "comment" varchar(4000),
  "course_id" int NOT NULL ,
  "created_at" date
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255),
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "rf_token" varchar(255) NOT NULL,
  "active" boolean NOT NULL default FALSE,
  "role_id" int,
  "created_at" date
);

CREATE TABLE "otp" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "code" varchar(8),
  "active" boolean,
  "created_at" date
);

CREATE TABLE "role" (
  "id" SERIAL PRIMARY KEY,
  "name" int,
  "created_at" date
);

ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "otp" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");


ALTER TABLE "course_student" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "course_teacher" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "course_student" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("id");

ALTER TABLE "course_teacher" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("id");

ALTER TABLE "watch_list" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "rate" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("id");

ALTER TABLE "watch_list" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("id");

ALTER TABLE "course_chapter" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("id");

ALTER TABLE "promotion" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("id");

ALTER TABLE "course_document" ADD FOREIGN KEY ("course_chapter_id") REFERENCES "course_chapter" ("id");


ALTER TABLE "course" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "category" ADD FOREIGN KEY ("parent_id") REFERENCES "category" ("id");


------------------
--Func xóa dấu

CREATE OR REPLACE FUNCTION vn_unaccent(text)
  RETURNS text AS
$func$
SELECT lower(translate($1,
'¹²³ÀÁẢẠÂẤẦẨẬẪÃÄÅÆàáảạâấầẩẫậãäåæĀāĂẮẰẲẴẶăắằẳẵặĄąÇçĆćĈĉĊċČčĎďĐđÈÉẸÊẾỀỄỆËèéẹêềếễệëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨÌÍỈỊÎÏìíỉịîïĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÒÓỎỌÔỐỒỔỖỘỐỒỔỖỘƠỚỜỞỠỢÕÖòóỏọôốồổỗộơớờỡợởõöŌōŎŏŐőŒœØøŔŕŖŗŘřßŚśŜŝŞşŠšŢţŤťŦŧÙÚỦỤƯỪỨỬỮỰÛÜùúủụûưứừửữựüŨũŪūŬŭŮůŰűŲųŴŵỹỸÝýÿŶŷŸŹźŻżŽžёЁ',
'123AAAAAAAAAAAAAAaaaaaaaaaaaaaaAaAAAAAAaaaaaaAaCcCcCcCcCcDdDdEEEEEEEEEeeeeeeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIIIIiiiiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnOOOOOOOOOOOOOOOOOOOOOOOooooooooooooooooooOoOoOoEeOoRrRrRrSSsSsSsSsTtTtTtUUUUUUUUUUUUuuuuuuuuuuuuUuUuUuUuUuUuWwyYYyyYyYZzZzZzеЕ'));
$func$ LANGUAGE sql IMMUTABLE;

---------------------------------
-- FTS category
ALTER TABLE category ADD COLUMN category_tsv tsvector

CREATE OR REPLACE FUNCTION category_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.category_tsv =
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.name))), 'A') ||
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.description))), 'C');
RETURN NEW;
END $$;

CREATE TRIGGER category_tsv_trigger BEFORE INSERT OR UPDATE
OF "name", "description" ON category FOR EACH ROW
EXECUTE PROCEDURE category_tsv_trigger_func();

CREATE INDEX category_idx ON category USING GIN(category_tsv);


------------------------------
-- FTS course
ALTER TABLE course ADD COLUMN course_tsv tsvector

CREATE OR REPLACE FUNCTION course_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.course_tsv =
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.title))), 'A') ||
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.description))), 'C') ||
	setweight(to_tsvector(coalesce(vn_unaccent(NEW.full_description))), 'D') ;
RETURN NEW;
END $$;

CREATE TRIGGER course_tsv_trigger BEFORE INSERT OR UPDATE
OF "title", "description", "full_description" ON course FOR EACH ROW
EXECUTE PROCEDURE course_tsv_trigger_func();

CREATE INDEX course_idx ON course USING GIN(course_tsv);
