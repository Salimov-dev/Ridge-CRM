import React, { Dispatch, FC, SetStateAction } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import Loader from "@components/common/loader/loader";
import FirstSectionObjectBalloon from "./components/first-section.object-balloon";
import SecondSectionObjectBalloon from "./components/second-section.object-balloon";
import ButtonsObjectBalloon from "./components/buttons.object-balloon";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import {
  getObjectById,
  getObjectsLoadingStatus
} from "@store/object/objects.store";

interface ObjectBalloonProps {
  objectId: string;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 20px 0;
`;

const ObjectBalloon: FC<ObjectBalloonProps> = React.memo(
  ({ objectId, setState }): JSX.Element => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const object = useSelector(getObjectById(objectId));
    const isLoading = useSelector(getObjectsLoadingStatus());

    return !isLoading ? (
      <BaloonContainer>
        <FirstSectionObjectBalloon object={object} />
        <SecondSectionObjectBalloon object={object} />
        <ButtonsObjectBalloon objectId={objectId} setState={setState} />
      </BaloonContainer>
    ) : (
      <Loader color={colors.grey[600]} height="85px" />
    );
  }
);

export default ObjectBalloon;
