import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Form from './components/Form';
import './App.css';
import Tables from './components/Table';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdate, setPersonalInfo } from './store/index';
import { v4 as uuid } from 'uuid';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);
  const updateReq = useSelector((state) => state.isUpdate);
  const personalInfo = useSelector((state) => state.personalInfo);

  const dispatch = useDispatch();

  // Handles the form data on adding the record
  const handleSubmit = (name, empId, role, location) => {
    if (!updateReq) {
      const uniqueId = uuid().slice(0, 8);
      socket.emit('add-record', { name, empId, role, location, uniqueId });
      setData((prev) => [...prev, { name, empId, role, location, uniqueId }]);

      // Sending data to backend
      fetch('https://xarwin-server.herokuapp.com/addRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, empId, role, location, uniqueId }),
      });
    } else if (updateReq) {
      const id = personalInfo.uniqueId;
      const updatedData = data.map((i) => {
        if (i.uniqueId === id) {
          i.name = name;
          i.empId = empId;
          i.role = role;
          i.location = location;
        }
        return i;
      });
      socket.emit('rec-updated', updatedData);
      dispatch(setUpdate(false));
      fetch('https://xarwin-server.herokuapp.com/updateRecord', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, empId, role, location, id }),
      });
    }
  };

  // Handle the update flow
  const handleUpdate = (name, empId, role, location, uniqueId) => {
    dispatch(setUpdate(true));
    dispatch(setPersonalInfo({ name, empId, role, location, uniqueId }));
  };

  // Delete function
  const handleDelete = (id) => {
    const updatedData = data.filter((i) => i.uniqueId !== id);
    setData(updatedData);
    socket.emit('rec-deleted', updatedData);
    fetch('https://xarwin-server.herokuapp.com/deleteRecord', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  };

  useEffect(() => {
    setSocket(io('https://xarwin-server.herokuapp.com/'));
    const updateDataFromDb = async () => {
      const dataReq = await fetch(
        'https://xarwin-server.herokuapp.com/getRecord'
      );
      const data = await dataReq.json();
      setData(data);
    };
    updateDataFromDb();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('add-response', (serverData) => {
      setData((prev) => [...prev, serverData]);
    });
    socket.on('updated-rec', (data) => {
      setData(data);
    });
    socket.on('deleted-rec', (data) => {
      setData(data);
    });
  }, [socket]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'cursive' }}>
        Record System
      </h1>
      <Form handleSubmit={handleSubmit} />
      {data.length > 0 ? (
        <Tables
          data={data}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="no-data-pic">
          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=2000"
            alt="No Data img"
            width={400}
          />
        </div>
      )}
    </div>
  );
};

export default App;
