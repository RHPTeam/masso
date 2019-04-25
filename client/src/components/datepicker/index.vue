<template>
  <div class="rhp-datepicker" :class="[wrapperClass, isRtl ? 'rtl' : '']">
    <date-input
      :selectedDate="selectedDate"
      :resetTypedDate="resetTypedDate"
      :format="format"
      :translation="translation"
      :inline="inline"
      :id="id"
      :name="name"
      :refName="refName"
      :openDate="openDate"
      :placeholder="placeholder"
      :inputClass="inputClass"
      :typeable="typeable"
      :clearButton="clearButton"
      :clearButtonIcon="clearButtonIcon"
      :calendarButton="calendarButton"
      :calendarButtonIcon="calendarButtonIcon"
      :calendarButtonIconContent="calendarButtonIconContent"
      :disabled="disabled"
      :required="required"
      :bootstrapStyling="bootstrapStyling"
      :use-utc="useUtc"
      @showCalendar="showCalendar"
      @closeCalendar="close"
      @typedDate="setTypedDate"
      @clearDate="clearDate"
    >
      <slot name="afterDateInput" slot="afterDateInput"></slot>
    </date-input>

    <!-- Day View -->
    <picker-day
      v-if="allowedToShowView('day')"
      :pageDate="pageDate"
      :selectedDate="selectedDate"
      :showDayView="showDayView"
      :fullMonthName="fullMonthName"
      :allowedToShowView="allowedToShowView"
      :disabledDates="disabledDates"
      :highlighted="highlighted"
      :calendarClass="calendarClass"
      :calendarStyle="calendarStyle"
      :translation="translation"
      :pageTimestamp="pageTimestamp"
      :isRtl="isRtl"
      :mondayFirst="mondayFirst"
      :dayCellContent="dayCellContent"
      :use-utc="useUtc"
      @changedMonth="handleChangedMonthFromDayPicker"
      @selectDate="selectDate"
      @showMonthCalendar="showMonthCalendar"
      @selectedDisabled="selectDisabledDate"
    >
      <slot name="beforeCalendarHeader" slot="beforeCalendarHeader"></slot>
    </picker-day>

    <!-- Month View -->
    <picker-month
      v-if="allowedToShowView('month')"
      :pageDate="pageDate"
      :selectedDate="selectedDate"
      :showMonthView="showMonthView"
      :allowedToShowView="allowedToShowView"
      :disabledDates="disabledDates"
      :calendarClass="calendarClass"
      :calendarStyle="calendarStyle"
      :translation="translation"
      :isRtl="isRtl"
      :use-utc="useUtc"
      @selectMonth="selectMonth"
      @showYearCalendar="showYearCalendar"
      @changedYear="setPageDate"
    >
      <slot name="beforeCalendarHeader" slot="beforeCalendarHeader"></slot>
    </picker-month>

    <!-- Year View -->
    <picker-year
      v-if="allowedToShowView('year')"
      :pageDate="pageDate"
      :selectedDate="selectedDate"
      :showYearView="showYearView"
      :allowedToShowView="allowedToShowView"
      :disabledDates="disabledDates"
      :calendarClass="calendarClass"
      :calendarStyle="calendarStyle"
      :translation="translation"
      :isRtl="isRtl"
      :use-utc="useUtc"
      @selectYear="selectYear"
      @changedDecade="setPageDate"
    >
      <slot name="beforeCalendarHeader" slot="beforeCalendarHeader"></slot>
    </picker-year>
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss">
@import "./styles/index.scss";
</style>
