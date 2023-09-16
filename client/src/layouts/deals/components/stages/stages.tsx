import { Box, Paper, styled } from "@mui/material";
import DividerStyled from "../../../../components/common/divider/divider-styled";
import Title from "./components/title";
import Objects from "./components/objects";
import CreateDealButton from "./components/add-object-to-deal-button";

const DealsContainer = styled(Box)`
  display: flex;
  height: 550px;
  justify-content: start;
  gap: 20px;
  overflow-x: scroll;
  padding-bottom: 20px;
`;

const DealContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  color: black;
  background: inherit;
  border: 2px dashed gray;
  padding: 20px;
`;

const Stages = ({ deals, dealStages, userName, onOpen, getObjectAddress }) => {
  return (
    <DealsContainer>
      {dealStages?.map((item) => (
        <DealContainer key={item._id}>
          <Title item={item} />
          <DividerStyled margin="12px 0 20px 0" />
          <Objects
            deals={deals}
            item={item}
            getObjectAddress={getObjectAddress}
            userName={userName}
          />
          <CreateDealButton item={item} onOpen={onOpen} />
        </DealContainer>
      ))}
    </DealsContainer>
  );
};

export default Stages;
