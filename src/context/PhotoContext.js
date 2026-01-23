import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@phosapp/photos';

const PhotoContext = createContext({
  photos: [],
  isLoading: true,
  addPhoto: async () => {},
  refreshPhotos: async () => {}
});

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const persistPhotos = useCallback(async (nextPhotos) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextPhotos));
    } catch (error) {
      console.warn('No se pudieron guardar las fotos:', error);
    }
  }, []);

  const loadStoredPhotos = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPhotos(JSON.parse(stored));
      } else {
        setPhotos([]);
      }
    } catch (error) {
      console.warn('No se pudieron cargar las fotos guardadas:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoredPhotos();
  }, [loadStoredPhotos]);

  const addPhoto = useCallback(async (photoData) => {
    setPhotos((prev) => {
      const nextPhotos = [photoData, ...prev];
      persistPhotos(nextPhotos);
      return nextPhotos;
    });
  }, [persistPhotos]);

  return (
    <PhotoContext.Provider
      value={{
        photos,
        isLoading,
        addPhoto,
        refreshPhotos: loadStoredPhotos
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => useContext(PhotoContext);
