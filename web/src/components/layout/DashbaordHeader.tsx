"use client";

import { currentProductAtom } from "@/atoms/productAtoms";
import { VocCreateModal } from "@/features/dashbaord/components/VocCreateModal";
import { robotoFonts } from "@/lib/theme";
import { AppBar, Box, Button, Grid, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const DashbaordHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentProduct = useAtomValue(currentProductAtom);

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
        height="48px"
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

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setIsModalOpen(true)}
        >
          VOCを追加する
        </Button>
      </Grid>
      {currentProduct?.id && (
        <VocCreateModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productId={currentProduct?.id}
        />
      )}
    </AppBar>
  );
};
