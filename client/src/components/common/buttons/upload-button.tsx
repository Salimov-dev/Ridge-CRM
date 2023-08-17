import { Button } from "@mui/material";
import { forwardRef } from "react";

const UploadButton = forwardRef(
  ({ onChange, color = "success", variant = "outlined" }, ref) => {
    return (
      <Button variant={variant} color={color} component="label">
        Загрузить
        <input type="file" ref={ref} onChange={onChange} hidden />
      </Button>
    );
  }
);

export default UploadButton;
