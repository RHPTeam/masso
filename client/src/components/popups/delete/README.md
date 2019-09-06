# Delete Popup

### Import
```bash
import DeletePopup from "@/components/popups/delete"
```

### Use

```xml

<delete-pdopup
    v-if="isShowDeleteCampaignPopup === true"
    :data-theme="currentTheme"
    title="Xoá chiến dịch"
    storeActionName="deleteCampaign"
    :targetData="campaignDelete._id"
    :targetName="campaignDelete.title"
    typeName="chiến dịch"
    v-on:closePopup="isShowDeleteCampaignPopup = $event"
/>

```

### Properties

| Name            | Type              | Default     | Description                        |
| ---             | ---               | ---         | ---                                |
| title           | String            | -           | Popup title                        |
| multiple        | Boolean           | `false`     | Set value is true if delete multiple items |
| description     | String            | -           | Describe or warn when users delete data in case of deleting multiple items. |
| confirmDelete   | Boolean           | `false`     | If true, required enter DELETE in order to confirm before deleting data
| typeName        | String            | -           | Name of delete data type |
| storeActionName | String            | -           | Name of delete action will called |
| targetData      | Any               | -           | The value will dispatch to delete action| 
| targetName      | String            | -           | Name of item will be deleted | 

### Events

| Name       | Description                                |
| ---        | ---                                        |
| closePopup | Triggered when popup is closed. |
