import React from "react";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fileViewTabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
export default TabPanel;

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const tabProp = (index) => {
  return {
    id: `fileTab-${index}`,
    "aria-controls": `file-tabpanel-${index}`,
  };
};

