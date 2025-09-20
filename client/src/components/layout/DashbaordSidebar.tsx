import { Box, Button, Drawer, IconButton, List, ListItem } from "@mui/material";
import { Chat, Dashboard, ListAlt, Settings } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";

const ICON_SIDEBAR_WIDTH = 180;

const MENU_ITEMS = [
  {
    label: "ダッシュボード",
    href: "/dashboard",
    icon: <Dashboard />,
  },
  {
    label: "機能一覧",
    href: "/dashboard/features",
    icon: <ListAlt />,
  },
  {
    label: "要望・要求一覧",
    href: "/dashboard/voicing",
    icon: <Chat />,
  },
];

export const DashbaordSidebar: FC = () => {
  const pathname = usePathname();

  return (
    <Drawer variant="permanent" sx={{ width: ICON_SIDEBAR_WIDTH }}>
      <Box
        sx={{
          height: "100%",
          width: ICON_SIDEBAR_WIDTH,
          px: 1,
          py: 3,
          backgroundColor: (theme) => theme.palette.grey[100],
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ px: 0.5 }}>
            <Link
              href="/dashboard"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Image src="/logo.svg" alt="logo" width={99} height={27} />
            </Link>
          </Box>
          <List sx={{ mt: 3 }}>
            {MENU_ITEMS.map((item) => (
              <ListItem disablePadding key={item.label}>
                <Button
                  href={item.href}
                  variant="text"
                  fullWidth
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    justifyContent: "flex-start",
                    backgroundColor:
                      item.href === pathname ? "white" : undefined,
                    border: (theme) =>
                      item.href === pathname
                        ? `1px solid ${theme.palette.grey[300]}`
                        : undefined,
                  }}
                  startIcon={item.icon}
                  component={Link}
                >
                  {item.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <IconButton>
            <Settings />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};
