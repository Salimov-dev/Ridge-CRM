import {
  createCompanyUpdate,
  removeCompanyUpdate,
  updateCompanyUpdate
} from "@store/company/company.store";
import { useDispatch } from "react-redux";

const handleCompanySocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("createCompany", async (newCompany) => {
    dispatch<any>(createCompanyUpdate(newCompany));
  });
  socket.on("updateCompany", async (updatedCompany) => {
    dispatch<any>(updateCompanyUpdate(updatedCompany));
  });
  socket.on("deleteCompany", async (CompanyId) => {
    dispatch<any>(removeCompanyUpdate(CompanyId));
  });
};

export default handleCompanySocket;
