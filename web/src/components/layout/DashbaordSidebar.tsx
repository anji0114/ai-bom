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
import { Add, Chat, Dashboard, ListAlt } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAtom, useAtomValue } from "jotai";
import { currentProductAtom, setStoredProductId } from "@/atoms/productAtoms";
import { Product } from "@/gql/graphql";
import { FragmentType, graphql, useFragment } from "@/gql";
import { getRelativeTime } from "@/lib/date";
import { FC } from "react";

const ICON_SIDEBAR_WIDTH = 240;

const fragment = graphql(`
  fragment DashbardSidebarFragment on Product {
    id
    name
    description
    content
    createdAt
    updatedAt
    userId
  }
`);

type Props = {
  products: FragmentType<typeof fragment>[];
};

export const DashbaordSidebar: FC<Props> = ({ products: _products }) => {
  const products = useFragment(fragment, _products);
  const [currentProduct, setCurrentProduct] = useAtom(currentProductAtom);

  const handleSelectProduct = (product: Product) => {
    setCurrentProduct(product);
    setStoredProductId(product.id);
  };

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
          <List sx={{ py: 2 }}>
            {products.map((product) => (
              <ListItem
                key={product.id}
                disablePadding
                sx={{ mb: 1, display: "flex", justifyContent: "center" }}
              >
                <Tooltip title={product.name} placement="right">
                  <ButtonBase
                    onClick={() => handleSelectProduct(product)}
                    sx={{
                      border:
                        currentProduct?.id === product.id
                          ? "2px solid #fff"
                          : "2px solid transparent",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                    >
                      {product.name.charAt(0)}
                    </Avatar>
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
    label: "機能一覧",
    href: "/dashboard/features",
    icon: <ListAlt />,
  },
  {
    label: "VoC一覧",
    href: "/dashboard/voc",
    icon: <Chat />,
  },
];

const DashboardSidebarMenu = () => {
  const pathname = usePathname();
  const currentProduct = useAtomValue(currentProductAtom);

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
          {currentProduct?.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          最終更新:{" "}
          {currentProduct?.updatedAt
            ? getRelativeTime(currentProduct.updatedAt)
            : ""}
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
              component={Link}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
