// bugSolution.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';

// ... other imports

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [cameraError, setCameraError] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraError = (error) => {
    setCameraError(error);
    // Handle camera error appropriately, e.g., display a fallback UI or retry
  };

  if (hasPermission === null) {
    return <View />; // While checking permissions
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (cameraError) {
      return <Text>Camera Error: {cameraError}</Text>
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} onError={handleCameraError}>
        <View style={styles.buttonContainer}>
          <Text>Camera Preview</Text>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
});