import Today from '../components/Today';
import { RequireLogin } from '../components/RequireAuth';

export default function IndexPage() {
  return (
    <RequireLogin>
      <Today />
    </RequireLogin>
  );
}
