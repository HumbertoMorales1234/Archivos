import React from 'react'

//* Librerias a instalar
//npx expo install expo-file-system
//npx expo install expo-sharing
//npx expo install expo-media-library

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { View, Button } from 'react-native';
import { useEffect } from 'react';

export const ImageFiles = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    useEffect(() => {
        (async () => {
          let { status } = await requestPermission(); //Parametro writeOnly
          if (status !== 'granted') {
            setErrorMsg('Permission to access files was denied');
            return;
          }
        })();
      }, []);

    const downloadImg = async (sharing) => {
        const fileName = 'imagen.jpg'
        const result = await FileSystem.downloadAsync('https://i.imgflip.com/2/80vhtz.jpg', FileSystem.documentDirectory+fileName)
        console.log(result)
        if(sharing){
          share(result.uri)
        }else{
          save(result.uri)
        }
      }
      
    const share = (uri) => {
        Sharing.shareAsync(uri)
    }
    
    const save = async (uri) => {
        try {
          if(permissionResponse){
            const asset = await MediaLibrary.createAssetAsync(uri)
            const album = await MediaLibrary.createAlbumAsync("Downloads", uri)
            console.log('Image', asset)
            console.log('Downloaded at', album)
          }else{
            
          }
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <View style={{justifyContent: 'space-evenly', alignItems: 'center', flex: 1}}>
      <Button title='Descargar en Biblioteca' onPress={() => downloadImg(false)}/>
      <Button title='Descargar y Compartir' onPress={() => downloadImg(true)}/>
      <Button title='Elegir imagen' />
    </View>
  )
}
