import type { NitroRuntimeHooks } from 'nitropack';

declare module 'nitropack' {
  interface NitroRuntimeHooks {
        'custom:send-message': (socketId: string, message: string) => void;
  }
}
