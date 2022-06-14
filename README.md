# Counter App Redux Toolkit (Typescript)

A React Native app with Redux Toolkit using Typescript.

## Steps:

- Create an app using `react-native` cli with typescript template.

```
npx react-native init CounterApp --template react-native-template-typescript
```

- Add `Redux Toolkit` dependency.

```
npm install @reduxjs/toolkit react-redux
```

- Create Redux store.

```
import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
```

- Create `counterSlice`.

```
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCount} from '../utils';
import {AppThunk} from './store';

export interface CounterState {
  value: number;
  loading: boolean;
  error: boolean;
}

const initialState: CounterState = {
  value: 0,
  loading: false,
  error: false,
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response;
  },
);

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = getState().counter.value;
    const {incrementByAmount} = counterSlice.actions;
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.loading = false;
      state.error = false;
      state.value += 1;
    },
    decrement: state => {
      state.loading = false;
      state.error = false;
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.error = false;
      state.value += action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default counterSlice;

```

- Add the `Provider` in `App.tsx`.

```
import {Provider} from 'react-redux';
import {RootState, store} from './redux/store';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.container}>
          <Image
            source={require('./images/reactlogo.png')}
            style={styles.imageStyle}
          />
          <Text style={styles.h1Txt}>
            Counter App Redux Toolkit (Typescript)
          </Text>
          <View style={styles.divider} />
          <Counter />
        </View>
      </SafeAreaView>
    </Provider>
  );
};
```

- Create the React hook with `TypedUseSelectorHook`.

```
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

- Connect `Counter` component with the redux store.

```
const Counter = () => {
  const [amount, setAmount] = useState('2');
  const {value, loading} = useAppSelector((state: RootState) => state.counter);
  const dispatch = useAppDispatch();
  const {increment, decrement, incrementByAmount} = counterSlice.actions;
  return (
    <>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => dispatch(decrement())}>
          <Text style={styles.btnTxt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countTxt}>{value}</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => dispatch(increment())}>
          <Text style={styles.btnTxt}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blank} />
      <View style={styles.row}>
        <TextInput
          style={styles.txtInput}
          value={amount}
          onChangeText={v => setAmount(v)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const n = Number(amount) || 0;
            dispatch(incrementByAmount(n));
          }}>
          <Text>Add Amount</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={() => {
            const n = Number(amount) || 0;
            dispatch(incrementAsync(n));
          }}>
          <Text>{loading ? 'Calculating...' : 'Add Async'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const n = Number(amount) || 0;
            dispatch(incrementIfOdd(n));
          }}>
          <Text>Add If Odd</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

```
