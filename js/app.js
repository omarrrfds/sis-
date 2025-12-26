// ========================================
// University SIS - Main Application
// ========================================

const App = {
    currentView: 'dashboard',

    init: function () {
        if (Auth.init()) {
            this.showApp();
        } else {
            this.showLogin();
        }
    },

    showLogin: function () {
        document.getElementById('app').innerHTML = `
      <div class="login-page">
        <div class="login-container">
          <div class="login-logo">
            <i class="fas fa-university"></i>
            <h1>University SIS</h1>
            <p>Student Information System</p>
          </div>
          <form onsubmit="App.handleLogin(event)">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <div class="input-group">
                <i class="fas fa-envelope"></i>
                <input type="email" class="form-control" id="loginEmail" placeholder="Enter your email" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <div class="input-group">
                <i class="fas fa-lock"></i>
                <input type="password" class="form-control" id="loginPassword" placeholder="Enter your password" required>
                <span class="toggle-password" onclick="App.togglePassword()"><i class="fas fa-eye"></i></span>
              </div>
            </div>
            <div class="d-flex justify-between align-center mb-lg">
              <label class="form-check"><input type="checkbox"> Remember me</label>
              <a href="#" class="text-primary">Forgot password?</a>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
          </form>
          <div class="mt-xl text-center">
            <p class="text-muted mb-md">Demo Accounts:</p>
            <div class="d-flex gap-sm justify-center flex-wrap">
              <button class="btn btn-sm btn-secondary" onclick="App.demoLogin('student@uni.edu')">Student</button>
              <button class="btn btn-sm btn-secondary" onclick="App.demoLogin('doctor@uni.edu')">Doctor</button>
              <button class="btn btn-sm btn-secondary" onclick="App.demoLogin('admin@uni.edu')">Admin</button>
            </div>
          </div>
        </div>
      </div>
    `;
    },

    handleLogin: function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const result = Auth.login(email, password);
        if (result.success) {
            this.showToast('Welcome back!', 'success');
            this.showApp();
        } else {
            this.showToast(result.message, 'error');
        }
    },

    demoLogin: function (email) {
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').value = 'password123';
    },

    togglePassword: function () {
        const input = document.getElementById('loginPassword');
        input.type = input.type === 'password' ? 'text' : 'password';
    },

    showApp: function () {
        const user = Auth.getUser();
        document.getElementById('app').innerHTML = `
      <div class="app-layout">
        ${this.renderSidebar()}
        <div class="main-content">
          ${this.renderHeader()}
          <div id="content"></div>
        </div>
      </div>
      <div class="toast-container" id="toastContainer"></div>
    `;
        this.navigate('dashboard');
    },

    renderSidebar: function () {
        const user = Auth.getUser();
        const role = Auth.getRole();

        const menus = {
            student: [
                {
                    section: 'Main', items: [
                        { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
                        { id: 'registration', icon: 'fas fa-plus-circle', label: 'Registration' },
                        { id: 'grades', icon: 'fas fa-clipboard-list', label: 'Grades' },
                        { id: 'timetable', icon: 'fas fa-calendar-alt', label: 'Timetable' },
                    ]
                },
                {
                    section: 'Services', items: [
                        { id: 'requests', icon: 'fas fa-file-alt', label: 'Requests' },
                        { id: 'profile', icon: 'fas fa-user', label: 'Profile' },
                    ]
                }
            ],
            doctor: [
                {
                    section: 'Main', items: [
                        { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
                        { id: 'students', icon: 'fas fa-users', label: 'My Students' },
                        { id: 'grades-entry', icon: 'fas fa-edit', label: 'Grade Entry' },
                        { id: 'attendance', icon: 'fas fa-clipboard-list', label: 'Attendance' },
                        { id: 'materials', icon: 'fas fa-folder', label: 'Materials' },
                    ]
                }
            ],
            admin: [
                {
                    section: 'Main', items: [
                        { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
                        { id: 'manage-students', icon: 'fas fa-user-graduate', label: 'Students' },
                        { id: 'manage-doctors', icon: 'fas fa-chalkboard-teacher', label: 'Instructors' },
                        { id: 'manage-courses', icon: 'fas fa-book', label: 'Courses' },
                        { id: 'manage-requests', icon: 'fas fa-file-alt', label: 'Requests' },
                    ]
                }
            ]
        };

        return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo"><i class="fas fa-university"></i></div>
          <div class="sidebar-brand"><h2>University SIS</h2><span>${role.charAt(0).toUpperCase() + role.slice(1)} Portal</span></div>
        </div>
        <nav class="sidebar-nav">
          ${menus[role].map(section => `
            <div class="nav-section">
              <div class="nav-section-title">${section.section}</div>
              ${section.items.map(item => `
                <div class="nav-item ${this.currentView === item.id ? 'active' : ''}" onclick="App.navigate('${item.id}')">
                  <i class="${item.icon}"></i><span>${item.label}</span>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </nav>
        <div class="sidebar-footer">
          <div class="user-info">
            <div class="user-avatar">${Auth.getInitials()}</div>
            <div class="user-details"><h4>${Auth.getFullName()}</h4><span>${role.charAt(0).toUpperCase() + role.slice(1)}</span></div>
          </div>
        </div>
      </aside>
    `;
    },

    renderHeader: function () {
        return `
      <header class="header">
        <div class="header-left">
          <button class="menu-toggle" onclick="App.toggleSidebar()"><i class="fas fa-bars"></i></button>
          <div class="page-title"><h1 id="pageTitle">Dashboard</h1></div>
        </div>
        <div class="header-right">
          <div class="header-search"><i class="fas fa-search"></i><input type="text" placeholder="Search..."></div>
          <div class="header-actions">
            <button class="header-btn"><i class="fas fa-bell"></i><span class="notification-dot"></span></button>
            <button class="header-btn" onclick="App.toggleTheme()"><i class="fas fa-moon"></i></button>
            <button class="header-btn" onclick="App.logout()"><i class="fas fa-sign-out-alt"></i></button>
          </div>
        </div>
      </header>
    `;
    },

    navigate: function (view, param) {
        this.currentView = view;
        const role = Auth.getRole();
        let content = '';
        let title = 'Dashboard';

        if (role === 'student') {
            switch (view) {
                case 'dashboard': content = StudentModule.renderDashboard(); title = 'Dashboard'; break;
                case 'registration': content = StudentModule.renderRegistration(); title = 'Course Registration'; break;
                case 'grades': content = StudentModule.renderGrades(); title = 'Grades & Transcript'; break;
                case 'timetable': content = StudentModule.renderTimetable(); title = 'My Timetable'; break;
                case 'requests': content = StudentModule.renderRequests(); title = 'Academic Services'; break;
                case 'profile': content = StudentModule.renderProfile(); title = 'My Profile'; break;
            }
        } else if (role === 'doctor') {
            switch (view) {
                case 'dashboard': content = DoctorModule.renderDashboard(); title = 'Dashboard'; break;
                case 'course-view': content = DoctorModule.renderCourseView(param); title = 'Course Details'; break;
                case 'grades-entry': content = DoctorModule.renderGradesEntry(param); title = 'Grade Entry'; break;
                case 'attendance': content = DoctorModule.renderAttendance(param); title = 'Attendance'; break;
                case 'materials': content = DoctorModule.renderMaterials(); title = 'Course Materials'; break;
                case 'students': content = DoctorModule.renderStudents(); title = 'My Students'; break;
            }
        } else if (role === 'admin') {
            switch (view) {
                case 'dashboard': content = AdminModule.renderDashboard(); title = 'Dashboard'; break;
                case 'manage-students': content = AdminModule.renderManageStudents(); title = 'Manage Students'; break;
                case 'manage-doctors': content = AdminModule.renderManageDoctors(); title = 'Manage Instructors'; break;
                case 'manage-courses': content = AdminModule.renderManageCourses(); title = 'Manage Courses'; break;
                case 'manage-requests': content = AdminModule.renderManageRequests(); title = 'Student Requests'; break;
            }
        }

        document.getElementById('content').innerHTML = content;
        document.getElementById('pageTitle').textContent = title;

        // Update sidebar
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.nav-item[onclick*="${view}"]`)?.classList.add('active');
    },

    toggleSidebar: function () {
        document.getElementById('sidebar').classList.toggle('active');
    },

    toggleTheme: function () {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
    },

    logout: function () {
        Auth.logout();
        this.showLogin();
        this.showToast('Logged out successfully.', 'success');
    },

    showToast: function (message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
      <div class="toast-icon"><i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i></div>
      <div class="toast-content"><p>${message}</p></div>
    `;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
