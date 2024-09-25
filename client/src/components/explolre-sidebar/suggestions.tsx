import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SUGGESTED_USERS } from '@/config/dummy-data';

import SuggestionItem from './suggestion-item';

export default function Suggestions() {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Who to follow</CardTitle>
        <CardDescription>People you may know</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {SUGGESTED_USERS.map((user) => (
          <SuggestionItem key={user.id} {...user} />
        ))}
      </CardContent>
    </Card>
  );
}
