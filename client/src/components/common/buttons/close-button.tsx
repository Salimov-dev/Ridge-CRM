import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ onClose }) => {
  return (
    <CloseIcon
      onClick={onClose}
      sx={{
        width: "30px",
        height: "30px",
        cursor: "pointer",
        color: "gray",
        transition: "color 0.2s ease",
        "&:hover": { color: "white" },
      }}
    />
  );
};

export default CloseButton;
