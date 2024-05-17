import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
// components
import LastContacts from "./components/last-contacts";
import ObjectMeetings from "./components/object-meetings";
import ObjectTasks from "./components/object-tasks";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { IObject } from "@interfaces/object/object.interface";

interface AcitivtyObjectPageProps {
  object: IObject | null;
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const AcitivtyObjectPage: FC<AcitivtyObjectPageProps> = ({
  object,
  state,
  setState
}): JSX.Element => {
  return (
    <Component>
      <ObjectTasks object={object} state={state} setState={setState} />
      <ObjectMeetings object={object} state={state} setState={setState} />
      <LastContacts object={object} setState={setState} />
    </Component>
  );
};

export default AcitivtyObjectPage;
