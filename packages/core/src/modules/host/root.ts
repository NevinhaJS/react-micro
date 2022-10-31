import { Root } from 'react-dom/client';

import { RENDER_FUNCTION_ID, UNMOUNT_FUNCTION_ID } from './constants';
import { TCreateRootOpts, TMountFn, TRoot } from './../../types';
import { getContainerByName } from '../container/utils';

export const renderDevRoot = (root: TRoot, { devRoot, name }: TCreateRootOpts) => {
  if (!getContainerByName(`${name}-container`)) {
    root.render(devRoot, []);
  }
};

export const createRoot = (root: any, mountFn: TMountFn, { onUnmount, name }: TCreateRootOpts): TRoot => {
  let internalRoot = root;

  const unmount = () => {
    if (!internalRoot) {
      return;
    }

    if (onUnmount) {
      onUnmount();
    }

    internalRoot.unmount();
    internalRoot = null;
  };

  const setInternalRoot = (reactRoot: Root) => (internalRoot = reactRoot);

  const render = mountFn(setInternalRoot);

  (window as any)[RENDER_FUNCTION_ID + name] = render;
  (window as any)[UNMOUNT_FUNCTION_ID + name] = unmount;

  return {
    render,
    unmount,
  };
};

const initRoot = (initialRoot: any, mountFn: TMountFn, opts: any): TRoot => {
  const root = createRoot(initialRoot, mountFn, opts);

  renderDevRoot(root, opts);

  return root;
};

export default initRoot;
