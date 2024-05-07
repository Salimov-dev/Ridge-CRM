import React, { Dispatch, FC, SetStateAction } from "react";
import { Box, styled } from "@mui/material";
// components
import ButtonsPresentationBalloon from "./components/buttons.presentation-balloon";
import FirstSectionPresentationBalloon from "./components/first-section.presentation-balloon";
import SecondSectionPresentationBalloon from "./components/second-section.presentation-balloon";
// interfaces
import { IPresentationDialogsState } from "@interfaces/presentation/presentation.interfaces";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

interface PresentationBalloonProps {
  presentationId: string;
  setState: Dispatch<SetStateAction<IPresentationDialogsState>>;
}

const PresentationBalloon: FC<PresentationBalloonProps> = React.memo(
  ({ presentationId, setState }) => {
    return (
      <BaloonContainer>
        <FirstSectionPresentationBalloon presentationId={presentationId} />
        <SecondSectionPresentationBalloon presentationId={presentationId} />
        <ButtonsPresentationBalloon
          presentationId={presentationId}
          setState={setState}
        />
      </BaloonContainer>
    );
  }
);

export default PresentationBalloon;
