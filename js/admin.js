// ========================================
// University SIS - Admin Module
// ========================================

const AdminModule = {
    renderDashboard: function () {
        const stats = DB.getStatistics();
        const requests = DB.getAllRequests().filter(r => r.status === 'Pending');

        return `
      <div class="content">
        <div class="profile-header" style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);">
          <div class="profile-info">
            <div class="profile-avatar" style="background: white;">
              <i class="fas fa-user-shield" style="color: #7c3aed;"></i>
            </div>
            <div class="profile-details">
              <h2>Admin Dashboard</h2>
              <p>University Management System</p>
              <div class="profile-badges">
                <span class="profile-badge"><i class="fas fa-calendar"></i> ${Database.currentSemester.name}</span>
                <span class="profile-badge"><i class="fas fa-door-open"></i> Registration ${stats.registrationOpen ? 'Open' : 'Closed'}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="stat-cards">
          <div class="stat-card"><div class="stat-icon primary"><i class="fas fa-user-graduate"></i></div>
            <div class="stat-info"><h3>${stats.totalStudents}</h3><p>Students</p></div></div>
          <div class="stat-card"><div class="stat-icon secondary"><i class="fas fa-chalkboard-teacher"></i></div>
            <div class="stat-info"><h3>${stats.totalDoctors}</h3><p>Instructors</p></div></div>
          <div class="stat-card"><div class="stat-icon success"><i class="fas fa-book"></i></div>
            <div class="stat-info"><h3>${stats.totalCourses}</h3><p>Courses</p></div></div>
          <div class="stat-card"><div class="stat-icon warning"><i class="fas fa-clock"></i></div>
            <div class="stat-info"><h3>${stats.pendingRequests}</h3><p>Pending Requests</p></div></div>
        </div>

        <div class="grid grid-2 gap-lg">
          <div class="card">
            <div class="card-header"><h3 class="card-title"><i class="fas fa-bolt"></i> Quick Actions</h3></div>
            <div class="card-body">
              <div class="grid grid-2 gap-md">
                <button class="btn btn-primary btn-block" onclick="App.navigate('manage-students')"><i class="fas fa-users"></i> Manage Students</button>
                <button class="btn btn-secondary btn-block" onclick="App.navigate('manage-doctors')"><i class="fas fa-user-tie"></i> Manage Doctors</button>
                <button class="btn btn-secondary btn-block" onclick="App.navigate('manage-courses')"><i class="fas fa-book"></i> Manage Courses</button>
                <button class="btn btn-secondary btn-block" onclick="App.navigate('manage-requests')"><i class="fas fa-file-alt"></i> View Requests</button>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h3 class="card-title"><i class="fas fa-clock"></i> Pending Requests</h3></div>
            <div class="card-body">
              ${requests.slice(0, 3).map(r => `
                <div class="d-flex align-center justify-between p-md mb-sm" style="background:var(--bg-tertiary);border-radius:var(--radius-md);">
                  <div><p class="fw-500">${r.studentName}</p><small class="text-muted">${r.type}</small></div>
                  <div class="d-flex gap-sm">
                    <button class="btn btn-sm btn-success" onclick="AdminModule.approveRequest(${r.id})"><i class="fas fa-check"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="AdminModule.rejectRequest(${r.id})"><i class="fas fa-times"></i></button>
                  </div>
                </div>
              `).join('') || '<p class="text-muted text-center">No pending requests.</p>'}
            </div>
          </div>
        </div>
      </div>
    `;
    },

    renderManageStudents: function () {
        const students = DB.getAllStudents();
        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <h2>Manage Students</h2>
          <button class="btn btn-primary" onclick="AdminModule.showAddStudentModal()"><i class="fas fa-plus"></i> Add Student</button>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Level</th><th>GPA</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  ${students.map(s => `
                    <tr>
                      <td><strong>${s.studentId}</strong></td>
                      <td>${s.firstName} ${s.lastName}</td>
                      <td>${s.department}</td>
                      <td>Level ${s.level}</td>
                      <td><span class="badge badge-${s.gpa >= 3.5 ? 'success' : 'primary'}">${s.gpa.toFixed(2)}</span></td>
                      <td><span class="badge badge-success">${s.enrollmentStatus}</span></td>
                      <td>
                        <button class="btn btn-sm btn-icon btn-secondary"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-icon btn-danger"><i class="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-overlay" id="addStudentModal">
        <div class="modal">
          <div class="modal-header"><h3>Add New Student</h3><button class="modal-close" onclick="AdminModule.hideModal('addStudentModal')"><i class="fas fa-times"></i></button></div>
          <div class="modal-body">
            <div class="grid grid-2 gap-md">
              <div class="form-group"><label class="form-label">First Name</label><input type="text" class="form-control" id="newStudentFirst"></div>
              <div class="form-group"><label class="form-label">Last Name</label><input type="text" class="form-control" id="newStudentLast"></div>
            </div>
            <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-control" id="newStudentEmail"></div>
            <div class="grid grid-2 gap-md">
              <div class="form-group"><label class="form-label">Faculty</label><input type="text" class="form-control" value="Engineering"></div>
              <div class="form-group"><label class="form-label">Department</label><select class="form-control form-select"><option>Computer Science</option><option>Mathematics</option></select></div>
            </div>
          </div>
          <div class="modal-footer"><button class="btn btn-secondary" onclick="AdminModule.hideModal('addStudentModal')">Cancel</button><button class="btn btn-primary" onclick="AdminModule.addStudent()">Add Student</button></div>
        </div>
      </div>
    `;
    },

    renderManageDoctors: function () {
        const doctors = DB.getAllDoctors();
        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <h2>Manage Instructors</h2>
          <button class="btn btn-primary" onclick="AdminModule.showAddDoctorModal()"><i class="fas fa-plus"></i> Add Instructor</button>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Title</th><th>Specialization</th><th>Actions</th></tr></thead>
                <tbody>
                  ${doctors.map(d => `
                    <tr>
                      <td><strong>${d.doctorId}</strong></td>
                      <td>${d.firstName} ${d.lastName}</td>
                      <td>${d.department}</td>
                      <td>${d.title}</td>
                      <td>${d.specialization}</td>
                      <td>
                        <button class="btn btn-sm btn-icon btn-secondary"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-icon btn-danger"><i class="fas fa-trash"></i></button>
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

    renderManageCourses: function () {
        const courses = DB.getAllCourses();
        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <h2>Manage Courses</h2>
          <button class="btn btn-primary" onclick="AdminModule.showAddCourseModal()"><i class="fas fa-plus"></i> Add Course</button>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead><tr><th>Code</th><th>Name</th><th>Credits</th><th>Department</th><th>Instructor</th><th>Enrollment</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  ${courses.map(c => {
            const doctor = Database.users.find(u => u.id === c.doctorId);
            return `
                      <tr>
                        <td><strong>${c.code}</strong></td>
                        <td>${c.name}</td>
                        <td>${c.credits}</td>
                        <td>${c.department}</td>
                        <td>${doctor ? doctor.firstName : 'TBA'}</td>
                        <td>${c.currentEnrollment}/${c.maxCapacity}</td>
                        <td><span class="badge badge-${c.status === 'Active' ? 'success' : 'warning'}">${c.status}</span></td>
                        <td>
                          <button class="btn btn-sm btn-icon btn-secondary"><i class="fas fa-edit"></i></button>
                          <button class="btn btn-sm btn-icon btn-danger"><i class="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    `;
        }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
    },

    renderManageRequests: function () {
        const requests = DB.getAllRequests();
        return `
      <div class="content">
        <div class="d-flex justify-between align-center mb-xl">
          <h2>Student Requests</h2>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead><tr><th>ID</th><th>Student</th><th>Type</th><th>Description</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  ${requests.map(r => `
                    <tr>
                      <td>#REQ-${String(r.id).padStart(4, '0')}</td>
                      <td>${r.studentName}<br><small class="text-muted">${r.studentIdNum}</small></td>
                      <td><span class="badge badge-info">${r.type}</span></td>
                      <td style="max-width:200px;">${r.description}</td>
                      <td>${r.createdAt}</td>
                      <td><span class="badge badge-${r.status === 'Approved' ? 'success' : r.status === 'Rejected' ? 'danger' : 'warning'}">${r.status}</span></td>
                      <td>
                        ${r.status === 'Pending' ? `
                          <button class="btn btn-sm btn-success" onclick="AdminModule.approveRequest(${r.id})"><i class="fas fa-check"></i></button>
                          <button class="btn btn-sm btn-danger" onclick="AdminModule.rejectRequest(${r.id})"><i class="fas fa-times"></i></button>
                        ` : '-'}
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

    showAddStudentModal: function () { document.getElementById('addStudentModal').classList.add('active'); },
    showAddDoctorModal: function () { App.showToast('Add doctor modal coming soon', 'info'); },
    showAddCourseModal: function () { App.showToast('Add course modal coming soon', 'info'); },
    hideModal: function (id) { document.getElementById(id).classList.remove('active'); },

    addStudent: function () {
        App.showToast('Student added successfully!', 'success');
        this.hideModal('addStudentModal');
        App.navigate('manage-students');
    },

    approveRequest: function (id) {
        DB.updateRequestStatus(id, 'Approved', 'Approved by admin.');
        App.showToast('Request approved!', 'success');
        App.navigate(App.currentView);
    },

    rejectRequest: function (id) {
        DB.updateRequestStatus(id, 'Rejected', 'Rejected by admin.');
        App.showToast('Request rejected.', 'warning');
        App.navigate(App.currentView);
    }
};

window.AdminModule = AdminModule;
