import Title from "./components/title";
import Body from "./components/body";
import { ItemContainer, ItemsContainer } from "../styled/styled";
import Loader from "../../../../../../../../../components/common/loader/loader";

const Meetings = ({ meeting, isCurrentDay, isFutureDay }) => {
  return meeting ? (
    <ItemsContainer>
      {meeting?.map((meet) => (
        <ItemContainer
          key={meet._id}
          sx={{
            background: isCurrentDay
              ? !meet?.isDone
                ? "blue"
                : "gray"
              : isFutureDay
              ? !meet?.isDone
                ? "blue"
                : "gray"
              : "gray",
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
