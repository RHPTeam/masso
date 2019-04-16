# Vue.js full calender.

It is inpired by the nice (but limited by design) https://fullcalendar.io/

[Live demo here](http://rhp/library/vue-rhp-fullcalendar/)

### Install

```bash
npm install vue-rhp-fullcalendar --save
```

### Import
This components is registered as a global component.

### Use

```xml

<fullcalendar
    :view = "calendarView"
/>

```

### Properties

| Name            | Type              | Default     | Description                        |
| ---             | ---               | ---         | ---                                |
| view            | String            | `month`     | Selected view. Value can be: 'month', 'week', 'day' and 'list' |

### Events

| Name   | Description              |
| ---    | ---                      |
| change | Triggered whenever state of the component changes. <br>Contains: <br>`value` - state of the object <br>`srcEvent` - source click event |
| input  | Input event for v-model |

