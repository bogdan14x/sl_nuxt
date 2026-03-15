import { createError } from 'h3';
import { requireUser } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from('artist_pages')
    .select(
      'id, slug, display_name, spotify_artist_id, status, verification_status, about_text, published_at, last_synced_at, created_at, updated_at'
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return {
    pages: data ?? [],
  };
});
