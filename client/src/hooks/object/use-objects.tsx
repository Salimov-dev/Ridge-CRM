import { useDispatch } from "react-redux";

const useObjects = (setOpenCreate, setUpdateObjectOpenState) => {
  const dispatch = useDispatch();

  const center = [59.930320630519155, 30.32906024941998];
  const mapZoom = 11;

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseUpdate = () => {
    dispatch(setUpdateObjectOpenState(false));
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  return {
    center,
    mapZoom,
    handleOpenCreate,
    handleCloseCreate,
    handleCloseUpdate,
  };
};

export default useObjects;
