
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.dfeb5dd9b8e34ce5becc50a06ed58483',
  appName: 'daily-strength-record',
  webDir: 'dist',
  server: {
    url: 'https://dfeb5dd9-b8e3-4ce5-becc-50a06ed58483.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      androidxCore: '1.10.1',
      androidxAppcompat: '1.6.1',
      androidxWebkit: '1.6.1'
    }
  }
};

export default config;
