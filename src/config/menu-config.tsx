import { JSX } from "react";
import { layoutPrivateStyle } from "../style/layout/private-route";
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';

export interface ListItem {
  name: string;
  icon: JSX.Element;
  link: string;
  key: string;
  collapseList?: ListItem[];
}

export const sidebarMenu: ListItem[] = [
  {
    name: "Menu",
    icon: <MenuIcon sx={layoutPrivateStyle.sideSubMenuIcon} />,
    link: "/menu",
    key: "Menu",
    collapseList: [
      {
        name: "Data Rekening",
        icon: <DescriptionIcon sx={layoutPrivateStyle.sideMenuIcon}/>,
        link: "/menu/data-rekening",
        key: "Data Rekening",
      },
      {
        name: "Transfer",
        icon: <SendIcon sx={layoutPrivateStyle.sideMenuIcon} />,
        link: "/menu/transfer",
        key: "Transfer",
      },
      {
        name: "Transaksi",
        icon: <ReceiptIcon sx={layoutPrivateStyle.sideMenuIcon} />,
        link: "/menu/transaksi",
        key: "Transaksi",
      },
    ],
    
  },
];