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
				preview: true,
				courseId: 3
			},
			{
				id: 11,
				name: 'Biochemistry 3',
				description: 'Biochemistry 3',
				preview: true,
				courseId: 3
			},
			{
				id: 12,
				name: 'Genetics',
				description: 'Genetics',
				preview: true,
				courseId: 3
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

			])
}


bulkData()
