import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/auth.reducer";
import serviceReducer from "./reducers/services.reducer";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
  // whitelist: ["auth", "service"],
};

export const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
});

export default persistReducer(persistConfig, rootReducer);
