'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { RegisterSchema } from '@/schemas';
import { getTranslations } from 'next-intl/server';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>, locale: string) => {
  // Fetch translations for the given locale
  const t = await getTranslations(locale);

  // Validate the fields using Zod
  const validatedFields = RegisterSchema.safeParse(values);

  // Check if validation failed
  if (!validatedFields.success) {
    return { error: t('serverValidation.invalidFields') };
  }

  // Destructure validated fields from the data if validation was successful
  const { email, password, name } = validatedFields.data;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the user already exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: t('serverValidation.emailExists'),
    };
  }

  // Create the user
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  });

  //todo: send verification email implementation

  // Return success message after registration
  return { success: t('serverValidation.emailSent') };
};
