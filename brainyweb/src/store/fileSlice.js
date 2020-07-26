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
    currentFileId: ""
    // filesList: [],
  },
  reducers: {
    addFiles: (state, action) => {
      //   state.files.filesList = action.payload;
      // state.filesList = action.payload[0];
      state.filesList = action.payload
      // state.value = 5;
      console.log(state);
    },
    updateFile: (state, action) => {
      state.filesList =  state.filesList.map(item => {
        if (item.key !== state.currentFileId) {
          // This isn't the item we care about - keep it as-is
          return item
        }
    
        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...action.payload
        }
      })
    },
    updateCurrentFile: (state, action) => {
      state.currentFileId = action.payload;
    }
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

export const { addFiles, updateFile, updateCurrentFile } = fileSlice.actions;

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
  console.log("selecting value")
  return state.appReducer.filesList;
};

export const selectFile = (state, fileId) => {
  return state.appReducer.filesList.find(file => {
    return file.key === fileId
  });
}

export const selectCurrentFile = (state) => {
  return state.appReducer.filesList.find(file => {
    return file.key === state.appReducer.currentFileId;
  });
}

export const selectFileStatus = (state) => state.status;

export default fileSlice.reducer;
