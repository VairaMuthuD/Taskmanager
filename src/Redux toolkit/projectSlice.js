import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    projects: [],
    projectGroup: [],
    logInUser: '',
    userRoles: [],
    selectedUserRole: '',
    status: 'idle',
    error: null
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const response = await axios.get('https://taskmanager-api.azurewebsites.net/api/ProjectInfo/GetAllProjectDetails', {
      headers: {
        "CurrentUser": initialState.logInUser,
        "CurrentRole": "Administrator"
      }
    });
    return response.data;
  });



  export const getProjectGroups = createAsyncThunk('projects/getProjectGroups', async () => {
    const response = await axios.get('https://taskmanager-api.azurewebsites.net/api/ProjectInfo/GetProjectGroups', {
      headers: {
        "CurrentUser": initialState.logInUser,
        "CurrentRole": "Administrator"
      }
    });
    return response.data;
  });

  export const editProjects = createAsyncThunk('projects/editProjects', async (updatedProject) => {
    const { id, ...projectData } = updatedProject; 
    const response = await axios.put(`https://taskmanager-api.azurewebsites.net/api/ProjectInfo/SetProjectDetails/${id}`,projectData,{
      headers: {
        "CurrentUser": initialState.logInUser,
        "CurrentRole": "Administrator"
      }
    });
    return response.data;
  });

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
      handleLogInUserAcrossComponent: (state, action) => {
        state.logInUser = action.payload;
        // state.isLoggedIn = true;
      },

      handleUserRoles: (state, action)=>{
        state.userRoles = action.payload;
        console.log(action.payload)
      },

      handleSelectedUserRole: (state, action)=>{
        state.selectedUserRole = action.payload;
        console.log(action.payload)
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProjects.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProjects.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log(action.payload)
            state.projects = action.payload;
          })
          .addCase(fetchProjects.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })

          .addCase(getProjectGroups.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getProjectGroups.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.projectGroup = action.payload;
          })
          .addCase(getProjectGroups.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })

          .addCase(editProjects.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(editProjects.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // const index = state.projects.findIndex((user)=> user.id === action.payload.id)
            // console.log(index)
            // if (index !== -1) {
            //     state.projects[index] = action.payload;
            //   }

            state.projects = state.projects.map(project =>
              project.id === action.payload.id ? action.payload : project
          );
          })
          .addCase(editProjects.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      }

})

// export { fetchProjects , editProjects, getProjectGroups };

export const { handleLogInUserAcrossComponent, handleUserRoles, handleSelectedUserRole } = projectSlice.actions;

export default projectSlice.reducer;