import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      history.push('/login');
    } else {
      axios.get('http://localhost:5000/employees')
        .then(response => {
          setEmployees(response.data);
        });
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div>
      <h2>Welcome to the Admin Panel</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Employee List</h3>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            {employee.name} - {employee.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
