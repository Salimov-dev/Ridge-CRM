import { useSelector } from "react-redux";
import { getObjectsList } from "../../../../../../../../../../../../../store/object/objects.store";
import MeetingObject from "./meeting-object";
import MeetingInfo from "./meeting-info";

const Body = ({ meet }) => {
  const objects = useSelector(getObjectsList());

  return (
    <>
      <MeetingInfo meet={meet} />
      <MeetingObject objects={objects} meet={meet} />
    </>
  );
};

export default Body;
