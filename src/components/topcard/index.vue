<template>
    <div>
        <Card v-bind="$attrs">
            <p slot="title">{{$route.meta.title}}</p>
            <slot></slot>
        </Card>
    </div>
</template>
<script>
import { Card } from "iview";
export default {
    components: {
        Card
    }
}
</script>