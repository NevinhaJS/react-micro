import React, { useCallback, useEffect } from 'react';
import useManifest from '../../hooks/useManifest/useManifest';
import { RENDER_FUNCTION_ID, UNMOUNT_FUNCTION_ID } from '../../modules/host/constants';

interface MicroProps {
  name: string;
  host: string;
  manifestSRC: string;
  dependencies?: any;
  fetchOpts?: any;
}

const Micro = ({ name, host, dependencies, manifestSRC, fetchOpts }: MicroProps) => {
  const containerId = `${name}-container`;
  const renderHost = useCallback(() => {
    const renderFnName = RENDER_FUNCTION_ID + name;

    if (!(window as any)[renderFnName]) return;

    (window as any)[renderFnName](containerId, dependencies);
  }, []);

  const dettachHost = () => {
    const unmountFnName = UNMOUNT_FUNCTION_ID + name;

    if (!(window as any)[unmountFnName]) return;

    (window as any)[unmountFnName]();
  };

  useManifest(renderHost, { name, host, manifestSRC }, fetchOpts);

  useEffect(() => dettachHost, []);

  return <main id={containerId} />;
};

export default React.memo(Micro);
