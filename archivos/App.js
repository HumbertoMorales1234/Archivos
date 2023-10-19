
//* Librerias a instalar
//npx expo install expo-file-system
//npx expo install expo-sharing
//npx expo install expo-media-library

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';


import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [myText, setMyText] = useState('')
  const [myTitle, setMyTitle] = useState('')
  const [searchFile, setSearchFile] = useState('')

  useEffect(() => {
    (async () => {
      let { status } = await requestPermission(); //Parametro writeOnly
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);



  const WriteFile = async () => {

    // const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    try {
      if (permissionResponse) {
        let fileUri = FileSystem.documentDirectory+myTitle+".txt";
        console.log('Before fileSystem:', fileUri)
        await FileSystem.writeAsStringAsync(fileUri, 'demo text', { encoding: FileSystem.EncodingType.UTF8 });
        console.log('After fileSystem:', fileUri)
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        console.log('asset', asset)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
        console.log(asset)
     }
    } catch (error) {
      console.log(error) 
    }  
  }

  

  const readFile = async (title) => {

  }

  const downloadImg = async () => {
    const fileName = 'imagen.jpg'
    const result = await FileSystem.downloadAsync('https://i.imgflip.com/2/80vhtz.jpg', FileSystem.documentDirectory+fileName)
    console.log(result)
    save(result.uri)
  }

  const save = (uri) => {
    Sharing.shareAsync(uri)
  }

  return (
    <View style={styles.container}>
      <View style={{gap: 5}}>
        <Text>Titulo</Text>
        <TextInput value={myTitle} onChangeText={(value) => setMyTitle(value)} style={styles.inputs}/>
        <Text>Contenido</Text>
        <TextInput value={myText} onChangeText={(value) => setMyText(value)} style={styles.inputs}/>
        <Button title='Guardar Texto' onPress={WriteFile}/>
      </View>
      <View style={{gap: 5}}>
        <Text>Buscar Archivo</Text>
        <TextInput value={searchFile} onChangeText={(value) => setSearchFile(value)} style={styles.inputs}/>
        <Button title='Buscar Archivo' onPress={(value) => readFile(value)}/>
      </View>
      <Button title='Guardar Imagen' onPress={downloadImg}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30
  },
  inputs: {
    borderWidth: 1, 
    borderColor: '#2a2aff',
    paddingHorizontal: 15,
    borderRadius: 30,
    paddingVertical: 5,
    width: 300,
  },
});
