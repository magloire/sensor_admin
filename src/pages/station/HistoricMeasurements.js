import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteAlert from "./DeleteAlert";
import LocationContext from "../../LocationContext";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function HistoricMeasurements({
  measurements,
  handleEdit,
  handleDelete,
}) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [measurementId, setMeasurementId] = useState(-1);
  const context = useContext(LocationContext);

  const onDeleteBtnClick = (id) => {
    setMeasurementId(id);
    setDialogOpen(true);
  };

  const deleteRow = (id) => {
    handleDelete(id);
  };

  return (
    <>
      <DeleteAlert
        measurementId={measurementId}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onOkDelete={deleteRow}
      />
      <Typography gutterBottom variant='h5' component='h2'>
        Tidligere pejlinger
      </Typography>
      <TableContainer>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Dato</TableCell>
              <TableCell align='right'>Pejling</TableCell>
              <TableCell align='right'>Anvendelse</TableCell>
              <TableCell align='right'>Kommentar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {measurements.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {row.properties.timeofmeas}
                </TableCell>
                <TableCell align='right'>
                  {row.properties.disttowatertable_m}
                </TableCell>
                <TableCell align='right'>
                  {row.properties.useforcorrection}
                </TableCell>
                <TableCell align='right'>{row.properties.comment}</TableCell>
                <TableCell align='right'>
                  <Button onClick={() => handleEdit(row.properties)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align='right'>
                  <Button
                    onClick={() => {
                      onDeleteBtnClick(row.properties.gid);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
