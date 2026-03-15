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

  const queuedAt = new Date().toISOString();

  const { data: page, error: pageError } = await client
    .from('artist_pages')
    .update({ last_synced_at: queuedAt })
    .eq('id', id)
    .eq('user_id', user.id)
    .select('id')
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

  const { data: job, error: jobError } = await client
    .from('sync_runs')
    .insert({
      artist_page_id: id,
      job_type: 'manual_refresh',
      status: 'queued',
      requested_by: user.id,
      queued_at: queuedAt,
    })
    .select('id, status, queued_at')
    .single();

  if (jobError) {
    throw createError({
      statusCode: 500,
      statusMessage: jobError.message,
    });
  }

  return {
    accepted: true,
    job,
  };
});
