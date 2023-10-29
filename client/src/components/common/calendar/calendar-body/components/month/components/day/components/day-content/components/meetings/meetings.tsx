import Title from "./components/title";
import Body from "./components/body";
import { ItemContainer, ItemsContainer } from "../styled/styled";
import Loader from "../../../../../../../../../../loader/loader";
import Result from "./components/result";

const Meetings = ({ meetings, currentUserId, isSelectedDayDialog }) => {

  return meetings ? (
    <ItemsContainer>
      {meetings?.map((meet) => (
        <ItemContainer
          key={meet._id}
          sx={{
            border: "3px solid RoyalBlue",
            color: "GhostWhite",
            background: !meet?.isDone ? "RoyalBlue" : "gray",
          }}
        >
          <Title meet={meet} currentUserId={currentUserId}/>
          <Body meet={meet} isSelectedDayDialog={isSelectedDayDialog}/>
          {isSelectedDayDialog ? <Result meet={meet} /> : null}
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Meetings;
