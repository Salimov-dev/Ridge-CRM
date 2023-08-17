// libraries
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ButtonsBlock from "./components/buttons-block";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import { getMeetingLoadingStatus, getMeetingsList } from "../../store/meetings.store";
import { groupedColumns } from "./table/columns";

const Meetings = () => {
  const meetings = useSelector(getMeetingsList())
  const isLoading = useSelector(getMeetingLoadingStatus())
  const columns = groupedColumns
  // console.log("meetings", meetings);
  
  return (
    <Box>
      <LayoutTitle title="Встречи"/>
      <ButtonsBlock/>
      <BasicTable
        items={meetings}
        itemsColumns={columns}
        isLoading={isLoading}
        sortingColumn="date"
      />
    </Box>
  );
};

export default Meetings;
