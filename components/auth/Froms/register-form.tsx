'use client';

import React, { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { CardWrapper } from '../card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from '@/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '../Toasts/from-error';
import FormSuccess from '../Toasts/form-succes';
import { register } from '@/actions/register';
import { motion } from 'framer-motion';  

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const t = useTranslations('RegisterForm');
  const tValidation = useTranslations('AuthValidation');

  const schemaWithMessages = RegisterSchema.extend({
    email: z.string().email({
      message: tValidation('emailRequired')
    }),
    password: z.string().min(1, {
      message: tValidation('passwordRequired')
    }),
    name: z.string().min(1, {
      message: tValidation('usernameRequired')
    }),
  });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(schemaWithMessages),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values, '')
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
    });
  };

  return (
    <CardWrapper
      headerLabel={t('headerLabel')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref='/auth/login'
      showSocial
    >
      {t('welcomeMessage')}
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='space-y-4'>

            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('usernameLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('usernamePlaceholder')}
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('emailLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('emailPlaceholder')}
                        type='email'
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('passwordLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('passwordPlaceholder')}
                        type='password'
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

          </div>

          {/* Error and Success Messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: error || success ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormError message={error} />
            <FormSuccess message={success} />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              variant='outline'
              type='submit'
              className='w-full'
              disabled={isPending}
            >
              {t('registerButton')}
            </Button>
          </motion.div>

        </motion.form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
