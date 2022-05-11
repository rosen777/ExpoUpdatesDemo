import {useEffect, useState, useCallback} from 'react';
import {AppState} from 'react-native';
import * as Updates from 'expo-updates';

const useUpdateApp = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [updateManifest, setUpdateManifest] = useState({});
  const [updateId, setUpdateId] = useState();
  const [applicationState, setApplicationState] = useState();

  const fetchAppUpdate = useCallback(async () => {
    try {
      if (applicationState === 'active') {
        const {isAvailable, manifest} = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          setUpdateAvailable(true);
          setUpdateId(Updates.updateId);
          const {isNew} = await Updates.fetchUpdateAsync();
          setIsFetched(isNew);
          setUpdateManifest(manifest || {});
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [applicationState]);

  const updateAndReloadApp = useCallback(async () => {
    if (isFetched) {
      await Updates.reloadAsync();
    }
  }, [isFetched]);

  useEffect(() => {
    if (!__DEV__) {
      fetchAppUpdate();
      if (applicationState === 'background') {
        updateAndReloadApp();
      }
    }
  }, [
    updateAvailable,
    updateManifest,
    fetchAppUpdate,
    updateAndReloadApp,
    applicationState,
  ]);

  useEffect(() => {
    const subscriptionOnChange = AppState.addEventListener(
      'change',
      nextAppState => {
        setApplicationState(nextAppState);
      },
    );

    return () => {
      subscriptionOnChange.remove();
    };
  }, []);

  return [
    updateAvailable,
    fetchAppUpdate,
    updateManifest,
    updateId,
    applicationState,
  ];
};

export default useUpdateApp;
