import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cloudcarelabs.portal.sandbox',
  appName: 'CloudCare Labs Portal (Sandbox)',
  // server: {
  //   url: 'https://portal.sandbox.cloudcarelabs.com'
  // },
  webDir: '.output/public',
  android: {
    buildOptions: {
      releaseType: 'APK',
      keystorePath: 'cloudcarelabs.jks',
      keystorePassword: 'Swmis2011!',
      keystoreAlias: 'cloudcarelabs',
      keystoreAliasPassword: 'Swmis2011!'
    }
  },
  plugins: {
      CapacitorHttp: {
        enabled: true,
      }, 
  }, 
};

export default config;
