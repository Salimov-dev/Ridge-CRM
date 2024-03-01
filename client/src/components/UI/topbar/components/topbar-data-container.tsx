import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { setCurrrentPathState } from "../../../../store/current-path.store";
import Loader from "../../../common/loader/loader";

const DataContainer = styled(Box)`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  color: grey;
`;

const ResultContainer = styled(Box)`
  display: flex;
  padding: 0px 3px;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.8;
`;

const TopBarDataContainter = ({
  title,
  elements,
  path,
  backgroundColor,
  isLoading = true,
  fontColor = "white"
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <DataContainer>
      <Typography
        variant="h6"
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "white"
          }
        }}
        onClick={() => {
          navigate(path);
          dispatch<any>(setCurrrentPathState(window.location.pathname));
        }}
      >
        {title}
      </Typography>
      <ResultContainer
        sx={{
          background: backgroundColor,
          color: fontColor,
          "&:hover": {
            border: "2px solid yellow"
          }
        }}
        onClick={() => {
          navigate(path);
          dispatch<any>(setCurrrentPathState(window.location.pathname));
        }}
      >
        {!isLoading ? (
          <Typography variant="h6">{elements?.length}шт</Typography>
        ) : (
          <Loader size={16} padding="6px" />
        )}
      </ResultContainer>
    </DataContainer>
  );
};

export default TopBarDataContainter;
