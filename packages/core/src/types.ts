import { Root } from 'react-dom/client';

export type TManifest = { [key: string]: any } & { files: Record<string, string> };
export type TConnectRootFn = (reactRoot: Root) => void;
export type TRenderFn = (cointainerId: string, deeps: any[]) => void;
export type TMountFn = (connect: TConnectRootFn) => TRenderFn;
export type TCreateRootOpts = {
  name: string;
  devRoot: string;
  onUnmount?: () => void;
};
export type TRoot = {
  render: TRenderFn;
  unmount: () => void;
};
