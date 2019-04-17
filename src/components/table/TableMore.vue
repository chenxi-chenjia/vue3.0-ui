<template>
    <div>
        <div v-if="slotVisible">
            <slot/>
        </div>
        <div v-else>
            <el-dropdown
                trigger="click"
            >
                <el-button
                    type="text"
                >
                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu
                    slot="dropdown"
                    style="padding-left: 10px;padding-right: 10px;"
                >
                    <slot/>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: "more",
        data() {
            return {
                slotVisible: true,
                eleList: [],
            }
        },
        mounted() {
            const eleList = this.$slots.default
            if (eleList.length >= 4) {
                this.eleList = eleList
                this.slotVisible = false
            }
        }
    }
</script>

<style scoped>

</style>
