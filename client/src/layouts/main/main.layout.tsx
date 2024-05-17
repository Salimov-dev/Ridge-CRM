import "dayjs/locale/ru";
import React, { useState } from "react";
import { Box, styled } from "@mui/material";
// components
import { ContainerStyled } from "@components/common/container/container-styled";
import LogoMainLayout from "./components/logo.main-layout";
import RightSideMainLayout from "./components/right-side.main-layout";
import LeftSideMainLayout from "./components/left-side.main-layout";
import BackgroundBottomImageMainLayout from "./components/background-bottom-image.main-layout";
// dialogs
import DialogPages from "@dialogs/dialog-pages";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// initial-states
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";

const ContentContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
`;

const MainLayout = React.memo(() => {
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  return (
    <ContainerStyled>
      <LogoMainLayout />
      <ContentContainer
        sx={{ flexDirection: { xs: "column", md: "column", lg: "row" } }}
      >
        <LeftSideMainLayout setState={setStateDialogPages} />
        <RightSideMainLayout />
      </ContentContainer>
      <BackgroundBottomImageMainLayout />
      <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
    </ContainerStyled>
  );
});

export default MainLayout;
