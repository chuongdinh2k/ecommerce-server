import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (
  hashedPassword: string,
  password: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
