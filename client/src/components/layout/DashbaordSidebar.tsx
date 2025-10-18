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
  ChevronLeft,
  ChevronRight,
  FilterCenterFocus,
  Fitbit,
  Settings,
  ViewInAr,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC, useState } from "react";

const EXPANDED_SIDEBAR_WIDTH = 180;
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
              <Typography
                variant="h6"
                component={Link}
                href="/items"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  mr: "auto",
                }}
              >
                AI-BOM
              </Typography>
            )}
            <IconButton onClick={() => setIsExpanded(!isExpanded)} size="small">
              {isExpanded ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Box>
          <List sx={{ mt: 3 }}>
            {MENU_ITEMS.map((item) => (
              <ListItem disablePadding key={item.label}>
                <Tooltip
                  title={!isExpanded ? item.label : ""}
                  placement="right"
                >
                  <Button
                    href={item.href}
                    variant="text"
                    fullWidth
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      justifyContent: isExpanded ? "flex-start" : "center",
                      backgroundColor: pathname.startsWith(item.href)
                        ? "white"
                        : undefined,
                      border: (theme) =>
                        pathname.startsWith(item.href)
                          ? `1px solid ${theme.palette.grey[300]}`
                          : `1px solid transparent`,
                      minWidth: 0,
                      px: isExpanded ? 2 : 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                    startIcon={isExpanded ? item.icon : undefined}
                    component={Link}
                  >
                    {isExpanded ? item.label : item.icon}
                  </Button>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
