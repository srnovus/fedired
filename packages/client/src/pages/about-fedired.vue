<template>
  <MkStickyContainer>
    <template #header>
      <MkPageHeader :actions="headerActions" :tabs="headerTabs"/>
    </template>
    <div style="overflow: clip">
      <MkSpacer :content-max="600" :margin-min="20">
        <div class="_formRoot znqjceqz">
          <div id="debug"></div>
          <div
            ref="containerEl"
            v-panel
            class="_formBlock about"
            :class="{ playing: easterEggEngine != null }"
          >
            <img
              src="/client-assets/about-icon.png"
              alt=""
              class="icon"
              draggable="false"
              @load="iconLoaded"
              @click="gravity"
            />
            <div class="misskey">Fedired</div>
            <div class="version">v{{ version }}</div>
            <span
              v-for="emoji in easterEggEmojis"
              :key="emoji.id"
              class="emoji"
              :data-physics-x="emoji.left"
              :data-physics-y="emoji.top"
              :class="{
                _physics_circle_: !emoji.emoji.startsWith(':'),
              }"
            >
              <MkEmoji
                class="emoji"
                :emoji="emoji.emoji"
                :custom-emojis="instanceEmojis"
                :is-reaction="false"
                :normal="true"
                :no-style="true"
              />
            </span>
          </div>
          <div class="_formBlock" style="text-align: center">
            {{ i18n.ts._aboutFedired.about }}<br />
            <a
              href="https://help.fedired.com/project/fedired.html"
              target="_blank"
              class="_link"
            >
              {{ i18n.ts.learnMore }}
            </a>
          </div>
          <div class="_formBlock" style="text-align: center">
            <MkButton primary rounded inline @click="iLoveMisskey">
              I <Mfm text="$[jelly ❤]" /> #Fedired
            </MkButton>
          </div>
          <FormSection>
            <div class="_formLinks">
              <FormLink to="https://github.com/fedired-dev/fedired/" external>
                <template #icon>
                  <i :class="icon('ph-code')"></i>
                </template>
                {{ i18n.ts._aboutFedired.source }}
                <template #suffix>Codigo Fuente</template>
              </FormLink>
              <FormLink to="https://patreon.com/fedired/" external>
                <template #icon>
                  <i :class="icon('ph-heart')"></i>
                </template>
                Donar
                <template #suffix>Donation</template>
              </FormLink>
              <FormLink to="https://help.fedired.com/legal/licencias.html" external>
                <template #icon>
                  <i :class="icon('ph-gavel')"></i>
                </template>
                Legal
                <template #suffix>Licencias</template>
              </FormLink>
            </div>
          </FormSection>

          <!-- New Section: Developer Principal -->
          <FormSection>
            <template #label>Desarrollador Principal</template>
            <div class="_formBlock" style="text-align: center">
              <p>
                El desarrollo principal de Fedired fue liderado por <strong>@devPrincipal</strong>, quien ha sido fundamental para la creación y mantenimiento de esta plataforma.
              </p>
            </div>
          </FormSection>

          <!-- New Section: Contributors -->
          <FormSection>
            <template #label>Contribuyentes</template>
            <div class="contributors">
              <div
                class="contributor"
                v-for="contributor in contributors"
                :key="contributor.username"
              >
                <a :href="contributor.link" target="_blank" class="_contributor">
                  <img :src="contributor.avatar" class="contributorAvatar" />
                  <span class="contributorUsername">{{ contributor.username }}</span>
                </a>
              </div>
            </div>
          </FormSection>

          <!-- New Section: Donors -->
          <FormSection>
            <template #label>Donadores</template>
            <div class="_formBlock" style="text-align: center">
              <p>
                Agradecemos a nuestros donadores que han apoyado el proyecto a través de Patreon y otras plataformas.
              </p>
              <ul>
                <li><strong>@donor1</strong> - Donación mensual</li>
                <li><strong>@donor2</strong> - Donación única</li>
              </ul>
            </div>
          </FormSection>

          <!-- New Section: Acknowledgments -->
          <FormSection>
            <template #label>Agradecimientos</template>
            <div class="_formBlock" style="text-align: center">
              <p>
                Queremos agradecer a todas las personas que han aportado a Fedired, ya sea con código, ideas, pruebas o recursos. Sin su ayuda, esto no sería posible.
              </p>
            </div>
          </FormSection>
        </div>
      </MkSpacer>
    </div>
  </MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { version } from "@/config";
import FormLink from "@/components/form/link.vue";
import FormSection from "@/components/form/section.vue";
import MkButton from "@/components/MkButton.vue";
import { physics } from "@/scripts/physics";
import { i18n } from "@/i18n";
import { defaultReactions, defaultStore } from "@/store";
import * as os from "@/os";
import { definePageMetadata } from "@/scripts/page-metadata";
import icon from "@/scripts/icon";
import { getInstanceInfo } from "@/instance";

let easterEggReady = false;
const easterEggEmojis = ref([]);
const easterEggEngine = ref(null);
const containerEl = ref<HTMLElement>();
const instanceEmojis = getInstanceInfo().emojis;

function iconLoaded() {
  const emojis =
    defaultStore.state.reactions.length > 0
      ? defaultStore.state.reactions
      : defaultReactions;
  const containerWidth = containerEl.value?.offsetWidth;
  for (let i = 0; i < 32; i++) {
    easterEggEmojis.value.push({
      id: i.toString(),
      top: -(128 + Math.random() * 256),
      left: Math.random() * containerWidth,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    });
  }
  nextTick(() => {
    easterEggReady = true;
  });
}

function gravity() {
  if (!easterEggReady) return;
  easterEggReady = false;
  easterEggEngine.value = physics(containerEl.value);
}

function iLoveMisskey() {
  os.post({
    initialText: "I $[jelly ❤] #Fedired",
    instant: true,
  });
}

onBeforeUnmount(() => {
  if (easterEggEngine.value) {
    easterEggEngine.value.stop();
  }
});

const headerActions = computed(() => []);
const headerTabs = computed(() => []);
definePageMetadata({
  title: i18n.ts.aboutFedired,
  icon: null,
});

const contributors = [
  {
    username: '@srnovus',
    link: 'https://fedired.com/@srnovus',
    avatar: 'https://avatars.githubusercontent.com/u/81489497?v=4',
  },
  {
    username: '@anotherDev',
    link: 'https://fedired.com/@anotherDev',
    avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
  }
];

</script>

<style lang="scss" scoped>
.znqjceqz {
  /* Existing styles */
}

._formLinks {
  /* Existing styles */
}

.contributors {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;

  .contributor {
    display: flex;
    align-items: center;
    padding: 12px;
    background: var(--MI_THEME-buttonBg);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .contributorAvatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 12px;
    }

    .contributorUsername {
      font-size: 18px;
      font-weight: bold;
      color: var(--MI_THEME-textColor);
    }
  }
}
</style>
