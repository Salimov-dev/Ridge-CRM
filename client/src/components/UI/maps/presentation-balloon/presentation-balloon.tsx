import React, { Dispatch, FC, SetStateAction } from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import ButtonsPresentationBalloon from "./components/buttons.presentation-balloon";
import FirstSectionPresentationBalloon from "./components/first-section.presentation-balloon";
import SecondSectionPresentationBalloon from "./components/second-section.presentation-balloon";
import Loader from "@components/common/loader/loader";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { getPresentationsLoadingStatus } from "@store/presentation/presentations.store";

interface PresentationBalloonProps {
  presentationId: string;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const PresentationBalloon: FC<PresentationBalloonProps> = React.memo(
  ({ presentationId, setState }) => {
    const isLoading = useSelector(getPresentationsLoadingStatus());

    return !isLoading ? (
      <BaloonContainer>
        <FirstSectionPresentationBalloon presentationId={presentationId} />
        <SecondSectionPresentationBalloon presentationId={presentationId} />
        <ButtonsPresentationBalloon
          presentationId={presentationId}
          setState={setState}
        />
      </BaloonContainer>
    ) : (
      <Loader color="darkOrange" height="140px" />
    );
  }
);

export default PresentationBalloon;
