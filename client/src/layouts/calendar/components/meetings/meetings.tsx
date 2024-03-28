import { useDispatch } from "react-redux";
// styled
import { ItemContainer, ItemsContainer } from "../styled";
// components
import Title from "./components/title";
import Body from "./components/body";
import Result from "../tasks/components/result";
import Loader from "@components/common/loader/loader";
// store
import { updateMeeting } from "@store/meeting/meetings.store";

const Meetings = ({
  meetings,
  currentUserId,
  draggableDay,
  setDraggableDay,
  isCurator,
  isSelectedDayDialog,
  setState
}) => {
  const dispatch = useDispatch();

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
              cursor: "grab",
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
              isCurator={isCurator}
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

export default Meetings;
