import AuthButtons from './auth-buttons';
import UserButton from './user-button';

type Props = React.ComponentPropsWithoutRef<'div'>;

export default function AuthContainer(props: Props) {
  const isLogin = false;

  return <div {...props}>{isLogin ? <UserButton /> : <AuthButtons />}</div>;
}