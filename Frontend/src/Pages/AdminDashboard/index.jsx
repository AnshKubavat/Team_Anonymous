import AllContacts from "./components/AllContacts";
import AllBusinesses from "./components/AllBusinesses";
import DeletedBusinesses from "./components/DeletedBusinesses";
import DashBoard from "./components/DashBoard";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <div className="">
        <div className="flex flex-row justify-start ">
          <div className="w-0 lg:w-64 z-50">
            <SideBar />
          </div>

          <div className="w-screen lg:max-w-7xl  overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashBoard/>}/>

              <Route path="/dashboard" element={<DashBoard />}/>
            
              <Route path="/allcontacts" element={<AllContacts />} />

              <Route path="/allbusinesses" element={<AllBusinesses />} />

              <Route path="/deletedbusinesses" element={<DeletedBusinesses />} />

            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
