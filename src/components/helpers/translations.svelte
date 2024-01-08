<script>

    import { getTranslations } from "../../../stores/addTranslations"
    export let translations

    const translation = translations.attributes.translation.reduce((obj, item) => {
        obj[item.key] = item.value;
        return obj;
    }, {});

    getTranslations.set({...translation})

</script>