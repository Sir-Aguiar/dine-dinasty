import React, { useState } from "react";
import "./Profile.css";
import { SxProps, Tab, Tabs } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import { Theme } from "@emotion/react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LogoutIcon from "@mui/icons-material/Logout";
import UserInfo from "../../components/Profile/Pages/UserInfo/UserInfo";
import Posts from "../../components/Profile/Pages/Posts/Posts";
import History from "../../components/Profile/Pages/History/History";
import UseSettings from "../../components/Profile/Pages/UseSettings/UseSettings";

const commonTabStyle = {
  alignItems: "center",
  justifyContent: "start",
  minWidth: "236px",
  textTransform: "none",
};

const innerTabStyle = {
  paddingLeft: "32px",
  fontSize: "13px",
};

interface AsideTabsProps {
  label: string;
  icon?: string | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  iconPosition?: "bottom" | "top" | "end" | "start";
  sx?: SxProps<Theme>;
}

const AsideTabs: AsideTabsProps[] = [
  {
    label: "Informações de usuário",
    icon: <AccountCircleIcon />,
    iconPosition: "start",
    sx: { ...commonTabStyle },
  },
  {
    label: "Meus posts",
    icon: <LocalPostOfficeIcon />,
    iconPosition: "start",
    sx: { ...commonTabStyle },
  },
  {
    label: "Upvotes",
    icon: <ThumbUpIcon />,
    iconPosition: "start",
    sx: { ...commonTabStyle, ...innerTabStyle },
  },
  {
    label: "Downvotes",
    icon: <ThumbDownIcon />,
    iconPosition: "start",
    sx: { ...commonTabStyle, ...innerTabStyle },
  },
  {
    label: "Salvos",
    icon: <BookmarksIcon />,
    iconPosition: "start",
    sx: { ...commonTabStyle, ...innerTabStyle },
  },

  {
    label: "Histórico",
    icon: <HistoryIcon />,
    iconPosition: "start",
    sx: { ...commonTabStyle },
  },
  {
    label: "Configurações de Uso",
    icon: <SettingsIcon />,
    iconPosition: "start",
    sx: { ...commonTabStyle },
  },
  {
    label: "Desconectar",
    icon: <LogoutIcon />,
    iconPosition: "end",
    sx: { ...commonTabStyle, color: "#FF974D", alignItems: "center", justifyContent: "space-between" },
  },
];

const Profile: React.FC = () => {
  const [tabSection, setTabSection] = useState(0);
  const handleTabChange = (e: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setTabSection(newValue);
  };

  return (
    <div className="profile-container">
      <aside className="sections-aside">
        <Tabs value={tabSection} onChange={handleTabChange} orientation="vertical">
          {AsideTabs.map((props) => (
            <Tab {...props} />
          ))}
        </Tabs>
      </aside>
      {tabSection === 0 && <UserInfo />}
      {tabSection === 1 && <Posts />}
      {tabSection === 5 && <History />}
      {tabSection === 6 && <UseSettings />}
    </div>
  );
};

export default Profile;
