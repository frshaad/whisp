const normalizeCookieOptions = (options: Record<string, string | boolean>) => {
  const normalizedOptions: Record<string, any> = {};
  Object.keys(options).forEach((key) => {
    const lowerKey = key.toLowerCase();
    switch (lowerKey) {
      case 'max-age':
        normalizedOptions.maxAge = parseInt(options[key] as string, 10);
        break;
      case 'httponly':
        normalizedOptions.httpOnly = true;
        break;
      case 'secure':
        normalizedOptions.secure = true;
        break;
      case 'samesite':
        normalizedOptions.sameSite = options[key].toString().toLowerCase() as
          | 'strict'
          | 'lax'
          | 'none';
        break;
      case 'path':
        normalizedOptions.path = options[key];
        break;
      default:
        // Add any other options you may want to support here
        normalizedOptions[key] = options[key];
    }
  });
  return normalizedOptions;
};

export const parseSetCookie = (cookieString: string) => {
  const parts = cookieString.split(';').map((part) => part.trim());
  const [nameValue, ...options] = parts;

  // Extract the name and value (e.g., jwt=<token>)
  const [name, value] = nameValue.split('=');

  // Parse the options (e.g., HttpOnly, Secure, Path, Max-Age, etc.)
  const cookieOptions = options.reduce(
    (acc, option) => {
      const [key, val] = option.split('=');
      if (val) {
        acc[key] = val; // Store key-value pairs for options
      } else {
        acc[option] = true; // Store boolean options (e.g., HttpOnly, Secure)
      }
      return acc;
    },
    {} as Record<string, string | boolean>,
  );

  const normalizedOptions = normalizeCookieOptions(cookieOptions);

  return { name, value, options: normalizedOptions };
};
