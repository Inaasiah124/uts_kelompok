// frontend/src/pages/StudentPage.js
import React from 'react';
import Layout from '../components/layout/Layouts'; // Import Layout
import Student from '../components/Student'; // Import Student component

const StudentPage = ({ onLogout }) => {
    return (
        <Layout onLogout={onLogout}>
            <Student /> {/* Render the Student component */}
        </Layout>
    );
};

export default StudentPage;