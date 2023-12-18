<script lang="ts">
	import dayjs from 'dayjs'
	import { getTranslations } from '../../../stores/addTranslations.ts'
	import advancedFormat from 'dayjs/plugin/advancedFormat'
	import 'dayjs/locale/it'
	dayjs.extend(advancedFormat)
	dayjs.locale(import.meta.env.LANG)
	
	export let timeDate: string
	
	const formattedDate = dayjs(timeDate).format('D MMM YYYY')
</script>

<div class="sub-header text-[0.6875em] italic capitalize">
	{$getTranslations.lastUpdated}
	<!-- {dayjs(timeDate).format('D MMM YYYY')} -->
	{formattedDate}
</div>
