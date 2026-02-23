import { useState } from 'react'
import Sidebar from "./components/sideMenu/sideBar";
import { useLocation } from "react-router-dom";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/login/login";
import './App.css'
import { Transfer } from './pages/transfer';
import { AddAccount } from './pages/account';
import { GetDataAccount } from './pages/account/getAccount';
import { GetTransaction } from './pages/transaction/getTransaction';

 function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || 
  location.pathname === "/add-account";

  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {isLoginPage ? (
        // Full page khusus login (tanpa sidebar & navbar)
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/add-account" element={<AddAccount />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        // Layout utama untuk halaman lain
        <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
          <Sidebar open={drawerOpen} setOpen={setDrawerOpen} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: "100vh",
              width: "100%",
              backgroundColor: "#fbfbfbfc",
              marginLeft: "-70px",
            }}
          >
            {/* <AppNavBar /> */}

            <main style={{ padding: "20px 40px", flex: 1, overflowY: "auto" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path='/menu/transfer' element={<Transfer />}/>
                {/* <Route path='/menu/add-account' element={<AddAccount />}/> */}
                <Route path='/menu/data-rekening' element={<GetDataAccount />} />
                <Route path='/menu/transaksi' element={<GetTransaction/>}/>
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
