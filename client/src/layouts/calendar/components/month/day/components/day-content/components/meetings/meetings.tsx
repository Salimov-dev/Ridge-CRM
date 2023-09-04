import Title from "./components/title";
import Body from "./components/body";
import { ItemContainer, ItemsContainer } from "../styled/styled";
import Loader from "../../../../../../../../../components/common/loader/loader";

const Meetings = ({ meetings }) => {
  return meetings ? (
    <ItemsContainer>
      {meetings?.map((meet) => (
        <ItemContainer
          key={meet._id}
          sx={{
            background: !meet?.isDone ? "blue" : "gray",
          }}
        >
          <Title meet={meet} />
          <Body meet={meet} />
        </ItemContainer>
      ))}
    </ItemsContainer>
  ) : (
    <Loader />
  );
};

export default Meetings;
