import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  filesList: [],
  status: "idle",
  error: null,
};

// export const fetchFiles = createAsyncThunk("files/fetchAllFiles", async () => {
//   const response = await axios.get("https://lyjcnc.deta.dev/files/");
//   return response.data;
// });

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
    // value: 0,
    filesList: [],
    currentFileId: "",
    // filesList: [],
  },
  reducers: {
    addFiles: (state, action) => {
      console.log("adding files");
      //   state.files.filesList = action.payload;
      // state.filesList = action.payload[0];
      state.filesList = action.payload;
      // state.value = 5;
      console.log(state);
    },
    updateFile: (state, action) => {
      console.log("updating files");
      state.filesList = state.filesList.map((item) => {
        if (item.key !== state.currentFileId) {
          // This isn't the item we care about - keep it as-is
          return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...action.payload,
        };
      });
    },
    updateCurrentFile: (state, action) => {
      console.log("updating current files");
      state.currentFileId = action.payload;
    },
    deleteFile: (state, action) => {
      console.log("Deleting file");
      state.filesList = state.filesList.filter((item) => {
        return item.key !== action.payload.key
      });
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

export const { addFiles, updateFile, updateCurrentFile, deleteFile } = fileSlice.actions;

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
export const selectAllFiles = (state) => {
  console.log("selecting value");
  return state.appReducer.filesList;
};

export const selectFile = (state, fileId) => {
  const selectedFile = state.appReducer.filesList.find((file) => {
    return file.key === fileId;
  });
  return selectedFile || {};
};

export const selectCurrentFile = (state) => {
  const currentFile = state.appReducer.filesList.find((file) => {
    return file.key === state.appReducer.currentFileId;
  });
  return currentFile || {};
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

export default fileSlice.reducer;
