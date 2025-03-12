import { DummyUserData } from 'utils/constants';

const user = DummyUserData;

interface LoginData {
  email: string;
  password: string;
}
interface LoginResponse {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
}
export const loginUserThunk = async (data: LoginData, thunkAPI: any): Promise<LoginResponse> => {
  try {
    // const resp = await myAxios.post(Apiendpoints.LOGIN, data);
    if (data?.email === 'gsynergy@example.com' && data?.password === 'Test@123') {
      return user;
    } else {
      return thunkAPI.rejectWithValue('Invalid credentials');
    }
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error);
  }
};
