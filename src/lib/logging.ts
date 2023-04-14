export function createLogger(name: string) {
  const logger = {
    debug: (text: string, ...data: any[]) =>
      console.debug(`${name} ${text}`, data),
    log: (text: string, ...data: any[]) => console.log(`${name} ${text}`, data),
    warn: (text: string, ...data: any[]) =>
      console.warn(`${name} ${text}`, data),
    error: (text: string, ...data: any[]) =>
      console.error(`${name} ${text}`, data),
  };

  return logger;
}

/**
 * Default Logger for AskGPT Extention
 * CAUTION: Does work in anything besides content-scripts, bc. content scripts simply cannot import anything outside their method!
 */
export const logger = createLogger(`AskGPT:`);
