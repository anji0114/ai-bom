// "use client";

// import {
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   TextField,
//   InputAdornment,
//   Table,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableBody,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";

// import { useState } from "react";
// import { VoiceCreateModal } from "./VoiceCreateModal";
// import { graphql, useFragment } from "@/gql";
// import { useQuery } from "@apollo/client/react";
// import { GetVoicingsDocument } from "@/gql/graphql";
// import { VoiceItem } from "./VoiceItem";
// import { DashbaordLayout } from "./layout/DashbaordLayout";

// graphql(`
//   query GetVoicings {
//     getVoicings {
//       ...VoicingConnection
//     }
//   }
// `);

// const voicingConnectionFragment = graphql(`
//   fragment VoicingConnection on VoicingConnection {
//     data {
//       id
//       ...VoiceInfo
//     }
//     total
//   }
// `);

// export const Dashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { data } = useQuery(GetVoicingsDocument);
//   const voicingConnection = useFragment(
//     voicingConnectionFragment,
//     data?.getVoicings
//   );

//   return (
//     <DashbaordLayout>
//       {/* メインコンテンツ */}
//       <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default" }}>
//         <Typography variant="h5" fontWeight={700} sx={{ mb: 4 }}>
//           ダッシュボード
//         </Typography>

//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid size={12}>
//             <Card variant="outlined">
//               <CardContent
//                 sx={{ display: "flex", gap: 2, alignItems: "center" }}
//               >
//                 <Typography color="text.secondary" pt={0.5}>
//                   VoC総数
//                 </Typography>
//                 <Typography variant="h5">{voicingConnection?.total}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           {/* 他のサマリーカード（感情比率グラフなど）をここに追加 */}
//         </Grid>

//         {/* VoC一覧エリア */}
//         <Card variant="outlined">
//           <CardContent>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 2,
//               }}
//             >
//               <Typography variant="h6">顧客の声 (VoC) 一覧</Typography>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 VoCを追加
//               </Button>
//             </Box>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="キーワードで検索..."
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{ mb: 2 }}
//             />
//             {/* ここにタグや感情でのフィルタUIを配置 */}
//           </CardContent>

//           {/* VoC一覧テーブル */}
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>VoC要約</TableCell>
//                 <TableCell>タグ</TableCell>
//                 <TableCell>感情</TableCell>
//                 <TableCell>インパクト</TableCell>
//                 <TableCell>受信日</TableCell>
//               </TableRow>
//             </TableHead>
//             {voicingConnection?.data && (
//               <TableBody>
//                 {voicingConnection.data.map((voicing) => (
//                   <VoiceItem key={voicing.id} voicing={voicing} />
//                 ))}
//               </TableBody>
//             )}
//           </Table>
//         </Card>
//       </Box>

//       <VoiceCreateModal
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </DashbaordLayout>
//   );
// };
