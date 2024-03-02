import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ButtonStyled from "../button-styled.button";

const DeleteElementIcon = ({ onClick }) => {
  return (
    <ButtonStyled
      title={null}
      style="DELETE_ICON"
      padding="0"
      height="100%"
      icon={
        <HighlightOffOutlinedIcon
          sx={{
            height: "100%",
            width: "26px",
            color: "IndianRed",
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
