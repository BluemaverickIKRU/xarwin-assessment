import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export default function Tables({ data, handleUpdate, handleDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: '600' }} align="center">
              Name
            </TableCell>
            <TableCell style={{ fontWeight: '600' }} align="center">
              Employee ID
            </TableCell>
            <TableCell style={{ fontWeight: '600' }} align="center">
              Role
            </TableCell>
            <TableCell style={{ fontWeight: '600' }} align="center">
              Location
            </TableCell>
            <TableCell style={{ fontWeight: '600' }} align="center">
              Options
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.empId}</TableCell>
              <TableCell align="center">{row.role}</TableCell>

              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title="Edit" disableInteractive>
                    <div
                      onClick={() =>
                        handleUpdate(
                          row.name,
                          row.empId,
                          row.role,
                          row.location,
                          row.uniqueId
                        )
                      }
                    >
                      <EditIcon
                        style={{ margin: '0 10px', cursor: 'pointer' }}
                        fontSize="small"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Delete" disableInteractive>
                    <div onClick={() => handleDelete(row.uniqueId)}>
                      <DeleteIcon
                        style={{ margin: '0 10px', cursor: 'pointer' }}
                        fontSize="small"
                      />
                    </div>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
