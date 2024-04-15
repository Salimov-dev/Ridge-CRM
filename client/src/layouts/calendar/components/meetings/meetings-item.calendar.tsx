import { useDispatch, useSelector } from "react-redux";
// components
import Title from "./components/title";
import Body from "./components/body";
import Result from "../tasks/components/result";
import Loader from "@components/common/loader/loader";
// store
import { updateMeeting } from "@store/meeting/meetings.store";
import { getCurrentUserId } from "@store/user/users.store";
import { Box, styled } from "@mui/material";

export const ItemsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
  border-radius: 4px;
`;

const MeetingItemCalendar = ({
  meetings,
  draggableDay,
  setDraggableDay,
  isSelectedDayDialog,
  setState
}) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());

  const handleDragEnd = (meet) => {
    if (meet?.date !== draggableDay) {
      const updatedMeeting = {
        ...meet,
        date: draggableDay
      };
      dispatch<any>(updateMeeting(updatedMeeting)).then(() =>
        setDraggableDay(null)
      );
    } else {
      setDraggableDay(null);
    }
  };

  return meetings ? (
    <ItemsContainer>
      {meetings?.map((meet) => {
        const isAuthorEntity = meet?.userId === currentUserId;

        return (
          <ItemContainer
            key={meet._id}
            draggable={isAuthorEntity && true}
            onDragEnd={() => handleDragEnd(meet)}
            sx={{
              cursor: isAuthorEntity ? "grab" : null,
              border: "3px solid RoyalBlue",
              color: "GhostWhite",
              background: !meet?.isDone ? "RoyalBlue" : "gray"
            }}
          >
            <Title
              meet={meet}
              currentUserId={currentUserId}
              setState={setState}
            />
            <Body
              meet={meet}
              isSelectedDayDialog={isSelectedDayDialog}
              setState={setState}
            />
            {isSelectedDayDialog ? <Result meet={meet} /> : null}
          </ItemContainer>
        );
      })}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default MeetingItemCalendar;
