import React, { useState, useEffect } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for HTTP requests
import { FaPen, FaTrashAlt, FaTimes } from 'react-icons/fa'; // Import icons from react-icons

const Student = () => {
    const [students, setStudents] = useState([]); // State for students
    const [name, setName] = useState(''); // State for name
    const [className, setClassName] = useState(''); // State for class
    const [npm, setNpm] = useState(''); // State for npm
    const [editingId, setEditingId] = useState(null); // State for editing student ID
    const [error, setError] = useState(''); // State for error messages
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [loading, setLoading] = useState(false); // State for loading status
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [studentsPerPage] = useState(5); // Number of students per page
    const [notification, setNotification] = useState(null); // State for notification

    // Fetch students on component mount
    useEffect(() => {
        fetchStudents();
    }, []);

    // Fetch all students
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:3001/api/students', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStudents(response.data.students);
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    // Show notification
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000); // Hide notification after 5 seconds
    };

    // Close notification manually
    const closeNotification = () => {
        setNotification(null);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            const currentDate = new Date().toISOString(); // Get current date and time

            if (editingId) {
                // Update student
                await axios.put(`http://localhost:3001/api/students/${editingId}`, {
                    name,
                    class: className,
                    enrollmentDate: currentDate, // Update enrollment date
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                showNotification('success', 'Student updated successfully!');
            } else {
                // Add new student
                await axios.post('http://localhost:3001/api/students', {
                    npm,
                    name,
                    class: className,
                    enrollmentDate: currentDate, // Set enrollment date
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                showNotification('success', 'Student added successfully!');
            }
            fetchStudents();
            resetForm();
            setShowModal(false); // Close modal after submission
        } catch (error) {
            console.error('Error saving student:', error);
            setError('Failed to save student');
            showNotification('error', 'Failed to save student');
        } finally {
            setLoading(false);
        }
    };

    // Reset form fields
    const resetForm = () => {
        setName('');
        setClassName('');
        setNpm('');
        setEditingId(null);
    };

    // Open modal for adding or editing student
    const openModal = (student = null) => {
        if (student) {
            setName(student.name);
            setClassName(student.class);
            setNpm(student.npm);
            setEditingId(student.id);
        } else {
            resetForm();
        }
        setShowModal(true);
    };

    // Delete student
    const deleteStudent = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
        if (confirmDelete) {
            setLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                await axios.delete(`http://localhost:3001/api/students/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                showNotification('success', 'Student deleted successfully!');
                fetchStudents(); // Refresh the student list
            } catch (error) {
                console.error('Error deleting student:', error);
                setError('Failed to delete student');
            } finally {
                setLoading(false);
            }
        }
    };

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.npm.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {/* Notification Banner */}
            {notification && (
                <div
                    className={`p-4 mb-4 rounded-lg ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} relative`}
                >
                    <span>{notification.message}</span>
                    <button
                        onClick={closeNotification}
                        className="absolute top-2 right-2 text-white"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            <button onClick={() => openModal()} className="bg-indigo-500 text-white rounded px-4 py-2 mb-4">
                Tambah Data
            </button>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by NPM or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Handle search input change
                className="border border-gray-300 rounded p-2 mb-4 w-full"
            />

            {/* Student Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold">{editingId ? 'Edit mahasiswa' : 'Tambah mahasiswa'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="NPM"
                                value={npm}
                                onChange={(e) => setNpm(e.target.value)} // Handle NPM input change
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} // Handle name input change
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Class"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)} // Handle class input change
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                required
                            />
                            <div className="mt-4 flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                                    {editingId ? 'Update' : 'Add'}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="bg-red-500 text-white rounded px-4 py-2 ml-2">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Render the list of students in a table */}
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
                <thead className="bg-indigo-500 text-white text-center">
                    <tr>
                        <th className="border border-gray-300 p-2">No</th>
                        <th className="border border-gray-300 p-2">NPM</th>
                        <th className="border border-gray-300 p-2">Nama</th>
                        <th className="border border-gray-300 p-2">Kelas</th>
                        <th className="border border-gray-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map((student, index) => (
                        <tr key={student.id} className="text-center">
                            <td className="border border-gray-300 p-2">{index + 1 + (currentPage - 1) * studentsPerPage}</td>
                            <td className="border border-gray-300 p-2">{student.npm}</td>
                            <td className="border border-gray-300 p-2">{student.name}</td>
                            <td className="border border-gray-300 p-2">{student.class}</td>
                            <td className="border border-gray-300 justify-center p-2 flex space-x-2">
                                <button onClick={() => openModal(student)} className="bg-blue-500 text-white rounded-full p-2 transform transition-transform hover:scale-110">
                                    <FaPen className="text-white" />
                                </button>
                                <button onClick={() => deleteStudent(student.id)} className="bg-red-500 text-white rounded-full p-2 transform transition-transform hover:scale-110">
                                    <FaTrashAlt className="text-white" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between">
                <span>Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} entries</span>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="bg-gray-300 rounded px-4 py-2"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`p-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 rounded px-4 py-2"
                    >
                        Next
                    </button>
                </div>
            </div>

            {loading && <p>Loading students...</p>} {/* Display loading message */}
            {error && <p className="text-red-500">{error}</p>} {/* Display error message if it exists */}
        </div>
    );
};

export default Student;