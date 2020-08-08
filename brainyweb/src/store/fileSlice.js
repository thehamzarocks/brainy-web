import { createSlice, compose, current } from "@reduxjs/toolkit";

export const fileSlice = createSlice({
  name: "files",
  //   initialState: {
  //     filesList: [
  //       { key: "32", fileName: "scratchfile" },
  //       { key: "53", fileName: "hello" },
  //     ],
  //     status: "idle",
  //     error: null,
  //   },
  initialState: {
    userId: null,
    userToken: "",
    filesList: [],
    currentFileId: "",
    actionStatus: {
      status: "",
      statusMessage: "",
    },
    dirty: false,
  },
  reducers: {
    updateUser: (state, action) => {
      console.log("updating user");
      state.userId = action.payload;
    },
    updateUserToken: (state, action) => {
      console.log("updating user token");
      state.userToken = action.payload;
    },
    addFiles: (state, action) => {
      console.log("adding files");
      state.filesList = action.payload;
      state.filesList = state.filesList.map((file) => {
        const copiedFile = { ...file };
        if (!copiedFile.tags) {
          copiedFile.tags = [];
        }
        if (!copiedFile.tasks) {
          copiedFile.tasks = [];
        }
        if (!copiedFile.info) {
          copiedFile.info = "";
        }
        return copiedFile;
      });
      // state.value = 5;
      console.log(state);
    },
    updateFile: (state, action) => {
      console.log("updating files");
      state.filesList = state.filesList.map((item) => {
        if (item.key !== state.currentFileId) {
          return item;
        }

        return {
          ...item,
          ...action.payload,
        };
      });
      state.dirty = true;
    },
    updateCurrentFile: (state, action) => {
      console.log("updating current files");
      state.currentFileId = action.payload;
    },
    deleteFile: (state, action) => {
      console.log("Deleting file");
      state.filesList = state.filesList.filter((item) => {
        return item.key !== action.payload.key;
      });
    },
    updateActionStatus: (state, action) => {
      console.log("Updating action status");
      state.actionStatus = {
        status: action.payload.status,
        statusMessage: action.payload.statusMessage,
      };
    },
    clearDirtyState: (state) => {
      console.log("clearing dirty state");
      state.dirty = false;
    },
  },
  //   extraReducers: {
  //     [fetchFiles.pending]: (state, action) => {
  //       console.log(state.files);
  //       state.files.status = "loading";
  //     },
  //     [fetchFiles.fulfilled]: (state, action) => {
  //       state.files.status = "succeeded";
  //       // Add any fetched posts to the array
  //       state.files.filesList = action.payload;
  //     },
  //     [fetchFiles.rejected]: (state, action) => {
  //       state.files.status = "failed";
  //       state.files.error = action.payload;
  //     },
  //   },
});

export const {
  updateUser,
  updateUserToken,
  addFiles,
  updateFile,
  updateCurrentFile,
  deleteFile,
  updateActionStatus,
  clearDirtyState,
} = fileSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.counter.value;
export const selectSignedInUser = (state) => {
  return state.appReducer.userId;
};

export const selectUserToken = (state) => {
  return state.appReducer.userToken;
};

export const selectAllFiles = (state) => {
  console.log("selecting value");
  return state.appReducer.filesList;
};

export const selectFile = (state, fileId) => {
  const selectedFile = state.appReducer.filesList.find((file) => {
    return file.key === fileId;
  });
  const copiedFile = { ...selectedFile };
  if (!copiedFile.tags) {
    copiedFile.tags = [];
  }
  if (!copiedFile.tasks) {
    copiedFile.tasks = [];
  }
  if (!copiedFile.info) {
    copiedFile.info = "";
  }
  return copiedFile || {};
};

export const selectCurrentFile = (state) => {
  const currentFile = state.appReducer.filesList.find((file) => {
    return file.key === state.appReducer.currentFileId;
  });
  const copiedFile = { ...currentFile };
  if (!copiedFile.tags) {
    copiedFile.tags = [];
  }
  if (!copiedFile.tasks) {
    copiedFile.tasks = [];
  }
  return copiedFile || {};
};

export const selectTagOptions = (state) => {
  const tags = new Set();
  state.appReducer.filesList.forEach((file) => {
    if (!file.tags) {
      return;
    }
    file.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  return [...tags.keys()];
};

export const selectActionStatus = (state) => {
  return state.appReducer.actionStatus;
};

export const selectIsDirtyState = (state) => {
  return state.appReducer.dirty;
};

export default fileSlice.reducer;
