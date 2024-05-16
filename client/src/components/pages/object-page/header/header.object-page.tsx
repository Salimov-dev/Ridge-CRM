import { Dispatch, FC, SetStateAction } from "react";
import { Box, Typography, styled } from "@mui/material";
// components
import ObjectName from "./components/object-name";
import ButtonsPanelObjectPage from "../buttons-panel/buttons-panel.object-page";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface HeaderObjectPageProps {
  object: IObject | null;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled(Box)`
  display: flex;
  gap: 8px;
`;

const HeaderObjectPage: FC<HeaderObjectPageProps> = ({
  object,
  setState
}): JSX.Element => {
  const city = object?.city;
  const address = object?.address;

  return (
    <HeaderContainer>
      <Title>
        <Typography variant="h2">Объект: </Typography>
        <ObjectName city={city} address={address} />
      </Title>
      <ButtonsPanelObjectPage
        object={object}
        setState={setState}
        hasAddPresentationButton={false}
        hasCloudButton={false}
      />
    </HeaderContainer>
  );
};

export default HeaderObjectPage;
