// libraries
import { Box, styled } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ButtonsBlock from "./components/buttons-block";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import {
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../store/meetings.store";
import { groupedColumns } from "./table/columns";
import Loader from "../../components/common/loader/loader";
import Map from "./components/map";

const Meetings = () => {
  const meetings = useSelector(getMeetingsList());
  const isLoading = useSelector(getMeetingLoadingStatus());
  const columns = groupedColumns;
  // console.log("meetings", meetings);

  const MapContainer = styled(Box)`
    width: 100%;
    height: 250px;
    margin-bottom: 10px;
    background-color: gray;
  `;
  
  return (
    <Box>
      <LayoutTitle title="Встречи" />
      <ButtonsBlock />
      <MapContainer>
        {!isLoading ? (
          <Map searchedMeetings={meetings} />
        ) : (
          <Loader />
        )}
      </MapContainer>
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
