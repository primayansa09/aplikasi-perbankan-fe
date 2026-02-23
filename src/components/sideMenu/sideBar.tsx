import { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Box,
  IconButton,
  Stack,
  Divider,
  Typography,
  MenuItem,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarMenu, ListItem } from "../../config/menu-config";
import MenuIcon from "@mui/icons-material/Menu";
import { layoutPrivateStyle } from "../../style/layout/private-route";
import Avatar from "@mui/material/Avatar";
import { Menu } from "@mui/material";
import React from "react";
import logo from "../../assets/logo_bss.png"
import { useAppSelector } from "../../store/hooks";

const drawerWidth = 240;
const settings = ["Logout"];

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const theme = useTheme();
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const [openCollapse, setOpenCollapse] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [profileMenu, setProfileMenu] = useState(false);
  const fullName = useAppSelector((state) => state.auth.user?.fullName);
  const [greeting, setGreeting] = useState("");
  const hour = new Date().getHours();

  let getGreeting = "";

  if (hour >= 5 && hour < 11) {
    getGreeting = "Selamat Pagi";
  } else if (hour >= 11 && hour < 15) {
    getGreeting = "Selamat Siang";
  } else if (hour >= 15 && hour < 18) {
    getGreeting = "Selamat Sore";
  } else {
    getGreeting = "Selamat Malam";
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenu(true);
  };

  const handleClose = () => {
    setProfileMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("dataLogin");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    window.location.reload();
    handleClose();
  };

  const handleParentClick = (item: ListItem) => {
    if (item.collapseList && item.collapseList.length > 0) {
      setOpenCollapse(openCollapse === item.name ? null : item.name);
    } else {
      navigate(item.link);
    }
  };

  const handleChildClick = (link: string) => {
    navigate(link);
  };

  useEffect(() => {
    setGreeting(getGreeting);

    const interval = setInterval(() => {
      setGreeting(getGreeting);
    }, 60000)

    return () => clearInterval(interval);
  })

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "#FFFFFF", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)", }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2,
                  width: "25px",
                  height: "25px",
                  color: "black",
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ gap: { xs: "10px", sm: "16px" } }}
            >
              <Box
                component="img"
                src={logo}
                sx={layoutPrivateStyle.headerImg}
              />
              <Box sx={layoutPrivateStyle.headerDivider} />
              <Typography sx={layoutPrivateStyle.headerTypography}>
                Bank Sahabat Sampoerna
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" alignItems="center" gap="16px">
              <Typography sx={layoutPrivateStyle.headerTypography}>
                {greeting}, {fullName || ""}
              </Typography>
              <Avatar
                src="/static/images/avatar/2.jpg"
                sx={layoutPrivateStyle.headerAvatar}
                onClick={handleOpenUserMenu}
              />
            </Stack>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(profileMenu)}
              onClose={handleClose}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Logout") handleLogout();
                    else handleClose();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: layoutPrivateStyle.backgroundColor,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon sx={layoutPrivateStyle.drawerIcon} />
              ) : (
                <ChevronRightIcon sx={layoutPrivateStyle.drawerIcon} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {sidebarMenu.map((item) => {
              const isParentActive = location.pathname.startsWith(item.link);
              return (
                <React.Fragment key={item.key}>
                  <ListItemButton
                    onClick={() =>
                      item.collapseList
                        ? handleParentClick(item)
                        : handleChildClick(item.link)
                    }
                    sx={{
                      borderRadius: "10px",
                      mb: 0.5,
                      backgroundColor: isParentActive
                        ? "rgba(210, 145, 25, 0.08)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: isParentActive ? "#FEA405" : "#333",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: isParentActive ? 600 : 600,
                            color: isParentActive ? "#FEA405" : "#333",
                            fontSize: "14px",
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                    />
                    {item.collapseList &&
                      (openCollapse === item.name ? (
                        <ExpandLess sx={{ color: "#FEA405" }} />
                      ) : (
                        <ExpandMore sx={{ color: "#33333386" }} />
                      ))}
                  </ListItemButton>

                  {/* Submenu */}
                  {item.collapseList && (
                    <Collapse
                      in={openCollapse === item.name}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.collapseList.map((subItem) => {
                          const isSubActive =
                            location.pathname === subItem.link;
                          return (
                            <ListItemButton
                              key={subItem.key}
                              onClick={() => handleChildClick(subItem.link)}
                              sx={{
                                pl: 5,
                                borderRadius: "10px",
                                mb: 0.5,
                                backgroundColor: isSubActive
                                  ? "rgba(210, 145, 25, 0.08)"
                                  : "transparent",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                                },
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 32,
                                  color: isSubActive ? "#FEA405" : "#555",
                                }}
                              >
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography
                                    sx={{
                                      fontWeight: isSubActive ? 600 : 600,
                                      color: isSubActive ? "#FEA405" : "#333",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {subItem.name}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </>
  );
};

export default Sidebar;
