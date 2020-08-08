import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const fileSearchFilter = (file, searchText) => {
  return file.fileName.toLowerCase().includes(searchText.toLowerCase());
};

const tagSearchFilter = (file, searchText) => {
  const matchingTags = file.tags?.filter((tag) => {
    return tag.toLowerCase().includes(searchText.toLowerCase());
  });
  return matchingTags?.length > 0;
};

const contentSearchFilter = (file, searchText) => {
  return file.info.toLowerCase().includes(searchText.toLowerCase());
};

const searchTypeToFilterMap = {
  Files: fileSearchFilter,
  Tags: tagSearchFilter,
  Content: contentSearchFilter,
};

const renderFilesBasedOnSearch = (files, searchType, searchText) => {
  const filteredFiles = files.filter((file) =>
    searchTypeToFilterMap[searchType](file, searchText)
  );
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
  if (searchStrLen === 0) {
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

const getMatchStringFromMatchIndex = (text, index) => {
  const startIndex = Math.max(index - 50, 0);
  return text.substr(startIndex, 100);
};

const renderMatchesBasedOnSearch = (files, searchType, searchText) => {
  const matches = [];
  files.forEach((file) => {
    const matchingIndices = getIndicesOf(searchText, file.info);
    matchingIndices.forEach((matchingIndex) => {
      matches.push({
        fileKey: file.key,
        fileName: file.fileName,
        matchIndex: matchingIndex,
        matchString: getMatchStringFromMatchIndex(file.info, matchingIndex),
      });
      // matchesInFile.push(file.info.substr(startIndex, 100));
    });
    // matchesInFile.forEach((match) => {
    //   matches.push({
    //     fileKey: file.key,
    //     fileName: file.fileName,
    //     matchString: match,

    //   });
    // });
  });

  return matches.slice(0,20).map((match, index) => {
    return (
      <ListItem
        key={match.fileKey + index}
        component={Link}
        to={"/files/" + match.fileKey + "/" + match.matchIndex}
        button
      >
        <div>
          <ListItemText primary={match.fileName} />
          <ListItemText primary={match.matchString} />
        </div>
      </ListItem>
    );
  });
};

export const getRenderedResults = (files, searchType, searchText) => {
  if(!files || files.length === 0) {
    return (
      <Typography>
        You don't have any notes yet. Create a new note to get started.
      </Typography>
    )
  }
  if (searchType === "Files" || searchType === "Tags") {
    return renderFilesBasedOnSearch(files, searchType, searchText);
  }
  if (searchType === "Content") {
    return renderMatchesBasedOnSearch(files, searchType, searchText);
  }
};
