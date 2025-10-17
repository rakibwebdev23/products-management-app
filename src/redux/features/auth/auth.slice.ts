import { createSlice } from '@reduxjs/toolkit'
type TAuth = {
    token: string,
}
const initialState: TAuth = {
    token: '',
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUserAndToken: (state, action) => {
            if (!action?.payload?.token) {
                state.token = action?.payload?.token
            }
        },
        removeUserAndToken: (state) => {
            state.token = ''
        }
    }
})

// Action creators are generated for each case reducer function
export const { addUserAndToken, removeUserAndToken } = authSlice.actions

export default authSlice.reducer

