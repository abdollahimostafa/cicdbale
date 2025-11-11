// global.d.ts
export {}; // ensures this file is treated as a module

declare global {
  interface Window {
    Bale?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          [key: string]: any;
        };
        requestContact: (callback: (granted: boolean, phone?: string) => void) => void;
        onEvent: (event: string, handler: (...args: any[]) => void) => void;
        themeParams?: any;
        isIframe?: boolean;
      };
    };
  }
}
