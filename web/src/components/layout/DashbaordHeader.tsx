import { robotoFonts } from "@/lib/theme";
import { AppBar, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";
import { DashbaordUserMenu } from "./DashbaordUserMenu";

export const DashbaordHeader = () => {
  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: "none",
        backgroundColor: (theme) => theme.palette.grey[900],
      })}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        pr={4}
        pl={1.5}
        py="2px"
      >
        <Grid display="flex" alignItems="center" gap={0.5}>
          <Link href="/dashboard">
            <Image src="/logo.png" width={24} height={22} alt="pdm agent" />
          </Link>
          <Typography
            variant="caption"
            color="white"
            component="span"
            fontWeight={700}
            fontFamily={robotoFonts}
          >
            PDM AGENT
          </Typography>
        </Grid>
        <DashbaordUserMenu />
      </Grid>
    </AppBar>
  );
};
