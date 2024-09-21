import { Heart, MessageCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Post() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <CardTitle>Farshad Hatami</CardTitle>
          <CardDescription>@farshad</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <p>
          Tailwind is such a joy to use. If you learn one utility class, you
          know all utility classes. If you implement something on one project,
          it works on all projects. And it never breaks. It works exactly as it
          worked since v0.3 and keeps getting better and faster.
        </p>
      </CardContent>

      <CardFooter className="gap-8 text-xs text-muted-foreground">
        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <Heart size={16} />
          <span>143</span>
        </Button>
        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <MessageCircle size={16} />
          <span>18</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
