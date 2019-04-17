<template>
    <el-input
        clearable
        :placeholder="placeholder"
        v-model="searchContent"
        class="full-width"
        @change="change"
        :prefix-icon="typeList.length > 0 ? '' : 'el-icon-search'"
    >
        <el-select
            v-if="typeList.length > 0"
            @change="select"
            clearable
            class="select-width"
            v-model="searchType"
            slot="prepend"
            placeholder="请选择"
        >
            <el-option
                v-for="(item,index) in typeList"
                :key="index"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
        <el-button
            slot="append"
            icon="el-icon-search"
            @click="click"
        />
    </el-input>
</template>

<script>
    export default {
        props: {
            placeholder: {
                field: String,
                default: '请输入搜索内容',
            },
            model: {
                field: String,
                default: '',
            },
            type: {
                field: String,
                default: '',
            },
            typeList: {
                field: Array,
                default: () => [],
            },
            search: {
                field: Function,
                default: null,
            },
        },
        watch: {
            model(val) {
                this.searchContent = val
            },
            type(val) {
                this.searchType = val
            }
        },
        data() {
            return {
                searchContent: null,
                searchType: null,
            }
        },
        methods: {
            click() {
                if (typeof this.search === 'function') {
                    this.search()
                }
            },
            change() {
                this.$emit('update:model', this.searchContent)
            },
            select() {
                this.$emit('update:type', this.searchType)
            }
        }
    }
</script>

<style scoped>
    .full-width {
        width: 100%;
    }

    .select-width {
        min-width: 120px;
    }
</style>
