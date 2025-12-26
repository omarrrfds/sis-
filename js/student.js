// ========================================
// University SIS - Student Module
// ========================================

const StudentModule = {
    // Render student dashboard
    renderDashboard: function () {
        const user = Auth.getUser();
        const enrolledCourses = DB.getEnrolledCourses(user.id);
        const grades = DB.getStudentGrades(user.id);
        const notifications = DB.getNotifications(user.id).filter(n => !n.read);
        const requests = DB.getStudentRequests(user.id);
        const pendingRequests = requests.filter(r => r.status === 'Pending');

        // Calculate current semester credits
        const currentCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);

        return `
      <div class="content">
        <!-- Welcome Section -->
        <div class="profile-header">
          <div class="profile-info">
            <div class="profile-avatar">
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="profile-details">
              <h2>Welcome back, ${user.firstName}!</h2>
              <p>${user.faculty} - ${user.department}</p>
              <div class="profile-badges">
                <span class="profile-badge"><i class="fas fa-id-card"></i> ${user.studentId}</span>
                <span class="profile-badge"><i class="fas fa-layer-group"></i> Level ${user.level}</span>
                <span class="profile-badge"><i class="fas fa-star"></i> ${user.academicStanding}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-icon primary">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="stat-info">
              <h3>${user.gpa.toFixed(2)}</h3>
              <p>Cumulative GPA</p>
              <span class="trend up"><i class="fas fa-arrow-up"></i> Good Standing</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon secondary">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="stat-info">
              <h3>${user.totalCredits}</h3>
              <p>Total Credits Earned</p>
              <span class="trend up"><i class="fas fa-check"></i> On Track</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon success">
              <i class="fas fa-book-open"></i>
            </div>
            <div class="stat-info">
              <h3>${enrolledCourses.length}</h3>
              <p>Current Courses</p>
              <span class="text-muted">${currentCredits} Credit Hours</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon warning">
              <i class="fas fa-bell"></i>
            </div>
            <div class="stat-info">
              <h3>${notifications.length}</h3>
              <p>Unread Notifications</p>
              ${pendingRequests.length > 0 ? `<span class="trend down">${pendingRequests.length} Pending Request(s)</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Two Column Layout -->
        <div class="grid grid-2">
          <!-- Current Courses -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-book"></i> My Courses</h3>
              <button class="btn btn-sm btn-primary" onclick="App.navigate('registration')">
                <i class="fas fa-plus"></i> Add Course
              </button>
            </div>
            <div class="card-body">
              ${enrolledCourses.length > 0 ? enrolledCourses.map(course => `
                <div class="d-flex align-center justify-between p-md" style="border-bottom: 1px solid var(--border-color);">
                  <div>
                    <h4 style="font-size: 0.95rem;">${course.code}</h4>
                    <p class="text-muted" style="font-size: 0.85rem;">${course.name}</p>
                  </div>
                  <div class="text-right">
                    <span class="badge badge-primary">${course.credits} Cr</span>
                    <p class="text-muted mt-sm" style="font-size: 0.75rem;">${course.schedule.day} ${course.schedule.time}</p>
                  </div>
                </div>
              `).join('') : '<div class="empty-state"><p>No courses enrolled yet.</p></div>'}
            </div>
          </div>

          <!-- Quick Actions & Notifications -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-bolt"></i> Quick Actions</h3>
            </div>
            <div class="card-body">
              <div class="grid grid-2 gap-md">
                <button class="btn btn-secondary btn-block" onclick="App.navigate('registration')">
                  <i class="fas fa-plus-circle"></i> Register Courses
                </button>
                <button class="btn btn-secondary btn-block" onclick="App.navigate('grades')">
                  <i class="fas fa-clipboard-list"></i> View Grades
                </button>
                <button class="btn btn-secondary btn-block" onclick="App.navigate('timetable')">
                  <i class="fas fa-calendar-alt"></i> My Timetable
                </button>
                <button class="btn btn-secondary btn-block" onclick="App.navigate('requests')">
                  <i class="fas fa-file-alt"></i> Submit Request
                </button>
              </div>

              <h4 class="mt-xl mb-md" style="font-size: 0.9rem;"><i class="fas fa-bell text-warning"></i> Recent Notifications</h4>
              ${notifications.slice(0, 3).map(n => `
                <div class="alert alert-${n.type === 'success' ? 'success' : n.type === 'warning' ? 'warning' : 'info'} mb-sm">
                  <i class="fas fa-${n.type === 'success' ? 'check-circle' : n.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                  <div>
                    <strong>${n.title}</strong>
                    <p style="font-size: 0.8rem; margin-top: 2px;">${n.message}</p>
                  </div>
                </div>
              `).join('') || '<p class="text-muted">No new notifications.</p>'}
            </div>
          </div>
        </div>

        <!-- Academic Progress -->
        <div class="card mt-lg">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-chart-bar"></i> Academic Progress</h3>
          </div>
          <div class="card-body">
            <div class="grid grid-4 gap-lg">
              <div class="text-center">
                <div class="circular-progress mx-auto">
                  <svg width="120" height="120">
                    <circle class="track" cx="60" cy="60" r="52" fill="none" stroke-width="10"/>
                    <circle class="fill" cx="60" cy="60" r="52" fill="none" stroke-width="10"
                      stroke-dasharray="327" stroke-dashoffset="${327 - (327 * (user.totalCredits / 136))}"/>
                  </svg>
                  <div class="value">${Math.round((user.totalCredits / 136) * 100)}%</div>
                </div>
                <p class="mt-md fw-500">Degree Progress</p>
                <span class="text-muted">${user.totalCredits} / 136 Credits</span>
              </div>
              <div class="text-center">
                <div class="circular-progress mx-auto">
                  <svg width="120" height="120">
                    <circle class="track" cx="60" cy="60" r="52" fill="none" stroke-width="10"/>
                    <circle class="fill" cx="60" cy="60" r="52" fill="none" stroke-width="10" style="stroke: var(--success-500);"
                      stroke-dasharray="327" stroke-dashoffset="${327 - (327 * (user.gpa / 4))}"/>
                  </svg>
                  <div class="value">${user.gpa.toFixed(2)}</div>
                </div>
                <p class="mt-md fw-500">GPA Score</p>
                <span class="text-muted">Out of 4.00</span>
              </div>
              <div class="text-center">
                <div class="circular-progress mx-auto">
                  <svg width="120" height="120">
                    <circle class="track" cx="60" cy="60" r="52" fill="none" stroke-width="10"/>
                    <circle class="fill" cx="60" cy="60" r="52" fill="none" stroke-width="10" style="stroke: var(--secondary-500);"
                      stroke-dasharray="327" stroke-dashoffset="${327 - (327 * 0.85)}"/>
                  </svg>
                  <div class="value">85%</div>
                </div>
                <p class="mt-md fw-500">Attendance Rate</p>
                <span class="text-muted">This Semester</span>
              </div>
              <div class="text-center">
                <div class="circular-progress mx-auto">
                  <svg width="120" height="120">
                    <circle class="track" cx="60" cy="60" r="52" fill="none" stroke-width="10"/>
                    <circle class="fill" cx="60" cy="60" r="52" fill="none" stroke-width="10" style="stroke: var(--warning-500);"
                      stroke-dasharray="327" stroke-dashoffset="${327 - (327 * (currentCredits / 18))}"/>
                  </svg>
                  <div class="value">${currentCredits}</div>
                </div>
                <p class="mt-md fw-500">Current Load</p>
                <span class="text-muted">Max 18 Credits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    },

    // Render course registration
    renderRegistration: function () {
        const user = Auth.getUser();
        const allCourses = DB.getAllCourses();
        const enrolledCourses = DB.getEnrolledCourses(user.id);
        const enrolledIds = enrolledCourses.map(c => c.id);
        const availableCourses = allCourses.filter(c => !enrolledIds.includes(c.id) && c.currentEnrollment < c.maxCapacity);
        const currentCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);

        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <div>
            <h2>Course Registration</h2>
            <p class="text-muted">Fall 2024 Semester - Registration ${Database.currentSemester.registrationOpen ? 'Open' : 'Closed'}</p>
          </div>
          <div class="d-flex gap-md align-center">
            <span class="badge badge-${currentCredits <= 18 ? 'success' : 'danger'}">
              ${currentCredits} / 18 Credit Hours
            </span>
          </div>
        </div>

        ${!Database.currentSemester.registrationOpen ? `
          <div class="alert alert-warning mb-lg">
            <i class="fas fa-exclamation-triangle"></i>
            <div>
              <strong>Registration Closed</strong>
              <p>Course registration for Fall 2024 is currently closed. Contact your advisor for assistance.</p>
            </div>
          </div>
        ` : ''}

        <div class="grid grid-2 gap-lg">
          <!-- Available Courses -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-list"></i> Available Courses</h3>
              <div class="d-flex gap-sm">
                <select class="form-control form-select" id="filterDept" style="width: 150px;" onchange="StudentModule.filterCourses()">
                  <option value="">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
            </div>
            <div class="card-body" style="max-height: 500px; overflow-y: auto;" id="availableCoursesList">
              ${availableCourses.map(course => {
            const doctor = Database.users.find(u => u.id === course.doctorId);
            const capacity = Math.round((course.currentEnrollment / course.maxCapacity) * 100);
            return `
                  <div class="course-card mb-md">
                    <div class="course-card-header" style="background: ${course.department === 'Computer Science' ? 'var(--gradient-primary)' : 'var(--gradient-secondary)'}">
                      <h4>${course.code}</h4>
                      <span>${course.name}</span>
                    </div>
                    <div class="course-card-body">
                      <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${course.credits} Credits</span>
                        <span><i class="fas fa-user-tie"></i> ${doctor ? doctor.firstName : 'TBA'}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${course.schedule.room}</span>
                      </div>
                      <div class="course-meta">
                        <span><i class="fas fa-calendar"></i> ${course.schedule.day} ${course.schedule.time}</span>
                      </div>
                      <div class="mt-md">
                        <div class="d-flex justify-between mb-sm">
                          <small>Capacity</small>
                          <small>${course.currentEnrollment}/${course.maxCapacity}</small>
                        </div>
                        <div class="progress-bar">
                          <div class="progress-fill ${capacity > 90 ? 'danger' : capacity > 70 ? 'warning' : ''}" style="width: ${capacity}%"></div>
                        </div>
                      </div>
                      ${course.prerequisites.length > 0 ? `
                        <p class="mt-md text-muted" style="font-size: 0.8rem;">
                          <i class="fas fa-lock"></i> Prerequisites: ${course.prerequisites.join(', ')}
                        </p>
                      ` : ''}
                    </div>
                    <div class="course-card-footer">
                      <span class="badge badge-${course.status === 'Active' ? 'success' : 'warning'}">${course.status}</span>
                      <button class="btn btn-sm btn-primary" onclick="StudentModule.enrollCourse(${course.id})" 
                        ${!Database.currentSemester.registrationOpen || currentCredits + course.credits > 18 ? 'disabled' : ''}>
                        <i class="fas fa-plus"></i> Enroll
                      </button>
                    </div>
                  </div>
                `;
        }).join('') || '<div class="empty-state"><i class="fas fa-search"></i><p>No available courses found.</p></div>'}
            </div>
          </div>

          <!-- Enrolled Courses -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-check-circle"></i> My Enrolled Courses</h3>
            </div>
            <div class="card-body" style="max-height: 500px; overflow-y: auto;">
              ${enrolledCourses.length > 0 ? enrolledCourses.map(course => {
            const doctor = Database.users.find(u => u.id === course.doctorId);
            return `
                  <div class="d-flex align-center justify-between p-md mb-md" style="background: var(--bg-tertiary); border-radius: var(--radius-lg); border-left: 4px solid var(--success-500);">
                    <div>
                      <h4 style="font-size: 0.95rem;">${course.code} - ${course.name}</h4>
                      <p class="text-muted" style="font-size: 0.8rem;">
                        <i class="fas fa-user-tie"></i> ${doctor ? doctor.firstName : 'TBA'} • 
                        <i class="fas fa-clock"></i> ${course.credits} Credits
                      </p>
                      <p class="text-muted" style="font-size: 0.8rem;">
                        <i class="fas fa-calendar"></i> ${course.schedule.day} ${course.schedule.time} • ${course.schedule.room}
                      </p>
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="StudentModule.dropCourse(${course.enrollmentId})"
                      ${!Database.currentSemester.registrationOpen ? 'disabled' : ''}>
                      <i class="fas fa-times"></i> Drop
                    </button>
                  </div>
                `;
        }).join('') : '<div class="empty-state"><i class="fas fa-book-open"></i><h3>No Courses Enrolled</h3><p>Browse available courses and click Enroll to register.</p></div>'}
            </div>
            <div class="card-footer">
              <div class="d-flex justify-between align-center">
                <span>Total Credits: <strong>${currentCredits}</strong></span>
                <span class="badge badge-${currentCredits <= 18 ? 'success' : 'danger'}">
                  ${currentCredits <= 18 ? 'Within Limit' : 'Exceeds Limit'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    },

    // Enroll in course
    enrollCourse: function (courseId) {
        const user = Auth.getUser();
        const course = DB.getCourseById(courseId);
        const enrolledCourses = DB.getEnrolledCourses(user.id);
        const currentCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);

        // Check credit limit
        if (currentCredits + course.credits > 18) {
            App.showToast('Cannot enroll: Would exceed 18 credit hour limit.', 'error');
            return;
        }

        // Check capacity
        if (course.currentEnrollment >= course.maxCapacity) {
            App.showToast('Cannot enroll: Course is full.', 'error');
            return;
        }

        // Check schedule conflicts
        const conflict = enrolledCourses.find(c =>
            c.schedule.day === course.schedule.day && c.schedule.time === course.schedule.time
        );
        if (conflict) {
            App.showToast(`Schedule conflict with ${conflict.code}.`, 'error');
            return;
        }

        // Enroll
        DB.addEnrollment(user.id, courseId);
        App.showToast(`Successfully enrolled in ${course.code}!`, 'success');
        App.navigate('registration');
    },

    // Drop course
    dropCourse: function (enrollmentId) {
        if (confirm('Are you sure you want to drop this course?')) {
            DB.dropEnrollment(enrollmentId);
            App.showToast('Course dropped successfully.', 'success');
            App.navigate('registration');
        }
    },

    // Filter courses
    filterCourses: function () {
        const dept = document.getElementById('filterDept').value;
        // Re-render with filter (simplified for demo)
        App.navigate('registration');
    },

    // Render grades
    renderGrades: function () {
        const user = Auth.getUser();
        const grades = DB.getStudentGrades(user.id);

        // Group by semester
        const semesters = [...new Set(grades.map(g => g.semester))];

        // Calculate semester GPAs
        const semesterData = semesters.map(sem => {
            const semGrades = grades.filter(g => g.semester === sem && g.grade !== null);
            const totalPoints = semGrades.reduce((sum, g) => {
                const points = this.gradeToPoints(g.grade);
                return sum + (points * g.credits);
            }, 0);
            const totalCredits = semGrades.reduce((sum, g) => sum + g.credits, 0);
            const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
            return { semester: sem, grades: grades.filter(g => g.semester === sem), gpa, credits: totalCredits };
        });

        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <div>
            <h2>Grades & Transcript</h2>
            <p class="text-muted">View your academic performance</p>
          </div>
          <button class="btn btn-primary" onclick="StudentModule.downloadTranscript()">
            <i class="fas fa-download"></i> Download Transcript
          </button>
        </div>

        <!-- GPA Summary -->
        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-icon primary">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="stat-info">
              <h3>${user.gpa.toFixed(2)}</h3>
              <p>Cumulative GPA</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon success">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="stat-info">
              <h3>${user.totalCredits}</h3>
              <p>Total Credits</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon secondary">
              <i class="fas fa-book-open"></i>
            </div>
            <div class="stat-info">
              <h3>${grades.filter(g => g.grade !== null).length}</h3>
              <p>Completed Courses</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon warning">
              <i class="fas fa-star"></i>
            </div>
            <div class="stat-info">
              <h3>${user.academicStanding}</h3>
              <p>Academic Standing</p>
            </div>
          </div>
        </div>

        <!-- Semester Tabs -->
        <div class="card">
          <div class="card-header">
            <div class="tabs" style="border: none; margin: 0;">
              ${semesterData.map((s, i) => `
                <button class="tab ${i === 0 ? 'active' : ''}" onclick="StudentModule.switchSemesterTab('${s.semester}', this)">
                  ${s.semester}
                </button>
              `).join('')}
            </div>
          </div>
          <div class="card-body">
            ${semesterData.map((s, i) => `
              <div class="tab-content ${i === 0 ? 'active' : ''}" id="sem-${s.semester.replace(/\s/g, '-')}">
                <div class="d-flex justify-between align-center mb-lg">
                  <div>
                    <h4>${s.semester}</h4>
                    <p class="text-muted">${s.credits} Credits • GPA: ${s.gpa.toFixed(2)}</p>
                  </div>
                  <span class="badge badge-${s.gpa >= 3.5 ? 'success' : s.gpa >= 2.5 ? 'primary' : 'warning'}">
                    ${s.gpa >= 3.5 ? 'Excellent' : s.gpa >= 2.5 ? 'Good' : 'Satisfactory'}
                  </span>
                </div>
                <div class="table-container">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Credits</th>
                        <th>Midterm</th>
                        <th>Final</th>
                        <th>Assignments</th>
                        <th>Total</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${s.grades.map(g => `
                        <tr>
                          <td><strong>${g.courseCode}</strong></td>
                          <td>${g.courseName}</td>
                          <td>${g.credits}</td>
                          <td>${g.midterm !== null ? g.midterm + '/50' : '-'}</td>
                          <td>${g.final !== null ? g.final + '/50' : '-'}</td>
                          <td>${g.assignments !== null ? g.assignments + '/20' : '-'}</td>
                          <td><strong>${g.total !== null ? g.total : 'Pending'}</strong></td>
                          <td>
                            <span class="badge badge-${this.gradeColor(g.grade)}">
                              ${g.grade || 'N/A'}
                            </span>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    },

    // Grade to GPA points
    gradeToPoints: function (grade) {
        const mapping = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0 };
        return mapping[grade] || 0;
    },

    // Grade color
    gradeColor: function (grade) {
        if (!grade) return 'warning';
        if (grade.startsWith('A')) return 'success';
        if (grade.startsWith('B')) return 'primary';
        if (grade.startsWith('C')) return 'info';
        if (grade === 'D') return 'warning';
        return 'danger';
    },

    // Switch semester tab
    switchSemesterTab: function (semester, btn) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('sem-' + semester.replace(/\s/g, '-')).classList.add('active');
    },

    // Download transcript (demo)
    downloadTranscript: function () {
        App.showToast('Transcript download started...', 'success');
        // In production, this would generate a PDF
    },

    // Render timetable
    renderTimetable: function () {
        const user = Auth.getUser();
        const enrolledCourses = DB.getEnrolledCourses(user.id);

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
        const times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

        // Create schedule map
        const schedule = {};
        enrolledCourses.forEach(course => {
            const key = `${course.schedule.day}-${course.schedule.time}`;
            schedule[key] = course;
        });

        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <div>
            <h2>My Timetable</h2>
            <p class="text-muted">Fall 2024 Schedule</p>
          </div>
          <div class="d-flex gap-md">
            <button class="btn btn-secondary" onclick="window.print()">
              <i class="fas fa-print"></i> Print
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="timetable">
              <div class="timetable-header" style="background: var(--gray-600);">Time</div>
              ${days.map(day => `<div class="timetable-header">${day.slice(0, 3)}</div>`).join('')}
              
              ${times.map(time => `
                <div class="timetable-time">${time}</div>
                ${days.map(day => {
            const key = `${day}-${time}`;
            const course = schedule[key];
            if (course) {
                return `
                      <div class="timetable-cell" style="background: var(--primary-50);">
                        <div class="timetable-event ${course.schedule.room.includes('Lab') ? 'lab' : ''}">
                          <strong>${course.code}</strong><br>
                          <small>${course.schedule.room}</small>
                        </div>
                      </div>
                    `;
            }
            return '<div class="timetable-cell"></div>';
        }).join('')}
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Course Legend -->
        <div class="card mt-lg">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-info-circle"></i> Course Details</h3>
          </div>
          <div class="card-body">
            <div class="grid grid-3 gap-md">
              ${enrolledCourses.map(course => {
            const doctor = Database.users.find(u => u.id === course.doctorId);
            return `
                  <div class="d-flex gap-md align-center p-md" style="background: var(--bg-tertiary); border-radius: var(--radius-md);">
                    <div style="width: 4px; height: 40px; background: ${course.schedule.room.includes('Lab') ? 'var(--secondary-500)' : 'var(--primary-500)'}; border-radius: 2px;"></div>
                    <div>
                      <strong>${course.code}</strong>
                      <p class="text-muted" style="font-size: 0.8rem;">${doctor ? doctor.firstName : 'TBA'} • ${course.schedule.room}</p>
                    </div>
                  </div>
                `;
        }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    },

    // Render requests/services
    renderRequests: function () {
        const user = Auth.getUser();
        const requests = DB.getStudentRequests(user.id);

        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <div>
            <h2>Academic Services & Requests</h2>
            <p class="text-muted">Submit and track your academic requests</p>
          </div>
          <button class="btn btn-primary" onclick="StudentModule.showNewRequestModal()">
            <i class="fas fa-plus"></i> New Request
          </button>
        </div>

        <!-- Request Types -->
        <div class="grid grid-4 gap-lg mb-xl">
          <div class="card cursor-pointer" onclick="StudentModule.showNewRequestModal('Course Overload')">
            <div class="card-body text-center">
              <div class="stat-icon primary mx-auto mb-md">
                <i class="fas fa-layer-group"></i>
              </div>
              <h4>Course Overload</h4>
              <p class="text-muted" style="font-size: 0.85rem;">Request extra credit hours</p>
            </div>
          </div>
          <div class="card cursor-pointer" onclick="StudentModule.showNewRequestModal('Withdrawal')">
            <div class="card-body text-center">
              <div class="stat-icon warning mx-auto mb-md">
                <i class="fas fa-sign-out-alt"></i>
              </div>
              <h4>Withdrawal</h4>
              <p class="text-muted" style="font-size: 0.85rem;">Withdraw from a course</p>
            </div>
          </div>
          <div class="card cursor-pointer" onclick="StudentModule.showNewRequestModal('Grade Appeal')">
            <div class="card-body text-center">
              <div class="stat-icon secondary mx-auto mb-md">
                <i class="fas fa-clipboard-check"></i>
              </div>
              <h4>Grade Appeal</h4>
              <p class="text-muted" style="font-size: 0.85rem;">Request grade review</p>
            </div>
          </div>
          <div class="card cursor-pointer" onclick="StudentModule.showNewRequestModal('Academic Leave')">
            <div class="card-body text-center">
              <div class="stat-icon success mx-auto mb-md">
                <i class="fas fa-calendar-times"></i>
              </div>
              <h4>Academic Leave</h4>
              <p class="text-muted" style="font-size: 0.85rem;">Request leave of absence</p>
            </div>
          </div>
        </div>

        <!-- Request History -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-history"></i> Request History</h3>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Admin Notes</th>
                  </tr>
                </thead>
                <tbody>
                  ${requests.length > 0 ? requests.map(r => `
                    <tr>
                      <td>#REQ-${String(r.id).padStart(4, '0')}</td>
                      <td><span class="badge badge-info">${r.type}</span></td>
                      <td style="max-width: 250px;">${r.description}</td>
                      <td>${r.createdAt}</td>
                      <td>
                        <span class="badge badge-${r.status === 'Approved' ? 'success' : r.status === 'Rejected' ? 'danger' : 'warning'}">
                          <span class="status-dot ${r.status === 'Approved' ? 'active' : r.status === 'Rejected' ? '' : 'pending'}"></span>
                          ${r.status}
                        </span>
                      </td>
                      <td>${r.adminNotes || '-'}</td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="6" class="text-center text-muted">No requests submitted yet.</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- New Request Modal -->
      <div class="modal-overlay" id="newRequestModal">
        <div class="modal">
          <div class="modal-header">
            <h3>Submit New Request</h3>
            <button class="modal-close" onclick="StudentModule.hideModal()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <form id="newRequestForm">
              <div class="form-group">
                <label class="form-label">Request Type</label>
                <select class="form-control form-select" id="requestType" required>
                  <option value="">Select type...</option>
                  <option value="Course Overload">Course Overload</option>
                  <option value="Withdrawal">Withdrawal</option>
                  <option value="Grade Appeal">Grade Appeal</option>
                  <option value="Academic Leave">Academic Leave</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-control" id="requestDescription" rows="4" placeholder="Please provide details about your request..." required></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Supporting Documents (Optional)</label>
                <input type="file" class="form-control" id="requestFiles">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="StudentModule.hideModal()">Cancel</button>
            <button class="btn btn-primary" onclick="StudentModule.submitRequest()">
              <i class="fas fa-paper-plane"></i> Submit Request
            </button>
          </div>
        </div>
      </div>
    `;
    },

    // Show new request modal
    showNewRequestModal: function (type = '') {
        document.getElementById('newRequestModal').classList.add('active');
        if (type) {
            document.getElementById('requestType').value = type;
        }
    },

    // Hide modal
    hideModal: function () {
        document.getElementById('newRequestModal').classList.remove('active');
    },

    // Submit request
    submitRequest: function () {
        const user = Auth.getUser();
        const type = document.getElementById('requestType').value;
        const description = document.getElementById('requestDescription').value;

        if (!type || !description) {
            App.showToast('Please fill all required fields.', 'error');
            return;
        }

        DB.addRequest(user.id, type, description);
        App.showToast('Request submitted successfully!', 'success');
        this.hideModal();
        App.navigate('requests');
    },

    // Render profile
    renderProfile: function () {
        const user = Auth.getUser();

        return `
      <div class="content">
        <div class="profile-header">
          <div class="profile-info">
            <div class="profile-avatar">
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="profile-details">
              <h2>${user.firstName} ${user.lastName}</h2>
              <p>${user.faculty} - ${user.department}</p>
              <div class="profile-badges">
                <span class="profile-badge"><i class="fas fa-id-card"></i> ${user.studentId}</span>
                <span class="profile-badge"><i class="fas fa-layer-group"></i> Level ${user.level}</span>
                <span class="profile-badge"><i class="fas fa-star"></i> GPA: ${user.gpa.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-2 gap-lg">
          <!-- Personal Information -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-user"></i> Personal Information</h3>
              <button class="btn btn-sm btn-secondary">
                <i class="fas fa-edit"></i> Edit
              </button>
            </div>
            <div class="card-body">
              <div class="grid grid-2 gap-lg">
                <div>
                  <label class="form-label">First Name</label>
                  <p class="fw-500">${user.firstName}</p>
                </div>
                <div>
                  <label class="form-label">Last Name</label>
                  <p class="fw-500">${user.lastName}</p>
                </div>
                <div>
                  <label class="form-label">Email</label>
                  <p class="fw-500">${user.email}</p>
                </div>
                <div>
                  <label class="form-label">Phone</label>
                  <p class="fw-500">${user.phone}</p>
                </div>
                <div class="grid-2">
                  <label class="form-label">Address</label>
                  <p class="fw-500">${user.address}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Academic Information -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-graduation-cap"></i> Academic Information</h3>
            </div>
            <div class="card-body">
              <div class="grid grid-2 gap-lg">
                <div>
                  <label class="form-label">Student ID</label>
                  <p class="fw-500">${user.studentId}</p>
                </div>
                <div>
                  <label class="form-label">Level</label>
                  <p class="fw-500">Level ${user.level}</p>
                </div>
                <div>
                  <label class="form-label">Faculty</label>
                  <p class="fw-500">${user.faculty}</p>
                </div>
                <div>
                  <label class="form-label">Department</label>
                  <p class="fw-500">${user.department}</p>
                </div>
                <div>
                  <label class="form-label">Academic Advisor</label>
                  <p class="fw-500">${user.advisor}</p>
                </div>
                <div>
                  <label class="form-label">Expected Graduation</label>
                  <p class="fw-500">${user.expectedGraduation}</p>
                </div>
                <div>
                  <label class="form-label">Enrollment Status</label>
                  <span class="badge badge-success">${user.enrollmentStatus}</span>
                </div>
                <div>
                  <label class="form-label">Academic Standing</label>
                  <span class="badge badge-primary">${user.academicStanding}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-shield-alt"></i> Security</h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Change Password</label>
                <input type="password" class="form-control" placeholder="Current password">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="New password">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Confirm new password">
              </div>
              <button class="btn btn-primary">Update Password</button>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-clock"></i> Recent Activity</h3>
            </div>
            <div class="card-body">
              <div class="d-flex gap-md align-center p-sm" style="border-bottom: 1px solid var(--border-color);">
                <div class="stat-icon primary" style="width: 36px; height: 36px; font-size: 0.9rem;">
                  <i class="fas fa-book"></i>
                </div>
                <div>
                  <p class="fw-500">Enrolled in CS301</p>
                  <small class="text-muted">2 days ago</small>
                </div>
              </div>
              <div class="d-flex gap-md align-center p-sm" style="border-bottom: 1px solid var(--border-color);">
                <div class="stat-icon success" style="width: 36px; height: 36px; font-size: 0.9rem;">
                  <i class="fas fa-clipboard-check"></i>
                </div>
                <div>
                  <p class="fw-500">Midterm grade posted for CS301</p>
                  <small class="text-muted">1 week ago</small>
                </div>
              </div>
              <div class="d-flex gap-md align-center p-sm">
                <div class="stat-icon warning" style="width: 36px; height: 36px; font-size: 0.9rem;">
                  <i class="fas fa-file-alt"></i>
                </div>
                <div>
                  <p class="fw-500">Submitted course overload request</p>
                  <small class="text-muted">2 weeks ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    }
};

// Export
window.StudentModule = StudentModule;
