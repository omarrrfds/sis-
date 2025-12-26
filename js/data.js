// ========================================
// University SIS - Mock Database
// ========================================

const Database = {
  // Current semester
  currentSemester: {
    id: 1,
    name: 'Fall 2024',
    startDate: '2024-09-01',
    endDate: '2025-01-15',
    registrationOpen: true,
    registrationDeadline: '2024-09-15',
    dropDeadline: '2024-10-01',
    gradeSubmissionDeadline: '2025-01-20'
  },

  // Users (combined table for all roles)
  users: [
    {
      id: 1,
      email: 'student@uni.edu',
      password: 'password123',
      role: 'student',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      phone: '+20 100 123 4567',
      address: 'Cairo, Egypt',
      createdAt: '2022-09-01'
    },
    {
      id: 2,
      email: 'doctor@uni.edu',
      password: 'password123',
      role: 'doctor',
      firstName: 'Dr. Mohamed',
      lastName: 'Ali',
      phone: '+20 100 987 6543',
      address: 'Giza, Egypt',
      department: 'Computer Science',
      createdAt: '2018-01-15'
    },
    {
      id: 3,
      email: 'admin@uni.edu',
      password: 'password123',
      role: 'admin',
      firstName: 'Sara',
      lastName: 'Ibrahim',
      phone: '+20 100 555 4444',
      address: 'Cairo, Egypt',
      createdAt: '2020-06-01'
    },
    {
      id: 4,
      email: 'student2@uni.edu',
      password: 'password123',
      role: 'student',
      firstName: 'Fatima',
      lastName: 'Omar',
      phone: '+20 100 222 3333',
      address: 'Alexandria, Egypt',
      createdAt: '2023-09-01'
    },
    {
      id: 5,
      email: 'doctor2@uni.edu',
      password: 'password123',
      role: 'doctor',
      firstName: 'Dr. Layla',
      lastName: 'Mahmoud',
      phone: '+20 100 444 5555',
      address: 'Cairo, Egypt',
      department: 'Mathematics',
      createdAt: '2019-08-20'
    }
  ],

  // Students extended info
  students: [
    {
      userId: 1,
      studentId: 'STU-2022-001',
      faculty: 'Engineering',
      department: 'Computer Science',
      level: 3,
      gpa: 3.45,
      totalCredits: 85,
      enrollmentStatus: 'Active',
      academicStanding: 'Good Standing',
      advisor: 'Dr. Mohamed Ali',
      expectedGraduation: '2026'
    },
    {
      userId: 4,
      studentId: 'STU-2023-015',
      faculty: 'Engineering',
      department: 'Computer Science',
      level: 2,
      gpa: 3.72,
      totalCredits: 54,
      enrollmentStatus: 'Active',
      academicStanding: 'Dean\'s List',
      advisor: 'Dr. Mohamed Ali',
      expectedGraduation: '2027'
    }
  ],

  // Doctors extended info
  doctors: [
    {
      userId: 2,
      doctorId: 'DOC-001',
      department: 'Computer Science',
      faculty: 'Engineering',
      title: 'Associate Professor',
      specialization: 'Artificial Intelligence',
      officeHours: 'Sun, Tue 10:00 AM - 12:00 PM',
      office: 'Building A, Room 305'
    },
    {
      userId: 5,
      doctorId: 'DOC-002',
      department: 'Mathematics',
      faculty: 'Science',
      title: 'Professor',
      specialization: 'Applied Mathematics',
      officeHours: 'Mon, Wed 2:00 PM - 4:00 PM',
      office: 'Building B, Room 210'
    }
  ],

  // Courses
  courses: [
    {
      id: 1,
      code: 'CS301',
      name: 'Data Structures & Algorithms',
      department: 'Computer Science',
      credits: 3,
      description: 'Advanced data structures including trees, graphs, and algorithm analysis.',
      prerequisites: ['CS201'],
      maxCapacity: 40,
      currentEnrollment: 35,
      doctorId: 2,
      schedule: { day: 'Sunday', time: '09:00 AM', duration: 2, room: 'Hall A-101' },
      status: 'Active'
    },
    {
      id: 2,
      code: 'CS302',
      name: 'Database Systems',
      department: 'Computer Science',
      credits: 3,
      description: 'Relational database design, SQL, and database management systems.',
      prerequisites: ['CS201'],
      maxCapacity: 35,
      currentEnrollment: 30,
      doctorId: 2,
      schedule: { day: 'Tuesday', time: '11:00 AM', duration: 2, room: 'Hall A-102' },
      status: 'Active'
    },
    {
      id: 3,
      code: 'CS303',
      name: 'Computer Networks',
      department: 'Computer Science',
      credits: 3,
      description: 'Network protocols, architecture, and security fundamentals.',
      prerequisites: ['CS201'],
      maxCapacity: 40,
      currentEnrollment: 28,
      doctorId: 2,
      schedule: { day: 'Wednesday', time: '02:00 PM', duration: 2, room: 'Hall A-103' },
      status: 'Active'
    },
    {
      id: 4,
      code: 'MATH201',
      name: 'Linear Algebra',
      department: 'Mathematics',
      credits: 3,
      description: 'Vectors, matrices, linear transformations, and eigenvalues.',
      prerequisites: ['MATH101'],
      maxCapacity: 50,
      currentEnrollment: 45,
      doctorId: 5,
      schedule: { day: 'Monday', time: '09:00 AM', duration: 2, room: 'Hall B-201' },
      status: 'Active'
    },
    {
      id: 5,
      code: 'MATH202',
      name: 'Probability & Statistics',
      department: 'Mathematics',
      credits: 3,
      description: 'Probability theory, statistical distributions, and hypothesis testing.',
      prerequisites: ['MATH101'],
      maxCapacity: 50,
      currentEnrollment: 42,
      doctorId: 5,
      schedule: { day: 'Thursday', time: '11:00 AM', duration: 2, room: 'Hall B-202' },
      status: 'Active'
    },
    {
      id: 6,
      code: 'CS304',
      name: 'Software Engineering',
      department: 'Computer Science',
      credits: 3,
      description: 'Software development lifecycle, design patterns, and project management.',
      prerequisites: ['CS201', 'CS301'],
      maxCapacity: 35,
      currentEnrollment: 25,
      doctorId: 2,
      schedule: { day: 'Sunday', time: '02:00 PM', duration: 2, room: 'Hall A-104' },
      status: 'Active'
    },
    {
      id: 7,
      code: 'CS305',
      name: 'Artificial Intelligence',
      department: 'Computer Science',
      credits: 3,
      description: 'Machine learning, neural networks, and AI algorithms.',
      prerequisites: ['CS301', 'MATH201'],
      maxCapacity: 30,
      currentEnrollment: 28,
      doctorId: 2,
      schedule: { day: 'Tuesday', time: '02:00 PM', duration: 2, room: 'Lab C-301' },
      status: 'Active'
    },
    {
      id: 8,
      code: 'CS201',
      name: 'Object-Oriented Programming',
      department: 'Computer Science',
      credits: 3,
      description: 'OOP concepts using Java/Python, classes, inheritance, polymorphism.',
      prerequisites: ['CS101'],
      maxCapacity: 45,
      currentEnrollment: 40,
      doctorId: 2,
      schedule: { day: 'Monday', time: '11:00 AM', duration: 2, room: 'Lab C-201' },
      status: 'Active'
    }
  ],

  // Enrollments
  enrollments: [
    { id: 1, studentId: 1, courseId: 1, semesterId: 1, status: 'Enrolled', enrolledAt: '2024-09-01' },
    { id: 2, studentId: 1, courseId: 2, semesterId: 1, status: 'Enrolled', enrolledAt: '2024-09-01' },
    { id: 3, studentId: 1, courseId: 3, semesterId: 1, status: 'Enrolled', enrolledAt: '2024-09-01' },
    { id: 4, studentId: 1, courseId: 7, semesterId: 1, status: 'Enrolled', enrolledAt: '2024-09-02' },
    { id: 5, studentId: 4, courseId: 8, semesterId: 1, status: 'Enrolled', enrolledAt: '2024-09-01' },
    { id: 6, studentId: 4, courseId: 4, semesterId: 1, status: 'Enrolled', enrolledAt: '2024-09-01' },
    { id: 7, studentId: 4, courseId: 5, semesterId: 1, status: 'Enrolled', enrolledAt: '2024-09-01' }
  ],

  // Grades
  grades: [
    // Student 1 - Previous semester grades
    { id: 1, studentId: 1, courseCode: 'CS101', courseName: 'Introduction to Programming', semester: 'Spring 2024', midterm: 42, final: 48, assignments: 18, total: 93, grade: 'A', credits: 3 },
    { id: 2, studentId: 1, courseCode: 'MATH101', courseName: 'Calculus I', semester: 'Spring 2024', midterm: 38, final: 40, assignments: 16, total: 82, grade: 'B+', credits: 3 },
    { id: 3, studentId: 1, courseCode: 'PHYS101', courseName: 'Physics I', semester: 'Spring 2024', midterm: 35, final: 42, assignments: 15, total: 78, grade: 'B', credits: 3 },
    { id: 4, studentId: 1, courseCode: 'ENG101', courseName: 'Technical Writing', semester: 'Spring 2024', midterm: 40, final: 45, assignments: 17, total: 88, grade: 'A-', credits: 2 },
    { id: 5, studentId: 1, courseCode: 'CS201', courseName: 'Object-Oriented Programming', semester: 'Fall 2023', midterm: 44, final: 46, assignments: 19, total: 91, grade: 'A', credits: 3 },
    { id: 6, studentId: 1, courseCode: 'MATH102', courseName: 'Calculus II', semester: 'Fall 2023', midterm: 36, final: 38, assignments: 14, total: 74, grade: 'B-', credits: 3 },
    // Current semester - partial grades
    { id: 7, studentId: 1, courseCode: 'CS301', courseName: 'Data Structures & Algorithms', semester: 'Fall 2024', midterm: 40, final: null, assignments: 16, total: null, grade: null, credits: 3 },
    { id: 8, studentId: 1, courseCode: 'CS302', courseName: 'Database Systems', semester: 'Fall 2024', midterm: 38, final: null, assignments: 15, total: null, grade: null, credits: 3 }
  ],

  // Attendance
  attendance: [
    { id: 1, courseId: 1, studentId: 1, date: '2024-09-08', status: 'Present' },
    { id: 2, courseId: 1, studentId: 1, date: '2024-09-15', status: 'Present' },
    { id: 3, courseId: 1, studentId: 1, date: '2024-09-22', status: 'Absent' },
    { id: 4, courseId: 1, studentId: 1, date: '2024-09-29', status: 'Present' },
    { id: 5, courseId: 1, studentId: 1, date: '2024-10-06', status: 'Present' },
    { id: 6, courseId: 1, studentId: 4, date: '2024-09-08', status: 'Present' },
    { id: 7, courseId: 1, studentId: 4, date: '2024-09-15', status: 'Present' },
    { id: 8, courseId: 1, studentId: 4, date: '2024-09-22', status: 'Present' },
    { id: 9, courseId: 1, studentId: 4, date: '2024-09-29', status: 'Late' },
    { id: 10, courseId: 1, studentId: 4, date: '2024-10-06', status: 'Present' }
  ],

  // Student Requests
  requests: [
    {
      id: 1,
      studentId: 1,
      type: 'Course Overload',
      description: 'Request to register for 21 credit hours instead of 18 due to graduation requirements.',
      status: 'Pending',
      createdAt: '2024-09-05',
      updatedAt: null,
      adminNotes: null
    },
    {
      id: 2,
      studentId: 1,
      type: 'Grade Appeal',
      description: 'Appeal for CS201 final exam grade review. I believe there was a calculation error.',
      status: 'Approved',
      createdAt: '2024-06-15',
      updatedAt: '2024-06-20',
      adminNotes: 'Grade reviewed and corrected from B+ to A.'
    },
    {
      id: 3,
      studentId: 4,
      type: 'Withdrawal',
      description: 'Request to withdraw from PHYS102 due to medical reasons.',
      status: 'Pending',
      createdAt: '2024-09-10',
      updatedAt: null,
      adminNotes: null
    }
  ],

  // Notifications
  notifications: [
    {
      id: 1,
      userId: 1,
      title: 'Registration Open',
      message: 'Fall 2024 registration is now open. Register before September 15th.',
      type: 'info',
      read: false,
      createdAt: '2024-09-01'
    },
    {
      id: 2,
      userId: 1,
      title: 'Grade Posted',
      message: 'Your midterm grade for CS301 has been posted.',
      type: 'success',
      read: false,
      createdAt: '2024-10-20'
    },
    {
      id: 3,
      userId: 1,
      title: 'Request Update',
      message: 'Your course overload request is under review.',
      type: 'warning',
      read: true,
      createdAt: '2024-09-07'
    },
    {
      id: 4,
      userId: 2,
      title: 'Grade Submission Reminder',
      message: 'Please submit midterm grades by October 25th.',
      type: 'warning',
      read: false,
      createdAt: '2024-10-15'
    }
  ],

  // Semesters history
  semesters: [
    { id: 1, name: 'Fall 2024', startDate: '2024-09-01', endDate: '2025-01-15', status: 'Active' },
    { id: 2, name: 'Spring 2024', startDate: '2024-02-01', endDate: '2024-06-15', status: 'Completed' },
    { id: 3, name: 'Fall 2023', startDate: '2023-09-01', endDate: '2024-01-15', status: 'Completed' }
  ],

  // Departments
  departments: [
    { id: 1, name: 'Computer Science', faculty: 'Engineering', head: 'Dr. Mohamed Ali' },
    { id: 2, name: 'Mathematics', faculty: 'Science', head: 'Dr. Layla Mahmoud' },
    { id: 3, name: 'Physics', faculty: 'Science', head: 'Dr. Karim Youssef' },
    { id: 4, name: 'Electrical Engineering', faculty: 'Engineering', head: 'Dr. Hana Saleh' }
  ]
};

// ========================================
// Database Helper Functions
// ========================================

const DB = {
  // Get user by email
  getUserByEmail: (email) => {
    return Database.users.find(u => u.email === email);
  },

  // Get user by ID
  getUserById: (id) => {
    return Database.users.find(u => u.id === id);
  },

  // Get student info
  getStudentInfo: (userId) => {
    return Database.students.find(s => s.userId === userId);
  },

  // Get doctor info
  getDoctorInfo: (userId) => {
    return Database.doctors.find(d => d.userId === userId);
  },

  // Get all courses
  getAllCourses: () => {
    return Database.courses;
  },

  // Get course by ID
  getCourseById: (id) => {
    return Database.courses.find(c => c.id === id);
  },

  // Get courses by doctor
  getCoursesByDoctor: (doctorId) => {
    return Database.courses.filter(c => c.doctorId === doctorId);
  },

  // Get student enrollments
  getStudentEnrollments: (studentId) => {
    return Database.enrollments.filter(e => e.studentId === studentId);
  },

  // Get enrolled courses for student
  getEnrolledCourses: (studentId) => {
    const enrollments = Database.enrollments.filter(e => e.studentId === studentId && e.status === 'Enrolled');
    return enrollments.map(e => {
      const course = Database.courses.find(c => c.id === e.courseId);
      return { ...course, enrollmentId: e.id };
    });
  },

  // Get student grades
  getStudentGrades: (studentId) => {
    return Database.grades.filter(g => g.studentId === studentId);
  },

  // Get course enrollments (for doctors)
  getCourseEnrollments: (courseId) => {
    const enrollments = Database.enrollments.filter(e => e.courseId === courseId);
    return enrollments.map(e => {
      const student = Database.students.find(s => s.userId === e.studentId);
      const user = Database.users.find(u => u.id === e.studentId);
      return { ...student, ...user, enrollmentId: e.id };
    });
  },

  // Get user notifications
  getNotifications: (userId) => {
    return Database.notifications.filter(n => n.userId === userId);
  },

  // Get all students
  getAllStudents: () => {
    return Database.students.map(s => {
      const user = Database.users.find(u => u.id === s.userId);
      return { ...s, ...user };
    });
  },

  // Get all doctors
  getAllDoctors: () => {
    return Database.doctors.map(d => {
      const user = Database.users.find(u => u.id === d.userId);
      return { ...d, ...user };
    });
  },

  // Get all requests
  getAllRequests: () => {
    return Database.requests.map(r => {
      const student = Database.students.find(s => s.userId === r.studentId);
      const user = Database.users.find(u => u.id === r.studentId);
      return { ...r, studentName: `${user.firstName} ${user.lastName}`, studentIdNum: student.studentId };
    });
  },

  // Get student requests
  getStudentRequests: (studentId) => {
    return Database.requests.filter(r => r.studentId === studentId);
  },

  // Add enrollment
  addEnrollment: (studentId, courseId) => {
    const newId = Math.max(...Database.enrollments.map(e => e.id)) + 1;
    const enrollment = {
      id: newId,
      studentId,
      courseId,
      semesterId: 1,
      status: 'Enrolled',
      enrolledAt: new Date().toISOString().split('T')[0]
    };
    Database.enrollments.push(enrollment);
    
    // Update course enrollment count
    const course = Database.courses.find(c => c.id === courseId);
    if (course) course.currentEnrollment++;
    
    return enrollment;
  },

  // Drop enrollment
  dropEnrollment: (enrollmentId) => {
    const index = Database.enrollments.findIndex(e => e.id === enrollmentId);
    if (index !== -1) {
      const enrollment = Database.enrollments[index];
      Database.enrollments.splice(index, 1);
      
      // Update course enrollment count
      const course = Database.courses.find(c => c.id === enrollment.courseId);
      if (course) course.currentEnrollment--;
      
      return true;
    }
    return false;
  },

  // Add request
  addRequest: (studentId, type, description) => {
    const newId = Math.max(...Database.requests.map(r => r.id)) + 1;
    const request = {
      id: newId,
      studentId,
      type,
      description,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: null,
      adminNotes: null
    };
    Database.requests.push(request);
    return request;
  },

  // Update request status
  updateRequestStatus: (requestId, status, notes) => {
    const request = Database.requests.find(r => r.id === requestId);
    if (request) {
      request.status = status;
      request.adminNotes = notes;
      request.updatedAt = new Date().toISOString().split('T')[0];
      return request;
    }
    return null;
  },

  // Add student
  addStudent: (userData, studentData) => {
    const newUserId = Math.max(...Database.users.map(u => u.id)) + 1;
    const newUser = {
      id: newUserId,
      ...userData,
      role: 'student',
      createdAt: new Date().toISOString().split('T')[0]
    };
    Database.users.push(newUser);

    const studentCount = Database.students.length + 1;
    const newStudent = {
      userId: newUserId,
      studentId: `STU-2024-${String(studentCount).padStart(3, '0')}`,
      ...studentData,
      gpa: 0,
      totalCredits: 0,
      enrollmentStatus: 'Active',
      academicStanding: 'Good Standing'
    };
    Database.students.push(newStudent);

    return { ...newUser, ...newStudent };
  },

  // Add doctor
  addDoctor: (userData, doctorData) => {
    const newUserId = Math.max(...Database.users.map(u => u.id)) + 1;
    const newUser = {
      id: newUserId,
      ...userData,
      role: 'doctor',
      createdAt: new Date().toISOString().split('T')[0]
    };
    Database.users.push(newUser);

    const doctorCount = Database.doctors.length + 1;
    const newDoctor = {
      userId: newUserId,
      doctorId: `DOC-${String(doctorCount).padStart(3, '0')}`,
      ...doctorData
    };
    Database.doctors.push(newDoctor);

    return { ...newUser, ...newDoctor };
  },

  // Add course
  addCourse: (courseData) => {
    const newId = Math.max(...Database.courses.map(c => c.id)) + 1;
    const newCourse = {
      id: newId,
      ...courseData,
      currentEnrollment: 0,
      status: 'Active'
    };
    Database.courses.push(newCourse);
    return newCourse;
  },

  // Update grade
  updateGrade: (gradeId, gradeData) => {
    const grade = Database.grades.find(g => g.id === gradeId);
    if (grade) {
      Object.assign(grade, gradeData);
      // Calculate total and letter grade
      if (grade.midterm !== null && grade.final !== null && grade.assignments !== null) {
        grade.total = grade.midterm + grade.final + grade.assignments;
        grade.grade = calculateLetterGrade(grade.total);
      }
      return grade;
    }
    return null;
  },

  // Get attendance for course
  getCourseAttendance: (courseId) => {
    return Database.attendance.filter(a => a.courseId === courseId);
  },

  // Mark attendance
  markAttendance: (courseId, studentId, date, status) => {
    const existing = Database.attendance.find(
      a => a.courseId === courseId && a.studentId === studentId && a.date === date
    );
    if (existing) {
      existing.status = status;
      return existing;
    } else {
      const newId = Math.max(...Database.attendance.map(a => a.id)) + 1;
      const newAttendance = { id: newId, courseId, studentId, date, status };
      Database.attendance.push(newAttendance);
      return newAttendance;
    }
  },

  // Get statistics for admin
  getStatistics: () => {
    return {
      totalStudents: Database.students.length,
      totalDoctors: Database.doctors.length,
      totalCourses: Database.courses.length,
      pendingRequests: Database.requests.filter(r => r.status === 'Pending').length,
      activeEnrollments: Database.enrollments.filter(e => e.status === 'Enrolled').length,
      registrationOpen: Database.currentSemester.registrationOpen
    };
  }
};

// Helper function for letter grade
function calculateLetterGrade(total) {
  if (total >= 90) return 'A';
  if (total >= 85) return 'A-';
  if (total >= 80) return 'B+';
  if (total >= 75) return 'B';
  if (total >= 70) return 'B-';
  if (total >= 65) return 'C+';
  if (total >= 60) return 'C';
  if (total >= 55) return 'C-';
  if (total >= 50) return 'D';
  return 'F';
}

// Export for use
window.Database = Database;
window.DB = DB;
