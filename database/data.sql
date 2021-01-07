INSERT INTO categories(id, name, description, "parentId", "createdAt", "updatedAt")
VALUES 
(1,'Lập trình','Các môn học lập trình',null, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(2,'Cơ bản','Các môn học cơ bản',null,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(3,'Hội họa','Các môn học về hội họa',null,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(4,'Kinh tế','Các môn học về kinh tế',null,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(5,'Kỹ năng sống','Các môn học về kỹ năng sống',null,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(6,'Lập trình web','Lập trình web',1,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(7,'Lập trình mobile','Lập trình mobile',1,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(8,'Toán','Các môn học Toán',2,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(9,'Lý','Các môn học Lý',2,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(10,'Hóa','Các môn học Hóa',2,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(11,'Trừu tượng','Hội họa trừu tượng',3,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(12,'Hiện đại','Hội họa hiện đại',3,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(13,'Kinh doanh 1','Kinh tế thế giới',4,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(14,'Kinh doanh 2','Kinh tế Việt Nam',4,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(15,'Giao tiếp','Kỹ năng giao tiếp',5,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(16,'Làm việc nhóm','Kỹ năng giao tiếp làm việc nhóm',5,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(17,'Trình bày','Kỹ năng trình bày',5,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(18,'Tư duy','Kỹ năng tư duy',5,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(19,'Sắp xếp công việc','Kỹ năng sắp xếp',5,'2020-12-15 04:34:33', '2020-12-15 04:34:33')
RETURNING *;

INSERT INTO "courses" (id, title, description, "fullDescription", "categoryId", "avatar", "price", "active", "createdAt", "updatedAt")
VALUES (1,'Lập trình nodejs cơ bản','Hiểu biết cơ bản về nodejs','Node.js là một JavaScript runtime được build dựa trên Chrome’s V8 JavaScript engine. Node.js sử dụng mô hình event-driven, non-blocking I/O khiến nó trở nên nhẹ và hiệu quả.', 6, 'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(2,'Lập trình nodejs nâng cao','Hiểu biết cơ bản về nodejs','Node.js là một JavaScript runtime được build dựa trên Chrome’s V8 JavaScript engine. Node.js sử dụng mô hình event-driven, non-blocking I/O khiến nó trở nên nhẹ và hiệu quả.', 6,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(3,'Lập trình ReactJS cơ bản','Hiểu biết cơ bản về nodejs','full mô tả',6,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(4,'Lập trình ReactJS nâng cao','Hiểu biết cơ bản về nodejs','full mô tả',6,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(5,'Toán hình lớp 11','Toán hình lớp 11','Gồm 12 chương bao gồm các kiến thức cơ bản về môn toán hình lớp 11, giúp cho chúng ta có cái nhìn tổng quát và đơn giản về môn học',8,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(6,'Lý lớp 11','Đầy đủ bài học về lý lớp 11','Gồm 8 chương bao gồm các kiến thức cơ bản về môn lý lớp 11, giúp cho chúng ta có cái nhìn tổng quát và đơn giản về môn học',9,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(7,'Hóa lớp 11','Đầy đủ bài học về hóa lớp 11','Gồm 6 chương bao gồm các kiến thức cơ bản về môn lý hóa 11, giúp cho chúng ta có cái nhìn tổng quát và đơn giản về môn học, đồng thời đưa ra các ví dụ thực tiện học sinh có thể áp dụng vào đời sống thường ngày rất bổ ích. Hãy tham gia lớp học với thầy nào!!!',10,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(8,'Hội họa trừu tượng 1','Hội họa trừu tượng phần 1','full mô tả',11,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(9,'Hội họa trừu tượng 2','Hội họa trừu tượng phần 2','full mô tả',11,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(10,'Hội họa hiện đại 1','Hội họa hiện đại phần 1','full mô tả',12,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(11,'Kinh doanh thế giới 1','Kinh doanh thế giới  phần 1','full mô tả',13,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(12,'Kinh doanh VN 1','Kinh doanh VN  phần 1','full mô tả',14,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(13,'Giao tiếp 1','Giao tiếp phần 1','full mô tả',15,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(14,'Làm việc nhóm 1','Làm việc nhóm phần 1','full mô tả',16,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(15,'Trình bày 1','Trình bày phần 1','full mô tả',17,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(16,'Lập trình VueJS cơ bản','Lập trình VueJS cơ bản','full mô tả',6,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(17,'Lập trình VueJS nâng cao','Lập trình VueJS nâng cao','full mô tả',6,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(18,'Lập trình Java cơ bản','Lập trình Java cơ bản','full mô tả',7,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(19,'Lập trình Java nâng cao','Lập trình Java nâng cao','full mô tả',7,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(20,'Lập trình Golang cơ bản','Lập trình Golang cơ bản','full mô tả',7,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(21,'Lập trình Golang nâng cao','Lập trình Golang nâng cao','full mô tả',7,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(22,'Lập trình React native cơ bản','Lập trình React native cơ bản','full mô tả',7,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(23,'Lập trình React native nâng cao','Lập trình React native nâng cao','full mô tả',7,'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',1000000, true ,'2006-02-15 04:46:27','2006-02-15 04:46:27'),
(24,'Lập trình nodejs nâng cao 2','Hiểu biết cơ bản về nodejs','Node.js là một JavaScript runtime được build dựa trên Chrome’s V8 JavaScript engine. Node.js sử dụng mô hình event-driven, non-blocking I/O khiến nó trở nên nhẹ và hiệu quả.', 6, 'https://chandra.harvard.edu/photo/2017/arp299/arp299_4k.jpg',2000000, true ,'2007-02-15 04:46:27','2007-02-15 04:46:27')
RETURNING *;
INSERT INTO "courseChapters" (id, name, description, preview, "courseId", "createdAt", "updatedAt")
VALUES 
(1,'Chương 1. Giói thiệu','tổng quan',true, 6,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(2,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 6,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(3,'Chương 3. Vòng lặp','tổng quan',false, 6,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(46,'Chương 4. điều kiện','if else',false, 6,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(4,'Chương 1. Giói thiệu','tổng quan',true, 7,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(5,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 7,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(6,'Chương 3. Vòng lặp','tổng quan',false, 7,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(7,'Chương 1. Giói thiệu','tổng quan',true, 8,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(8,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 8,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(9,'Chương 3. Vòng lặp','tổng quan',false, 8,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(10,'Chương 1. Giói thiệu','tổng quan',true, 9,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(11,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 9,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(12,'Chương 3. Vòng lặp','tổng quan',false, 9,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(13,'Chương 1. Giói thiệu','tổng quan',true, 10,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(14,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 10,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(15,'Chương 3. Vòng lặp','tổng quan',false, 10,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(16,'Chương 1. Giói thiệu','tổng quan',true, 11,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(17,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 11,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(18,'Chương 3. Vòng lặp','tổng quan',false, 11,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(19,'Chương 1. Giói thiệu','tổng quan',true, 12,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(20,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 12,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(21,'Chương 3. Vòng lặp','tổng quan',false, 12,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(22,'Chương 1. Giói thiệu','tổng quan',true, 13,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(23,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 13,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(24,'Chương 3. Vòng lặp','tổng quan',false, 13,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(25,'Chương 1. Giói thiệu','tổng quan',true, 14,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(26,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 14,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(27,'Chương 3. Vòng lặp','tổng quan',false, 14,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(28,'Chương 1. Giói thiệu','tổng quan',true, 15,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(29,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 15,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(30,'Chương 3. Vòng lặp','tổng quan',false, 15,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(31,'Chương 1. Giói thiệu','tổng quan',true, 16,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(32,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 16,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(33,'Chương 3. Vòng lặp','tổng quan',false, 16,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(34,'Chương 1. Giói thiệu','tổng quan',true, 17,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(35,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 17,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(36,'Chương 3. Vòng lặp','tổng quan',false, 17,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(37,'Chương 1. Giói thiệu','tổng quan',true, 18,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(38,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 18,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(39,'Chương 3. Vòng lặp','tổng quan',false, 18,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(40,'Chương 1. Giói thiệu','tổng quan',true, 19,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(41,'Chương 2. Kiểu dữ liệu','các kiểu dữ liệu',true, 19,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(42,'Chương 3. Vòng lặp','tổng quan',false, 19,'2020-12-15 04:34:33', '2020-12-15 04:34:33')

RETURNING *;




-- 0 tài liệu, 1 video, 2 mp3
INSERT INTO "courseDocuments" (id, name,type , description, link, preview, "courseChapterId", "createdAt", "updatedAt")
VALUES 
(1,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,1,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(2,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,1,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(3,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,2,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(4,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,3,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(5,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,4,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(6,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,4,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(7,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,5,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(8,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,6,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(9,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,7,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(10,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,7,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(11,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,8,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(12,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,9,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(13,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,10,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(14,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,10,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(15,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,11,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(16,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,12,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(17,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,13,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(18,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,13,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(19,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,14,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(20,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,15,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(21,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,16,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(22,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,16,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(23,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,17,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(24,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,18,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(25,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,19,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(26,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,19,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(27,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,20,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(28,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,21,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(29,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,22,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(30,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,22,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(31,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,23,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(32,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,24,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(33,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,25,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(34,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,25,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(35,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,26,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(36,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,27,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(37,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,28,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(38,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,28,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(39,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,29,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(40,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,30,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(41,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,31,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(42,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,31,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(43,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,32,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(44,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,33,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(45,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,34,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(46,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,34,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(47,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,35,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(48,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,36,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(49,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,37,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(50,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,37,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(51,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,38,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(52,'Vòng lặp',1,'Chương 3. Vidoe vòng lặp','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', false,39,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),

(53,'Đề cương',0,'Tài liệu đề cương','https://cisse.info/pdf/2019/rr_01_artificial_intelligence.pdf', true,40,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(54,'Giới thiệu',1,'Chương 1. Video chương 1','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,41,'2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(55,'Kiểu dữ liệu',1,'Chương 2. Video kiểu dữ liệu','https://media.w3.org/2010/05/sintel/trailer_hd.mp4', true,42,'2020-12-15 04:34:33', '2020-12-15 04:34:33')
RETURNING *;


INSERT INTO "roles" (id, name, "createdAt", "updatedAt")
VALUES 
(1, 'Quản trị viên', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(2, 'Giáo viên', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(3, 'Sinh viên', '2020-12-15 04:34:33', '2020-12-15 04:34:33')
RETURNING *;

INSERT INTO "users"(id, name, email, password, "rfToken", active, "roleId", "createdAt", "updatedAt")
VALUES 
(1, 'admin', 'admin@gmail.com', 'pass', '', true, 1, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(2, 'admin2', 'admin2@gmail.com', 'pass', '', true, 1, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(3, 'hs1', 'hs1@gmail.com', 'pass', '', true, 3, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(4, 'hs2', 'hs2@gmail.com', 'pass', '', true, 3, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(5, 'hs3', 'hs3@gmail.com', 'pass', '', true, 3, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(6, 'hs4', 'hs4@gmail.com', 'pass', '', true, 3, '2020-12-15 04:34:33', '2020-12-15 04:34:33')
RETURNING *;





INSERT INTO "courseTeachers" (id, "userId", "courseId", "createdAt", "updatedAt")
VALUES 
(1, 1, 1, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(2, 2, 1, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(4, 1, 2, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(5, 2, 3, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(6, 1, 4, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(7, 2, 5, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(8, 1, 16, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(9, 2, 7, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(10, 1, 8, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(11, 1, 9, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(12, 2, 10, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(13, 2, 11, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(14, 1, 12, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(15, 2, 13, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(16, 1, 14, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(17, 2, 15, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(18, 2, 17, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(19, 2, 18, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(20, 2, 19, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(21, 2, 20, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(22, 2, 21, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(23, 2, 22, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(24, 2, 23, '2020-12-15 04:34:33', '2020-12-15 04:34:33')

RETURNING *;

INSERT INTO "rates" (id, "userId", "courseId",point, comment, "createdAt", "updatedAt")
VALUES
(1, 3, 1, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(2, 4, 1, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(3, 5, 1, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(4, 6, 1, 3, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(5, 3, 2, 4, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(6, 4, 2, 3, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(7, 3, 2, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(8, 4, 2, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(9, 5, 2, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(10, 3, 3, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(11, 3, 4, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(12, 3, 5, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(13, 3, 6, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(14, 3, 7, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(15, 3, 8, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(16, 3, 9, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(17, 3, 10, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(18, 3, 11, 5, 'tốt', '2020-12-15 04:34:33', '2020-12-15 04:34:33')

RETURNING *;

INSERT INTO "promotions" (id, name,description, discout,"courseId",  "createdAt", "updatedAt")
VALUES
(1, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 1, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(2, 'Được nhận nhiều hỗ trợ từ giảng viên', 'Khóa học được biệt', 0, 1, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(3, 'Giảm 15 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 15, 2, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(4, 'Giảm 5 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 5, 3, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(5, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 4, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(6, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 5, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(7, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 6, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(8, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 7, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(9, 'Được nhận nhiều hỗ trợ từ giảng viên', 'Khóa học được biệt', 0, 7, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(10, 'Giảm 15 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 15, 8, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(11, 'Giảm 5 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 5, 9, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(12, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 10, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(13, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 11, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(14, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 12, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(15, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 13, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(16, 'Được nhận nhiều hỗ trợ từ giảng viên', 'Khóa học được biệt', 0, 14, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(17, 'Giảm 15 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 15, 15, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(18, 'Giảm 5 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 5, 16, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(19, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 17, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(20, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 18, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(21, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 19, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(22, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 20, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(23, 'Được nhận nhiều hỗ trợ từ giảng viên', 'Khóa học được biệt', 0, 21, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(24, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 22, '2020-12-15 04:34:33', '2020-12-15 04:34:33'),
(25, 'Giảm 10 % tháng 1', 'Giảm sốc 10% nhanh tay lên', 10, 23, '2020-12-15 04:34:33', '2020-12-15 04:34:33')

RETURNING *;

