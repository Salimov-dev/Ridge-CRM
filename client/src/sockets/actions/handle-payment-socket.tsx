import { useDispatch } from "react-redux";

const handlePaymentSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("paymentSuccessed", async (updatedLicense) => {
    // dispatch<any>(createCompanyUpdate(newCompany));
  });
};

export default handlePaymentSocket;
