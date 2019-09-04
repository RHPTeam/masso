<template>
  <div
    :tabindex="searchable ? -1 : tabindex"
    :class="{ 'multiselect--active': isOpen, 'multiselect--disabled': disabled, 'multiselect--above': isAbove }"
    @focus="activate()"
    @blur="searchable ? false : deactivate()"
    @keydown.self.down.prevent="pointerForward()"
    @keydown.self.up.prevent="pointerBackward()"
    @keypress.enter.tab.stop.self="addPointerElement($event)"
    @keyup.esc="deactivate()"
    class="multiselect"
    role="combobox"
    :data-theme="theme"
    :aria-owns="'listbox-'+id">
    <slot name="caret" :toggle="toggle">
      <div @mousedown.prevent.stop="toggle()" class="multiselect__select"></div>
    </slot>
    <slot name="clear" :search="search"></slot>
    <div ref="tags" class="multiselect__tags">
      <slot
        name="selection"
        :search="search"
        :remove="removeElement"
        :values="visibleValues"
        :is-open="isOpen"
      >
        <div class="multiselect__tags-wrap" v-show="visibleValues.length > 0">
          <template v-for="(option, index) of visibleValues" @mousedown.prevent>
            <slot name="tag" :option="option" :search="search" :remove="removeElement">
                <span class="multiselect__tag" :key="index">
                  <span v-text="getOptionLabel(option)"></span>
                  <i aria-hidden="true" tabindex="1" @keypress.enter.prevent="removeElement(option)"  @mousedown.prevent="removeElement(option)" class="multiselect__tag-icon"></i>
                </span>
            </slot>
          </template>
        </div>
        <template v-if="internalValue && internalValue.length > limit">
          <slot name="limit">
            <strong class="multiselect__strong" v-text="limitText(internalValue.length - limit)"/>
          </slot>
        </template>
      </slot>
      <transition name="multiselect__loading">
        <slot name="loading">
          <div v-show="loading" class="multiselect__spinner"/>
        </slot>
      </transition>
      <input
        ref="search"
        v-if="searchable"
        :name="name"
        :id="id"
        type="text"
        autocomplete="off"
        spellcheck="false"
        :placeholder="placeholder"
        :style="inputStyle"
        :value="search"
        :disabled="disabled"
        :tabindex="tabindex"
        @input="updateSearch($event.target.value)"
        @focus.prevent="activate()"
        @blur.prevent="deactivate()"
        @keyup.esc="deactivate()"
        @keydown.down.prevent="pointerForward()"
        @keydown.up.prevent="pointerBackward()"
        @keypress.enter.prevent.stop.self="addPointerElement($event)"
        @keydown.delete.stop="removeLastElement()"
        class="multiselect__input"
        :aria-controls="'listbox-'+id"
      />
      <span
        v-if="isSingleLabelVisible"
        class="multiselect__single"
        @mousedown.prevent="toggle"
      >
          <slot name="singleLabel" :option="singleValue">
            <template>{{ currentOptionLabel }}</template>
          </slot>
        </span>
      <span
        v-if="isPlaceholderVisible"
        class="multiselect__placeholder"
        @mousedown.prevent="toggle"
      >
          <slot name="placeholder">
            {{ placeholder }}
          </slot>
        </span>
    </div>
    <transition name="multiselect">
      <div
        class="multiselect__content-wrapper"
        v-show="isOpen"
        @focus="activate"
        tabindex="-1"
        @mousedown.prevent
        :style="{ maxHeight: optimizedHeight + 'px' }"
        ref="list"
      >
        <ul class="multiselect__content" :style="contentStyle" role="listbox" :id="'listbox-'+id">
          <slot name="beforeList"></slot>
          <li v-if="multiple && max === internalValue.length">
              <span class="multiselect__option">
                <slot name="maxElements">Đã chọn tối đa {{ max }} tùy chọn.</slot>
              </span>
          </li>
          <template v-if="!max || internalValue.length < max">
            <li class="multiselect__element"
                v-for="(option, index) of filteredOptions"
                :key="index"
                v-bind:id="id + '-' + index"
                v-bind:role="!(option && (option.$isLabel || option.$isDisabled)) ? 'option' : null">
                <span
                  v-if="!(option && (option.$isLabel || option.$isDisabled))"
                  :class="optionHighlight(index, option)"
                  @click.stop="select(option)"
                  @mouseenter.self="pointerSet(index)"
                  :data-select="option && option.isTag ? tagPlaceholder : selectLabelText"
                  :data-selected="selectedLabelText"
                  :data-deselect="deselectLabelText"
                  class="multiselect__option">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
              <span
                v-if="option && (option.$isLabel || option.$isDisabled)"
                :data-select="groupSelect && selectGroupLabelText"
                :data-deselect="groupSelect && deselectGroupLabelText"
                :class="groupHighlight(index, option)"
                @mouseenter.self="groupSelect && pointerSet(index)"
                @mousedown.prevent="selectGroup(option)"
                class="multiselect__option">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
            </li>
          </template>
          <li v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
              <span class="multiselect__option">
                <slot name="noResult" :search="search">Không tìm thấy tùy chọn nào.</slot>
              </span>
          </li>
          <li v-show="showNoOptions && (options.length === 0 && !search && !loading)">
              <span class="multiselect__option">
                <slot name="noOptions">Danh sách trống.</slot>
              </span>
          </li>
          <slot name="afterList"></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss">
@import "./style.scss";
</style>
