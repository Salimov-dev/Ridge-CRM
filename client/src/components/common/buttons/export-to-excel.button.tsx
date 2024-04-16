import { Box, Typography, styled } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { exportToExcel } from "@utils/exel/export-to-excel";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  alignitems: center;
  justify-content: end;
  gap: 4px;
  cursor: pointer;
  margintop: 3px;
  &:hover {
    color: yellow;
  }
`;

const ExportToExelButton = ({ title, data }) => {
  return (
    <Component onClick={() => exportToExcel(data)}>
      <Typography>{title}</Typography>
      <DownloadIcon />
    </Component>
  );
};

export default ExportToExelButton;
