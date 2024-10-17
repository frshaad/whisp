'use client';

import { useQueryClient } from '@tanstack/react-query';

import { User } from '@/types/user';

export function useGetAuthUser() {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData<User>(['authUser']);

  return authUser;
}
