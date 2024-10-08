import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcrypt';
import hashPassword from './hashPassword';
import { validatePassword } from './validator-utils';
import { UserType } from '../schemas/user.schema';

// Helper function for handling image uploads
export const handleImageUpload = async (
  currentImage: string,
  newImage: string,
) => {
  if (currentImage) {
    const currentImageId = currentImage.split('/').pop()?.split('.')[0];
    if (currentImageId) {
      await cloudinary.uploader.destroy(currentImageId);
    }
  }
  const uploadedImage = await cloudinary.uploader.upload(newImage);
  return uploadedImage.secure_url;
};

// Helper function for updating the password
export const handlePasswordUpdate = async (
  user: UserType,
  currentPassword: string,
  newPassword: string,
) => {
  const isCurrentPwdMatch = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!isCurrentPwdMatch) {
    throw new Error('Current password is incorrect');
  }

  const [isValid, validationMsg] = validatePassword(newPassword);
  if (!isValid) {
    throw new Error(validationMsg);
  }

  user.password = await hashPassword(newPassword);
};
