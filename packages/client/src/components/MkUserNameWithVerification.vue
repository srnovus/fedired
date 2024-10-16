<template>
	<div class="user-name">
		<MkUserName :user="user" :nowrap="true" />
		<span v-if="user.isAdmin && user.username === 'srnovus'" v-tooltip.noDelay="'Verificado'" style="color: var(--badge); margin-left: 4px;">
			<i :class="icon('ph-bold ph-seal-check')" style="font-size: 1.2em;"></i> <!-- Ícono de verificación para administrador -->
		</span>
		<span v-if="user.isModerator && user.username === 'fedired'" v-tooltip.noDelay="'Verificado'" style="color: var(--badge); margin-left: 4px;">
			<i :class="icon('ph-bold ph-seal-check')" style="font-size: 1.2em;"></i> <!-- Ícono de verificación para moderador -->
		</span>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	user: entities.UserDetailed;
}>();
</script>
