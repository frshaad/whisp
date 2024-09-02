import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const saltFactor = process.env.SALT_FACTOR
        ? parseInt(process.env.SALT_FACTOR)
        : 10;
    const salt = await bcrypt.genSalt(saltFactor);
    return await bcrypt.hash(password, salt);
};
