import { TMountFn } from '../../types';

import initRoot from './root';

// TODO: call the handles for dynamic dependencies injection
// and dispatches here
const connector = (mountFn: TMountFn, opts: any) => {
  const root: any = null;

  return initRoot(root, mountFn, opts);
};

export default connector;
