import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const Form = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');

  const updateReq = useSelector((state) => state.isUpdate);
  const personalInfo = useSelector((state) => state.personalInfo);

  const handleClick = () => {
    handleSubmit(name, empId, role, location);
    setEmpId('');
    setName('');
    setRole('');
    setLocation('');
  };

  useEffect(() => {
    if (updateReq) {
      setName(personalInfo.name);
      setEmpId(personalInfo.empId);
      setLocation(personalInfo.location);
      setRole(personalInfo.role);
    }
    // eslint-disable-next-line
  }, [updateReq]);

  return (
    <div className="form-div">
      <div>
        <TextField
          className="text-field"
          label="Name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: '0.5em' }}
        />
        <TextField
          className="text-field"
          label="Employee ID"
          variant="standard"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          style={{ margin: '0.5em' }}
        />
      </div>
      <div>
        <TextField
          className="text-field"
          label="Role"
          variant="standard"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ margin: '0.5em' }}
        />
        <TextField
          className="text-field"
          label="Location"
          variant="standard"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ margin: '0.5em' }}
        />
      </div>
      <div>
        <Button
          style={{ margin: '3em' }}
          variant="contained"
          color={updateReq ? 'success' : 'primary'}
          onClick={() => handleClick()}
        >
          {updateReq ? 'Update' : 'Add'}
        </Button>
      </div>
    </div>
  );
};

export default Form;
