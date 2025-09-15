import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Drawer,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  Analytics,
  Chat,
  Dashboard,
  ListAlt,
  Map,
  Settings,
} from "@mui/icons-material";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ICON_SIDEBAR_WIDTH = 240;

const products = [
  {
    id: "inventory",
    name: "プロジェクトA",
  },
  {
    id: "orders",
    name: "プロジェクトB",
  },
];

export const DashbaordSidebar = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{ width: ICON_SIDEBAR_WIDTH, borderRight: "none" }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: ICON_SIDEBAR_WIDTH,
          backgroundColor: (theme) => theme.palette.grey[900],
        }}
      >
        <Box
          sx={{
            px: 1,
            pt: "46px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <List sx={{ px: 1, py: 2 }}>
            {products.map((product) => (
              <ListItem
                key={product.id}
                disablePadding
                sx={{ mb: 1, display: "flex", justifyContent: "center" }}
              >
                <Tooltip title={product.name} placement="right">
                  <ButtonBase onClick={() => setSelectedProduct(product.id)}>
                    <Avatar src={"/icon.png"} sx={{ width: 32, height: 32 }} />
                  </ButtonBase>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <IconButton
            size="small"
            sx={{
              color: (theme) => theme.palette.common.white,
              border: (theme) => `1px dashed ${theme.palette.common.white}`,
            }}
            href="/dashboard/products/new"
            component={Link}
          >
            <Add />
          </IconButton>
        </Box>
        <DashboardSidebarMenu />
      </Box>
    </Drawer>
  );
};

const MENU_ITEMS = [
  {
    label: "ダッシュボード",
    href: "/dashboard",
    icon: <Dashboard />,
  },
  {
    label: "AI分析",
    href: "/dashboard/ai-analysis",
    icon: <Analytics />,
  },
  {
    label: "機能一覧",
    href: "/dashboard/features",
    icon: <ListAlt />,
  },
  {
    label: "VoC一覧",
    href: "/dashboard/voc",
    icon: <Chat />,
  },
  {
    label: "ロードマップ",
    href: "/dashboard/roadmap",
    icon: <Map />,
  },
  {
    label: "設定",
    href: "/dashboard/settings",
    icon: <Settings />,
  },
];

const DashboardSidebarMenu = () => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        flex: 1,
        mt: "48px",
        backgroundColor: (theme) => theme.palette.grey[50],
        borderTopLeftRadius: 8,
      }}
    >
      <Box
        sx={{
          py: 2,
          px: 1,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body2" fontWeight={700}>
          プロジェクトA
        </Typography>
        <Typography variant="caption" color="text.secondary">
          最終更新: 2025/09/15
        </Typography>
      </Box>
      <List sx={{ px: 1, py: 2 }}>
        {MENU_ITEMS.map((item) => (
          <ListItem disablePadding key={item.label}>
            <Button
              href={item.href}
              variant="text"
              fullWidth
              sx={{
                color: (theme) => theme.palette.text.primary,
                justifyContent: "flex-start",
                backgroundColor: (theme) =>
                  item.href === pathname ? theme.palette.grey[200] : undefined,
              }}
              startIcon={item.icon}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
