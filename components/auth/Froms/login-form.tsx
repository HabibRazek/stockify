'use client';

import React, { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { CardWrapper } from '../card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from '@/schemas';
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
import { login } from '@/actions/login';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const t = useTranslations('LoginForm');
  const tValidation = useTranslations('AuthValidation');

  const schemaWithMessages = LoginSchema.extend({
    email: z.string().email({
      message: tValidation('emailRequired')
    }),
    password: z.string().min(1, {
      message: tValidation('passwordRequired')
    })
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(schemaWithMessages),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values, '')
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
      backButtonHref='/auth/register'
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

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
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
              transition={{ delay: 0.4, duration: 0.5 }}
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

          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: error || success ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormError message={error} />
            <FormSuccess message={success} />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              variant='outline'
              type='submit'
              className='w-full'
              disabled={isPending}
            >
              {t('loginButton')}
            </Button>
          </motion.div>

        </motion.form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
