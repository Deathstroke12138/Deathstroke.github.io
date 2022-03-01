<template>
  <el-form :model="form" ref="form" label-width="100px" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.model"
      :label="item.label"
    >
      <el-input
        v-model="form[item.model]"
        v-if="!item.type"
        :placeholder="'请输入' + item.label"
      ></el-input>
      <el-select
        v-model="form[item.model]"
        placeholder="请选择"
        v-if="item.type === 'select'"
      >
        <el-option
          v-for="subItem in item.options"
          :key="subItem.value"
          :value="subItem.value"
          :label="subItem.label"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="form[item.model]"
        type="date"
        placeholder="选择日期"
        v-if="item.type === 'date-picker'"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array,
  },
};
</script>

<style>
</style>