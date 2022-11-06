import { useEffect, useState } from 'react';
import { appendChunck } from '../../modules/container/utils';
import { TManifest } from '../../types';

interface IUseManifestOptions {
  name: string;
  host: string;
  manifestSRC: string;
}

type TUseManifestReturn = [TManifest | undefined, Error | undefined];

const useManifest = (
  onMicroLoaded: () => void,
  { name, manifestSRC, host }: IUseManifestOptions,
  fetchOpts: any,
): TUseManifestReturn => {
  const scriptId = `_react-micro-js-${name}`;
  const [manifest, setManifest] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const attachScript = (manifestData: TManifest) => {
      const promises = Object.keys(manifestData.files).reduce(
        (acc: any, key) => (key.endsWith('.js') ? [...acc, appendChunck(key, host, manifestData, scriptId)] : acc),
        [],
      );

      Promise.allSettled(promises).then(onMicroLoaded).catch(setError);
    };

    const fetchManifest = async () => {
      const manifestData = await fetch(`${host}/${manifestSRC}`, fetchOpts)
        .then((res) => res.json())
        .catch(setError);

      attachScript(manifestData);
      setManifest(manifestData);
    };

    if (!document.getElementById(scriptId)) {
      fetchManifest();
    }
  }, [host, manifestSRC, onMicroLoaded]);

  return [manifest, error];
};

export default useManifest;
