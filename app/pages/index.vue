<template>
  <div class="min-h-full text-[#f9f9f9]">
    <header class="flex flex-wrap items-center justify-between gap-4 border-b border-[#23232b] pb-5">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.12em] text-[#f9f9f9] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#594ddf]">
        <span class="inline-flex rounded-full border border-[#23232b] bg-[#14151a] px-2.5 py-2">
          <img src="/soundlogo_only.svg" alt="Soundlog" class="h-6 w-auto" />
        </span>
        <span>SOUNDLOG</span>
      </NuxtLink>

      <nav class="flex flex-wrap items-center gap-3 sm:gap-4">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="text-sm text-[#808080] transition hover:text-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#594ddf]">
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="inline-flex items-center justify-center border border-[#594ddf] bg-[#594ddf] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#6a5ff0] hover:bg-[#6a5ff0] focus:outline-none focus:ring-2 focus:ring-[#8f87ff]">
          Get started
        </NuxtLink>
      </nav>
    </header>

    <main class="space-y-6 pt-6 lg:space-y-8">
      <section class="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div class="flex h-full min-w-0 flex-col border border-[#23232b] bg-[#121319] px-5 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f87ff]">For independent artists</p>
          <h1 class="mt-4 max-w-3xl text-[clamp(2.4rem,5.8vw,5.1rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#f9f9f9]">
            Your personal artist website in one click.
          </h1>
          <p class="mt-5 max-w-xl text-[0.98rem] leading-7 text-[#b4b6bd] sm:text-base">
            Soundlog builds your page from Spotify, keeps releases current, and gives fans one clean place to find your music.
          </p>

          <div class="mt-7 flex flex-wrap items-center gap-3">
            <NuxtLink
              to="/register"
              class="inline-flex items-center justify-center border border-[#594ddf] bg-[#594ddf] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#6a5ff0] hover:bg-[#6a5ff0] focus:outline-none focus:ring-2 focus:ring-[#8f87ff]">
              Start free trial
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="inline-flex items-center justify-center border border-[#2c2e37] bg-[#111218] px-5 py-3 text-sm font-semibold text-[#f9f9f9] transition hover:border-[#3a3d49] hover:bg-[#171922] focus:outline-none focus:ring-2 focus:ring-[#8f87ff]">
              Sign in
            </NuxtLink>
          </div>

          <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#8d9198]">
            <span>Free 14-day trial</span>
            <span>No credit card required</span>
            <span>Spotify-powered setup</span>
          </div>

          <div class="mt-10 grid flex-1 content-start gap-3">
            <article
              v-for="item in heroFacts"
              :key="item.title"
              class="border border-[#23232b] bg-[#0f1014] p-4 transition hover:border-[#313340]">
              <p class="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#808080]">{{ item.title }}</p>
              <p class="mt-3 text-sm leading-6 text-[#e6e7eb]">{{ item.text }}</p>
            </article>
          </div>
        </div>

        <div class="min-w-0">
          <article class="flex h-full min-w-0 flex-col overflow-hidden border border-[#23232b] bg-[#111218]">
            <div class="border-b border-[#23232b] px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#808080]">
              Example artist page
            </div>
            <div class="min-w-0 flex flex-1 flex-col overflow-hidden gap-4 p-5 sm:p-6">
              <div class="aspect-[21/9] w-full max-w-full overflow-hidden border border-[#23232b] bg-[url('/hero_image.jpg')] bg-cover bg-center"></div>
              <div class="min-w-0 flex-1 space-y-4">
                <div class="min-w-0">
                  <div class="flex flex-wrap items-center gap-3">
                    <p class="text-xl font-semibold tracking-[-0.04em] text-[#f9f9f9]">Armin van Buuren</p>
                    <span class="shrink-0 border border-[#2f3140] bg-[#171922] px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#cfd1ff]">
                      Pro
                    </span>
                  </div>
                    <p class="mt-1 text-sm text-[#8d9198]">armin.soundlog.link</p>
                  <div class="mt-3 flex max-w-full flex-wrap gap-2">
                    <span
                      v-for="social in socialPlatforms"
                      :key="social.name"
                      class="inline-flex max-w-full items-center gap-2 border border-[#2a2b33] bg-[#111218] px-3 py-2 text-xs font-medium text-[#d8dae0]">
                      <img :src="social.icon" alt="" aria-hidden="true" class="h-4 w-4 shrink-0 object-contain" />
                      <span>{{ social.name }}</span>
                    </span>
                  </div>
                </div>

                <div class="border border-[#23232b] bg-[#15171d] p-4 sm:p-5">
                  <p class="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#808080]">Latest release</p>
                  <div class="mt-3 flex items-start gap-3">
                    <div class="h-16 w-16 shrink-0 border border-[#262730] bg-[#0f1014]"></div>
                    <div class="min-w-0">
                      <p class="text-sm font-semibold leading-6 text-[#f9f9f9] [overflow-wrap:anywhere]">Not Even Love (Armin van Buuren Remix)</p>
                      <p class="mt-1 text-sm text-[#8d9198]">Seven Lions</p>
                      <p class="mt-1 text-xs uppercase tracking-[0.16em] text-[#6f737d]">Single · 2024</p>
                    </div>
                  </div>
                  <div class="mt-4 flex max-w-full flex-wrap gap-2">
                    <span
                      v-for="platform in previewPlatforms"
                      :key="platform.name"
                      class="inline-flex max-w-full items-center gap-2 border border-[#2a2b33] bg-[#111218] px-3 py-2 text-xs font-medium text-[#d8dae0]">
                      <img :src="platform.icon" alt="" aria-hidden="true" class="h-4 w-4 shrink-0 object-contain" />
                      <span>{{ platform.name }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="grid gap-4 border border-[#23232b] bg-[#121319] p-4 sm:grid-cols-3 sm:p-5">
        <div
          v-for="point in valuePoints"
          :key="point.title"
          class="space-y-2 border-t border-[#23232b] pt-4 first:border-t-0 first:pt-0 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0 sm:first:border-l-0 sm:first:pl-0">
          <p class="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8f87ff]">{{ point.title }}</p>
          <p class="text-sm leading-6 text-[#b4b6bd]">{{ point.text }}</p>
        </div>
      </section>

      <section class="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <article class="border border-[#23232b] bg-[#111218] p-5 sm:p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#808080]">Why Soundlog</p>
          <div class="mt-5 space-y-5">
            <div v-for="benefit in benefits" :key="benefit.title" class="border-t border-[#23232b] pt-5 first:border-t-0 first:pt-0">
              <div class="flex items-start gap-3">
                <span class="mt-1 h-2.5 w-2.5 shrink-0 bg-[#594ddf]"></span>
                <div>
                  <h2 class="text-lg font-semibold tracking-[-0.03em] text-[#f9f9f9]">{{ benefit.title }}</h2>
                  <p class="mt-2 text-sm leading-6 text-[#8d9198]">{{ benefit.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="border border-[#23232b] bg-[#14151a] p-5 sm:p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#808080]">Built for release cycles</p>
              <h2 class="mt-3 max-w-lg text-3xl font-semibold tracking-[-0.05em] text-[#f9f9f9] sm:text-4xl">
                One page fans can trust every time you drop.
              </h2>
            </div>
            <span class="hidden border border-[#2f3140] bg-[#111218] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#cfd1ff] sm:inline-flex">
              Always current
            </span>
          </div>

          <div class="mt-8 grid gap-3 sm:grid-cols-2">
            <div
              v-for="promise in promises"
              :key="promise.title"
              class="border border-[#23232b] bg-[#101114] p-4">
              <p class="text-sm font-semibold text-[#f9f9f9]">{{ promise.title }}</p>
              <p class="mt-2 text-sm leading-6 text-[#8d9198]">{{ promise.text }}</p>
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

const heroFacts = [
  { title: 'Fast setup', text: 'Connect Spotify and launch in minutes.' },
  { title: 'Always current', text: 'Latest releases stay at the top automatically.' },
  { title: 'One clean link', text: 'Music, socials, and audience signals in one page.' },
];

const previewPlatforms = [
  { name: 'Spotify', icon: spotifyIcon },
  { name: 'Apple Music', icon: appleIcon },
  { name: 'Deezer', icon: deezerIcon },
  { name: 'TIDAL', icon: tidalIcon },
  { name: 'YouTube Music', icon: youtubeMusicIcon },
];

const valuePoints = [
  { title: 'Socials', text: 'Keep your artist bio link clean and current.' },
  { title: 'Streaming links', text: 'Let fans choose where they listen.' },
  { title: 'Artist links', text: 'Keep music platforms and socials together in one clean page.' },
];

const benefits = [
  { title: 'Easy to use', text: 'Create your page in one click with your Spotify profile as the starting point.' },
  { title: 'Always up to date', text: 'New releases show up first, without you rebuilding your site every time.' },
  { title: 'Social media links', text: 'Give fans one reliable place to find your profiles and latest music.' },
  { title: 'Multi-platform links', text: 'Give fans one destination with links to the streaming services they already use.' },
];

const socialPlatforms = [
  { name: 'Instagram', icon: instagramMonoIcon },
  { name: 'TikTok', icon: tiktokMonoIcon },
  { name: 'YouTube', icon: youtubeIcon },
  { name: 'Facebook', icon: facebookMonoIcon },
];

const promises = [
  { title: 'Multi-platform links', text: 'Give every release one destination that routes fans to the service they already use.' },
  { title: 'Professional by default', text: 'Your page looks consistent from the first publish, without a design project.' },
  { title: 'Audience ready', text: 'Use one URL across social bios, campaigns, and release announcements.' },
  { title: 'Less upkeep', text: 'Spend your time on music, not on manually maintaining a personal website.' },
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
