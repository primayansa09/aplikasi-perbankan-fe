import { SxProps, Theme } from "@mui/material";

import { SxStyle } from "../../types/style";

const sideMenuIcon: SxStyle = { fontSize: "18px"};

const sideSubMenuIcon: SxStyle = { fontSize: "18px"};

const sideMenuIconCollapse: SxStyle = {
  fontSize: { xs: "14px", sm: "18px" },
};

const manageTitleHeader: SxStyle = {
  color: "#333333",
  padding: "2px 10px",
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const manageTableContainer: SxStyle = {
  width: "100%",
  overflow: "hidden",
  color: "#D9D9D9",
  marginBottom: 2.5,
};

const moduleTableHead: SxStyle = {
  "& th": {
    backgroundColor: "rgba(111, 111, 111, 0.01)",
    padding: "16px ",
  },
};

const manageTableRow: SxStyle = {
  borderBottom: "1px solid ",
  "&:last-child td, &:last-child th": { border: 0 },
};

const manageTableCellHeader: SxStyle = {
  height: "20px",
  padding: "10px",
  fontWeight: "bold",
  color: "#333",
  fontSize: 13,
  borderBottom: "1px solid #E0E0E0",
  textAlign: "center",
};

const manageTableCell: SxStyle = {
  height: "20px",
  padding: "10px",
};

const manageTitleAction: SxStyle = {
  color: "#555555ff",
  fontSize: "8px",
};

const manageTableBodyNoBorder: SxStyle = {
  border: 0.5,
  borderLeft: 0,
  borderRight: 0,
};

// const manageColorTableHead: SxStyle = {
//   color: "#183B4E",
//   fontWeight: "bold",
// };

const manageBoldTitle: SxStyle = {
  textAlign: "center",
  color: "white",
  fontSize: "32px",
  fontWeight: "bold",
};

const buttonAdd = {
  background: "#F87B1B",
  fontSize: 12,
  width: 150,
  color: "white",
  border: "none",
  padding: "10px",
  marginBottom: "10px",
  marginTop: "5px",
  borderRadius: "20px",
  cursor: "pointer",
};

const buttonSubmit = {
  background: "#FEA405",
  fontSize: 12,
  width: 100,
  color: "white",
  border: "none",
  padding: "10px",
  marginBottom: "10px",
  marginTop: "5px",
  borderRadius: "5px",
  cursor: "pointer",
};

const buttonCancel = {
  background: "#E62727",
  fontSize: 12,
  width: 100,
  color: "white",
  border: "none",
  padding: "10px",
  marginBottom: "10px",
  marginTop: "5px",
  borderRadius: "5px",
  cursor: "pointer",
};

const manageSubTitle: SxProps<Theme> = {
  fontFamily: "Open Sans,sans-serif",
  fontSize: "14px",
  color: "#333333",
  letterSpacing: "0.12px",
};

const manageModal: SxProps<Theme> = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const header: SxStyle = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "#183B4E",
  width: "98%",
  height: "55px",
  padding: "0 16px",
  borderBottom: "1px solid #c8ced3",
  display: "flex",
  justifyContent: "center",
};

const headerContainer: SxStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "1280px",
};

const headerIcon: SxProps<Theme> = {
  width: "20px",
  height: "20px",
  objectFit: "cover",
  cursor: "pointer",
};

const headerImg: SxProps<Theme> = {
  height: "42px",
};

const headerDivider: SxProps<Theme> = {
  background: "black",
  width: "1px",
  height: "24px",
};

const headerTypography: SxProps<Theme> = {
  fontSize: "16px",
  // textTransform: "uppercase",
  color: "black",
};

const headerAvatar: SxProps<Theme> = {
  cursor: "pointer",
  width: "32px",
  height: "32px",
  objectFit: "cover",
};

const footer: SxProps<Theme> = {
  width: "100%",
  height: "3%",
  // minHeight: '55px',
  backgroundColor: "#fbfbfbfc",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  color: "black",
  fontFamily: '"Open Sans",sans-serif !important',
};

const fixHeader: SxProps<Theme> = {
  marginTop: 5,
  marginBottom: 3,
  width: "100%",
};

const backgroundColor: SxProps<Theme> = {
  color: "#FFFFFF",
};

const backgroundGeneral: SxProps<Theme> = {
  backgroundColor: "#fbfbfbfc",
};

const drawerIcon: SxProps<Theme> = {
  // color: "black",
  width: "35px",
  height: "35px",
};

const search: SxProps<Theme> = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  borderColor: "#fff",
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#bfbfbf",
    opacity: 1,
  },
};

const backgroundCard: SxProps<Theme> = {
  borderRadius: 3,
};

const paginationTheme: SxStyle = {
  mt: 2,
    display: "flex",
    justifyContent: "center",
    "& .MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#FFA500",
      color: "white",
      borderColor: "#FEA405",
      "&:hover": {
        backgroundColor: "#FF8C00",
      },
    }  
  }

export const layoutPrivateStyle = {
  backgroundColor,
  backgroundGeneral,
  backgroundCard,
  buttonAdd,
  buttonCancel,
  buttonSubmit,
  drawerIcon,
  footer,
  fixHeader,
  sideMenuIcon,
  sideSubMenuIcon,
  sideMenuIconCollapse,
  manageTitleHeader,
  manageTableContainer,
  manageTableBodyNoBorder,
  moduleTableHead,
  manageTableRow,
  manageTableCell,
  manageTableCellHeader,
  manageTitleAction,
  manageSubTitle,
  manageBoldTitle,
  manageModal,
  header,
  headerContainer,
  headerIcon,
  headerImg,
  headerDivider,
  headerTypography,
  headerAvatar,
  search,
  paginationTheme
};
