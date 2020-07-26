import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllFiles,
  selectFileStatus,
  addFiles,
  fetchFiles,
} from "./store/fileSlice";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  addFileBar: {
    display: "flex",
    flexDirection: "row",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: theme.spacing(2),
  },
  searchInput: {
    flexGrow: "4",
  },
  searchIcon: {
    flexGrow: "1",
  },
  category: {
    flexGrow: "4",
  },
  filesList: {
    marginTop: theme.spacing(4),
  },
}));

function StartPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newFileName, setNewFileName] = React.useState("");

  const [searchType, setSearchType] = React.useState("Files");
  let files = useSelector(selectAllFiles);
  // const files = React.useState({ fileName: "hello", key: "123" });

  // const filesStatus = useSelector(selectFileStatus);

  if (!files) {
    files = [];
  }
  console.log("files are" + files);
  // files = [];
  const renderedFiles = files.map((file) => (
    <ListItem key={file.key} component={Link} to={"/files/" + file.key} button>
      <ListItemText primary={file.fileName} />
    </ListItem>
  ));

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleAddFile = (event) => {
    axios
      .post("https://lyjcnc.deta.dev/files/", {
        fileName: newFileName,
        info: "",
        tags: [],
        tasks: [],
        userId: "123",
      })
      .then((response) => {
        const updatedFilesList = [...files, response.data];
        dispatch(addFiles(updatedFilesList))
        setNewFileName("");
      });
  };

  return (
    <React.Fragment>
      <div className={classes.searchBar}>
        <InputBase
          placeholder="Search…"
          className={classes.searchInput}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchType}
          onChange={handleChange}
          className={classes.category}
        >
          <MenuItem value={"Files"}>Files</MenuItem>
          <MenuItem value={"Tags"}>Tags</MenuItem>
          <MenuItem value={"Tasks"}>Tasks</MenuItem>
          <MenuItem value={"Content"}>Content</MenuItem>
          <MenuItem value={"Any"}>Any</MenuItem>
        </Select>
      </div>
      <div className={classes.addFileBar}>
        <TextField
          spellCheck="false"
          fullWidth={true}
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          placeholder="Add File"
          value={newFileName}
          onChange={(event) => setNewFileName(event.target.value)}
        />
        <Button onClick={handleAddFile}>
          <AddCircleIcon />
        </Button>
      </div>
      <div className={classes.filesList}>
        <List component="nav" aria-label="files list">
          {renderedFiles}
          {/* <ListItem component={Link} to={"/scratchFile"} button>
            <ListItemText primary="Scratch" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Machine Learning" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="React" />
          </ListItem> */}
        </List>
      </div>
    </React.Fragment>
  );
}
export default StartPage;
