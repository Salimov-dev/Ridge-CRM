import { useDispatch } from "react-redux";
// styled
import { ItemContainer, ItemsContainer } from "../styled/styled";
// components
import Title from "./components/title";
import Body from "./components/body";
import Result from "./components/result";
import Loader from "../../../../../../../../../../loader/loader";
// store
import { updateMeeting } from "../../../../../../../../../../../../store/meeting/meetings.store";

const Meetings = ({
  meetings,
  currentUserId,
  draggableDay,
  setDraggableDay,
  isCurator,
  isSelectedDayDialog,
}) => {
  const dispatch = useDispatch();

  const handleDragEnd = (meet) => {
    if (meet?.date !== draggableDay) {
      const updatedMeeting = {
        ...meet,
        date: draggableDay,
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
      {meetings?.map((meet) => (
        <ItemContainer
          key={meet._id}
          draggable={true}
          onDragEnd={() => handleDragEnd(meet)}
          sx={{
            cursor: "grab",
            border: "3px solid RoyalBlue",
            color: "GhostWhite",
            background: !meet?.isDone ? "RoyalBlue" : "gray",
          }}
        >
          <Title meet={meet} currentUserId={currentUserId} />
          <Body
            meet={meet}
            isCurator={isCurator}
            isSelectedDayDialog={isSelectedDayDialog}
          />
          {isSelectedDayDialog ? <Result meet={meet} /> : null}
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Meetings;
