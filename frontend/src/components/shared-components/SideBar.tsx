import {
  Box,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import TodayIcon from "@mui/icons-material/Today"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import FlagIcon from "@mui/icons-material/Flag"
import DashboardIcon from "@mui/icons-material/Dashboard"
import { Link } from "react-router-dom"

const NavigationTab = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  height: "64px",
  borderRadius: "0 40% 40% 0",
  display: "flex",
  width: "40px",
  transition: "width ease-in-out .2s",
  svg: {
    width: "28px",
    transition: "width ease-in-out .2s",
  },
  ":hover": {
    width: "50px",
    svg: {
      width: "45px",
    },
  },
}))

const NavigationTabBase = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: "12px",
  height: "72px",
}))

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} enterDelay={500} classes={{ popper: className }} />
))(({ theme }) => ({
  [`.${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    fontSize: 18,
  },
}))

const SideBar: React.FC = () => {
  const navItems = [
    {
      link: "/",
      title: "Dashboard",
      icon: <DashboardIcon sx={{ marginX: "auto" }} />,
    },
    {
      link: "/today",
      title: "Today's Entry",
      icon: <TodayIcon />,
    },
    {
      link: "/goals",
      title: "Goals",
      icon: <FlagIcon />,
    },
    {
      link: "/entries",
      title: "Entries List",
      icon: <FormatListBulletedIcon />,
    },
    {
      link: "/journal",
      title: "Journal",
      icon: <MenuBookIcon />,
    },
  ]

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{
        position: "fixed",
        height: window.innerHeight,
        margin: `${window.innerHeight / 6}px 0`,
      }}
      gap={"20px"}
    >
      {navItems.map((item) => (
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          key={item.title}
        >
          <NavigationTabBase />
          <NavigationTab>
            <Link
              to={item.link}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textDecoration: "None",
                gap: "10px",
                color: "#fffcf5",
                margin: "5px",
              }}
            >
              {item.icon}
            </Link>
          </NavigationTab>
        </Box>
      ))}
    </Box>
  )
}

export default SideBar
