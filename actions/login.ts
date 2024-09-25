'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { getTranslations } from 'next-intl/server';

export const login = async (values: z.infer<typeof LoginSchema>, locale: string) => {
  const t = await getTranslations(locale);
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t('serverValidation.invalidFields') };
  }

  return { success: t('serverValidation.emailSent') };
};
