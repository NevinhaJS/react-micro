export type TManifest = { [key: string]: any } & { files: Record<string, string> };
// TODO: Type the reactRoot
export type TConnectRootFn = (reactRoot: any) => void;
export type TRenderFn = (containerId: string, dependencies: any[]) => void;
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
