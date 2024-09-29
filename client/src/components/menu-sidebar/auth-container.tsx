import UserButton from './user-button';

type Props = React.ComponentPropsWithoutRef<'div'>;

export default function AuthContainer(props: Props) {
  return (
    <div {...props}>
      <UserButton />
    </div>
  );
}
