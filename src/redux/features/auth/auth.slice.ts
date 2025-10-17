import { createSlice } from '@reduxjs/toolkit'
type TAuth = {
    token: string,
    user: {
        name: string,
        email: string,
        profileImage?: string
        // add more base on need
    }
}
const initialState: TAuth = {
    token: '',
    user: {
        name: '',
        email: '',
        profileImage: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUserAndToken: (state, action) => {
            if (!action?.payload?.token) {
                state.token = action?.payload?.token
            }
            if (!action?.payload?.user) {
                state.user = action?.payload?.user
            }
        },
        removeUserAndToken: (state) => {
            state.token = ''
            state.user = {
                name: '',
                email: '',
                profileImage: ''
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { addUserAndToken, removeUserAndToken } = authSlice.actions

export default authSlice.reducer