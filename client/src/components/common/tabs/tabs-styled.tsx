import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

interface TabsStyledProps {
  tabs: {
    label: string;
    component: React.ReactNode;
  }[];
}

const TabsStyled = ({ tabs }: TabsStyledProps) => {
  const [value, setValue] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "30px" }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
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
