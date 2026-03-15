import { createError, readBody } from 'h3';
import { requireUser } from '../../utils/auth';
import { toArtistSlug } from '../../utils/slug';

type CreateArtistPageBody = {
  spotifyArtistId?: string;
  displayName?: string;
  slug?: string;
  aboutText?: string;
};

const MAX_ARTIST_PAGES_PER_ACCOUNT = 5;

export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody<CreateArtistPageBody>(event);

  const spotifyArtistId = body.spotifyArtistId?.trim();
  const displayName = body.displayName?.trim();
  const aboutText = body.aboutText?.trim() ?? '';
  const slug = toArtistSlug(body.slug || displayName || '');

  if (!spotifyArtistId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'spotifyArtistId is required',
    });
  }

  if (!displayName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'displayName is required',
    });
  }

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid slug is required',
    });
  }

  const { count, error: countError } = await client
    .from('artist_pages')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (countError) {
    throw createError({
      statusCode: 500,
      statusMessage: countError.message,
    });
  }

  if ((count ?? 0) >= MAX_ARTIST_PAGES_PER_ACCOUNT) {
    throw createError({
      statusCode: 409,
      statusMessage: `Maximum of ${MAX_ARTIST_PAGES_PER_ACCOUNT} artist pages reached`,
    });
  }

  const { data: existingSlug, error: slugError } = await client
    .from('artist_pages')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (slugError) {
    throw createError({
      statusCode: 500,
      statusMessage: slugError.message,
    });
  }

  if (existingSlug) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Slug is already taken',
    });
  }

  const { data, error } = await client
    .from('artist_pages')
    .insert({
      user_id: user.id,
      spotify_artist_id: spotifyArtistId,
      display_name: displayName,
      slug,
      about_text: aboutText || null,
      verification_status: 'unverified',
      status: 'draft',
    })
    .select(
      'id, slug, display_name, spotify_artist_id, status, verification_status, about_text, published_at, last_synced_at, created_at, updated_at'
    )
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return { page: data };
});
