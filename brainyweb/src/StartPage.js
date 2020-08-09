import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import NativeSelect from "@material-ui/core/NativeSelect";
import {
  selectAllFiles,
  selectUserToken,
  addFiles,
  updateActionStatus,
} from "./store/fileSlice";
import axios from "axios";
import { getRenderedResults } from "./search/search-utils";
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    // "&:focus": {
    //   borderRadius: 4,
    //   borderColor: "#80bdff",
    //   boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    // },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  addFileBar: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  addFileInput: {
    border: "1px solid #becad6",
    paddingLeft: "10px",
    paddingTop: "3px",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: theme.spacing(2),
  },
  searchInput: {
    border: "1px solid #becad6",
    paddingLeft: "10px",
    flexGrow: "3",
    marginRight: "10px",
    paddingTop: "3px",
  },
  searchIcon: {
    paddingTop: "5px",
    flexGrow: "1",
  },
  category: {
    flexGrow: "2",
    marginRight: "10px",
  },
  filesList: {
    // marginTop: theme.spacing(2),
    margin: theme.spacing(1),
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
    if (!newFileName.replace(/\s/g, "").length) {
      dispatch(
        updateActionStatus({
          status: "error",
          statusMessage: "File name cannot be all blanks",
        })
      );
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
            "google-auth-token": userToken,
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

  const signedInUser = useSelector(selectUserToken);

  if (!signedInUser) {
    return <Typography>Sign In to get started</Typography>;
  }

  return (
    <React.Fragment>
      <div className={classes.searchBar}>
        <NativeSelect
          labelId="searchTypeSelect"
          id="searchTypeSelect"
          value={searchType}
          onChange={handleSearchTypeChange}
          input={<BootstrapInput />}
          className={classes.category}
        >
          <option value={"Files"}>Files</option>
          <option value={"Tags"}>Tags</option>
          <option value={"Tasks"}>Tasks</option>
          <option value={"Content"}>Content</option>
          <option value={"Any"}>Any</option>
        </NativeSelect>
        <TextField
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search…"
          className={classes.searchInput}
          InputProps={{ disableUnderline: true }}
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
          className={classes.addFileInput}
          spellCheck="false"
          fullWidth={true}
          placeholder="Create note"
          value={newFileName}
          InputProps={{ disableUnderline: true }}
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
