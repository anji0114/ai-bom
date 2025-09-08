import { FragmentType, graphql, useFragment } from "@/gql";
import { Chip, TableCell, TableRow } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const fragment = graphql(`
  fragment VoiceInfo on Voicing {
    id
    content
    source
    createdAt
    summary
    sentiment
    impactScore
    tags {
      id
      name
    }
  }
`);

type Props = {
  voicing: FragmentType<typeof fragment>;
};

export const VoiceItem = ({ voicing: _voicing }: Props) => {
  const voicing = useFragment(fragment, _voicing);
  const renderSentiment = () => {
    switch (voicing.sentiment) {
      case "POSITIVE":
        return <SentimentSatisfiedAltIcon color="success" />;
      case "NEUTRAL":
        return <SentimentNeutralIcon color="action" />;
      case "NEGATIVE":
        return <SentimentVeryDissatisfiedIcon color="error" />;
      default:
        return <SentimentNeutralIcon color="action" />;
    }
  };

  const renderImpact = () => {
    const impact = voicing.impactScore || 0;
    return "★".repeat(Math.max(1, Math.min(5, impact)));
  };

  return (
    <TableRow hover key={voicing.id} sx={{ cursor: "pointer" }}>
      <TableCell>{voicing.summary || voicing.content}</TableCell>
      <TableCell>
        {voicing.tags.map((tag) => (
          <Chip key={tag.id} label={tag.name} size="small" sx={{ mr: 0.5 }} />
        ))}
      </TableCell>
      <TableCell>{renderSentiment()}</TableCell>
      <TableCell>{renderImpact()}</TableCell>
      <TableCell>
        {new Date(voicing.createdAt).toLocaleDateString("ja-JP")}
      </TableCell>
    </TableRow>
  );
};
