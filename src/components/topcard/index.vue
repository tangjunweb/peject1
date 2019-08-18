<template>
    <div>
        <Card v-bind="$attrs">
            <p slot="title">{{$route.meta.title || $route.matched[$route.matched.length - 2].meta.title}}</p>
            <slot></slot>
        </Card>
    </div>
</template>
<script>
import { Card } from "iview";
export default {
    components: {
        Card
    },
    mounted() {

    },
}
</script>