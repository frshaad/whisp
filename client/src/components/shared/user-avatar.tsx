import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAbbreviation } from '@/lib/utils/helper';

type Props = {
  fullname: string;
  profileImg: string | undefined;
};

export default function UserAvatar({ fullname, profileImg }: Props) {
  return (
    <Avatar>
      <AvatarImage src={profileImg} />
      <AvatarFallback>{getAbbreviation(fullname)}</AvatarFallback>
    </Avatar>
  );
}
