// ========================================
// University SIS - Doctor/Instructor Module
// ========================================

const DoctorModule = {
    // Render doctor dashboard
    renderDashboard: function () {
        const user = Auth.getUser();
        const courses = DB.getCoursesByDoctor(user.id);
        const notifications = DB.getNotifications(user.id);
        const unreadNotifications = notifications.filter(n => !n.read);

        // Calculate total students
        let totalStudents = 0;
        courses.forEach(c => {
            totalStudents += c.currentEnrollment;
        });

        return `
      <div class="content">
        <!-- Welcome Section -->
        <div class="profile-header" style="background: var(--gradient-secondary);">
          <div class="profile-info">
            <div class="profile-avatar" style="background: white;">
              <i class="fas fa-chalkboard-teacher" style="color: var(--secondary-600);"></i>
            </div>
            <div class="profile-details">
              <h2>Welcome, ${user.firstName}!</h2>
              <p>${user.title} - ${user.department}</p>
              <div class="profile-badges">
                <span class="profile-badge"><i class="fas fa-id-card"></i> ${user.doctorId}</span>
                <span class="profile-badge"><i class="fas fa-microscope"></i> ${user.specialization}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-icon primary">
              <i class="fas fa-book"></i>
            </div>
            <div class="stat-info">
              <h3>${courses.length}</h3>
              <p>Assigned Courses</p>
              <span class="text-muted">Fall 2024</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon secondary">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-info">
              <h3>${totalStudents}</h3>
              <p>Total Students</p>
              <span class="text-muted">Across all courses</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon success">
              <i class="fas fa-clipboard-check"></i>
            </div>
            <div class="stat-info">
              <h3>0 / ${courses.length}</h3>
              <p>Grades Submitted</p>
              <span class="trend down"><i class="fas fa-clock"></i> Pending</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon warning">
              <i class="fas fa-bell"></i>
            </div>
            <div class="stat-info">
              <h3>${unreadNotifications.length}</h3>
              <p>Notifications</p>
            </div>
          </div>
        </div>

        <!-- My Courses Grid -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-book-open"></i> My Courses</h3>
          </div>
          <div class="card-body">
            <div class="grid grid-3 gap-lg">
              ${courses.map(course => `
                <div class="course-card">
                  <div class="course-card-header">
                    <h4>${course.code}</h4>
                    <span>${course.name}</span>
                  </div>
                  <div class="course-card-body">
                    <div class="course-meta">
                      <span><i class="fas fa-users"></i> ${course.currentEnrollment} Students</span>
                      <span><i class="fas fa-clock"></i> ${course.credits} Credits</span>
                    </div>
                    <div class="course-meta">
                      <span><i class="fas fa-calendar"></i> ${course.schedule.day}</span>
                      <span><i class="fas fa-map-marker-alt"></i> ${course.schedule.room}</span>
                    </div>
                    <div class="mt-md">
                      <div class="d-flex justify-between mb-sm">
                        <small>Capacity</small>
                        <small>${course.currentEnrollment}/${course.maxCapacity}</small>
                      </div>
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(course.currentEnrollment / course.maxCapacity) * 100}%"></div>
                      </div>
                    </div>
                  </div>
                  <div class="course-card-footer">
                    <button class="btn btn-sm btn-secondary" onclick="App.navigate('course-view', ${course.id})">
                      <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="App.navigate('grades-entry', ${course.id})">
                      <i class="fas fa-edit"></i> Grades
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Quick Actions & Schedule -->
        <div class="grid grid-2 gap-lg mt-lg">
          <!-- Quick Actions -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-bolt"></i> Quick Actions</h3>
            </div>
            <div class="card-body">
              <div class="grid grid-2 gap-md">
                <button class="btn btn-secondary btn-block" onclick="App.navigate('attendance')">
                  <i class="fas fa-clipboard-list"></i> Take Attendance
                </button>
                <button class="btn btn-secondary btn-block" onclick="App.navigate('grades-entry')">
                  <i class="fas fa-edit"></i> Enter Grades
                </button>
                <button class="btn btn-secondary btn-block" onclick="App.navigate('materials')">
                  <i class="fas fa-upload"></i> Upload Materials
                </button>
                <button class="btn btn-secondary btn-block" onclick="App.navigate('students')">
                  <i class="fas fa-users"></i> View Students
                </button>
              </div>
            </div>
          </div>

          <!-- Today's Schedule -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-calendar-day"></i> Today's Schedule</h3>
            </div>
            <div class="card-body">
              ${courses.filter(c => c.schedule.day === 'Sunday').length > 0 ?
                courses.filter(c => c.schedule.day === 'Sunday').map(course => `
                  <div class="d-flex align-center gap-md p-md mb-md" style="background: var(--bg-tertiary); border-radius: var(--radius-lg); border-left: 4px solid var(--primary-500);">
                    <div class="stat-icon primary" style="width: 40px; height: 40px; font-size: 1rem;">
                      <i class="fas fa-chalkboard"></i>
                    </div>
                    <div class="flex-1">
                      <h4 style="font-size: 0.95rem;">${course.code}</h4>
                      <p class="text-muted" style="font-size: 0.8rem;">${course.schedule.time} • ${course.schedule.room}</p>
                    </div>
                    <span class="badge badge-primary">${course.currentEnrollment} students</span>
                  </div>
                `).join('') :
                `<div class="empty-state">
                  <i class="fas fa-calendar-check"></i>
                  <p>No classes scheduled for today.</p>
                </div>`
            }
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="card mt-lg">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-bell"></i> Recent Notifications</h3>
          </div>
          <div class="card-body">
            ${notifications.slice(0, 5).map(n => `
              <div class="alert alert-${n.type === 'success' ? 'success' : n.type === 'warning' ? 'warning' : 'info'} mb-sm">
                <i class="fas fa-${n.type === 'success' ? 'check-circle' : n.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <div class="flex-1">
                  <strong>${n.title}</strong>
                  <p style="font-size: 0.85rem; margin-top: 2px;">${n.message}</p>
                </div>
                <small class="text-muted">${n.createdAt}</small>
              </div>
            `).join('') || '<p class="text-muted text-center">No notifications.</p>'}
          </div>
        </div>
      </div>
    `;
    },

    // Render course view
    renderCourseView: function (courseId) {
        const course = DB.getCourseById(courseId);
        if (!course) return '<div class="content"><p>Course not found.</p></div>';

        const enrollments = DB.getCourseEnrollments(courseId);

        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <div>
            <h2>${course.code} - ${course.name}</h2>
            <p class="text-muted">${course.department} • ${course.credits} Credits</p>
          </div>
          <div class="d-flex gap-md">
            <button class="btn btn-secondary" onclick="App.navigate('dashboard')">
              <i class="fas fa-arrow-left"></i> Back
            </button>
          </div>
        </div>

        <!-- Course Info Cards -->
        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-icon primary">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-info">
              <h3>${course.currentEnrollment}</h3>
              <p>Enrolled Students</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon secondary">
              <i class="fas fa-chair"></i>
            </div>
            <div class="stat-info">
              <h3>${course.maxCapacity - course.currentEnrollment}</h3>
              <p>Available Seats</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon success">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="stat-info">
              <h3>${course.schedule.day}</h3>
              <p>${course.schedule.time}</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon warning">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="stat-info">
              <h3>${course.schedule.room}</h3>
              <p>Room Location</p>
            </div>
          </div>
        </div>

        <div class="grid grid-2 gap-lg">
          <!-- Course Details -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-info-circle"></i> Course Details</h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Description</label>
                <p>${course.description}</p>
              </div>
              <div class="grid grid-2 gap-lg mt-lg">
                <div>
                  <label class="form-label">Prerequisites</label>
                  <p>${course.prerequisites.length > 0 ? course.prerequisites.join(', ') : 'None'}</p>
                </div>
                <div>
                  <label class="form-label">Status</label>
                  <span class="badge badge-${course.status === 'Active' ? 'success' : 'warning'}">${course.status}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-tasks"></i> Course Actions</h3>
            </div>
            <div class="card-body">
              <div class="grid grid-2 gap-md">
                <button class="btn btn-primary btn-block" onclick="App.navigate('attendance', ${courseId})">
                  <i class="fas fa-clipboard-list"></i> Attendance
                </button>
                <button class="btn btn-success btn-block" onclick="App.navigate('grades-entry', ${courseId})">
                  <i class="fas fa-edit"></i> Grades
                </button>
                <button class="btn btn-secondary btn-block" onclick="DoctorModule.showUploadModal()">
                  <i class="fas fa-upload"></i> Upload Material
                </button>
                <button class="btn btn-secondary btn-block" onclick="DoctorModule.exportRoster(${courseId})">
                  <i class="fas fa-download"></i> Export Roster
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Enrolled Students -->
        <div class="card mt-lg">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-user-graduate"></i> Enrolled Students</h3>
            <div class="d-flex gap-md">
              <input type="text" class="form-control" placeholder="Search students..." style="width: 250px;" oninput="DoctorModule.filterStudents(this.value)">
            </div>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table" id="studentsTable">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>GPA</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${enrollments.map(s => `
                    <tr>
                      <td><strong>${s.studentId}</strong></td>
                      <td>
                        <div class="d-flex align-center gap-md">
                          <div class="avatar" style="background: var(--gradient-primary); width: 32px; height: 32px; font-size: 0.75rem;">
                            ${s.firstName[0]}${s.lastName[0]}
                          </div>
                          ${s.firstName} ${s.lastName}
                        </div>
                      </td>
                      <td>Level ${s.level}</td>
                      <td>
                        <span class="badge badge-${s.gpa >= 3.5 ? 'success' : s.gpa >= 2.5 ? 'primary' : 'warning'}">
                          ${s.gpa.toFixed(2)}
                        </span>
                      </td>
                      <td>${s.email}</td>
                      <td>
                        <button class="btn btn-sm btn-icon btn-secondary" title="View Profile">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-icon btn-secondary" title="Send Message">
                          <i class="fas fa-envelope"></i>
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
    },

    // Render grades entry
    renderGradesEntry: function (courseId) {
        const user = Auth.getUser();
        const courses = DB.getCoursesByDoctor(user.id);
        const selectedCourse = courseId ? DB.getCourseById(courseId) : courses[0];

        if (!selectedCourse) return '<div class="content"><p>No courses assigned.</p></div>';

        const enrollments = DB.getCourseEnrollments(selectedCourse.id);

        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <div>
            <h2>Grades Entry</h2>
            <p class="text-muted">Enter and manage student grades</p>
          </div>
          <div class="d-flex gap-md">
            <select class="form-control form-select" style="width: 250px;" onchange="App.navigate('grades-entry', this.value)">
              ${courses.map(c => `
                <option value="${c.id}" ${c.id === selectedCourse.id ? 'selected' : ''}>
                  ${c.code} - ${c.name}
                </option>
              `).join('')}
            </select>
            <button class="btn btn-success" onclick="DoctorModule.submitAllGrades(${selectedCourse.id})">
              <i class="fas fa-check"></i> Submit Grades
            </button>
          </div>
        </div>

        <div class="alert alert-warning mb-lg">
          <i class="fas fa-exclamation-triangle"></i>
          <div>
            <strong>Grade Submission Deadline</strong>
            <p>Please submit all grades by ${Database.currentSemester.gradeSubmissionDeadline}. Grades cannot be modified after submission.</p>
          </div>
        </div>

        <!-- Grades Table -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-clipboard-list"></i> ${selectedCourse.code} - Student Grades</h3>
            <span class="badge badge-info">${enrollments.length} Students</span>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Midterm (50)</th>
                    <th>Final (50)</th>
                    <th>Assignments (20)</th>
                    <th>Total (100)</th>
                    <th>Grade</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${enrollments.map((s, index) => {
            const midterm = Math.floor(Math.random() * 15) + 35;
            const final = null;
            const assignments = Math.floor(Math.random() * 5) + 15;
            return `
                      <tr>
                        <td><strong>${s.studentId}</strong></td>
                        <td>${s.firstName} ${s.lastName}</td>
                        <td>
                          <input type="number" class="form-control" style="width: 80px;" min="0" max="50" value="${midterm}" 
                            id="midterm-${s.userId}" onchange="DoctorModule.calculateTotal(${s.userId})">
                        </td>
                        <td>
                          <input type="number" class="form-control" style="width: 80px;" min="0" max="50" value="" 
                            id="final-${s.userId}" onchange="DoctorModule.calculateTotal(${s.userId})">
                        </td>
                        <td>
                          <input type="number" class="form-control" style="width: 80px;" min="0" max="20" value="${assignments}" 
                            id="assignments-${s.userId}" onchange="DoctorModule.calculateTotal(${s.userId})">
                        </td>
                        <td>
                          <strong id="total-${s.userId}">-</strong>
                        </td>
                        <td>
                          <span class="badge badge-warning" id="grade-${s.userId}">Pending</span>
                        </td>
                        <td>
                          <span class="status-dot pending"></span> Draft
                        </td>
                      </tr>
                    `;
        }).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-between align-center">
              <span class="text-muted">Auto-save enabled</span>
              <div class="d-flex gap-md">
                <button class="btn btn-secondary" onclick="DoctorModule.saveDraft()">
                  <i class="fas fa-save"></i> Save Draft
                </button>
                <button class="btn btn-success" onclick="DoctorModule.submitAllGrades(${selectedCourse.id})">
                  <i class="fas fa-paper-plane"></i> Submit All Grades
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Grade Distribution -->
        <div class="card mt-lg">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-chart-bar"></i> Grade Distribution</h3>
          </div>
          <div class="card-body">
            <div class="grid grid-4 gap-lg text-center">
              <div>
                <h3 class="text-success">0</h3>
                <p class="text-muted">A Grade</p>
              </div>
              <div>
                <h3 class="text-primary">0</h3>
                <p class="text-muted">B Grade</p>
              </div>
              <div>
                <h3 class="text-warning">0</h3>
                <p class="text-muted">C Grade</p>
              </div>
              <div>
                <h3 class="text-danger">0</h3>
                <p class="text-muted">D/F Grade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    },

    // Calculate total grade
    calculateTotal: function (studentId) {
        const midterm = parseInt(document.getElementById(`midterm-${studentId}`).value) || 0;
        const final = parseInt(document.getElementById(`final-${studentId}`).value) || 0;
        const assignments = parseInt(document.getElementById(`assignments-${studentId}`).value) || 0;

        const total = midterm + final + assignments;
        const totalEl = document.getElementById(`total-${studentId}`);
        const gradeEl = document.getElementById(`grade-${studentId}`);

        if (final > 0) {
            totalEl.textContent = total;
            const grade = this.calculateLetterGrade(total);
            gradeEl.textContent = grade;
            gradeEl.className = `badge badge-${this.gradeColor(grade)}`;
        } else {
            totalEl.textContent = '-';
            gradeEl.textContent = 'Pending';
            gradeEl.className = 'badge badge-warning';
        }
    },

    // Calculate letter grade
    calculateLetterGrade: function (total) {
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
    },

    // Grade color
    gradeColor: function (grade) {
        if (grade.startsWith('A')) return 'success';
        if (grade.startsWith('B')) return 'primary';
        if (grade.startsWith('C')) return 'info';
        if (grade === 'D') return 'warning';
        return 'danger';
    },

    // Submit grades
    submitAllGrades: function (courseId) {
        if (confirm('Are you sure you want to submit all grades? This action cannot be undone.')) {
            App.showToast('Grades submitted successfully!', 'success');
        }
    },

    // Save draft
    saveDraft: function () {
        App.showToast('Draft saved successfully!', 'success');
    },

    // Render attendance
    renderAttendance: function (courseId) {
        const user = Auth.getUser();
        const courses = DB.getCoursesByDoctor(user.id);
        const selectedCourse = courseId ? DB.getCourseById(courseId) : courses[0];

        if (!selectedCourse) return '<div class="content"><p>No courses assigned.</p></div>';

        const enrollments = DB.getCourseEnrollments(selectedCourse.id);
        const today = new Date().toISOString().split('T')[0];

        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <div>
            <h2>Attendance Management</h2>
            <p class="text-muted">Mark and track student attendance</p>
          </div>
          <div class="d-flex gap-md">
            <select class="form-control form-select" style="width: 250px;" onchange="App.navigate('attendance', this.value)">
              ${courses.map(c => `
                <option value="${c.id}" ${c.id === selectedCourse.id ? 'selected' : ''}>
                  ${c.code} - ${c.name}
                </option>
              `).join('')}
            </select>
            <input type="date" class="form-control" value="${today}" style="width: 180px;">
          </div>
        </div>

        <!-- Attendance Stats -->
        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-icon success">
              <i class="fas fa-user-check"></i>
            </div>
            <div class="stat-info">
              <h3>0</h3>
              <p>Present</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon danger">
              <i class="fas fa-user-times"></i>
            </div>
            <div class="stat-info">
              <h3>0</h3>
              <p>Absent</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon warning">
              <i class="fas fa-user-clock"></i>
            </div>
            <div class="stat-info">
              <h3>0</h3>
              <p>Late</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon primary">
              <i class="fas fa-percentage"></i>
            </div>
            <div class="stat-info">
              <h3>--%</h3>
              <p>Attendance Rate</p>
            </div>
          </div>
        </div>

        <!-- Attendance Table -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-clipboard-list"></i> ${selectedCourse.code} - Take Attendance</h3>
            <div class="d-flex gap-md">
              <button class="btn btn-sm btn-success" onclick="DoctorModule.markAllPresent()">
                <i class="fas fa-check-double"></i> Mark All Present
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Late</th>
                    <th>Attendance %</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  ${enrollments.map((s, index) => `
                    <tr>
                      <td><strong>${s.studentId}</strong></td>
                      <td>
                        <div class="d-flex align-center gap-md">
                          <div class="avatar" style="background: var(--gradient-primary); width: 32px; height: 32px; font-size: 0.75rem;">
                            ${s.firstName[0]}${s.lastName[0]}
                          </div>
                          ${s.firstName} ${s.lastName}
                        </div>
                      </td>
                      <td>
                        <input type="radio" name="attendance-${s.userId}" value="present" id="present-${s.userId}">
                        <label for="present-${s.userId}" class="text-success"><i class="fas fa-check"></i></label>
                      </td>
                      <td>
                        <input type="radio" name="attendance-${s.userId}" value="absent" id="absent-${s.userId}">
                        <label for="absent-${s.userId}" class="text-danger"><i class="fas fa-times"></i></label>
                      </td>
                      <td>
                        <input type="radio" name="attendance-${s.userId}" value="late" id="late-${s.userId}">
                        <label for="late-${s.userId}" class="text-warning"><i class="fas fa-clock"></i></label>
                      </td>
                      <td>
                        <div class="d-flex align-center gap-sm">
                          <div class="progress-bar" style="width: 80px;">
                            <div class="progress-fill" style="width: 85%"></div>
                          </div>
                          <span>85%</span>
                        </div>
                      </td>
                      <td>
                        <input type="text" class="form-control" placeholder="Notes..." style="width: 150px;">
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-end gap-md">
              <button class="btn btn-secondary">
                <i class="fas fa-download"></i> Export Attendance
              </button>
              <button class="btn btn-primary" onclick="DoctorModule.saveAttendance()">
                <i class="fas fa-save"></i> Save Attendance
              </button>
            </div>
          </div>
        </div>

        <!-- Attendance History -->
        <div class="card mt-lg">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-history"></i> Attendance History</h3>
          </div>
          <div class="card-body">
            <div class="d-flex gap-md flex-wrap">
              ${['2024-10-06', '2024-09-29', '2024-09-22', '2024-09-15', '2024-09-08'].map(date => `
                <button class="btn btn-secondary" onclick="DoctorModule.loadAttendance('${date}')">
                  ${date}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    },

    // Mark all present
    markAllPresent: function () {
        document.querySelectorAll('input[value="present"]').forEach(radio => {
            radio.checked = true;
        });
        App.showToast('All students marked as present.', 'success');
    },

    // Save attendance
    saveAttendance: function () {
        App.showToast('Attendance saved successfully!', 'success');
    },

    // Load attendance for date
    loadAttendance: function (date) {
        App.showToast(`Loading attendance for ${date}...`, 'info');
    },

    // Render materials upload
    renderMaterials: function () {
        const user = Auth.getUser();
        const courses = DB.getCoursesByDoctor(user.id);

        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <div>
            <h2>Course Materials</h2>
            <p class="text-muted">Upload and manage course materials</p>
          </div>
          <button class="btn btn-primary" onclick="DoctorModule.showUploadModal()">
            <i class="fas fa-upload"></i> Upload New
          </button>
        </div>

        <!-- Materials by Course -->
        ${courses.map(course => `
          <div class="card mb-lg">
            <div class="card-header">
              <h3 class="card-title"><i class="fas fa-folder"></i> ${course.code} - ${course.name}</h3>
              <button class="btn btn-sm btn-primary" onclick="DoctorModule.showUploadModal(${course.id})">
                <i class="fas fa-plus"></i> Add Material
              </button>
            </div>
            <div class="card-body">
              <div class="grid grid-4 gap-md">
                <div class="p-md text-center" style="background: var(--bg-tertiary); border-radius: var(--radius-lg); cursor: pointer;">
                  <i class="fas fa-file-pdf fa-2x text-danger mb-md"></i>
                  <p class="fw-500">Syllabus.pdf</p>
                  <small class="text-muted">2.3 MB</small>
                </div>
                <div class="p-md text-center" style="background: var(--bg-tertiary); border-radius: var(--radius-lg); cursor: pointer;">
                  <i class="fas fa-file-powerpoint fa-2x text-warning mb-md"></i>
                  <p class="fw-500">Lecture 1.pptx</p>
                  <small class="text-muted">5.1 MB</small>
                </div>
                <div class="p-md text-center" style="background: var(--bg-tertiary); border-radius: var(--radius-lg); cursor: pointer;">
                  <i class="fas fa-file-powerpoint fa-2x text-warning mb-md"></i>
                  <p class="fw-500">Lecture 2.pptx</p>
                  <small class="text-muted">4.8 MB</small>
                </div>
                <div class="p-md text-center" style="background: var(--bg-tertiary); border-radius: var(--radius-lg); border: 2px dashed var(--border-color); cursor: pointer;" onclick="DoctorModule.showUploadModal(${course.id})">
                  <i class="fas fa-plus fa-2x text-muted mb-md"></i>
                  <p class="text-muted">Add Material</p>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Upload Modal -->
      <div class="modal-overlay" id="uploadModal">
        <div class="modal">
          <div class="modal-header">
            <h3>Upload Material</h3>
            <button class="modal-close" onclick="DoctorModule.hideUploadModal()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Course</label>
              <select class="form-control form-select" id="uploadCourse">
                ${courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Material Type</label>
              <select class="form-control form-select">
                <option>Lecture Slides</option>
                <option>Assignment</option>
                <option>Syllabus</option>
                <option>Reference Material</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">File</label>
              <input type="file" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label">Description (Optional)</label>
              <textarea class="form-control" rows="3" placeholder="Brief description..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="DoctorModule.hideUploadModal()">Cancel</button>
            <button class="btn btn-primary" onclick="DoctorModule.uploadMaterial()">
              <i class="fas fa-upload"></i> Upload
            </button>
          </div>
        </div>
      </div>
    `;
    },

    // Show upload modal
    showUploadModal: function (courseId) {
        document.getElementById('uploadModal').classList.add('active');
        if (courseId) {
            document.getElementById('uploadCourse').value = courseId;
        }
    },

    // Hide upload modal
    hideUploadModal: function () {
        document.getElementById('uploadModal').classList.remove('active');
    },

    // Upload material
    uploadMaterial: function () {
        App.showToast('Material uploaded successfully!', 'success');
        this.hideUploadModal();
    },

    // Export roster
    exportRoster: function (courseId) {
        App.showToast('Roster export started...', 'success');
    },

    // Filter students
    filterStudents: function (query) {
        const rows = document.querySelectorAll('#studentsTable tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
        });
    },

    // Render all students view
    renderStudents: function () {
        const user = Auth.getUser();
        const courses = DB.getCoursesByDoctor(user.id);

        let allStudents = [];
        courses.forEach(course => {
            const enrollments = DB.getCourseEnrollments(course.id);
            enrollments.forEach(s => {
                if (!allStudents.find(st => st.userId === s.userId)) {
                    allStudents.push({ ...s, courses: [course.code] });
                } else {
                    const existing = allStudents.find(st => st.userId === s.userId);
                    existing.courses.push(course.code);
                }
            });
        });

        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <div>
            <h2>My Students</h2>
            <p class="text-muted">All students enrolled in your courses</p>
          </div>
          <div class="d-flex gap-md">
            <input type="text" class="form-control" placeholder="Search students..." style="width: 250px;" oninput="DoctorModule.filterStudents(this.value)">
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-users"></i> Students List</h3>
            <span class="badge badge-primary">${allStudents.length} Students</span>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table" id="studentsTable">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Department</th>
                    <th>GPA</th>
                    <th>Enrolled Courses</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${allStudents.map(s => `
                    <tr>
                      <td><strong>${s.studentId}</strong></td>
                      <td>
                        <div class="d-flex align-center gap-md">
                          <div class="avatar" style="background: var(--gradient-primary); width: 36px; height: 36px; font-size: 0.8rem;">
                            ${s.firstName[0]}${s.lastName[0]}
                          </div>
                          <div>
                            <p class="fw-500">${s.firstName} ${s.lastName}</p>
                            <small class="text-muted">${s.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>Level ${s.level}</td>
                      <td>${s.department}</td>
                      <td>
                        <span class="badge badge-${s.gpa >= 3.5 ? 'success' : s.gpa >= 2.5 ? 'primary' : 'warning'}">
                          ${s.gpa.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        ${s.courses.map(c => `<span class="badge badge-info mr-sm">${c}</span>`).join('')}
                      </td>
                      <td>
                        <button class="btn btn-sm btn-icon btn-secondary" title="View Profile">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-icon btn-secondary" title="Send Email">
                          <i class="fas fa-envelope"></i>
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
    }
};

// Export
window.DoctorModule = DoctorModule;
