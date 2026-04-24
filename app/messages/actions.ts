'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getArtistByHandle } from '@/lib/repo';
import { getOrCreateConversation, sendMessage } from '@/lib/messages';

export async function sendToHandle(handle: string, formData: FormData) {
  const body = String(formData.get('body') ?? '').trim();
  if (!body) return;
  const me = await getCurrentUser();
  const other = getArtistByHandle(handle);
  if (!other || other.id === me.id) return;
  const conv = getOrCreateConversation(me.id, other.id);
  sendMessage(conv.id, me.id, body);
  revalidatePath(`/messages/${handle}`);
  revalidatePath('/messages');
}

export async function startConversation(handle: string) {
  const me = await getCurrentUser();
  const other = getArtistByHandle(handle);
  if (!other || other.id === me.id) redirect('/messages');
  getOrCreateConversation(me.id, other!.id);
  redirect(`/messages/${handle}`);
}
