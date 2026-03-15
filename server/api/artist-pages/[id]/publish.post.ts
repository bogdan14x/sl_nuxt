import { createError } from 'h3';
import { requireUser } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  const client = await serverSupabaseClient(event);
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing artist page id',
    });
  }

  const { data, error } = await client
    .from('artist_pages')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select(
      'id, slug, display_name, spotify_artist_id, status, verification_status, about_text, published_at, last_synced_at, created_at, updated_at'
    )
    .maybeSingle();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Artist page not found',
    });
  }

  return { page: data };
});
