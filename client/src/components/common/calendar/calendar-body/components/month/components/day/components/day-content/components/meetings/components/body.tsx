import { useSelector } from "react-redux";
import { getObjectsList } from "../../../../../../../../../../../../../store/object/objects.store";
import MeetingObject from "./meeting-object";
import MeetingInfo from "./meeting-info";

const Body = ({ meet, isSelectedDayDialog }) => {
  const objects = useSelector(getObjectsList());

  return (
    <>
      {isSelectedDayDialog ? <MeetingInfo meet={meet} /> : null}
      <MeetingObject objects={objects} meet={meet} />
    </>
  );
};

export default Body;
