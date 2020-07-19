import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

  const [searchType, setSearchType] = React.useState("Files");

  const handleChange = (event) => {
    setSearchType(event.target.value);
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
      <div className={classes.filesList}>
        <List component="nav" aria-label="files list">
            <ListItem 
            component={Link}
            to={"/scratchFile"}
            button>
              <ListItemText primary="Scratch" />
            </ListItem>
          <ListItem button>
            <ListItemText primary="Machine Learning" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="React" />
          </ListItem>
        </List>
      </div>
    </React.Fragment>
  );
}
export default StartPage;
