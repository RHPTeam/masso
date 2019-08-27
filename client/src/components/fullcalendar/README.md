# Vue.js full calender.

It is inspired by the nice (but limited by design) https://fullcalendar.io/

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
| view            | String            | `month`     | Selected calendar view. Value must be: `month`, `week`, `day` or `list` |
| theme           | String            | `light`     | Choose calendar style. Value must be: `light`, `dark` |
| disabledView    | Boolean           | `false`     | Disable all event on calendar view |
| events          | Array             | `[]`        | Events data of calendar |

### Events

| Name       | Description                                |
| ---        | ---                                        |
| eventClick | Triggered whenever click on calendar event.|
| timeClick  | Triggered whenever click on time area.     |
