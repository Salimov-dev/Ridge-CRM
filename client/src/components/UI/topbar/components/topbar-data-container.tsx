import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { setCurrrentPathState } from "../../../../store/current-path.store";

const DataContainer = styled(Box)`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled(Box)`
  display: flex;
  padding: 0px 4px;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
`;

const TopBarDataContainter = ({
  title,
  elements,
  path,
  backgroundColor,
  fontColor = "white",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <DataContainer>
      <Typography variant="h5">{title}</Typography>
      <ResultContainer
        sx={{ background: backgroundColor, color: fontColor }}
        onClick={() => {
          navigate(path);
          dispatch<any>(setCurrrentPathState(window.location.pathname));
        }}
      >
        <Typography variant="h5">{elements?.length}шт</Typography>
      </ResultContainer>
    </DataContainer>
  );
};

export default TopBarDataContainter;
