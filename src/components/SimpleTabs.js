import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";
import MapIcon from "@material-ui/icons/Map";
import TableChart from "@material-ui/icons/TableChart";
import TabPanel from "./TabPanel";
import Map from "../Map";
import Table from "../Table";
import DevExTable from "../DevExTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const KortIcon = (
    <Tooltip title='Kort'>
      <MapIcon />
    </Tooltip>
  );

  const TableIcon = (
    <Tooltip title='Tabel'>
      <TableChart />
    </Tooltip>
  );

  return (
    <div>
      <AppBar position='static' style={{ backgroundColor: "lightseagreen" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          aria-label='simple tabs example'
        >
          <Tab icon={TableIcon} />
          <Tab icon={KortIcon} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DevExTable {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Map data={props.sensors} />
      </TabPanel>
    </div>
  );
}
