import { EllipsisVertical, Heart, MessageCircle, Repeat2 } from 'lucide-react';
import Link from 'next/link';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function Post() {
  const isLiked = true;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <div className="flex items-center gap-3">
              <CardTitle>Farshad Hatami</CardTitle>
            </div>
            <CardDescription>@farshad</CardDescription>
          </div>
        </Link>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="text-sm">13h</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <EllipsisVertical size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          <Heart
            size={17}
            className={cn('transition', isLiked && 'fill-primary text-primary')}
          />
          <span>143</span>
        </Button>

        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <MessageCircle size={17} />
          <span>18</span>
        </Button>

        <Button className="flex items-center gap-2" size="sm" variant="ghost">
          <Repeat2 size={17} />
          <span>6</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
