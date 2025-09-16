import { FragmentType, graphql, useFragment } from "@/gql";
import { getRelativeTime } from "@/lib/date";
import { Chip, TableCell, TableRow } from "@mui/material";

const fragment = graphql(`
  fragment VoiceInfo on Voicing {
    id
    content
    source
    createdAt
    summary
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
      <TableCell>{renderImpact()}</TableCell>
      <TableCell>{getRelativeTime(voicing.createdAt)}</TableCell>
    </TableRow>
  );
};
