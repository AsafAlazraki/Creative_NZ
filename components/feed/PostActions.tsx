'use client';
import { useOptimistic, useState, useTransition } from 'react';
import { togglePostLike, togglePostSave, addComment } from '@/app/actions';
import { Icon } from '@/components/ui/Icon';
import { formatCount } from '@/lib/utils';

export function PostActions({
  postId,
  initialLikes,
  initialComments,
  initialShares,
  initialSaves,
  initiallyLiked,
  initiallySaved,
}: {
  postId: string;
  initialLikes: number;
  initialComments: number;
  initialShares: number;
  initialSaves: number;
  initiallyLiked: boolean;
  initiallySaved: boolean;
}) {
  const [pending, start] = useTransition();
  const [likeState, setLikeState] = useOptimistic(
    { liked: initiallyLiked, count: initialLikes },
    (s) => ({ liked: !s.liked, count: s.liked ? s.count - 1 : s.count + 1 }),
  );
  const [saveState, setSaveState] = useOptimistic(
    { saved: initiallySaved, count: initialSaves },
    (s) => ({ saved: !s.saved, count: s.saved ? s.count - 1 : s.count + 1 }),
  );
  const [showComments, setShowComments] = useState(false);
  const [shareCount, setShareCount] = useState(initialShares);
  const [sharedFlash, setSharedFlash] = useState(false);

  return (
    <div>
      <footer
        className="flex items-center gap-5 border-t px-5 py-3 text-sm"
        style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
      >
        <button
          className="group flex items-center gap-1.5 transition-colors min-h-11 min-w-11 -mx-1 px-1"
          aria-label={likeState.liked ? 'Honoured — tap to remove' : 'Honour this post'}
          aria-pressed={likeState.liked}
          disabled={pending}
          onClick={() => {
            start(() => {
              setLikeState(null);
              return togglePostLike(postId);
            });
          }}
          style={{ color: likeState.liked ? 'var(--brand)' : undefined }}
        >
          <Icon
            name="heart"
            size={18}
            className={
              'transition-transform group-hover:scale-110 ' +
              (likeState.liked ? 'fill-current' : '')
            }
          />
          <span className="font-mono">{formatCount(likeState.count)}</span>
        </button>

        <button
          className="flex items-center gap-1.5 hover:text-[color:var(--ink)] min-h-11 min-w-11 -mx-1 px-1"
          aria-label={`${initialComments} comments`}
          aria-expanded={showComments}
          onClick={() => setShowComments((s) => !s)}
        >
          <Icon name="message-circle" size={18} />
          <span className="font-mono">{formatCount(initialComments)}</span>
        </button>

        <button
          className="flex items-center gap-1.5 hover:text-[color:var(--ink)] min-h-11 min-w-11 -mx-1 px-1"
          aria-label="Share with respect"
          title="Share with respect"
          onClick={async () => {
            const url =
              typeof window !== 'undefined'
                ? `${window.location.origin}/?p=${postId}`
                : '';
            try {
              if (typeof navigator !== 'undefined' && navigator.share) {
                await navigator.share({ url, title: 'KavaWorks' });
              } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                await navigator.clipboard.writeText(url);
              }
              setShareCount((c) => c + 1);
              setSharedFlash(true);
              setTimeout(() => setSharedFlash(false), 1800);
            } catch {
              /* user cancelled share */
            }
          }}
        >
          <Icon name="send" size={18} />
          <span className="font-mono">{formatCount(shareCount)}</span>
        </button>

        <button
          className="ml-auto flex items-center gap-1.5 hover:text-[color:var(--ink)] min-h-11 min-w-11 -mx-1 px-1"
          aria-label={saveState.saved ? 'Saved — tap to remove' : 'Keep this post'}
          aria-pressed={saveState.saved}
          disabled={pending}
          onClick={() => {
            start(() => {
              setSaveState(null);
              return togglePostSave(postId);
            });
          }}
          title={saveState.saved ? 'Saved' : 'Keep'}
          style={{ color: saveState.saved ? 'var(--brand)' : undefined }}
        >
          <Icon
            name="bookmark"
            size={18}
            className={saveState.saved ? 'fill-current' : ''}
          />
          <span className="font-mono">{formatCount(saveState.count)}</span>
        </button>
      </footer>

      {sharedFlash && (
        <div
          role="status"
          className="border-t px-5 py-2 text-xs"
          style={{ borderColor: 'var(--hairline)', color: 'var(--brand)' }}
        >
          Link copied. Share with respect.
        </div>
      )}

      {showComments && (
        <CommentBox postId={postId} />
      )}
    </div>
  );
}

function CommentBox({ postId }: { postId: string }) {
  const [pending, start] = useTransition();
  const [text, setText] = useState('');

  return (
    <form
      className="flex items-end gap-2 border-t px-5 py-3"
      style={{ borderColor: 'var(--hairline)' }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        const fd = new FormData();
        fd.set('text', text);
        const value = text;
        setText('');
        start(() => addComment(postId, fd).catch(() => setText(value)));
      }}
    >
      <textarea
        className="flex-1 resize-none border bg-transparent rounded-md px-3 py-2 text-sm"
        style={{ borderColor: 'var(--hairline)', minHeight: 40 }}
        rows={1}
        placeholder="Add a kōrero…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
          }
        }}
        aria-label="Add a comment"
      />
      <button
        type="submit"
        className="rounded-md px-4 py-2 text-xs font-semibold disabled:opacity-50"
        style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
        disabled={pending || !text.trim()}
      >
        Send
      </button>
    </form>
  );
}
