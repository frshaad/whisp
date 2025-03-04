import bcrypt from 'bcryptjs';

const hashPassword = async (password: string): Promise<string> => {
  const saltFactor = process.env.SALT_FACTOR
    ? parseInt(process.env.SALT_FACTOR)
    : 12;
  const salt = await bcrypt.genSalt(saltFactor);
  return await bcrypt.hash(password, salt);
};

export default hashPassword;
