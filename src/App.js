import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import VerifyAccount from "./pages/VerifyAccount";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="firstContainer">
                    <Header></Header>
                    <main>
                        <Routes>
                            <Route path="/" element={<Login></Login>}></Route>
                            <Route
                                path="/register"
                                element={<Register></Register>}
                            ></Route>
                            <Route
                                path="/login"
                                element={<Login></Login>}
                            ></Route>
                            <Route
                                path="/reset-password"
                                element={<ResetPassword></ResetPassword>}
                            ></Route>
                            <Route
                                path="/new-password/:passwordToken"
                                element={<NewPassword></NewPassword>}
                            ></Route>
                            <Route
                                path="/verify-account/:registerToken"
                                element={<VerifyAccount></VerifyAccount>}
                            ></Route>
                            <Route
                                path="*"
                                element={<NotFound></NotFound>}
                            ></Route>
                            <Route
                                path="/notfound"
                                element={<NotFound></NotFound>}
                            ></Route>
                            <Route element={<ProtectedRoute />}>
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard></Dashboard>}
                                ></Route>
                                <Route
                                    path="/account"
                                    element={<Account></Account>}
                                ></Route>
                            </Route>
                        </Routes>
                    </main>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose="3000"
                    className="toastify"
                />
            </BrowserRouter>
        </div>
    );
}

export default App;
