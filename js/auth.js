// ========================================
// University SIS - Authentication Module
// ========================================

const Auth = {
    // Current user session
    currentUser: null,

    // Initialize auth from localStorage
    init: function () {
        const savedUser = localStorage.getItem('sis_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            return true;
        }
        return false;
    },

    // Login
    login: function (email, password) {
        const user = DB.getUserByEmail(email);

        if (!user) {
            return { success: false, message: 'User not found. Please check your email.' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Incorrect password. Please try again.' };
        }

        // Get extended info based on role
        let extendedInfo = {};
        if (user.role === 'student') {
            extendedInfo = DB.getStudentInfo(user.id) || {};
        } else if (user.role === 'doctor') {
            extendedInfo = DB.getDoctorInfo(user.id) || {};
        }

        // Create session
        this.currentUser = { ...user, ...extendedInfo };
        delete this.currentUser.password; // Don't store password in session

        // Save to localStorage
        localStorage.setItem('sis_user', JSON.stringify(this.currentUser));

        return { success: true, user: this.currentUser };
    },

    // Logout
    logout: function () {
        this.currentUser = null;
        localStorage.removeItem('sis_user');
    },

    // Check if logged in
    isLoggedIn: function () {
        return this.currentUser !== null;
    },

    // Get current user
    getUser: function () {
        return this.currentUser;
    },

    // Get user role
    getRole: function () {
        return this.currentUser ? this.currentUser.role : null;
    },

    // Check if user has role
    hasRole: function (role) {
        return this.currentUser && this.currentUser.role === role;
    },

    // Get user initials
    getInitials: function () {
        if (!this.currentUser) return '??';
        const first = this.currentUser.firstName ? this.currentUser.firstName[0] : '';
        const last = this.currentUser.lastName ? this.currentUser.lastName[0] : '';
        return (first + last).toUpperCase();
    },

    // Get full name
    getFullName: function () {
        if (!this.currentUser) return 'Guest';
        return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    },

    // Update password (demo)
    updatePassword: function (currentPassword, newPassword) {
        if (!this.currentUser) {
            return { success: false, message: 'Not logged in' };
        }

        const user = DB.getUserById(this.currentUser.id);
        if (user.password !== currentPassword) {
            return { success: false, message: 'Current password is incorrect' };
        }

        user.password = newPassword;
        return { success: true, message: 'Password updated successfully' };
    }
};

// Export
window.Auth = Auth;
