import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ButtonStyled from "../button-styled.button";

const DeleteElementIcon = ({ onClick, error, disabled = false }) => {
  return (
    <ButtonStyled
      title={null}
      style="DELETE_ICON"
      padding="0"
      variant="text"
      height="100%"
      disabled={disabled}
      margin={error ? "-19px -4px 0 -10px" : "-4px -4px 0 -10px"}
      backgroundHover={null}
      icon={
        <HighlightOffOutlinedIcon
          sx={{
            height: "100%",
            width: "26px",
            color: disabled ? "grey" : "IndianRed",
            marginRight: "-16px",
            "&:hover": {
              color: "red",
              width: "28px"
            }
          }}
        />
      }
      onClick={onClick}
    />
  );
};

export default DeleteElementIcon;
