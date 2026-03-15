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

  const { data: page, error: pageError } = await client
    .from('artist_pages')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle();

  if (pageError) {
    throw createError({
      statusCode: 500,
      statusMessage: pageError.message,
    });
  }

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Artist page not found',
    });
  }

  const { data, error } = await client
    .from('artist_social_links')
    .select('id, platform, url, is_visible, sort_order, source, created_at, updated_at')
    .eq('artist_page_id', id)
    .order('sort_order', { ascending: true });

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return {
    links: data ?? [],
  };
});
