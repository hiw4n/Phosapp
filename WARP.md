# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
PhosApp is a React Native photography challenge app built with Expo. Users receive daily photo challenges ("retos"), capture photos using the device camera, and share them with the community. The app uses SQLite for local storage and follows a modular architecture.

## Development Commands

### Start Development Server
```bash
npm start
```

### Platform-Specific Development
```bash
npm run android    # Launch on Android
npm run ios        # Launch on iOS
npm run web        # Launch on Web
```

### Expo Commands
```bash
npx expo start --clear   # Clear cache and start
npx expo install         # Install Expo-compatible packages
```

## Architecture

### Modular Structure
The codebase follows a strict modular organization under `src/`:

- **screens/** - Full screen components (Home, Gallery, MyPhotos)
- **components/** - Reusable UI pieces (buttons, cards, etc.)
- **navigation/** - Navigation logic (MainNavigator with bottom tabs)
- **constants/** - Global constants
- **global/styles/** - Centralized styling (Single Source of Truth)
- **services/** - Business logic (retosService for database operations)
- **db/** - Database initialization and connection

### Navigation Pattern
Uses React Navigation with bottom tabs (3 screens):
- **Inicio** (Home) - Main photo challenge interface
- **Comunidad** (Gallery) - Community photos gallery
- **Mis Fotos** (MyPhotos) - User's photo collection

Navigation is configured in `src/navigation/MainNavigator.jsx` with custom Ionicons.

### Styling System
**Single Source of Truth approach** - All styles centralized in `src/global/styles/`:
- `Styles.style.js` - Global StyleSheet objects
- `_Colors.style.js` - Color palette exported as COLORS constant

**Import pattern:**
```javascript
import { globalStyles as SGS, COLORS as SC } from '../global/styles/Styles.style';
```

Use `StyleSheet.create()` - **NEVER use CSS classes or inline styles**.

Style files use underscore prefix: `_Colors.style.js`

### Database Architecture
SQLite database (`phosapp.db`) managed through expo-sqlite:
- Initialization in `src/db/init.js`
- Currently disabled in `App.js` (commented out)
- Database operations in `src/services/retosService.js`

**Schema:**
```sql
CREATE TABLE IF NOT EXISTS retos (
  id INTEGER PRIMARY KEY NOT NULL,
  titulo TEXT NOT NULL,
  imagen TEXT NOT NULL
);
```

### Camera Integration
Uses expo-camera with permission handling:
- Camera permission message defined in `app.json` plugins
- Permission flow implemented in Home screen
- Uses `useRef` hook with `CameraView` component
- Photo capture returns URI stored in state

## Key Technologies
- **React Native**: 0.81.5
- **Expo SDK**: ~54 (targeting SDK 50+ compatibility)
- **React Navigation**: Bottom tabs for main navigation
- **expo-camera**: Camera functionality with permissions
- **expo-sqlite**: Local database (currently disabled)
- **Ionicons**: Icon library from @expo/vector-icons

## Development Guidelines

### Communication Style
User has TDAH and dislexia, so:
- **Keep explanations brief**
- **Use numbered steps**
- **Use bold text for emphasis**
- **Be concise and direct**
- **Avoid long paragraphs**

### Code Standards
- Use functional components with hooks
- Follow existing import order: React → React Native → external → internal
- Use StyleSheet (imported from `react-native`)
- Target Expo SDK 50 or higher compatibility
- Use modular file organization (don't create files outside established folders)
- Enable/disable native screens via `enableScreens(false)` in MainNavigator

### Platform Compatibility
App targets three platforms with specific configurations in `app.json`:
- **iOS**: Tablet support enabled
- **Android**: Edge-to-edge mode enabled, adaptive icon configured
- **Web**: Basic web support

### Active Features
- Bottom tab navigation with 3 screens
- Camera capture with permission handling
- Daily photo challenges (currently hardcoded array)
- Photo URI capture and preview

### Pending Features
- SQLite database integration (currently disabled in App.js)
- Gallery screen implementation
- MyPhotos screen implementation
- Community photo sharing
