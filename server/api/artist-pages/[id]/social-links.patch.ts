import { createError, readBody } from 'h3';
import { requireUser } from '../../../utils/auth';

type SocialLinkInput = {
  platform: string;
  url: string;
  isVisible?: boolean;
  sortOrder?: number;
  source?: 'manual' | 'scraped';
};

type Body = {
  links?: SocialLinkInput[];
};

export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  const client = await serverSupabaseClient(event);
  const id = getRouterParam(event, 'id');
  const body = await readBody<Body>(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing artist page id',
    });
  }

  if (!Array.isArray(body.links)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'links must be an array',
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

  const sanitizedLinks = body.links.map((link, index) => {
    const platform = link.platform?.trim().toLowerCase();
    const url = link.url?.trim();

    if (!platform || !url) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Each link requires platform and url',
      });
    }

    return {
      artist_page_id: id,
      platform,
      url,
      is_visible: link.isVisible ?? true,
      sort_order: Number.isInteger(link.sortOrder) ? link.sortOrder : index,
      source: link.source ?? 'manual',
    };
  });

  const { error: deleteError } = await client
    .from('artist_social_links')
    .delete()
    .eq('artist_page_id', id);

  if (deleteError) {
    throw createError({
      statusCode: 500,
      statusMessage: deleteError.message,
    });
  }

  if (sanitizedLinks.length === 0) {
    return { links: [] };
  }

  const { data, error } = await client
    .from('artist_social_links')
    .insert(sanitizedLinks)
    .select('id, platform, url, is_visible, sort_order, source, created_at, updated_at')
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
