// libraries
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
// MUI
import { Box, Typography, styled } from "@mui/material";
// components
import UserMenu from "./components/user-menu";
import Loader from "../../common/loader/loader";
// store
import {
  getCurrentUserData,
  getUsersLoadingStatus,
} from "../../../store/user/users.store";
import {
  getObjectsWeeklyList,
  getObjectsWeeklyWithPhoneList,
} from "../../../store/object/objects.store";
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import { getMeetingsWeeklyList } from "../../../store/meeting/meetings.store";
import { getTasksWeeklyList } from "../../../store/task/tasks.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0 0 0;
  margin-bottom: 6px;
  // border-bottom: 1px solid gray;
`;

const DataContainer = styled(Box)`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled(Box)`
  display: flex;
  padding: 2px 8px;
  border: 1px solid white;
  border-radius: 6px;
`;

const LeftSide = styled(Box)`
  display: flex;
  gap: 18px;
  justify-content: center;
  align-items: center;
`;

const RightSide = styled(Box)`
  display: flex;
`;

const TopBar = () => {
  dayjs.locale("ru");
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());

  const currentDate = dayjs();
  const formattedDate = capitalizeFirstLetter(
    currentDate.format("dddd, D MMM")
  ).replace(/\.$/, "");

  const objects = useSelector(getObjectsWeeklyList());
  const objectsWithPhone = useSelector(getObjectsWeeklyWithPhoneList());
  const meetings = useSelector(getMeetingsWeeklyList());
  const tasks = useSelector(getTasksWeeklyList())

  return (
    <Component>
      <Typography variant="h5" sx={{ marginRight: "50px", color: "gray" }}>
        {formattedDate}
      </Typography>
      <LeftSide>
        <DataContainer>
          <Typography variant="h5">Объектов за неделю:</Typography>
          <ResultContainer sx={{ background: "Gold", color: "black" }}>
            <Typography variant="h5">{objects?.length}шт</Typography>
          </ResultContainer>
        </DataContainer>
        <DataContainer>
          <Typography variant="h5">С контактами:</Typography>
          <ResultContainer sx={{ background: "OrangeRed" }}>
            <Typography variant="h5">{objectsWithPhone?.length}шт</Typography>
          </ResultContainer>
        </DataContainer>
        <DataContainer>
          <Typography variant="h5">Провести встреч:</Typography>
          <ResultContainer sx={{ background: "RoyalBlue" }}>
            <Typography variant="h5">{meetings?.length}шт</Typography>
          </ResultContainer>
        </DataContainer>
        <DataContainer>
          <Typography variant="h5">Выполнить задач:</Typography>
          <ResultContainer sx={{ background: "Sienna" }}>
            <Typography variant="h5">{tasks?.length}шт</Typography>
          </ResultContainer>
        </DataContainer>
      </LeftSide>
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
