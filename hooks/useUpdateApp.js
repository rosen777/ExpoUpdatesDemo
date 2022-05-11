import {useEffect, useState} from 'react';
import * as Updates from 'expo-updates';
import * as BackgroundFetch from 'expo-background-fetch';

const useUpdateApp = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateManifest, setUpdateManifest] = useState({});
  const [updateId, setUpdateId] = useState();

  const updateAndReloadApp = async () => {
    try {
      const {isAvailable, manifest} = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        setUpdateAvailable(true);
        setUpdateId(Updates.updateId);
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        setUpdateManifest(manifest || {});
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timer = setInterval(async () => {
      updateAndReloadApp();
    }, 3000);

    return () => clearInterval(timer);
  }, [updateAvailable, updateManifest]);

  return [updateAvailable, updateManifest, updateId];
};

export default useUpdateApp;
