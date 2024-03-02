import { Box, Tab, Tabs } from "@mui/material";

const TabsStyled = ({ tabs, value, onChange }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "30px" }}
      >
        <Tabs
          value={value}
          onChange={onChange}
          aria-label="tabs"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "yellow",
              height: 3
            },
            "& .MuiTab-root.Mui-selected": {
              color: "yellow"
            }
          }}
        >
          {tabs?.map((tab, index) => (
            <Tab key={index} label={tab.label} sx={{ color: "white" }} />
          ))}
        </Tabs>
      </Box>
      {tabs?.map((tab, index) => (
        <Box key={index} hidden={value !== index}>
          {tab.component}
        </Box>
      ))}
    </Box>
  );
};

export default TabsStyled;
