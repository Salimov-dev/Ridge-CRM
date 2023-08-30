import { Box, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { FormatTime } from "../../../../utils/date/format-time";
import { useSelector } from "react-redux";
import { getMeetingTypesList } from "../../../../store/meeting/meeting-types.store";
import { getUsersList } from "../../../../store/user/users.store";

const OneDayContainer = styled(Box)`
  display: flex;
  border: 1px solid gray;
  flex-direction: column;
  cursor: pointer;
  padding: 6px;
`;

const ContainerDate = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3px;
  margin-bottom: 10px;
`;

const Date = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 32px;
`;

const Day = ({ day, isWeekendColumn, onClick, meeting }) => {
  // const managerName = useSelector(getUserNameById(meeting?.userId));
  // console.log("meeting",meeting);
  
  const isCurrentDay = () => {
    const currentDay = dayjs().format("DD-MM-YY");
    const calendarDay = day?.format("DD-MM-YY");
    const isCurrentDay = currentDay === calendarDay;

    return isCurrentDay;
  };

  const users = useSelector(getUsersList())
  const meetingTypes = useSelector(getMeetingTypesList())

  const getManagerName = (id) => {
    const user = users?.find((user) => user._id === id);
    const result = `${user?.name.lastName} ${user?.name.firstName}`;
    return result
  }

const getMeetingTypeName = (id) => {
    const meetingType = meetingTypes?.find(
      (type) => type?._id === id
    );
    const result = meetingType?.name; 
  
    return result;
  };
  
  return (
    <OneDayContainer
      onClick={() => onClick(day)}
      sx={{
        backgroundColor: isWeekendColumn ? "#171e32" : "inherit",
        "&:hover": {
          borderColor: "yellow",
        },
      }}
    >
      <ContainerDate>
        <Date
          sx={{
            backgroundColor: isCurrentDay() ? "yellow" : "inherit",
            color: isWeekendColumn
              ? "red"
              : isCurrentDay()
              ? "black"
              : "inherit",
          }}
        >
          {day.format("DD")}
        </Date>
      </ContainerDate>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
        {meeting?.map((meet) => (
          <Box key={meet._id} sx={{ display: "flex", flexDirection: "column", background: 'blue' }}>
            <Typography >Встреча в: {FormatTime(meet.time)}</Typography>
            <Typography >{getMeetingTypeName(meet?.meetingType)}</Typography>
            <Typography >{meet.location.city}, {meet.location.address}</Typography>
            <Typography >{getManagerName(meet?.userId)}</Typography>
          </Box>
        ))}
      </Box>
    </OneDayContainer>
  );
};

export default Day;
