import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address, FoodModel, UserLoginPayload, UserModel, UserState } from "../models";
import { UserPayload } from '../models'
import { BASE_URL } from "../../utils";
import { RootState } from "../store";

export const fetchUser = createAsyncThunk("user/fetch", async ({ email, password }: any, thunkAPI) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    const data = response.json()
    return data
});
export const signUpUser = createAsyncThunk("user/signUp", async ({ email, password, phone, userName }: any, thunkAPI) => {
    try {
        const response = await fetch(`${BASE_URL}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, phone, userName })
        });

        if (!response.ok) {
            // const errorData = await response.json();
            const e = new Error(`Erro na solicitação: ${response.status} ${response.statusText}`);
            alert(e);
            throw e

        }
        const data = await response.json();

        const user = {
            firstName: userName.split(' ')[0],
            lastName: userName.split(' ')[1],
            contactNumber: phone,
            token: data.token,
            verified: false
        }
        alert("Cadastrado com sucesso!")
        return user;
    } catch (error: any) {
        console.error("ERROR ON SIGNUP\n", error);
        throw thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: {} as UserModel,
        location: {} as Address,
        error: {},
        Cart: {} as [FoodModel],
    },
    // }as UserState,
    reducers: {
        getUserValues: (state) => {
            return state
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            try {
                state.user = action.payload;
            } catch (error) {
                state.error = {
                    code: "409",
                    message: "Erro ao criar a conta. Tente novamente."
                };
            }
        });
    }
})

export default userSlice.reducer
// export const { selectUser } = state.RootState => State.
export const { getUserValues } = userSlice.actions

