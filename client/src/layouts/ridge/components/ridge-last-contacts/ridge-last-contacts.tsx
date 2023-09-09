import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import DividerStyled from "../../../../components/common/divider/divider-styled";
import BasicTable from "../../../../components/common/table/basic-table";
import { getRidgeLastContactsLoadingStatus } from "../../../../store/ridge-last-contact/last-ridge-contact.store";
import { ridgeTastContactColumns } from "../../../../columns/ridge-last-contacts-columns/ridge-last-contact-columns";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RidgeLastContacts = ({ lastContacts, object, margin = "0", buttons }) => {
  const isLastContactsLoading = useSelector(getRidgeLastContactsLoadingStatus());
  const columns = ridgeTastContactColumns;
  const address = `${object?.location?.city}, ${object?.location?.address}`;

  return (
    <>
      <DividerStyled />
      <Container>
        <Typography variant="h3" sx={{ margin: margin }}>
          Последние контакты: {address}
        </Typography>
        {buttons}
      </Container>

      {lastContacts?.length ? (
        <BasicTable
          items={lastContacts}
          itemsColumns={columns}
          isLoading={isLastContactsLoading}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}
    </>
  );
};

export default RidgeLastContacts;
