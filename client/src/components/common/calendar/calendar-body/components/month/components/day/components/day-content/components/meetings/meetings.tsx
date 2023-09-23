import Title from "./components/title";
import Body from "./components/body";
import { ItemContainer, ItemsContainer } from "../styled/styled";
import Loader from "../../../../../../../../../../loader/loader";
import Result from "./components/result";

const Meetings = ({ meetings, currentUserId }) => {

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
          <Body meet={meet}/>
          <Result meet={meet} />
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Meetings;
