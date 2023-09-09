import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import DividerStyled from "../../../../common/divider/divider-styled";
import BasicTable from "../../../../common/table/basic-table";
import { getLastContactsLoadingStatus } from "../../../../../store/last-contact/last-contact.store";
import { lastContactColumns } from "../../../../../columns/last-contacts-columns/last-contact-columns";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LastContacts = ({ lastContacts, object, margin = "0", buttons }) => {
  const isLastContactsLoading = useSelector(getLastContactsLoadingStatus());
  const columns = lastContactColumns;
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

export default LastContacts;
