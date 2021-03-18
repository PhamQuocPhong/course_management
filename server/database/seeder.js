const Sequelize = require('sequelize')
const db = require('./db')

const Category =  require('../models/category')
const Course = require('../models/course')
const CourseDocument = require('../models/course_document')
const CourseTeacher = require('../models/course_teacher')
const CourseStudent = require('../models/course_student')
const CourseChapter = require('../models/course_chapter')
const Promotion = require('../models/promotion')
const Rate = require('../models/rate')
const Role = require('../models/role')
const User = require('../models/user')
const WatchList = require('../models/watch_list')
const ActiveMail = require('../models/active_mail');
const RateTotal = require('../models/rate_total');
const StateDocument = require('../models/course_document');

let bulkData = async () => {

	var role = await Role.bulkCreate(
		[
			{
				id: 1,
				name: 'Quản trị viên'
			},
			{
				id: 2,
				name: 'Giáo viên'
			},
			{
				id: 3,
				name: 'Sinh viên'
			}
		]	
	)

	var category = await Category.bulkCreate([
		{
			id: 1,
			name: 'Sinh học',
			description: 'Các kiến thức về sinh học cần biết trong đời sống'
		},
		{
			id: 2,
			name: 'Sinh học cơ bản',
			description: 'Các khóa học về môn sinh học cơ bản',
			parentId: 1
		},
		{
			id: 3,
			name: 'Sinh học nâng cao',
			description: 'Các khóa học về môn sinh học nâng cao',
			parentId: 1
		},
		{
			id: 4,
			name: 'Khoa học máy tính',
			description: 'Các kiến thức về Khoa học máy tính cần biết trong đời sống'
		},
		{
			id: 5,
			name: 'Khoa học máy tính cơ bản',
			description: 'Các khóa học về môn Khoa học máy tính cơ bản',
			parentId: 4
		},
		{
			id: 6,
			name: 'Khoa học máy tính nâng cao',
			description: 'Các khóa học về môn Khoa học máy tính nâng cao',
			parentId: 4
		},
		{
			id: 7,
			name: 'Khoa học máy tính tìm hiểu thêm',
			description: 'Các khóa học về môn Khoa học máy tính thêm',
			parentId: 4
		},	
		{
			id: 8,
			name: 'Toán',
			description: 'Các kiến thức về toán cần biết trong đời sống',
		},	
		{
			id: 9,
			name: 'Toán hiện đại',
			description: 'Các khóa học về môn toán hiện đại',
			parentId: 8
		},	
		{
			id: 10,
			name: 'Toán cổ điển',
			description: 'Các khóa học về môn toán cổ điển',
			parentId: 8
		}
	])

	if(role){
		var user = await User.bulkCreate([
			{
				id: 1,
				name: 'Nguyễn Văn',
				email: 'qtv8686@gmail.com',
				password: 'JznaLfHluRo9pS1240YftaFCTKCMTBTv',
				active: true,
				roleId: 1,

			},
			{
				id: 2,
				name: 'Chiến Thắng',
				email: 'gv8686@gmail.com',
				password: 'JznaLfHluRo9pS1240YftaFCTKCMTBTv',
				active: true,
				roleId: 2,
			},
			{
				id: 3,
				name: 'Thành Công',
				email: 'hv8686@gmail.com',
				password: 'JznaLfHluRo9pS1240YftaFCTKCMTBTv',
				active: true,
				roleId: 3,
			},
			
		])
	}


	await Course.bulkCreate(
		[
			{
				id: 1,
				title: 'Giảng dạy Khoa học và Kỹ thuật Sinh học',
				description: 'Hội thảo có sự tham gia này tập trung vào kiến ​​thức và kỹ năng cần thiết cho việc giảng dạy khoa học và kỹ thuật trong giáo dục đại học',
				fullDescription: 'Hội thảo có sự tham gia này tập trung vào kiến ​​thức và kỹ năng cần thiết cho việc giảng dạy khoa học và kỹ thuật trong giáo dục đại học. Nó được thiết kế cho các sinh viên sau đại học quan tâm đến sự nghiệp học tập và bất kỳ ai khác quan tâm đến việc giảng dạy. Sinh viên nghiên cứu và trình bày một chủ đề có liên quan mà họ quan tâm đặc biệt. Môn học phù hợp cho cả người mới học và những người đã có kinh nghiệm giảng dạy.',
				avatar: 'https://www.fvhospital.com/wp-content/uploads/2020/04/sars-cov-2.jpg',
				price: 100000,
				active: true,
				status: true,
				categoryId: 3,
			},

			{
				id: 2,
				title: 'Cơ bản về sinh học',
				description: 'Các nguyên tắc cơ bản của Sinh học tập trung vào các nguyên tắc cơ bản của hóa sinh, sinh học phân tử, di truyền và DNA tái tổ hợp',
				fullDescription: 'Các nguyên tắc cơ bản của Sinh học tập trung vào các nguyên tắc cơ bản của hóa sinh, sinh học phân tử, di truyền và DNA tái tổ hợp. Những nguyên tắc này là cần thiết để hiểu các cơ chế cơ bản của sự sống và củng cố kiến ​​thức sinh học cần thiết để hiểu được nhiều thách thức trong cuộc sống hàng ngày, từ sức khỏe con người và bệnh tật đến mất đa dạng sinh học và chất lượng môi trường.',
				avatar: 'https://ocw.mit.edu/courses/biology/7-01sc-fundamentals-of-biology-fall-2011/7-01scf11.jpg',
				price: 100000,
				active: true,
				status: true,
				categoryId: 2,
			},
			{
				id: 3,
				title: 'Nhập môn Sinh học (Mùa thu 2004)',
				description: 'Các nguyên tắc cơ bản của Sinh học tập trung vào các nguyên tắc cơ bản của hóa sinh, sinh học phân tử, di truyền và DNA tái tổ hợp',
				fullDescription: 'Các khóa học chính của Khoa Sinh học MIT, 7.012, 7.013 và 7.014, đều bao gồm cùng một tài liệu cốt lõi, bao gồm các nguyên tắc cơ bản của hóa sinh, di truyền, sinh học phân tử và sinh học tế bào. Chức năng sinh học ở cấp độ phân tử được đặc biệt nhấn mạnh và bao gồm cấu trúc và quy định của gen, cũng như, cấu trúc và tổng hợp protein, cách các phân tử này được tích hợp vào tế bào và cách các tế bào này được tích hợp vào các hệ thống và sinh vật đa bào. Ngoài ra, mỗi phiên bản của môn học đều có chất liệu đặc trưng riêng.7.012 tập trung vào việc khám phá các nghiên cứu hiện tại trong sinh học tế bào, miễn dịch học, sinh học thần kinh, gen và y học phân tử.Tài liệu nghiên cứu, bộ vấn đề và tài liệu đố vui được sử dụng trong mùa Thu năm 2004 cho 7.012 bao gồm sự đóng góp của các giảng viên trước đây, trợ giảng và các thành viên khác của Khoa Sinh học MIT liên kết với khóa học # 7.012. Vì các công trình sau đây đã phát triển trong khoảng thời gian nhiều năm, không có nguồn duy nhất nào có thể được quy cho.',
				avatar: 'https://ocw.mit.edu/courses/biology/7-012-introduction-to-biology-fall-2004/7-012f04.jpg',
				price: 200000,
				active: true,
				status: true,
				categoryId: 2,
			},
			{
				id: 4,
				title: 'Hóa học sinh học II',
				description: 'Khóa học này là một phương pháp điều trị tiên tiến về các cơ chế sinh hóa làm nền tảng cho các quá trình sinh học',
				fullDescription: 'Khóa học này là một phương pháp điều trị tiên tiến về các cơ chế sinh hóa làm nền tảng cho các quá trình sinh học. Các chủ đề bao gồm các máy đại phân tử như ribosome, proteasome, các tổng hợp axit béo như một mô hình cho các tổng hợp polyketide và các tổng hợp polypeptide không phải ribosome, và các polymerase. Sẽ nhấn mạnh đến các phương pháp thử nghiệm được sử dụng để làm sáng tỏ cách các quá trình này phù hợp với bối cảnh tế bào cũng như sự điều hòa phối hợp của các quá trình này.',
				avatar: 'https://ocw.mit.edu/courses/chemistry/5-08j-biological-chemistry-ii-spring-2016/5-08js16.jpg',
				price: 300000,
				active: true,
				status: true,
				categoryId: 2,
			},
			{
				id: 5,
				title: 'Cơ sở của Sinh học Hệ thống và Tính toán',
				description: 'Khóa học này là phần giới thiệu về sinh học máy tính nhấn mạnh các nguyên tắc cơ bản của axit nucleic và trình tự protein',
				fullDescription: 'Khóa học này là phần giới thiệu về sinh học máy tính nhấn mạnh các nguyên tắc cơ bản của axit nucleic và trình tự protein và phân tích cấu trúc; nó cũng bao gồm phần giới thiệu về phân tích các hệ thống sinh học phức tạp. Các chủ đề được đề cập trong khóa học bao gồm các nguyên tắc và phương pháp được sử dụng để sắp xếp trình tự, tìm kiếm mô típ, mô hình cấu trúc, dự đoán cấu trúc và mô hình mạng, cũng như các lĩnh vực nghiên cứu hiện đang phát triển.',
				avatar: 'https://ocw.mit.edu/courses/biology/7-91j-foundations-of-computational-and-systems-biology-spring-2014/7-91js14.jpg',
				price: 300000,
				active: true,
				status: true,
				categoryId: 3,
			},
			{
				id: 6,
				title: 'Giới thiệu về Kỹ thuật sinh học',
				description: 'Kỹ thuật sinh học tại MIT được đại diện bởi các chương trình giảng dạy đa dạng được cung cấp bởi hầu hết các Khoa trong Trường Kỹ thuật',
				fullDescription: 'Kỹ thuật sinh học tại MIT được đại diện bởi các chương trình giảng dạy đa dạng được cung cấp bởi hầu hết các Khoa trong Trường Kỹ thuật. Khóa học này lấy mẫu rất nhiều lựa chọn kỹ thuật sinh học cho những sinh viên dự định theo học một trong các chương trình cấp bằng Kỹ sư đại học. Các bài giảng đầu tiên mô tả cơ sở khoa học cho công nghệ sinh học, đặc biệt nhấn mạnh vào sinh học tế bào phân tử và sinh học hệ thống. Khoa kỹ thuật sinh học sau đó sẽ mô tả các lựa chọn kỹ thuật sinh học trong một khóa học kỹ thuật cụ thể cũng như loại hình nghiên cứu do giảng viên trong khoa thực hiện.',
				avatar: 'https://ocw.mit.edu/courses/biological-engineering/20-010j-introduction-to-bioengineering-be-010j-spring-2006/20-010js06.jpg',
				price: 250000,
				active: true,
				status: true,
				categoryId: 2,
			},

			{
				id: 7,
				title: 'Giới thiệu về Kỹ thuật sinh học 2',
				description: 'Kỹ thuật sinh học tại MIT được đại diện bởi các chương trình giảng dạy đa dạng được cung cấp bởi hầu hết các Khoa trong Trường Kỹ thuật',
				fullDescription: 'Kỹ thuật sinh học tại MIT được đại diện bởi các chương trình giảng dạy đa dạng được cung cấp bởi hầu hết các Khoa trong Trường Kỹ thuật. Khóa học này lấy mẫu rất nhiều lựa chọn kỹ thuật sinh học cho những sinh viên dự định theo học một trong các chương trình cấp bằng Kỹ sư đại học. Các bài giảng đầu tiên mô tả cơ sở khoa học cho công nghệ sinh học, đặc biệt nhấn mạnh vào sinh học tế bào phân tử và sinh học hệ thống. Khoa kỹ thuật sinh học sau đó sẽ mô tả các lựa chọn kỹ thuật sinh học trong một khóa học kỹ thuật cụ thể cũng như loại hình nghiên cứu do giảng viên trong khoa thực hiện.',
				avatar: 'https://gentis.com.vn/public/media/tin-tuc/1493120634_d24i9trfdh.jpg',
				price: 300000,
				active: true,
				status: true,
				categoryId: 2,
			},

			{
				id: 8,
				title: 'Giới thiệu về Kỹ thuật sinh học 3',
				description: 'Kỹ thuật sinh học tại MIT được đại diện bởi các chương trình giảng dạy đa dạng được cung cấp bởi hầu hết các Khoa trong Trường Kỹ thuật',
				fullDescription: 'Kỹ thuật sinh học tại MIT được đại diện bởi các chương trình giảng dạy đa dạng được cung cấp bởi hầu hết các Khoa trong Trường Kỹ thuật. Khóa học này lấy mẫu rất nhiều lựa chọn kỹ thuật sinh học cho những sinh viên dự định theo học một trong các chương trình cấp bằng Kỹ sư đại học. Các bài giảng đầu tiên mô tả cơ sở khoa học cho công nghệ sinh học, đặc biệt nhấn mạnh vào sinh học tế bào phân tử và sinh học hệ thống. Khoa kỹ thuật sinh học sau đó sẽ mô tả các lựa chọn kỹ thuật sinh học trong một khóa học kỹ thuật cụ thể cũng như loại hình nghiên cứu do giảng viên trong khoa thực hiện.',
				avatar: 'https://gentis.com.vn/public/media/tin-tuc/201909/pgt-xet-nghiem-adn-phat-hien-bat-thuong-di-truyen-truoc-chuyen-phoi1.jpg',
				price: 1000000,
				active: true,
				status: true,
				categoryId: 2,
			},

			//5,6,7
			{
				id: 9,
				title: 'Giới thiệu về Khoa học Máy tính và Lập trình',
				description: 'Môn học này hướng đến những sinh viên có ít hoặc chưa có kinh nghiệm lập trình',
				fullDescription: 'Môn học này hướng đến những sinh viên có ít hoặc chưa có kinh nghiệm lập trình. Nó nhằm mục đích cung cấp cho học sinh sự hiểu biết về vai trò của máy tính trong việc giải quyết vấn đề. Nó cũng nhằm mục đích giúp sinh viên, bất kể chuyên ngành của họ, cảm thấy tự tin chính đáng về khả năng của họ để viết các chương trình nhỏ cho phép họ hoàn thành các mục tiêu hữu ích. Lớp học sẽ sử dụng ngôn ngữ lập trình Python.'
				,avatar: 'https://techmaster.vn/media/fileman/Uploads/users/5463/giaithuat-thumnail.png',
				price: 1000000,
				active: true,
				status: true,
				categoryId: 5,
			},

			{
				id: 10,
				title: 'Cấu trúc và diễn giải các chương trình máy tính',
				description: 'Khóa học này giới thiệu cho sinh viên các nguyên tắc tính toán',
				fullDescription: 'Khóa học này giới thiệu cho sinh viên các nguyên tắc tính toán. Sau khi hoàn thành 6.001, sinh viên sẽ có thể giải thích và áp dụng các phương pháp cơ bản từ ngôn ngữ lập trình để phân tích các hệ thống tính toán và tạo ra các giải pháp tính toán cho các vấn đề trừu tượng. Các bài tập lập trình quan trọng hàng tuần là một phần không thể thiếu của khóa học. Khóa học này có giá trị 4 Điểm Thiết kế Kỹ thuật.',
				avatar: 'https://codelearn.io/Upload/Blog/lo-trinh-hoc-cau-truc-du-lieu-va-giai-thuat-phan-2-63723261114.6884.jpg',
				price: 1000000,
				active: true,
				status: true,
				categoryId: 5,
			},

			{
				id: 11,
				title: 'Tín hiệu và Hệ thống',
				description: '6.003 bao gồm các nguyên tắc cơ bản của phân tích tín hiệu và hệ thống, tập trung vào các biểu diễn của tín hiệu thời gian rời rạc và thời gian liên tục ',
				fullDescription: '6.003 bao gồm các nguyên tắc cơ bản của phân tích tín hiệu và hệ thống, tập trung vào các biểu diễn của tín hiệu thời gian rời rạc và thời gian liên tục (hàm kỳ dị, hàm số mũ và hình học phức tạp, biểu diễn Fourier, biến đổi Laplace và Z, lấy mẫu) và biểu diễn của hệ thống tuyến tính, bất biến thời gian (sự khác biệt và phương trình vi phân, sơ đồ khối, chức năng hệ thống, cực và số không, tích chập, đáp ứng xung và bước, đáp ứng tần số). Các ứng dụng được rút ra rộng rãi từ kỹ thuật và vật lý, bao gồm phản hồi và điều khiển, truyền thông và xử lý tín hiệu.',
				avatar: 'https://www.sites.google.com/a/vit.edu/vijaygaikwad/_/rsrc/1472848084284/my-subjects/signals-and-systems/ss.jpg',
				price: 500000,
				active: true,
				status: true,
				categoryId: 5,
			},

			{
				id: 12,
				title: 'Cấu trúc máy tính',
				description: 'Khóa học này giới thiệu kiến ​​trúc của các hệ thống kỹ thuật số, nhấn mạnh các nguyên tắc cấu trúc chung cho một loạt các công nghệ',
				fullDescription: 'Khóa học này giới thiệu kiến ​​trúc của các hệ thống kỹ thuật số, nhấn mạnh các nguyên tắc cấu trúc chung cho một loạt các công nghệ. Nó bao gồm các chủ đề bao gồm các chiến lược triển khai đa cấp, định nghĩa về các nguyên thủy mới (ví dụ: cổng, hướng dẫn, thủ tục, quy trình) và cơ giới hóa chúng bằng cách sử dụng các yếu tố cấp thấp hơn. Nó cũng bao gồm phân tích đồng thời tiềm năng, các ràng buộc ưu tiên và đo lường hiệu suất, các hệ thống đa chiều và đa chiều, các vấn đề thiết kế tập hướng dẫn và hỗ trợ kiến ​​trúc cho các cấu trúc phần mềm đương đại.',
				avatar: 'https://www.techsignin.com/wp-content/uploads/2015/12/tim-hieu-cau-tao-may-vi-tinh-768x436.jpg',
				price: 1000000,
				active: true,
				status: true,
				categoryId: 5,
			},

			{
				id: 13,
				title: 'Mở đầu thuật toán',
				description: 'Khóa học này cung cấp giới thiệu về mô hình toán học của các bài toán tính toán',
				fullDescription: 'Khóa học này cung cấp giới thiệu về mô hình toán học của các bài toán tính toán. Nó bao gồm các thuật toán phổ biến, mô hình thuật toán và cấu trúc dữ liệu được sử dụng để giải quyết những vấn đề này. Khóa học nhấn mạnh mối quan hệ giữa thuật toán và lập trình, đồng thời giới thiệu các biện pháp hiệu suất cơ bản và kỹ thuật phân tích cho những vấn đề này.',
				avatar: 'https://techinsight.com.vn/wp-content/uploads/2019/12/Untitled-1-22.jpg',
				price: 1000000,
				active: true,
				status: true,
				categoryId: 5,
			},

			{
				id: 14,
				title: 'Thiết kế thuật toán',
				description: 'Đây là khóa học thuật toán trung cấp tập trung vào giảng dạy các kỹ thuật thiết kế và phân tích các thuật toán hiệu quả',
				fullDescription: 'Đây là khóa học thuật toán trung cấp tập trung vào giảng dạy các kỹ thuật thiết kế và phân tích các thuật toán hiệu quả, nhấn mạnh các phương pháp ứng dụng. Các chủ đề bao gồm chia để trị, ngẫu nhiên hóa, lập trình động, thuật toán tham lam, cải tiến gia tăng, độ phức tạp và mật mã.',
				avatar: 'https://www.rit.edu/~w-ritonx/static/images/courses/small/EEET-331-S.jpg',
				price: 1000000,
				active: true,
				status: true,
				categoryId: 5,
			},

			{
				id: 15,
				title: 'Xử lý tín hiệu kỹ thuật số',
				description: 'Khóa học này được phát triển vào năm 1987 bởi Trung tâm Nghiên cứu Kỹ thuật Cao cấp MIT. Nó được thiết kế như một khóa học đào tạo từ xa cho các kỹ sư và nhà khoa học tại nơi làm việc.',
				fullDescription: 'Xử lý tín hiệu kỹ thuật số bắt đầu với cuộc thảo luận về phân tích và biểu diễn các hệ thống tín hiệu thời gian rời rạc, bao gồm tích chập thời gian rời rạc, phương trình sai phân, biến đổi z và biến đổi Fourier thời gian rời rạc. Nhấn mạnh vào sự tương đồng và khác biệt giữa thời gian rời rạc. Khóa học tiếp tục bao gồm mạng kỹ thuật số và bộ lọc kỹ thuật số không đệ quy (đáp ứng xung hữu hạn). Xử lý tín hiệu kỹ thuật số kết thúc với thiết kế bộ lọc kỹ thuật số và thảo luận về thuật toán biến đổi Fourier nhanh để tính toán biến đổi Fourier rời rạc..',
				avatar: 'https://assets.skyfilabs.com/images/blog/list-of-good-digital-signal-processing-projects.webp',
				price: 1000000,
				active: true,
				status: true,
				categoryId: 6,
			},

			{
				id: 16,
				title: 'Xác xuất trong máy tính',
				description: 'Các công cụ của lý thuyết xác suất và lĩnh vực liên quan của suy luận thống kê là chìa khóa để có thể phân tích và hiểu dữ liệu',
				fullDescription: 'Các công cụ của lý thuyết xác suất và lĩnh vực liên quan của suy luận thống kê là chìa khóa để có thể phân tích và hiểu dữ liệu. Những công cụ này tạo nền tảng cho những tiến bộ quan trọng trong nhiều lĩnh vực, từ khoa học cơ bản đến kỹ thuật và quản lý.',
				avatar: 'https://media-cdn.laodong.vn/Storage/NewsPortal/2019/11/6/764306/Xac-Suat.jpg',
				price: 2500000,
				active: true,
				status: true,
				categoryId: 7,
			}

			//Môn toán, 9, 10
		]
	)

	await CourseChapter.bulkCreate(
		[
			{
				id: 1,
				name: 'Mở đầu',
				description: 'Mở đầu khóa học',
				preview: true,
				courseId: 1
			},
			{
				id: 2,
				name: 'Teaching Methodologies, Part II: Active Learning: Why and How',
				description: 'This class explores the value and impact of active learning techniques in the classroom.',
				preview: false,
				courseId: 1
			},
			{
				id: 3,
				name: 'Teaching with Educational Technology',
				description: 'This class discusses the pros and cons of using educational technology in the classroom, as well as how to implement ed tech in a classroom setting.',
				preview: false,
				courseId: 1
			},
			{
				id: 4,
				name: 'Mở đầu',
				description: 'Mở đầu khóa học',
				preview: true,
				courseId: 2
			},
			{
				id: 5,
				name: 'Types of Organisms, Cell Composition',
				description: '	Types of Organisms, Cell Composition',
				preview: true,
				courseId: 2
			},
			{
				id: 6,
				name: 'Covalent Bonds, Hydrogen Bonds',
				description: 'Covalent Bonds, Hydrogen Bonds',
				preview: true,
				courseId: 2
			},
			{
				id: 7,
				name: 'Covalent Bonds',
				description: 'Covalent Bonds',
				preview: true,
				courseId: 2
			},

			{
				id: 8,
				name: 'Introduction',
				description: 'Introduction',
				preview: true,
				courseId: 3
			},
			{
				id: 9,
				name: 'Biochemistry 1',
				description: 'Biochemistry 1',
				preview: false,
				courseId: 3
			},
			{
				id: 10,
				name: 'Biochemistry 2',
				description: 'Biochemistry 2',
				preview: false,
				courseId: 3
			},
			{
				id: 11,
				name: 'Biochemistry 3',
				description: 'Biochemistry 3',
				preview: false,
				courseId: 3
			},
			{
				id: 12,
				name: 'Genetics',
				description: 'Genetics',
				preview: false,
				courseId: 3
			},

			{
				id: 13,
				name: 'Introduction',
				description: 'Introduction',
				preview: true,
				courseId: 4
			},
			{
				id: 14,
				name: 'Protein Synthesis',
				description: 'Protein Synthesis',
				preview: false,
				courseId: 4
			},
			{
				id: 15,
				name: 'Genetics',
				description: 'Genetics',
				preview: false,
				courseId: 4
			},

			{
				id: 16,
				name: 'Introduction',
				description: 'Introduction to the Class and Overview of Topics',
				preview: true,
				courseId: 5
			},
			{
				id: 17,
				name: 'Feedback and Bistability',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 5
			},
			{
				id: 18,
				name: 'Synthetic',
				description: 'Synthetic Biology and Stability Analysis in the Toggle Switch',
				preview: false,
				courseId: 5
			},

			//6
			{
				id: 19,
				name: 'Introduction',
				description: 'Introduction to the Class and Overview of Topics',
				preview: true,
				courseId: 6
			},
			{
				id: 20,
				name: 'Feedback and Bistability',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 6
			},
			{
				id: 21,
				name: 'Synthetic',
				description: 'Synthetic Biology and Stability Analysis in the Toggle Switch',
				preview: false,
				courseId: 6
			},

			//7
			{
				id: 22,
				name: 'Introduction 2',
				description: 'Introduction to the Class and Overview of Topics',
				preview: true,
				courseId: 7
			},
			{
				id: 23,
				name: 'Feedback and Bistability 2',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 7
			},
			{
				id: 24,
				name: 'Synthetic 3',
				description: 'Synthetic Biology and Stability Analysis in the Toggle Switch',
				preview: false,
				courseId: 7
			},

			//8
			{
				id: 25,
				name: 'Introduction 3',
				description: 'Introduction to the Class and Overview of Topics',
				preview: true,
				courseId: 8
			},
			{
				id: 26,
				name: 'Feedback and Bistability 3',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 8
			},
			{
				id: 27,
				name: 'Synthetic 3',
				description: 'Synthetic Biology and Stability Analysis in the Toggle Switch',
				preview: false,
				courseId: 8
			},

			//9
			{
				id: 28,
				name: 'Mở đầu',
				description: 'Mở đầu mô tả',
				preview: true,
				courseId: 9
			},
			{
				id: 29,
				name: 'Nội dung',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 9
			},
			{
				id: 30,
				name: 'Tổng kết',
				description: 'Tổng kết',
				preview: false,
				courseId: 9
			},


			//10
			{
				id: 31,
				name: 'Mở đầu',
				description: 'Mở đầu mô tả',
				preview: true,
				courseId: 10
			},
			{
				id: 32,
				name: 'Nội dung',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 10
			},
			{
				id: 33,
				name: 'Tổng kết',
				description: 'Tổng kết',
				preview: false,
				courseId: 10
			},

			//11
			{
				id: 34,
				name: 'Mở đầu',
				description: 'Mở đầu mô tả',
				preview: true,
				courseId: 11
			},
			{
				id: 35,
				name: 'Nội dung',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 11
			},
			{
				id: 36,
				name: 'Tổng kết',
				description: 'Tổng kết',
				preview: false,
				courseId: 11
			},

			////12
			{
				id: 37,
				name: 'Mở đầu',
				description: 'Mở đầu mô tả',
				preview: true,
				courseId: 12
			},
			{
				id: 38,
				name: 'Nội dung',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 12
			},
			{
				id: 39,
				name: 'Tổng kết',
				description: 'Tổng kết',
				preview: false,
				courseId: 12
			},

			//13
			{
				id: 40,
				name: 'Mở đầu',
				description: 'Mở đầu mô tả',
				preview: true,
				courseId: 13
			},
			{
				id: 41,
				name: 'Nội dung',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 13
			},
			{
				id: 42,
				name: 'Tổng kết',
				description: 'Tổng kết',
				preview: false,
				courseId: 13
			},


			//14
			{
				id: 43,
				name: 'Mở đầu',
				description: 'Mở đầu mô tả',
				preview: true,
				courseId: 14
			},
			{
				id: 44,
				name: 'Nội dung',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 14
			},
			{
				id: 45,
				name: 'Tổng kết',
				description: 'Tổng kết',
				preview: false,
				courseId: 14
			},

			//15
			{
				id: 46,
				name: 'Mở đầu',
				description: 'Mở đầu mô tả',
				preview: true,
				courseId: 15
			},
			{
				id: 47,
				name: 'Nội dung',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 15
			},
			{
				id: 48,
				name: 'Tổng kết',
				description: 'Tổng kết',
				preview: false,
				courseId: 15
			},

			//16
			
			{
				id: 49,
				name: 'Mở đầu',
				description: 'Mở đầu mô tả',
				preview: true,
				courseId: 16
			},
			{
				id: 50,
				name: 'Nội dung',
				description: 'Feedback and Bistability',
				preview: false,
				courseId: 16
			},
			{
				id: 51,
				name: 'Tổng kết',
				description: 'Tổng kết',
				preview: false,
				courseId: 16
			},


			
		])

		await CourseDocument.bulkCreate(
			[
				{
					id: 1,
					name: 'Mở đầu',
					type: 1,
					link: 'https://ia801609.us.archive.org/9/items/MIT5.95JF15/MIT5_95JF15_lec03_300k.mp4',
					description: 'Video mở đầu',
					preview: true,
					courseChapterId: 1
				},
				{
					id: 2,
					name: 'Teaching with Educational Technology',
					type: 1,
					link: 'https://ia801609.us.archive.org/9/items/MIT5.95JF15/MIT5_95JF15_lec05_300k.mp4',
					description: 'Video Teaching with Educational Technology',
					preview: false,
					courseChapterId: 2
				},
				{
					id: 3,
					name: 'Teaching Methodologies, Part II: Active Learning: Why and How',
					type: 1,
					link: 'https://ia801609.us.archive.org/9/items/MIT5.95JF15/MIT5_95JF15_lec08_300k.mp4',
					description: 'Video Teaching Methodologies, Part II: Active Learning: Why and How',
					preview: false,
					courseChapterId: 3
				},

				{
					id: 4,
					name: 'Mở đầu',
					type: 1,
					link: 'https://ia800605.us.archive.org/15/items/MIT7.01SCF11/MIT7_01SCF11_track04_300k.mp4',
					description: 'Video Mở đầu',
					preview: true,
					courseChapterId: 4
				},
				{
					id: 5,
					name: 'Types of Organisms, Cell Composition',
					type: 1,
					link: 'https://ia800605.us.archive.org/15/items/MIT7.01SCF11/MIT7_01SCF11_track14_300k.mp4',
					description: 'Video Types of Organisms, Cell Composition',
					preview: false,
					courseChapterId: 5
				},
				{
					id: 6,
					name: 'Covalent Bonds, Hydrogen Bonds',
					type: 1,
					link: 'https://ia800605.us.archive.org/15/items/MIT7.01SCF11/MIT7_01SCF11_track20_300k.mp4',
					description: 'Video Covalent Bonds, Hydrogen Bonds',
					preview: false,
					courseChapterId: 6
				},

				{
					id: 7,
					name: 'Covalent Bonds',
					type: 1,
					link: 'https://ia800605.us.archive.org/15/items/MIT7.01SCF11/MIT7_01SCF11_Un1Ses2_Rec_300k.mp4',
					description: 'Video Covalent Bonds',
					preview: false,
					courseChapterId: 7
				},
				{
					id: 8,
					name: 'Tài liệu mở đầu',
					type: 0,
					link: 'https://ocw.mit.edu/courses/biology/7-01sc-fundamentals-of-biology-fall-2011/biochemistry/types-of-organisms-cell-composition/MIT7_01SCF11_1.1sol.pdf',
					description: 'Tài liệu mở đầu',
					preview: true,
					courseChapterId: 4
				},
				{
					id: 9,
					name: 'Introduc',
					type: 1,
					link: 'https://ia800203.us.archive.org/20/items/MIT7.012F04/ocw-7.012-lec1-08sep2004-220k.mp4',
					description: 'Video Introduc',
					preview: true,
					courseChapterId: 8
				},
				{
					id: 10,
					name: 'Biochemistry 1',
					type: 1,
					link: 'https://ia800203.us.archive.org/20/items/MIT7.012F04/ocw-7.012-lec2-10sep2004-220k.mp4',
					description: 'Biochemistry 1',
					preview: false,
					courseChapterId: 9
				},
				{
					id: 11,
					name: 'Biochemistry 2',
					type: 1,
					link: 'https://ia600203.us.archive.org/20/items/MIT7.012F04/ocw-7.012-lec4-15sep2004-220k.mp4',
					description: 'Video Biochemistry 2',
					preview: false,
					courseChapterId: 10
				},
				{
					id: 12,
					name: 'Biochemistry 3',
					type: 1,
					link: 'https://ia600203.us.archive.org/20/items/MIT7.012F04/ocw-7.012-lec5-17sep2004-220k.mp4',
					description: 'Video Biochemistry 3',
					preview: false,
					courseChapterId: 11
				},
				{
					id: 13,
					name: 'Genetics',
					type: 1,
					link: 'https://ia800203.us.archive.org/20/items/MIT7.012F04/ocw-7.012-lec6-20sep2004-220k.mp4',
					description: 'Genetics',
					preview: false,
					courseChapterId: 12
				},
				{
					id: 14,
					name: 'Quiz',
					type: 0,
					link: 'https://ocw.mit.edu/courses/biology/7-012-introduction-to-biology-fall-2004/exams/quiz1prac.pdf',
					description: 'Quiz',
					preview: false,
					courseChapterId: 12
				},

				{
					id: 15,
					name: 'Introduction',
					type: 1,
					link: 'https://ia800708.us.archive.org/25/items/MIT5.08JS16/MIT5_08JS16_Lecture_01_300k.mp4',
					description: 'Quiz',
					preview: true,
					courseChapterId: 13
				},

				{
					id: 16,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/chemistry/5-08j-biological-chemistry-ii-spring-2016/lecture-recitation-videos/MIT5_08jS16r1_handout.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 13
				},

				{
					id: 17,
					name: 'Protein Synthesis 1',
					type: 1,
					link: 'https://ia800708.us.archive.org/25/items/MIT5.08JS16/MIT5_08JS16_Lecture_02_300k.mp4',
					description: 'Protein Synthesis 1',
					preview: false,
					courseChapterId: 14
				},
				{
					id: 18,
					name: 'PK and NRP',
					type: 1,
					link: 'https://ia600708.us.archive.org/25/items/MIT5.08JS16/MIT5_08JS16_Lecture_03_300k.mp4',
					description: 'PK and NRP',
					preview: false,
					courseChapterId: 15
				},

				//
				{
					id: 19,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 16
				},

				{
					id: 20,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 16
				},

				{
					id: 21,
					name: 'Input Function',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 17
				},
				{
					id: 22,
					name: 'Autoregulation',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 18
				},

				//
				{
					id: 23,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 19
				},

				{
					id: 24,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 19
				},

				{
					id: 25,
					name: 'Input Function',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 20
				},
				{
					id: 26,
					name: 'Autoregulation',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 21
				},

				//
				{
					id: 27,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 22
				},

				{
					id: 28,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 22
				},

				{
					id: 29,
					name: 'Input Function',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 23
				},
				{
					id: 30,
					name: 'Autoregulation',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 24
				},

				//
				{
					id: 31,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 25
				},

				{
					id: 32,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 25
				},

				{
					id: 33,
					name: 'Input Function',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 26
				},
				{
					id: 34,
					name: 'Autoregulation',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 27
				},

				//9
				//
				{
					id: 35,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 28
				},

				{
					id: 36,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 28
				},

				{
					id: 37,
					name: 'Nội dung',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 29
				},
				{
					id: 38,
					name: 'Tổng kết',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 30
				},

				//10
				{
					id: 39,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 31
				},

				{
					id: 40,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 31
				},

				{
					id: 41,
					name: 'Nội dung',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 32
				},
				{
					id: 42,
					name: 'Tổng kết',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 33
				},


				//11
				{
					id: 43,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 34
				},

				{
					id: 44,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 34
				},

				{
					id: 45,
					name: 'Nội dung',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 35
				},
				{
					id: 46,
					name: 'Tổng kết',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 36
				},

				//12
				{
					id: 47,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 37
				},

				{
					id: 48,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 37
				},

				{
					id: 49,
					name: 'Nội dung',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 38
				},
				{
					id: 50,
					name: 'Tổng kết',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 39
				},

				//13
				{
					id: 51,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 40
				},

				{
					id: 52,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 40
				},

				{
					id: 53,
					name: 'Nội dung',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 41
				},
				{
					id: 54,
					name: 'Tổng kết',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 42
				},

				//14
				{
					id: 55,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 43
				},

				{
					id: 56,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 43
				},

				{
					id: 57,
					name: 'Nội dung',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 44
				},
				{
					id: 58,
					name: 'Tổng kết',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 45
				},

				//15
				{
					id: 59,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 46
				},

				{
					id: 60,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 46
				},

				{
					id: 61,
					name: 'Nội dung',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 47
				},
				{
					id: 62,
					name: 'Tổng kết',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 48
				},

				//16
				{
					id: 63,
					name: 'Introduction',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec01_300k.mp4',
					description: 'Introduction',
					preview: true,
					courseChapterId: 49
				},

				{
					id: 64,
					name: 'Document introduction',
					type: 0,
					link: 'https://ocw.mit.edu/courses/physics/8-591j-systems-biology-fall-2014/lecture-videos/introduction-to-the-class-and-overview-of-topics/gc3O2sKIsX4.pdf',
					description: 'Document introduction',
					preview: true,
					courseChapterId: 49
				},

				{
					id: 65,
					name: 'Nội dung',
					type: 1,
					link: 'https://ia601308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec02_300k.mp4',
					description: 'Input Function, Michaelis-Menten kinetics, and Cooperativity',
					preview: false,
					courseChapterId: 50
				},
				{
					id: 66,
					name: 'Tổng kết',
					type: 1,
					link: 'https://ia801308.us.archive.org/6/items/MIT8.591JF14/MIT8_591JF14_lec03_300k.mp4',
					description: 'Autoregulation, Feedback and Bistability',
					preview: false,
					courseChapterId: 51
				},

			])
}


bulkData()
