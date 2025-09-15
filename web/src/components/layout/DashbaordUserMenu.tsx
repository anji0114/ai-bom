import { useState } from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

export const DashbaordUserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { logout } = useLogout();
  const router = useRouter();

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            /* ログアウト処理 */
            logout({
              onCompleted: () => {
                handleClose();
                router.push("/");
              },
            });
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          ログアウト
        </MenuItem>
      </Menu>
    </>
  );
};
