'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSuggestedUsers } from '@/hooks/use-suggested-users';

import SuggestionItem from './suggestion-item';

export default function Suggestions() {
  const { suggestedUsers, isLoading, isError, error } = useSuggestedUsers();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error?.message}</p>;
  }
  if (!suggestedUsers) {
    return <p>Couldn&apos;t find any user to suggest</p>;
  }

  return (
    <Card className="w-full border">
      <CardHeader>
        <CardTitle>Who to follow</CardTitle>
        <CardDescription>People you may know</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {suggestedUsers.slice(0, 3).map((user) => (
          <SuggestionItem key={user._id} {...user} />
        ))}
      </CardContent>
    </Card>
  );
}
