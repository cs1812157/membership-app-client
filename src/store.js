import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducers";
const middleware = [thunk];

const initialState = {
    userLoginData: {
        userData: localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : null,
    },
};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export { store };
