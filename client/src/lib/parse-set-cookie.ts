const normalizeCookieOptions = (options: Record<string, string | boolean>) => {
  const normalizedOptions: Record<string, any> = {};
  for (const key of Object.keys(options)) {
    const lowerKey = key.toLowerCase();
    switch (lowerKey) {
      case 'max-age': {
        normalizedOptions.maxAge = Number.parseInt(options[key] as string, 10);
        break;
      }
      case 'httponly': {
        normalizedOptions.httpOnly = true;
        break;
      }
      case 'secure': {
        normalizedOptions.secure = true;
        break;
      }
      case 'samesite': {
        normalizedOptions.sameSite = options[key].toString().toLowerCase() as
          | 'strict'
          | 'lax'
          | 'none';
        break;
      }
      case 'path': {
        normalizedOptions.path = options[key];
        break;
      }
      default: {
        // Add any other options you may want to support here
        normalizedOptions[key] = options[key];
      }
    }
  }
  return normalizedOptions;
};

export const parseSetCookie = (cookieString: string) => {
  const parts = cookieString.split(';').map((part) => part.trim());
  const [nameValue, ...options] = parts;

  // Extract the name and value (e.g., jwt=<token>)
  const [name, value] = nameValue.split('=');

  // Parse the options (e.g., HttpOnly, Secure, Path, Max-Age, etc.)
  const cookieOptions: Record<string, string | boolean> = {};

  for (const option of options) {
    const [key, value_] = option.split('=');
    if (value_ === undefined) {
      cookieOptions[option] = true; // Store boolean options (e.g., HttpOnly, Secure)
    } else {
      cookieOptions[key] = value_; // Store key-value pairs for options
    }
  }

  const normalizedOptions = normalizeCookieOptions(cookieOptions);

  return { name, value, options: normalizedOptions };
};
