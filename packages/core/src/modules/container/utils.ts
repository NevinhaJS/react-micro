import { TManifest } from '../../types';

export const getContainerByName = (name: string) => document.getElementById(name);

export const appendChunck = (key: string, host: string, manifestData: TManifest, scriptId: string) => {
  return new Promise((resolve: (value?: unknown) => void) => {
    const path = `${host}${manifestData.files[key]}`;
    const script = document.createElement('script');

    if (key === 'main.js') {
      script.id = scriptId;
    }
    script.onload = resolve;
    script.src = path;
    document.head.appendChild(script);
  });
};
