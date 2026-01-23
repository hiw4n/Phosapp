import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/Home';
import GalleryScreen from './src/screens/GalleryScreen';
import CameraScreen from './src/screens/CameraScreen';
import { PhotoProvider } from './src/context/PhotoContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PhotoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {/* La primera pantalla ahora es Welcome */}
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }} 
          />
          
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Iniciar Sesión' }} 
          />
          
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen 
            name="Gallery" 
            component={GalleryScreen} 
            options={{ title: 'Mis Fotos' }} 
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PhotoProvider>
  );
}