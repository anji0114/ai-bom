"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

type BomType = "E" | "M";
type ItemKind = "Part" | "Assy" | "Process";

export const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Step 1: Item作成用のstate
  const [itemName, setItemName] = useState("");
  const [itemKind, setItemKind] = useState<ItemKind>("Part");
  const [itemDescription, setItemDescription] = useState("");

  // Step 2: Bom作成用のstate
  const [bomType, setBomType] = useState<BomType>("E");
  const [bomTitle, setBomTitle] = useState("");
  const [bomDescription, setBomDescription] = useState("");

  const steps = ["Root Itemを作成", "BOMを作成"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    // TODO: ここでAPI呼び出しを行う
    console.log("Item Data:", {
      name: itemName,
      kind: itemKind,
      description: itemDescription,
    });
    console.log("Bom Data:", {
      type: bomType,
      title: bomTitle,
      description: bomDescription,
    });
    alert("BOM作成完了（ロジックは未実装）");
  };

  const handleReset = () => {
    setActiveStep(0);
    setItemName("");
    setItemKind("Part");
    setItemDescription("");
    setBomType("E");
    setBomTitle("");
    setBomDescription("");
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        新規BOM作成
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Step 1: Root Itemを作成
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              BOMのルートとなるItemを作成します
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Item名"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                fullWidth
                required
              />

              <FormControl fullWidth required>
                <InputLabel>Item種別</InputLabel>
                <Select
                  value={itemKind}
                  label="Item種別"
                  onChange={(e) => setItemKind(e.target.value as ItemKind)}
                >
                  <MenuItem value="Part">Part（部品）</MenuItem>
                  <MenuItem value="Assy">Assy（アセンブリ）</MenuItem>
                  <MenuItem value="Process">Process（工程）</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="説明"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!itemName}
                >
                  次へ
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {activeStep === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Step 2: BOMを作成
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              作成したItem「{itemName}」をルートとするBOMを作成します
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <FormControl component="fieldset" required>
                <Typography variant="subtitle2" gutterBottom>
                  BOMタイプ
                </Typography>
                <RadioGroup
                  row
                  value={bomType}
                  onChange={(e) => setBomType(e.target.value as BomType)}
                >
                  <FormControlLabel
                    value="E"
                    control={<Radio />}
                    label="E-BOM（設計BOM）"
                  />
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="M-BOM（製造BOM）"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                label="BOMタイトル"
                value={bomTitle}
                onChange={(e) => setBomTitle(e.target.value)}
                fullWidth
                placeholder="例: 製品A Ver.1.0 設計BOM"
              />

              <TextField
                label="BOM説明"
                value={bomDescription}
                onChange={(e) => setBomDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                placeholder="このBOMの用途や注意事項など"
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={handleBack}>戻る</Button>
                <Button variant="contained" onClick={handleSubmit}>
                  BOMを作成
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {activeStep === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              完了
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              BOMの作成が完了しました
            </Typography>
            <Button variant="contained" onClick={handleReset}>
              新しいBOMを作成
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
