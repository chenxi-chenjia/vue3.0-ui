<template>
    <div
        :class="`navbar-item ${alignClass} ${hoverClass}`"
        @click="clickHandel"
    >
        <slot/>
    </div>
</template>

<script>
    export default {
        props: {
            align: {
                type: String,
                default: 'left',
            },
            hover: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            alignClass() {
                return this.align === 'right' ? 'pull-right' : 'pull-left'
            },

            hoverClass() {
                return this.hover ? 'hover' : ''
            }
        },
        methods: {
            clickHandel() {
                const slots = this.$slots
                if (
                    slots.default &&
                    Array.isArray(slots.default) &&
                    slots.default.length > 0 &&
                    slots.default[0].child &&
                    typeof slots.default[0].child.click === 'function'
                ) {
                    slots.default[0].child.click()
                }
            }
        },
        created() {
            if (this.$slots.default && this.$slots.default.length > 1) {
                console.error('NavItem只能含有一个组件')
            }
        }
    }
</script>

<style lang="less" scoped>
    .navbar-item {
        display: flex;
        justify-content: center;
        height: @navBar-height;
        min-width: @navBar-height;
    }

    .hover{
        cursor: pointer;
    }

    .hover:hover {
        background: #f9f9f9;
    }
</style>
