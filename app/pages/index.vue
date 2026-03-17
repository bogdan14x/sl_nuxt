<template>
  <div class="min-h-full bg-[#0b1017] text-[#edf2f7]">
    <header class="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-6">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-3 text-sm font-medium tracking-[-0.02em] text-[#edf2f7] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#594ddf]">
        <span class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
          <img src="/soundlogo_only.svg" alt="Soundlog" class="h-5 w-auto" />
        </span>
        <span class="text-[1.15rem]">Soundlog</span>
      </NuxtLink>

      <nav class="flex flex-wrap items-center gap-5 text-sm text-[#c4cad4]">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#594ddf]">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="pb-16 pt-8 sm:pb-20 sm:pt-10">
      <section class="mx-auto max-w-[44rem]">
        <p class="text-sm font-medium tracking-[-0.02em] text-[#8f87ff]">For independent artists</p>
        <h1 class="mt-5 max-w-[11ch] text-[clamp(3.5rem,10vw,7.75rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[#edf2f7]">
          Your personal artist website in one click.
        </h1>
        <p class="mt-6 max-w-[32rem] text-[clamp(1.1rem,2.1vw,1.75rem)] leading-[1.28] tracking-[-0.03em] text-[#6f7786]">
          Soundlog builds your page from Spotify, keeps it up to date, and gives fans one place to find your music.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <NuxtLink
            to="/register"
            class="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#f4f7fb] px-6 text-lg font-semibold tracking-[-0.03em] text-[#0b1017] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#594ddf]">
            Start your free trial
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] px-6 text-lg font-medium tracking-[-0.03em] text-[#edf2f7] transition hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#594ddf]">
            Sign in
          </NuxtLink>
        </div>

        <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#98a1af]">
          <span>Free 14-day trial</span>
          <span class="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block"></span>
          <span>No credit card required</span>
          <span class="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block"></span>
          <span>Built from your Spotify profile</span>
        </div>
      </section>

      <section class="pt-16 sm:pt-20">
        <div class="mx-auto max-w-4xl text-center">
          <p class="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#8f87ff]">Example artist page</p>
          <p class="mt-3 text-[clamp(1.8rem,3.6vw,3rem)] font-medium tracking-[-0.04em] text-[#edf2f7]">
            Auto-updated from Spotify
          </p>
          <p class="mt-2 text-lg tracking-[-0.02em] text-[#98a1af]">
            Streaming links, socials, and your latest release on one page.
          </p>
        </div>

        <div class="mx-auto mt-10 max-w-[70rem]">
          <div class="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#020406] shadow-[0_20px_70px_rgba(0,0,0,0.36)]">
            <div class="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-white/8"></span>
                <span class="h-3 w-3 rounded-full bg-white/8"></span>
                <span class="h-3 w-3 rounded-full bg-white/8"></span>
              </div>
              <p class="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#778091]">Artist preview</p>
              <div class="flex items-center gap-2">
                <span class="h-5 w-1.5 rounded-full border border-white/25"></span>
                <span class="h-5 w-1.5 rounded-full border border-white/25"></span>
              </div>
            </div>

            <div class="bg-[#04070a] px-5 py-6 sm:px-8 sm:py-8">
              <div class="aspect-[21/9] w-full overflow-hidden rounded-[1.25rem] border border-white/6 bg-[url('/hero_image.jpg')] bg-cover bg-center"></div>

              <div class="mt-7 space-y-6">
                <div class="min-w-0">
                  <div class="flex flex-wrap items-center gap-3">
                    <p class="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.06em] text-[#edf2f7]">Armin van Buuren</p>
                    <span class="inline-flex items-center rounded-full border border-[#594ddf]/40 bg-[#594ddf]/12 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#b8b2ff]">
                      Pro
                    </span>
                  </div>
                  <p class="mt-2 text-[clamp(1rem,1.6vw,1.35rem)] tracking-[-0.03em] text-[#7f8794]">armin.soundlog.link</p>

                  <div class="mt-4 flex max-w-full flex-wrap gap-2.5">
                    <span
                      v-for="social in socialPlatforms"
                      :key="social.name"
                      class="inline-flex max-w-full items-center gap-2.5 rounded-xl border border-white/8 bg-transparent px-3.5 py-2.5 text-sm font-medium text-[#b7bfca]">
                      <img :src="social.icon" alt="" aria-hidden="true" class="h-4 w-4 shrink-0 object-contain" />
                      <span>{{ social.name }}</span>
                    </span>
                  </div>
                </div>

                <div class="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                  <p class="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#8c93a1]">Latest release</p>
                  <div class="mt-4 flex items-start gap-4">
                    <div class="h-20 w-20 shrink-0 rounded-lg border border-white/10 bg-[#0c1117]"></div>
                    <div class="min-w-0">
                      <p class="text-[clamp(1.1rem,2vw,1.75rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-[#edf2f7] [overflow-wrap:anywhere]">
                        Not Even Love (Armin van Buuren Remix)
                      </p>
                      <p class="mt-2 text-[1.05rem] tracking-[-0.03em] text-[#9098a6]">Seven Lions</p>
                      <p class="mt-1 text-sm uppercase tracking-[0.24em] text-[#68707f]">Single · 2024</p>
                    </div>
                  </div>

                  <div class="mt-5 flex max-w-full flex-wrap gap-2.5">
                    <span
                      v-for="platform in previewPlatforms"
                      :key="platform.name"
                      class="inline-flex max-w-full items-center gap-2.5 rounded-xl border border-[#594ddf]/20 bg-[#0a0d11] px-3.5 py-2.5 text-sm font-medium text-[#e2e8f0]">
                      <img :src="platform.icon" alt="" aria-hidden="true" class="h-4 w-4 shrink-0 object-contain" />
                      <span>{{ platform.name }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto mt-14 grid max-w-[70rem] gap-4 sm:grid-cols-3">
        <article
          v-for="point in valuePoints"
          :key="point.title"
          class="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
          <p class="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#8f87ff]">{{ point.title }}</p>
          <p class="mt-3 text-base leading-7 tracking-[-0.02em] text-[#b8c0cc]">{{ point.text }}</p>
        </article>
      </section>

      <section class="mx-auto mt-14 grid max-w-[70rem] gap-4 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
        <article class="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6 sm:p-7">
          <p class="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#8c93a1]">Why Soundlog</p>
          <div class="mt-6 space-y-6">
            <div
              v-for="benefit in benefits"
              :key="benefit.title"
              class="border-t border-white/8 pt-6 first:border-t-0 first:pt-0">
              <div class="flex items-start gap-3">
                <span class="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#594ddf]"></span>
                <div>
                  <h2 class="text-xl font-semibold tracking-[-0.04em] text-[#edf2f7]">{{ benefit.title }}</h2>
                  <p class="mt-2 text-base leading-7 tracking-[-0.02em] text-[#98a1af]">{{ benefit.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="rounded-[1.75rem] border border-white/8 bg-[#0c1118] p-6 sm:p-7">
          <p class="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#8c93a1]">Built for release cycles</p>
          <h2 class="mt-4 max-w-[14ch] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#edf2f7]">
            One page fans can trust every time you release music.
          </h2>

          <div class="mt-8 grid gap-3 sm:grid-cols-2">
            <div
              v-for="promise in promises"
              :key="promise.title"
              class="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
              <p class="text-lg font-semibold tracking-[-0.03em] text-[#edf2f7]">{{ promise.title }}</p>
              <p class="mt-2 text-sm leading-6 text-[#98a1af]">{{ promise.text }}</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import appleIcon from '~/assets/svg/apple.svg?url';
import deezerIcon from '~/assets/svg/deezer.svg?url';
import facebookMonoIcon from '~/assets/svg/facebook_mono.svg?url';
import instagramMonoIcon from '~/assets/svg/instagram_mono.svg?url';
import spotifyIcon from '~/assets/svg/spotifyLogo.svg?url';
import tidalIcon from '~/assets/svg/tidal.svg?url';
import tiktokMonoIcon from '~/assets/svg/tiktok_mono.svg?url';
import youtubeIcon from '~/assets/svg/youtube_mono.svg?url';
import youtubeMusicIcon from '~/assets/svg/youtubeMusic.svg?url';

const navLinks = [
  { label: 'Pricing', to: '/' },
  { label: 'FAQ', to: '/' },
  { label: 'Log in', to: '/login' },
];

const valuePoints = [
  { title: 'Socials', text: 'Keep your artist bio link clean and current.' },
  { title: 'Streaming links', text: 'Let fans choose where they listen.' },
  { title: 'All-in-one link', text: 'Keep music platforms and socials together in one clean page.' },
];

const benefits = [
  { title: 'Easy to use', text: 'Create your page in one click with your Spotify profile as the starting point.' },
  { title: 'Always up to date', text: 'New releases show up first, without you rebuilding your site every time.' },
  { title: 'Social media links', text: 'Give fans one reliable place to find your profiles and latest music.' },
  { title: 'Multi-platform links', text: 'Give fans one destination with links to the streaming services they already use.' },
];

const promises = [
  { title: 'Fast setup', text: 'Connect Spotify and launch in minutes.' },
  { title: 'Always current', text: 'Latest releases stay at the top automatically.' },
  { title: 'Professional by default', text: 'Your page looks consistent from the first publish, without a design project.' },
  { title: 'Audience ready', text: 'Use one URL across social bios, campaigns, and release announcements.' },
];

const previewPlatforms = [
  { name: 'Spotify', icon: spotifyIcon },
  { name: 'Apple Music', icon: appleIcon },
  { name: 'Deezer', icon: deezerIcon },
  { name: 'TIDAL', icon: tidalIcon },
  { name: 'YouTube Music', icon: youtubeMusicIcon },
];

const socialPlatforms = [
  { name: 'Instagram', icon: instagramMonoIcon },
  { name: 'TikTok', icon: tiktokMonoIcon },
  { name: 'YouTube', icon: youtubeIcon },
  { name: 'Facebook', icon: facebookMonoIcon },
];

useHead({
  title: 'Soundlog | Artist websites without the upkeep',
  meta: [
    {
      name: 'description',
      content: 'Soundlog gives independent artists a clean, auto-updating website generated from Spotify and built for release promotion.',
    },
  ],
});
</script>
