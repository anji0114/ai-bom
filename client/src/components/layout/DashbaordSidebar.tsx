"use client";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  FilterCenterFocus,
  Fitbit,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Settings,
  ViewInAr,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC, useState } from "react";
import Image from "next/image";

const EXPANDED_SIDEBAR_WIDTH = 140;
const COLLAPSED_SIDEBAR_WIDTH = 64;

const MENU_ITEMS = [
  {
    label: "製品一覧",
    href: "/items",
    icon: <ViewInAr />,
  },
  {
    label: "E-BOM",
    href: "/e-bom",
    icon: <Fitbit />,
  },
  {
    label: "M-BOM",
    href: "/m-bom",
    icon: <FilterCenterFocus />,
  },
];

export const DashbaordSidebar: FC = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const sidebarWidth = isExpanded
    ? EXPANDED_SIDEBAR_WIDTH
    : COLLAPSED_SIDEBAR_WIDTH;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        transition: "width 0.3s",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: sidebarWidth,
          px: 1,
          py: 3,
          backgroundColor: (theme) => theme.palette.grey[100],
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "width 0.3s",
          overflow: "hidden",
        }}
      >
        <Box>
          <Box
            sx={{
              px: 0.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isExpanded && (
              <Box sx={{ flex: 1, pt: "5px" }}>
                <Link href="/items">
                  <Image src="/logo.svg" alt="AI-BOM" width={24} height={24} />
                </Link>
              </Box>
            )}
            <IconButton
              onClick={() => setIsExpanded(!isExpanded)}
              size="small"
              sx={{ width: 24, height: 24 }}
            >
              {isExpanded ? (
                <KeyboardDoubleArrowLeft fontSize="small" />
              ) : (
                <KeyboardDoubleArrowRight fontSize="small" />
              )}
            </IconButton>
          </Box>
          <List sx={{ mt: 3 }}>
            {MENU_ITEMS.map((item) => (
              <ListItem disablePadding key={item.label}>
                <Tooltip
                  title={!isExpanded ? item.label : ""}
                  placement="right"
                >
                  <SidebarButton
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    isExpanded={isExpanded}
                    pathname={pathname}
                  />
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: isExpanded ? "flex-start" : "center",
          }}
        >
          <Tooltip title={!isExpanded ? "設定" : ""} placement="right">
            <IconButton>
              <Settings />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Drawer>
  );
};

type SidebarButtonProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  pathname: string;
};

const SidebarButton = ({
  href,
  label,
  icon,
  isExpanded,
  pathname,
}: SidebarButtonProps) => {
  return (
    <Button
      href={href}
      variant="text"
      fullWidth
      sx={{
        color: (theme) => theme.palette.text.primary,
        justifyContent: isExpanded ? "flex-start" : "center",
        backgroundColor: pathname.startsWith(href) ? "white" : undefined,
        border: (theme) =>
          pathname.startsWith(href)
            ? `1px solid ${theme.palette.grey[300]}`
            : `1px solid transparent`,
        minWidth: 0,
        px: isExpanded ? 2 : 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
      startIcon={isExpanded ? icon : undefined}
      component={Link}
    >
      {isExpanded ? label : icon}
    </Button>
  );
};
