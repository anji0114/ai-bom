"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";

type CreateItemDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; kind: string }) => void;
  loading?: boolean;
};

export const CreateItemDialog: FC<CreateItemDialogProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !kind.trim()) {
      return;
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      kind: kind.trim(),
    });

    // Reset form
    setName("");
    setDescription("");
    setKind("");
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setKind("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>新規アイテム作成</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="アイテム名"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
          <InputLabel id="kind-select-label">種類</InputLabel>
          <Select
            labelId="kind-select-label"
            id="kind-select"
            value={kind}
            label="種類"
            onChange={(e) => setKind(e.target.value)}
            required
          >
            <MenuItem value="部品">部品</MenuItem>
            <MenuItem value="アセンブリ">アセンブリ</MenuItem>
            <MenuItem value="単品">単品</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="説明"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={loading}>
          キャンセル
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!name.trim() || !kind.trim() || loading}
        >
          {loading ? "作成中..." : "作成"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
