import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllFiles,
  selectUserToken,
  addFiles,
  updateActionStatus,
} from "./store/fileSlice";
import axios from "axios";
import { getRenderedResults } from "./search/search-utils";

const useStyles = makeStyles((theme) => ({
  addFileBar: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(2),
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: theme.spacing(2),
  },
  searchInput: {
    flexGrow: "3",
  },
  searchIcon: {
    flexGrow: "1",
  },
  category: {
    flexGrow: "4",
  },
  filesList: {
    // marginTop: theme.spacing(2),
    margin: theme.spacing(1)
  },
}));

function StartPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newFileName, setNewFileName] = React.useState("");
  const [searchType, setSearchType] = React.useState("Files");
  const [searchText, setSearchText] = React.useState("");

  let files = useSelector(selectAllFiles);
  const userToken = useSelector(selectUserToken);

  if (!files) {
    files = [];
  }

  const renderedResults = getRenderedResults(files, searchType, searchText);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAddFile = () => {
    if (!newFileName.replace(/\s/g, '').length) {
      dispatch(updateActionStatus({
        status: "error",
        statusMessage: "File name cannot be all blanks"
      }));
      return;
    }
    dispatch(
      updateActionStatus({
        status: "pending",
        statusMessage: "Creating File...",
      })
    );
    axios
      .post(
        "https://lyjcnc.deta.dev/files/",
        {
          fileName: newFileName,
          userEmail: "",
          info: "",
          tags: [],
          tasks: [],
        },
        {
          headers: {
            "cognito-auth": userToken,
          },
        }
      )
      .then((response) => {
        const updatedFilesList = [...files, response.data];
        dispatch(
          updateActionStatus({
            status: "success",
            statusMessage: "File Created",
          })
        );
        dispatch(addFiles(updatedFilesList));
        setNewFileName("");
      })
      .catch((error) => {
        dispatch(
          updateActionStatus({
            status: "error",
            statusMessage: "Error Creating File",
          })
        );
      });
  };

  return (
    <React.Fragment>
      <div className={classes.searchBar}>
        <Select
          labelId="searchTypeSelect"
          id="searchTypeSelect"
          value={searchType}
          onChange={handleSearchTypeChange}
          className={classes.category}
        >
          <MenuItem value={"Files"}>Files</MenuItem>
          <MenuItem value={"Tags"}>Tags</MenuItem>
          <MenuItem value={"Tasks"}>Tasks</MenuItem>
          <MenuItem value={"Content"}>Content</MenuItem>
          <MenuItem value={"Any"}>Any</MenuItem>
        </Select>
        <TextField
          value={searchText}
          onChange={handleSearchTextChange}
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
      </div>
      <div className={classes.addFileBar}>
        <TextField
          spellCheck="false"
          fullWidth={true}
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
          {renderedResults}
        </List>
      </div>
    </React.Fragment>
  );
}
export default StartPage;
