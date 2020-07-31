import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import { selectTagOptions, selectCurrentFile, updateFile } from "./store/fileSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tag() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const currentFile = useSelector(selectCurrentFile);
  const tagOptions = useSelector(selectTagOptions);

  const handleTagChange = (event, newValue) => {
    const updatedFile = {...currentFile, tags: newValue};
    dispatch(updateFile(updatedFile));
  }

  const handleTagSelectorBlur = (event) => {

  }

  return (
    <>
      <div className={classes.root}>
        <Autocomplete
          onBlur={handleTagSelectorBlur}
          multiple
          autoSelect="true"
          id="tags-standard"
          options={tagOptions}
          freeSolo="true"
          filterSelectedOptions
          value={currentFile?.tags ?? []}
          onChange={handleTagChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Tags"
              placeholder="File Tags"
            />
          )}
        />
      </div>
    </>
  );
}
