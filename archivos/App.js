
//* Librerias a instalar
//npx expo install expo-file-system
//npx expo install expo-sharing
//npx expo install expo-media-library
//npm i expo-permissions

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Permissions from 'expo-permissions';

//import RNFS from 'react-native-fs';



import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [myText, setMyText] = useState('')
  const [myTitle, setMyTitle] = useState('')
  const [searchFile, setSearchFile] = useState('')

  // const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  //   if (perm.status != 'granted') {
  //     return;
  //   }

  const WriteFile = () => {
    // useEffect( () => {

    //   const saveFile = async () =>{
    //   if(myText === '') return(console.log('No hay texto'))
    //   if(myTitle === '') return(console.log('No hay Titulo'))

    //   const path = RNFS.DocumentDirectoryPath + '/'+myTitle+'.txt';
    //   try {
    //     await RNFS.writeFile(path, myText, 'utf8');
    //     console.log('File written successfully!');
    //   } catch (error) {
    //     console.error('Error writing file:', error);
    //   }

    //    fileUri = FileSystem.documentDirectory+myTitle+'.txt'

    //    await FileSystem.writeAsStringAsync(fileUri, myText, {encoding: FileSystem.EncodingType.UTF8})
    //    const asset = await MediaLibrary.createAssetAsync(fileUri)
    //    await MediaLibrary.createAlbumAsync("Download", asset, false)
    //   } 
    // }, [])
    // saveFile()
  }

  

  const readFile = async (title) => {

    // const path = RNFS.DocumentDirectoryPath + '/'+title+'.txt';

    // try {
    //   const content = await RNFS.readFile(path, 'utf8');
    //   setFileContent(content);
    //   console.log('File content:', content);
    // } catch (error) {
    //   console.error('Error reading file:', error);
    // }

    // const result = await FileSystem.readAsStringAsync(FileSystem.documentDirectory+title+'.txt', {encoding: FileSystem.EncodingType.UTF8})
    // console.log(result)
    //readAsStringAsync(FileSystem.documentDirectory+title, options)
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
