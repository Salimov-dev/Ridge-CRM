// libraries
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ButtonsBlock from "./components/buttons-block";
import LayoutTitle from "../../components/common/page-titles/layout-title";

const Meetings = () => {
  return (
    <Box>
      <LayoutTitle title="Встречи"/>
      <ButtonsBlock/>
    </Box>
  );
};

export default Meetings;
