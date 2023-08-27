import { Box, Button, styled } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const FooterButtons = ({isEditMode, isValid, onClick}) => {
    return ( <Component>
        <Button
          type="submit"
          variant="outlined"
          color="success"
          disabled={isValid}
        >
          {isEditMode ? "Сохранить" : "Создать"}
        </Button>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={onClick}
          >
            Отмена
          </Button>
        </Box>
      </Component> );
}
 
export default FooterButtons;