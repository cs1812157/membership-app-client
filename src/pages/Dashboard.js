import React from "react";
import { useSelector } from "react-redux";
import Wrapper from "../components/Wrapper";

const Dashboard = () => {
    const { userData } = useSelector((state) => state.userLoginData);
    return (
        <Wrapper>
            <div className="dashboard">
                <div className="top">
                    <h1>Dashboard</h1>
                    <h2>
                        Welcome,{" "}
                        <span className="primary">{userData?.name}</span>
                    </h2>
                </div>
                {/* <div className="insights">
                    <div className="wallet">
                        <div className="middle">
                            <div className="top">
                                <span className="material-symbols-sharp">
                                    wallet
                                </span>
                                <h3>Wallet</h3>
                            </div>
                            <div className="bottom">
                                <h1>$25,024</h1>
                                <small className="text-muted">USD</small>
                            </div>
                        </div>
                    </div>
                    <div className="investment">
                        <div className="middle">
                            <div className="top">
                                <span className="material-symbols-sharp">
                                    account_balance
                                </span>
                                <h3>Investment</h3>
                            </div>
                            <div className="bottom">
                                <h1>$25,024</h1>
                                <small className="text-muted">USD</small>
                            </div>
                        </div>
                    </div>
                    <div className="receive">
                        <div className="middle">
                            <div className="top">
                                <span className="material-symbols-sharp">
                                    call_received
                                </span>
                                <h3>Receive</h3>
                            </div>
                            <div className="bottom">
                                <h1>$25,024</h1>
                                <small className="text-muted">USD</small>
                            </div>
                        </div>
                    </div>
                    <div className="withdraw">
                        <div className="middle">
                            <div className="top">
                                <span className="material-symbols-sharp">
                                    call_made
                                </span>
                                <h3>Withdraw</h3>
                            </div>
                            <div className="bottom">
                                <h1>$25,024</h1>
                                <small className="text-muted">USD</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="transaction-history">
                    <h2>Transaction History</h2>
                    <div className="table">
                        <div className="data">
                            <div className="left">
                                <span className="material-symbols-sharp">
                                    call_received
                                </span>
                                <p>19 August 2022</p>
                            </div>
                            <div className="right">
                                <p>$25,024</p>
                                <p>Pending</p>
                            </div>
                        </div>
                        <div className="data">
                            <div className="left">
                                <span className="material-symbols-sharp">
                                    call_received
                                </span>
                                <p>19 August 2022</p>
                            </div>
                            <div className="right">
                                <p>$25,024</p>
                                <p>Pending</p>
                            </div>
                        </div>
                        <div className="data">
                            <div className="left">
                                <span className="material-symbols-sharp">
                                    call_received
                                </span>
                                <p>19 August 2022</p>
                            </div>
                            <div className="right">
                                <p>$25,024</p>
                                <p>Pending</p>
                            </div>
                        </div>
                    </div>
                    <a href="/#">Show More</a>
                </div> */}
            </div>
        </Wrapper>
    );
};

export default Dashboard;
