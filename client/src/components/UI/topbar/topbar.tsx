// libraries
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useDispatch, useSelector } from "react-redux";
// MUI
import { Box, Typography, styled } from "@mui/material";
// components
import UserMenu from "./components/user-menu";
import Loader from "../../common/loader/loader";
// store
import {
  getCurrentUserData,
  getIsLoggedIn,
  getUsersLoadingStatus,
} from "../../../store/user/users.store";
import {
  getObjectsWeeklyList,
  getObjectsWeeklyWithPhoneList,
} from "../../../store/object/objects.store";
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import { getMeetingsWeeklyList } from "../../../store/meeting/meetings.store";
import { getTasksWeeklyList } from "../../../store/task/tasks.store";
import { useNavigate } from "react-router-dom";
import { setCurrrentPathState } from "../../../store/current-path.store";
import { getPresentationsWeeklyList } from "../../../store/presentation/presentations.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0 0 0;
  margin-bottom: 6px;
`;

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

const ResultComponent = styled(Box)`
  display: flex;
  height: 50px;
  padding: 0 30px;
  gap: 18px;
  justify-content: center;
  align-items: center;
  border: 2px dashed gray;
  border-top: 0px;
  border-radius: 0 0 6px 6px;
`;

const RightSide = styled(Box)`
  display: flex;
`;

const TopBar = () => {
  dayjs.locale("ru");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());
  const isLoggedIn = useSelector(getIsLoggedIn());

  const currentDate = dayjs();
  const formattedDate = capitalizeFirstLetter(
    currentDate.format("dddd, D MMM")
  ).replace(/\.$/, "");

  const presentations = useSelector(getPresentationsWeeklyList());
  const objects = useSelector(getObjectsWeeklyList());
  const objectsWithPhone = useSelector(getObjectsWeeklyWithPhoneList());
  const meetings = useSelector(getMeetingsWeeklyList());
  const tasks = useSelector(getTasksWeeklyList());

  return (
    <Component>
      {isLoggedIn ? (
        <>
          <Typography variant="h5" sx={{ marginRight: "50px", color: "gray" }}>
            {formattedDate}
          </Typography>
          <ResultComponent>
            <DataContainer>
              <Typography variant="h5">Объектов за неделю:</Typography>
              <ResultContainer
                sx={{ background: "Gold", color: "black" }}
                onClick={() => {
                  navigate("/objects");
                  dispatch<any>(setCurrrentPathState(window.location.pathname));
                }}
              >
                <Typography variant="h5">{objects?.length}шт</Typography>
              </ResultContainer>
            </DataContainer>
            <DataContainer>
              <Typography variant="h5">С контактами:</Typography>
              <ResultContainer
                sx={{ background: "OrangeRed" }}
                onClick={() => {
                  navigate("/objects");
                  dispatch<any>(setCurrrentPathState(window.location.pathname));
                }}
              >
                <Typography variant="h5">
                  {objectsWithPhone?.length}шт
                </Typography>
              </ResultContainer>
            </DataContainer>
            <DataContainer>
              <Typography variant="h5">Презентаций:</Typography>
              <ResultContainer
                sx={{ background: "SaddleBrown" }}
                onClick={() => {
                  navigate("/presentations");
                  dispatch<any>(setCurrrentPathState(window.location.pathname));
                }}
              >
                <Typography variant="h5">{presentations?.length}шт</Typography>
              </ResultContainer>
            </DataContainer>
            <DataContainer>
              <Typography variant="h5">Провести встреч:</Typography>
              <ResultContainer
                sx={{ background: "RoyalBlue" }}
                onClick={() => {
                  navigate("/meetings");
                  dispatch<any>(setCurrrentPathState(window.location.pathname));
                }}
              >
                <Typography variant="h5">{meetings?.length}шт</Typography>
              </ResultContainer>
            </DataContainer>
            <DataContainer>
              <Typography variant="h5">Выполнить задач:</Typography>
              <ResultContainer
                sx={{ background: "Sienna" }}
                onClick={() => {
                  navigate("/calendar");
                  dispatch<any>(setCurrrentPathState(window.location.pathname));
                }}
              >
                <Typography variant="h5">{tasks?.length}шт</Typography>
              </ResultContainer>
            </DataContainer>
          </ResultComponent>
        </>
      ) : null}
      <RightSide>
        {!isLoading ? (
          <>{currentUser ? <UserMenu currentUser={currentUser} /> : null}</>
        ) : (
          <Loader />
        )}
      </RightSide>
    </Component>
  );
};

export default TopBar;
