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
import { selectAllFiles, addFiles } from "./store/fileSlice";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  addFileBar: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(2),
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
  const [searchText, setSearchText] = React.useState("");

  let files = useSelector(selectAllFiles);

  if (!files) {
    files = [];
  }

  const fileSearchFilter = (file) => {
    return file.fileName.toLowerCase().includes(searchText.toLowerCase());
  };

  const tagSearchFilter = (file) => {
    const matchingTags = file.tags.filter((tag) => {
      return tag.toLowerCase().includes(searchText.toLowerCase());
    });
    return matchingTags.length > 0;
  };

  const contentSearchFilter = (file) => {
    return file.info.toLowerCase().includes(searchText.toLowerCase());
  };

  const searchTypeToFilterMap = {
    Files: fileSearchFilter,
    Tags: tagSearchFilter,
    Content: contentSearchFilter,
  };

  const renderFilesBasedOnSearch = () => {
    const filteredFiles = files.filter(searchTypeToFilterMap[searchType]);
    return filteredFiles.map((file) => {
      return (
        <ListItem
          key={file.key}
          component={Link}
          to={"/files/" + file.key}
          button
        >
          <ListItemText primary={file.fileName} />
        </ListItem>
      );
    });
  };

  const getIndicesOf = (searchStr, str, caseSensitive) => {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    var startIndex = 0,
      index,
      indices = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  };

  const renderMatchesBasedOnSearch = () => {
    const matches = [];
    files.forEach((file) => {
      const matchesInFile = [];
      const matchingIndices = getIndicesOf(searchText, file.info);
      matchingIndices.forEach((matchingIndex) => {
        const startIndex = Math.max(matchingIndex - 50, 0);
        matchesInFile.push(file.info.substr(startIndex, 100));
      });
      matchesInFile.forEach((match) => {
        matches.push({
          fileKey: file.key,
          fileName: file.fileName,
          matchString: match,
        });
      });
    });
    return matches.map((match, index) => {
      return (
        <ListItem
          key={match.fileKey + index}
          component={Link}
          to={"/files/" + match.fileKey}
          button
        >
          <ListItemText primary={match.fileName} />
          <ListItemText primary={match.matchString} />
        </ListItem>
      );
    });
  };

  const getRenderedResults = () => {
    if (searchType === "Files" || searchType === "Tags") {
      return renderFilesBasedOnSearch();
    }
    if (searchType === "Content") {
      return renderMatchesBasedOnSearch();
    }
  };

  const renderedResults = getRenderedResults();
  renderedResults.map((file) => {
    return (
      <ListItem
        key={file.key}
        component={Link}
        to={"/files/" + file.key}
        button
      >
        <ListItemText primary={file.fileName} />
      </ListItem>
    );
  });

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    console.log("handling search text change ", event.target.value);
    setSearchText(event.target.value);
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
        dispatch(addFiles(updatedFilesList));
        setNewFileName("");
      });
  };

  return (
    <React.Fragment>
      <div className={classes.searchBar}>
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
          {renderedResults}
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
