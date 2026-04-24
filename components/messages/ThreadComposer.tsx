'use client';
import { useRef, useState, useTransition } from 'react';
import { sendToHandle } from '@/app/messages/actions';
import { Icon } from '@/components/ui/Icon';

export function ThreadComposer({ handle, otherName }: { handle: string; otherName: string }) {
  const [text, setText] = useState('');
  const [pending, start] = useTransition();
  const taRef = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    const value = text.trim();
    if (!value || pending) return;
    const fd = new FormData();
    fd.set('body', value);
    setText('');
    start(() => sendToHandle(handle, fd));
    // restore focus to composer after send
    setTimeout(() => taRef.current?.focus(), 30);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="border-t px-4 py-3 lg:px-10"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="mx-auto flex max-w-2xl items-end gap-2">
        <textarea
          ref={taRef}
          name="body"
          placeholder={`Kōrero with ${otherName.split(' ')[0]}…  (Enter to send · Shift+Enter for new line)`}
          required
          rows={1}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            // auto-grow
            e.currentTarget.style.height = '0px';
            e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 240)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              submit();
            }
          }}
          className="flex-1 resize-none rounded-2xl border bg-transparent px-4 py-2.5 text-[15px]"
          style={{ borderColor: 'var(--hairline)', maxHeight: 240 }}
          aria-label={`Message ${otherName}`}
          disabled={pending}
        />
        <button
          type="submit"
          className="shrink-0 rounded-full p-3 transition-transform hover:scale-105 disabled:opacity-50"
          style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
          aria-label="Send message"
          disabled={pending || !text.trim()}
        >
          <Icon name="send" size={16} />
        </button>
      </div>
    </form>
  );
}
