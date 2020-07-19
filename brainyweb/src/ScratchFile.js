import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  fileHeader: {
    display: "flex",
    flexDirection: "row",
  },
  fileName: {
    flexGrow: "1",
  },
  tags: {
    flexGrow: "3",
  },
}));

function ScatchFile() {
  const classes = useStyles();

  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <div className={classes.fileHeader}>
        <div className={classes.fileName}>
          <Typography variant="h5">Scratch File</Typography>
        </div>
        <div className={classes.tags}>
          <Typography variant="h6">Tags: scratchfile</Typography>
        </div>
        <div>
          <Button color="default">
            Actions
          </Button>
        </div>
        <div>
          <Button color="primary">
            Save
          </Button>
        </div>
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
          spellCheck="false"
            fullWidth="true"
            rows="30"
            id="standard-multiline-flexible"
            multiline
            value={value}
            onChange={handleChange}
          />
        </div>
      </form>
    </React.Fragment>
  );
}
export default ScatchFile;
