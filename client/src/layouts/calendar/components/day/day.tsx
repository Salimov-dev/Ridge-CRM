import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import Loader from "../../../../components/common/loader/loader";
// store
import { getMeetingTypesList } from "../../../../store/meeting/meeting-types.store";
import { getUsersList } from "../../../../store/user/users.store";
// utils
import { FormatTime } from "../../../../utils/date/format-time";
import { chechIsCurrentDay } from "../../../../utils/date/check-is-current-day";
import { chechIsFutureDay } from "../../../../utils/date/check-is-future-day";

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
  const isCurrentDay = chechIsCurrentDay(day)
  const isFutureDay = chechIsFutureDay(day)

  const users = useSelector(getUsersList());
  const meetingTypes = useSelector(getMeetingTypesList());

  const getManagerName = (id) => {
    const user = users?.find((user) => user._id === id);
    const result = `${user?.name.lastName} ${user?.name.firstName}`;
    return result;
  };

  const getMeetingTypeName = (id) => {
    const meetingType = meetingTypes?.find((type) => type?._id === id);
    const result = meetingType?.name;

    return result;
  };

  return (
    <OneDayContainer
      onClick={() => {
        if (isCurrentDay || isFutureDay) {
          onClick(day);
        } else {
          toast.error("Нельзя поставить задачу ранее текущей даты!");
        }
      }}
      sx={{
        backgroundColor: isWeekendColumn ? "#171e32" : "inherit",
        borderColor: isCurrentDay
          ? "yellow"
          : isFutureDay
          ? "green"
          : "inherit",
        border: isCurrentDay
          ? "2px dotted white"
          : isFutureDay
          ? "1px solid white"
          : "1px solid gray",
        "&:hover": {
          borderColor: isCurrentDay
            ? "yellow"
            : isFutureDay
            ? "yellow"
            : "red",
        },
      }}
    >
      <ContainerDate>
        <Date
          sx={{
            backgroundColor: isCurrentDay ? "yellow" : "inherit",
            color: isWeekendColumn
              ? "red"
              : isCurrentDay
              ? "black"
              : isFutureDay
              ? "white"
              : "gray",
          }}
        >
          {day.format("DD")}
        </Date>
      </ContainerDate>
      {meeting ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {meeting?.map((meet) => (
            <Box
              key={meet._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                background: "blue",
              }}
            >
              <Typography>Встреча в: {FormatTime(meet.time)}</Typography>
              <Typography>{getMeetingTypeName(meet?.meetingType)}</Typography>
              <Typography>
                {meet.location.city}, {meet.location.address}
              </Typography>
              <Typography>{getManagerName(meet?.userId)}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Loader />
      )}
    </OneDayContainer>
  );
};

export default Day;
