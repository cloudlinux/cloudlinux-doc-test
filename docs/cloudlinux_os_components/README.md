#  CloudLinux OS Components

## Reseller Limits
### General information and requirements

<span class="notranslate">Reseller limits</span> is a feature that allows hosters to set limits for the resources each reseller can operate with. Hoster also provides controls to the reseller on what resources each reseller’s end user will have. Reseller limits set by a hoster limit the total amount of resources resellers’ end users can consume altogether.

When a hoster has set reseller limits for the particular reseller he provides the reseller with an ability to set limits for his end users within the Reseller Interface.

#### Types of Users

Starting from the **version 3.0-18**, <span class="notranslate">LVE Manager</span> operates with four types of users and their resource usage limits.

The types of users are as follows:

* <span class="notranslate">**End User**</span> is a type of user that purchases hosting directly from a hoster and uses it for his own purposes;
* <span class="notranslate">**Reseller**</span> is a type of user that buys hosting from a hoster and resells it to his end users;
* <span class="notranslate">**Reseller’s End User**</span> is a type of user that purchases hosting from a reseller and uses it for his own purposes.
* <span class="notranslate">**Reseller’s End User (no Reseller limit)**</span> is a type of user that purchases hosting from a reseller and uses it for his own purposes but does not have limits set by a reseller. These limits are set by the hoster.

#### Types of Limits

See the comparison Table with types of limits.

| |  |  | |
|-|--|--|-|
|**Limits** | **Reseller limits** | **Reseller’s end user limits** | **Hoster’s end user limits**|
|<span class="notranslate"> [SPEED](/limits/#speed-limits) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [PMEM](/limits/#memory-limits) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [IO](/limits/#io) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [IOPS Limits](/limits/#iops) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [EP](/limits/#entry-processes) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [NPROC](/limits/#number-of-processes) </span> | Yes | Yes | Yes|
|<span class="notranslate"> Inodes </span> | Yes (default for all users) | No | Yes|
|<span class="notranslate"> MySQL Limits </span> | Yes (supported only for <span class="notranslate"> MySQL Governor ALL </span> mode) | Yes (supported only for <span class="notranslate"> MySQL Governor ALL </span> mode) | Yes|

#### What happens when reseller or reseller's end user hits the limit?

:::tip Note
<span class="notranslate">**Reseller**</span> is a virtual entity. So, he cannot hit the limit. There is reseller's end user with the same name as reseller. This end user is limited as any other reseller's end user. When hoster sets Reseller limits he limits the group of resellers' end users including reseller's end user with the same name as the reseller.
:::

* Reseller's end user can hit reseller limit when end user's limit is bigger than reseller's limit. In such case end user will be limited by reseller limit.
* Reseller limit can be hit when all resellers’ end users in total use as much resources as reseller limit.
* Reseller's end user can hit his limit when end user limit is lower than reseller limit. In such case end user will be limited by his limit.

#### Requirements

:::tip Note
Reseller Limits are only supported in kernel starting with the version **3.10.0-714.10.2.lve1.5.3.el7** for <span class="notranslate"> CloudLinux 7 kernel </span> and **3.10.0-714.10.2.lve1.5.3.el6h** for <span class="notranslate"> CloudLinux 6 Hybrid kernel </span>.
:::

:::tip Note
If you are using CloudLinux 6 kernel you would have to migrate to <span class="notranslate">CloudLinux 6 Hybrid</span> kernel first in order to be able to use new Reseller Limits functionality.
:::

### Installation, enabling, and disabling

Use the detailed instruction below:

1. Install CloudLinux 7 or <span class="notranslate">CloudLinux 6 Hybrid</span> on a new server. Follow the instructions described [here](/cloudlinux_installation/#installing-new-servers). Or you can convert your CentOS 6.x or CentOS 7.x system to CloudLinux 6 or CloudLinux 7 respectively. To do this, follow the instructions described on the [link](/cloudlinux_installation/#converting-existing-servers).
2. If you have installed the CloudLinux 6, please convert it to the <span class="notranslate"> CloudLinux 6 Hybrid Kernel</span>. Follow the instructions described [here](/kernel_settings/#hybrid-kernel).
3. Install <span class="notranslate">LVE Manager</span> with <span class="notranslate">Reseller Limit</span> support or update it up to version 3.0-18 (or later) by running the following commands:

    <div class="notranslate">

    ```
    yum install kernel lve cagefs lvemanager lve-utils lve-stats --disableexcludes=main
    ```
    </div>


    <div class="notranslate">

    ```
    yum update
    ```
    </div>

    <div class="notranslate">

    ```
    reboot
    ```
    </div>

    For <span class="notranslate">CloudLinux 6 Hybrid</span> kernel with <span class="notranslate">Reseller Limit</span> support, please run the following commands:

    <div class="notranslate">

    ```
    yum install kernel lve cagefs lvemanager lve-utils lve-stats --disableexcludes=main
    ```
    </div>

    <div class="notranslate">

    ```
    yum update
    ```
    </div>

    <div class="notranslate">

    ```
    reboot
    ```
    </div>

#### How to Enable and Disable Reseller Limits

To start using a new feature <span class="notranslate">**Reseller limits**</span> you would have to enable reseller limits for a particular reseller first.

To enable <span class="notranslate">**Reseller**</span> access, please do the following:

1. Log in with a Hoster access.
2. You can create a new account or give privileges to an existing account.
3. For new account tick a checkbox <span class="notranslate">`Make this account a reseller`</span> in the <span class="notranslate">`Reseller Settings`</span> box.

![](/images/resellersettings.png)

:::tip Note
If checkbox **<span class="notranslate">Make the account own itself</span> (i.e., the user can modify the account)**  is not selected when creating Reseller in cPanel WHM, then user account <span class="notranslate">**Reseller**</span> will belong to root, not to reseller <span class="notranslate">**Reseller**</span>. In such case, the user <span class="notranslate">**Reseller**</span> will be managed by the root. So, LVE limits specified by the root will be applied to the user <span class="notranslate">**Reseller**</span>. User <span class="notranslate">**Reseller**</span> will not be limited by <span class="notranslate">Reseller limits</span>.

When the checkbox is selected, user <span class="notranslate">**Reseller**</span> will be limited by Reseller limits (in addition to personal user limits set by Reseller).
:::

4. Give privileges to the proper Reseller account to make all features work.
5. Go to the <span class="notranslate">_Users_</span> tab and choose a particular reseller you want to enable Reseller limits for and click on the pencil icon.
6. In the pop-up move the slider <span class="notranslate">_Manage Limits_</span>. Click <span class="notranslate">_AGREE_</span> for the question <span class="notranslate">_Are you sure you want to enable limits_</span>, set limits for that reseller if you you want them to be different from the default limits, otherwise default server limits will be applied. Than click the <span class="notranslate">_Save_</span>.

![](/images/hmfile_hash_00664772.png)

    
:::tip Note
Resellers’ end users can use as much resources in total as it is provided for that particular reseller by a hoster. The summary usage of all end users that belong to that particular reseller will not exceed the amount of resources provided to reseller by a hoster. If no Reseller Limits are set, reseller’s end user will be limited by default limits set by a hoster.
:::

#### How to Disable Reseller Limits

To disable Reseller limits, please do the following:

1. Go to the <span class="notranslate">_Users_</span> tab, choose a particular reseller and click on the pencil icon.
2. In the pop-up move the slider <span class="notranslate">_Manage Limits_</span>. Click <span class="notranslate">_AGREE_</span> for the question <span class="notranslate">_Are you sure you want to disable limits_</span>. Than click <span class="notranslate">_Save_</span>.

:::tip Note
If you disable Reseller limits everything will work the same as before. All the end user limits set by the reseller will be saved. But all custom default reseller limits will be disabled.
:::

### User Interface

#### Hoster Interface

Hoster interface allows to monitor and manage limits for hosters’ end users, resellers and resellers’ end users, and also manage packages and monitor statistics.

Hoster credentials allow to control limits for hosters’ end users and resellers. To control reseller end user limits Hoster has to log in as Reseller.

Log in as Hoster to get access to the following functionality.

* <span class="notranslate">[Current Usage](/reseller_limits/#current-usage)</span> tab allows to monitor users and resellers resource usage at the moment.
* <span class="notranslate">[Users](/reseller_limits/#users)</span> tab with the list of all users and resellers allows viewing and managing all the users and resellers limits.
* <span class="notranslate">[Statistics](/reseller_limits/#statistics)</span> tab displays the statistics of resource usage for particular timeframe or particular user.
* <span class="notranslate">[Options](/reseller_limits/#options)</span> tab allows to set LVE faults email notifications for hoster, users, and resellers.
* <span class="notranslate">[Packages](/reseller_limits/#packages)</span> tab allows to manage resellers packages limits;
* <span class="notranslate">[Selector](/reseller_limits/#selector)</span> tab allows to control <span class="notranslate">PHP Selector</span> settings.

<div class="notranslate">

#### Current Usage

</div>

Choose <span class="notranslate">Current Usage</span> tab to monitor users, resellers and resellers’ end users resource usage at the moment displayed in the table.

<span class="notranslate">Current Usage</span> table provides information on usage of the following:
* <span class="notranslate"> SPEED (All</span> and MySQL)
* <span class="notranslate"> memory (MEM)</span>
* data throughput (<span class="notranslate">IO) (All</span> and MySQL)
* read/write operations per second (<span class="notranslate">IOPS</span>)
* number of processes (<span class="notranslate">PNO</span>)
* entry processes (<span class="notranslate">EP</span>)

Resource usage values are being refreshed every 10 seconds by default which is set in <span class="notranslate">_Auto-refresh_</span> field. You can set <span class="notranslate">_Auto-refresh time_</span> by choosing a value from the drop-down.

You can refresh the table manually by clicking <span class="notranslate">_Refresh now_</span> or you can freeze the values by clicking <span class="notranslate">_pause_</span>. Usage values will not change until the next manual refresh. To unfreeze click <span class="notranslate">_unpause_</span>. The countdown will continue.

Tick <span class="notranslate">_Hide MySQL usage_</span> to hide the information on MySQL usage.

The list of users can be filtered by <span class="notranslate">_Username_</span> and <span class="notranslate">_Domain_</span>.

Hoster can **view** all types of users:
* <span class="notranslate">End users</span>
* <span class="notranslate">Resellers</span>
* <span class="notranslate">Reseller’s end users</span>
* <span class="notranslate">Reseller’s end users (no Reseller limit)</span>.

But hoster can only **manage**:
* <span class="notranslate">End users</span>
* <span class="notranslate">Resellers</span>
* <span class="notranslate">Reseller’s end users (no Reseller limit)</span>

To manage Reseller’s end users hoster should login as a reseller.

In the drop-down <span class="notranslate">_Show top_</span> you can choose the number of user to be displayed on the page.

![](/images/currentusagetabhoster_zoom60.png)

<div class="notranslate">

#### Users

</div>

Choose <span class="notranslate">_Users_</span> tab to view the list of all users and manage their limits.

To filter the list by user type click <span class="notranslate">_Manage_</span> and in the drop-down choose:

* <span class="notranslate">End users</span> - to manage hosts end users only.
* <span class="notranslate">Resellers</span> - to manage resellers only.
* <span class="notranslate">Reseller’s end users</span> - to manage resellers’ end users only.
* <span class="notranslate">Reseller’s end users (no Reseller limits)</span> - to manage resellers’ end users that do not have limits specified by reseller (these limits are specified by the hoster).

To filter the list by <span class="notranslate">_Username_, _Domain_, _LveID_</span> click <span class="notranslate">_Filter by_</span> and choose the value in the drop-down.

:::tip Note
A hoster can view the list of resellers’ end users and their limits, but can not manage resellers’ end users limits (if those are set by reseller).
:::

A hoster can view the limits of all types of users and manage the limits for hosters’ end users and resellers’ end users (only those with Reseller Limits disabled).
* Tick <span class="notranslate">_Show users with CageFS enabled_</span> to show users with CageFS file system enabled.
* Tick <span class="notranslate">_Show only ignored users_</span> to show users with ignored <span class="notranslate">MySQL Governor</span>.

![](/images/userstabhoster_zoom70.png)

<div class="notrnslate">

#### Actions

</div>

Click pencil icon in <span class="notranslate">_Actions_</span> column to edit limits for a particular user. The following actions are available:

* Enable/disable <span class="notranslate">CageFS</span>
* <span class="notranslate">**Reset**</span> - to reset limits to default values
* Apply <span class="notranslate">**Do not limit**</span> to set the limits to unlimited;
* Setting the limits values:
  * <span class="notranslate"> SPEED </span>
  * <span class="notranslate"> SPEED MYSQL </span>
  * <span class="notranslate"> VMEM </span>
  * <span class="notranslate"> PMEM </span> 
  * <span class="notranslate"> IO </span>
  * <span class="notranslate"> MySQL IO </span>
  * <span class="notranslate"> IOPS </span>
  * <span class="notranslate"> EP </span>
  * <span class="notranslate"> NPROC </span>
  * <span class="notranslate"> INODES </span> (hard and soft) (for <span class="notranslate">end users</span> and <span class="notranslate">resellers’ end users (with no Reseller Limits)</span>, if a hoster has enabled <span class="notranslate">_Initial quotas_</span> in cPanel settings).

Click <span class="notranslate">_Save_</span> to save changes or <span class="notranslate">_Cancel_</span> to close the pop-up.

![](/images/actionshoster.png)

Click on <span class="notranslate">_History_</span> symbol to view the history of a particular user resource usage. Choose time frame to view the history for a particular time period.

![](/images/historyhoster.jpg)

<div class="notranslate">

#### Statistics

</div>

Choose <span class="notranslate">_Statistics_</span> tab to view end users, resellers and resellers’ end users limits usage statistics.

The following parameters can be displayed in the statistics table:

* <span class="notranslate"> SPEED </span> usage per user;
* <span class="notranslate"> IO </span> usage per user;
* <span class="notranslate"> EP </span> usage per user;
* <span class="notranslate"> VMEM </span> usage per user;
* <span class="notranslate"> PMEM </span> usage per user;
* <span class="notranslate"> NPROC </span> usage per user;
* <span class="notranslate"> IOPS </span> usage per user;
* <span class="notranslate"> MySQL </span> usage per user.

Click <span class="notranslate">_Show_</span> and select columns from the drop-down to set which parameters should be displayed in the table.

Statistics table can be filtered by:

* <span class="notranslate"> Timeframe </span> - to view the statistics for a particular period;
* <span class="notranslate"> Limit </span> - to view a particular limit type usage only;
* <span class="notranslate"> Top LVEs </span> - to view top used limits only;
* <span class="notranslate"> LVE approaching limit </span> - to view the limits that are approaching maximum provided value;
* <span class="notranslate"> Fault LVE </span> - the limits that have reached the maximum value.

Click <span class="notranslate">_Manage_</span> to choose type of users to be displayed - <span class="notranslate">End users, Resellers, Resellers’ end users</span> or <span class="notranslate">Resellers’ end users (no Reseller limit)</span> by ticking checkbox in the drop-down.

![](/images/statisticstabhoster_zoom70.png)

Click chart symbol in the <span class="notranslate">_View_</span> column to view the detailed resource usage history for a particular account. Use timeframe drop-down to view the history for a particular period of time.

![](/images/history_charts_zoom70.png)

<div class="notranslate">

#### Options

</div>

A hoster can set email notifications for panel administrator, reseller customer, and resellers’ customers in cases of limits faults. Choose <span class="notranslate">_Options_</span> tab to manage LVE Faults email notifications.

In <span class="notranslate">_LVE Faults Email Notifications_</span> section tick the required checkboxes to set a type of notification.

* <span class="notranslate"> _Notify Panel Administrator_ </span> - notify hoster when his end users have exceeded minimum number of faults set for particular limits.
* <span class="notranslate"> _Notify Reseller_ </span> - notify reseller when his end users have exceeded minimum number of faults set for particular limits.
* <span class="notranslate"> _Notify Customers_ </span> - notify hosters’ end users when they have exceeded limits.
* <span class="notranslate"> _Notify Reseller's customers_ </span> - notify resellers’ end users when they have exceeded limits.

![](/images/optionstabemailnotifhoster.png)

In <span class="notranslate">_Faults to include_</span> section tick the checkboxes to include required limits to the notifications.
Set the frequency of email notifications sending in <span class="notranslate">_Notify …. every.. days/hours/minutes/seconds_</span> section.

![](/images/optionshosterfaultstoinclude.png)

In <span class="notranslate">_Minimum number of Faults to notify_</span> section enter the number of faults required for the notification to be sent for <span class="notranslate">_Panel Admin & Reseller_</span> and <span class="notranslate">_User_</span>.

![](/images/optionstabhosterminimumftn.png)

* In <span class="notranslate">_Inodes limits_</span> section you can reset inode limits to default values and tick <span class="notranslate">_Show end-user inode usage_</span>.
* In <span class="notranslate">_User interface settings_</span> section tick the required checkboxes to apply user interface settings.
* In <span class="notranslate">_MySQL Governor settings_</span> section you can customize <span class="notranslate"> MySQL Governor</span>.

![](/images/optionstabhosterinodes.png)

<div class="notranslate">

#### Packages

</div>

<span class="notranslate">_Packages_</span> tab allows to set the limits for as many users as you need by editing packages of the limits. Each account belonging to a particular package adheres to those limits.

Choose <span class="notranslate">_Packages_</span> tab to view and modify:

* limits for user packages (created by hoster);
* limits for reseller packages (created by hoster);
* limits for resellers’ end users packages if reseller limits are not set for that reseller (hoster access allows identifying a particular reseller’s end user belonging to a particular reseller (created by reseller)).
  
![](/images/packageshostertab_zoom70.png)

To modify package limits click on a pencil symbol in <span class="notranslate">_Actions_</span> column in a particular package row. The following limits for this package are available for setting:

* <span class="notranslate"> SPEED</span> in percent (%);
* <span class="notranslate"> Virtual memory (VMEM)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> Physical memory (PMEM)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> I/O limits (IO)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> IOPS</span> limits;
* <span class="notranslate"> Concurrent connections (EP)</span>;
* <span class="notranslate"> Number of processes (NPROC)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> INODES (hard and soft)</span> (for end users and resellers’ end users (with no Reseller Limits), if a hoster has enabled <span class="notranslate">_Initial quotas_</span> in cPanel settings.)

When limits are set click <span class="notranslate">_Save_</span> to apply changes or <span class="notranslate">_Cancel_</span> to close the window.

<div class="notranslate">

#### Selector

</div>

<span class="notranslate">_Selector_</span> tab allows to control <span class="notranslate">PHP Selector</span> settings.

* In <span class="notranslate">_Selector is_</span> choose <span class="notranslate">_Enabled_</span> or <span class="notranslate">_Disabled_</span> from the drop-down to enable or disable <span class="notranslate">PHP Selector</span>.

* In <span class="notranslate">_Default PHP version_</span> choose PHP version or <span class="notranslate">_Native_</span> from the drop-down to apply.

* In <span class="notranslate">_Supported versions_</span> choose required PHP versions to support.

Choose default modules from the list for a particular version of PHP or for <span class="notranslate">native</span>.

![](/images/selector01_zoom70.png)

![](/images/selector02_zoom70.png)


### Reseller Interface

Reseller interface is designed to manage limits for resellers’ end users, to monitor statistics and the history of resource usage and to modify reseller’s end user packages limits.

Log in under a particular reseller credentials to have access to the following functionality:

* <span class="notranslate">[Current Usage](/reseller_limits/#current-usage-tab)</span> tab - allows to monitor resellers’ end users resource usage at the moment;
* <span class="notranslate"> [Historical Usage](/reseller_limits/#historical-usage-tab)</span> tab - allows to control resellers’ end users resource usage history;
* <span class="notranslate"> [Users](/reseller_limits/#users-tab)</span> tab with the list of all resellers’ end users allows to view and manage all the reseller’s end user limits;
* <span class="notranslate"> [Statistics](/reseller_limits/#statistics-tab)</span> tab displays the statistics of resource usage for particular timeframe or particular reseller's end user;
* <span class="notranslate"> [Options](/reseller_limits/#options-tab)</span> tab allows to set LVE Faults email notifications.
* <span class="notranslate"> [Packages](/reseller_limits/#packages-tab)</span> tab allows to manage reseller’s end user packages limits.

Please note that reseller can manage all his end users via Reseller Interface. Reseller cannot manage <span class="notranslate"> INODE </span> or <span class="notranslate"> MYSQL </span> limits, neither his own nor for his users.

<div class="notranslate">

#### Current Usage tab

</div>

Current usage table provides the information on the usage of the following:
* <span class="notranslate"> SPEED (All)</span>
* <span class="notranslate">memory (MEM)</span>
* data throughput <span class="notranslate">(IO)(All)</span>
* read/write operations per second (<span class="notranslate">IOPS</span>)
* <span class="notranslate">number of processes (PNO)</span>
* <span class="notranslate">entry processes (EP)</span>

Resource usage data is being refreshed every 10 seconds which is set by default in <span class="notranslate">_Auto-refresh_</span> field. You can set <span class="notranslate">_Auto-refresh time_</span> by choosing the value from the drop-down.

You can refresh the table manually by clicking <span class="notranslate">_Refresh now_</span> or you can freeze the values by clicking <span class="notranslate">_pause_</span> button.

Usage values will not change until the next manual refresh. To unfreeze click on <span class="notranslate">_unpause_</span> button. The countdown will continue.

Reseller cannot manage <span class="notranslate">INODE</span> or MYSQL limits. Neither his own, nor for his users.

The bottom line star in the table displays the total reseller resource usage. It means, that all the usage of resellers’ end users and of his own is displayed as a summary for each parameter.


![](/images/currentusagetabresellerr_zoom70.png)

<div class="notranslate">

#### Historical Usage tab

</div>

Choose <span class="notranslate">_Historical Usage_</span> tab to view reseller and resellers’ end users resource usage history and faults. The list of users can be filtered by <span class="notranslate">_Timeframe_</span>.

When reseller’s end user reaches the limits set by hoster for the reseller, this will be displayed on the chart. 

:::tip Note
In this case reseller’s end user would not necessarily reaches his limits set by the reseller. These faults are not displayed on the chart.
:::

On the <span class="notranslate">_Historical Usage_</span> page the reseller is also able to see the list of <span class="notranslate">_Top 5 Reseller’s end users_</span> (based on resource usage, for the same period as charts/overall usage). Click <span class="notranslate">_History_</span> in the <span class="notranslate">_Actions_</span> column to view resource usage statistics for particular user.

Click <span class="notranslate">_LVE Statistics_</span> on the top of the <span class="notranslate">Top 5</span> list to go to the <span class="notranslate">_Statistics_</span> page to view or manage the rest of users.

![](/images/historicalusageresellertab_zoom70.png)

<div class="notranslate">

#### Users tab

</div>

Choose <span class="notranslate">_Users_</span> tab to view and manage the list of all resellers’ end users and resource usage limits provided for them. The following limits are available for the resellers’ end users:

* <span class="notranslate">SPEED</span>
* <span class="notranslate">PMEM</span>
* <span class="notranslate">IO</span>
* <span class="notranslate">IOPS</span>
* <span class="notranslate">EP</span>
* <span class="notranslate">NPROC</span>

You can filter the list by <span class="notranslate">_Username_, _Domain_, _LVE ID_.</span>

Tick <span class="notranslate">_Show only ignored users_</span> to display only users with <span class="notranslate">MySQL Governor</span> disabled.

![](/images/userstabreseller_zoom70.png)

<div class="notranslate">

#### Actions column

</div>

Click on a pencil icon in <span class="notranslate">_Actions_</span> column to edit limits for a particular user. The following actions are available:

* Click <span class="notranslate">Reset</span> to reset limits to default values.
* Click <span class="notranslate">Apply</span> for <span class="notranslate">Do not limit</span> to set unlimited resources to a user.
* Set values for <span class="notranslate"> PEED, PMEM, IO, IOPS, EP</span>, and NPROC and click <span class="notranslate">_Save_</span> to save changes or <span class="notranslate">_Cancel_</span> to close the window.

![](/images/userstabpopup_zoom70.png)

<div class="notranslate">

#### Statistics tab

</div>

Choose <span class="notranslate">_Statistics_</span> tab to view resource usage limits statistics.

<span class="notranslate">_Statistics_</span> table can be filtered by <span class="notranslate">_Timeframe_, _Limit_, _Top LVEs_, _LVE approaching limit_, _Fault LVE_</span>.

The following parameters are displayed:

* <span class="notranslate"> SPEED</span> per user;
* <span class="notranslate"> PMEM</span> usage per user;
* <span class="notranslate"> IO</span> usage per user;
* <span class="notranslate"> EP</span> usage per user;
* <span class="notranslate"> NPROC</span> usage per user;
* <span class="notranslate"> IOPS</span> usage per user.

![](/images/statisticstabreseller_zoom70.png)


Use <span class="notranslate">_Charts_</span> in the <span class="notranslate">_View_</span> column to view detailed resource usage charts for a particular period of time.

For example, 7 days period chart.

![](/images/sevendayschartresellers_zoom70.png)

<div class="notranslate">


#### Options tab

</div>

Choose <span class="notranslate">_Options_</span> tab to set user email notifications for resellers’ end users.

In <span class="notranslate">_LVE Faults email notifications_</span> section tick appropriate checkboxes to set the required type of notification.

![](/images/optionsresellernotify_zoom70.png)

* <span class="notranslate">_Notify me on users faults_</span> - notify reseller when his users have exceeded limits.
* <span class="notranslate">_Notify Customers_</span> - notify resellers’ end users when they have exceeded limits.
* <span class="notranslate">_Notify me when I hit my limits_</span> - notify reseller when overall resource usage limits are reached.

In <span class="notranslate">_Faults to include_</span> section tick checkboxes to include particular limits to email notifications.

![](/images/options02_zoom70.png)

In <span class="notranslate">_Minimum number of Faults to notify_</span> section enter the number of faults required for the notification to be sent for reseller and customer. You can also set the reseller notification frequency.

Set the frequency of sending the reseller email notifications in <span class="notranslate">_Notify Reseller Every ... days/hours/minutes/seconds_</span> section.

![](/images/options03_zoom70.png)

Click <span class="notranslate">_Save Changes_</span> to apply changes.

<div class="notranslate">

#### Packages tab

</div>

Choose <span class="notranslate">_Packages_</span> tab to view and modify limits for reseller’s packages.

![](/images/packagesreseller_zoom70.png)

Click pencil icon in a package row to set the following limits for a package:

* <span class="notranslate">SPEED</span> limit;
* <span class="notranslate">Physical memory (PMEM)</span> (can be set as unlimited by setting 0);
* <span class="notranslate">I/O</span> limits;
* <span class="notranslate">IOPS</span> limits;
* <span class="notranslate">Concurrent connections (EP)</span> limits.

When limits are set click <span class="notranslate">_Save_</span> to apply changes.

## LVE-Stats 2
### General information and requirements

#### Why is it needed?

* Old LVE-statistics store averages as integer numbers, as % of <span class="notranslate">CPU</span> usage. If user used 100% of <span class="notranslate">CPU</span> for 1 second within an hour, it is only 1-2% for a minute, and 0 for 5 minutes. Data in old LVE-statistics is aggregated to 1-hour intervals. So, such peak load will not be recorded and we need to store data with much higher precision.
* 100% <span class="notranslate">CPU</span> usage in old lve statistics means “all cores”. On 32 core servers usage is not visible for most users (as they are limited to 1 core).
* Old LVE-statistics does not provide a way to determine a cause of LVE faults, i.e. what processes are running when user hits LVE limits.
* Notifications in old LVE-statistics are not accurate because they are based on average values for <span class="notranslate">CPU, IO, IOPS.</span>
* Old LVE-statistics functionality is hard to extend.

#### Major improvements and features

* increased precision of statistics;
* <span class="notranslate">CPU</span> usage is calculated  in terms of % of a single core (100% usage means one core);
* lvestats-server emulates and tracks faults for <span class="notranslate">CPU, IO, IOPS</span>;
* lvestats-server saves “snapshots” of user’s processes and queries for each “incident” - added new lve-read-snapshot utility;
* improved notifications about hitting LVE limits (more informative and without false positives);
* implemented ability to add custom plugins;
* MySQL and <span class="notranslate">PostGreSQL</span> support;
* more pretty, scalable, interactive charts;
* snapshots include HTTP-requests.

#### What features will be implemented in the future?

* Notifications for control panels other than CPanel.
* Burstable Limits/server health: We are monitoring server health ( <span class="notranslate"> LA </span> , <span class="notranslate"> memory </span> , idle <span class="notranslate"> CPU </span> ) and automatically decreasing/increasing limits based on server health.
* <span class="notranslate">Reseller Limits</span>: plugin would analyze usage per group of users (reseller’s usage), and do actions.
* Suspend/notify plugin: would detect that user is being throttled for 10 minutes, and suspend him (just because), or notify, or increase limits.

### Installation and update

To install, please execute:

<div class="notranslate">

```
yum install lve-stats
```
</div>

To update:

<div class="notranslate">

```
yum update lve-stats
```
</div>

Settings of old <span class="notranslate">lve-stats</span> (ver. 0.x) are imported automatically on the first install/update of a new <span class="notranslate">lve-stats</span> package.

SQLite database file is located in <span class="notranslate">`/var/lve/lvestats2.db`</span>, data from old <span class="notranslate">lve-stats</span> (ver. 0.x) are being migrated automatically in the background. Migrating process can last 2-8 hours (during this time lags are possible when admin is trying to check statistics, at the same time users will not be affected). Migrating the latest 30 days, <span class="notranslate">SQLite DB</span> stable migration is provided.

Currently, the new <span class="notranslate">lve-stats</span> supports all databases available in CloudLinux (except <span class="notranslate">PosgreSQL</span> for CL5).

#### Downgrade

If you have any problems after update, downgrade <span class="notranslate">lve-stats2</span> to the previous stable version by running:

<div class="notranslate">

```
yum downgrade lve-stats
```
</div>

and contact CloudLinux support at [https://cloudlinux.zendesk.com/hc/requests/new](https://cloudlinux.zendesk.com/hc/en-us/requests/new)

:::tip Note
You may need to rename `*.rpmsave` files to original ones in order to restore settings for old <span class="notranslate">lve-stats (`/etc/sysconfig/lvestats`, `/etc/sysconfig/cloudlinux-notify`</span>).
:::

### Configuration

Main configuration file <span class="notranslate">`/etc/sysconfig/lvestats2`</span> contains the following options:

* <span class="notranslate">`db_type`</span> - selects appropriate database type to use;
* <span class="notranslate">`connect-string`</span> - connection string for <span class="notranslate">PostGreSQL</span> and MySQL database, has the following form:
  
  <div class="notranslate">

  ```
  connect_string = USER:PASSWORD@HOST[:PORT]/DATABASE
  ```
  </div>

  Default port is used for specific database, if port is not specified (typical port is 3306 for MySQL and 5432 for <span class="notranslate">PostGreSQL</span>). Connection string is not used for sqlite database.

* <span class="notranslate">`server_id`</span> - sets the name of the server (at most 10 characters). This option is to use with centralized database ( <span class="notranslate">PostGreSQL</span> or MySQL). For use with sqlite database, value of this option should be "localhost" (without quotes).
* <span class="notranslate">`plugins`</span> – path to directory containing custom plugins for <span class="notranslate">lve-stats</span> (default path <span class="notranslate">`/usr/share/lve-stats/plugins`</span>).
* <span class="notranslate">`db_timeout`</span> - period of time to write data to database (in seconds); default value is 60 seconds.
* <span class="notranslate">`timeout`</span> - timeout for custom plugins (seconds). If plugin execution does not finish within this period, plugin is terminated. Default value is 5 seconds.
* <span class="notranslate">`interval`</span> - duration of one cycle of <span class="notranslate">lvestats-server</span> (seconds). This should be less than total duration of execution of all plugins. Default value is 5 seconds. Increasing this parameter makes precision of statistics worse.
* <span class="notranslate">`keep_history_days`</span> - period of time (in days) to keep history in database. Old data is removed from database automatically. Default value is 60 days.
* <span class="notranslate">`mode`</span> – sets compatibility output mode (compatibility with older lveinfo version
  * Value `v1` enables compatibility with old version of <span class="notranslate">lveinfo</span>.
  * Value `v2` enables <span class="notranslate">`extended`</span> output mode, but can break LVE plugins for control panels (statistics in <span class="notranslate">LVE Manager</span>, <span class="notranslate">Resource Usage</span>, etc). Support of `v2` mode will be added to LVE plugins in the recent future. When mode parameter is absent, later version of <span class="notranslate">lveinfo</span> is implied.
* <span class="notranslate">`disable_snapshots`</span> - disable snapshots and incidents.
  Possible values:
    * <span class="notranslate">`true`</span>
    * <span class="notranslate">`false`</span>

Configuration files for plugins are located in <span class="notranslate">`/etc/sysconfig/lvestats.config`</span> directory.

<span class="notranslate">`/etc/sysconfig/lvestats.config/SnapshotSaver.cfg`</span> contains the following options:

* <span class="notranslate">`period_between_incidents`</span> - the minimal interval of time between incidents (in seconds). If minimal interval of time between LVE faults is greater than value specified, than new "incident" will begin and new snapshots will be saved. Default value is 300 seconds.
* <span class="notranslate">`snapshots_per_minute`</span> - the maximum number of snapshots saved per minute for specific LVE id (default is `2`).
* <span class="notranslate">`max_snapshots_per_incident`</span> - the maximum number of snapshots saved for one "incident". Default is `10`.

<span class="notranslate">`/etc/sysconfig/lvestats.config/StatsNotifier.cfg`</span> contains the following options:

* <span class="notranslate">`NOTIFY_ADMIN`</span> – enables notification for admin (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_RESELLER`</span> – enables notification for reseller (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_CUSTOMER`</span> - enables notification for customers (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_INCLUDE_RESELLER_CUSTOMER`</span> – `Y`=notify all users, `N`=notify only hoster's users (whos reseller is root), default = `N`;
* <span class="notranslate">`NOTIFY_CPU`</span> – notify about <span class="notranslate">CPU</span> faults when customer hits 100% of his <span class="notranslate">CPU</span> limit (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_IO`</span> - notify about <span class="notranslate">IO</span> faults when customer hits 100% of his <span class="notranslate">IO</span> limit (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_IOPS`</span> - notify about <span class="notranslate">IOPS</span> faults when customer hits 100% of his <span class="notranslate">IOPS</span> limit (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_MEMORY`</span> - notify about memory faults (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_EP`</span> – notify about entry processes faults (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_NPROC`</span> – notify about number of processes faults (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_MIN_FAULTS_ADMIN`</span> – minimum number of faults to notify admin (default `1`);
* <span class="notranslate">`NOTIFY_MIN_FAULTS_USER`</span> – minimum number of faults to notify customer (default `1`);
* <span class="notranslate">`NOTIFY_INTERVAL_ADMIN`</span> – period of time to notify admin (default `12h`);
* <span class="notranslate">`NOTIFY_INTERVAL_USER`</span> – period of time to notify customer (default `12h`);
* <span class="notranslate">`NOTIFY_FROM_EMAIL`</span> - sender email address. For example: <span class="notranslate">`NOTIFY_FROM_EMAIL=main_admin@host.com`;</span>
* <span class="notranslate">`NOTIFY_FROM_SUBJECT`</span> - email message subject. For example: <span class="notranslate">`NOTIFY_FROM_SUBJECT=Message from notifier`</span>

These values can also be set using [cloudlinux-config CLI](/command-line_tools/#cloudlinux-config) utility

Templates of notifications are located here:

* <span class="notranslate">`/usr/share/lve/emails/en_US/admin_notify.txt`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/reseller_notify.txt`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/user_notify.txt`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/admin_notify.html`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/reseller_notify.html`</span>

:::tip Note
Notifications about LVE faults are implemented for CPanel only.
:::

After changing any options above, please restart <span class="notranslate">lvestats</span> service:

<div class="notranslate">

```
service lvestats restart
```
</div>

<span class="notranslate">`/etc/logrotate.d/lvestats`</span> - configuration file for <span class="notranslate">`/var/log/lve-stats.log rotation`</span>


### LVE Stats2 and DB Servers Compatible Work Setup

#### LVE Stats2 and MySQL DB Server Compatible Work Setup

:::tip Note
Run all the commands below under root.
:::

**1. MySQL Server Setup**

If MySQL Server is not installed, then install it according to control panel documentation.

For non-panel system:

* CloudLinux 6
  
  <div class="notranslate">

  ```
  yum install mysql mysql-server
  service mysqld start
  chkconfig mysqld on
  ```
  </div>

* CloudLinux 7
  
  <div class="notranslate">

  ```
  yum install mariadb mariadb-server
  systemctl start mariadb.service
  systemctl enable mariadb.service
  ```
  </div>


**2. Database Setup**

* Run MySQL administrative utility: <span class="notranslate">`mysql`</span>.
* In utility run the commands:

  * creating server DB. Also, check **_Note_** below.

  <div class="notranslate">

  ```
  CREATE DATABASE db_lvestats2;
  ```
  </div>

  * creating a user for <span class="notranslate">LVE Stats 2</span> server to work under. Also, check **_Note_** below.

  <div class="notranslate">

  ```
  CREATE USER 'lvestats2'@'localhost' IDENTIFIED BY 'lvestats2_passwd';
  ```
  </div>

  * granting all the privileges for all DB tables to the user. Use the username and DB name from the points above.

  <div class="notranslate">

  ```
  GRANT ALL PRIVILEGES ON db_lvestats2.* TO 'lvestats2'@'localhost';
  ```
  </div>

  * refreshing privileges information.

  <div class="notranslate">

  ```
  FLUSH PRIVILEGES;
  ```
  </div>

  * Exit administrative utility <span class="notranslate">`(Ctrl+d)`</span>.

:::tip Note
DB name, username and their passwords above are given for an example - you can use any of your choices. Using old DB from <span class="notranslate">LVE Stats</span> version 1 is also acceptable as <span class="notranslate">LVE Stats2</span> uses different tables and the old information will not be corrupted.
:::

**3.** <span class="notranslate">**LVE Stats 2**</span> **Setup**

* Stop <span class="notranslate">LVE Stats 2</span> server by running the command:

<div class="notranslate">

```
service lvestats stop
```
</div>

* In server configuration file <span class="notranslate">`/etc/sysconfig/lvestats2`</span>, edit the following options:
  * <span class="notranslate">`db_type = mysql`</span>
  * <span class="notranslate">`connect_string = lvestats2:lvestats2_passwd@localhost/db_lvestats2`</span>

:::tip Note
<span class="notranslate">`connect_string`</span> option value is used in format: <span class="notranslate">`user:pass@host/database`</span>.
Username, password and DB name must be the same as in point 2 of Database Setup above.
:::

* After making changes in configuration files run:

<div class="notranslate">

```
/usr/sbin/lve-create-db 
```
</div>

  For DB primary initialization (creating tables, indexes, etc). There is no need to create anything in the DB manually.

* When done, restart server by running:
  
<div class="notranslate">

```
service lvestats restart
```
</div>


**4. Additional Security Settings**

If you need to provide access to <span class="notranslate">LVE Stats</span> information utilities (<span class="notranslate">`lveinfo`, `lvechart`, `lve-read-snapshot`</span>) for different users, then we recommend creating one more DB user with read-only privilege to guarantee information security. It can be done by running the following commands in administrative utility:

* creating a user (check **_Note_** above)

<div class="notranslate"> </span>

```
CREATE USER 'lvestats2_read'@'localhost' IDENTIFIED BY 'lvestats2_read_passwd';
```
</div>

* granting read-only privilege to the user
  
<div class="notranslate">

```
GRANT SELECT ON db_lvestats2.* TO 'lvestats2_read'@'localhost';
```
</div>

* refreshing privileges information

<div class="notranslate">

```
FLUSH PRIVILEGES;
```
</div>

If <span class="notranslate">LVE Stats2</span> server is set correctly (see information below), the information utilities will work under this user.

If you need to provide access to information utilities to other users, then in order to guarantee information security you should do the following:

* Assign permission 600 to the main configuration file (<span class="notranslate">`/etc/sysconfig/lvestats2`</span>), so that it could be read only by <span class="notranslate">LVE Stats 2</span> server and by utilities that run under root.
* Copy <span class="notranslate">`/etc/sysconfig/lvestats2`</span> to <span class="notranslate">`/etc/sysconfig/lvestats2.readonly`</span>, assign permission 644 to the new file, so that it could be read by any user but could only be changed by root.
* In <span class="notranslate">`/etc/sysconfig/lvestats2.readonly`</span> file, in the line <span class="notranslate">`connect_string`</span>, specify DB user with read-only permission, created above.

These steps allow hiding main DB user username/password from other system users.

If there is no need in such access differentiation, then <span class="notranslate">`/etc/sysconfig/lvestats2`</span> file access permission should be 644, so that it could be read by all users and could be changed only by root.


**5. Using Special Characters in Database Password**

Since scheme <span class="notranslate">`://user:password@host[:port]/database_name`</span> [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) is used in <span class="notranslate">`connect_string`</span> config option, then usage of special characters in user DB password is not allowed.

To use special symbols in the password, it must be converted to [escape-sequence](https://en.wikipedia.org/wiki/Percent-encoding). You can convert a password to escape-sequence in a console as follows:

<div class="notranslate">

```
echo -n '[You_P@$$]:' | perl -MURI::Escape -ne 'print uri_escape($_)."\n"'
%5BYou_P%40%24%24%5D%3A
```
</div>

Or replace the symbols manually:

<div class="notranslate">

```
!    #    $    &    '    (    )    *    +    ,    /    :    ;    =    ?    @   [    ]
%21  %23  %24  %26  %27  %28  %29  %2A  %2B  %2C  %2F  %3A  %3B  %3D  %3F  %40  %5B %5D
```
</div>

After that <span class="notranslate">`сonnect_string`</span> will look as follows:

<div class="notranslate">

```
сonnect_string=lvestats2:%5BYou_P%40%24%24%5D%3A@localhost/db_lvestats2
```
</div>


#### LVE Stats 2 and PostgreSQL DB Server Compatible Work Setup


:::tip Note
Run all the commands below under <span class="notranslate">root</span>.
:::

**1.** **<span class="notranslate">PostgreSQL</span>** **Server Installation and Setup**

* **PostgreSQL installation and initialization**

  For control panels use proper documentation for installation on the links: [сPanel](https://documentation.cpanel.net/display/CKB/Install+or+Update+PostgreSQL+on+Your+cPanel+Server), [Plesk](https://kb.plesk.com/en/123729).

  For non-panel CloudLinux run the following commands:

    * CloudLinux 6

    <div class="notranslate">

    ```
    yum install postgresql-server postgresql
    service postgresql initdb
    service postgresql start
    chkconfig postgresql on
    ```
    </div>

    * CloudLinux 7

    <div class="notranslate">

    ```
    yum install postgresql-server postgresql
    postgresql-setup initdb
    systemctl start postgresql
    systemctl enable postgresql
    ```
    </div>

* **Setup**

  * In <span class="notranslate">`/var/lib/pgsql/data/pg_hba.conf`</span> config file change user authentication mode. Add the following lines (place before all other authentication parameters):
  
    <div class="notranslate">

    ```
    # IPv4 local connections for lve-stats-2.x
    host dblvestat all 127.0.0.1/32 password
    # IPv6 local connections for lve-stats-2.x
    host dblvestat all ::1/128 password
    ```
    </div>
    
    These lines enable user authentication by the password for <span class="notranslate">IP4/IP6</span> connections. You can set other modes if needed.

  * Apply config changes by running:

    <div class="notranslate">

    ```
    service postgresql restart
    ```
    </div>


**2. DB for** <span class="notranslate">**lve-stats-2.x**</span> **- Creating and Setup**

* Run standard <span class="notranslate">PostgreSQL psql</span> administrative utility:

<div class="notranslate">

```
sudo -u postgres psql postgres 
```
</div>

OR for сPanel

<div class="notranslate">

```
psql -w -U postgres
```
</div>

* In utility run:

  * creating server DB. Also, check **_Note_** below.

    <div class="notranslate">

    ```
    CREATE DATABASE dblvestat;
    ```
    </div>

  * creating a user for <span class="notranslate">LVE Stats 2</span> server to work under. Also, check **_Note_** below.

    <div class="notranslate">

    ```
    CREATE USER lvestat WITH password 'passw';
    ```
    </div>

  * granting <span class="notranslate">lvestat</span> user all privileges for work with <span class="notranslate">dblvestat DB</span>.

    <div class="notranslate">

    ```
    GRANT ALL privileges ON DATABASE dblvestat TO lvestat;
    ```
    </div>

  * exit `psql` utility:

    <div class="notranslate">

    ```
    \q
    ```
    </div>

    OR alternatively:

    <div class="notranslate">

    ```
    Ctrl+d
    ```
    </div>


:::tip Note
DB name, username and their passwords above are given for an example - you can use any of your choices. Using old DB from <span class="notranslate">LVE Stats</span> version 1 is also acceptable as <span class="notranslate">LVE Stats 2</span> uses different tables and the old information will not be corrupted
:::

**3.** <span class="notranslate">**Lve-stats-2.x**</span> **Setup**

* Stop <span class="notranslate">lve-stats2</span> server by running:

<div class="notranslate">

```
service lvestats stop
```
</div>

* In server config file <span class="notranslate">`/etc/sysconfig/lvestats2`</span> edit options for connecting to DB:
  
<div class="notranslate">

```
db_type = postgresql
connect_string=lvestat:passw@localhost/dblvestat
If DB is going to be used as centralized for multiple hosts then collect_usernames parameter must be changed:
collect_usernames=true
```
</div>

:::tip Note
<span class="notranslate">`connect_string`</span> option value is of the format: <span class="notranslate">`user:pass@host/database`</span>. Username, password and DB name must be the same as in Database Setup section above.
:::

* After making changes in configuration files, for DB primary initialization (creating tables, indexes, etc), run:

<div class="notranslate">

```
/usr/sbin/lve-create-db 
```
</div>

* There is no need to create anything in the DB manually. When done, restart server by running:

<div class="notranslate">

```
service lvestats restart
```
</div>

**4. Additional Security Settings**

If you need to provide access to <span class="notranslate">LVE Stats</span> information utilities (<span class="notranslate">`lveinfo`, `lve-read-snapshot`</span> ) for other users (or if <span class="notranslate">CageFS</span> is disabled), then in order to guarantee DB security the following steps are required:

* Create a DB user with read-only permission:

<div class="notranslate">

```
CREATE USER lvestat_read WITH password 'passw';
GRANT CONNECT ON DATABASE dblvestat to lvestat_read;
\connect dblvestat;
GRANT SELECT ON lve_stats2_history, lve_stats2_history_gov, lve_stats2_history_x60, lve_stats2_incident, lve_stats2_servers, lve_stats2_snapshot, lve_stats2_user TO lvestat_read;
```
</div>

* Assign root ownership and permission 600 to the main configuration file (<span class="notranslate">`/etc/sysconfig/lvestats2`</span>), so that it could be read only by <span class="notranslate">LVE Stats 2</span> server and by utilities that run under root.

* Copy <span class="notranslate">`/etc/sysconfig/lvestats2` to `/etc/sysconfig/lvestats2.readonly`</span>, assign permission 644 to the new file, so that it could be read by any user but could be changed only by root.

* In <span class="notranslate">`/etc/sysconfig/lvestats2.readonly`</span> file, in the line <span class="notranslate">`connect_string`</span>, specify DB user with read-only permission, created above.

  These steps allow hiding main DB user username/password from other system users.

  If there is no need in such access differentiation, then <span class="notranslate">`/etc/sysconfig/lvestats2`</span> file access permission should be 644, so that it could be read by all users and could be changed only by <span class="notranslate">root</span>.

* When done, restart server by running:

<div class="notranslate">

```
service lvestats restart
```
</div>


**5. Using Special Characters in Database Password**

Since scheme <span class="notranslate">`://user:password@host[:port]/database_name`</span> [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) is used in <span class="notranslate">`connect_string`</span> config option, then usage of special characters in user DB password is not allowed.

To use special symbols in the password, it must be converted to [escape-sequence](https://en.wikipedia.org/wiki/Percent-encoding). You can convert a password to escape-sequence in a console as follows:

<div class="notranslate">

```
echo -n '[You_P@$$]:' | perl -MURI::Escape -ne 'print uri_escape($_)."\n"'
%5BYou_P%40%24%24%5D%3A
```
</div>

OR replace the symbols manually:

<div class="notranslate">

```
!    #    $    &    '    (    )    *    +    ,    /    :    ;    =    ?    @    [    ]
%21  %23  %24  %26  %27  %28  %29  %2A  %2B  %2C  %2F  %3A  %3B  %3D  %3F  %40  %5B  %5D
```
</div>

After that <span class="notranslate">`сonnect_string`</span> will look as follows:

<div class="notranslate">

```
сonnect_string=lvestats2:%5BYou_P%40%24%24%5D%3A@localhost/db_lvestats2
```
</div>

#### Customize lve-stats-2 notifications 

<span class="notranslate">[Jinja2](http://jinja.pocoo.org/)</span> is used as a template engine for the notifications.

The templates for notifications are located in <span class="notranslate">`/usr/share/lve/emails/LOCALE`</span>, where <span class="notranslate">`LOCALE`</span> is the directory with localization name (language codes are formed according to <span class="notranslate">ISO 639-1</span> and <span class="notranslate">ISO 639-2</span>).

By default the templates for English are set: <span class="notranslate">`/usr/share/lve/emails/en_US.`</span>.

<span class="notranslate">`/usr/share/lve/emails/en_US`</span> contains the following templates:

* <span class="notranslate">`admin_notify.html`  `admin_notify.txt`</span> for administrator;
* <span class="notranslate">`reseller_notify.html` `reseller_notify.txt`</span> for reseller;
* <span class="notranslate">`user_notify.txt`</span> for user.

The notification is formed as <span class="notranslate">_Multipart content type_</span> [RFC1341(MIME)](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html).

The plain text is taken from the <span class="notranslate">`.txt`</span> files, html version - from the <span class="notranslate">`.html`</span> template.

In case when only one template is present (<span class="notranslate">`.txt`</span> or <span class="notranslate">`.html`</span>) the notification is sent as a <span class="notranslate">_Non-multipart content_  </span> type notification.

It is better to use <span class="notranslate">_Multipart content_</span> type notifications because when a mail client can not display an html-format message, then it will be displayed as plain text version.

To localize notifications, copy standard templates into directory with the proper locale name and translate the template. Also you can customize the main template making proper changes into it.

The list of variables that can be used in the template:

| |  | |
|-|--|-|
|Variable | Example | Description|
|<span class="notranslate">`TONAME`</span> | <span class="notranslate">`Customer`</span> | Notification receiver user name. Taken from profile in the control panel, by default - <span class="notranslate">`Customer`</span> for user, <span class="notranslate">`Administrator`</span> for administrator, <span class="notranslate">`Reseller`</span> for reseller.|
|<span class="notranslate">`TOMAIL`</span> | <span class="notranslate">`support@cloudlinux.com`</span> | Notification receiver email address.|
|<span class="notranslate">`DOMAIN`</span> | <span class="notranslate">`wordpress.test247.cloudlinux.com`</span> | Main domain. Available only for user.|
|<span class="notranslate">`LOCALE`</span> | <span class="notranslate">`en_US`</span> | Locale in which the notification is sent. Available only for user.|
|<span class="notranslate">`RESELLER`</span> | <span class="notranslate">`root`</span> | User reseller. Available only for user.|
|<span class="notranslate">`PERIOD`</span> | <span class="notranslate">`12 hours`</span> | Verification and notification sending period.|
|<span class="notranslate">`LOGIN`</span> | <span class="notranslate">`wordpress`</span> | User login in the system.|
|<span class="notranslate">`ID`</span> | `500` | User ID in the system.|
|<span class="notranslate"> `lPMem` `lEP` `PMemF` `lVMem` `anyF` `IOf` `VMemF` `lCPU` `aIOPS` `aEP` `aPMem` `IOPSf` `lIO` `lIOPS` `aIO` `EPf` `aCPU` `aVMem` `NprocF` `aNproc` `lNproc` `CPUf` </span> |  | See description in <span class="notranslate">`lveinfo --help`</span> output. Available only for users|
|<span class="notranslate">`STATS_HTML`</span> |  | html table with the list of users that exceeded limits. Available for administrator and reseller.|
|<span class="notranslate">`STATS`</span> |  | ASCII - table with the list of users that exceeded limits. Available only for admins and resellers.|

Sender’s email address by default is administrator email address from control panel settings <span class="notranslate">`(root@{hostn_name}`</span> if there is no email in the control panel).

It can be changed with <span class="notranslate">`NOTIFY_FROM_EMAIL`</span> option in the config <span class="notranslate">`/etc/sysconfig/lvestats.config/StatsNotifier.cfg`</span>

For example:

<span class="notranslate">`NOTIFY_FROM_EMAIL=support@hostername.com`</span>

To apply changes restart <span class="notranslate">`lve-stats`</span> service:

<div class="notranslate">

```
service lvestats restart
```
</div>

for CloudLinux 7

<div class="notranslate">

```
systemctl restart lvestats.service
```
</div>

Default subject is <span class="notranslate">`Hosting account resources exceeded`</span>.  It can be changed for each template (and for localized templates as well). To change subject, in the very beginning of the file (no blank lines allowed in the beginning of the template) add the field <span class="notranslate">`Subject:`</span>, leave two blank lines after it and add template body.

Customized subjects can be taken only from the templates with the resolution <span class="notranslate">`*.txt`</span> <span class="notranslate">(`admin_notify.txt`, `reseller_notify.txt`, `user_notify.txt`)</span>. Changes apply without <span class="notranslate">`lvestats`</span> restart.

For backward compatibility the subject can be also changed with the key <span class="notranslate"> `NOTIFY_FROM_SUBJECT`</span> in the config <span class="notranslate">`/etc/sysconfig/lvestats.config/StatsNotifier.cfg`</span>.

Customized subjects have the higher priority than the key <span class="notranslate">`NOTIFY_FROM_SUBJECT`</span>.

Example for the file <span class="notranslate">`user_notify.txt`</span>

<div class="notranslate">

```
Subject: Customized subject example
Dear {{TONAME}},

 
Your {{DOMAIN}} web hosting account exceeded one or more of its resources within the last {{PERIOD}}.
{% if epf %}Exceeded the maximum of {{lep}} concurrent website connections. Your website was not available {{epf}} times because of this problem.
{% endif %}{% if pmemf %}Exceeded the physical memory limit of {{lpmem}}KB. Your website was not available {{pmemf}} times because of this problem.
{% endif %}{% if vmemf %}Exceeded the virtual memory limit of {{lvmem}}KB. Your website was not available {{vmemf}} times because of this problem.
{% endif %}{% if nprocf %}Exceeded the number of processes limit of {{lnproc}}. Your website was not available {{nprocf}} times because of this problem.
{% endif %}{% if cpuf %}You reached limit of {{lcpu}} of total server CPU usage {{cpuf}} times. Your website was forced to load slower to reduce its CPU usage.
{% endif %}{% if iof %}You reached limit of {{lio}}KB/s disk io rate {{iof}} times. The disk io speed for your account was slowed as a result of this problem.
{% endif %}{% if iopsf %}You reached limit of {{liops}} I/O operations {{iopsf}} times. The disk io speed for your account was slowed as a result of this problem.
{% endif %}
 
To view full details about your web hosting account's resource usage, including the time of each incident listed above, please click the link below and log into your cpanel hosting control panel, then click the "Resource Usage" link under the "Logs and Statistics" section.
http://{{DOMAIN}}:2083
 
If your account is regularly exceeding it's available resources, please consider upgrading to a higher level hosting plan that includes more resources. If you have any questions or need help with anything, just reply to this email and let us know.
 
Sincerely,
 
Your Friendly Web Hosting Support Team
```
</div>

### Command-line tools

| | |
|-|-|
|<span class="notranslate"> `/usr/sbin/lveinfo` </span> |utility to display historical information about LVE usage.|
|<span class="notranslate"> `/usr/sbin/lvechart` </span> |creates a chart representing LVE usage for user.|
|<span class="notranslate"> `/usr/sbin/dbgovchart` </span> |creates a chart representing MySQL usage for user.|
|<span class="notranslate"> `/usr/sbin/lve-read-snapshot` </span> |displays information from system state (snapshots) for user.|
|<span class="notranslate"> `/usr/sbin/lve-create-db` </span> |creates/recreates database for <span class="notranslate">lve-stats</span>.|
|<span class="notranslate"> `/usr/sbin/cloudlinux-top` </span> |utility provides information about current MySQL and LVE usage of a running system in JSON format.|
|<span class="notranslate"> `/usr/sbin/cloudlinux-statistics` </span> |utility provides historical information about resource usage.|

<div class="notranslate">

#### lveinfo

</div>

:::tip Note
<span class="notranslate">lve-stats-2.2-2</span>
:::

**Usage**

<div class="notranslate">

```
lveinfo [-h] [-v] [--dbgov DBGOV] [-f YYYY-MM-DD[HH:MM]]

              [-t YYYY-MM-DD[HH:MM]] [--period PERIOD] [-u USER | --id ID]

              [-d] [-o ALIAS] [-b ALIAS [ALIAS ...]] [-p 0..100]

              [--by-fault ALIAS [ALIAS ...]] [-r FAULTS]

              [--style {user,admin}] [-l LIMIT] [-c [PATH] | -j]

              [--server_id SERVER_ID] [--servers-info]

              [--show-all | --show-columns COLUMN_NAME [COLUMN_NAME ...]]

              [--time-unit TIME_UNIT] [-m {v1,v2}]

              [--blank-value [BLANK_VALUE]]
```
</div>

<span class="notranslate">`lveinfo`</span> is an utility to display historical information about LVE usage.

**Optional arguments**

* <span class="notranslate"> `-h, --help` </span> – show this help message and exit
* <span class="notranslate"> `-v, --version` </span> – show program's version number and exit
* <span class="notranslate"> `--dbgov DBGOV` </span> – show <span class="notranslate"> MySql Governor</span> statistic
* <span class="notranslate"> `-u USER, --user USER` </span> – use username instead of <span class="notranslate"> LVE id</span>, and show only record for that user
* <span class="notranslate"> `--id ID` </span> – will display record only for that <span class="notranslate"> LVE id</span>
* <span class="notranslate"> `-d, --display-username` </span> – try to convert <span class="notranslate"> LVE id</span> into username when possible
* <span class="notranslate"> `-o ALIAS, --order-by ALIAS` </span> – orders results by one of the following:
  | | | |
  |-|-|-|
  |<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|DESCRIPTION|
  |<span class="notranslate">`cpu_avg`</span>|<span class="notranslate">`aCPU`</span>|average CPU usage|
  |<span class="notranslate">`cpu_max`</span>|<span class="notranslate">`mCPU`</span>|max CPU usage|
  |<span class="notranslate">`total_cpu_faults`</span>|<span class="notranslate">`CPUf`</span>|total number of max CPU usage faults|
  |<span class="notranslate">`vmem_avg`</span>|<span class="notranslate">`aVMem`</span>|average virtual memory usage||<span class="notranslate">`vmem_max`</span>|<span class="notranslate">`mVMem`</span>|average virtual memory usage||<span class="notranslate">`total_vmem_faults`</span>|<span class="notranslate">`VMemF`</span>|total number of out of virtual memory faults|
  |<span class="notranslate">`mep_avg`</span>|<span class="notranslate">`aEP`</span>|average number of entry processes (concurrent connections)|
  |<span class="notranslate">`mep_max`</span>|<span class="notranslate">`mEP`</span>|max number of entry processes (concurrent connections)|
  |<span class="notranslate">`total_ep_faults`</span>|<span class="notranslate">`EPf`</span>|total number of max entry processes faults|
  |<span class="notranslate">`pmem_avg`</span>|<span class="notranslate">`aPMem`</span>|average physical memory usage (LVE version >= 6)|
  |<span class="notranslate">`pmem_max`</span>|<span class="notranslate">`mPMem`</span>|max physical memory usage (LVE version >= 6)|
  |<span class="notranslate">`nproc_avg`</span>|<span class="notranslate">`aNproc`</span>|average number of processes (LVE version >= 6)|
  |<span class="notranslate">`nproc_max`</span>|<span class="notranslate">`mNproc`</span>|max number of processes (LVE version >= 6)|
  |<span class="notranslate">`io_avg`</span>|<span class="notranslate">`aIO`</span>|average io usage (LVE version >= 6)|
  |<span class="notranslate">`io_max`</span>|<span class="notranslate">`mIO`</span>|max io usage (LVE version >= 6)|
  |<span class="notranslate">`total_pmem_faults`</span>|<span class="notranslate">`PMemF`</span>|total number of out of physical memory faults (LVE version >= 6)|
  |<span class="notranslate">`total_nproc_faults`</span>|<span class="notranslate">`NprocF`</span>|total number of max processes faults (LVE version >= 6)|
  |<span class="notranslate">`total_io_faults`</span>|<span class="notranslate">`IOf`</span>|total number of max io faults (LVE version >= 6)|
  |<span class="notranslate">`iops_avg`</span>|<span class="notranslate">`aIOPS`</span>|average io operations (LVE version >= 8)|
  |<span class="notranslate">`iops_max`</span>|<span class="notranslate">`mIOPS`</span>|max io operations (LVE version >= 8)|
  |<span class="notranslate">`total_iops_faults`</span>|<span class="notranslate">`IOPSf`</span>|total number of max io operations faults (LVE version >= 8)|
  |<span class="notranslate">`any_faults`</span>|<span class="notranslate">`anyF`</span>|total number of faults of all types|
* <span class="notranslate"> `-b ALIAS [ALIAS ...]` `--by-usage ALIAS [ALIAS ...]`</span> – show LVEs with usage (averaged) within 90 percent of the limit available values:

  | | | | |
  |-|-|-|-|
  |<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|DESCRIPTION|
  |<span class="notranslate">`cpu_avg`</span>|<span class="notranslate">`cpu`</span>|<span class="notranslate">`aCPU`</span>|average CPU usage|
  |<span class="notranslate">`cpu_max`</span>|<span class="notranslate">`cpu_max`</span>|<span class="notranslate">`mCPU`</span>|max CPU usage|
  |<span class="notranslate">`vmem_avg`</span>|<span class="notranslate">`vmem`</span>|<span class="notranslate">`aVMem`</span>|average virtual memory usage|
  |<span class="notranslate">`vmem_max`</span>|<span class="notranslate">`vmem_max`</span>|<span class="notranslate">`mVMem`</span>|max virtual memory usage|
  |<span class="notranslate">`mep_avg`</span>|<span class="notranslate">`mep`</span>|<span class="notranslate">`aEP`</span>|average number of entry processes (concurrent connections)|
  |<span class="notranslate">`mep_max`</span>|<span class="notranslate">`mep_max`</span>|<span class="notranslate">`mEP`</span>|max number of entry processes (concurrent connections)|
  |<span class="notranslate">`pmem_avg`</span>|<span class="notranslate">`pmem`</span>|<span class="notranslate">`aPMem`</span>|average physical memory usage (LVE version >= 6)|
  |<span class="notranslate">`pmem_max`</span>|<span class="notranslate">`pmem_max`</span>|<span class="notranslate">`mPMem`</span>|max physical memory usage (LVE version >= 6)|
  |<span class="notranslate">`nproc_avg`</span>|<span class="notranslate">`nproc`</span>|<span class="notranslate">`aNproc`</span>|average number of processes (LVE version >= 6)|
  |<span class="notranslate">`nproc_max`</span>|<span class="notranslate">`nproc_max`</span>|<span class="notranslate">`mNproc`</span>|max number of processes (LVE version >= 6)|
  |<span class="notranslate">`io_avg`</span>|<span class="notranslate">`io`</span>|<span class="notranslate">`aIO`</span>|average io usage (LVE version >= 6)|
  |<span class="notranslate">`io_max`</span>|<span class="notranslate">`io_max`</span>|<span class="notranslate">`mIO`</span>|max io usage (LVE version >= 6)|
  |<span class="notranslate">`iops_avg`</span>|<span class="notranslate">`iops`</span>|<span class="notranslate">`aIOPS`</span>|average io operations (LVE version >= 8)|
  |<span class="notranslate">`iops_max`</span>|<span class="notranslate">`iops_max`</span>|<span class="notranslate">`mIOPS`</span>|max io operations (LVE version >= 8)|

* <span class="notranslate">`-p 0..100`, `--percentage 0..100`</span> – defines percentage for <span class="notranslate">`--by-usage`</span> option; default `90`
* <span class="notranslate"> `--style {user,admin}` </span> – deprecated, not used.
* <span class="notranslate"> `-l LIMIT`, `--limit LIMIT` </span> – max number of results to display, `10` by default, if `0` no limit
* <span class="notranslate"> `-c [PATH]`, `--csv [PATH]` </span> – save statistics in CSV format; `-` by default (output to screen)
* <span class="notranslate"> `-j`, `--json` </span> – display output in JSON format
* <span class="notranslate"> `--server_id SERVER_ID` </span> – used with central database for multiple servers, default <span class="notranslate">`localhost`</span>
* <span class="notranslate"> `--servers-info` </span> – show servers LVE versions
* <span class="notranslate"> `--show-all` </span> – full output (show all limits); brief output is default; equivalent <span class="notranslate">`--show-columns all`</span>
* <span class="notranslate"> `-show-columns COLUMN_NAME [COLUMN_NAME ...]` </span> – show only the listed columns; <span class="notranslate">`all`</span> for all supported columns
  
  | | |
  |-|-|
  |<span class="notranslate">COLUMN_NAME</span> |DESCRIPTION|
  |<span class="notranslate"> `From ` </span> |Show start period statistics|
  |<span class="notranslate"> `To  ` </span> |Show end period statistics|
  |<span class="notranslate"> `ID ` </span> |LVE Id or username|
  |<span class="notranslate"> `aCPU` </span> |Average <span class="notranslate"> CPU</span> usage|
  |<span class="notranslate"> `uCPU` </span> |The percentage of user-allocated resource <span class="notranslate">CPU</span>|
  |<span class="notranslate"> `mCPU` </span> |deprecated|
  |<span class="notranslate"> `lCPU` </span> |<span class="notranslate">CPU</span> limit|
  |<span class="notranslate">`CPUf`</span> |Out Of <span class="notranslate">CPU</span> usage Faults|
  |<span class="notranslate">`aEP`</span> | Average Entry Processes|
  |<span class="notranslate">`uEP` </span> |The percentage of user-allocated resource Entry processes|
  |<span class="notranslate">`mEP` </span> |deprecated|
  |<span class="notranslate">`lEP` </span> |maxEntryProc limit|
  |<span class="notranslate">`aVMem` </span> |Average Virtual Memory Usage|
  |<span class="notranslate">`uVMem ` </span> |The percentage of user-allocated resource Virtual Memory|
  |<span class="notranslate">`mVMem` </span> |deprecated|
  |<span class="notranslate">`lVMem` </span> |Virtual Memory Limit|
  |<span class="notranslate">`VMemF` </span> |Out Of Memory Faults|
  |<span class="notranslate">`EPf` </span> |Entry processes faults|
  |<span class="notranslate">`aPMem` </span> |Average Physical Memory Usage (LVE version >= 6)|
  |<span class="notranslate">`uPMem` </span> |The percentage of user-allocated resource Physical Memory (LVE version >= 6)|
  |<span class="notranslate">`mPMem` </span> |deprecated (LVE version >= 6)|
  |<span class="notranslate">`lPMem` </span> |Physical Memory Limit (LVE version >= 6)|
  |<span class="notranslate">`aNproc` </span> |Average Number of processes (LVE version >= 6)|
  |<span class="notranslate">`uNproc` </span> |The percentage of user-allocated resource Number of processes (LVE version >= 6)|
  |<span class="notranslate">`mNproc` </span> |deprecated (LVE version >= 6)|
  |<span class="notranslate">`lNproc` </span> |Limit of Number of processes (LVE version >= 6)|
  |<span class="notranslate">`PMemF` </span> |Out Of Physical Memory Faults (LVE version >= 6)|
  |<span class="notranslate">`NprocF` </span> |Number of processes faults (LVE version >= 6)|
  |<span class="notranslate">`aIO` </span> |Average <span class="notranslate">I/O</span> (LVE version >= 6)|
  |<span class="notranslate">`uIO` </span> |The percentage of user-allocated resource <span class="notranslate">I/O</span> (LVE version >= 6)|
  |<span class="notranslate">`mIO` </span> |deprecated (LVE version >= 6)|
  |<span class="notranslate">`lIO` </span> |<span class="notranslate">I/O</span> Limit (LVE version >= 6)|
  |<span class="notranslate">`IOf` </span> |Out Of <span class="notranslate">I/O</span> usage Faults (LVE version >= 6)|
  |<span class="notranslate">`aIOPS` </span> |Average <span class="notranslate">I/O</span> Operations (LVE version >= 8)|
  |<span class="notranslate">`mIOPS` </span> |deprecated (LVE version >= 8)|
  |<span class="notranslate">`uIOPS` </span> |The percentage of user-allocated resource <span class="notranslate">I/O</span> Operations (LVE version >= 8)|
  |<span class="notranslate">`lIOPS` </span> |<span class="notranslate">I/O</span> Operations Limit (LVE version >= 8) </span>|
  |<span class="notranslate">`IOPSf` </span> |Out Of <span class="notranslate">I/O</span> Operations Faults (LVE version >= 8)|

* <span class="notranslate"> `--time-unit TIME_UNIT` </span> – time step for grouping statistic in minutes; 1 min., by default; can use <span class="notranslate">`m\|h\|d`</span> suffixes; for example: `1h or 1h30m or 1d12h`
* <span class="notranslate"> `-m {v1,v2}`, `--compat {v1,v2}` </span> – `v1` - return old output mode; `v2` - new mode; default `v1`; you can change default in config
* <span class="notranslate"> `--blank-value [BLANK_VALUE]` </span> – Use to fill unsupported limits; default `-`
* <span class="notranslate"> `-f YYYY-MM-DD[ HH:MM]`,  `--from YYYY-MM-DD[ HH:MM]`</span> – run report from date and time in <span class="notranslate">`[YY]YY-MM-DD[ HH:MM]`</span> format; if not present last 10 minutes are assumed
* <span class="notranslate"> `-t YYYY-MM-DD[ HH:MM]`,  `--to YYYY-MM-DD[ HH:MM]`</span> – run report up to date and time in <span class="notranslate">`[YY]YY-MM-DD[ HH:MM]`</span> format; if not present, reports results up to now
* <span class="notranslate"> `--period PERIOD` </span> – time period; specify minutes with <span class="notranslate"> `m`, `h`</span> - hours, days with <span class="notranslate"> `d`</span>, and values: <span class="notranslate"> `today`, `yesterday`; `5m`</span> - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, as well as <span class="notranslate"> `today`</span>
* <span class="notranslate"> `--by-fault ALIAS [ALIAS ...]` </span> – show LVEs which failed on max processes limit or memory limit
  
  | | | | |
  |-|-|-|-|
  |<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|DESCRIPTION|
  |<span class="notranslate">`mcpu`</span>|<span class="notranslate">`cpu`</span>|<span class="notranslate">`CPUf`</span>|total number of max CPU usage faults|
  |<span class="notranslate">`mem`</span>|<span class="notranslate">`vmem`</span>|<span class="notranslate">`VMemF`</span>|total number of out of virtual memory faults|
  |<span class="notranslate">`mep`</span>|<span class="notranslate">`ep`</span>|<span class="notranslate">`EPf`</span>|total number of max entry processes faults|
  |<span class="notranslate">`pmem`</span>|<span class="notranslate">`pmem`</span>|<span class="notranslate">`PMemF`</span>|total number of out of physical memory faults (LVE version >= 6)|
  |<span class="notranslate">`nproc`</span>|<span class="notranslate">`nproc`</span>|<span class="notranslate">`NprocF`</span>|total number of max processes faults (LVE version >= 6)|
  |<span class="notranslate">`io`</span>|<span class="notranslate">`io`</span>|<span class="notranslate">`IOf`</span>|total number of max io faults (LVE version >= 6)|
  |<span class="notranslate">`iops`</span>|<span class="notranslate">`iops`</span>|<span class="notranslate">`IOPSf`</span>|total number of max io operations faults (LVE version >= 8)|
  |<span class="notranslate">`any_faults`</span>|<span class="notranslate">`any`</span>|<span class="notranslate">`anyF`</span>|total number of faults of all types|
* <span class="notranslate"> `-r FAULTS, --threshold FAULTS` </span>– in combination with <span class="notranslate">`--by-fault`</span>, shows only LVEs with number of faults above; default `1`
  
Prefixes <span class="notranslate">`Kb`, `Mb` </span> and <span class="notranslate">`Gb`</span> indicates powers of 1024.

:::tip Note
All <span class="notranslate">ALIAS</span> options are not case sensitive.
:::

<div class="notranslate">

#### lvechart

</div>

`/usr/sbin/lvechart` - creates a chart representing LVE usage for user.

**Usage**

<div class="notranslate">

```
/usr/sbin/lvechart [OPTIONS]
```
</div>

**Acceptable options**

| | |
|-|-|
|<span class="notranslate"> `--help ` </span> |This help screen|
|<span class="notranslate"> `--version` </span> |Version number|
|<span class="notranslate"> `--from` </span> |Run report from date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format (if not present, last 10 minutes are assumed)|
|<span class="notranslate"> `--to=` </span> |Run report up to date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format (if not present, reports results up to now)|
|<span class="notranslate"> `--period=` </span> |Time period: specify minutes with `m`, `h` - hours, days with `d`, and values: <span class="notranslate">`today`</span>, <span class="notranslate">`yesterday`</span>; `5m` - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, as well as today|
|<span class="notranslate"> `--id= ` </span> |<span class="notranslate">`LVE id`</span> will display record only for that <span class="notranslate">LVE id</span>|
|<span class="notranslate"> `--user=` </span> |Use username instead of <span class="notranslate"> LVE id </span>, and show only record for that user|
|<span class="notranslate"> `--server= ` </span> |<span class="notranslate">`Server id`</span> will display record for that server, instead of default (current)|
|<span class="notranslate"> `--output= ` </span> |Filename to save chart as, if not present, output will be sent to STDOUT|
|<span class="notranslate"> `--show-all` </span> |Show all graphs (by default shows graphs for which limits are set)|
|<span class="notranslate"> `--style=` </span> |<span class="notranslate">`admin`, `user`</span> set chart style,  <span class="notranslate">CPU</span> limits are normalized to 100% in user’s style|
|<span class="notranslate"> `--format=` </span> |<span class="notranslate">`svg`, `png`</span> set chart output format|

<div class="notranslate">

#### dbgovchart

</div>


`/usr/sbin/dbgovchart` - creates a chart representing MySQL usage for user.`

**Usage**

<div class="notranslate">

```
/usr/sbin/dbgovchart [OPTIONS]
```
</div>

**Acceptable options**

| | |
|-|-|
|<span class="notranslate"> `--help ` </span> |This help screen|
|<span class="notranslate"> `--version` </span> |Version number|
|<span class="notranslate"> `--from=` </span> |Run report from date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format (if not present, last 10 minutes are assumed)|
|<span class="notranslate"> `--to=` </span> |Run report up to date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format (if not present, reports results up to now)|
|<span class="notranslate"> `--period=` </span> |Time period: specify minutes with `m`,  `h` - hours, days with `d`, and values: <span class="notranslate">`today`</span>, <span class="notranslate">`yesterday`</span>; `5m` - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, as well as today`|
|<span class="notranslate"> `--user=` </span> |mysql username|
|<span class="notranslate"> `--output= ` </span> |Filename to save chart as, if not present, output will be sent to <span class="notranslate">STDOUT</span>|
|<span class="notranslate"> `--show-all` </span> |Show all graphs (by default shows graphs for which limits are set)|
|<span class="notranslate"> `--server=` </span> | <span class="notranslate"> `Server id`</span> will display record for that server, instead of default (current)|
|<span class="notranslate"> `--style=` </span> | <span class="notranslate">`admin`, `user`</span> set chart style,  <span class="notranslate">CPU</span> limits are normalized to 100% in user’s style|
|<span class="notranslate"> `--format=` </span> | <span class="notranslate">`svg`, `png`</span> set chart output format|

<div class="notranslate">

#### lve-read-snapshot

</div>

**Usage**

<div class="notranslate">

```
lve-read-snapshot [-h] [--version] [-f FROM [FROM ...]] [-t TO [TO ...]
                  [ -p PERIOD | --timestamp TIMESTAMP]
                  [-i ID | -u USER] [-l] [-o file] [-j] [--stats]
                  [--unit unit]
```
</div>

Reads LVE system state snapshots for <span class="notranslate">LVE/user</span>.

**Optional arguments**

* <span class="notranslate">`-h, --help`</span> – show this help message and exit
* <span class="notranslate">`--version`</span> – version number
* <span class="notranslate">`-f FROM [FROM ...]`, `--from FROM [FROM ...]`</span> – run report from date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format, if not present last 10 minutes are assumed (default: `2016-10-24 19:28`)
* <span class="notranslate">`-t TO [TO ...]`, `--to TO [TO ...]`</span> – run report up to date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format, if not present, reports results up to now (default: `2016-10-24 19:38`)
* <span class="notranslate">`-p PERIOD`, `--period PERIOD`</span> – time period specify minutes with `m`, `h` - hours, days with `d`, and values: <span class="notranslate">`today`, `yesterday`</span>, `5m` - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, as well as today (default: `10m`)
* <span class="notranslate">`--timestamp TIMESTAMP`</span> – time stamp in unix format for get one snapshot (default: <span class="notranslate">`None`</span>)
* <span class="notranslate">`-i ID, --id ID`</span> – LVE id to show records for (default: <span class="notranslate">`None`</span>)
* <span class="notranslate">`-u USER`, `--user USER`</span> – user account to show records for (default: <span class="notranslate">`None`</span>)
* <span class="notranslate">`-l`, `--list`</span> – show timestamp list only (default: <span class="notranslate"> `False`</span>)
* <span class="notranslate">`-o file`, `--output file`</span> – filename to save snaphots report to, if not present,output will be sent to <span class="notranslate">STDOUT</span> (default: <span class="notranslate">`None`</span>)
* <span class="notranslate">`-j`, `--json`</span> – output in json format (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--stats`</span> – output stats, instead of snapshots (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--unit unit`</span> – group stats by time unit. Example values `3h`, `24h`, `1d`, `1w`. Other possible value is <span class="notranslate">`auto`</span> for grouping by each incident (default: <span class="notranslate">`1d`</span>)
  
One of <span class="notranslate">`-u --user`</span> or <span class="notranslate">`-i --id`</span> should be specified.

<div class="notranslate">

#### lve-create-db

</div>

**Usage**

<div class="notranslate">

```
lve-create-db [-h] [--recreate] [--print-sql]
                   [--update-serverid-prompt] [--update-serverid-auto]
                   [--validate]
```
</div>

Creates a database for <span class="notranslate">lve-stats</span>.

**Optional arguments**

* <span class="notranslate">`-h`, `--help`</span> – show this help message and exit
* <span class="notranslate">`--recreate`</span> – drops and recreates database even if tables exists (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--print-sql`</span> – prints sql and exits, without creating db (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--update-serverid-prompt`</span> – update exist server ID or create new one (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--update-serverid-auto`</span> – update exist server ID with <span class="notranslate">uuid</span> (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--validate`</span> – check the correctness of the database structure (default: <span class="notranslate">`False`</span>)

#### cloudlinux-top

Utility provides information about current MySQL and LVE usage of a running system in JSON format.

#### **Usage**

<div class="notranslate">

```
cloudlinux_top [-h] [-v] [-j] [--hide-mysql]
               [-u USERNAME | -r FOR_RESELLER] [-d DOMAIN] [-m MAX]
               [-o ORDER_BY]
```
</div>

**Optional arguments**

* <span class="notranslate"> `-h, --help` </span> – show this help message and exit
* <span class="notranslate"> `-v, --version`   </span> – show program version number and exit
* <span class="notranslate"> `-j, --json`   </span> – return data in JSON format
* <span class="notranslate"> `--hide-mysql`   </span> | `don't show MySQL related info
* <span class="notranslate"> `-u USERNAME`, `--username USERNAME` </span> – show data only for a specific user. Can be used to filter the output; returns users with username <span class="notranslate">`%USERNAME%`</span>
* <span class="notranslate"> `-r FOR_RESELLER`, `--for-reseller FOR_RESELLER` </span> – get information only about specified reseller and his users
* <span class="notranslate"> `-d DOMAIN`, `--domain DOMAIN` </span> – show data only for a specific domain. Can be used to filter the output; returns users with domain <span class="notranslate">`%DOMAIN%`</span>
* <span class="notranslate"> `-m MAX`, `--max MAX` </span> – show up to <span class="notranslate">`N`</span> records. If <span class="notranslate">`--max`</span> key is omitted. By default will show top 25 users
* <span class="notranslate"> `-o ORDER_BY`, `--order-by ORDER_BY` </span> – sort output by resource usage; available options: <span class="notranslate">`cpu`, `mysql_cpu`, `io`, `mysql_io`, `iops`, `ep`, `nproc`, `pmem`</span>

#### **Output format**

<div class="notranslate">

```
{
  "mySqlGov": "enabled",              # possible values: enabled, error
  "mySqlGovMode": "abusers",          # see “MySQL Governor > Modes Of Operation”
                                      # if MySQL Governor is not enabled, value is "none"
 
  "resellers": [                      # list of resellers (available only with
                                      # reseller limits feature)
      {
          "id": 1000020005,           # internal record id
          "limit": <lve_section>,     # current limits (last 5 seconds)
          "name": "reseller_name",    # reseller’s login in control panel
          "usage": <lve_section>      # current usage (last 5 seconds)
      }
  ],
  "result": "success",                # see the ‘errors handling’ section
  "timestamp": 1522858537.337549,
  "users": [
      {
          "domain": "domain.com",     # user’s primary domain (from control panel)
          "id": 20005,                # lve_id, same as user id in /etc/passwd file
          "limit": <lve_section>,     # limits for last 5 seconds
          "reseller": "reseler1",     # user’s reseller (from control panel)
          "usage": <lve_section>,     # usage for last 5 seconds
          "username": "user"          # username from /etc/passwd file or “N/A” if user
                                      # with such id does not exist
       }
   ]
 }
```
</div>

The structure<sup> *</sup> of <span class="notranslate">`<lve_section>`</span>:

<div class="notranslate">

```
{
"cpu": {
 "all": 50.0,      # CPU usage or limit (LVE only)
 "mysql": 0.0*     # CPU usage or limit (MySQL Governor only)
},
"ep": 1.0,           # number of entry processes
"io": {
 "all": 0.0,       # IO usage or limit (LVE only)
 "mysql": 0.0**     # IO usage or limit (MySQL Governor only)
},
"iops": 0.0,         # IO operations per second
"mem": 258048,       # memory usage or limit
"pno": 1.0           # number of processes
}
```
</div>


:::tip Note
* you can modify this structure using <span class="notranslate">`--show`</span> option, see [usage examples](/lve-stats_2/#examples) for details.
* MySQL values are only present when <span class="notranslate">MySQL Governor</span> statistics is available and <span class="notranslate">`--hide-mysql`</span> options is not used.
:::

#### **Units of measurement**

For <span class="notranslate">`limits`</span> and <span class="notranslate">`usage`</span> sections we use the following units of measurement.

| | |
|-|-|
|**Value** | **Units of measurement**|
|<span class="notranslate"> cpu (lve and mysql) </span> | percentage of one <span class="notranslate"> CPU </span> core|
|<span class="notranslate"> io (lve and mysql) </span> | bytes per second|
|<span class="notranslate"> iops </span> | number of <span class="notranslate"> IO </span> operations per second|
|<span class="notranslate"> mem </span> | bytes|
|<span class="notranslate"> ep </span> | number of entry processes|
|<span class="notranslate"> pno </span> | number of processes|


#### **Errors handling**

The format of the error message is the same as in the other <span class="notranslate">`cloudlinux- *`</span> utilities. When everything is ok, the <span class="notranslate">`result`</span> value is <span class="notranslate">`success`</span>. Otherwise, it contains error message. In case of unexpected errors, the output will be as follows.

<div class="notranslate">

```
# cloudlinux-top --json 
{
  "context": {
      "error_text": "Very bad error"
  },
  "result": "An error occured: \"%(error_text)s\"",
  "timestamp": 1523871939.639394
}
```
</div>


#### **Examples**


* get 100 users ordered by <span class="notranslate"> CPU </span> usage

  <div class="notranslate">

  ```
  # cloudlinux-top --json --order-by cpu --max=100
  ```
  </div>

* get information about one user

  <div class="notranslate">

  ```
  # cloudlinux-top --json -u username
  ```
  </div>

* get information about reseller and his users

  <div class="notranslate">

  ```
  # cloudlinux-top --json --for-reseller=reseller_name
  ```
  </div>

* show only <span class="notranslate">IO</span> limits and usage

  <div class="notranslate">

  ```
  # cloudlinux-top --json --show=io
  ```
  </div>

<div class="notranslate">

#### cloudlinux-statistics

</div>

<span class="notranslate">cloudlinux-statistics</span> is a <span class="notranslate">CLI</span> utility that provides historical information about resource usage.

#### **Usage**

<div class="notranslate">

```
cloudlinux-statistics [-h] [-j] [-v] [--by-usage BY_USAGE]
                      [--percentage 0..100] [--by-fault BY_FAULT]
                      [--threshold THRESHOLD] [--server_id SERVER_ID]
                      [-f FROM] [-t TO] [--period PERIOD]
                      [--limit LIMIT]
                      [--show COLUMN_NAME [COLUMN_NAME ...]]
                      [-o ORDER_BY] [--id ID] [--time-unit TIME_UNIT]
                      [-r FOR_RESELLER]
```
</div>

**Optional arguments**

* <span class="notranslate"> `-h`, `--help` </span> – show this help message and exit
* <span class="notranslate"> `-j`, `--json` </span> – return data in JSON format
* <span class="notranslate"> `-v`, `--version` </span> – show program version number and exit
* <span class="notranslate"> `--server_id SERVER_ID`, `--server-id SERVER_ID` </span> – can be used with the central database for multiple servers; default `...`
* <span class="notranslate"> `--limit LIMIT` </span> – limit the number of results to display, `0` is unlimited
* <span class="notranslate"> `--show COLUMN_NAME [COLUMN_NAME ...]` </span> – show only listed columns; <span class="notranslate">`all`</span> for all supported columns (fields)
  | | |
  |-|-|
  |<span class="notranslate">Key</span>|Fields to show|
  |<span class="notranslate">`all`</span>|all available fields|
  |<span class="notranslate">`cpu`</span>|CPU field|
  |<span class="notranslate">`io`</span>|IO field|
  |<span class="notranslate">`iops`</span>|IOPS field|
  |<span class="notranslate">`ep`</span>|entry processes (concurrent connections) field|
  |<span class="notranslate">`nproc`</span>|number of processes field|
  |<span class="notranslate">`pmem`</span>|physical memory field|
  |<span class="notranslate">`vmem`</span>|virtual memory field|
  |<span class="notranslate">`mysql`</span>|`mysql_cpu` & `mysql_io` field|

* <span class="notranslate"> `-o ORDER_BY`, `--order-by ORDER_BY` </span> – order results by one of the following keys (fields):
  | | |
  |-|-|
  |FIELD|DESCRIPTION|
  |<span class="notranslate">`any_faults`</span>|total number of faults of all types|
  |<span class="notranslate">`cpu`</span>|average CPU usage`</span>|
  |<span class="notranslate">`mysql_cpu`</span>|average MySQL CPU usage`</span>|
  |<span class="notranslate">`io`</span>|average IO usage`</span>|
  |<span class="notranslate">`mysql_io`</span>|average MySQL IO usage`</span>|
  |<span class="notranslate">`iops`</span>|average IO operations; (LVE version >= 8)`</span>|
  |<span class="notranslate">`ep`</span>|average number of entry processes (concurrent connections)`</span>|
  |<span class="notranslate">`nproc`</span>|average number of processes`</span>|
  |<span class="notranslate">`pmem`</span>|average physical memory usage`</span>|
  |<span class="notranslate">`vmem`</span>|average virtual memory usage`</span>|
  |<span class="notranslate">`cpu_faults`</span>|total number of CPU usage faults`</span>|
  |<span class="notranslate">`io_faults`</span>|total number of max IO faults`</span>|
  |<span class="notranslate">`iops_fault`</span>|total number of max IO operations faults; (LVE version >= 8)`</span>|
  |<span class="notranslate">`ep_faults`</span>|total number of max entry processes faults`</span>|
  |<span class="notranslate">`nproc_faults`</span>|total number of max processes faults`</span>|
  |<span class="notranslate">`pmem_faults`</span>|total number of out of physical memory faults`</span>|
  |<span class="notranslate">`vmem_faults`</span>|total number of out of virtual memory faults`</span>|

* <span class="notranslate"> `-r FOR_RESELLER`, `--for-reseller FOR_RESELLER` </span> – show statistics only for given reseller and his users

Filter items by resource usage.

* <span class="notranslate"> `--by-usage BY_USAGE` </span> – show LVEs with usage (averaged) within 90 percent of the limit available values
  | | |
  |-|-|
  |FIELD|DESCRIPTION|
  |<span class="notranslate">`cpu`</span>|average CPU usage|
  |<span class="notranslate">`mysql_cpu`</span>|average MySQL CPU usage|
  |<span class="notranslate">`io`</span>|average IO usage|
  |<span class="notranslate">`mysql_io`</span>|average MySQL IO usage|
  |<span class="notranslate">`iops`</span>|average IO operations; (LVE version >= 8)|
  |<span class="notranslate">`ep`</span>|average number of entry processes (concurrent connections)|
  |<span class="notranslate">`nproc`</span>|average number of processes|
  |<span class="notranslate">`pmem`</span>|average physical memory usage|
  |<span class="notranslate">`vmem`</span>|average virtual memory usage|

* <span class="notranslate"> `-percentage 0..100` </span> – define percentage for <span class="notranslate">`--by-usage`</span> option; default `90`

Filter items by the number of faults.

* <span class="notranslate"> `--by-fault BY_FAULT` </span> – show only accounts that have some faults for the given limit
  | | |
  |-|-|
  |FIELD|DESCRIPTION|
  |<span class="notranslate">`any`</span>|faults of all types|
  |<span class="notranslate">`cpu`</span>|CPU usage faults|
  |<span class="notranslate">`io`</span>|max IO usage faults|
  |<span class="notranslate">`iops`</span>|max IO operations faults; (LVE version >= 8)|
  |<span class="notranslate">`ep`</span>|max entry processes faults|
  |<span class="notranslate">`nproc`</span>|max processes faults|
  |<span class="notranslate">`pmem`</span>|out of physical memory faults|
  |<span class="notranslate">`vmem`</span>|out of virtual memory faults|

* <span class="notranslate"> `--threshold THRESHOLD` </span> – in combination with <span class="notranslate">`--by-fault`</span> shows only accounts with the number of faults more than given; default `1`

Filter items by a time interval.

Allows to get information for the given period of time; you can either set <span class="notranslate">`--from`</span> and <span class="notranslate">`--to`</span> options, or just get information for the recent time period using <span class="notranslate">`--period option`.</span>

:::tip Note
<span class="notranslate">`--from`</span> and <span class="notranslate">`--to`</span> values are ignored when <span class="notranslate">`--period`</span> is set.
:::

* <span class="notranslate"> `-f FROM`, `--from FROM` </span> – run report from date and time in <span class="notranslate">`[YY]YY-MM-DD[ HH:MM]`</span> format; if not present, last 10 minutes are assumed
* <span class="notranslate"> `-t TO`, `--to TO` </span> – run report up to date and time in <span class="notranslate">`[YY]YY-MM-DD[ HH:MM]`</span> format; if not present, reports results up to now
* <span class="notranslate"> `--period PERIOD` </span> – time period; specify minutes with <span class="notranslate">`m`</span>, hours with <span class="notranslate">`h`</span>, days with <span class="notranslate">`d`</span>, and values: <span class="notranslate">`today`, `yesterday`</span>; `5m` - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, and <span class="notranslate">`today`</span>

Get detailed statistics.

* <span class="notranslate"> `--id ID` </span> – get detailed statistics for database record with the given id
* <span class="notranslate"> `--time-unit TIME_UNIT` </span> – group statistics using the given time; 1 minute by default. For example: <span class="notranslate">`1h`</span> or <span class="notranslate">`1h30m`</span> or <span class="notranslate">`dynamic`</span>; available only in pair with <span class="notranslate">`--id`</span>


#### **Output format**

There are two different JSON formats used for **summary statistics** and **detailed statistics**.

**Summary statistics**

<div class="notranslate">

```
# cloudlinux-statistics --json
 {
 "resellers": [
   {
     "usage": <lve_section>,
     "faults": <lve_section>,
     "name": "reseller",
     "limits": <lve_section>,
     "id": 1000020005
   }
 ],
 "timestamp": 1522920637,
 "mySqlGov": "enabled",            # possible values: ”enabled”, “error”
 "result": "success",
 "users": [
   {
     "username": "username",
     "domain": "example.com",
     "reseller": "reseller",
     "limits": <lve_section>,
     "faults": <lve_section>,
     "usage": <lve_section>,
     "id": 20005
   }
 ]
 }
```
</div>

**Detailed statistics**

<div class="notranslate">

```
# cloudlinux-statistics --json --id=20001
 {
 "timestamp": 1523011550,
 "mySqlGov": "enabled",           # possible values: ”enabled”, “error”
 "result": "success",
 "user": [
   {
     "usage": <lve_section>,
     "faults": <lve_section>,
     "from": 1523011144,
     "limits": <lve_section>,
     "to": 1523011143
   },
 ...
   {
     "usage": <lve_section>,
     "faults": <lve_section>,
     "from": 1523011204,
     "limits": <lve_section>,
     "to": 1523011203
   }
 ]
 }
```
</div>

For both, **summary statistics** and **detailed statistics**, <span class="notranslate">`<lve_section>`</span> is the same and looks like following<sup> *</sup>.

<div class="notranslate">

```
{
   "ep": {
     "lve": 1        # number of entry processes
   },
   "vmem": {
     "lve": 2428928  # virtual memory usage or limit (deprecated)
   },
   "iops": {
     "lve": 0        # io operations per second
   },
   "io": {
     "lve": 0.0,     # io usage or limit (lve only)
     "mysql": 0.0**   # io usage or limit (mysql only)
   },
   "nproc": {
     "lve": 1        # number of processes in lve
   },
   "cpu": {
     "lve": 25.6,    # cpu usage (lve only)
     "mysql": 0.0*   # cpu usage (mysql governor only)
   },
   "pmem": {
     "lve": 360448   # physical memory usage or limit
   }
 }
```
</div>

:::tip Note
* you can specify only required fields using <span class="notranslate">`--show`</span> option;
* <span class="notranslate">`mysql`</span> fields are only available with <span class="notranslate"> [MySQL Governor](/mysql_governor/#installation)</span> installed.
:::

#### **Units of measurement**

For <span class="notranslate">`limits`</span> and <span class="notranslate">`usage`</span> sections we use the following units of measurement.

| | |
|-|-|
|Value|Units of measurement|
|<span class="notranslate">`cpu` (LVE and MySQL)</span> | percentage of one <span class="notranslate">CPU</span> core|
|<span class="notranslate">`io` (LVE and MySQL) </span> | bytes per second|
|<span class="notranslate">`iops`</span> | number of <span class="notranslate">IO</span> operations per second|
|<span class="notranslate">`pmem`</span> and <span class="notranslate">`vmem`</span> | bytes|
|<span class="notranslate">`ep`</span> | number of entry processes|
|<span class="notranslate">`nproc`</span> | number of processes in LVE|

#### **Errors handling**

The format of the error message is the same as in the other <span class="notranslate">`cloudlinux- *`</span> utilities. When everything is ok, the <span class="notranslate">`result`</span> value is <span class="notranslate">`success`</span>. Otherwise, it contains error message.

<div class="notranslate">

```
# cloudlinux-statistics --json 
{
  "context": {
      "error_text": "Very bad error"
  },
  "result": "An error occured: \"%(error_text)s\"",
  "timestamp": 1523871939.639394
}
```
</div>

#### **Examples**


* get top 10 users ordered by <span class="notranslate">CPU</span> usage for today

<div class="notranslate">

```
# cloudlinux-statistics --json --order-by=cpu --period=today --limit=10
```
</div>

* get users that hit <span class="notranslate">IO</span> limit more than 10 times for today

<div class="notranslate">

```
# cloudlinux-statistics --json --period=today --by-fault=io --threshold=10
```
</diV>

* get users that used more than 80% of <span class="notranslate">CPU</span> in last 24 hours

<div class="notranslate">

```
# cloudlinux-statistics --json --by-usage=cpu --percentage=80 --period=24h
```
</div>

* get information only about reseller and his users

<div class="notranslate">

```
# cloudlinux-statistics --json --for-reseller=reseller_name
```
</div>

* get information only about <span class="notranslate">CPU</span> and <span class="notranslate">IO</span> usage

<div class="notranslate">

```
# cloudlinux-statistics --json --show=cpu,io
```
</div>

### Plugins


LVE <span class="notranslate"> Stats 2 </span> comes with a set of generic plugins:

| |  |  |  | |
|-|--|--|--|-|
|Plugin Name | Order | Default | Period (seconds) | Description|
|LVECollector | 1000 | Y | 5 | Collects usage/limits data from `/proc/lve/list`|
|CPUInfoCollector | 2000 | Y | 5 | collents info about <span class="notranslate"> CPU - `/proc/cpuinfo`</span>|
|LVEUsernamesCollector | 3000 | Y | 3600 | collects usernames & user ids to match <span class="notranslate">`uid <-> lve id`</span> later on|
|LVEUsageAnalyzer | 4000 | Y | 5 | analyzes usage of LVE|
|LveUsageAggregator | 5000 | Y | 60 | aggregates data by time periods|
|DBGovSaver | 6000 | Y | 5 | Saves data about database governor|
|FileSaver | 7000 | Y | 5 | Saves LVE data into <span class="notranslate">`/var/lve/info`</span> |
|CloudLinuxTopFileSaver | 8000 | Y | 60 | saves data used by <span class="notranslate"> cloudlinux-top to `/var/lve/cloudlinux-top.json`</span>|
|DBSaver | 9000 | Y | 60 | save LVE data to database|
|DbUsernamesSaver | 10000 | Y | 3600 | saves users name to database|
|DBSaverX60 | 11000 | Y | 3600 | saves aggregated hourly data into database|
|SnapshotSaver | 12000 | Y | 30 | collects & saves snapshots data|
|StatsNotifier | 13000 | Y | varied | notify user/admin based on usage|
|HistoryCleaner | 14000 | Y | 3600 | removes old usage|
|ResMEMCollector | 1500 | N | 30 | collects physical memory usage from processes RES field instead of <span class="notranslate">`/proc/lve/list`</span> |
|LVEDestroyer | - | N | 5 | destroys LVEs that weren't active for X iterations. Number of iterations is passed from config using iterations variable. <span class="notranslate">`iterations=0`</span> means plugin disabled|


To enable non-default plugin, copy or link it to _/usr/share/lve-stats/plugins_ directory.

For example to enable _ResMEMCollector_ plugin, do:

<div class="notranslate">

```
ln -s /usr/share/lve-stats/plugins.other/res_mem_collector.py /usr/share/lve-stats/plugins/
service lvestats restart
```
</div>


#### Creating a Plugin for LVE Stats 2


* [Introduction](/lve-stats_2/#introduction)

* [Server Plugin Arrangement](/lve-stats_2/#server-plugin-arrangement)

* [Plugin Configuration](/lve-stats_2/#plugin-configuration)

* [Types of Plugins](/lve-stats_2/#types-of-plugins)

#### Introduction

<span class="notranslate">LVE Stats 2</span> complex has scalable architecture, which allows to connect custom plugins.


<span class="notranslate">LVE Stats</span> server searches for plugins in the directory which is specified with plugins parameter of server’s _/etc/sysconfig/lvestats2_ configuration file. Default directory is <span class="notranslate"> _/usr/share/lve-stats/plugins_. </span>

Each plugin must be of a <span class="notranslate"> Python </span> class, must be written in <span class="notranslate"> Python </span> language and its file must have <span class="notranslate"> .py </span> extension. Files with all other extensions will be ignored. For normal server work access permission 400 is enough; owner – <span class="notranslate"> root </span> .

Plugin classes can be of the same name, but better not, because classes' names can affect the set of parameters in <span class="notranslate"> _set_config_ </span> method. You can find detailed plugins' configuring information below, in appropriate chapter.

Plugin class must contain <span class="notranslate"> _execute()_ </span> method, which is invoked by the server every 5 seconds (by default, can be changed by interval parameter of configuration file).
Also <span class="notranslate"> set_config </span> method (configuration settings) can be available. You can find more info in <span class="notranslate"> [Plugins Configuration](/lve-stats_2/#plugin-configuration) </span> chapter.

Additionally the following attributes can be set (plugin class instance variable):

* <span class="notranslate"> order (integer) </span> - defines plugin's position in the server's plugin list, (more info in <span class="notranslate"> Servers Plugin Arrangement </span> ).
* <span class="notranslate"> timeout (integer </span> or <span class="notranslate"> float </span> ) – the longest allowable duration of one launch of the plugin (execute method). Default value of <span class="notranslate"> timeout </span> parameter is 5 seconds.
* <span class="notranslate"> period (integer) </span> – sets the interval between two launches of execute plugin method in seconds. If not defined, then plugin runs every 5 seconds ( <span class="notranslate"> interval </span> parameter in configuration file).

When <span class="notranslate"> _execute()_   </span> method of the plugin is invoked, the server creates an attribute <span class="notranslate"> _now_ </span> in it, where launch time is recorded. This value is equal to what a standard Python function <span class="notranslate"> _time.time()_ </span> returns. All the plugins launched one after another receive the same  value of <span class="notranslate"> _now_   </span> attribute from the server. <span class="notranslate"> _now_ </span> is overwritten before <span class="notranslate"> _execute()_ </span> method is invoked.

The previous value of now attribute is not saved by the server. If plugin needs it, it has to save it by itself.

Plugin class can be inherited from <span class="notranslate"> _LveStatsPlugin_ </span> class, which is the part of the server itself. This is not obligatory, but inheritance can help to avoid different errors in servers work, particularly if a plugin doesn't contain required execute method.

<span class="notranslate"> _LveStatsPlugin_ </span> class is defined in the file: <span class="notranslate"> _/opt/alt/python27/lib/python2.7/site-packages/lvestats/core/plugin.py_ . </span>

#### Server Plugin Arrangement


When the server starts, it performs the search of plugins in the directory specified in _/etc/sysconfig/lvestats2_ configuration file. This directory is scanned only when the server starts, therefore if any plugin was added into the directory, the server has to be restarted with the following command:
<div class="notranslate">

```
service lvestats restart.
```
</div>

After successful restart, the plugins are graded and executed  ascending by <span class="notranslate"> _order_ </span> attribute. If any plugin <span class="notranslate"> _order_ </span> attribute is not set, it is considered as a <span class="notranslate"> Python </span> language constant _sys.maxint_ (which is usually 9223372036854775807). This in fact means that such plugins will be executed in the last.
If any plugins has similar <span class="notranslate"> _order_ </span> meanings, their execution order is unpredictable.

The server invokes <span class="notranslate"> _execute_ </span> method of all plugins one after another.

When the server invokes <span class="notranslate"> _execute()_ </span> method of any plugin, it transmits a data dictionary ( <span class="notranslate"> _lve_data_ </span> argument) into plugin. The dictionary is common for all the plugins. Any plugin can read, write and change any data in this dictionary. <span class="notranslate"> LVE Stats 2 </span> server doesn't control this area. That is why one must be careful while developing new plugins, in order not to change or corrupt other plugins' data which can break their functionality.

If an exception occurs in <span class="notranslate"> _execute()_ </span> method, its text and <span class="notranslate"> python </span> stack trace is recorded into server log _/var/log/lve-stats_ and all the changes made to <span class="notranslate"> _lve_data_ </span> dictionary before the exception happened are lost.

The keys of the <span class="notranslate"> _lve_data_ </span> dictionary are recommended to look like <span class="notranslate"> “ _PluginName_Key_ ” </span> , in order the plugins do not corrupt other data accidentally.

Server contains some standard plugins which define and use the following keys in the common dictionary <span class="notranslate"> lve_data: _LVE_VERSION, stats, old_stats, procs_ </span> and <span class="notranslate"> _lve_usage_ </span> . User plugins can use data from these keys, but it is recommended not to change them if there is no special need, because it can break the next plugins in the execution queue.

| | |
|-|-|
|Key | Content|
|<span class="notranslate"> `LVE_VERSION` </span> | LVE version. The same as console command <span class="notranslate"> `lvectl lve-version` </span> produces.|
|<span class="notranslate"> `stats` </span> | Dictionary, that contains lve id’s as keys and LVEStat class objects as values. Every LVEStat object contains values of usages and limits taken from <span class="notranslate"> _/proc/lve/list_ </span> file for every <span class="notranslate"> LVE Id </span> . Dictionary keys – <span class="notranslate"> integer lve id </span> , including 0 for “ <span class="notranslate"> default </span> ” LVE. This dictionary is updated on each iteration of lvestats-server (every 5 seconds by default). LVEStat – is a standard server class, it can be imported with the command from <span class="notranslate"> _lvestats.core.lvestat_ </span> `import LVEStat.` The class is described in the file <span class="notranslate"> _/opt/alt/python27/lib/python2.7/site-packages/lvestats/core/lvestat.py_ </span> . Here you can find the whole list of data fields and their functions.|
|<span class="notranslate"> `old_stats` </span> | _stats_ content from the previous iteration. Before the first iteration – empty dictionary.|
|<span class="notranslate"> `totalHz` </span> | When LVE_VERSION is 4, real <span class="notranslate"> CPU </span> frequency in <span class="notranslate"> Hz </span> multiplied by number of cores. When LVE_VERSION > 4, <span class="notranslate"> CPU </span> speed is in conventional units and equals to 1000000000 * cores (1 <span class="notranslate"> GHz </span> per core).|
|<span class="notranslate"> `procs` </span> | Quantity of <span class="notranslate">  CPU </span> cores.|
|<span class="notranslate"> `lve_usages` </span> | Contains accumulated LVE statistics for each 5-seconds interval in current minute. Cleared each minute.|
|<span class="notranslate"> `lve_usage` </span> | Contains aggregated LVE Statistics for “previous” minute to store to database. Overwritten each minute.|

Each plugin’s instance lifetime is from the moment it was loaded till the server stops working. But if <span class="notranslate"> _execute()_ </span> method working time exceeds timeout, the plugin will be terminated and restarted in the next iteration. All changes to the <span class="notranslate"> _lve_data_ </span> dictionary will be lost.

During servers graceful shutdown (restart, server shutdown, commands <span class="notranslate"> `service lvestats stop, service lvestats restart` </span> ), each plugin receives SIGTERM signal.
This is useful to correctly unload the plugin (terminate all subsidiary processes, save data to files etc.). If a plugin doesn't need to “finalize” its execution before termination, then there's no need to implement this signal handler. Below you can see an example of such handler.

::: tip Note
If a plugin implements handler for SIGTERM, then this handler must end with <span class="notranslate"> `sys.exit(0)` </span> command. Otherwise plugin process will not be terminated correctly and will become orphaned.
:::

#### Plugin Configuration


<span class="notranslate">LVE Stats 2</span> Server allows to configure each plugin separately.

On initialization stage the server invokes <span class="notranslate"> _set_config()_ </span> method of the plugin and locates there a dictionary which contains:

* all parameters from file _/etc/sysconfig/lvestats2_ (global).
* plugin's individual configuration file parameters (if one exists). Configuration files must be located in <span class="notranslate"> _/etc/sysconfig/lvestats.config_ </span> directory, have .cfg extension and be the same format as _/etc/sysconfig/lvestats2_ . Files in this directory are matched with the plugins by name. For instance, if plugin class is <span class="notranslate"> _Plugin1_class_ </span> , then server will try to find and download <span class="notranslate"> _/etc/sysconfig/lvestats.config/Plugin1_class.cfg_. </span> Names are case sensitive. If any plugin doesn't have an individual configuration file, then it's not an error. In this case plugin will just receive parameters from _/etc/sysconfig/lvestats2_ .

::: tip Note
An individual configuration file of every plugin is loaded after server configuration file. That is why if it contains any parameters with names similar to ones of server config, then plugin will use parameters from its individual config rather than server config parameters.

If a plugin doesn't require any configuration to be done, then set_config method can be skipped.

In addition, plugins can use their own configuration methods.
:::

#### Types of Plugins

According to server architecture, plugins can be of the following types:

* <span class="notranslate">collectors</span>
* <span class="notranslate">analyzers</span>
* <span class="notranslate">persistors</span>
* <span class="notranslate">notifiers</span>

<span class="notranslate"> Collectors </span> are designed to collect information; <span class="notranslate"> analyzers </span> – to analyze it and form some other data on its basis; <span class="notranslate"> persistors </span> – to save information from the common dictionary into files, databases, etc.; <span class="notranslate"> notifiers </span> - to notify system users about any events.

This division is rather arbitrary. There is an opportunity to execute all the actions on collection, analysis and saving the information in one and only plugin. But at the same time the division into functionally independent parts allows to build flexible and easily configurable system for collecting and processing the data.

Also it is possible to implement the systems of lazy-write, planning of collecting/processing tasks and notifying users about different events.


#### Examples of Plugins

Here is a practical example of a user plugin.

Specification:

1. To trace specified file size changes. The name of file being traced must be specified in configuration file, which allows to change it without modifying the plugin itself. If file size has been changed, it has to be written as a message into our log. The name of log must be specified in configuration file as well.

2. File size must be checked with default interval (5 seconds), and log notification must be held once a minute (to avoid resource expend for possibly regular write).

3. System administrator must receive emails with file size at the moment the email was sent. These notifications must be sent even if the file size hasn’t been changed. Notification emails must be read periodicity from configuration file as well as sender/receiver emails .

As file size check, fixing the result and notification sending must be held with different periods, then it’s impossible to realize all the tasks by means of one plugin.
The fact that one minute (60 seconds) is multiple to 5 seconds doesn’t matter in this case, because default period can be changed in server’s configuration file, but the condition of fixing the result once a minute is a part of the specification, which can not be violated. In addition, notification email period is known in advance, as it is specified by user in configuration file.

That is why we realize 4 plugins: <span class="notranslate">**collector, analyzer, persistor**</span> and <span class="notranslate">**notifier**</span>.


#### **Collector**


<span class="notranslate"> Collector's </span> aim is to determine the size of a proper file.
<div class="notranslate">

```
# FSize_watcher_collector.py
# Example plugin for monitoring file size.
# Part 1. Collector

import os
from lvestats.core.plugin import LveStatsPlugin 

# Key name
COLLECTOR_KEY = 'FSizeWatcher_fsize'
COLLECTOR_KEY_FILENAME = 'FSizeWatcher_fname'  

class FSize_watcher_collector (LveStatsPlugin):
	# this plugin should be first in chain
	order = 0
	# File to monitoring
	file_to_monitoring = None 
	
	def __init__(self):
		pass 
		
	# Sets configuration to plugin
	def set_config(self, config):
		self.file_to_monitoring = config.get('file_to_monitoring', None)
		pass
	# Work method
	def execute(self, lve_data):
		try:
			# if monitoring file absent, do nothing
			if self.file_to_monitoring is None or not os.path.exists(self.file_to_monitoring):
		return 
		
			# Get file size
			stat_info = os.stat(self.file_to_monitoring)
			fsize = stat_info.st_size 
			
			# Place file name and file size to server data dictionary
			lve_data[COLLECTOR_KEY_FILENAME] = self.file_to_monitoring
			lve_data[COLLECTOR_KEY] = fsize
		except (OSError, IOError):
			# file absent or any other error - remove size from dictionary
			del lve_data[COLLECTOR_KEY]
```
</div>

Plugin algorithm is extremely simple – file size is read and written into data dictionary. Files name is read from <span class="notranslate">_set_config_</span> method configuration. If the name is not specified, then <span class="notranslate"> None </span> is written into appropriate variable. All the errors are completely ignored (e.g. if specified file doesn't exist or there's no way to read any of it's information).

<span class="notranslate">_order_</span> attribute is specified as 0 to make this plugin go the first among three. Data collector must always be the first in plugins logical chain, because it provides all the necessary information for the analyzer which goes the next. Specific values of <span class="notranslate"> _order_ </span> can be of any kind, but what is important is that when the server starts, all the plugins line up in proper sequence: <span class="notranslate"> collector – analyzer – persistor </span> .

In order to make plugin work, we have to create configuration file <span class="notranslate"> _/etc/sysconfig/lvestats.config/FSize_watcher_collector.cfg_ </span> with the following content:
<div class="notranslate">

```
# Config file for FSize_watcher_collector plugin
# Please define monitoring file here
# file_to_monitoring = /usr/local/cpanel/logs/error_log
file_to_monitoring = /usr/local/cpanel/logs/access_log
```
</div>

Note that file name <span class="notranslate"> _FSize_watcher_collector_ </span> without .cfg extension matches plugin class name.

<span class="notranslate"> _file_to_monitoring_ </span> option is read by plugin in <span class="notranslate"> _set_config_ </span> method and contains file’s full name for monitoring.

Files for monitoring, suggested in the actual example - <span class="notranslate"> _/usr/local/cpanel/logs/error_log_ and _/usr/local/cpanel/logs/access_log_ </span> - are real, these are cPanel control panel logs.

The first file is errors log; the second is appeal log, is refreshed during common work with panel (e.g. if user email address is changed).

Errors log tracking is more important, but appeal log monitoring allows to illustrate plugins work more in details, because it is refreshed more often.

Note that plugin can monitor one file only.

#### **Analyzer**


<span class="notranslate"> Analyzer </span> decides if the file's size has changed and gives a command to persistor to refresh log.

<div class="notranslate">

```
# FSize_watcher_analyzer.py
# Example plugin for monitoring file size.
# Part 2. Analyzer 

from lvestats.core.plugin import LveStatsPlugin 

# Key name from collector plugin
COLLECTOR_KEY = 'FSizeWatcher_fsize' 

# Key name 1 for saver plugin
SAVER_KEY = 'FSizeWatcher_fsize_to_store'
# Key name 2 for saver plugin
SAVER_DATA_PRESENCE = 'FSizeWatcher_fsize_present'  

class FSize_watcher_analyzer (LveStatsPlugin):
	# this plugin should be second in chain
	order = 1
	# Last file size
	file_last_size = 0
	# Plugin run period in secondsperiod = 60 
	
	def __init__(self):
		pass 
		
	# work method
	def execute(self, lve_data):
		# Default setting for saver
		lve_data[SAVER_DATA_PRESENCE] = 0
		# Check presence data
		if COLLECTOR_KEY not in lve_data:
		return 
		
		# Get file size from server data dictionary
		fsize = lve_data[COLLECTOR_KEY] 
		
		# Check, if file size changed, store it for saver plugin
		if fsize == self.file_last_size:
			return 
			
		# Put new size for saver plugin
		lve_data[SAVER_KEY] = fsize
		self.file_last_size = fsize
		lve_data[SAVER_DATA_PRESENCE] = 1
```
</div>

This plugin is extremely simple as well. It starts after <span class="notranslate"> collector (order=1) </span> , searches for file size in the dictionary and compares it with the previous index. If it has changed, then it writes a sign of presence of a new size into the dictionary. If no changes seen, then sign resets. The previous file size is stored in the plugin itself in <span class="notranslate"> _file_last_size_ </span> variable. Note that they are stored during the whole server <span class="notranslate"> lve-stats </span> lifetime.

If file size is not found in data dictionary, then plugin just ends.

All the errors are completely ignored.

<span class="notranslate">Analyzer</span> is unconfigurable, that is why it doesn’t require any configuration file and it doesn’t contain <span class="notranslate">_set_config_</span> method.

Plugin starts every 60 seconds (1 minute), because we need data fixation to be performed one time in a minute.


#### **Persistor**


<span class="notranslate">Persistor</span> saves information from the common dictionary into files, databases, etc.

<div class="notranslate">

```
# FSize_watcher_saver.py
# Example plugin for monitoring file size and last modification date-time.
# Part 3. Data saver 

import signal
import sys
import time
from lvestats.core.plugin import LveStatsPlugin 

# Key name 1 for saver plugin
SAVER_KEY = 'FSizeWatcher_fsize_to_store'
# Key name 2 for saver plugin
SAVER_DATA_PRESENCE = 'FSizeWatcher_fsize_present'
# Monitoring file name
COLLECTOR_KEY_FILENAME = 'FSizeWatcher_fname'  

class FSize_watcher_saver (LveStatsPlugin):
	# this plugin should be third in chain
	order = 2
	# Plugin run period in seconds
	period = 60
	# Log filename
	log_file_name = None
	# First run flag
	is_first_run = True 
	
	def __init__(self):
		signal.signal(signal.SIGTERM, self.sigterm_handler) 
		
	# Sets configuration to plugin
	def set_config(self, config):
		# Get log filename
		self.log_file_name = config.get('log_filename', None) 
		
	# work method
	def execute(self, lve_data):
		# do nothing, if log file not defined
		if not self.log_file_name:
			return
		try:
			# Check presence data
			if SAVER_DATA_PRESENCE not in lve_data or lve_data[SAVER_DATA_PRESENCE] == 0:
				# No data
				return
			# Get file size from server data dictionary
			fsize = lve_data[SAVER_KEY]
			
			# Store data to log
			f = open(self.log_file_name, 'a')
			if self.is_first_run:
				f.write('%s - FSize_watcher started. Monitoring file: %s, saving data period=%d sec\n' % (time.asctime(time.localtime()), lve_data[COLLECTOR_KEY_FILENAME], self.period))
				self.is_first_run = False
			f.write('%s - FSize_watcher: file size is %d bytes\n' % (time.asctime(time.localtime()), fsize))
			f.close()
		except:
			# Ignore all errors
			pass 
			
	# Terminate handler
	def sigterm_handler(self, signum, frame):
		if self.log_file_name:
			try:
				# Store data to log file
				f = open(self.log_file_name, 'a')
				f.write('%s - File watcher saver plugin: TERMINATE\n' % time.asctime(time.localtime()))
				f.close()
				pass
			except:
				# Ignore all errors
				pass
		# Terminate process
		sys.exit(0)
```
</div>

Configuration file <span class="notranslate">_/etc/sysconfig/lvestats.config/FSize_watcher_saver.cfg_</span>:

<div class="notranslate">

```
# Config file for FSize_watcher_saver.py plugin
# Please define log filename here
log_filename = /var/log/FSize_watcher.log
```
</div>

This plugin starts after <span class="notranslate">analyzer (order=2)</span> , checks new file size <span class="notranslate"> `presence` </span> flag, and if positive – writes it into log. If the flag is cleared (which means the size hasn't changed), then plugin simply ends.

Starts once in a minute (period=60).

Also this plugin shows the work of signal handler.

Plugin constructor registers handler-function of a  proper signal: <span class="notranslate">_signal.signal(signal.SIGTERM, self.sigterm_handler)_</span>. This means, that when the server finishes its work, then <span class="notranslate"> _sigterm_handler_ </span> method of plugin class will be invoked. In the actual example the function just writes a notification into log, tracing the fact of it's invocation.

Pay attention on <span class="notranslate"> _sys.exit(0)_ </span> command in the end of the handler. Find the information on it in <span class="notranslate"> [Server Plugin Arrangement](/lve-stats_2/#server-plugin-arrangement) </span> section.

In addition see into examples of file log <span class="notranslate"> _/var/log/FSize_watcher.log_ </span> formed by the plugins above:
<div class="notranslate">

```
Tue Feb  3 13:06:24 2015 - FSize_watcher started. Monitoring file: /usr/local/cpanel/logs/access_log, saving data period=60 sec
Tue Feb  3 13:06:24 2015 - FSize_watcher: file size is 122972890 bytes
Tue Feb  3 13:07:25 2015 - FSize_watcher: file size is 122975507 bytes
Tue Feb  3 13:08:25 2015 - FSize_watcher: file size is 122978124 bytes
Tue Feb  3 13:09:25 2015 - FSize_watcher: file size is 122978997 bytes
Tue Feb  3 13:10:25 2015 - FSize_watcher: file size is 122981033 bytes
Tue Feb  3 13:11:25 2015 - FSize_watcher: file size is 122982052 bytes
Tue Feb  3 13:13:25 2015 - FSize_watcher: file size is 122983798 bytes
Tue Feb  3 13:20:15 2015 - File watcher saver plugin: TERMINATE
```
</div>

and
<div class="notranslate">

```
Thu Feb  5 13:07:27 2015 - FSize_watcher started. Monitoring file: /usr/local/cpanel/logs/error_log, saving data period=60 sec
Thu Feb  5 13:07:27 2015 - FSize_watcher: file size is 14771849 bytes
Thu Feb  5 14:03:32 2015 - FSize_watcher: file size is 14771995 bytes
Thu Feb  5 15:01:36 2015 - FSize_watcher: file size is 14772434 bytes
Thu Feb  5 17:15:47 2015 - FSize_watcher: file size is 14772873 bytes
Thu Feb  5 18:47:54 2015 - FSize_watcher: file size is 14775213 bytes
Thu Feb  5 19:11:56 2015 - FSize_watcher: file size is 14775652 bytes
Thu Feb  5 21:09:05 2015 - FSize_watcher: file size is 14776091 bytes
Thu Feb  5 23:06:14 2015 - FSize_watcher: file size is 14776530 bytes
Fri Feb  6 00:47:23 2015 - FSize_watcher: file size is 14778870 bytes
Fri Feb  6 01:02:24 2015 - FSize_watcher: file size is 14779309 bytes
Fri Feb  6 02:00:28 2015 - FSize_watcher: file size is 14779434 bytes
Fri Feb  6 03:16:34 2015 - FSize_watcher: file size is 14779873 bytes
Fri Feb  6 05:04:42 2015 - FSize_watcher: file size is 14779998 bytes
Fri Feb  6 05:12:43 2015 - FSize_watcher: file size is 14780437 bytes
Fri Feb  6 05:56:50 2015 - FSize_watcher: file size is 14780551 bytes
Fri Feb  6 06:01:50 2015 - FSize_watcher: file size is 14780975 bytes
Fri Feb  6 06:03:51 2015 - FSize_watcher: file size is 14782183 bytes
Fri Feb  6 06:04:51 2015 - FSize_watcher: file size is 14782575 bytes
Fri Feb  6 06:18:52 2015 - FSize_watcher: file size is 14782647 bytes
Fri Feb  6 06:21:52 2015 - FSize_watcher: file size is 14782898 bytes
Fri Feb  6 06:48:54 2015 - FSize_watcher: file size is 14785238 bytes
Fri Feb  6 07:09:56 2015 - FSize_watcher: file size is 14785677 bytes
Tue Feb  6 08:03:15 2015 - File watcher saver plugin: TERMINATE
```
</div>

You can see that log record is being held once a minute (what we actually need), new file size is written.

Also we can notice that handler <span class="notranslate"> SIG_TERM </span> was executed, signaling that plugin received the notification about server shut-down.


#### **Notifier**


<span class="notranslate"> Notifier </span> informs system users about any events.
<div class="notranslate">

```
# FSize_watcher_saver.py
# Example plugin for monitoring file size and last modification date-time.
# Part 4. Notifier 

import time
import smtplib 

from lvestats.lib.commons import dateutil
from lvestats.core.plugin import LveStatsPlugin  


# Key name
COLLECTOR_KEY_FSIZE = 'FSizeWatcher_fsize'
COLLECTOR_KEY_FILENAME = 'FSizeWatcher_fname' 

# email message pattern
EMAIL_MESSAGE_PATTERN = """Hello, administrator!
Size of the file '%s' is %d bytes.
"""  


class FSize_watcher_notifier (LveStatsPlugin):
	# Default period
	DEFAULT_PERIOD_STR = '12h'
	# this plugin should be third in chainorder = 3
	# Timeout
	timeout = 20
	# Notifier Log filename
	log_file_name = '/var/log/FSize_watcher_notifier.log'
	# Email from address
	email_from = None
	# Email to address
	email_to = None
	# Email subject
	email_subject = None
	# Sets configuration to plugin
	def set_config(self, config):
		# Email settings
		self.email_from = config.get('notify_from_email', None)
		self.email_to = config.get('notify_to_email', None)
		self.email_subject = config.get('notify_from_subject', 'Message from FSize_watcher_notifier plugin')
		# Notify period
		s_period = config.get('notify_period', None)
		if s_period:
			self.period = dateutil.parse_period2(s_period)
		else:
			self.period = dateutil.parse_period2(FSize_watcher_notifier.DEFAULT_PERIOD_STR)
		f = open(self.log_file_name, 'a')
		f.write('%s - FSize_watcher_notifier plugin: configure\n' % time.asctime(time.localtime()))
		f.write('       - Period: %s\n' % self.period)
		f.write('       - From: %s\n' % self.email_from)
		f.write('       - To: %s\n' % self.email_to)
		f.write('       - Subject: \'%s\'\n' % self.email_subject)
		f.close() 
		
	# work method
	def execute(self, lve_data):
		if COLLECTOR_KEY_FSIZE not in lve_data or COLLECTOR_KEY_FILENAME not in lve_data:
			return
		if not self.email_from or not self.email_to:
			f = open(self.log_file_name, 'a')
			f.write('%s - FSize_watcher_notifier plugin error: email_from or email_to not set\n')
			f.close()
			return
		try:
			from email.mime.text import MIMEText
			# Send email
			msg = MIMEText(EMAIL_MESSAGE_PATTERN % (lve_data[COLLECTOR_KEY_FILENAME], lve_data[COLLECTOR_KEY_FSIZE]))
		msg['Subject'] = self.email_subject
		msg['From'] = self.email_from
		msg['To'] = self.email_to 
		
		s = smtplib.SMTP('localhost')
		s.sendmail(self.email_from, [self.email_to], msg.as_string())
			s.quit() 
			
		f = open(self.log_file_name, 'a')
			f.write('%s - FSize_watcher_notifier plugin: email message was successfully sent\n' % time.asctime(time.localtime()))
			f.close()
			except Exception as e:
			f = open(self.log_file_name, 'a')
			f.write('%s - FSize_watcher_notifier plugin error:\n%s\n' % (time.asctime(time.localtime()), str(e)))
			f.close()
```
</div>

Configuration file <span class="notranslate">_/etc/sysconfig/lvestats.config/FSize_watcher_notifier.cfg_</span>:

<div class="notranslate">

```
# Config file for FSize_watcher_notifier.py plugin
# Please define email options here 

NOTIFY_FROM_EMAIL=user@hostname
NOTIFY_FROM_SUBJECT=Message from FSize_watcher_notifier
NOTIFY_TO_EMAIL=admin@hostname
NOTIFY_PERIOD=12h
```
</div>

Plugin’s index number equals 3 ( <span class="notranslate"> order=3 </span> ), that is why <span class="notranslate"> notifier </span> starts after the rest. But since it uses only data formed by <span class="notranslate"> collector </span> , then its order may equal any number bigger that <span class="notranslate"> collectors </span> order (>0).

<span class="notranslate"> Notifier </span> reads the necessary parameters from the configuration (email address, topic, period) and writes them into its own log as reference.

Plugin’s <span class="notranslate"> _execute_ </span> method checks the availability of all the necessary data (email parameters, collectors data) and sends the message. All the notifications are written into the <span class="notranslate"> notifier's </span> own log.

If any data is missing,  the message is not sent.

Log example:
<div class="notranslate">

```
Thu Feb  5 11:51:34 2015 - FSize_watcher_notifier plugin: configure
       - Period: 60.0
       - From: user@hostname
       - To: admin@hostname
       - Subject: 'Message from FSize_watcher_notifier'
Thu Feb  5 11:51:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent
Thu Feb  5 11:52:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent
Thu Feb  5 11:53:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent
Thu Feb  5 11:54:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent
Thu Feb  5 11:57:00 2015 - FSize_watcher_notifier plugin: configure
       - Period: 43200.0
       - From: user@hostname
       - To: admin@hostname
       - Subject: 'Message from FSize_watcher_notifier'
Thu Feb  5 11:57:00 2015 - FSize_watcher_notifier plugin: email message was successfully sent
```
</div>

#### File info and format for /var/lve/info file

This file is used by control panels to display to user their 'current' usage. The file is updated every 5 seconds by lve-stats.

When writing to this file we make sure that: average <span class="notranslate"> CPU/IOPS/MEM </span> is never greater then <span class="notranslate"> LIMIT </span> for that resource.

Example:

0,0,20,0,2500,0,262144,0,0,262144,0,0,100,0,0,0,0,1024,1024,0,0,0,0
600,1,20,2492,2500,70,262144,0,0,262144,33,0,100,1,0,0,0,1024,1024,0,5,0,0
200,0,20,0,2500,0,262144,0,0,262144,0,0,100,0,0,0,0,1024,1024,0,0,0,0
500,0,20,0,2500,0,262144,0,0,262144,0,0,100,0,0,0,0,1024,1024,0,0,0,0

First line of the file is ' <span class="notranslate"> default limits </span> '.

Fields:

<div class="notranslate">

```
# 0 - id
# 1 - mep (average entry processes)
# 2 - lep  (limit ...)
# 3 - cpu_usage (average speed)
# 4 - lcpu (limit spped)
# 5 - mem_usage (average virtual memory)
# 6 - lmem (limit ...)
# 7 - mem_fault (number of virtual memory faults)
# 8 - mep_fault (number of entry processes faults)
LVE_VERSION >=6
# 9 - lmemphy (limit physical memory)
# 10 - memphy (average ...)
# 11 - memphy_fault (faults ...)
# 12 - lnproc (limit number of processes)
# 13 - nproc (average ...)
# 14 - nproc_fault (faults ...)
# 15 - lcpuw (CPU weight -- deprecated not used)
# 16 - io_usage (average IO usage)
# 17 - io_limit (limit ...)
LVE_VERSION >=8
#18 - liops  (limit IOPS)
#19 - iops (average IOPS)
```
</div>


### Troubleshooting

<span class="notranslate">lvestats</span> service and utilities write fatal errors to system log.

There is <span class="notranslate">_/var/log/lve-stats.log_</span> file with additional information (warnings, tracebacks for errors).

## CageFS

### General information and requirements

CageFS is a virtualized file system and a set of tools to contain each user in its own 'cage'. Each customer will have its own fully functional CageFS, with all the system files, tools, etc.

The benefits of CageFS are:

* Only safe binaries are available to user
* User will not see any other users, and would have no way to detect presence of other users & their user names on the server
* User will not be able to see server configuration files, such as Apache config files.
* User's will have limited view of _/proc_ file system, and will not be able to see other users' processes

At the same time, user's environment will be fully functional, and user should not feel in any way restricted. No adjustments to user's scripts are needed. CageFS will cage any scripts execution done via:
* <span class="notranslate">Apache (suexec, suPHP, mod_fcgid, mod_fastcgi)</span>
* <span class="notranslate">LiteSpeed Web Server</span>
* <span class="notranslate">Cron Jobs</span>
* SSH
* Any other <span class="notranslate">PAM</span> enabled service

::: tip Note
mod_php is not supported, MPM ITK requires a custom patch
:::

::: tip Note
CageFS is not supported for H-Sphere.
:::

#### Minimum Requirements:

* kernel: CL5 with lve0.8.54 or later, CL6 with lve1.2.17.1 or later, CL7.
* 7GB of disk space.

Depending on your setup, and number of users, you might also need:
* Up to 8MB per customer in _/var_ directory (to store custom _/etc_ directory)
* 5GB to 20GB in _/usr/share_ directory (to store safe skeleton of a filesystem)

::: danger Warning
If at any time you decide to uninstall CageFS, please make sure you follow [uninstall instructions](/cagefs/#uninstalling-cagefs)
:::

### Installation and update

To install CageFS:
<div class="notranslate">

```
$ yum install cagefs
$ /usr/sbin/cagefsctl --init
```
</div>

That last command will create skeleton directory that might be around 7GB in size. If you don't have enough disk space in _/usr/share_, use following commands to have <span class="notranslate"> `cagefs-skeleton` </span> being placed in a different location:
<div class="notranslate">

```
$ mkdir /home/cagefs-skeleton
$ ln -s /home/cagefs-skeleton /usr/share/cagefs-skeleton
```
</div>

::: danger
If you are placing skeleton in <span class="notranslate"> _/home_ </span> directory on cPanel servers, you must configure the following option in cPanel WHM: <span class="notranslate"> **WHM -> Server Configuration -> Basic cPanel/WHM Setup -> Basic Config -> Additional home directories** </span>  
Change the value to blank (not default <span class="notranslate"> Home </span> ). Without changing this option, cPanel will create new accounts in incorrect places.
:::

CageFS will automatically detect and configure all necessary files for:
* cPanel
* Plesk
* DirectAdmin
* ISPmanager
* Interworx
* MySQL
* PostgreSQL
* LiteSpeed

Web interface to manage CageFS is available for cPanel, Plesk 10+, DirectAdmin, ISPmanager & Interworx. Command line tool would need to be used for other control panels.

Once you initialized the template you can start enabling users. By default CageFS is disabled for all users.

Starting from **cagefs-6.1-27** <span class="notranslate"> _fs.proc_can_see_other_uid_ </span> will be migrated (one time) from _/etc/sysctl.conf_ into _/etc/sysctl.d/90-cloudlinux.conf_ . If this variable is not set in either file, it will default to 0.

It is strongly advised against setting this variable in _90-cloudlinux.conf_. Define it in _/etc/sysctl.conf_ or in some other config file with an index number greater than _90-cloudlinux.conf_ , e.g. _/etc/sysctl.d/95-custom.conf_.

You can find more information on <span class="notranslate">_fs.proc_can_see_other_uid_</span> automatic migration in [Kernel Config Variables](/kernel_settings/#kernel-config-variables).

### Uninstalling

To uninstall CageFS, start by disabling and removing all directories:

<div class="notranslate">

```
$ /usr/sbin/cagefsctl --remove-all
```
</div>

That command will: disable CageFS for all customers, unmount CageFS for all users, removes <span class="notranslate"> _/usr/share/cagefs-skeleton_ & _/var/cagefs_ </span> directories. It will not remove _/etc/cagefs_ directory.

Remove CageFS RPM:

<div class="notranslate">

```
$ yum remove cagefs
```
</div>

### Managing Users


CageFS provides for two modes of operations:

1. Enabled for all, except those that are disabled.
2. Disabled for all, except those that are enabled.

Mode #1 is convenient for production operation, where you want all new users to automatically be added to CageFS.
Mode #2 is convenient while you test CageFS, as it allows you to enable it on one by one for your customers.

To start using CageFS you have to select one of the mode of operations:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --enable-all
```
</div>
or
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --disable-all
```
</div>
or
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --toggle-mode
```
</div>
That will switch the operation mode, preserving current disabled/enabled users.

To enable individual user do:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --enable [username]
```
</div>
To disable individual user:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --disable [username]
```
</div>
To  list all enabled users:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --list-enabled
```
</div>
To list all disabled users:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --list-disabled
```
</div>
To see current mode of operation:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --display-user-mode
```
</div>

### Configuration

* [File System Templates](/cagefs/#file-system-templates)

* [Excluding Files](/cagefs/#excluding-files)

* [Excluding Users](/cagefs/#excluding-users)

* [Mount Points](/cagefs/#mount-points)

  * [Per user virtual mount points](/cagefs/#per-user-virtual-mount-points)

  * [Split by Username](/cagefs/#split-by-username)
  
  * [Mounting user’s home directory inside CageFS](/cagefs/#mounting-users-home-directory-inside-cagefs)  

* [Base Home Directory](/cagefs/#base-home-directory)

* [PostgreSQL support](/cagefs/#postgresql-support)

* [PAM Configuration](/cagefs/#pam-configuration)

* [Executing By Proxy](/cagefs/#executing-by-proxy)

* [Custom /etc files per customer](/cagefs/#custom-etc-files-per-customer)

* [Moving <span class="notranslate"> cagefs-skeleton </span> directory](/cagefs/#moving-cagefs-skeleton-directory)

* [Moving /var/cagefs directory](/cagefs/#moving-var-cagefs-directory)

* [TMP directories](/cagefs/#tmp-directories)

* [Syslog](/cagefs/#syslog)

* [Excluding mount points](/cagefs/#excluding-mount-points)


#### File System Templates

CageFS creates a filesystem template in <span class="notranslate"> _/usr/share/cagefs-skeleton_ </span> directory. CageFS template will be mounted for each customer.  The template is created by running:
<div class="notranslate">

```
# /usr/sbin/cagefsctl --init
```
</div>

To update the template, you should run:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --update
```
</div>

The behavior of the commands (and the files copied into <span class="notranslate"> _/usr/share/cagefs-skeleton_ </span> directory) depends on the configuration files in _/etc/cagefs/conf.d_  
You can add additional files, users, groups and devices into CageFS template by adding .cfg file, and running:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --update
```
</div>

To delete files from CageFS template, remove corresponding .cfg file, and run:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --update
```
</div>

Here is an example <span class="notranslate"> _openssh-clients.cfg_ </span> file:
<div class="notranslate">

```
[openssh-clients]

comment=OpenSSH Clients

paths=/etc/ssh/ssh_config, /bin/hostname, /usr/bin/scp, /usr/bin/sftp, /usr/bin/slogin, /usr/bin/ssh, /usr/bin/ssh-add, /usr/bin/ssh-agent, /usr/bin/ssh-copy-id, /usr/bin/.ssh.hmac, /usr/bin/ssh-keyscan, /usr/libexec/openssh/sftp-server, /etc/environment, /etc/security/pam_env.conf

devices=/dev/ptmx
```
</div>

Example <span class="notranslate"> _mail.cfg_ </span> file:
<div class="notranslate">

```
[mail]

comment=Mail tools

paths=/bin/mail, /etc/aliases.db, /etc/mail, /etc/mailcap, /etc/mail.rc, /etc/mime.types, /etc/pam.d/smtp.sendmail, /etc/rc.d/init.d/sendmail, /etc/smrsh, /etc/sysconfig/sendmail, /usr/bin/hoststat, /usr/bin/Mail, /usr/bin/mailq.sendmail, /usr/bin/makemap, /usr/bin/newaliases.sendmail, /usr/bin/purgestat, /usr/bin/rmail.sendmail, /usr/lib64/sasl2/Sendmail.conf, /usr/lib/mail.help, /usr/lib/mail.tildehelp, /usr/lib/sendmail.sendmail, /usr/sbin/mailstats, /usr/sbin/makemap, /usr/sbin/praliases, /usr/sbin/sendmail.sendmail, /usr/sbin/smrsh, /var/log/mail, /var/spool/clientmqueue, /var/spool/mqueue

users=smmsp

groups=smmsp
```
</div>

There is an easy way to add/delete files from particular <span class="notranslate"> RPMs </span> into CageFS. That can be done by using <span class="notranslate"> `--addrpm` and `--delrpm` </span> options in <span class="notranslate"> `cagefsctl` </span> . Like:
<div class="notranslate">

```
$ cagefsctl --addrpm ffmpeg
$ cagefsctl --update
```
</div>

::: tip Note
ffmpeg RPM should be installed on the system already.
:::


#### Excluding Files


To exclude files and directories from CageFS, edit file:  
<span class="notranslate"> _/etc/cagefs/custom.black.list_ </span>  
And add files or directories in there, one per line.

Please do not edit <span class="notranslate"> _/etc/cagefs/black.list_ </span> file because it is replaced during the update of CageFS package.

#### Excluding Users


To exclude users from CageFS, create a file (any name would work) inside <span class="notranslate"> _/etc/cagefs/exclude_ </span> folder, and list users that you would like to exclude from CageFS in that file.


#### Mount Points


CageFS creates individual namespace for each user, making it impossible for users to see each other's files and creating high level of isolation. The way namespace is organized:

1. <span class="notranslate"> /usr/share/cagefs-skeleton </span> with safe files is created
2. Any directory from the server that needs to be shared across all users is mounted into <span class="notranslate"> /usr/share/cagefs-skeleton </span>
(a list of such directories is defined in /etc/cagefs/cagefs.mp)
3. <span class="notranslate"> /var/cagefs/[prefix]/username </span> directory for each user. Prefix is defined as last two digits of user id. User id is taken from <span class="notranslate"> /etc/passwd </span> file.
4. Separate /etc directory is created and populated for each user inside <span class="notranslate"> /var/cagefs/[prefix]/username </span>
5. /tmp directory is mounted for each user separately into <span class="notranslate"> ~username/.cagefs-tmp directory </span>
6. Additional custom directories can be mounted for each user by defining them in /etc/cagefs/cagefs.mp
7. You can define custom directories per user using [virt.mp](/cagefs/#per-user-virtual-mount-points) files _[CageFS 5.1 and higher]_

To define individual custom directories in /etc/cagefs/cagefs.mp following format is used:

<span class="notranslate"> `@/full/path/to/directory,permission notation` </span>


This is useful when you need to give each user its own copy of a particular system directory, like:

<span class="notranslate"> `@/var/run/screen,777` </span>


Such entry would create separate <span class="notranslate"> /var/run/screen </span> for each user, with permissions set to 777

To modify mount points, edit /etc/cagefs/cagefs.mp. Here is an example of cagefs.mp:
<div class="notranslate">

```
/var/lib/mysql
/var/lib/dav
/var/www/cgi-bin
/var/spool
/dev/pts
/usr/local/apache/domlogs
/proc
/opt
@/var/spool/cron,700
@/var/run/screen,777
```
</div>

If you want to change mount points, make sure you re-initialize mount points for all customers:
<div class="notranslate">

```
$ cagefsctl --remount-all
```
</div>
This command will kill all current processes and reset mount points.



#### **Per user virtual mount points**

_[CageFS 5.1 and higher]_

* _Please, see [Split by username](/cagefs/#split-by-username) feature, as it might be simpler to implement in some cases._ 

Starting with CageFS 5.1 you can specify additional directories to be mounted inside user's CageFS. This can be specified for each user.
To specify virtual mount points for a user, create a file:

<span class="notranslate"> `/var/cagefs/[prefix]/[user]/virt.mp` </span>


Inside that file, you can specify mount points in the following format:
<div class="notranslate">

```
virtdir1,mask
@subdir1,mask
@subdir2,mask
virdir2,mask
@subdir3,mask
@subdir4,mask
>virtdir3,mask
@subdir5,mask
@subdir6,mask
# comments
```
</div>

* <span class="notranslate"> _mask_ </span> is always optional, if missing 0755 is used
* Create virtual directory <span class="notranslate"> _subdir/virtdir_ </span> , mount it to:
  * <span class="notranslate"> skeleton _jaildir/virtdir_ </span>
  * inside virtual directory, create directories <span class="notranslate"> _subdir1, subdir2_ </span>
  * mount <span class="notranslate"> _virtdir1/subdir1_ </span> to <span class="notranslate"> _subdir/virtdir/subdir1_ </span>
  * if <span class="notranslate"> _virtdir_ </span> is started with >, create directory <span class="notranslate"> _subdir/virtdir_ </span> , but don't mount it into <span class="notranslate"> _jaildir_ </span> . This is needed for cases when <span class="notranslate"> _virtdir_ </span> is inside home base dir.
* if file _/var/cagefs/[prefix]/[user]/virt.mp_ is missing -- no virt directories are loaded for that user.

Note that CageFS will automatically create those files for Plesk 10 & higher.

For example if we have Plesk 11.5 with two users <span class="notranslate"> _cltest1_ </span> , and <span class="notranslate"> _cltest2_ </span> :
<div class="notranslate">

```
cltest1 uid 10000 has domains: cltest1.com, cltest1-addon.com and sub1.cltest1.com
cltest2 uid 10001 has domains: cltest2.com, cltest2-addon.com
```
</div>

In such case we would have file _/var/cagefs/00/cltest1/virt.mp_ :
<div class="notranslate">

```
>/var/www/vhosts/system,0755
@cltest1-addon.com,0755
@cltest1.com,0755
@sub1.cltest1.com,0755
```
</div>

and file: _/var/cagefs/01/cltest2/virt.mp:_
<div class="notranslate">

```
>/var/www/vhosts/system
@cltest2-addon.com
@cltest2.com
```
</div>


#### **Split by Username**

_[CageFS 5.3.1+]_

Sometimes you might need to make sure that directory containing all users would show up as containing just that user inside CageFS. For example, if you have directory structure like:
<div class="notranslate">

```
/home/httpd/fcgi-bin/user1
/home/httpd/fcgi-bin/user2
```
</div>

Then we can add the following line to /etc/cagefs/cagefs.mp file:
<div class="notranslate">

```
%/home/httpd/fcgi-bin
```
</div>

and execute:
<div class="notranslate">

```
cagefsctl --remount-all
```
</div>

After that each subdirectory of <span class="notranslate"> _/home/httpd/fcgi-bin_ </span> will be mounted for appropriate user in CageFS: <span class="notranslate"> _/home/httpd/fcgi-bin/user1_ </span> will be mounted for <span class="notranslate"> user1 </span> and <span class="notranslate"> _/home/httpd/fcgi-bin/user2_ </span> will be mounted for <span class="notranslate"> user2 </span> .

#### **Mounting user’s home directory inside CageFS**


CageFS 6.1-1 (and later) has improved mounting user’s home directory that is applied for users with home directories like <span class="notranslate"> _/home/user_ or _/homeN/user_ </span> (where <span class="notranslate"> N </span> = 0,1,..9).

In such case, earlier versions of CageFS always mount user’s home directory to <span class="notranslate"> _/home/user_ </span> and create symlink <span class="notranslate"> _/homeN -> /home_ </span> when needed, so user’s home directory can be accessed both via <span class="notranslate"> _/home/user_ </span> and <span class="notranslate"> _/homeN/user_ </span> . This quirk leads to some rare incompatibilities between CageFS and other software (for example OpenCart), because real path of user’s home directory in CageFS and in real file system can differ.

New CageFS mounts user’s home directory in a way that its real path in CageFS is always the same as in real file system. Additionally, CageFS searches for symlinks like
<span class="notranslate"> _/homeX -> /homeY_ </span> and <span class="notranslate"> _/homeX/user -> /homeY/user_ </span> in real system and creates such symlinks in user’s CageFS when found.

This new mounting mode is enabled by default. You can switch to old mounting mode by executing the following commands:
<div class="notranslate">

```
# touch /etc/cagefs/disable.home.dirs.search
# cagefsctl --force-update
# cagefsctl --remount-all
```
</div>

:::tip Note
New mounting mode will be disabled automatically when "mounting base home directory" mode is enabled <span class="notranslate"> (`mount_basedir=1` setting in _/etc/cagefs/cagefs.base.home.dirs_ </span> file).
:::

#### Base Home Directory


If you have a custom setup where home directories are in a special format, like: <span class="notranslate"> _/home/$USERNAME/data_ </span> , you can specify it using regular expressions. This is needed by CageFS to create safe home space for end user, where no other users are visible.

We will create empty: <span class="notranslate"> _/var/cagefs/[prefix]/$USERNAME/home_ </span> , and then mount <span class="notranslate"> _/home/$USERNAME_ </span> in that directory

To do that, create a file: <span class="notranslate"> _/etc/cagefs/cagefs.base.home.dirs_ </span>

With content like:
<div class="notranslate">

```
^/home/
^/var/www/users/
```
</div>

If there is no such file, the home directory without last component will be considered as a base dir, like with
<span class="notranslate"> _/home/$USERNAME_ </span> we would create <span class="notranslate"> _/var/cagefs/[prefix]/$USERNAME/home_ </span> , and then mount
<span class="notranslate"> _/home/$USERNAME_ </span> in there

With <span class="notranslate"> _/home/$USERNAME/data_ </span> as a home dir, we would assume that <span class="notranslate"> _/home/$USERNAME_ </span> is the base directory, and we would create <span class="notranslate"> _/var/cagefs/[prefix]/$USERNAME/home/$USERNAME/data_ </span> and then we would mount <span class="notranslate"> _/home/$USERNAME/data_ </span> -- which would cause each user to see empty base directories for other users, exposing user names.

**Sharing home directory structure among users**

When you want to share directory structure among multiple users, you can add following line at the top of the <span class="notranslate"> _/etc/cagefs/cagefs.base.home.dirs_ </span> file. This is useful on the systems that support sites with multiple users, with different home directories inside the main 'site' directory.
<div class="notranslate">

```
mount_basedir=1
```
</div>

For example:

<span class="notranslate"> user1 </span> has home directory <span class="notranslate"> _/var/www/vhosts/sitename.com/web_users/user1_ </span>
<span class="notranslate"> user2 </span> has home directory <span class="notranslate"> _/var/www/vhosts/sitename.com/web_users/user2_ </span>
site admin has home directory <span class="notranslate"> _/var/www/vhosts/sitename.com_ </span>

So, content of <span class="notranslate"> _/etc/cagefs/cagefs.base.home.dirs_ </span> should be the following:

<div class="notranslate">

```
mount_basedir=1
^/var/www/vhosts/[^/]+
```
</div>

Directory structure in <span class="notranslate"> _/var/www/vhosts/sitename.com_ </span> will be mounted in CageFS for appropriate users.  
Each user will have access to whole directory structure in <span class="notranslate"> _/var/www/vhosts/sitename.com_ </span> (according to their permissions).

::: tip Note
You should execute <span class="notranslate"> `cagefsctl --remount-all` </span> in order to apply changes to CageFS (i.e. remount home directories).
:::

#### PostgreSQL support


CloudLinux 7:

CageFS works with any PostgreSQL version installed from CloudLinux or CentOS repositories. PostgreSQL packages for CloudLinux 7 come from the upstream (CentOS) unmodified. PostgreSQL’s socket is located in <span class="notranslate"> _/var/run/postgresql_ </span> directory. This directory is mounted to CageFS by default (in cagefs-5.5-6.34 or later).

When PostgreSQL has been installed after CageFS install, please add line:
<div class="notranslate">

```
/var/run/postgresql
```
</div>

tо _/etc/cagefs/cagefs.mp_ file and then execute:
<div class="notranslate">

```
cagefsctl --remount-all 
```
</div>

The steps above are enough to configure CageFS to work with PostgreSQL.

CloudLinux 6:

CageFS provides separate _/tmp_ directory for each end user. Yet, PostgreSQL keeps its Unix domain socket inside server's main _/tmp_ directory. In addition to that, the location is hard coded inside PostgreSQL libraries.

To resolve the issue, CloudLinux provides a version of PostgreSQL with modified start up script that can store PostgreSQL's socket in <span class="notranslate"> _/var/run/postgres._ </span> The script automatically creates link from _/tmp_ to that socket to prevent PostgreSQL dependent applications from breaking.

In addition to that, CageFS knows how to correctly link this socket inside end user's _/tmp_ directory.

To enable PostgreSQL support in CageFS:

1. Make sure you have updated to latest version of PostgreSQL.

2. Edit file _/etc/sysconfig/postgres_, and uncomment <span class="notranslate"> _SOCK_DIR_ </span> line.

3. Update CageFS configuration by running:

<div class="notranslate">

```
cagefsctl  --reconfigure-cagefs
```
</div>

4. Restart PostgreSQL by running:

<div class="notranslate">

```
$ service postgresql restart 
```
</div>

If you are using cPanel, you would also need to modify file: <span class="notranslate"> _/etc/cron.daily/tmpwatch_ </span>

And update line:
<div class="notranslate">

```
flags=-umc 
```
</div>

to:
<div class="notranslate">

```
flags=-umcl
```
</div>

to prevent symlink from being removed.


#### PAM Configuration


CageFS depends on <span class="notranslate"> **pam_lve** </span> module tor PAM enabled services. When installed, the module is automatically installed for following services:

* sshd
* crond
* su

The following line is added to corresponding file in _/etc/pam.d/_:
<div class="notranslate">
```
session    required     pam_lve.so      100     1
```
</div>

Where 100 stands for minimum <span class="notranslate"> UID </span> to put into <span class="notranslate"> CageFS & LVE </span> , and 1 stands for CageFS enabled.


#### Executing By Proxy


Some software has to run outside CageFS to be able to complete its job. This includes such programs as <span class="notranslate"> **passwd, sendmail** ,  </span> etc.

CloudLinux uses <span class="notranslate"> proxyexec </span> technology to accomplish this goal. You can define any program to run outside CageFS, by specifying it in <span class="notranslate"> _/etc/cagefs/custom.proxy.commands_ </span> file. Do not edit existing <span class="notranslate"> _/etc/cagefs/proxy.commands_ </span> as it will be overwritten with next CageFS update.

Once program is defined, run this command to populate the skeleton:
<div class="notranslate">

```
$ cagefsctl --update
```
</div>

All the cPanel scripts located in <span class="notranslate"> _/usr/local/cpanel/cgi-sys/_ </span> that user might need to execute should be added to <span class="notranslate"> _proxy.commands_ </span> .

**Users with duplicate UIDs**

The syntax of <span class="notranslate"> _/etc/cagefs/*.proxy.commands_ </span> files is as follows:  
<span class="notranslate"> _ALIAS:wrapper_name=username:path_to_executable_ </span>


Mandatory parameters are <span class="notranslate"> _ALIAS_ </span> and <span class="notranslate"> _path_to_executable_ </span> .

* <span class="notranslate"> ALIAS </span> - any name which is unique within all <span class="notranslate"> _/etc/cagefs/*.proxy.commands_ </span> files;

* <span class="notranslate"> wrapper_name </span> - the name of wrapper file, which is used as a replacement for executable file <span class="notranslate"> _path_to_executable_ inside CageFS </span> . Wrapper files are located in <span class="notranslate"> _/usr/share/cagefs/safeprograms_ </span> . If wrapper name is not specified, then default wrapper <span class="notranslate"> _/usr/share/cagefs/safeprograms/cagefs.proxy.program_ </span> is used. Also, a reserved word <span class="notranslate"> `noproceed` </span> can be used, it will intend that wrapper is not in use (installed before) - applied for the commands with several <span class="notranslate"> ALIAS </span> , as in the example below.

* <span class="notranslate"> username </span> - the name of a user on whose behalf <span class="notranslate"> _path_to_executable_ </span> will run in the real system. If <span class="notranslate"> username </span> is not specified, then <span class="notranslate"> _path_to_executable_ </span> will run on behalf the same user that is inside CageFS.

* <span class="notranslate"> path_to_executable </span> - the path to executable file which will run via <span class="notranslate"> `proxyexec` </span> .

Example of a simple command executed via <span class="notranslate"> proxyexec </span> :
<div class="notranslate">

```
SENDMAIL=/usr/sbin/sendmail
```
</div>

Example of <span class="notranslate"> crontab </span> command execution with custom wrapper under <span class="notranslate"> root </span> (privilege escalation). The command uses two <span class="notranslate"> ALIAS </span> , that is why in the second line <span class="notranslate"> `noproceed` </span> is specified instead of wrapper name.
<div class="notranslate">

```
CRONTAB_LIST:cagefs.proxy.crontab=root:/usr/bin/crontab
CRONTAB_SAVE:noproceed=root:/usr/bin/crontab
```
</div>

Sometimes hosters may have users with non unique <span class="notranslate"> UIDs </span> . Thus, <span class="notranslate"> `proxyexec` </span> may traverse users directory to find a specific one. That behavior turns into inappropriate if users directory is not cached locally (for example LDAP is in use).

To turn this feature off:
<div class="notranslate">

```
touch /etc/cagefs/proxy.disable.duid
```
</div>

Or to activate it back:
<div class="notranslate">

```
rm /etc/cagefs/proxy.disable.duid
```
</div>


#### Custom /etc files per customer

:::tip Note
4.0-5 and later
:::

To create a custom file in /etc directory for end user, create a directory:  
<span class="notranslate"> _/etc/cagefs/custom.etc/[username]_</span>

Put all custom files, and sub-directories into that direcotry.

For example, if you want to create custom <span class="notranslate">_/etc/hosts_</span> file for <span class="notranslate">USER1</span>, create a directory:  
<span class="notranslate">_/etc/cagefs/custom.etc/USER1_</span>

Inside that directory, create a <span class="notranslate"> _hosts_ </span> file, with the content for that user.

After that execute:
<div class="notranslate">

```
$ cagefsctl --update-etc USER1
```
</div>

If you are making changes for multiple users, you can run:

<div class="notranslate">

```
$ cagefsctl --update-etc
```
</div>

To remove a custom file, remove it from <span class="notranslate"> _/etc/cagefs/custom.etc/[USER]_ </span> directory, and re-run:
<div class="notranslate">

```
$ cagefsctl --update-etc
```
</div>


#### Moving cagefs-skeleton directory


Sometimes you might need to move <span class="notranslate"> cagefs-skeleton </span> from <span class="notranslate"> _/usr/share_ </span> to another partition.

There are two ways:

1. If <span class="notranslate"> _/usr/share/cagefs-skeleton_ </span> is not created yet ( <span class="notranslate"> cagefsctl --init </span> wasn't executed), then execute:

<div class="notranslate">

```
$ mkdir /home/cagefs-skeleton 
$ ln -s /home/cagefs-skeleton /usr/share/cagefs-skeleton 
$ cagefsctl --init
```
</div>

2. If <span class="notranslate"> _/usr/share/cagefs-skeleton_ </span> already exists:

<div class="notranslate">

```
$ cagefsctl --disable-cagefs 
$ cagefsctl --unmount-all
# To ensure that the following command prints empty output: 
$ cat /proc/mounts | grep cagefs 
# if you see any cagefs entries, execute "cagefsctl --unmount-all" again.
$ mv /usr/share/cagefs-skeleton /home/cagefs-skeleton 
$ ln -s /home/cagefs-skeleton /usr/share/cagefs-skeletoncagefsctl --enable-cagefs
```
</div>

On cPanel servers, if you place skeleton into <span class="notranslate"> _/home_   </span> directory, then you should configure the following option:

In _cPanel WHM_ choose <span class="notranslate"> _Server Configuration_ </span> and go to <span class="notranslate"> _Basic cPanel/WHM Setup_ </span> , then in <span class="notranslate"> _Basic Config_ </span> change <span class="notranslate"> _Additional home directories_   </span> default value to blank (not <span class="notranslate"> "home" </span> ).

::: tip Note
If this option is not set, then cPanel will create new accounts in incorrect places.
:::

#### Moving /var/cagefs directory


To move <span class="notranslate"> _/var/cagefs_ </span> to another location:

<div class="notranslate">
 
```
$ cagefsctl --disable-cagefs
$ cagefsctl --unmount-all
```
</div>

Verify that <span class="notranslate"> _/var/cagefs.bak_ </span> directory does not exist (if it exists - change name "cagefs.bak" to something else)

<div class="notranslate">

```
$ cp -rp /var/cagefs /new/path/cagefs
$ mv /var/cagefs /var/cagefs.bak
$ ln -s /new/path/cagefs /var/cagefs
$ cagefsctl --enable-cagefs
$ cagefsctl --remount-all
```
</div>

Verify that the following command gives empty output:
<div class="notranslate">

```
$ cat /proc/mounts | grep cagefs.bak
```
</div>

Then you can safely remove /var/cagefs.bak:
<div class="notranslate">

```
$ rm -rf /var/cagefs.bak
```
</div>

#### TMP Directories


CageFS makes sure that each user has his own <span class="notranslate"> _/tmp_ </span> directory, and that directory is the part of end-user's quota.

The actual location of the directory is <span class="notranslate"> _$USER_HOME/.cagefs/tmp_ </span>

Once a day, using cron job, <span class="notranslate"> CageFS </span> will clean up user's <span class="notranslate"> _/tmp_ </span> directory from all the files that haven't been accessed during 30 days.

This can be changed by running:
<div class="notranslate">

```
$ cagefsctl --set-tmpwatch='/usr/sbin/tmpwatch -umclq 720'
```
</div>

Where 720 is the number of hours that the file had to be inaccessible to be removed.

By default this is done at 03:37 AM, but you can also force the clean up outdated files that match 'chosen period' of all user's <span class="notranslate"> _/tmp_ </span> directories without waiting for a job to be launched by <span class="notranslate"> cronjob </span> . Just run:

<div class="notranslate">

```
$ cagefsctl --tmpwatch
```
</div>

The following path will be cleaned as well:

<span class="notranslate"> _/var/cache/php-eaccelerator_   </span> (actual location <span class="notranslate"> _$USER_HOME/.cagefs/var/cache/php-eaccelerator_ </span> )

You can configure <span class="notranslate"> tmpwatch </span> to clean custom directories inside <span class="notranslate"> CageFS </span> .

Create <span class="notranslate"> _/etc/cagefs/cagefs.ini_ </span> configuration file and specify <span class="notranslate"> _tmpwatch_dirs_ </span> directive as follows:

<span class="notranslate"> _tmpwatch_dirs=/dir1,/dir2_ </span>

After that directories <span class="notranslate"> _/dir1_ </span> and <span class="notranslate"> _/dir2_ </span> inside CageFS  will be cleaned automatically.

Note that actual location of those directories in real file system is <span class="notranslate"> _$USER_HOME/.cagefs/dir1_ </span> and <span class="notranslate"> _$USER_HOME/.cagefs/dir2_ </span> .

**Cleanup PHP sessions**

For cPanel servers, CageFS version 6.0-42 or higher performs cleaning of PHP sessions based on <span class="notranslate"> _session.gc_maxlifetime_ </span> and <span class="notranslate"> _session.save_path_ </span> directives specified in proper <span class="notranslate"> _php.ini_ </span> files.

<span class="notranslate"> _session.gc_maxlifetime_ </span> directive default value is 1440 seconds. Those session files will be deleted, that were created or had metadata (ctime) changes more time ago than it is specified in <span class="notranslate"> _session.gc_maxlifetime_ .  </span>

For <span class="notranslate"> Alt-PHP </span> versions <span class="notranslate"> _session.save_path_ </span> value is normally <span class="notranslate"> _/tmp_ </span> .

::: tip Note
For new installations of Alt-PHP packages, <span class="notranslate"> session.save_path will be changed from /tmp to /opt/alt/phpNN/var/lib/php/session, </span> where NN corresponds to Alt-PHP version.
:::

This applies to the following <span class="notranslate"> Alt-PHP </span> versions (or later):
* alt-php44-4.4.9-71;
* alt-php51-5.1.6-81;
* alt-php52-5.2.17-107;
* alt-php53-5.3.29-59;
* alt-php54-5.4.45-42;
* alt-php55-5.5.38-24;
* alt-php56-5.6.31-7;
* alt-php70-7.0.23-5;
* alt-php71-7.1.9-5;
* alt-php72-7.2.0-0.rc.2.2.

When using EasyApache 3, <span class="notranslate"> _session.save_path_ </span> value is normally <span class="notranslate"> _/var/cpanel/php/sessions/ea3_ </span> or <span class="notranslate"> _/tmp_ </span> . Seettings for EasyApache 3 are usualy taken from the file <span class="notranslate"> _/usr/local/lib/php.ini_ . </span>

When using EasyApache 4, <span class="notranslate"> _session.save_path_ </span> value is normally <span class="notranslate"> _/var/cpanel/php/sessions/ea-phpXX_ ,  </span> where <span class="notranslate"> _XX_ </span> corresponds to PHP version.

Cleaning is started by cron <span class="notranslate"> _/etc/cron.d/cpanel_php_sessions_cron_ </span> , which starts the script <span class="notranslate"> _/usr/share/cagefs/clean_user_php_sessions_ </span> twice within one hour.

The settings for ea-php are located in <span class="notranslate"> _/opt/cpanel/ea-phpXX/root/etc/php.d/local.ini_ </span> or in <span class="notranslate"> _/opt/cpanel/ea-phpXX/root/etc/php.ini_ </span> , where <span class="notranslate"> _XX_ </span> corresponds to the PHP version.

The settings for alt-php are located in <span class="notranslate"> _/opt/alt/phpXX/etc/php.ini_ </span> files, where <span class="notranslate"> _XX_ </span> corresponds to PHP version.

The cleaning script cleans php sessions for all PHP versions ( <span class="notranslate"> _ea-php_ </span> and <span class="notranslate"> _alt-php_ </span> ) regardless of whether a version is used or selected via <span class="notranslate"> MultiPHP Manager </span> or <span class="notranslate"> PHP Selector </span> . When different <span class="notranslate"> _session.gc_maxlifetime_ </span> values are specified for the same <span class="notranslate"> _session.save_path_ </span> (for different php versions), the cleaning script will use the least value for cleaning <span class="notranslate"> _session.save_path_ </span> . So, it is recommended to specify different <span class="notranslate"> _session.save_path_ </span> for each PHP version.

Users can define custom value of <span class="notranslate"> _session.gc_maxlifetime_ via PHP Selector </span> in order to configure PHP's garbage collector, but that will not affect the script for cleaning PHP sessions. The script cleans PHP sessions based on global values of <span class="notranslate"> _session.gc_maxlifetime_ </span> and <span class="notranslate"> _session.save_path_ </span> directives taken from files mentioned above. Settings in custom users’ <span class="notranslate"> php.ini </span> files are ignored.

**Cleanup PHP session files in Plesk**

For Plesk servers, <span class="notranslate"> CageFS </span> version 6.0-52 or higher is provided with a special cron job for removing obsolete PHP session files. Cleanup script runs once an hour (similar to how it is done in Plesk).

Each time the script runs, it performs the cleanup of the paths:

1. set by <span class="notranslate"> `session.save_path` </span> directive in <span class="notranslate"> _/opt/alt/phpXX/etc/php.ini_ </span> files. If <span class="notranslate"> session.save_path </span> is missing, then <span class="notranslate"> /tmp </span> is used. Session files lifetime is set by <span class="notranslate"> session.gc_maxlifetime </span> directive. If it is not found, then 1440 seconds value is used (24 minutes, as in Plesk). Lifetime set in the file is only taken into consideration if it is longer than 1440 seconds, otherwise 1440 seconds is used. All the installed <span class="notranslate"> Alt-PHP </span> versions are processed.

2. <span class="notranslate"> _/var/lib/php/session_ </span> . Files lifetime is only defined by Plesk script <span class="notranslate"> _/usr/lib64/plesk-9.0/maxlifetime_ </span> . If the script is missing or returns errors, then this directory is not processed.

The following features are applied during the cleanup:

* all the users with <span class="notranslate"> UID </span> higher than specified in <span class="notranslate"> _/etc/login.defs_ </span> are processed. Each user is processed independently from one another.
* only directories inside <span class="notranslate"> CageFS </span> are being cleaned. The paths of the same name in the physical  file system are not processed.
* in all the detected directories, all the files with the names that correspond to <span class="notranslate"> `sess_ ` search </span> mask are removed, the rest of the files are ignored.
* the files older than specified lifetime are removed.
* all non-fatal errors (lack of rights, missing directory) are ignored and do not affect the further work of the script.

**Disable PHP sessions cleanup on cPanel and Plesk**

Here is a possible workaround for PHP session expiration problem (session lives longer than it is possible in a control panel). To use your own custom PHP sessions cleanup scripts - you can turn off built-in sessions cleanup implementation in the following way: 
add <span class="notranslate">`clean_user_php_sessions=false`</span> line to <span class="notranslate">_/etc/sysconfig/cloudlinux_</span>.

#### Syslog

By default, <span class="notranslate"> _/dev/log_ </span> should be available inside end user's <span class="notranslate"> CageFS </span> . This is needed so that user's cronjobs and other things that user <span class="notranslate"> _dev/log_ </span> would get recorded in the system log files.

This is controlled using file <span class="notranslate"> _/etc/rsyslog.d/schroot.conf_ </span> with the following content:
<div class="notranslate">

```
$AddUnixListenSocket /usr/share/cagefs-skeleton/dev/log
```
</div>

To remove presence of <span class="notranslate"> _dev/log_ </span> inside CageFS, remove that file, and restart rsyslog service.


#### Excluding mount points

**How to exclude mounts from namespaces for all LVEs**


By default, all mounts from the real file system is inherited by namespaces of all <span class="notranslate"> LVEs </span> . So, destroying all <span class="notranslate"> LVEs </span> may be required in order to unmount some mount in real file system completely. Otherwise, mount point remains busy after unmounting it in the real file system because this mount exists in namespaces of <span class="notranslate"> LVEs </span> .

<span class="notranslate"> `lvectl start` </span> command saves all mounts from real file system as “default namespace” for later use in all <span class="notranslate"> LVEs </span> . <span class="notranslate"> **lve_namespaces** </span> service executes <span class="notranslate"> `lvectl start` </span> command during startup.

In <span class="notranslate"> **lve-utils-2.0-26** </span> (and later) there is an ability to exclude specific mounts from namespaces for all <span class="notranslate"> LVEs </span> .
In order to do so, please create a file <span class="notranslate"> _/etc/container/exclude_mounts.conf_ </span> with list of mounts to exclude (one mount per line) as regular expressions, and then execute <span class="notranslate"> `lvectl start` </span> :
<div class="notranslate">

```
# cat /etc/container/exclude_mounts.conf    
^/dir1/
^/dir2$
# lvectl start
```
</div>

After that, all new created <span class="notranslate"> LVEs </span> will be without <span class="notranslate"> _/dir2_ </span> mount and without mounts that start with <span class="notranslate"> _/dir1/_ </span> (like <span class="notranslate"> _/dir1/x_ ,  _/dir1/x/y_ </span> , etc). To apply changes to existing <span class="notranslate"> LVEs </span> you should recreate <span class="notranslate"> LVEs </span> :
<div class="notranslate">

```
# lvectl destroy all   
# lvectl apply all
```
</div>

::: tip Note
You should recreate all LVEs only once after creating <span class="notranslate"> _/etc/container/exclude_mounts.conf_ </span> file. After that the configuration changes will be applied to all new LVEs automatically.
:::

### Integration with control panels

CageFS comes with a plugin for various control panels.

The plugin allows to:

* Initialize CageFS;

* Select [mode of operation](/cagefs/#managing-users) ;

* See and modify the list of enabled/disabled users;

* Update CageFS skeleton.


#### cPanel


CageFS plugin for cPanel is located in <span class="notranslate"> Plugins </span> section of WHM.

It allows to initialize CageFS, select users CageFS will be enabled for, as well as update CageFS skeleton.

![](/images/_img1_zoom73.png)

To enable CageFS for a proper user (users), in <span class="notranslate"> CageFS User Manager </span> choose a user from the list on the right ( <span class="notranslate"> Disabled </span> users) and click <span class="notranslate">Toggle</span>. The user will move to the list on the left ( <span class="notranslate"> Enabled </span> users).

To disable a user (users), choose a user from the list on the left ( <span class="notranslate"> Enabled </span> users) and click <span class="notranslate">Disable CageFS</span>. The user will move to the list on the right (<span class="notranslate">Disabled</span> users).

To update CageFS skeleton, click <span class="notranslate"> Update CageFS Skeleton </span> .

![](/images/_img2_zoom71.png)


#### Plesk


CageFS comes with a plugin for Plesk 10.x. It allows initializing and updating CageFS template, as well as managing users and mode of operation for CageFS.

In modules section choose CageFS:

![](/images/plesk_cagefs_icon.png)

To enable CageFS for a proper user (users), in <span class="notranslate"> CageFS User Manager </span> choose a user from the list on the right ( <span class="notranslate"> Disabled </span> users) and click <span class="notranslate"> Toggle </span> . The user will move to the list on the left ( <span class="notranslate"> Enabled </span> users).

To disable a user (users), choose a user from the list on the left ( <span class="notranslate"> Enabled </span> users) and click <span class="notranslate"> Disable CageFS </span> . The user will move to the list on the right ( <span class="notranslate"> Disabled </span> users).

To update CageFS skeleton, click <span class="notranslate"> Update CageFS Skeleton </span> .

![](/images/plesk_cagefs_manager_disable_all.png)

#### ISPManager

CageFS comes with plugin for <span class="notranslate"> ISP Manager </span> to enable/disable CageFS on per user base. In edit user section chose <span class="notranslate"> Permission </span> tab. Mark <span class="notranslate"> CageFS User Mode </span> checkbox and click <span class="notranslate"> OK </span> to apply.

![](/images/ispmanager_cagefs_user_zoom98.png)

Or you can manage global CageFS settings via CageFS menu
![](/images/_img3.jpg)

### Command-line tools

`cagefsctl` is used to manage CageFS. It allows initializing and updating CageFS, as well as enabling/disabling CageFS for individual users.

Use the following syntax to manage CageFS:
<span class="notranslate"> `/usr/sbin/cagefsctl [OPTIONS]` </span>


Options:

| | | |
|-|-|-|
|-i | <span class="notranslate"> --init </span> |initialize CageFS (create CageFS if it does not exist)|
|-r | <span class="notranslate"> --reinit </span> |reinitialize CageFS (make backup and recreate CageFS)|
|-u | <span class="notranslate"> --update </span> |update files in CageFS (add new and modified files to CageFS, remove unneeded files)|
|-f | <span class="notranslate"> --force </span> |recreate CageFS (do not make backup, overwrite existing files)|
|-d | <span class="notranslate"> --dont-clean </span> |do not delete any files from skeleton (use with <span class="notranslate"> --update </span> option)|
|-k | <span class="notranslate"> --hardlink </span> |use hardlinks if possible|
| | <span class="notranslate"> --create-mp </span> |Creates _/etc/cagefs/cagefs.mp_ file|
| | <span class="notranslate"> --mount-skel </span> |mount CageFS skeleton directory|
| | <span class="notranslate"> --unmount-skel </span> |unmount CageFS skeleton directory|
| | <span class="notranslate"> --remove-all </span> |disable CageFS, remove templates and _/var/cagefs_ directory|
| | <span class="notranslate"> --sanity-check </span> |perform basic self-diagnistics of common cagefs-related issues (mostly useful for support)|
| | <span class="notranslate"> --addrpm </span> |add rpm-packages in CageFS (run <span class="notranslate"> `cagefsctl --update` </span> in order to apply changes)|
| | <span class="notranslate"> --delrpm </span> |remove rpm-packages from CageFS (run <span class="notranslate"> `cagefsctl --update` </span> in order to apply changes)|
| | <span class="notranslate"> --list-rpm </span> |list rpm-packages that are installed in CageFS|
|-e | <span class="notranslate"> --enter </span> |enter into user's CageFS as root|
| | <span class="notranslate"> --update-list </span> |update specified files only (paths are read from stdin)|
| | <span class="notranslate"> --update-etc </span> |update _/etc_ directory of all or specified users|
| | <span class="notranslate"> --set-update-period </span> |set min period of update of CageFS in days (default = 1 day)|
| | <span class="notranslate"> --force-update </span> |force update of CageFS (ignore period of update)|
| | <span class="notranslate"> --force-update-etc </span> |force update of _/etc_ directories for users in CageFS|
| | <span class="notranslate"> --reconfigure-cagefs </span> |configure CageFS integration with other software (control panels, database servers, etc)|

Use the following syntax to manage users:    
<span class="notranslate"> `/usr/sbin/cagefsctl [OPTIONS] username [more usernames]` </span>

Options:

| | | |
|-|-|-|
|-m | <span class="notranslate"> --remount </span> |remount specified user(s)|
|-M | <span class="notranslate"> --remount-all </span> |remount CageFS skeleton directory and all users (use this each time you have changed _cagefs.mp_ file|
|-w | <span class="notranslate"> --unmount </span> |unmount specified user(s)|
|____ | <span class="notranslate"> --unmount-dir </span> |unmount specified dir for all users|
|-W | <span class="notranslate"> --unmount-all </span> |unmount CageFS skeleton directory and all users|
|-l | <span class="notranslate"> --list </span> |list users that entered in CageFS|
| | <span class="notranslate"> --list-logged-in </span> |list users that entered in CageFS via SSH|
| | <span class="notranslate"> --enable </span> |enable CageFS for the user|
| | <span class="notranslate"> --disable </span> |disable CageFS for the user|
| | <span class="notranslate"> --enable-all </span> |enable all users, except specified in _/etc/cagefs/users.disabled_|
| | <span class="notranslate"> --disable-all </span> |disable all users, except specified in _/etc/cagefs/users.enabled_|
| | <span class="notranslate"> --display-user-mode </span> |display the current mode ( <span class="notranslate"> "Enable All" </span> or <span class="notranslate"> "Disable All" </span> )|
| | <span class="notranslate"> --toggle-mode </span> |toggle mode saving current lists of users (lists of enabled and disabled users remain unchanged)|
| | <span class="notranslate"> --list-enabled </span> |list enabled users|
| | <span class="notranslate"> --list-disabled </span> |list disabled users|
| | <span class="notranslate"> --user-status </span> |print status of specified user (enabled or disabled)|
| | <span class="notranslate"> --getprefix </span> |display prefix for user|

<span class="notranslate"> PHP Selector </span> related options:
 
| | |
|-|-|
| <span class="notranslate"> --setup-cl-selector </span> | setup <span class="notranslate"> PHP Selector </span> or register new alt-php versions|
| <span class="notranslate"> --remove-cls-selector </span> |unregister alt-php versions, switch users to default php version when needed|
| <span class="notranslate"> --rebuild-alt-php-ini </span> |rebuild _alt_php.ini_ file for specified users (or all users if none specified)|
| <span class="notranslate"> --validate-alt-php-ini </span> |same as <span class="notranslate"> `--rebuild-alt-php-ini` </span> but also validates _alt_php.ini_ options|
| <span class="notranslate"> --cl-selector-reset-versions </span> |reset php version for specifed users to default (or all users if none specified)|
| <span class="notranslate"> --cl-selector-reset-modules </span> |reset php modules (extensions) for specific users to defaults (or all users if none specified)|
| <span class="notranslate"> --create-virt-mp </span> |create virtual mount points for the user|
| <span class="notranslate"> --create-virt-mp-all </span> |create virtual mount points for all users|
| <span class="notranslate"> --remount-virtmp </span> |create virtual mount points and remount user|
| <span class="notranslate"> --apply-global-php-ini </span> |use with 0, 1 or 2 arguments from the list: <span class="notranslate"> `error_log`, `date.timezone` </span> without arguments applies all global php options including the two above|

Common options:

| | | |
|-|-|-|
|___ | <span class="notranslate"> --disable-cagefs </span> |disable CageFS|
| | <span class="notranslate"> --cagefs-status </span> |print CageFS status: ( <span class="notranslate"> enabled </span> or <span class="notranslate"> disabled </span> )|
| | <span class="notranslate"> --set-min-uid </span> |Set min <span class="notranslate"> UID </span> |
| | <span class="notranslate"> --get-min-uid </span> |Display current MIN_UID setting|
| | <span class="notranslate"> --print-suids </span> |Print list of <span class="notranslate"> SUID </span> and SGID programs in skeleton|
| | <span class="notranslate"> --do-not-ask </span> |assume <span class="notranslate"> "yes" </span> in all queries (should be the first option in command)|
| | <span class="notranslate"> --clean-var-cagefs </span> |clean _/var/cagefs_ directory (remove data of non-existent users)|
| | <span class="notranslate"> --set-tmpwatch </span> |set `tmpwatch` command and parameters (save to _/etc/cagefs/cagefs.ini_ file)|
| | <span class="notranslate"> --tmpwatch </span> |execute tmpwatch (remove outdated files in tmp directories in CageFS for all users)|
| | <span class="notranslate"> --toggle-plugin </span> |disable/enable CageFS plugin|
|-v | <span class="notranslate"> --verbose </span> |verbose output|
| | <span class="notranslate"> --wait-lock </span> |wait for end of execution of other `cagefsctl` processes (when needed) before execution of the command|
|-h | <span class="notranslate"> --help </span> |this message|



#### Running Command Inside CageFS


<span class="notranslate"> _[lve-wrappers 0.6-1+]_ </span>

Sometimes you will need to execute a command as user inside CageFS.

If a user has shell enabled - you can simply use:
<div class="notranslate">

```
$ /bin/su - $USERNAME  -c "_command_"
```
</div>
Yet, if a user have they shell disabled, it wouldn't work. To solve this issue, we have added command:
<div class="notranslate">

```
$ /sbin/cagefs_enter_user $USERNAME "_command_"
```
</div>

If you disable CageFS for a user, then <span class="notranslate"> `cagefs_enter` </span> will be executed without <span class="notranslate"> `proxyexec` </span> .

You can forcibly disable <span class="notranslate"> `cagefs_enter` </span> start via <span class="notranslate"> `proxyexec` </span> for all users (regardless if CageFS is enabled or disabled) by specifying the parameter <span class="notranslate"> _cagefs_enter_proxied=0_ in _/etc/sysconfig/cloudlinux_ </span> .

<span class="notranslate"> _/bin/cagefs_enter.proxied_ </span> can be executed instead of <span class="notranslate"> _/bin/cagefs_enter_ </span> to enter CageFS without <span class="notranslate"> `proxyexec` </span> . Note that starting <span class="notranslate"> `cagefs_enter` </span> via <span class="notranslate"> `proxyexec` </span> is necessary to enable sending local notification messages to users with enabled CageFS. <span class="notranslate"> `cagefs_enter` </span> is executed via <span class="notranslate"> `proxyexec` </span> by default.


#### Sanity Check


<span class="notranslate"> _[ CageFS 6.0-34+]_ </span>

CageFS <span class="notranslate"> `--sanity-check` </span> utility allows to check CageFS configuration consistency, so that an administrator can save the time investigating issues with CageFS and ensure that custom configuration is correct.

To start, run the command:
<div class="notranslate">

```
cagefsctl --sanity-check
```
</div>
At the moment 7 types of check are implemented:

1. _Check cagefs mount points exists_ - reads _cagefs.mp_ file and verifies if the directories specified in it really exist on the disk. To learn more, visit [Mount points](/cagefs/#mount-points) and [Split by username](/cagefs/#split-by-username)

2. _Check cagefs <span class="notranslate"> `users.enabled` </span> is a directory_ - ensures that if  <span class="notranslate"> _/etc/cagefs/users.enabled_ </span> exists, then it is a directory, not a file (if it is recognized as a file, then it would cause a breakdown).

3. _Check cagefs <span class="notranslate"> `users.disabled` </span> is a directory_ - ensures that if  <span class="notranslate"> _/etc/cagefs/users.disabled_ </span> exists, then it is a directory, not a file (if it is recognized as a file, then it would cause a breakdown).

4. _Check cagefs <span class="notranslate"> `disable.etcfs` </span> exists_ - checks if <span class="notranslate"> _/etc/cagefs/etc.safe/disable.etcfs_ </span> exists.

5. _Check cagefs users can enter cagefs_ - chooses two users in the system with enabled CageFS (the first and the second ones in the unsorted list) and tries to log in to CageFS under their credentials and see what happens. It runs <span class="notranslate"> `su -l "$USER" -s /bin/bash -c "whoami"` </span> and compares the output with the <span class="notranslate"> $USER </span> and <span class="notranslate"> su </span> command retcode estimation.

::: tip Note
If a login fails, it can be due to various reasons, that can only be determined in manual mode. The checker only gives the output of the command.
:::

6. _Check cagefs proxy commands configs are parsable_ - tries to load <span class="notranslate"> _/etc/cagefs/*.proxy.commands_ </span> files and parse them to check the syntax. In case of any parsing error the test will fail. To learn more, visit [Executing by proxy](/cagefs/#executing-by-proxy) .

7. _Check cagefs virt.mp files syntax_ - reads all _/var/cagefs///virt.mp_ files (if any) and checks their syntax validity. At the moment there are only two checks of the syntax: the file is not empty if it exists, and the file is not starting with the sub directory definitions (with @). To learn more, visit [Per-user virtual mount points](/cagefs/#per-user-virtual-mount-points)

8. _Check MultiPHP system default PHP version_ – checks that MultiPHP system default PHP version is **NOT** Alt-PHP. That means <span class="notranslate"> PHP Selector </span> should work properly. If MultiPHP system default PHP version is Alt-PHP, <span class="notranslate"> PHP Selector </span> does not work and should be disabled. To learn more on how to disable <span class="notranslate"> PHP Selector, </span> visit [cPanel LVE Manager](/lve_manager/#cpanel-lve-manager) 

Possible results of the checks:

* <span class="notranslate"> OK </span> - the check succeeded.

* <span class="notranslate"> FAILED </span> - the check revealed a problem.

* <span class="notranslate"> SKIPPED </span> - the check was skipped as it made no sense in such environment (e.g. wrong control panel) or can not be performed for some reason (e.g no users with enabled CageFS found). The actual result does not mean that a problem exists and can be considered as positive.

* <span class="notranslate"> INTERNAL_TEST_ERROR </span> - the check failed because of a problem inside the checker itself. Must be reported to the developers.

In case if at least one of the checks resulted neither <span class="notranslate"> OK </span> nor <span class="notranslate"> SKIPPED </span> then the checker will end with ret code >0.


#### CageFS Quirks

Due to the nature of CageFS, some options will not work as before or will require some changes:

* lastlog will not work ( <span class="notranslate"> _/var/log/lastlog_ </span> ).
* PHP will load php.ini from <span class="notranslate"> _/usr/selector/php.ini._ </span> That file is actually a link to the real _php.ini_ file from your system. So the same _php.ini_ will be loaded in the end.
* You have to run <span class="notranslate"> `cagefsctl --update` </span> any time you have modified _php.ini_, or you want to get new/updated software inside CageFS.
* CageFS installation changes <span class="notranslate"> `jailshell` </span> to regular bash on cPanel - [read why](http://kb.cloudlinux.com/2015/11/why-cagefs-installation-change-jailshell-to-regular-bash-on-cpanel/).

## MySQL Governor
### General information and requirements

:::tip Note
<span class="notranslate">MySQL Governor</span> 0.8-32+
:::

<span class="notranslate"> MySQL Governor</span> is software to monitor and restrict MySQL usage in shared hosting environment. The monitoring is done via resource usage statistics per each MySQL thread.

<span class="notranslate"> MySQL Governor </span> can also kill off slow <span class="notranslate"> SELECT </span> queries.

<span class="notranslate"> MySQL Governor </span> has multiple modes of operations, depending on the configuration. It can work in monitor-only mode, or it can use different throttling scenarious.

<span class="notranslate"> MySQL Governor </span> allows to restrict customers who use too much resources. It supports following limits:

| |  | |
|-|--|-|
|<span class="notranslate"> CPU </span> | % | <span class="notranslate"> CPU </span> speed relative to one core. 150% would mean one and a half cores|
|<span class="notranslate"> READ </span> | bytes | bytes read. Cached reads are not counted, only those that were actually read from disk will be counted|
|<span class="notranslate"> WRITE </span> | bytes | bytes written. Cached writes are not counted, only once data is written to disk, it is counted|

You can set different limits for different periods: current, short, med, long. By default those periods are defined as 1 second, 5 seconds, 1 minute and 5 minutes. They can be re-defined using [configuration file](/mysql_governor/#configuration) . The idea is to use larger acceptable values for shorter periods. Like you could allow a customer to use two cores (200%) for one second, but only 1 core (on average) for 1 minute, and only 70% within 5 minutes. That would make sure that customer can burst for short periods of time.

When customer is restricted, the customer will be placed into special LVE with ID 3. All restricted customers will be placed into that LVE, and you can control amount of resources available to restricted customers. Restricted customers will also be limited to only 30 concurrent connections. This is done so they wouldn't use up all the MySQL connections to the server.

### Installation and update

#### Installation

::: danger IMPORTANT
Please make full database backup (including system tables) before you upgrade MySQL or switch to MariaDB. This action will prevent data losing in case if something goes wrong.
:::

**_MySQL Governor is compatible only with MySQL 5.x, 8.0; MariaDB & Percona Server 5.6._**

To install <span class="notranslate"> MySQL Governor </span> on your server install <span class="notranslate"> governor-mysql </span> package at first:

<div class="notranslate">

```
$ yum remove db-governor db-governor-mysql  # you can ignore errors if you don't have those packages installed
$ yum install governor-mysql
```
</div>

Then configure <span class="notranslate"> MySQL Governor </span> properly.

The installation is currently supported only on <span class="notranslate"> cPanel, Plesk, DirectAdmin, ISPmanager, InterWorx </span> , as well as on servers without control panel.

If you are installing <span class="notranslate"> CloudLinux </span> on a server running MySQL already, set your current MySQL version before calling installation script:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=mysqlXX
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

Please make sure to specify your current MySQL version instead of XX as follows:

* 55 — MySQL v5.5
* 56 — MySQL v5.6
* 57 — MySQL v5.7
* 80 — MySQL v8.0 [requires <span class="notranslate"> MySQL Governor </span> 1.2-37+; database packages are available in <span class="notranslate"> Beta </span> only, so, please use <span class="notranslate"> `--install-beta` </span> flag instead of <span class="notranslate"> `--install` </span> ]

If you are installing <span class="notranslate"> CloudLinux </span> on a server running <span class="notranslate"> MariaDB </span> already, do instead:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=mariadbXX
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

Please make sure to specify your current <span class="notranslate"> MariaDB </span> version instead of <span class="notranslate"> XX </span> as follows:

* 55 — MariaDB v5.5
* 100 — MariaDB v10.0
* 101 — MariaDB v10.1
* 102 — MariaDB v10.2
* 103 — MariaDB v10.3 [requires <span class="notranslate"> MySQL Governor 1.2-36+; for cPanel - MySQL Governor 1.2-41+] </span>


Installation for <span class="notranslate"> Percona Server 5.6 </span> [requires <span class="notranslate"> MySQL Governor </span> 1.1-22+ or 1.2-21+]:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=percona56
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>


Please note that <span class="notranslate"> MySQL/MariaDB/Percona </span> will be updated from <span class="notranslate"> CloudLinux </span> repositories.

If you are installing <span class="notranslate"> MySQL Governor </span> on a server without MySQL at all, you have an opportunity to choose desired MySQL version to be installed with <span class="notranslate"> MySQL Governor </span> installation script. Use <span class="notranslate"> --mysql-version </span> flag before calling the installation script:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=MYSQL_VERSION
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

<span class="notranslate"> MYSQL_VERSION </span> could be chosen from the list of versions currently supported by <span class="notranslate"> MySQL Governor </span> :

| | |
|-|-|
|mysql51 |MySQL v5.1 |  
|mysql55 |MySQL v5.5 | 
|mysql56 |MySQL v5.6 | 
|mysql57 |MySQL v5.7 | 
|mysql80 |MySQL v8.0 [requires <span class="notranslate"> MySQL Governor </span> 1.2-37+; database packages available in beta only, so use <span class="notranslate"> --install-beta flag instead of --install] </span> | 
|mariadb55 |MariaDB v5.5 |
|mariadb100 |MariaDB v10.0 |
|mariadb101 |MariaDB v10.1 |
|mariadb102 |MariaDB v 10.2 |
|mariadb103 |MariaDB v 10.3 [requires <span class="notranslate"> MySQL Governor 1.2-36+; for cPanel - MySQL Governor 1.2-41+] </span> |
|percona56 | <span class="notranslate"> Percona Server v 5.6 </span> |

Generally, <span class="notranslate"> stable </span> and <span class="notranslate"> beta </span> channels contain different version of MySQL packages - <span class="notranslate"> beta </span> contains newer version than <span class="notranslate"> stable </span> or the same one. If you would like to install  <span class="notranslate"> beta </span>  packages, use  <span class="notranslate"> --install-beta </span>  flag instead of  <span class="notranslate"> --install </span>  when calling installation script:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install-beta
```
</div>


Starting with <span class="notranslate"> MySQL Governor </span> version 1.2 when installing <span class="notranslate"> MySQL/MariaDB MySQL Governor </span> asks for a confirmation of a database version to be installed. To avoid such behavior for the automatic installations, please use <span class="notranslate"> --yes </span> flag.

For example:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install --yes
```
</div>


Please note that restore of previous packages in case of failed installation would also be confirmed with <span class="notranslate"> --yes </span> flag.

::: danger IMPORTANT
Use <span class="notranslate"> --yes </span> flag on your own risk, because it confirms installation in any case - even in case if there are troubles during installation (for example, network problems causing incomplete download of packages), everything would be confirmed.
:::

#### Upgrading database server

In order to change MySQL version you should run the following commands:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=MYSQL_VERSION
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

where `MYSQL_VERSION` is the target database server version that should be replaced with the value from the table above.

::: danger IMPORTANT
Make sure you have full database backup (including system tables) before you switch. This action will prevent data loss in case if something goes wrong.
:::

### Uninstalling

To remove <span class="notranslate">MySQL Governor</span>:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --delete
```
</div>

The script will install original MySQL server, and remove <span class="notranslate">MySQL Governor</span>.

### Configuration and Operation

#### Configuration

<span class="notranslate">MySQL Governor</span> configuration is located in <span class="notranslate">/etc/container/mysql-governor.xml</span> 

It is best to modify it using <span class="notranslate">[dbctl](/mysql_governor/#dbctl)</span> tool.

Once configuration file is updated, please, restart the <span class="notranslate"> MySQL Governor </span> using:

<div class="notranslate">

```
$ service db_governor restart
```
</div>
Example configuration:
<div class="notranslate">

```
<governor> 

<!--  'off' - do not throttle anything, monitoring only -->
<!--  'abusers' - when user reaches the limit, put user's queries into LVE for that user -->
<!--  'all' - user's queries always run inside LVE for that user -->
<!--  'single' - single LVE=3 for all abusers. -->
<!-- 'on' - deprecated (old restriction type) -->
<!-- To change resource usage of restricted user in LVE mode use command /usr/sbin/lvectl set 3 --cpu=<new value> --ncpu=<new value> --io=<new value> --save-all-parameters -->
<lve use="on|single|off|abusers|all"/> 

<!-- connection information -->
<!-- If host, login and password are not present, this information is taken from /etc/my.cnf and ~root/.my.cnf -->
<!-- Use symbol specified in prefix to figure out hosting accounts (mysql username will be split using prefix_separator, and first part will be used as account name). If prefix is not set, or empty -- don’t use prefixes/accounts --> 

<!-- db governor will try to split MySQL user names using prefix separator (if present)and statistics will be aggregated for the prefix (account name) -->
<connector host="..." login="..." password=".." prefix_separator="_"/> 

<!-- Intervals define historical intervals for burstable limits. In seconds -->
<intervals short="5" mid="60" long="300"/> 

<!-- log all errors/debug info into this log -->
<log file=”/var/log/dbgovernor-error.log” mode=”DEBUG|ERROR”/> 

<!-- s -- seconds, m -- minutes, h -- hours, d -- days -->
<!-- on restart, restrict will disappear -->
<!-- log file will contain information about all restrictions that were take -->
<!-- timeout - penalty period when user not restricted, but if he hit his limit during this period he will be restricted with higher level of restrict (for more long time) -->
<!- level1, level2, level3, level4 - period of restriction user for different level of restriction. During this period all user's requests will be placed into LVE container -->

<!-- if user hits any of the limits during period of time specified in timeout, higher level of restrict will be used to restrict user. If user was already on level4, level4 will be applied again -->
<!-- attribute format set an restrict log format:
SHORT -  restrict info only
MEDIUM - restrict info, _all_tracked_values_
LONG - restrict info, _all_tracked_values_, load average and vmstat info
VERYLONG - restrict info, _all_tracked_values_, load average and vmstat info, slow query info -->
<!-- script -- path to script to be triggered when account is restricted -->
<!-- user_max_connections - The number of simultaneous connections of blocked user (in LVE mode) --> 

<!-- restriction levels/format are deprecated -->
<restrict level1="60s" level2="15m" level3="1h" level4="1d" timeout="1h"
log="/var/log/dbgovernor-restrict.log" format="SHORT|MEDIUM|LONG|VERYLONG"
script="/path/to/script"
user_max_connections="30"/> 

<!-- period (deprecated) - period based restriction that has multiple levels (see above) -->
<!-- limit (by default) - when user hits limits, the account will be marked as restricted and if user does not hit  limit again during "unlimit=1m" account will be unrestricted. This mode doesn't have any additional levels/penalties. -->
<restrict_mode use="period|limit" unlimit="1m"/>

<!-- killing slow SELECT queries (no other queries will be killed) -->
<!-- if "log" attribute was set all killed queries will be saved in log file -->
<!-- slow parameter in the <limit name="slow" current="30"/> will no be applied without enabling slow_queries --> 
<slow_queries run="on|off" log="/var/log/dbgovernor-kill.log"/> 
<!-- Enable or disable saving of statistics for lve-stats - On - enabled, Off-disabled -->
<statistic mode="on|off"></statistic>
<!-- Enable logging user queries on restrict, can be On or Off -->
<!-- Files are saved in /var/lve/dbgovernor-store and being kept here during 10 days -->
<logqueries use="on|off"></logqueries>
<default>
<!-- -1 not use limit(by default, current - required) -->
<limit name="cpu" current="150" short="100" mid="90" long="65"/>
<limit name="read" current="100000000" short="90000000" mid="80000000" long="70000000"/>
<limit name="write" current="100000000" short="90000000" mid="80000000" long="70000000"/>
<!-- Time to kill slow SELECT queries for account, can be different for accounts in seconds(but unit can be specified) -->
<!-- enabled only when slow_queries run="on" -->
<!-- s -- seconds, m -- minutes, h -- hours, d -- days -->
<limit name="slow" current="30"/>
</default>
<!-- name will matched account name, as extracted via prefix extraction --> 

<!-- mysql_name will match exact MySQL user name. If both name and mysql_name are present, system will produce error -->
<!-- mode restrict -- default mode, enforcing restrictions -->
<!-- mode norestrict -- track usage, but don’t restrict user --> 
<!-- mode ignore -- don’t track and don’t restrict user -->
<user name=”xxx” mysql_name=”xxx” mode=”restrict|norestrict|ignore”>
<limit...>
</user> 

<!-- debug mode for particular user. The information logged to restrict log. -->
<debug_user name="xxx"/> 

</governor>
```
</div>

These values can also be set using [cloudlinux-config](/command-line_tools/#cloudlinux-config) CLI utility.

#### Modes Of Operation

:::tip Note
<span class="notranslate">MySQL Governor</span> 1.0+
:::

<span class="notranslate"> MySQL Governor </span> has multiple modes of operation. Some of them are experimental at this moment.  
Mode:  
<span class="notranslate"> **off -- Monitor Only**:</span> In this mode <span class="notranslate"> MySQL Governor </span> will not throttle customer's queries, instead it will let you monitor the MySQL usage to see the abusers at any given moment of time (and historically). This mode is good when you are just starting and want to see what is going on  
<span class="notranslate"> **single -- Single restricted's LVE for all restricted customers (deprecated)**:</span> In that mode once customer reaches the limits specified in the <span class="notranslate"> MySQL Governor </span> , all customer's queries will be running inside LVE with id 3. This means that when you have 5 customers restricted at the same time, all queries for all those 5 customers will be sharing same LVE. The larger the number of restricted customers - the less resources per restricted customer will be available  
<span class="notranslate"> **abusers - Use LVE for a user to restrict queries (default mode)**:</span> In that mode, once user goes over the limits specified in the <span class="notranslate"> MySQL Governor </span> , all customer's queries will execute inside that user's LVE. We believe this mode will help with the condition when the site is still fast, but MySQL is slow (restricted) for that user. If someone abuses MySQL, it will cause queries to share LVE with PHP processes, and PHP processes will also be throttled, causing less of a new queries being sent to MySQL. _Requires_ <span class="notranslate"> _dbuser-map_ </span> _file_  
<span class="notranslate"> **all - Always run queries inside user's LVE**:</span> This way there are no need for separate limits for MySQL. Depending on overhead we see in the future, we might decide to use it as a primary way of operating <span class="notranslate"> MySQL Governor </span> . The benefits of this approach is that limits are applied to both PHP & MySQL at the same time, all the time, preventing any spikes what so ever. _Requires_ <span class="notranslate"> _dbuser-map_ </span> _file_

If <span class="notranslate"> dbuser-map </span> file is absent on the server, "<span class="notranslate">abusers</span>" mode emulates "<span class="notranslate">single</span>".

With <span class="notranslate"> **single**   </span> and <span class="notranslate"> **abusers**</span> mode, once user is restricted, the queries for that user will be limited as long as user is using more than limits specified. After a minute that user is using less, we will unrestricted that user.

You can specify modes of operation using <span class="notranslate"> [dbctl](/mysql_governor/#dbctl) </span> or by changing [configuration file](/mysql_governor/#configuration) .
<span class="notranslate"> dbuser-map </span> file is located in <span class="notranslate">/etc/container/dbuser-map</span>.

#### Starting And Stopping


To start:
<div class="notranslate">

```
$ service db_governor start
```
</div>

To stop:
<div class="notranslate">

```
$ service db_governor stop
```
</div>

#### Mapping a User to Database 

:::tip Note
<span class="notranslate">MySQL Governor</span> 1.x
:::

Traditionally <span class="notranslate"> MySQL Governor </span> used prefixes to map user to database. With the latest version, we automatically generate <span class="notranslate"> user -> database user </span> mapping for <span class="notranslate"> cPanel </span> and <span class="notranslate"> DirectAdmin </span> control panels (other panels will follow).

The mapping file is located in: <span class="notranslate"> /etc/container/dbuser-map </span>

The format of the file:
<div class="notranslate">

```
[dbuser_name1] [account_name1] [UID1]
...
[dbuser_nameN] [account_nameN] [UIDN]
```
</div>
For example:

<div class="notranslate">

```
pupkinas_u2 pupkinas 502
pupkinas_u1 pupkinas 502
pupkinas_u3 pupkinas 502
pupkin2a_uuu1 pupkin2a 505
pupkin10_p10 pupkin10 513
pupkin5a_u1 pupkin5a 508
pupkin3a_qq1 pupkin3a 506
pupkin3a_test22 pupkin3a 506
pupkin3a_12 pupkin3a 506
```
</div>

This would specify that db users: <span class="notranslate"> pupkinas_us2, pupkinas_u1, pupkinas_u3 </span> belong to user <span class="notranslate"> pupkinas </span> with uid (lve id) 502
db user <span class="notranslate"> pupkin2a_uuu1 </span> belongs to user <span class="notranslate"> pupkin2a </span> with uid 505, etc...

This file is checked for modifications every 5 minutes.

If you need to force reload of that file, run:
<div class="notranslate">

```
service db_governor restart
```
</div>

#### Log Files


<span class="notranslate"> **Error_log** </span>

<span class="notranslate"> MySQL Governor </span> error log is used to track any problems that <span class="notranslate"> MySQL Governor </span> might have

<span class="notranslate"> **Restrict_log** </span>

Restrict log is located in <span class="notranslate"> /var/log/dbgovernor-restrict.log </span>

Restrictions:
<div class="notranslate">

```
_timestamp_ _username_ LIMIT_ENFORCED _limit_setting_ __current_value_                         _restrict_level__ SERVER_LOAD TRACKED_VALUES_DUMP
 ... 
```
</div>

* <span class="notranslate"> TRACKED_VALUES_DUMP=busy_time:xx,cpu_time:xx,... </span>
* <span class="notranslate"> SERVER_LOAD </span> = load averages followed by output of <span class="notranslate"> vmstat </span>
* <span class="notranslate"> TRACKED_VALUES_DUMP </span> is available with <span class="notranslate"> MEDIUM & LONG </span> format
* <span class="notranslate"> SERVER_LOAD </span> is available with <span class="notranslate"> LONG </span> format

#### Change MySQL version


If you would like to change to a different MySQL version, or switch to <span class="notranslate"> MariaDB </span> you have to start by backing up existing databases.

::: tip Note
For experienced users only. Changing MySQL version is a quite complicated procedure, it causes system table structural changes which can lead to unexpected results. Think twice before proceeding.
:::

::: danger IMPORTANT
Please make full database backup (including system tables) before you will do upgrade of MySQL or switch to MariaDB. This action will prevent data losing in case if something goes wrong.
:::

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=MYSQL_VERSION
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

* If you are using <span class="notranslate"> cPanel </span> or <span class="notranslate"> DirectAdmin </span> - recompile <span class="notranslate"> Apache </span> .

To install beta version of MySQL:
<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install-beta
```
</div>

<span class="notranslate"> MYSQL_VERSION </span> can be one of the following:

| | |
|-|-|
|<span class="notranslate"> auto </span> | default version of MySQL for given OS release (or cPanel settings)|
|<span class="notranslate"> mysql50   </span> | MySQL v5.0|
|mysql51 | MySQL v5.1|
|mysql55 | MySQL v5.5|
|mysql56 | MySQL v5.6|
|mysql57 | MySQL v5.7|
|mysql80 | MySQL v8.0 [requires MySQL Governor 1.2-37+; database packages are available in Beta only, so, please use `--install-beta` flag instead of ` --install` ]|
|mariadb55 | MariaDB v5.5|
|mariadb100 | MariaDB v10.0|
|mariadb101 | MariaDB v10.1|
|mariadb102 | MariaDB v 10.2|
|mariadb103 | MariaDB v 10.3 [requires <span class="notranslate"> MySQL Governor 1.2-36+; for cPanel - MySQL Governor 1.2-41+ </span> ]|
|percona56 | Percona v 5.6|

* We don't recommend to downgrade from MySQL v5.6, MariaDB 10.x

::: tip Note
Starting from cPanel & WHM version 70, cPanel supports MySQL 5.7: https://blog.cpanel.com/being-a-good-open-source-community-member-why-we-hesitated-on-mysql-5-7/
:::

::: tip Note
Starting from cPanel & WHM version 78, cPanel supports MariaDB 10.3: https://documentation.cpanel.net/display/78Docs/MySQL+or+MariaDB+Upgrade 
:::

::: tip Note
cPanel does not officially support MySQL 8.0, that is why we don’t recommend to use it on cPanel servers. Use on your own risk for <span class="notranslate">DirectAdmin and Plesk</span> servers, because downgrade can corrupt your databases.
:::

### Backing Up MySQL


On <span class="notranslate"> cPanel </span> server disable MySQL service monitoring before doing the job:
<div class="notranslate">

```
$ whmapi1 configureservice service=mysql enabled=1 monitored=0
```
</div>

Execute as <span class="notranslate"> root </span> :
<div class="notranslate">

```
$ mkdir -p ~/mysqlbkp
$ service mysql restart --skip-networking --skip-grant-tables
$ mysql_upgrade
$ mysqldump --all-databases --routines --triggers > ~/mysqlbkp/dbcopy.sql
$ service mysql stop
$ cp -r /var/lib/mysql/mysql ~/mysqlbkp/
$ service mysql start
```
</div>

On <span class="notranslate"> cPanel </span> server enable monitoring back:
<div class="notranslate">

```
$ whmapi1 configureservice service=mysql enabled=1 monitored=1
```
</div>

::: tip Note
This operation may take some time.
:::

#### abrt plugin


We have created a plugin for <span class="notranslate"> abrt </span> tool to automatically upload core dumps in case <span class="notranslate">MySQL Governor</span> crashes.

To install the plugin:
<div class="notranslate">

```
$ yum install cl-abrt-plugin --enablerepo=cloudlinux-updates-testing
```
</div>

It will monitor crash reports for <span class="notranslate"> `/usr/sbin/db_governor, /usr/sbin/dbtop and /usr/sbin/dbctl` </span>

You can modify <span class="notranslate"> `/etc/libreport/plugins/dropbox.conf` </span> to monitor other software as well by adding them to <span class="notranslate"> AppList </span> .
<div class="notranslate">

```
AppLists=/usr/sbin/db_governor,/usr/sbin/dbtop,/usr/sbin/dbctl
```
</div>

### Command-line tools

<span class="notranslate"> dbtop </span> - monitors MySQL usage on per user bases. [More info...](/mysql_governor/#dbtop)  
<span class="notranslate"> dbctl </span> - command line tool to manage <span class="notranslate"> DB Governor configuration.  [More info...](/mysql_governor/#dbctl) </span>  
<span class="notranslate"> lveinfo --dbgov </span> - provides historical information about usage and customer restrictions. [More info...](/mysql_governor/#lveinfo-dbgov)  
<span class="notranslate"> dbgovchar </span> - generates charts for MySQL usage. [More info...](/mysql_governor/#dbgovchart)


#### dbtop


Utility to monitor MySQL usage. Requires <span class="notranslate"> db_governor </span> to be running. It shows usage for the current, mid and long intervals.

**Options:**

| | |
|-|-|
| <span class="notranslate"> -c </span> |show one time user list (no interactive mode) | 
| <span class="notranslate"> -r interval </span> |refresh interval for interactive mode (in seconds)|

**Control keys**

| | |
|-|-|
|<span class="notranslate"> z </span> |toggle color mode and two-color mode | 
|<span class="notranslate"> q </span> | <span class="notranslate"> F10, Ctrl-c </span> - quit program | 
|<span class="notranslate"> u </span> |sort table by username | 
|<span class="notranslate"> c </span> |sort table by cpu column | 
|<span class="notranslate"> r </span> |sort table by read column | 
|<span class="notranslate"> w </span> |sort table by write column | 
|<span class="notranslate"> l </span> |sort by restriction level | 
|<span class="notranslate"> t </span> |sort by time before restrictions will be lifted.|

Control keys, that sort table, displays into header of table bold and underlined symbol.
Sorted field will be highlighted by *.
<span class="notranslate"> CAUSE </span> field shows current stage, reason for restriction and number of seconds before restriction will be lifted:
Values of column ' <span class="notranslate"> CAUSE </span> ' - cause of restriction or freezing:
Possible stages: - - <span class="notranslate"> OK </span> , 1 - Restriction 1, 2 - Restriction 2, 3 - Restriction 3, 4 -- restriction level 4

| | |
|-|-|
| <span class="notranslate"> c - current </span> |(current value of parameter)|
| <span class="notranslate"> s - short </span> |(average value of 5 last values of parameter)|
| <span class="notranslate"> m - middle </span> |(average value of 15 last values of parameter)|
| <span class="notranslate"> l - long </span> |(average value of 30 last values of parameter)|
| |and parameter which is cause of restriction|
| <span class="notranslate"> 1/s:busy_time/12 </span> | first level restricted account with short average restriction <span class="notranslate"> by busy_time </span> with 12 seconds left before re-enabled.|

**Display fields:**

* <span class="notranslate"> cpu </span> - number in %, shows <span class="notranslate"> cpu </span> usage by user
  * <span class="notranslate"> read </span> - number of bytes (kbytes, mbytes, gbytes) which user reads per second
  * <span class="notranslate"> write </span> - number of bytes (kbytes, mbytes, gbytes) write user reads per second


Accounts highlighted in _red_ color means that the account is restricted.  
Accounts highlighted in _blue_ color are in cool down period

Command line parameters of <span class="notranslate"> dbtop </span> utility:  
<span class="notranslate"> -r - dbtop </span> refresh period in seconds ( <span class="notranslate"> dbtop -r12 </span> )

#### dbctl


usage: <span class="notranslate"> dbctl command [parameter] [options] </span>

**commands:**

| | |
|-|-|
| <span class="notranslate"> set </span> |set parameters for a <span class="notranslate"> db_governor </span> |
| <span class="notranslate"> list </span> |list users & their limits. It will list all users who had been active since <span class="notranslate"> Governor </span> restart,  as well as those for who explicit limits were set|
| <span class="notranslate"> list-restricted </span> |list restricted customers, with their limits, restriction reason, and time period they will still be restricted|
| <span class="notranslate"> ignore </span> |ignore particular user|
| <span class="notranslate"> watch </span> |start observing particular user again|
| <span class="notranslate"> delete </span> |remove limits for user/use defaults|
| <span class="notranslate"> restrict </span> |restrict user using lowest level (or if <span class="notranslate"> --level </span> specified, using the specified level)|
| <span class="notranslate"> unrestrict </span> |unrestrict username (configuration file remains unchanged)|
| <span class="notranslate"> unrestrict-all </span> |unrestrict all restricted users (configuration file remains unchanged)|
| <span class="notranslate"> --help </span> |show this message|
| <span class="notranslate"> --version </span> |version number|
| <span class="notranslate"> --lve-mode </span> |set <span class="notranslate"> DB Governor </span> mode of operation. Available values: <span class="notranslate"> off/abusers/all/single/on </span> |
| | <span class="notranslate"> off </span> - monitor only, don't throttle|
| | <span class="notranslate"> abusers </span> - when user reaches the limit, put user's queries into LVE for that user (experimental)|
| | <span class="notranslate"> all </span> - user's queries always run inside LVE for that user (experimental)|
| | <span class="notranslate"> single </span> - single LVE for all abusers.|
| | <span class="notranslate"> on </span> - same as <span class="notranslate"> single </span> (deprecated)|

**parameters:**

| | |
|-|-|
| <span class="notranslate"> default </span> |set default parameter|
| <span class="notranslate"> usrename </span> |set parameter for user|

**options:**

| | |
|-|-|
| <span class="notranslate"> --cpu=N </span> |limit <span class="notranslate"> CPU </span> (pct) usage|
| <span class="notranslate"> --read=N </span> |limit <span class="notranslate"> READ </span> (MB/s) usage|
| <span class="notranslate"> --write=N </span> |limit <span class="notranslate"> WRITE </span> (MB/s) usage|
| <span class="notranslate"> --level=N </span> |level (1,2,3 or 4) specified (deprecated) - this option is available only for period mode:|

<span class="notranslate"> <restrict_mode use="period"/> </span> (see [Configuration](/mysql_governor/#configuration))

The default mode is " <span class="notranslate"> limit </span> " - when a user hits limits, the account will be marked as restricted and if the user does not hit the limit again during " <span class="notranslate"> unlimit=1m </span> " account will be unrestricted. This mode doesn't have any additional levels/penalties.  
<span class="notranslate"> <restrict_mode use="limit" unlimit="1m"/> </span>

Changing the <span class="notranslate"> "unlimit" </span> can be done only via the configuration file (see [Configuration](/mysql_governor/#configuration) ).
<span class="notranslate"> --slow=N: </span> limit time (in seconds) for long running <span class="notranslate"> SELECT </span> queries

Options for parameter <span class="notranslate"> list </span> :

| | |
|-|-|
| `--kb` |show limits in Kbytes no pretty print|
| `--bb` |show limits in bytes no pretty print|
| `--mb` |show limits in Mbytes no pretty print|

Examples:
<div class="notranslate">

```
$ dbctl set test2 --cpu=150,100,70,50 --read=2048,1500,1000,800
```
</div>

sets individual limits for <span class="notranslate"> cpu (current, short, middle </span> period) and <span class="notranslate"> read (current, short, middle, long </span> periods) for user <span class="notranslate"> test2 </span>
<div class="notranslate">

```
$ dbctl set default --cpu=70,60,50,40
```
</div>

changes default <span class="notranslate"> cpu </span> limits.

All new limits will be applied immediately

To unrestrict user:
<div class="notranslate">

```
$ dbctl unrestrict username
```
</div>

To unrestrict all users:
<div class="notranslate">

```
$ dbctl unrestrict-all 
```
</div>

To restrict user:
<div class="notranslate">

```
$ dbctl restrict dbgov
```
</div>

To restrict user to level 2 restriction:
<div class="notranslate">

```
$ dbctl restrict dbgov --level=2
```
</div>

To make <span class="notranslate"> Governor </span> to ignore user:
<div class="notranslate">

```
$ dbctl ignore username
```
</div>

Delete user's limits, and use defaults instead:
<div class="notranslate">

```
$ dbctl delete username
```
</div>

Show limits as bytes:
<div class="notranslate">

```
$dbctl list --bb
```
</div>

#### lveinfo --dbgov


<span class="notranslate"> lveinfo </span> tool is a part of <span class="notranslate"> lve-stats </span> package. It was extended to collect historical information about MySQL usage.

<span class="notranslate"> $ lveinfo --dbgov --help </span>
<div class="notranslate">

```
Displays information about historical Db Governor usage
Usage: lveinfo [OPTIONS] 

-h --help              : this help run report from date and time in YYYY-MM-DD HH:MM format if not present last 10 mscreen
-v, --version          : version number
-f, --from=            : inutes are assumed
-t, --to=              : run report up to date and time in YYYY-MM-DD HH:MM format
      if not present, reports results up to now
	  --period=          : time period
      usage            : specify minutes with m,  h - hours, days with d, and values:
	  : today, yesterday; 5m - last 5 minutes, 4h -- last four hours,
	  : 2d - last 2 days, as well as today
-o, --order-by=        : orders results by one of the following:
      con              : average connections
      cpu              : average CPU usage
      read             : average READ usage
      write            : average WRITE usage
-u, --user=            : mysql username
-l, --limit=           : max number of results to display, 10 by default
-c, --csv              : display output in CSV format
-b, --format           : show only specific fields into output
      available values:
      ts               : timestamp records
      username         : user name
      con              : average connections
      cpu              : average CPU usage
      read             : average READ usage
      write            : average WRITE usage
      lcpu             : CPU limit
      lread            : READ limit
      lwrite           : WRITE limit
	  --show-all         : full output (show all limits); brief output is default 
	  
-o, --order-by=        : orders results by one of the following:
      ts               : timestamp records
      username         : user name
      max_sim_req      : max simultaneous requests
      sum_cpu          : average CPU usage
      sum_write        : average WRITE usage
      sum_read         : average READ usage
      num_of_rest      : number of restricts
      limit_cpu_end    : limit CPU on period end
      limit_read_end   : limit READ on period end
      limit_write_end  : limit WRITE on period end
	  --id=              : LVE id -- will display record only for that LVE id
	  -u, --user=            : Use username instead of LVE id, and show only record for that user
	  -l, --limit=           : max number of results to display, 10 by default
	  -c, --csv              : display output in CSV format
	  -b, --by-usage         : show LVEs with usage (averaged or max) within 90% percent of the limit
      available values:
      sum_cpu          : average CPU usage
      sum_write        : average WRITE usage
      sum_read         : average READ usage
      num_of_rest      : number of restricts
      limit_cpu_end    : limit CPU on period end
      limit_read_end   : limit READ on period end
      limit_write_end  : limit WRITE on period end
	  --show-all         : full output (show all limits); brief output is default 
	  
	  TS                     : timestamp records
	  USER                   : user name
	  CPU                    : average CPU usage
	  READ                   : average READ usage
	  WRITE                  : average WRITE usage
	  CON                    : average connections
	  lCPU                   : CPU limit
	  lREAD                  : READ limit
	  lWRITE                 : WRITE limit
	  RESTRICT               : C-cpu restrict, R- read restrict, W- write restrict
```
</div>

Example:
<div class="notranslate">

```
root@cpanel1 [~/ttttt]# lveinfo --dbgov --user=dbgov --period=1d --limit=10
TS                   USER   CPU     READ    WRITE   CON     lCPU    lREAD   lWRITE   RESTRICT  
2012-12-06 11:14:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:13:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:12:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:11:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:10:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:09:49  dbgov   90      0.0     0.0     1       90      1000    1000     C          
2012-12-06 11:08:49  dbgov   0       0.0     0.0     0       400     1000    1000                
2012-12-06 11:07:49  dbgov   0       0.0     0.0     0       400     1000    1000                
2012-12-06 11:06:49  dbgov   0       0.0     0.0     0       400     1000    1000   
```
</div>

#### dbgovchart


<span class="notranslate"> dbgovchart </span> is analog of <span class="notranslate"> lvechart </span> tool to create charts representing customer's to MySQL usage

Usage: <span class="notranslate"> `/usr/sbin/dbgovchart [OPTIONS]` </span>

Acceptable options are:
<div class="notranslate">

```
--help      This help screen
--version   Version number
--from=     Run report from date and time in YYYY-MM-DD HH:MM format
            if not present last 10 minutes are assumed
--to=       Run report up to date and time in YYYY-MM-DD HH:MM format
            if not present, reports results up to now
--period=   Time period
            specify minutes with m,  h - hours, days with d, and values:
            today, yesterday
            5m - last 5 minutes, 4h - last four hours, 2d - last 2 days,
            as well as today
--user=     mysql username
--output=   Filename to save chart as, if not present, output will be sent to STDOUT
--show-all  Show all graphs (by default shows graphs for which limits are set)
```
</div>

Charts examples:
![](/images/1111.png)
![](/images/1111_2.png)

### Troubleshooting

**MariaDB 5.5 and MariaDB 10.0: How to set LimitNOFILE correctly for systemd.**

<span class="notranslate"> MariaDB 5.5 </span> and <span class="notranslate"> MariaDB 10.0 </span> have only file for managing the service, but the file has <span class="notranslate"> LSB </span> functions, so it is supported by <span class="notranslate"> `systemd` </span> .

For adding extra limits, do the following:

1. Run:

<div class="notranslate">

```
mkdir /etc/systemd/system/mariadb.service.d/
```
</div>

2. Run:

<div class="notranslate">

```
touch /etc/systemd/system/mariadb.service.d/limits.conf
```
</div>

3. Add the following content to the the file <span class="notranslate"> `/etc/systemd/system/mariadb.service.d/limits.conf` </span> :

<div class="notranslate">

```
[Service] 
LimitNOFILE=99999
```
</div>

**MySQL Governor lost connection to MySQL - “Can't connect to mysql” messages in /var/log/dbgovernor-error.log (Plesk and DirectAdmin)**

This may be caused by changing root/administrator credentials without updating MySQL <span class="notranslate"> Governor </span> configuration file.

When you change root or administrator credentials in <span class="notranslate"> Plesk or DirectAdmin, </span> you also need to update MySQL <span class="notranslate"> Governor </span> configuration file. This could be done with the following command (available since <span class="notranslate"> governor-mysql 1.2-38): </span>

<div class="notranslate">

```
/usr/share/lve/dbgovernor/mysqlgovernor.py --update-config-auth
```
</div>

The command updates credentials in MySQL <span class="notranslate"> Governor </span> configuration file and restarts <span class="notranslate"> db_governor </span> service afterwards.

After applying the command MySQL <span class="notranslate"> Governor </span> successfully connects to MySQL.

## PHP Selector
### General information and requirements

<span class="notranslate"> PHP Selector </span> is a CloudLinux component that sits on top of CageFS. It allows each user to select PHP version and module based on their needs. <span class="notranslate"> PHP Selector </span> requires account to have CageFS enabled to work.

<span class="notranslate"> PHP Selector </span> is **compatible** with the following technologies: <span class="notranslate"> _suPHP, mod_fcgid, CGI (suexec), LiteSpeed_ </span> .

It is **not compatible** with <span class="notranslate">_mod_php/DSO_</span>, including <span class="notranslate">_mod_ruid2_</span> and <span class="notranslate"> _MPM ITK_</span>.

::: tip Note
PHP Selector is not supported for H-Sphere.
:::

### Installation and update

The installation of <span class="notranslate"> PHP Selector </span> presumes that you already have  [CageFS](/cagefs/)  &  <span class="notranslate"> [LVE Manager](/lve_manager/)  installed. </span>

Use [compatibility matrix](/limits/#compatiblity_matrix) to check if your Web Server/PHP mode is supporting <span class="notranslate"> PHP Selector. </span> If not, you need a change to one of the supported models.

Installation of different versions of PHP & modules:
<div class="notranslate">

```
$ yum groupinstall alt-php
```
</div>

Update CageFS & <span class="notranslate"> LVE Manager with support for PHP Alternatives: </span> 
<div class="notranslate">

```
$ yum update cagefs lvemanager
```
</div>

<span class="notranslate"> **cPanel/WHM** : Make sure 'Select PHP version' </span> is enabled in <span class="notranslate"> Feature Manager</span>.

:::danger IMPORTANT
Please, do not use settings like <span class="notranslate">_SuPHP_ConfigPath, PHPRC, PHP_INI_SCAN_DIR_</span>. Do not redefine path to <span class="notranslate"> php.ini </span> and ini-files for PHP modules. Doing that can break <span class="notranslate"> PHP Selector </span> functionality.
:::

For example, alternative php5.2 versions should load <span class="notranslate">`/opt/alt/php52/etc/php.ini`</span> file and scan <span class="notranslate">`/opt/alt/php52/etc/php.d`</span> directory for modules:
<div class="notranslate">

```
Configuration File (php.ini) Path         /opt/alt/php52/etc
Loaded Configuration File                 /opt/alt/php52/etc/php.ini
Scan this dir for additional .ini files   /opt/alt/php52/etc/php.d
additional .ini files parsed              /opt/alt/php52/etc/php.d/alt_php.ini
```
</div>

Those are default locations for <span class="notranslate"> alt-php </span> .

If you need custom PHP settings per user, please change them via <span class="notranslate"> "Edit PHP settings" </span> feature of <span class="notranslate"> PHP Selector</span>.

If a list of default modules is absent on the server in the <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ file for some alt-PHP version and there is _nd_mysqli_ extension in this version, then on installation/update of the LVE Manager, </span> the _mysqli_ extension will be disabled and _nd_mysqli_ extension will be enabled automatically.

* If _nd_mysqli_ module is absent or a list of enabled modules is available, then they won't be changed automatically.
* If alt-PHP is not installed on LVE Manager installation/update, then they won’t be changed automatically.

To change the modules status (enabled/disabled) manually, run the following command in a console:
<div class="notranslate">

```
# /usr/sbin/cloudlinux-selector make-defaults-config --json --interpreter=php
```
</div>

####**Update**

To update PHP Selector, run the following command:
<div class="notranslate">

```
yum groupupdate alt-php
```
</div>

This command allows to install newly released versions in <span class="notranslate"> PHP Selector. </span>

#### LiteSpeed support

::: tip Note
LiteSpeed detects CloudLinux OS and applies all settings out-of-the-box.
:::

If the settings were not applied, you can use the following steps to set up LiteSpeed to use <span class="notranslate"> PHP Selector. </span>

####**How to set up LiteSpeed version lower than 5.3 to use PHP Selector**

To enable <span class="notranslate"> PHP Selector </span> with <span class="notranslate"> LiteSpeed Web Server </span> follow <span class="notranslate"> PHP Selector  </span> [installation guide](/php_selector/#installation-and-update) , and then adjust following settings in <span class="notranslate"> LiteSpeed </span> :

1. <span class="notranslate"> CloudLinux (Admin Console --> Configuration --> Server --> General): CageFS </span>
2. Enable <span class="notranslate"> SuExec: Server--> General --> PHP SuEXEC --> Yes </span>
3. Go to <span class="notranslate"> _External App_ </span> tab, the new <span class="notranslate"> **lsphp_selector** </span> is here.

:::tip Note
You can select any other application or create a custom one.
:::

![](/images/litespeed1_zoom70.png)

4. The <span class="notranslate"> _Command_ </span> line should be <span class="notranslate"> **/var/www/cgi-bin/cgi_wrapper/cloudlinux_wrapper** </span> on <span class="notranslate"> Plesk </span> . For other control panels, <span class="notranslate"> _Command_ </span> line should be <span class="notranslate"> **/usr/local/bin/lsphp** </span> .

<span class="notranslate"> _Run On Start Up_ </span> line must contain <span class="notranslate"> **Yes** </span> or <span class="notranslate"> **No** </span> .

For <span class="notranslate"> Plesk </span> :

![](/images/litespeed3_zoom70.png)

For other control panels:

![](/images/litespeed2_zoom70.png)

5. Go to <span class="notranslate"> _Script Handler_ </span> tab. For required suffixes change the <span class="notranslate"> _Handler Name_ </span> to <span class="notranslate"> **lsphp_selector**</span>.

![](/images/litespeed4_zoom70.png)


![](/images/litespeed5_zoom70.png)

####**Additional settings for LiteSpeed version 5.3+**

Go to <span class="notranslate"> Server --> PHP </span> tab. Click <span class="notranslate"> _Edit_ </span> in the <span class="notranslate"> _PHP Handler Defaults_ </span> section. We recommend to set up the following settings:

* Set <span class="notranslate"> _Yes_ </span> in the <span class="notranslate"> _Run On Startup_ </span>
* Make sure to set <span class="notranslate"> _Max Idle Time_ </span> 

![](/images/litespeed_4_zoom70.png)

::: tip Note
In order to use <span class="notranslate"> PHP Selector and custom php.ini, lsphp5 </span> needs to be in SuEXEC non-daemon mode.
:::

::: tip Note
Some PHP configurations require more memory for SuExec to work properly. If you are getting error 500 after switching suEXEC to non-daemon mode, try to increase <span class="notranslate"> Memory Soft Limit and Memory Hard Limit for external App </span> to at least 650/800M.
:::

::: tip Note
If you have LiteSpeed installed not in standard location path, please create a symlink: <span class="notranslate"> 'ln -s /path/to/custom/lsws /usr/local/lsws' then run 'cagefsctl --setup-cl-selector'. </span>
:::

#### ISPmanager support


As of July 2013, <span class="notranslate"> PHP Selector </span> support for <span class="notranslate"> ISPmanager </span> is limited to command line utilities. You should still be able to use it.

As always, <span class="notranslate"> PHP Selector </span> requires <span class="notranslate">  CGI, FCGI </span> or <span class="notranslate"> suPHP </span> to work.

You will need to do following modifications:

Create new file <span class="notranslate"> /usr/local/bin/php-cgi-etc: </span>
<div class="notranslate">

```
#!/bin/bash
/usr/bin/php-cgi -c /etc/php.ini "$@"
```
</div>
Make that file executable:
<div class="notranslate">

```
$ chmod +x /usr/local/bin/php-cgi-etc
```
</div>
Edit file <span class="notranslate"> /usr/local/ispmgr/etc/ispmgr.conf </span>

Add a line:
<div class="notranslate">

```
path phpcgibinary /usr/local/bin/php-cgi-etc
```
</div>

Make sure there is no other lines with <span class="notranslate"> _path phpcgibinary_ </span> defined in the file.

Restart <span class="notranslate"> ISPmanager </span> :
<div class="notranslate">

```
$ killall ispmgr
```
</div>

After that <span class="notranslate"> FCGID </span> wrappers <span class="notranslate">(`/var/www/[USER]/data/php-bin/php`)</span> for new users will be like this:

<span class="notranslate"> #!/usr/local/bin/php-cgi-etc </span>

You might need to edit/modify wrappers for existing users if you want them to be able to use <span class="notranslate">PHP Selector</span>. You can leave them as is for users that don't need such functionality.

### Uninstalling

It is not possible to remove <span class="notranslate"> PHP Selector </span> from the system completely as it is an essential part of <span class="notranslate"> LVE Manager </span> and CageFS packages. However, you can make PHP Selector unavailable for cPanel and Plesk users.

To do so, go to <span class="notranslate"> _LVE Manager → PHP Selector_ </span> and check <span class="notranslate"> _Disabled_ as PHP Selector </span> status. Doing so allows you to disable web-interface of the <span class="notranslate"> PHP Selector </span> in the user interface but does not reset custom settings (choosing a version of PHP and modules).

To disable <span class="notranslate"> PHP Selector </span> and make it has no effect on a PHP version on the sites, run the following command:

* this command resets PHP versions to Native:

<div class="notranslate">

```
cagefsctl --cl-selector-reset-versions
```
</div>

* this command resets PHP modules to Default:

<div class="notranslate">

```
cagefsctl --cl-selector-reset-modules
```
</div>

::: danger
These commands can affect PHP version of your clients’ web sites. Use them with caution as improper usage might cause your clients’ web sites down.
:::

#### Disabling PHP extension globally

If you want to disable PHP extension globally, you don't need to remove file <span class="notranslate">`/opt/alt/phpXX/etc/php.d.all/$EXTENSION.ini`</span>. You should just comment out <span class="notranslate"> "extension=" </span> directives in it.

The extension will be visible in <span class="notranslate"> PHP Selector </span> interface, but selecting it in users's interface will take no effect - extension will be disabled in fact.

Reinstalling of <span class="notranslate"> alt-php </span> packages will not reset settings (will not enable extension again).


### Configuration and using


#### Setting Default Version and Modules


Administrator can set default interpreter version and extensions for all users. All file operations are actually done by CageFS. CageFS takes settings from <span class="notranslate">  /etc/cl.selector/defaults.cfg. </span> Currently the <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> is created and handled by <span class="notranslate"> CloudLinux PHP Selector </span> scripts. It has the following format:
<div class="notranslate">

```
[global]
selector=enabled

[versions]
php=5.4

[php5.4]
modules=json,phar

[php5.3]
modules=json,zip,fileinfo
```
</div>

#### Individual PHP.ini files


For each customer, inside CageFS, file <span class="notranslate"> alt_php.ini is located in /etc/cl.php.d/alt-phpXX (XX </span> - version of PHP, like 52 or 53). The file contains PHP extension settings and extension directives selected by customer. This file exists for each customer, for each PHP version.

Note, that this is <span class="notranslate"> 'local' to CageFS, </span> and different users will have different files. The file is not visible in <span class="notranslate"> /etc/cl.php.d </span> outside CageFS. If you would like to view that file, use:
<div class="notranslate">

```
# cagefsctl -e USERNAME 
```
</div>

to enter into CageFS for that user. Then type: <span class="notranslate"> `exit` </span> ; to exit from CageFS

This file has to be updated using <span class="notranslate"> `cagefsctl --rebuild-alt-php-ini` </span> after updating <span class="notranslate"> alt-php </span> RPMs

Admin can change individual settings for PHP extensions by changing that extension's ini file, like editing <span class="notranslate"> /opt/alt/php54/etc/php.d.all/eaccelerator.ini </span> and then running:
<div class="notranslate">

```
cagefsctl --rebuild-alt-php-ini
```
</div>
to propagate the change.

#### Substitute global php.ini for individual customer


Sometimes you might want to have a single customer with a different php.ini, than the rest of your customers.

To do that, you will use <span class="notranslate"> [custom.etc directory functionality](/cagefs/#custom-etc-files-per-customer) </span>

1. Move default php.ini into <span class="notranslate"> _/etc_ </span> directory and create a symlink to it:

<div class="notranslate">

```
$ mv /usr/local/lib/php.ini /etc/php.ini
$ ln -fs /etc/php.ini /usr/local/lib/php.ini
```
</div>

2. Change path to php.ini in <span class="notranslate"> _/etc/cl.selector/native.conf_ </span> file to:

<div class="notranslate">

```
php.ini=/etc/php.ini
```
</div>

3. For each user that needs custom file, create directory <span class="notranslate"> _/etc/cagefs/custom.etc/USER_NAME/php.ini_ </span>.

For example if you want to create custom for <span class="notranslate"> USER1 </span> and <span class="notranslate"> USER2 </span> you would create files:  
<span class="notranslate"> _/etc/cagefs/custom.etc/USER1/php.ini_ </span>  
<span class="notranslate"> _/etc/cagefs/custom.etc/USER2/php.ini_ </span>

Create such files for each user that should have custom file.

4. Execute:

<div class="notranslate">

```
$ cagefsctl --force-update 
```
</div>

::: tip Notes

1. Make sure that `php.ini` load path is set to <span class="notranslate">`/etc/php.ini`</span>

2. Users will be able to override settings of those php.ini files (global or custom) via <span class="notranslate">PHP Selector</span>. If you want to prevent that, you should disable <span class="notranslate">PHP Selector</span> feature.

3. Even if <span class="notranslate">PHP Selector</span> is disabled, user can override PHP settings by using <span class="notranslate">`ini_set() php`</span> function in PHP script, or by <span class="notranslate">`php -c`</span> command line option.

4. If you modify anything in <span class="notranslate">`/etc/cagefs/custom.etc`</span> directory, you should execute:

<div class="notranslate">

```
$ cagefsctl --update-etc
```
</div>

in order to apply changes to CageFS for all users.

OR 

<div class="notranslate">

```
$ cagefsctl --update-etc user1 user2
```
</div>

to apply changes to CageFS for specific users.

:::

#### Managing interpreter version


Managing interpreter versions is done by means of manipulating a set of symbolic links that point to different versions of interpreter binaries. For example, if default PHP binary is <span class="notranslate"> `/usr/local/bin/php` </span> :

* First we move the default binary inside CageFS to <span class="notranslate"> `/usr/share/cagefs-skeleton/usr/selector` </span> , and make <span class="notranslate"> /usr/local/bin/php </span> a symlink pointing to <span class="notranslate"> /etc/cl.selector/php </span> . This operation is done as part of CageFS deployment.
* Next suppose we have additional PHP version, say 7.2.5. The information about all additional interpreter binaries and paths for them is kept in <span class="notranslate"> /etc/cl.selector/selector.conf </span> . This config file is updated by RPM package manager each time alternative PHP package is added, removed or updated
* <span class="notranslate"> `/usr/bin/selectorctl --list --interpreter=php` </span> will get us list of all available PHP interpreter versions out of <span class="notranslate"> /etc/cl.selector/selector.conf file </span> .
Next we want to know which PHP version is active for a given user (to supply a selected option in options list). We type:
* <span class="notranslate"> `/usr/bin/selectorctl --user USERNAME --interpreter=php --user-current` </span> will retrieve PHP version set for a particular user. The script gets the path from <span class="notranslate"> `/var/cagefs/LAST_TWO_DIGITS_OF_UID/USERNAME/etc/cl.selector/php` </span> symlink, compares it with contents of <span class="notranslate"> /etc/cl.selector/selector.conf </span> file and if path is valid, prints out the current interpreter version.
* <span class="notranslate"> `/usr/bin/selectorctl --user USERNAME --interpreter=php --set-user-current=7.2` </span> sets the current PHP version for particular user by creating symlink in <span class="notranslate"> `/var/cagefs/LAST_TWO_DIGITS_OF_UID/USERNAME/etc/cl.selector` </span> directory. All old symlinks are removed, and new symlinks are set.




#### Including PHP Selector only with some packages (cPanel)


<span class="notranslate"> cPanel </span> has a ' <span class="notranslate"> Feature Manager </span> ' in WHM that allows you to disable <span class="notranslate"> PHP Selector </span> for some of the packages that you offer.

In reality it only disables the icon in <span class="notranslate"> cPanel </span> interface. Yet, in most cases it should be enough in shared hosting settings.

You can find more info on ' <span class="notranslate"> Feature Manager </span> ' here: [http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager](http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager)


Once <span class="notranslate"> PHP Selector </span> is enabled, you can find it in the <span class="notranslate"> Feature Manager </span> . Disabling it in <span class="notranslate"> Feature Manager </span> , will remove the icon for users that are using that particular <span class="notranslate"> 'Feature List' </span>

![](/images/screen1-phpselector-featuremanager.png)

#### PHP Extensions

**Configuring Alt-PHP modules loading**


<span class="notranslate"> CloudLinux PHP Selector </span> and Alt-PHP can be used in conjunction with <span class="notranslate"> Plesk PHP Selector </span> and <span class="notranslate"> cPanel MultiPHP </span> . To be compatible, <span class="notranslate"> CloudLinux PHP Selector </span> works as follows: modules that are selected in <span class="notranslate"> CloudLinux PHP Selector </span> are loaded for Alt-PHP version selected in <span class="notranslate"> CloudLinux PHP Selector </span> only. For the rest Alt-PHP versions default module set is loaded <span class="notranslate"> ( _/opt/alt/phpXX/etc/php.d/default.ini_ ) </span> . Described above is default behavior.

::: tip Note
If system default PHP version selected in <span class="notranslate"> cPanel MultiPHP Manager is not ea-php, then default module set is loaded for all Alt-PHP versions by default (/opt/alt/phpXX/etc/php.d/default.ini). </span>

When <span class="notranslate"> "php.d.location = selector" option is in effect, modules selected via PHP Selector </span> will be loaded for all alt-php versions.
:::



This behavior is implemented in CageFS-6.1-10 and later.

In <span class="notranslate"> LVE Manager </span> 1.0-9.40+ this behavior can be modified so that modules selected in <span class="notranslate"> CloudLinux PHP Selector </span> would be loaded for all Alt-PHP versions (with CageFS enabled), which can be quite useful if you use  ‘ <span class="notranslate"> per directory </span> ’ or ‘ <span class="notranslate"> per domain </span> ’ Alt-PHP configuration and want to select modules using <span class="notranslate"> CloudLinux PHP Selector </span> .

To modify it, create a file <span class="notranslate"> _/etc/cl.selector/symlinks.rules_ </span> (read-only for regular users) with the following content: <span class="notranslate"> _php.d.location = selector_ </span>

And run the command to apply changes:
<div class="notranslate">

```
/usr/bin/selectorctl --apply-symlinks-rules
```
</div>
To revert to the default behavior:

* Delete <span class="notranslate"> _/etc/cl.selector/symlinks.rules_ </span> file.
* Alternatively remove <span class="notranslate"> _php.d.location_ </span> option from the file.
* Alternatively set <span class="notranslate"> _default_ </span> value for <span class="notranslate"> _php.d.location_ </span> option.

And run the command to apply changes:
<div class="notranslate">

```
/usr/bin/selectorctl --apply-symlinks-rules
```
</div>

#### FFmpeg


Due to possible patent issues CloudLinux does not provide <span class="notranslate"> FFmpeg </span> libraries ( [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html) ). We highly recommend researching if you can legally install <span class="notranslate"> FFmpeg </span> extension on your server. This might differ based on where you and your servers are located. More information can be found on the link: [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html)

For your convenience we provide <span class="notranslate"> FFMPEG PHP </span> binding. For them to work, you need to install <span class="notranslate"> FFmpeg </span> package from the “ <span class="notranslate"> Nux Dextop </span> ” repository following the [instructions](http://li.nux.ro/repos.html).

Once <span class="notranslate"> FFmpeg </span> is installed you can install PHP bindings, by running:
<div class="notranslate">

```
yum install alt-php*ffmpeg 
```
</div>

Enable <span class="notranslate"> PHP-FFmpeg </span> extension via <span class="notranslate"> PHP Selector </span> :
<div class="notranslate">

```
selectorctl --enable-extensions=ffmpeg --user USERNAME --version X.Y
```
</div>

#### Native PHP Configuration


<span class="notranslate"> PHP Selector </span> requires access to the <span class="notranslate"> native PHP </span> version for proper work. It is specified in the file <span class="notranslate"> _/etc/cl.selector/native.conf_ </span> of the following content (example):
<div class="notranslate">

```
php=/usr/bin/php-cgi
php-cli=/usr/bin/php
php.ini=/etc/php.ini
```
</div>

The file is created when installing CageFS on the servers with <span class="notranslate"> cPanel, Plesk, DA, Interworx and ISP Manager </span> , if it is missing. On all other servers the file is not being created at all.

That is why, if the file is not created automatically, then it must be created manually and correct paths must be written to its directives.

Access permission 644 must be set:
<div class="notranslate">

```
chmod 0644 /etc/cl.selector/native.conf
```
</div>

#### Using

Once <span class="notranslate">PHP Selector</span> is installed, you will see the <span class="notranslate">**Selector**</span> tab in the <span class="notranslate">**LVE Manager**</span>.

![](/images/php_selector.png)

<span class="notranslate"> PHP Selector </span> lets you select default PHP version, as well as modules that will be available to user out of the box.


Inside <span class="notranslate"> cPanel </span>, User will be able to change PHP version they would have:

![](/images/php_selector_user.png)

as well as extensions that they want to use:

![](/images/php_selector_customer.png)

and php.ini settings

![](/images/php_selector_options.png)

All changes are saved automatically.

#### Custom PHP.ini options


**[Requires** <span class="notranslate"> **LVE Manager** </span> **0.6+]**

<span class="notranslate"> PHP Selector </span> allows customer to edit php.ini settings. Admin has a full control over which settings can be modified.

To allow settings to be modifiable, it has to be whitelisted in <span class="notranslate"> /etc/cl.selector/php.conf </span>.

Here are some of the examples of allowed directives:
<div class="notranslate">

```
Directive = safe_mode
Default   = Off
Type      = bool
Remark    = <5.4.0
Comment   = Enables PHP safe mode. This mode puts a number of restrictions on scripts (say, access to file system) mainly for security reasons.
```
</div>

<div class="notranslate">

```
Directive = safe_mode_include_dir
Type      = value
Remark    = <5.4.0
Comment   = If PHP is in the safe mode and a script tries to access some files, files from this directory will bypass security (UID/GID) checks. The directory must also be in include_path. For example: /dir/inc
```
</div>

| | |
|-|-|
|Directive | php.ini setting|
|Default | Default value|
|Type | bool, value (any text), list|
|Range | list of values for list Type|
|Comment | explanation of the setting to display in UI|

Default values, that are shown in <span class="notranslate"> PHP Selector </span> web interface, are taken from <span class="notranslate"> '/opt/alt/phpXX/usr/bin/php -i' </span> runtime values, if
directive is not there, it will use ' <span class="notranslate"> default </span> ' value that was set in <span class="notranslate"> php.conf </span> . So, if you wish to change default value of any option for
"alternative" php version, please modify <span class="notranslate"> /opt/alt/phpXX/etc/php.ini </span> files (where XX = 55, 54, 53, etc according to php version).

Admin can modify the settings using <span class="notranslate"> [selectorctl](/php_selector/#selectorctl) </span> command.

Users can use web interface to modify php.ini settings:

![](/images/php_selector_options.png)

#### End user files and directories


The following files and directories are created inside CageFS for each customer:

<span class="notranslate"> /etc/cl.selector </span> - PHP binaries symbolic links.

<span class="notranslate"> /usr/selector/php - Native PHP </span> binaries.

<span class="notranslate"> /etc/cl.php.d/alt-php* </span> - Links to enabled modules.

<span class="notranslate"> /home/user/.cl.selector/alt_phpXX.cfg </span> - Config file for custom PHP options.

like:

<span class="notranslate"> /etc/cl.php.d/alt-php54/fileinfo.ini - /opt/alt/php54/etc/php.d.all/fileinfo.ini </span>


#### Compiling your own extensions


Sometimes you might want to compile your own PHP extension for your users to use. In most cases, it is better to contact our support by sending us a support [ticket](https://cloudlinux.zendesk.com/hc/requests/new) . We will try to provide such extension for you via regular updates within 5-7 days.

If you have decided that you want to build it on your own, you would need to build it for each and every supported version of PHP that you have installed. The module installation process is a bit different from standard - you would need to use the version of phpize and php-config binaries that come with particular <span class="notranslate"> Alt-PHP </span> version.

The full process for PHP 5.X and 7.X looks as follows:

1. Download and unpack extension, cd into it's directory.

2. Execute our version of phpize if necessary:

<div class="notranslate">

```
/opt/alt/phpXX/usr/bin/phpize
```
</div>

3. Execute configure with our binary:

<div class="notranslate">

```
./configure --with-php-config=/opt/alt/phpXX/usr/bin/php-config
```
</div>

4. Make the <span class="notranslate"> .so </span> file:

<div class="notranslate">

```
make
```
</div>

5. Copy it to the modules directory (on 32-bit server, use <span class="notranslate"> usr/lib/php/modules </span> ).

<div class="notranslate">

```
cp -rp modules/*.so /opt/alt/phpXX/usr/lib64/php/modules/
```
</div>

6. Add ini file for module to <span class="notranslate"> `/opt/alt/phpXX/etc/php.d.all` . </span>

7. Register new <span class="notranslate"> Alt-PHP </span> version with:

<div class="notranslate">

```
$ cagefsctl --setup-cl-selector
```
</div>

#### Roll your own PHP


To add your own PHP version in <span class="notranslate"> PHP Selector </span> :

* Create directory in (like:  /opt/alt/php51), and mimic directory structure inside to be similar to the one of PHP versions bundled by <span class="notranslate"> CloudLinux </span> .
* Put all the ini files for all the modules into <span class="notranslate"> /opt/alt/php51/etc/php.d.all </span>
* Create a symbolic link <span class="notranslate"> /opt/alt/php51/etc/php.d -> /etc/cl.php.d/alt-php51 </span>

Place all such files into <span class="notranslate"> /opt/alt/php51/usr/lib/php/modules </span>

Add an absolute path to PHP binaries into <span class="notranslate"> /etc/cl.selector/selector.conf </span> using the following format:

<div class="notranslate">

```
php     5.1 5.1.2 /opt/alt/php51/usr/bin/php-cgi 
php-cli 5.1 5.1.2 /opt/alt/php51/usr/bin/php 
php-fpm 5.1 5.1.2 /opt/alt/php51/usr/sbin/php-fpm
   ^     ^    ^                ^----- absolute path
   |     |    |---------------------- real version
   |     | -------------------------- version to display
   |--------------------------------- binary to 'substitute'
```
</div>

Execute:
<div class="notranslate">

```
cagefsctl --setup-cl-selector
```
</div>

The new PHP version must be available now for selection in <span class="notranslate"> PHP Selector </span> .

#### Detect User's PHP Version


**[** <span class="notranslate"> **LVE Manager** </span> **0.5-63 or higher]**

<span class="notranslate"> PHP Selector </span> provides an easy way to figure out which versions are available and selected for end user from the command line. You can get this information by running:

<div class="notranslate">

```
$ selectorctl --interpreter=php --user-summary --user=USERNAME
```
</div>

<div class="notranslate">

```
The output:
5.2 e - -
5.3 e - s
5.4 e - -
5.5 e - -
native e d -
```
</div>

The first column defines the PHP version. <span class="notranslate"> _Native_ </span> means native PHP version, like the one installed by cPanel with EasyApache.

The second column will contain either <span class="notranslate"> **e** </span> or **-.** If <span class="notranslate"> **e**  </span> is present, it means that given version is enabled, and can be selected by the end user.

The third column can have values <span class="notranslate"> **d**   </span> or **-.** If <span class="notranslate"> **d** </span> is present, that version is considered a 'default' version. Only one PHP version will have **d** indicator.

The fourth column can have values <span class="notranslate"> **s**   </span> or **-.** If <span class="notranslate"> **s** is present, that is the selected version, currently being used by the end user. Only one PHP version will have  <span class="notranslate"> **s** </span>  indicator. </span>

In case a user is not inside CageFS, and as such doesn't use <span class="notranslate"> PHP Selector </span> , you will see the following error message:

<div class="notranslate">

```
ERROR:User USERNAME not in CageFS
```
</div>


#### PHP Selector without CageFS


**[LVE Manager 2.0-11.1 or higher]**

<span class="notranslate"> PHP Selector </span> can now be used with CageFS turned off (in case when there is only one user account on the server).

To install run:
<div class="notranslate">

```
yum groupinstall alt-phpyum install cagefs lvemanager
```
</div>

(no need to initialize or turn on CageFS)

<div class="notranslate">

```
selectorctl --setup-without-cagefs USER
```
</div>

( <span class="notranslate"> USER </span> - the name of a user who is using selector. If not specified, the first available cPanel account username will be used).

When executing <span class="notranslate"> `--setup-without-cagefs` </span> , the following actions are performed:

* Creating symlinks to the user modules and options for each <span class="notranslate"> Alt-PHP </span> version:  
<span class="notranslate"> _/opt/alt/php55/link/conf/alt_php.ini -> /home/USER/.cl.selector/alt_php55.ini_ </span>

* In user home directory creating:  
<span class="notranslate"> _.cl.selector/_ </span>

“Backup” settings files (selected version, modules, options):  
<span class="notranslate"> _.cl.selector/defaults.cfg_ </span>  
<span class="notranslate"> _.cl.selector/alt_php44.cfg_ </span>

Symlinks to the selected version:  
<span class="notranslate"> _.cl.selector/lsphp -> /opt/alt/php44/usr/bin/lsphp_ </span>  
<span class="notranslate"> _.cl.selector/php.ini -> /opt/alt/php44/etc/php.ini_ </span>  
<span class="notranslate"> _.cl.selector/php-cli -> /opt/alt/php44/usr/bin/php_ </span>  
<span class="notranslate"> _.cl.selector/php -> /opt/alt/php44/usr/bin/php-cgi_ </span>  

Additional symlinks for environment variable <span class="notranslate"> $PATH </span> (search path) in the file <span class="notranslate"> ~/.bashrc </span> :  
<span class="notranslate"> _.cl.selector/selector.path/_ </span>  
<span class="notranslate"> _.cl.selector/selector.path/php-cgi -> ../php_ </span>  
<span class="notranslate"> _.cl.selector/selector.path/php -> ../php-cli_ </span>  

Generated ini files with selected modules and options for each version:
<span class="notranslate"> _.cl.selector/alt_php44.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php51.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php52.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php53.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php54.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php55.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php56.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php70.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php71.ini_ </span>  

Symlinks above are being created according to the settings in <span class="notranslate"> ~/.cl.selector/defaults.cfg </span> and <span class="notranslate"> ~/.cl.selector/alt_php44.cfg </span> files (44 - corresponding PHP version), which are storing <span class="notranslate"> PHP Selector </span> settings for the user. These files are usually taken from user home directory backup or when migrating account from another server. Thus, when migrating account from server to server, <span class="notranslate"> PHP Selector </span> settings are saved.

If no <span class="notranslate"> PHP Selector </span> settings backup files are found when running <span class="notranslate"> `selectorctl --setup-without-cagefs` </span> , then default settings from <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> global file are applied (as in selector normal mode). If the file is absent, then native PHP version will be selected for the user.

* The following line: <span class="notranslate"> _PATH=$HOME/.cl.selector/selector.path:$HOME/.cl.selector:$PATH_ </span>

is being added to the user file <span class="notranslate"> _~/.bashrc_   </span>

<span class="notranslate"> Apache </span> PHP handlers settings are not changed.

* Also <span class="notranslate"> `selectorctl --setup-without-cagefs` </span>  command does the following: 

  * Turns off link traversal protection (linksafe);
  * Turns off cagefs service.

To get back to the selector normal mode (“with CageFS”) run:
<div class="notranslate">

```
selectorctl --revert-to-cagefs
```
</div>

(CageFS should be initialized by using <span class="notranslate">`cagefsctl --init`</span> command before running the command above)

This command removes symlinks:  
<span class="notranslate"> _/opt/alt/php55/link/conf/alt_php.ini -> /home/USER/.cl.selector/alt_php55.ini,_ </span>
turns on link traversal protection (linksafe) and cagefs service.


#### Configuring "Global” php.ini options for all Alt-PHP Versions


**[CageFS 6.0-33 or higher, <span class="notranslate"> LVE Manager </span> 2.0-11.2 or higher]**

There is <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, where you can specify values of PHP options that should be applied for all <span class="notranslate"> Alt-PHP </span> versions that are installed on a server. These settings will also be automatically applied to the new <span class="notranslate"> Alt-PHP </span> versions that will be installed later.

Example:  
<span class="notranslate"> _# cat /etc/cl.selector/global_php.ini_ </span>  
<span class="notranslate"> _[Global PHP Settings]_ </span>  
<span class="notranslate"> _date.timezone = Europe/Warsaw_ </span>  
<span class="notranslate"> _error_log = error_log_ </span>  
<span class="notranslate"> _memory_limit = 192M_ </span>  
Sections are ignored. Only name of an option and a value have meaning.

When an option is absent in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, than it is not changed (applied) to php.ini for <span class="notranslate"> Alt-PHP </span> versions.

<span class="notranslate"> date.timezone </span> and <span class="notranslate"> error_log </span> options are handled differently than the others. When these options are not in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, than values for the options will be taken from <span class="notranslate"> "native" </span> php.ini file. And when the option is in php.ini for some <span class="notranslate"> Alt-PHP </span> version already (and its value is not empty), than value from <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> will be NOT applied.


**[CageFS version 6.1.5-1 or later]**

The behavior above is changed for cPanel servers with EasyApache 4. The <span class="notranslate">`/usr/local/lib/php.ini`</span> file is removed for new installations of cPanel v80 and later.

* When <span class="notranslate">`/usr/local/lib/php.ini`</span> file exists, <span class="notranslate">`error_log`</span> and <span class="notranslate">`date.timezone`</span> options will be taken from that <span class="notranslate">`php.ini`</span> file.
* When <span class="notranslate">`/usr/local/lib/php.ini`</span> file does not exist, <span class="notranslate">`error_log`</span> and <span class="notranslate">`date.timezone`</span> options will be taken from the <span class="notranslate">`php.ini`</span> file for system default PHP version selected in MultiPHP Manager.
  
This functionality works when the system default PHP version is <span class="notranslate">`ea-php`</span> only. When the system default PHP version is <span class="notranslate">`alt-php`, `error_log`</span> and <span class="notranslate">`date.timezone`</span> directives will be NOT taken from that <span class="notranslate">`php.ini`</span> file.


To confirm changes (not affecting <span class="notranslate"> "date.timezone" </span> and <span class="notranslate"> "error_log" </span> options) please run:

<div class="notranslate">

```
/usr/sbin/cagefsctl --setup-cl-selector
```
</div>

To confirm changes (including <span class="notranslate"> "date.timezone" </span> and <span class="notranslate"> "error_log" </span> options) please run:

<div class="notranslate">

```
/usr/bin/selectorctl --apply-global-php-ini
```
</div>
or

<div class="notranslate">

```
/usr/sbin/cagefsctl --apply-global-php-ini
```
</div>
(two commands above work the same way).

If you don't want to change <span class="notranslate"> error_log </span> , but want to change <span class="notranslate"> date.timezone </span> , you can execute:

<div class="notranslate">

```
selectorctl --apply-global-php-ini date.timezone
```
</div>

Similarly, command <span class="notranslate"> `selectorctl --apply-global-php-ini error_log` </span> applies <span class="notranslate"> error_log </span> and all other options specified in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, except <span class="notranslate"> date.timezone </span> .

So, you can specify 0, 1 or 2 parameters from the list: <span class="notranslate"> error_log, date.timezone </span>.

Using <span class="notranslate"> `--apply-global-php-ini` </span> without arguments applies all global PHP options including two above.

Example:

<div class="notranslate">

```
selectorctl --apply-global-php-ini error_log
selectorctl --apply-global-php-ini date.timezone
selectorctl --apply-global-php-ini date.timezone error_log
```
</div>

The latter command has the same effect as <span class="notranslate">`/usr/bin/selectorctl --apply-global-php-ini`</span>


### Integration with control panels

This is the list of commands that we use to integrate <span class="notranslate"> PHP Selector </span> with control panels. If you need to integrate <span class="notranslate"> PHP Selector </span> with a custom control panel, you might find all the commands here:

**PHP summary:**

Command:
<div class="notranslate">

```
/usr/bin/selectorctl --summary
```
</div>
Result:
<div class="notranslate">

```
4.4 e -
5.1 e -
5.2 e -
5.3 e -
5.4 e -
5.5 e -
5.6 e -
7.0 e -
7.1 e -
native e d
```
</div>
When native PHP version needs to be displayed:

Command:
<div class="notranslate">

```
/usr/bin/selectorctl --summary --show-native-version
```
</div>

Result:
<div class="notranslate">

```
4.4 e -
5.1 e -
5.2 e -
5.3 e -
5.4 e -
5.5 e -
5.6 e -
7.0 e -
7.1 e -
native(5.6) e d
```
</div>

The first column: PHP version  
The second column: enabled or not ( <span class="notranslate"> e </span> - enabled)  
The third column: if selected as default  ( <span class="notranslate"> d </span> - default)

**Set default version:**
<div class="notranslate">

```
/usr/bin/selectorctl --set-current=_VERSION_
```
</div>

**Disable version:**

<div class="notranslate">

```
/usr/bin/selectorctl --disable-alternative=_VERSION_
```
</div>

**Enable version:**

<div class="notranslate">

```
/usr/bin/selectorctl --enable-alternative=_VERSION_
```
</div>

**List Extensions for a version:**

<div class="notranslate">

```
/usr/bin/selectorctl --list-extensions --version=5.6
```
</div>

Result:
<div class="notranslate">

```
- apc
- bcmath
- big_int
- bitset
- bloomy
~ bz2
- bz2_filter
~ calendar
- coin_acceptor
- crack
~ ctype
+ curl
```
</div>

+: enabled  
~: included in php binary (cannot be disabled)  
-: disabled

**Select Default Extensions (enable comma-separated list of extensions globally for a version):**

<div class="notranslate">

```
/usr/bin/selectorctl --version=5.6 --enable-extensions=pdo,json,mysql
```
</div>

**Deselect Default Extensions (disable comma-separated list of extensions globally for a version):**

<div class="notranslate">

```
/usr/bin/selectorctl --version=5.6 --disable-extensions=pdo,json,mysql
```
</div>

**Replace extensions with comma-separated list of extensions for a version globally:**

<div class="notranslate">

```
/usr/bin/selectorctl --version=5.6 --replace-extensions=pdo,json,mysql
```
</div>

**Select PHP version for a user:**

<div class="notranslate">

```
/usr/bin/selectorctl --set-user-current=_VERSION_ --user=_USER_
```
</div>

**List Enabled extensions for a user:**

<div class="notranslate">

```
/usr/bin/selectorctl --list-user-extensions --user=_USER_ --version=_VERSION_
```
</div>

**Enable comma-separated list of extensions for a user:**

<div class="notranslate">

```
/usr/bin/selectorctl --enable-user-extensions=pdo,json,mysql --user=_USER_ --version=_VERSION_
```
</div>

**Reset user’s extensions to defaults:**

<div class="notranslate">

```
/usr/bin/selectorctl --reset-user-extensions --user=_USER_ --version=_VERSION_
```
</div>

**Replace user extensions with comma-separated list of extensions:**

<div class="notranslate">

```
/usr/bin/selectorctl --replace-user-extensions=EXT_LIST --user=_USER_ --version=_VERSION_
```
</div>

<span class="notranslate"> _EXT_LIST_ </span> _a is comma separated list of PHP extensions (for example:_  <span class="notranslate"> _pdo,json,mysql_ </span> )

**List available options for php.ini editing:**

<div class="notranslate">

```
/usr/bin/selectorctl --print-options --user=_USER_ --version=_VERSION_ [--json]
```
</div>

**List available options for php.ini editing (print safe strings):**

<div class="notranslate">

```
/usr/bin/selectorctl --print-options-safe --user=_USER_ --version=_VERSION_ [--json]
```
</div>

**Set php.ini options for end user:**

<div class="notranslate">

```
/usr/bin/selectorctl --user=_USER_ --version=_VERSION_ --replace-options=_OPTIONS_ --base64 [--json]
```
</div>

Here is an example of how you can generate <span class="notranslate"> _OPTIONS_ in base64 </span> format:

<div class="notranslate">

```
OPTIONS=`echo disable_functions:exec,syslog|base64 -w 0`,`echo display_errors:off|base64 -w 0`,`echo post_max_size:128M|base64 -w 0`
echo $OPTIONS
```
</div>

[cPanel](/php_selector/#cpanel)

#### cPanel

:::tip Note
Requires CageFS 5.5-6.18+
:::

When using EasyApache4 in cPanel, it is possible to change PHP versions for users' domains with <span class="notranslate"> MultiPHP Manager </span> (when PHP is working under <span class="notranslate"> Apache </span> web server). Also it is possible to change system default PHP version with <span class="notranslate"> MultiPHP Manager </span> in WHM.

<span class="notranslate"> MultiPHP Manager </span> in WHM looks as follows:

![](/images/cpanel_integration_zoom57.png)

A user can change PHP version for domain in cPanel interface but can not change System default PHP version.

![](/images/cpanel_integration01.png)

The following <span class="notranslate"> Alt-PHP </span> packages (and higher) provide an ability to select <span class="notranslate"> Alt-PHP </span> version in <span class="notranslate"> MultiPHP Manager </span> :

* alt-php44-4.4.9-71;
* alt-php51-5.1.6-81;
* alt-php52-5.2.17-107;
* alt-php53-5.3.29-59;
* alt-php54-5.4.45-42;
* alt-php55-5.5.38-24;
* alt-php56-5.6.31-7;
* alt-php70-7.0.24-2;
* alt-php71-7.1.10-2;
* alt-php72-7.2.0-0.rc.3.2.

You can remove <span class="notranslate"> Alt-PHP </span> from <span class="notranslate"> cPanel MultiPHP Manager </span> .
To do so set '<span class="notranslate"> _yes_ </span>' or ' <span class="notranslate"> _no_ </span> ' for the <span class="notranslate"> Alt-PHP </span> versions in config file <span class="notranslate"> _/opt/alt/alt-php-config/alt-php.cfg_ </span> and run <span class="notranslate"> _/opt/alt/alt-php-config/multiphp_reconfigure.py_ . </span>
This script manages SCL prefixes for the <span class="notranslate"> Alt-PHP </span> - removes or creates prefixes in <span class="notranslate"> _/etc/scl/prefixes_ . </span>

<div class="notranslate">

```
/opt/alt/alt-php-config/alt-php.cfg
[MultiPHP Manager]
alt-php44 = no
alt-php51 = no
alt-php52 = no
alt-php53 = no
alt-php54 = no
alt-php55 = yes
alt-php56 = yes
alt-php70 = yes
alt-php71 = yes
alt-php72 = yes
```
</div>

::: tip Note
<span class="notranslate"> PHP Selector does not work when Alt-PHP version is selected as system default in MultiPHP Manager. So, all domains will use PHP version selected via MultiPHP Manager. Settings in PHP Selector will be ignored. We recommend to disable PHP Selector </span> in such case.
:::


<span class="notranslate"> PHP Selector </span> works in different ways with EasyApache4 and EasyApache3. CageFS should be enabled for users who use <span class="notranslate"> PHP Selector </span> . The novation is that when using  EasyApache4, actual PHP version used depends on PHP version selected in <span class="notranslate"> MultiPHP Manager </span> . When PHP version chosen for domain in <span class="notranslate"> MultiPHP Manager </span> matches System default PHP version, then <span class="notranslate"> PHP Selector </span> is used to select actual PHP version. If PHP version chosen for domain in <span class="notranslate"> MultiPHP Manager </span> differs from System default PHP version, then PHP version from <span class="notranslate"> MultiPHP Manager </span> is used.

In other words, <span class="notranslate"> PHP Selector </span> deals with changing System default PHP version.

<span class="notranslate"> PHP Selector </span> algorithm for choosing PHP version for domain is as follows:

1. If CageFS is disabled, then <span class="notranslate"> PHP Selector </span> is not active and <span class="notranslate"> MultiPHP Manager PHP </span> version is applied.

2. If CageFS is enabled, then:

2.1. If PHP version chosen in <span class="notranslate"> MultiPHP Manager </span> differs from System default PHP version, then <span class="notranslate"> MultiPHP Manager PHP </span> version is applied.

2.2. If PHP version chosen in <span class="notranslate"> MultiPHP Manager </span> is the same as System default PHP version, then <span class="notranslate"> PHP Selector PHP </span> version is applied:

2.2.1. If <span class="notranslate"> _Native_ </span> option is selected in <span class="notranslate"> PHP Selector </span> , then <span class="notranslate"> MultiPHP Manager PHP version is applied. </span>

2.2.2. If PHP version chosen in <span class="notranslate"> PHP Selector </span> differs from <span class="notranslate"> _Native_ </span> , then <span class="notranslate"> PHP Selector PHP </span> version is applied.

![](/images/cpanel_integration02.png)

![](/images/cpanel_integration03.png)

![](/images/cpanel_integration04.png)

PHP version chosen in <span class="notranslate"> MultiPHP Manager </span> can also be applied to console commands <span class="notranslate"> _/usr/bin/php and /usr/local/bin/php_ . </span> In this case <span class="notranslate"> _.htaccess_ </span> file search is performed in current directory and in parent directories. If the file is found, then PHP version specified in it is applied, if not found, then System default PHP version is applied. System default PHP version can be changed via <span class="notranslate"> PHP Selector </span> .

1. If CageFS is disabled, then <span class="notranslate"> PHP Selector </span> is not active and PHP version from <span class="notranslate"> _.htaccess_ </span> is applied.

2. If CageFS is enabled, then:

2.1. If PHP version specified in <span class="notranslate"> .htaccess </span> file differs from System default, then <span class="notranslate"> _.htaccess_ </span> version is applied.

2.2. If System default PHP version is specified in <span class="notranslate"> _.htaccess_ </span> file, then <span class="notranslate"> PHP Selector </span> version is applied:

2.2.1. If <span class="notranslate"> _Native_ </span> option is chosen in <span class="notranslate"> PHP Selector </span> , then <span class="notranslate"> _.htaccess_ </span> PHP version is applied.

2.2.2. If PHP version chosen in <span class="notranslate"> PHP Selector </span> differs from <span class="notranslate"> _Native_ </span> , then <span class="notranslate">  PHP Selector </span> version is applied.

::: tip Note
cPanel prior to 11.56 does not support hooks to add processing of System default PHP version changes with <span class="notranslate"> MultiPHP Manager. That is why System default PHP version changing is handled by cron job (/etc/cron.d/cagefs_cron file), which executes the command /usr/share/cagefs/setup_multiphp_integration every ten minutes, which means that all System default PHP version changes in MultiPHP Manager </span> are applied in CageFS with 10 minutes delay.
:::

::: tip Note
In cagefs-5.5-6.25 or later, changing of System default PHP version with <span class="notranslate"> MultiPHP Manager </span> will be processed with cPanel WHM hooks.
:::

**PHP Modules**

The set of PHP modules depends on PHP version used for domain or console. If <span class="notranslate"> PHP Selector </span> is active and <span class="notranslate"> Alt-PHP </span> version is chosen, then modules chosen for this <span class="notranslate"> Alt-PHP </span> version in <span class="notranslate"> PHP Selector </span> are used. If <span class="notranslate"> PHP Selector </span> is not active, then modules for PHP version chosen in cPanel MultiPHP are used.

**PHP Options**

cPanel has <span class="notranslate"> MultiPHP INI Editor </span> available in WHM and in cPanel user interface.

<span class="notranslate"> MultiPHP INI Editor </span> allows setting PHP options for any PHP version globally for all domains and users. At this point <span class="notranslate">`/opt/cpanel/ea-php56/root/etc/php.d/local.ini`</span> file is generated and options values are written into this file. Such options have higher priority than the options set in <span class="notranslate"> MultiPHP INI Editor </span> in cPanel user interface. <span class="notranslate"> MultiPHP INI Editor </span> allows to set PHP options in <span class="notranslate"> Basic Mode </span> (simplified interface) and in <span class="notranslate"> Editor Mode </span>.

<span class="notranslate"> MultiPHP INI Editor </span> in WHM looks as follows:

![](/images/cpanel_integration05_zoom67.png)

![](/images/cpanel_integration06_zoom67.png)

:::tip Note
cPanel prior to 11.56 does not support hooks to add processing of INI options changing for PHP version with <span class="notranslate"> MultiPHP INI Editor in cPanel WHM. That is why for now the processing of PHP version changing is handled bycron job (/etc/cron.d/cagefs_cron file) which performs the command /usr/share/cagefs/ setup_multiphp_integration every 10 minutes, which means that INI options changes for PHP version in MultiPHP INI Editor </span> in cPanel WHM are being applied with up to 10 minutes delay.
:::

::: tip Note
In cagefs-5.5-6.25 or later, INI options changes for PHP version in <span class="notranslate"> MultiPHP INI Editor </span> in cPanel WHM will be processed by cPanel WHM hooks.
:::

MultiPHP INI Editor in cPanel user interface allows setting options for _php.ini_ files in user home directory or in domain docroot. Changes are applied immediately without delay.

These options priority is lower than ones specified in <span class="notranslate"> MultiPHP INI Editor </span> WHM interface. <span class="notranslate"> MultiPHP INI Editor </span> in cPanel user interface looks as follows

![](/images/cpanel_integration07.png)

![](/images/cpanel_integration08.png)

If <span class="notranslate"> PHP Selector </span> is active, then options set in <span class="notranslate"> PHP Selector </span> are applied, and such options have higher priority than options in custom _php.ini_ file in domain docroot. If <span class="notranslate"> PHP Selector </span> is disabled, then options set in <span class="notranslate"> MultiPHP INI Editor </span> are applied.

**QUIRKS:** When changing System default PHP version, administrator should take into consideration the following quirk. For example, if a user has chosen PHP 5.3 for domain and System default PHP version is PHP 5.5, then <span class="notranslate"> PHP Selector </span> will not be used for user domain. In this case, if administrator switches System default PHP version from 5.5 to 5.3, then <span class="notranslate"> PHP Selector </span> will be activated for user domain and PHP version chosen in <span class="notranslate"> PHP Selector </span> will be applied for domain.

That is why it is recommended for administrator to avoid changing System default PHP version to PHP version that is already used by users. At the same time it is recommended for users to choose inherit for domain and use <span class="notranslate"> PHP Selector </span> to choose PHP version. In this case PHP version chosen in <span class="notranslate"> PHP Selector </span> will be always applied for domain.

### Command-line tools

| | |
|-|-|
|<span class="notranslate"> /usr/bin/cl-selector </span>  | Tool is used to select version of PHP interpreter inside CageFS. Note. The command is obsolete, please use <span class="notranslate"> [selectorctl](/php_selector/#selectorctl) </span> instead.|
|<span class="notranslate"> /usr/bin/alt-php-mysql-reconfigure.py </span> | Reconfigures <span class="notranslate"> alt-php </span> extensions to use correct MySQL library, based on the one installed in the system.|


#### selectorctl


<span class="notranslate"> selectorctl </span> is a new tool that replaces <span class="notranslate"> cl-selector </span> (which is deprecated and should not be used anymore) and <span class="notranslate"> piniset </span> . It is available starting with **CageFS 5.1.3** .

All new features will be implemented as part of <span class="notranslate"> selectorctl </span> .

**Common Options**

| | |
|-|-|
|<span class="notranslate"> --interpreter (-i) </span> : | chooses the interpreter to work with. Currently only PHP is supported. If omitted, <span class="notranslate"> --interpreter=php </span> is implied.|
|<span class="notranslate"> --version (-v) </span> : | specifies alternatives version to work with|
|<span class="notranslate"> --user (-u) </span> : | specifies user to take action upon.|
|<span class="notranslate"> --show-native-version (-V) </span> : | prints the version of native interpreter|

**Global Options**

The global options modify settings in <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> file.

| | |
|-|-|
|<span class="notranslate"> --list (-l) </span> : | lists all available alternatives for an interpreter. For instance on server with Alt-PHP installed, it produces the following output. Columns are: short alternative version, full alternative version and path to php-cgi binary. |
| |<span class="notranslate"> $ selectorctl --list <br>5.2 5.2.17 /opt/alt/php52/usr/bin/php-cgi <br>5.3 5.3.28 /opt/alt/php53/usr/bin/php-cgi <br>5.4 5.4.23 /opt/alt/php54/usr/bin/php-cgi <br>5.5 5.5.7 /opt/alt/php55/usr/bin/php-cgi </span>|
|<span class="notranslate"> --summary (-S) </span> : | prints alternatives state summary. Output format: alternative version, state ('e' for 'enabled', '-' otherwise), chosen as default one or not ('d' for 'default', '-' otherwise). For example:| 
| |<span class="notranslate"> $ selectorctl --summary <br>5.2 e - <br>5.3 e - <br>5.4 e - <br>5.5 e - <br>native e d </span>|
| |if used with <span class="notranslate"> `--show-native-version` </span> displays version for native interpreter:|
| |<span class="notranslate"> $ selectorctl --summary --show-native-version <br>5.2 e - <br>5.3 e - <br>5.4 e - <br>5.5 e - <br>native(5.3) e d </span>|
|<span class="notranslate"> --current (-C) </span> : | prints currently globally selected default version (it is stored in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file):|
| |<span class="notranslate"> $ selectorctl --current <br>native native /usr/bin/php </span>|
| |If used with <span class="notranslate"> `--show-native-version` </span> , native interpreter version is displayed as well:|
| |<span class="notranslate"> --current --show-native-version <br>native(5.3) native(5.3.19) /usr/bin/php </span> |
|<span class="notranslate"> --set-current (-B): </span>  | sets specified version as globally default one (in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file). For example, to set current default version of PHP to 5.4, use:|
| |<span class="notranslate"> $ selectorctl --set-current=5.4 </span>|
|<span class="notranslate"> --disable-alternative (-N): </span> | adds <span class="notranslate"> state=disabled </span> option to alternative section. With it a corresponding alternative gets removed from user alternatives selection list. For instance to disable PHP 5.2, run:|
| |<span class="notranslate"> $ selectorctl --disable-alternative=5.2 </span>|
|<span class="notranslate"> --enable-alternative (-Y): </span> | Enables alternative version, removes <span class="notranslate"> state=disabled </span> option, if present, from alternative section. For example to enable PHP 5.2:|
| |<span class="notranslate"> $ selectorctl --enable-alternative=5.2 </span>|
|<span class="notranslate"> --enable-extensions (-E): </span> | enables extensions for particular PHP version by adding comma-separated list of extensions of modules for alternative in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> . Requires <span class="notranslate"> --version </span> option. For example:|
| |<span class="notranslate"> $ selectorctl --enable-extensions=pdo,phar --version=5.2 </span>|
|<span class="notranslate"> --disable-extensions (-D): </span>  | removes extensions for a particular PHP version. Comma-separated list of extensions will be removed from <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> . Requires <span class="notranslate"> --version </span> . Example:|
| |<span class="notranslate"> $ selectorctl --disable-extensions=pdo,phar --version=5.2 </span>|
|<span class="notranslate"> --replace-extensions (-R): </span> | replaces all extensions for particular PHP version to the list of comma separated extensions. Requires <span class="notranslate"> `--version`  option </span> . Example:|
| |<span class="notranslate"> $ selectorctl --replace-extensions=pdo,phar --version=5.2 </span>|
|<span class="notranslate"> --list-extensions (-G): </span> | lists extensions for an alternative for a particular version. Requires <span class="notranslate"> --version </span> . Example:|
| |<span class="notranslate"> $ selectorctl --list-extensions --version=5.3 <br>~ xml <br>- xmlreader <br>- xmlrpc <br>- xmlwriter <br>- xrange <br>+ xsl </span>|
| |Plus sign (+) stands for 'enabled', minus (–) for 'disabled', tilde (~) means compiled into interpreter. Enabled and disabled state relates to presence in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file.|

**End User Options**

All end-user settings are contained in individual user's alt_php.ini files and controlled using selectorctl command.

| | |
|-|-|
|<span class="notranslate"> --user-summary (-s): </span>  | prints user alternatives state summary. Example:|
| |<span class="notranslate"> $ selectorctl --user-summary --user=user1 <br>5.2 e - - <br>5.3 e - - <br>5.4 e - - <br>5.5 e - - <br>native e d s </span>|
| |Columns are: alternative version, state ('e' for 'enabled', '-' otherwise), chosen as default one or not('d' for 'default', '-' otherwise), selected as user default one or not ('s' for 'selected', '-' otherwise). If used with <span class="notranslate"> `--show-native-version` </span> , version for native interpreter is shown in parenthesis:|
| |<span class="notranslate"> $ selectorctl --user-summary --user=user1 --show-native-version <br>5.2 e - - <br>5.3 e - - <br>5.4 e - - <br>5.5 e - - <br>native(5.3) e d s </span>|
| |<span class="notranslate"> `--user` </span> option is required. |
|<span class="notranslate"> --current (-c): </span> | prints currently globally selected default version (in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file):|
| |<span class="notranslate"> $ selectorctl --current <br>5.3 5.3.28 /opt/alt/php53/usr/bin/php-cgi </span>|  
| |If used with <span class="notranslate"> `--show-native-version` </span> to display native version:|
| |<span class="notranslate"> $ selectorctl --user-current --user=user1 <br>5.3 5.3.28 /opt/alt/php53/usr/bin/php-cgi </span>| 
| |<span class="notranslate"> `--user` </span> option is required.|
|<span class="notranslate"> --set-user-current (-b): </span> | sets specified version as the one to use for this end user:|
| |<span class="notranslate"> $ selectorctl --set-user-current=5.4 --user=user1 </span>|
| |changes user symlinks for the PHP interpreter to point to alternative 5.4.|
| |<span class="notranslate"> --user </span> option is required.|
|<span class="notranslate"> --enable-user-extensions (-e): </span> | Enables comma-separated list of extensions for the user user. Information is saved to <span class="notranslate"> _alt_php.ini_ </span> file. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --enable-user-extensions=pdo,phar --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --disable-user-extensions (-d): </span> | Disables extensions provided as comma-separated list. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --disable-user-extensions=pdo,phar --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --replace-user-extensions (-r): </span> | Replaces extensions with a provided comma-separated list of extensions Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options:|
| |<span class="notranslate"> $ selectorctl --replace-user-extensions=pdo,phar --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --reset-user-extensions (-t): </span> | Resets extensions for end user to default list of extensions as defined in <span class="notranslate"> default.cfg </span> . Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --reset-user-extensions --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --list-user-extensions (-g): </span> | lists enabled user extensions for an alternative. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --list-user-extensions --version=5.3 --user=user1 <br>xml <br>xmlreader <br>xmlrpc </span>|
| |if <span class="notranslate"> `--all` </span> option present, command will list all alternatives extensions marked enabled or disabled for given user. For example:|
| |<span class="notranslate"> $ selectorctl --list-user-extensions --version=5.3 --user=user1 --all <br>- xmlreader <br>- xmlrpc <br>- xmlwriter <br>- xrange <br>+ xsl </span>|
| |Plus sign (+) stands for 'enabled', minus (–) stands for 'disabled'. Enabled and disabled state relates to presence or absence of corresponding extensions in user <span class="notranslate"> _alt_php.ini_ </span> file.|
|<span class="notranslate"> --add-options (-k): </span> | adds options (as in <span class="notranslate"> _php.ini_ </span> ) to user <span class="notranslate"> _alt_php.ini_ </span> file. For example:|
| |<span class="notranslate"> $ selectorctl --add-options=log_errors:on,display_errors:on --version=5.2 --user=user1 </span>
| |adds <span class="notranslate"> `log_error` </span> and <span class="notranslate"> `display_errors` </span> options with values <span class="notranslate"> 'on' </span> to user <span class="notranslate"> _alt_php.ini_ </span> file overwriting default values for a user. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
|<span class="notranslate"> --replace-options (-m): </span> | replaces all options in user <span class="notranslate"> _alt_php.ini_ </span> file with specified ones. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --replace-options=log_errors:on,display_errors:on --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --delete-options (-x): </span> | removes custom options from user <span class="notranslate"> _alt_php.ini_ </span> file. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --delete-options=log_errors,display_errors --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --print-options (-P): </span> | print options from <span class="notranslate"> _/etc/cl.selector/php.conf_ </span> file with default values or ones overwritten in user's <span class="notranslate"> _alt_php.ini_ </span> file.|
| |<span class="notranslate"> $ selectorctl --print-options --version=5.2 --user=user1 <br>TITLE:allow_url_fopen <br>DEFAULT:On <br>COMMENT:Allows PHP file functions to retrieve data from remote <br>locations over FTP or HTTP. This option is a great security risk, <br>thus do not turn it on without necessity. <br>TYPE:bool <br>... </span>|
| |Requires <span class="notranslate"> `--user`   </span> option. <span class="notranslate"> `--version` </span> option is optional. When <span class="notranslate"> `--version` </span> is omitted, options for current selected version will be printed. By default outputs as plain test. If <span class="notranslate"> `--json` ,  `--csv` ,  `--perl` </span> is specified, outputs data in corresponding format. For example, with <span class="notranslate"> `--perl` </span> option, the output is perl hash structure that can be evaluated. |
|<span class="notranslate"> --reset-options (-z): </span> | removes custom options from <span class="notranslate"> _alt_php.ini_ </span> files for ALL users and versions. Backup files in home folders are cleared.|
| |<span class="notranslate"> $ selectorctl --reset-options </span>|
| |The ranges of affected customers or versions can be narrowed with <span class="notranslate"> `--version` </span> or <span class="notranslate"> `--user`  options </span> :|
| |<span class="notranslate"> $ selectorctl --reset-options --user=user1,user2 --version=5.3,5.4 </span>|
|<span class="notranslate"> --list-users (-L): </span> | list users that use particular version of interpreter, specified with <span class="notranslate"> `--version` </span> option. For example, to see all users that use PHP version 5.3:|
| |<span class="notranslate"> $ selectorctl --list-users --version=5.3 </span>|
|<span class="notranslate"> --change-to-version (-T): </span> | changes all (or particular user) from one interpreter version to another.|
| |<span class="notranslate"> $ selectorctl --change-to-version=5.2 --version=5.3 </span>|

**Additional Options**

| | |
|-|-|
|<span class="notranslate"> --base64 (-Q) </span> | Sometimes PHP options values can contain commas and other symbols that break command line formatting. In such a case convert a <span class="notranslate"> key:value </span> pair into <span class="notranslate"> base64 </span> and pass it as value for option-related arguments. For example, to add <span class="notranslate"> disable_functions=exec,popen,system </span> and <span class="notranslate"> display_errors=on </span> to user options, do the following:|
| |<span class="notranslate"> $ selectorctl --add-options=`echo disable_functions:exec,popen,system|base64 -w 0`,`echo display_errors:on|base64 -w 0` --version=5.2 --user=user1 --base64 </span>|
| |Option <span class="notranslate"> `-w 0`   </span> of <span class="notranslate"> base64 </span> executable stands for <span class="notranslate"> 'disable wrapping of lines' </span> . Without it <span class="notranslate"> base64 </span> output will break the command. |
|<span class="notranslate"> --quiet </span> | makes <span class="notranslate"> selectorctl </span> continue when it encounter option not found in <span class="notranslate"> _php.conf_ </span> . Without it <span class="notranslate"> selectorctl </span> exits with error.|

### Bundled PHP Extensions


Large number of PHP extensions are bundled with each version of PHP:

* [PHP 4.4](/php_selector/#php-4-4-extensions)
* [PHP 5.1](/php_selector/#php-5-1-extensions)
* [PHP 5.2](/php_selector/#php-5-2-extensions)
* [PHP 5.3](/php_selector/#php-5-3-extensions)
* [PHP 5.4](/php_selector/#php-5-4-extensions)
* [PHP 5.5](/php_selector/#php-5-5-extensions)
* [PHP 5.6](/php_selector/#php-5-6-extensions)
* [PHP 7.0](/php_selector/#php-7-0-extensions)
* [PHP 7.1](/php_selector/#php-7-1-extensions) 
* [PHP 7.2](/php_selector/#php-7-2-extensions)
* [PHP 7.3](/php_selector/#php-7-3-extensions)


#### PHP 4.4 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|bcmath <br>bz2 <br>calendar <br>ctype <br>curl <br>dba <br>dbase <br>dbx <br>domxml <br>exif <br>fileinfo | ftp <br>gd <br>gettext <br>gmp <br>iconv <br>imap <br>interbase <br>ioncube_loader <br>ioncube_loader_4 <br>json <br>ldap  | mbstring <br>mcrypt <br>mhash <br>mysql <br>ncurses <br>odbc <br>openssl <br>overload <br>pcntl <br>pcre <br>pgsql  | posix <br>pspell <br>readline <br>recode <br>session <br>shmop <br>snmp <br>sockets <br>sourceguardian <br>standard <br>sybase_ct <br>sysvmsg  | sysvsem <br>sysvshm <br>tokenizer <br>wddx <br>xml <br>xmlrpc <br>zlib|
</div>

#### PHP 5.1 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|bcmath <br>big_int <br>bitset <br>bz2 <br>bz2_filter <br>calendar <br>coin_acceptor <br>crack <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dom <br>doublemetaphone <br>exif <br>ftp <br>gd <br>geoip | gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>huffman <br>iconv <br>idn <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>ioncube_loader <br>ioncube_loader_4 <br>ldap <br>libxml  | lzf <br>mbstring <br>mcrypt <br>memcache <br>msgpack <br>mysql <br>mysqli <br>ncurses <br>odbc <br>openssl <br>pcntl <br>pcre <br>pdo <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite  | pgsql <br>posix <br>pspell <br>quickhash <br>radius <br>readline <br>redis <br>reflection <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>ssh2 <br>standard <br>stats  | stem <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>translit <br>wddx <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>zlib |
</div>

#### PHP 5.2 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apc <br>apm <br>ares <br>bcmath <br>bcompiler <br>big_int <br>bitset <br>bloomy <br>bz2 <br>bz2_filter <br>calendar <br>coin_acceptor <br>crack <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eaccelerator <br>enchant <br>exif <br>ffmpeg <br>fileinfo <br>filter | ftp <br>gd <br>gender <br>geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>hidef <br>htscanner <br>huffman <br>iconv <br>idn <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>json <br>ldap <br>libxml <br>lzf  | magickwand <br>mailparse <br>mbstring <br>mcrypt <br>memcache <br>memcached <br>mhash <br>mongo <br>msgpack <br>mssql <br>mysql <br>mysqli <br>ncurses <br>oauth <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite  | pgsql <br>phar <br>posix <br>pspell <br>quickhash <br>radius <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite <br>ssh2 <br>standard <br>stats <br>stem <br>stomp  | suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>translit <br>uploadprogress <br>uuid <br>wddx <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaf <br>yaz <br>zend_optimizer <br>zip <br>zlib|
</div>

#### PHP 5.3 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apc <br>apcu <br>apm <br>ares <br>bcmath <br>bcompiler <br>big_int <br>bitset <br>bloomy <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>clamav <br>coin_acceptor <br>core <br>crack <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eaccelerator <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo| filter <br>ftp <br>functional <br>gd <br>gender <br>geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>hidef <br>htscanner <br>http <br>huffman <br>iconv <br>idn <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>jsmin <br>json <br>ldap <br>libevent <br>libxml <br>lzf | magickwand <br>mailparse <br>mbstring <br>mcrypt <br>memcache <br>memcached <br>mhash <br>mongo <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pgsql <br>phalcon <br>phar  | posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br>suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem| sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaf <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq|
</div>

#### PHP 5.4 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apc <br>apcu <br>apm <br>ares <br>bcmath <br>big_int <br>bitset <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>clamav <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eaccelerator <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br>filter <br>ftp <br>functional <br>gd | gender <br>geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>hidef <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>jsmin <br>json <br>ldap <br>libevent <br>libsodium <br>libxml <br>lzf <br>magickwand <br>mailparse <br>mbstring| mcrypt <br>memcache <br>memcached <br>mhash <br>mongo <br>mongodb <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pgsql <br>phalcon <br>phar  | posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br>suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy | timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaf <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq|
</div>

#### PHP 5.5 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>apm <br>ares <br>bcmath <br>big_int <br>bitset <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>clamav <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip | gettext <br>gmagick <br>gmp <br>gnupg <br>gRPC <br>haru <br>hash <br>hidef <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>jsmin <br>json <br>ldap <br>libevent <br>libsodium <br>libxml <br>lzf <br>magickwand <br>mailparse <br>mbstring <br>mcrypt | memcache <br>memcached <br>mhash <br>mongo <br>mongodb <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pgsql | phalcon <br>phalcon3 <br>phar <br>posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br>suhosin | sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaf <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq |
</div>

#### PHP 5.6 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>apm <br>ares <br>bcmath <br>big_int <br>bitset <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dbx <br>dom <br>doublemetaphone <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip <br>gettext | gmagick <br>gmp <br>gnupg <br>gRPC <br>haru <br>hash <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>jsmin <br>json <br>ldap <br>libevent <br>libsodium <br>libxml <br>lzf <br>mailparse <br>mbstring <br>mcrypt <br>memcache <br>memcached <br>mhash | mongo <br>mongodb <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pgsql <br>phalcon <br>phalcon3 | phar <br>posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp | suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq|
</div>

#### PHP 7.0 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>bcmath <br>bitset <br>brotli <br>bz2 <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dom <br>eio <br>enchant <br>exif <br>fileinfo <br>filter <br>ftp <br>gd <br>gender | geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br>gRPC <br>hash <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>json <br>ldap <br>libsodium <br>libxml <br>lzf <br>mailparse <br>mbstring <br>mcrypt | memcached <br>mongodb <br>mysqli <br>mysqlnd <br>nd_mysqli <br>nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql <br>phalcon3 <br>phar | posix <br>propro <br>pspell <br>raphf <br>rar <br>readline <br>redis <br>reflection <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>sqlite3 <br>sqlsrv <br>ssh2 <br>standard <br>stats <br>suhosin <br>sysvmsg | sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaml <br>yaz <br>zip <br>zlib <br>zmq|
</div>

* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span>.


#### PHP 7.1 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>bcmath <br>brotli <br>bz2 <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dom <br>eio <br>enchant <br>exif <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip <br>gettext | gmagick <br>gmp <br>gnupg <br>gRPC <br>hash <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>json <br>ldap <br>libsodium <br>libxml <br>lzf <br>mailparse <br>mbstring <br>mcrypt <br>memcached | mongodb <br>mysqli <br>mysqlnd <br>nd_mysqli <br>nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql <br>phalcon3 <br>phar  | posix <br>propro <br>pspell <br>raphf <br>rar <br>readline <br>redis <br>reflection <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>sqlite3 <br>sqlsrv <br>ssh2 <br>standard <br>stats <br>suhosin <br>sysvmsg | sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaml <br>zip <br>zlib <br>zmq|
</div>

* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span>.

#### PHP 7.2 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>bcmath <br>brotli <br>bz2 <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dom <br>eio <br>enchant <br>exif <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip <br>gettext | gmagick <br>gmp <br>gnupg <br>gRPC <br>hash <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>json <br>ldap <br>libxml <br>lzf <br>mailparse <br>mbstring <br>memcached <br>mongodb | mysqli <br>mysqlnd <br>nd_mysqli <br>nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql <br>phalcon3 <br>phar | posix <br>propro <br>pspell <br>raphf <br>readline <br>redis <br>reflection <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>spl <br>sqlite3 <br>sqlsrv <br>ssh2 <br>standard <br>stats <br>sysvmsg <br>sysvsem | sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaml <br>zip <br>zlib <br>zmq|
</div>

* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span>.


#### PHP 7.3 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>bcmath <br>dba <br>dbase <br>dom <br>eio <br>enchant <br>fileinfo <br>gd <br>gender <br>geoip <br>gmagick <br>gnupg <br>grpc <br>http  | igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>json <br>ldap <br>lzf <br>mailparse <br>mbstring <br>memcached <br>mongodb <br>mysqlnd <br>nd_mysqli | nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_oci <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql | phar <br>posix <br>propro <br>pspell <br>raphf <br>redis <br>snmp <br>soap <br>sockets <br>sqlsrv <br>ssh2 <br>stats <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy | timezonedb <br>trader <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xdebug <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaf <br>yaml <br>zip <br>zmq|
</div>

* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span>.

## Python Selector
### General information and requirements
### Installation and update
### Uninstalling
### Configuration
### Integration with control panels
### Command-line tools
### Troubleshooting
## Ruby Selector
### General information and requirements

We have the ability to deploy <span class="notranslate">Ruby</span> applications via application server. <span class="notranslate">Ruby Selector</span> uses <span class="notranslate">`mod_passenger`</span> to host <span class="notranslate">Ruby</span>.

This feature is available for CloudLinux 6 or later. It supports only cPanel servers.

You can find a list of supported <span class="notranslate">alt-ruby</span> versions using the following commands.

<div class="notranslate">
For alt-ruby:

```
yum grouplist | grep alt-ruby
```
</div>


### Installation and update

::: tip Note
The instructions below are suitable only for EasyApache 3 and EasyApache 4. You should follow [this instruction](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:cloudlinux:enable_ruby_python_selector) if you use LiteSpeed.
:::

To use <span class="notranslate"> Ruby Selector </span> install alternative <span class="notranslate"> Ruby </span> packages:
<div class="notranslate">

```
yum groupinstall alt-ruby 
```
</div>

To use MySQL database you should install <span class="notranslate"> alt-python27-devel </span> package:
<div class="notranslate">

```
yum install alt-python27-devel
```
</div>

::: tip Note
After installation, please make sure that you have unmarked appropriate checkboxes in <span class="notranslate"> LVE Manager Options </span> tab to show <span class="notranslate"> Ruby App </span> in web-interface. Find the instructions on the [link](/python_and_ruby_selector/#hide-python-and-ruby-selector-icons).
:::

::: tip Note
Adding <span class="notranslate">Ruby modules requires executing permissions to gcc/make binaries. Please enable compilers in Compiler Access section of WHM, then run: cagefsctl --force-update </span>
:::

### Configuration and using

#### End User Access


1. In the <span class="notranslate">Software/Services</span> area choose <span class="notranslate">Select Ruby Environment</span>.

![](/images/clip000133.jpg)


2. Create project form will appear. Choose interpreter version for your application, application folder name (project path) and <span class="notranslate"> URI </span> for accessing your application. Click <span class="notranslate"> “Create project” </span> to create an application.

![](/images/clip000233.jpg)

After a little while a new application entry will be appended to the web-page.

![](/images/clip000255.jpg)

3. You can edit path (folder name of the project in the home directory, for example, <span class="notranslate"> _/home/clman1/project_name_ </span> ), <span class="notranslate"> uri </span> for application, <span class="notranslate"> wsgi </span> handler. If you click <span class="notranslate"> Edit </span> - the value is converted to input field and thus becomes editable. When editing is complete, click <span class="notranslate"> Save </span> .

![](/images/clip000256.jpg)

4. <span class="notranslate"> Wsgi </span> entry is to specify <span class="notranslate"> python wsgi </span> application entry point. It must be specified as filename, must be callable and separated by colon. If your app is running from file <span class="notranslate"> flask/run.py </span> by calling callable app, set <span class="notranslate"> flask/run.py:app </span> .

![](/images/clip000257.jpg)

5. When <span class="notranslate"> Show </span> control is clicked, <span class="notranslate"> ruby </span> extensions section will be expanded. It gives the ability to add or remove <span class="notranslate"> ruby </span> modules. When start typing in input field, appropriate hints are shown in drop-down list. Choose the entry you want from drop-down and click <span class="notranslate"> Add </span> .

![](/images/clip000261.jpg)

If you click <span class="notranslate"> Delete</span>, the corresponding module entry will disappear.

In addition to setting <span class="notranslate"> path, uri </span> and <span class="notranslate"> wsgi </span> , the interpreter version can be changed as well by changing the value in select drop-down.

6. No changes are applied to application environment until <span class="notranslate"> Update </span> button is clicked. Before the <span class="notranslate"> Update </span> button is clicked, all changes can be reverted with <span class="notranslate"> Reset </span> button.

The newly created application will be supplied with <span class="notranslate"> stub </span> only. A real application ought to be put into application folder. After application is placed into application folder, the <span class="notranslate"> wsgi </span> parameter can be set.

Click <span class="notranslate"> Remove </span> to delete the application - the application folder itself will remain unmoved.

:::tip Note
For <span class="notranslate"> LVE Manager </span> version 0.9-10 and higher
:::

When creating an application you can use the key <span class="notranslate"> --domain </span> , which attaches application to domain. If <span class="notranslate"> --domain </span> key is not specified, then the main users domain will be used by default.

To create application run:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<python|ruby> --version=VERSION[--user=USER] [--domain=DOMAIN] [--print-summary] [--json]–-create-webapp <FOLDER_NAME> <URI>
```
</div>
When changing application <span class="notranslate"> URI, --domain </span> key can be used simultaneously, in this case not only <span class="notranslate"> URI </span> will be changed, but also the application domain.

To change application <span class="notranslate"> URI </span> run:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER][--domain=NEW_DOMAIN] [--print-summary] [--json] --transit-webapp<FOLDER_NAME> <NEW_URI> 
```
</div>
The possibility to choose domain when creating an application was added to web interface as well.

![](/images/webapp001_zoom94.png)

Also, you can run simple commands from web interface (e.g. you can install packages from specific repositories or control web applications by means of <span class="notranslate"> django </span> -admin).

![](/images/webapp002_zoom93.png)

#### Hide Ruby Selector Icon


It is possible to hide or show <span class="notranslate">Ruby Selector</span> icon by marking or unmarking proper checkboxes in <span class="notranslate"> LVE Manager _Options_</span> tab.

![](/images/CL-hide-python-ruby.png)


The same result can be accomplished in CLI by running:

<div class="notranslate">

```
cloudlinux-config set --json --data '{"options":{"uiSettings":{"hideRubyApp":false, "hidePythonApp":false}}}'
```
</div>
 
:::tip Note
If you are using cPanel/WHM, you can also configure hide/show <span class="notranslate">CloudLinux Ruby Selectors</span> in <span class="notranslate">WHM | Feature Manager</span>.
For that, you’d need to first uncheck <span class="notranslate">`Hide Python App in web-interface`</span> in the <span class="notranslate">LVE Manager</span>. This will make the menu appear for all accounts. After that, you are free to disable this app in <span class="notranslate">WHM | Feature Manager</span> for the required feature lists. 
:::

#### Deploying Redmine using Ruby Selector

::: tip Note
Provided instructions are valid for older <span class="notranslate"> Redmine </span> version 2.6.0. New versions guide could be found at [http://kb.cloudlinux.com/2016/12/how-to-run-redmine-with-ruby-selector/](http://kb.cloudlinux.com/2016/12/how-to-run-redmine-with-ruby-selector/)
:::

1. In cPanel create MySQL database and add user to it. In the example given, the databace <span class="notranslate"> _redminet_redmine_ </span> was created and user <span class="notranslate"> _redminet_redmine_ </span> was added.

2. In <span class="notranslate"> **Setup Ruby App** </span> section create an application.

<span class="notranslate"> App Directory </span> is the directory where all static files will be placed ( _e.g._ <span class="notranslate"> _redmine_ </span> ).
<span class="notranslate"> App URI </span> is web-interface URL ( _e.g._ <span class="notranslate"> _redmine_ </span> _web-interface will be located in_ <span class="notranslate"> _YOUR_DOMAIN/redmine_ </span> ).

![](/images/hmfile_hash_f8216d04.png)

3. After the application was created, add the following modules:
<span class="notranslate"> bundle, i18n#0.6.11, builder#3.0.4, rails#3.2.19, mime-types#1.25.1, mocha#1.0.0, jquery-rails#3.1.2, coderay, fastercsv, request_store, rbpdf, mysql2, selenium-webdriver, rmagick, shoulda#3.3.2, ruby-openid#2.3.0, request_store#1.0.5, capybara#2.1.0, net-ldap#0.3.1, rack-openid, shoulda-matchers#1.4.1, redcarpet#2.3.0, yard, rake#10.4.2, bigdecimal. </span>


![](/images/hmfile_hash_54c4ccdb.png)

**Note** : If error occurs while installing <span class="notranslate"> rmagic </span> module, then you need to install <span class="notranslate"> ImageMagick-devel </span> package on your server:
<div class="notranslate">

```
yum install ImageMagick-devel
```
</div>
The installation process takes quite along time, about 7-8 minutes. When done, click <span class="notranslate"> Restart </span> button to restart the application.

![](/images/hmfile_hash_880db2aa.png)
![](/images/hmfile_hash_553ab55c.png)

3.1 Alternatively, after the application was created, you can add only one module - <span class="notranslate"> bundle </span> .

![](/images/redmine_selector_1.png)

![](/images/redmine_selector_2.png)

4. Enter the server via SSH, using your cPanel account.

Download the application [http://www.redmine.org/projects/redmine/wiki/Download](http://www.redmine.org/projects/redmine/wiki/Download) .

In the description given, the latest version <span class="notranslate"> Redmine </span> (2.6.0) is assumed.

[http://www.redmine.org/releases/redmine-2.6.0.tar.gz](http://www.redmine.org/releases/redmine-2.6.0.tar.gz)
<span class="notranslate"> tar xzf redmine-2.6.0.tar.gz </span>

Hereinafter <span class="notranslate"> 'redmine' </span> is <span class="notranslate"> App Directory </span> meaning which was specified while setting <span class="notranslate"> Ruby </span> application.
<div class="notranslate">

```
cp -R ~/redmine-2.6.0/* ~/redmine
cd ~/redmine/config
cp database.yml.example database.yml
```
</div>
Edit <span class="notranslate"> config/database.yml </span> - add MySQL database connection settings to <span class="notranslate"> Production </span> section.
<div class="notranslate">

```
cp -R ~/redmine/public/* ~/public_html/redmine/
cd ~/public_html/redmine
cat htaccess.fcgi.example >> .htaccess
cp dispatch.fcgi.example dispatch.fcgi
```
</div>
Go to <span class="notranslate"> cd ~/redmine </span> directory.

Add <span class="notranslate"> gem "bigdecimal" </span> line into <span class="notranslate"> Gemfile </span> file.

Run alternately:
<div class="notranslate">

```
source ~/rubyvenv/redmine/2.1/bin/activate
~/rubyvenv/redmine/2.1/bin/bundle install
```
</div>
(if running the alternative installation)
<div class="notranslate">

```
~/rubyvenv/redmine/2.1/bin/rake generate_secret_token
RAILS_ENV=production ~/rubyvenv/redmine/2.1/bin/rake db:migrate
```
</div>
- Database migration;  

<span class="notranslate"> `RAILS_ENV=production ~/rubyvenv/redmine/2.1/bin/rake redmine:load_default_data`  </span> 
- Loading default data into database.

#### EasyApache 4

Since cPanel/WHM version 66 provides <span class="notranslate"> ea-ruby24-mod_passenger </span> (more information on the [link](https://documentation.cpanel.net/display/66Docs/Application+Manager) ), this allows creating <span class="notranslate"> Ruby </span> applications with cPanel application manager.

CloudLinux already has <span class="notranslate"> Ruby Selector</span>, which allows creating applications with <span class="notranslate"> ea-apache24-mod-alt-passenger</span>. However, it does not allow using <span class="notranslate"> cPanel application manager</span>.

It is not correct to install both of those packages on the server because they contain the same <span class="notranslate"> passenger </span> module for Apache web server.

The new <span class="notranslate"> ea-ruby24-mod_passenger </span> is available for download from our <span class="notranslate"> updates-testing (beta) </span> repository which allows you to run applications via <span class="notranslate"> cPanel application manager</span> and <span class="notranslate"> Ruby Selector</span>.

To install run:
<div class="notranslate">

```
# yum install lvemanager alt-python-virtualenv
# yum install ea-ruby24-mod_passenger --enablerepo=cl-ea4-testing
```
</div>

To install <span class="notranslate"> Ruby Selector</span> follow the instructions on the [link](/python_and_ruby_selector/#python-and-ruby-selector-installation).



### Command-line tools

All the actions mentioned in Deploy and Settings section can be performed from the command line:

To create application run:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<ruby> --version=VERSION [--user=USER] [--print-summary] [--json] --create-webapp <FOLDER_NAME> <URI>
```
</div>
To delete application:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<ruby> [--user=USER] [--print-summary] [--json] --destroy-webapp <FOLDER_NAME>
```
</div>
To change application folder name:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<ruby> [--user=USER] [--print-summary] [--json] --relocate-webapp <FOLDER_NAME> <NEW_FOLDER_NAME>
```
</div>

To change application <span class="notranslate"> URI </span>:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<ruby> [--user=USER] [--print-summary] [--json] --transit-webapp <FOLDER_NAME> <NEW_URI>
```
</div>

To change application interpreter version:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<ruby> [--user=USER] [--print-summary] [--json] --set-user-current --version=<NEW VERSION> <FOLDER_NAME>
```
</div>

To restart application:
<div class="notranslate">

```
selectorctl --interpreter ruby --user cltest1 --domain cltest1.com --restart-webapp testapp
```
</div>
To choose <span class="notranslate"> Ruby </span> version:
<div class="notranslate">

```
selectorctl --interpreter=ruby --user=$USER -v 2.0
```
</div>

## Node.js Selector
### General information and requirements

<span class="notranslate"> Node.js Selector </span>  is a CloudLinux component that allows each user to easily create Node.js applications, choose Node.js version and other parameters for applications based on their needs.

#### **Requirements**

* <span class="notranslate"> Node.js Selector</span> supports Node.js versions 6.x, 8.x, 9.x and later.
* This feature is available for CloudLinux 7, <span class="notranslate"> CloudLinux 6 hybridand CloudLinux 6. </span>
* <span class="notranslate"> Node.js Selector requires LVE Manager 4.0 </span> or later.
* It supports cPanel and DirectAdmin servers (Plesk is not supported as it already has Node.js support.) For more details, please go to Plesk & Node.js documentation [here](https://www.plesk.com/blog/product-technology/node-js-plesk-onyx/) and [here](https://docs.plesk.com/en-US/onyx/administrator-guide/website-management/nodejs-support.76652/) .
* For more details about <span class="notranslate"> mod_passenger </span>  and Node.js, please read documentation  [here](https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/)  and  [here](https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/ownserver/apache/oss/el7/deploy_app.html) .
* <span class="notranslate"> Node.js Selector </span> is working with EasyApache 3 and EasyApache 4.

### Installation and update

**cPanel**

To use <span class="notranslate"> Node.js Selector </span>, please install <span class="notranslate"> Node.js </span> packages by running the following command:
<div class="notranslate">

```
yum groupinstall alt-nodejs6 alt-nodejs8 alt-nodejs9
```
</div>
Also, please install <span class="notranslate"> LVE Manager, LVE Utils and Fusion Passenger </span> by running the following command:
<div class="notranslate">

```
yum install lvemanager lve-utils ea-apache24-mod-alt-passenger
```
</div>
For EasyApache 3:
<div class="notranslate">

```
yum install lvemanager lve-utils alt-mod-passenger
```
</div>
And we recommend to install CageFS for better security (not mandatory) by running the following command:
<div class="notranslate">

```
yum install cagefs
```
</div>

::: tip Note
If during Node.js Selector usage on cPanel servers you get "ENOMEM npm ERR! errno-12" error, try to increase Memory limit in <span class="notranslate"> cPanel WHM → Server Configuration → Tweak Settings → System → Max cPanel process memory, </span> then restart cPanel service with the following command to apply changes.
:::


CloudLinux 7:
<div class="notranslate">

```
systemctl restart cpanel.service
```
</div>

CloudLinux 6:
<div class="notranslate">
```
service cpanel restart
```
</div>

**DirectAdmin**

To use <span class="notranslate"> Node.js Selector, please install Node.js </span> packages by running the following command:
<div class="notranslate">

```
yum groupinstall alt-nodejs6 alt-nodejs8 alt-nodejs9
```
</div>
Also, please install <span class="notranslate"> LVE Manager, LVE Utils and Fusion Passenger </span> by running the following command:
<div class="notranslate">

```
yum install lvemanager lve-utils alt-mod-passenger
```
</div>
And we recommend to install CageFS for better security (not mandatory) by running the following command:
<div class="notranslate">

```
yum install cagefs
```
</div>



### Node.js Deployment


The first approach - [remote usage of Node.js Interpreters of different versions](/node_js_selector/#remote-usage-of-node-js-interpreters).  
The second approach - [remote usage of the ](/node_js_selector/#remote-usage-of-the-cloudlinux-selector-utility) <span class="notranslate"> [cloudlinux-selector utility](/node_js_selector/#remote-usage-of-the-cloudlinux-selector-utility) </span> .

#### Remote Usage of Node.js Interpreters


1. Create a Node.js project in <span class="notranslate"> IntelliJ IDEA/WebStorm </span> . You can download [this archive](http://docs.cloudlinux.com/nodejs_example.zip) and use it as a basis.
2. Install <span class="notranslate"> alt-nodejs </span> packages on the server in use. See [installation instructions](/node_js_selector/#installation) .
3. Create an application on the server. You can do it by three ways:
  * Via UI of the Node.js plugin.
  * Using the following command to create an application:

<div class="notranslate">

```
cloudlinux-selector create --interprete=nodejs --json --app-root=<USER_NAME> --app-uri=<APP_NAME> --app-mode=develompent --version=<VERSION> --domain=<DOMAIN>
```
</div>  

::: tip Note
In the <span class="notranslate"> IntelliJ IDEA </span> you can create and run any remote script <span class="notranslate"> (Preferences — Remote SSH External Tools — Add).</span>
:::

![](/images/createapp_zoom70.png)

  * Choose a location of the application on the server and synchronize the files with the <span class="notranslate"> IntelliJ IDEA </span> project.
4. Set up <span class="notranslate"> Run/Debug Configurations </span> in the project created.

![](/images/setconfiguration_zoom70.png)

  * Specify a path to the remote Node.js interpreter. To be able to specify the remote interpreter, you should install the <span class="notranslate"> _Node.js Remote Interpreter_ </span> plugin first. Please find more information [here](https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html) , using server access credentials for a user <span class="notranslate"> _(Main menu → Run → Edit configurations...)_ </span> .
  * Specify initial _JavaScript file_ that will be run with the <span class="notranslate"> _node_ </span> command (it is the _app.js_ file from the archive).
  * Specify <span class="notranslate"> _Path Mappings_ </span> between a local and a remote project <span class="notranslate"> _(Preferences → Deployments → Add)_ </span> . If you have created your application with the <span class="notranslate"> _cloudlinux-selector utility_ </span> or via plugin UI the <span class="notranslate"> _Path Mappings_ </span> should be as follows:

<div class="notranslate">

```
/home/<USER_NAME>/<APP_NAME>
```
</div>

5. Synchronize the project directories on the local and the remote machine as per <span class="notranslate"> _Path Mappings_ </span> specified.
6. Deploy the modules on the remote and the local machine with the <span class="notranslate"> **_npm install_** </span> command (if there are dependent modules). In the UI you can click the <span class="notranslate"> _Run NPM Install_ </span> button.
7. Run Node.js application with the configuration set at the [4th step](/node_js_selector/#remote-usage-of-the-cloudlinux-selector-utility)  <span class="notranslate"> _(Main menu → Run → Run… → Select configuration)_ </span> .

![](/images/runapp_zoom60.png)

8. If you are using the application from the archive attached, you can see the running application on port 3003 — <span class="notranslate"> _http://DOMAIN:3003_ . </span>

::: tip Note
The port should be available to a server user.
:::

![](/images/runningappdomain_zoom70.png)

The following information should be displayed on this page:
* A version of the running Node.js interpreter;
* Current environment variables;
* The current time.

So that, you can be sure that deployed modules are used properly.

If you’d like to use a different version of Node.js to run an application, change a path to the interpreter in the configuration settings of the running.  
To apply all changes to the project, synchronize all changes with the server and restart the running application.

9. To debug a script, set breakpoints in the code and run the configuration via Main Menu <span class="notranslate"> _(Main menu → Run → Debug… → Select configuration)_ </span> .

Useful links:
* <span class="notranslate"> IntelliJ IDEA </span> : [https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html](https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html)
* Plugin <span class="notranslate"> _Node.js Remote Interpreter_ </span> : [https://plugins.jetbrains.com/plugin/8116-node-js-remote-interpreter](https://plugins.jetbrains.com/plugin/8116-node-js-remote-interpreter)
* <span class="notranslate"> WebStorm </span> : [https://www.jetbrains.com/help/webstorm/configure-node-js-remote-interpreter.html](https://www.jetbrains.com/help/webstorm/configure-node-js-remote-interpreter.html)

::: tip Note
It is not required to install <span class="notranslate"> _Passenger_ </span> while working in <span class="notranslate"> IDE </span> if you are using this approach.
:::

#### Remote Usage of the cloudlinux-selector Utility


1. Create an application via UI or with the command as described in the Remote Usage of Node.js Interpreters approach, [step 3 (a,b)](/node_js_selector/#remote-usage-of-the-cloudlinux-selector-utility) .
2. Set up project mapping on the local machine with the created remote application <span class="notranslate"> _/home/<USER_NAME>/<APP_NAME> (Preferences → Deployments → Add)_ </span>.
3. Set up the remote commands of <span class="notranslate"> cloudlinux-selector _(Preferences → Remote SSH External Tools → Add)_ </span> for the following actions:
  * Restart application;
  * Install packages;
  * Run script;
  * Change Node.js version for the application.
You can see the running app at <span class="notranslate"> http://DOMAIN/APPLICATION_URL </span>
To apply all changes, restart the application.


#### User Interface

**Hoster**

Hoster interface allows to enable and disable Node.js, and manage individual Node.js versions.

Go to <span class="notranslate"> _LVE Manager → Options Tab → Node.js Section_ </span> . A list of installed Node.js versions is displayed. There are several columns in the list.

* <span class="notranslate"> Version </span> — displays Node.js version.
* <span class="notranslate"> Path </span> — Node.js package location.
* <span class="notranslate"> Applications </span> — number of applications that use this Node.js version. Click on a digit to go to the list of applications.
* <span class="notranslate"> Enabled </span> — displays if particular Node.js version is enabled.
* <span class="notranslate"> Actions </span> — allows to install, delete, and make default a particular Node.js version.

To display all changes immediately click <span class="notranslate"> _Refresh_ </span> link.

![](/images/nodejsgeneral_zoom70.png)

**How to enable/disable Node.js**

* To enable Node.js move the slider to <span class="notranslate"> _Enable_ </span> .
* To disable Node.js move the slider back to <span class="notranslate"> _Disable_ </span> . 

::: tip Note
If you disable Node.js, its version for all your applications will not be changed, but you can not add a new application to this version.
:::

![](/images/nodejsslider_zoom70.png)

::: tip Note
<span class="notranslate">Node.js Selector</span> icon in end user interface is absent when Node.js is disabled.
:::

![](/images/nodejsselectorlogo_zoom70.png)

**How to manage Node.js**

The list of installed Node.js versions allows to enable and disable, install and delete, and set a particular Node.js version as a default.

**Enable and disable particular Node.js version**

To enable particular Node.js version do the following:
* Move a disabled slider in the <span class="notranslate"> _Enabled_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

![](/images/nodejsenable_zoom70.png)

To disable particular Node.js version do the following:
* Move an enabled slider in the <span class="notranslate"> _Enabled_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

**Install and delete particular Node.js version**

To install particular Node.js version do the following:
* Click <span class="notranslate"> _Install_ </span> button in the <span class="notranslate"> _Actions_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

To delete particular Node.js version do the following:
* Click <span class="notranslate"> _Bin_ </span> icon in the <span class="notranslate"> _Actions_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to start uninstall process.
* Or just close a pop-up without any changes.

**Note that it is impossible**:  
* to remove default Node.js version;
* to remove version with applications;
* to install or remove version if another installation/uninstall process is running.

![](/images/nodejsconfirmation_zoom70.png)

**Make a particular Node.js version as a default**

To make a particular Node.js version as a default do the following:
* Click <span class="notranslate"> _Double-Tick_ </span> icon in the <span class="notranslate"> _Actions_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

::: tip Note
It is impossible to make a disabled version default.
:::


![](/images/nodejsmakedefault_zoom70.png)

**Applications column**

To view and operate with the list of domains with Node.js versions click on a number in the <span class="notranslate"> _Applications_ </span> column for a particular Node.js version. A section with a list of Domains for particular Node.js version will be displayed.

![](/images/nodejsselectordomains_zoom70.png)

Domains are displayed by three. To load more domains click on <span class="notranslate"> _Load More_ </span> button.


To change Node.js version for a particular application do the following:
* Click <span class="notranslate"> _Double-Arrow_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a particular application row. A confirmation pop-up will be displayed.
* In the pop-up choose Node.js version from a drop-down.
* Click <span class="notranslate"> _Change_ </span> to confirm the action or <span class="notranslate"> _Cancel_ </span> to close the pop-up.
* To refresh state of applications in current version you can click <span class="notranslate"> _Refresh_ </span> link. 

:::tip Note
All packages of the application(s) will be re-installed.
:::

**End User**

:::tip Note
<span class="notranslate"> Node.js Selector </span> icon in end user interface is absent when Node.js is disabled.
:::

![](/images/nodejslogoenduser_zoom70.png)

End User interface allows end users to setup and manage Node.js for their web applications.  
Go to <span class="notranslate"> _cPanel → Software Section → Select Node.js Version_ </span> .

<span class="notranslate"> _Web Applications_ </span> page is displayed.

![](/images/nodejsusermain_zoom70.png)

There are several columns in the list.
* <span class="notranslate"> App URI </span> — application URI including the domain.
* <span class="notranslate"> App Root Directory </span> —  application root directory relative to user's home.
* <span class="notranslate"> Mode </span> — can be production or development.
* <span class="notranslate"> Status </span> — started/stopped — displays if an application is running or not and version of application.
* <span class="notranslate"> Actions </span> — allows to start, restart, stop, edit, and remove a particular application.

**How to manage application**

**Start application**

To start a stopped application do the following:
* Click <span class="notranslate"> _Start_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a stopped application row.
* When an action is completed a <span class="notranslate"> _Start_ </span> icon changes to <span class="notranslate"> _Stop_ </span> icon.

**Stop application**

To stop a started application do the following:
* Click <span class="notranslate"> _Stop_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a started application row.
* When an action is completed a <span class="notranslate"> _Stop_ </span> icon changes to <span class="notranslate"> _Start_ </span> icon.

![](/images/nodejsuseruistartstop_zoom70.png)

**Restart application**

To restart started application do the following:
* Click <span class="notranslate"> _Restart_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a started application row. A current row is blocked and when a process is completed it will be unblocked.

**Remove application**

To remove application do the following:
* Click <span class="notranslate"> _Bin_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a particular application row.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to start removing or <span class="notranslate"> _Cancel_ </span> to close pop-up.
* When an action is completed an application will be removed from the <span class="notranslate"> _Web Applications_ </span> table and a confirmation pop-up will be displayed.

![](/images/nodejsuseruirestartremove_zoom70.png)

**Edit application**

To edit application do the following:
* Click <span class="notranslate"> _Pencil_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a particular application row. A particular application tab opens.

![](/images/nodejseditapp_zoom70.png)

The following actions are available:
* Restart application — click <span class="notranslate"> _Restart_ </span> button.
* Stop Node.js — click <span class="notranslate"> _Stop Node.js_ </span> button.
* Run JavaScript script — click <span class="notranslate"> _Run JS Script_ </span> button to run a command specified in the <span class="notranslate"> Scripts </span> section of the <span class="notranslate"> package.json </span> file. Specify the name of the script to run plus any parameters then click <span class="notranslate"> Ok </span> .
* Remove application — click <span class="notranslate"> _Delete_ </span> button and confirm the action in a pop-up.
* Change Node.js version — choose Node.js version from a drop-down.
* Change Application mode — choose application mode from a drop-down. Available modes are <span class="notranslate"> _Production_ </span> and <span class="notranslate"> _Development_ </span> .
* Specify Application root — specify in a field a physical address to the application on a server that corresponds with its URI.
* Specify Application URL — specify in a field an HTTP/HTTPS link to the application.
* Specify Application startup file — specify as <span class="notranslate"> NAME.js file </span> .
* Run <span class="notranslate"> npm install command </span> — click <span class="notranslate"> _Run npm install_ </span> button to install the package(s) described in the <span class="notranslate"> package.json </span> file.
* Add Environment variables — click <span class="notranslate"> _Add Variable_ </span> and specify a name and a value.

**Application error log**

Since <span class="notranslate"> alt-mod-passenger </span> version 5.3.7-3 we have included support for the PassengerAppLogFile directive.
<div class="notranslate">

``` 
Syntax: PassengerAppLogFile path
Default: PassengerAppLogFile path-to-passenger-log-file
Context: virtual host, htaccess
```
</div>
 
By default, <span class="notranslate"> Passenger </span> log messages are all written to the Passenger log file. With this option, you can have the app specific messages logged to a different file in addition. In <span class="notranslate"> alt-mod-passenger </span>, you can use it in the context of a virtual host or in the htaccess file.


### Command-line tools

Below is a list of commands hoster and end user can run in a command line.

#### **Hoster**

Get information related to Node.js: default version, list of supported versions, status of <span class="notranslate"> Node.js Selector </span> , list of users, their applications, etc:
<div class="notranslate">

```
cloudlinux-selector [get] [--json] --interpreter nodejs
```
</div>

<span class="notranslate"> JSON </span> output for <span class="notranslate"> _get_ </span> command:
<div class="notranslate">

```
{  
"selector_enabled": true | false,   
"default_version": "6.11.3",   
"result": "success",   
"timestamp": 1508667174.220027  
"cache_status": "ready"         //  or “updating” during automatic yum cache rebuild  
"available_versions": {   //  begin of  “versions”
      "6.11.3" : {   //   begin of version "6.11.3"
		"name_modifier": "",
		"status": "enabled",  //  enabled, disabled, not_installed, installing, removing
		“base_dir”: “/opt/alt/alt-nodejs6”   //  empty when version is not installed
		“users”: {   //  begin of  “users”                      
			“user1”: {   //  begin of “user1”
				“homedir”: “/home/user1”,
				“applications”: {    //  begin of “applications”
					“apps_dir/app1” : {   //   begin of application “apps_dir/app1”
						“domain”: “cltest1.com”,
						“app_uri”: “apps/my-app1”,
						“app_mode” : “development”,
						“startup_file” : “app.js”,
						“app_status” : “started”,   // ‘started’ or ‘stopped’
						“config_files” : [
							“package.json”,
							“gruntfile.js”
						],
						“env_vars” : {
							“var1” : “value1”,
							“var2” : “value2”
						},
					},   // end of application “apps_dir/app1”
					“apps_dir/app2” : {    //   begin of application “apps_dir/app2”
						<< data for application “apps_dir/app2”  (same structure as for application “apps_dir/app1” above) >>
					},   //  end of application “apps_dir/app2”
				},   //  end of “applications”
			},   //  end of “user1”
			“user2”: {   //  begin of “user2”
				<< data for user “user2”  (same structure as for “user1” above) >>
			},   //  end of “user2”
		},   // end of “users”
	},    //  end of version “6.11.3”
	"8.21.5" : {   //   begin of version "8.21.5"
		<< data for version "8.21.5"  (same structure as for version “6.11.3” above) >>
	},    //  end of version “8.21.5”
},    //  end of “versions”}   //   end of json
```
</div>

Set default version, supported versions, and status of <span class="notranslate"> Node.js Selector </span> :
<div class="notranslate">

```
cloudlinux-selector set [--json] --interpreter nodejs (--selector-status <enabled,disabled> | --default-version <str> | --supported-versions <str>)
```
</div>

::: tip Note
<span class="notranslate"> Node.js Selector </span> is disabled by default. If an available Node.js version is not installed <span class="notranslate"> Node.js Selector </span> is always disabled and it is impossible to enable it.
:::

To set default Node.js version, please use the following command (note that required Node.js version should be enabled):
<div class="notranslate">

```
cloudlinux-selector set --json --interpreter=nodejs --default-version=<ver>
```
</div>

**Examples** :  
This command enables <span class="notranslate"> Node.js Selector </span> :

<div class="notranslate">

```
cloudlinux-selector set --json --interpreter nodejs --selector-status enabled
```
</div>

This command sets default Node.js version as 6:
<div class="notranslate">

```
cloudlinux-selector set --json --interpreter nodejs --default-version 6
```
</div>

This command sets supported Node.js version as 8:
<div class="notranslate">

```
cloudlinux-selector set --json --interpreter nodejs --supported-versions='{"6": false, "8": true}'
```
</div>

Install required Node.js version:
<div class="notranslate">

```
cloudlinux-selector install-version --json --interpreter nodejs --version 8
```
</div>

Uninstall required Node.js version:
<div class="notranslate">

```
cloudlinux-selector uninstall-version --json --interpreter nodejs --version 8
```
</div>

Enable required Node.js version:
<div class="notranslate">

```
cloudlinux-selector enable-version --json --interpreter nodejs --version 8
```
</div>

Disable required Node.js version (note that it is impossible to disable default Node.js version):
<div class="notranslate">

```
cloudlinux-selector disable-version --json --interpreter nodejs --version 8
```
</div>

Change version for application(s):
<div class="notranslate">

```
cloudlinux-selector set [--json] --interpreter nodejs ((--user <str> |  --domain <str>) --app-root <str> | --from-version <str>) --new-version <str>
```
</div>

**Examples** :  
This command changes version for the specific application:
<div class="notranslate">

```
cloudlinux-selector set --json --interpreter nodejs --user user1 --app-root apps_dir/app1 --new-version 8
```
</div>

Common output for all <span class="notranslate"> _set_ </span> commands:

**_in case of success_** :
<div class="notranslate">

```
{  "result": "success",   "timestamp": 1508666792.863358}
```
</div>

**_in case of error:_**
<div class="notranslate">

```
{  "result": "Some error message",  "details" : "Traceback: ..." ,  "context": {},  "timestamp": 1508666792.863358}
```
</div>

**_in case of warning:_**
<div class="notranslate">

```
{  "result": "success",  "warning" : "Some warning message" ,  "context": {},  "timestamp": 1508666792.863358}
```
</div>

To resolve issues related to <span class="notranslate"> _install-version/uninstall-version_ </span> commands (because they are running in the background) you may use this log file <span class="notranslate"> _/var/log/cl-nodejs-last-yum.log_ </span>
It contains full <span class="notranslate"> _yum_ </span> output from the <span class="notranslate"> **_latest_** </span> performed operation (install or uninstall) and it will be rewritten with each operation.

#### **End User**

::: danger
options --user and --domain are mutually exclusive now.
:::

Get config file for the user applications

<div class="notranslate">

```
cloudlinux-selector read-config [--json] --interpreter nodejs  [(--user <str> |  --domain <str>)] --app-root <str> --config-file <name>
```
</div>

JSON output:

<div class="notranslate">

```
{
    "result": "success",
	"timestamp": 1508666792.863358
	"data": "content of config file as Base64 encoded string"
}
```

</div>


**Example** :

This command gets config file for <span class="notranslate"> user1 </span> ’s application <span class="notranslate"> app1 </span> :

<div class="notranslate">

```
cloudlinux-selector read-config --json --interpreter nodejs  --user user1 --app-root app_dir/app1 --config-file package.json
```
</div>
Save config file for the user applications
<div class="notranslate">

```
cloudlinux-selector save-config [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str> --config-file <path> --content <content of config file as Base64 encoded string>
```
</div>

<span class="notranslate"> JSON </span> output (the same as for all <span class="notranslate"> _set_ </span> commands):

<div class="notranslate">

```
{
          "result": "success",
		  "timestamp": 1508666792.863358
}
```
</div>

**Example** :  
This command saves config file for <span class="notranslate"> user1 </span> ’s application <span class="notranslate"> app1 </span> :

<div class="notranslate">

```
cloudlinux-selector save-config --json --interpreter nodejs  --user user1 --app-root app_dir/app1 --config-file package.json  --content                                         VGh1ICAyIE5vdiAxMDo0MzoxMiBFRFQgMjAxNwo=
```
</div>
Get a list of applications for the specific user
<div class="notranslate">

```
cloudlinux-selector [get] [--json] --interpreter nodejs  [(--user <str> |  --domain <str>)]
```
</div>

**Example** :  
This command gets a list of applications for the <span class="notranslate"> user1 </span> :

<div class="notranslate">

```
cloudlinux-selector get --json --interpreter nodejs  --user user1
```
</div>
Create user application

<div class="notranslate">

```
cloudlinux-selector create [--json] --interpreter nodejs [(--user <str> | --domain <str>)] --app-root <str> --app-uri <str> [--version <str>] [--app-mode <str>] [--startup-file <str>] [--env-vars <json string>]
```
</div>

**Example** :  
This command creates <span class="notranslate"> user1 </span> 's application for the domain <span class="notranslate"> xyz.com </span> :
<div class="notranslate">

```
cloudlinux-selector create --json --interpreter nodejs --user user1 --app-root my_apps/app1 --app-uri apps/app1
```
</div>
or
<div class="notranslate">

```
cloudlinux-selector create --json --interpreter nodejs --app-root my_apps/app1 --domain xyz.com --app-uri apps/app1
```
</div>
Start, restart, stop, and destroy user application
<div class="notranslate">

```
cloudlinux-selector (start | restart | stop | destroy) [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str>
```
</div>

**Example** :
This command starts <span class="notranslate"> user1 </span> 's application:
<div class="notranslate">

```
cloudlinux-selector start --json --interpreter nodejs --user user1 --app-root my_apps/app1
```
</div>
Change properties for an application
<div class="notranslate">

```
cloudlinux-selector set [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str> [--app-mode <str>] [--new-app-root <str>] [--new-domain <str>] [--new-app-uri <str>] [--new-version <str>] [--startup-file <str>] [--env-vars <json string>]
```
</div>

**Example 1** :
This command sets a production mode, new domain <span class="notranslate"> new.xyz.com </span> , new Node.js version 8, new <span class="notranslate"> URI </span> , new application <span class="notranslate"> root </span> directory and new startup file for <span class="notranslate"> user1 </span> application located on the domain <span class="notranslate"> xyz.com </span> :
<div class="notranslate">

```
cloudlinux-selector set --json --interpreter nodejs  --user user1 --app-root my_apps/app1 --mode production  --new-app-root new_apps/new_app1  --new-domain new.xyz.com --new-app-uri new_apps/app1  --new-version 8  --startup-file new_app.js --env-vars '{ "var1" : "value1", "var2" : "value2" }'
```
</div>

**Example 2** :

<div class="notranslate">

```
cloudlinux-selector set --json --interpreter nodejs  --domain xyz.com --app-root my_apps/app1 --mode production  --new-app-root new_apps/new_app1  --new-domain new.xyz.com --new-app-uri new_apps/app1  --new-version 8  --startup-file new_app.js --env-vars '{ "var1" : "value1", "var2" : "value2" }'
```
</div>

::: tip Note
When changing Node.js version all replies from web application to get request will be checked in Node.js Selector (before and after version changing). HTTP response codes and MIME type are comparing. So, make sure application is available via http(s) at least locally.
:::

Run <span class="notranslate"> _npm install_ </span> command for the user application
<div class="notranslate">

```
cloudlinux-selector install-modules [--json] --interpreter nodejs  [(--user <str> |  --domain <str>)] --app-root <str>
```
</div>

**Example** :
This command runs <span class="notranslate"> _npm install_ </span> for <span class="notranslate"> user1 </span> application:

<div class="notranslate">

```
cloudlinux-selector install-modules --json --interpreter nodejs --user user1 --app-root my_apps/app
```
</div>

::: tip Note
All replies from web application to get request will be checked in Node.js Selector (before and after modules installation). HTTP response codes and MIME type are comparing. So, make sure application is available via http(s) at least locally.
:::

Run a script from <span class="notranslate"> package.json </span> file of a user application, arguments <span class="notranslate"> _args_ </span> are passed to the script
<div class="notranslate">

```
cloudlinux-selector run-script [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str> --script-name <str> [-- <args>...]
```
</div>

**Example** :
<div class="notranslate">

```
cloudlinux-selector run-script --json --interpreter nodejs --user user1 --app-root my_apps/app --script-name test_script -- --script_opt1 --script_opt2 script_arg1 script_arg2
```
</div>

<span class="notranslate"> JSON </span> output:

<div class="notranslate">

```
{
          "result": "success",
		  "timestamp": 1508666792.863358
		  "data": "script output as Base64 encoded string"
}
```
</div>

Activate virtual environment of NodeJS:
<div class="notranslate">

```
source <home_of_user>/nodevenv/<app_root>/<nodejs_version>/bin/activate
```
</div>

This command changes prompt to
**Example** :  
<div class="notranslate">

```
[newusr@192-168-245-108 ~]$ source /home/newusr/nodevenv/newapp4/newapp3/8/bin/activate
[newapp4/newapp3 (8)] [newusr@192-168-245-108 ~]$
```
</div>

After ativation user can use <span class="notranslate"> _npm_ </span> and node from a virtual environment without full paths.


### Troubleshooting

#### Debugging Errors

Since <span class="notranslate"> alt-mod-passenger-5.3.7-2,</span> directives such as PassengerFriendlyErrorPages and PassengerAppEnv are available for use from htaccess file. This allows end users to see errors from their application during the development process. For example, if you add one of the following lines to the htaccess file on the application page, you will see the information (if there was an error) similar to one on the picture.
<div class="notranslate">

```
PassengerAppEnv development
```
</div>
or
<div class="notranslate">

```
PassengerFriendlyErrorPages on
```
</div>

![](/images/errorapplog.png)

This is a much more convenient approach to developing an application and debugging errors. On the other hand, if these directives are turned off you will see:

![](/images/errorapplogsorry.png)

In this case, there is no useful information for debugging errors and this is suitable for production mode. More information about [PassengerFriendlyErrorPages](https://www.phusionpassenger.com/library/config/apache/reference/#passengerfriendlyerrorpages) and [PassengerAppEnv](https://www.phusionpassenger.com/library/config/apache/reference/#passengerappenv).


## Apache mod_lsapi PRO
### General information and requirements

mod_lsapi PRO is an [Apache HTTP Server](https://httpd.apache.org/) module based on [LiteSpeed Technologies API](https://www.litespeedtech.com/open-source/litespeed-sapi) . It serves to execute PHP scripts on a web-server by analogy with other modules like mod_suphp, php-fpm, mod_php. However, mod_lsapi PRO usage offers excellent PHP performance, low memory footprint coupled with great security and support for opcode caching.

**How does it work?**

1. Apache passes handling for PHP request to mod_lsapi PRO;
2. mod_lsapi PRO use liblsapi to transfer request to lsphp parent process;
3. lsphp is forking child process which executes the request and returns data to mod_lsapi PRO;
![](/images/mod_lsapidiagrammnew.jpg)  
_mod_lsapi PRO integrates with Apache, allows to handle concurrent requests and manages the lsphp processes_

* If there are no requests for lsapi_backend_pgrp_max_idle seconds, lsphp parent process will be  terminated;
* If there are no lsphp child processes available when a new request comes, the new lsphp child process will be created;
* lsphp childs process concurrent requests simultaneously;
* The maximum number of simultaneously running lsphp child processes can be set by the lsapi_backend_children directive.

**What is lsphp?**

lsphp - PHP + LSAPI. What is PHP LSAPI? [LiteSpeed Server Application Programming Interface](https://www.litespeedtech.com/open-source/litespeed-sapi/php) (LSAPI) is designed specifically for seamless, optimized communication between LiteSpeed Web Server and third-party web applications. Now with mod_lsapi PRO this protocol is available for Apache 2.2/2.4.

Using mod_lsapi PRO, we have seen the higher performance than Apache with mod_php, easier installation than php-fpm and easier integration with any control panel. mod_lsapi PRO means faster and more stable dynamic web pages.

**Requirements**

Currently, the mod_lsapi is not compatible with:

* Apache mod_ruid2 - should be disabled;
* Apache mod_itk - should be disabled;
* PHP-FPM - should be disabled because PHP-FPM is also a PHP Handler just as mod_lsapi.

**Optional requirements**

* Configured [LVE](/limits/#understanding-lve) containers for end-users ( **recommended - higher security level** );
* Installed and configured [mod_hostinglimits](/limits/#hostinglimits) for Apache ( **recommended - higher security level** );
* Installed mod_suexec for Apache and configured [SuExecUserGroup](https://httpd.apache.org/docs/2.4/mod/mod_suexec.html#page-header) directive for each virtual host ( **recommended - higher security level** );
* Enabled [CageFS](/cagefs/) for end-users ( **recommended - higher security level** );
* [PHP Selector](/php_selector/) with alt-php - an easy way to select different PHP versions for each end-user provided by CloudLinux;
* ea-php - alternative to alt-php provided by cPanel (for cPanel only).

### Installation

mod_lsapi PRO can be installed through YUM package manager, however, the installation process varies depending on the control panel.

Select the control panel you are using:
* [cPanel](/apache_mod_lsapi/#cpanel)
* [Plesk](/apache_mod_lsapi/#plesk)
* [DirectAdmin](/apache_mod_lsapi/#directadmin)
* [No control panel](/apache_mod_lsapi/#no-control-panel)

#### cPanel


**Installing on cPanel servers with EasyApache 4**

Install mod_lsapi PRO and related packages through YUM package manager as follows:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install ea-apache24-mod_lsapi
```
</div>
After installing mod_lsapi PRO packages run the next command to setup mod_lsapi to cPanel:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>
Now, when the module is installed, restart Apache to ensure that the mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now the lsapi handler is available for managing through cPanel MultiPHP Manager.

For more details about swith_mod_lsapi, please visit [switch_mod_lsapi tool](/apache_mod_lsapi/#switch-mod-lsapi-tool) .


#### Plesk


**Installing on Plesk servers**

Install mod_lsapi PRO and related packages through YUM package manager as follows:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install mod_lsapi
```
</div>
Once completed, run the command to setup mod_lsapi PRO and register LSPHP handlers to Plesk Panel:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>

Now, when the module is installed, restart Apache to ensure that mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd restart
```
</div>

Now LSPHPXY alt-php PHP handlers are available for managing through Plesk PHP Settings.

![](/images/plesk-php-settings.png)

For more details about swith_mod_lsapi, please visit [switch_mod_lsapi tool](/apache_mod_lsapi/#switch-mod-lsapi-tool) .


#### DirectAdmin


**Installing on DirectAdmin servers**

Installation process is done with custombuild script:
<div class="notranslate">

```
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set php1_mode lsphp
$ ./build php n
$ ./build apache
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now all domains under php1_mode are using lsphp handler and no further actions are required to enable mod_lsapi PRO on DirectAdmin.

#### No control panel


**Installing on servers with no control panel**

Install mod_lsapi PRO and related packages through YUM package manager as follows:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install mod_lsapi
```
</div>
Once completed, run a command to setup mod_lsapi PRO:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>
Now, when the module is installed, restart Apache to ensure that mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd restart
```
</div>

If you are using an alternative Apache - [httpd24](https://www.cloudlinux.com/cloudlinux-os-blog/entry/httpd24-updated-for-cloudlinux-6) , then install mod_lsapi as follows:

<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install httpd24-mod_lsapi
```
</div>
Once completed, run a command to setup mod_lsapi PRO:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>
Now, when the module is installed, restart Apache to ensure that mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd24 restart
```
</div>

For more details about swith_mod_lsapi, please visit [switch_mod_lsapi tool](/apache_mod_lsapi/#switch-mod-lsapi-tool).


### Uninstalling

Uninstall mod_lsapi PRO is performed depending on your control panel.

Select the control panel you are using:
* [cPanel](/apache_mod_lsapi/#cpanel)
* [Plesk](/apache_mod_lsapi/#plesk)
* [DirectAdmin](/apache_mod_lsapi/#directadmin)
* [No control panel](/apache_mod_lsapi/#no-control-panel)

#### cPanel


**Uninstall procedure for cPanel servers with EasyApache 4**

To remove lsapi handler from cPanel MultiPHP Manager and uninstall mod_lsapi PRO, run a command:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel ea-apache24-mod_lsapi
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now mod_lsapi PRO is fully uninstalled.


#### Plesk


**Uninstall procedure for Plesk servers**

To unregister LSPHP handlers and uninstall mod_lsapi PRO, run the command:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel mod_lsapi
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now LSPHPXY alt-php PHP handlers and mod_lsapi PRO are fully uninstalled.


#### DirectAdmin


**Uninstall procedure for DirectAdmin servers**

Uninstall is done with custombuild script:
<div class="notranslate">

```
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set php1_release [any other php mode]
$ ./build php n
$ ./build apache
```
</div>
The following PHP modes are available for DirectAdmin:

* mod_php
* fastcgi
* php-fpm
* suphp

Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now all domains under php1_mode are using the chosen handler and mod_lsapi PRO is fully uninstalled.

#### No control panel


**Uninstall procedure for servers with no control panel**

To uninstall mod_lsapi PRO, run the command:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel mod_lsapi
$ rm [path to mod_lsapi.conf]
```
</div>
Restart Apache to restore the standard PHP handler:
<div class="notranslate">

```
$ service httpd restart
```
</div>

If you are using an alternative Apache: - [httpd24](https://www.cloudlinux.com/cloudlinux-os-blog/entry/httpd24-updated-for-cloudlinux-6) , then uninstall mod_lsapi PRO as follows:

<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel httpd24-mod_lsapi
$ rm [path to mod_lsapi.conf]
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd24 restart
```
</div>
Now mod_lsapi PRO is fully uninstalled.


### Configuration

In order to get mod_lsapi PRO work properly, you'll need to configure Apache. To do this, we use a separate _lsapi.conf_ file.

First of all, for the mod_lsapi PRO work, you need to ensure that the module is loaded. In your lsapi.conf you need to make sure the [LoadModule](http://httpd.apache.org/docs/current/mod/mod_so.html#loadmodule) directive has not been commented out. A correctly configured directive may look like this:
<div class="notranslate">

```
LoadModule lsapi_module modules/mod_lsapi.so
```
</div>

In order to enable the module to process requests, you need to add the lsapi_engine directive to your _lsapi.conf_ file as follows:
<div class="notranslate">

```
lsapi_engine On
```
</div>

The mod_lsapi PRO handler can be enabled using the [AddType](https://httpd.apache.org/docs/2.4/mod/mod_mime.html#addtype) directive. The AddType directive tells Apache that a given filename extension should be handled by mod_lsapi PRO. Apache will assume that and will attempt to execute it when that particular resource is requested by a client.
<div class="notranslate">

```
AddType application/x-httpd-lsphp .php
```
</div>

If no handler is explicitly set for a request, the specified content type will be used as the handler name, therefore, please disable php.conf or any other PHP handler for using mod_lsapi PRO. In this example application/x-httpd-lsphp is a default handler by which mod_lsapi PRO process requests with lsphp binary from _/usr/local/bin/_ directory.

The final lsapi.conf configuration might look like this:
<div class="notranslate">

```
LoadModule lsapi_module modules/mod_lsapi.so


<IfModule lsapi_module>      
	lsapi_engine On      
	AddType application/x-httpd-lsphp .php      
	lsapi_backend_connect_timeout 100000
	lsapi_backend_connect_tries 10
	lsapi_backend_children 20
	lsapi_backend_pgrp_max_idle 30
	lsapi_backend_max_process_time 300
	lsapi_debug Off
</IfModule>
```
</div>

In order to mod_lsapi PRO work lsapi.conf should be loaded to Apache through [Include](https://httpd.apache.org/docs/2.4/mod/core.html#include) directive.

For more detailed description of the module directives please visit [Configuration reference](/apache_mod_lsapi/#configuration-references).  
For installation guide mod_lsapi PRO please visit [Installation](/apache_mod_lsapi/#installation) .

#### Configuration References

[mod_lsapi customization](/apache_mod_lsapi/#mod-lsapi-customization):
* [lsapi_engine](/apache_mod_lsapi/#lsapi-engine)  
* [lsapi_socket_path](/apache_mod_lsapi/#lsapi-socket-path)  
* [lsapi_poll_timeout](/apache_mod_lsapi/#lsapi-poll-timeout)  
* [lsapi_per_user](/apache_mod_lsapi/#lsapi-per-user)  
* [lsapi_output_buffering](/apache_mod_lsapi/#lsapi-output-buffering)  
* [lsapi_disable_reject_mode](/apache_mod_lsapi/#lsapi-disable-reject-mode)  
* [lsapi_terminate_backends_on_exit](/apache_mod_lsapi/#lsapi-terminate-backends-on-exit)  
* [lsapi_avoid_zombies](/apache_mod_lsapi/#lsapi-avoid-zombies)  
* [lsapi_use_req_hostname](/apache_mod_lsapi/#lsapi-use-req-hostname)  
* [lsapi_debug](/apache_mod_lsapi/#lsapi-debug)

[Tuning LSPHP backend](/apache_mod_lsapi/#tuning-lsphp-backend):
* [lsapi_set_env](/apache_mod_lsapi/#lsapi-set-env)
* [lsapi_set_env_path](/apache_mod_lsapi/#lsapi-set-env-path)
* [lsapi_backend_children](/apache_mod_lsapi/#lsapi-backend-children)
* [lsapi_backend_connect_tries](/apache_mod_lsapi/#lsapi-backend-connect-tries)
* [lsapi_backend_connect_timeout](/apache_mod_lsapi/#lsapi-backend-connect-timeout)
* [lsapi_backend_max_process_time](/apache_mod_lsapi/#lsapi-backend-max-process-time)
* [lsapi_backend_pgrp_max_idle](/apache_mod_lsapi/#lsapi-backend-pgrp-max-idle)
* [lsapi_backend_use_own_log](/apache_mod_lsapi/#lsapi-backend-use-own-log)
* [lsapi_backend_common_own_log](/apache_mod_lsapi/#lsapi-backend-common-own-log)
* [lsapi_backend_coredump](/apache_mod_lsapi/#lsapi-backend-coredump)
* [lsapi_backend_accept_notify](/apache_mod_lsapi/#lsapi-backend-accept-notify)
 
[Connection pool mode](/apache_mod_lsapi/#connection-pool-mode):
* [lsapi_with_connection_pool](/apache_mod_lsapi/#lsapi-with-connection-pool)
* [lsapi_backend_max_idle](/apache_mod_lsapi/#lsapi-backend-max-idle)
* [lsapi_backend_max_reqs](/apache_mod_lsapi/#lsapi-backend-max-reqs)

[CRIU support (CloudLinux 7 only)](/apache_mod_lsapi/#criu-support-cloudlinux7-only):
* [lsapi_criu](/apache_mod_lsapi/#lsapi-criu)
* [lsapi_criu_socket_path](/apache_mod_lsapi/#lsapi-criu-socket-path)
* [lsapi_criu_imgs_dir_path](/apache_mod_lsapi/#lsapi-criu-imgs-dir-path)
* [lsapi_backend_initial_start](/apache_mod_lsapi/#lsapi-backend-initial-start)
* [lsapi_criu_use_shm](/apache_mod_lsapi/#lsapi-criu-use-shm)
* [lsapi_backend_semtimedwait](/apache_mod_lsapi/#lsapi-backend-semtimedwait)
* [lsapi_reset_criu_on_apache_restart](/apache_mod_lsapi/#lsapi-reset-criu-on-apache-restart)

[PHP configuration management](/apache_mod_lsapi/#php-configuration-management):
* [lsapi_process_phpini](/apache_mod_lsapi/#lsapi-process-phpini)
* [lsapi_phpini](/apache_mod_lsapi/#lsapi-phpini)
* [lsapi_phprc](/apache_mod_lsapi/#lsapi-phprc)
* [lsapi_tmpdir](/apache_mod_lsapi/#lsapi-tmpdir)
* [lsapi_enable_user_ini](/apache_mod_lsapi/#lsapi-enable-user-ini)
* [lsapi_user_ini_homedir](/apache_mod_lsapi/#lsapi-user-ini-homedir)
* [lsapi_keep_http200](/apache_mod_lsapi/#lsapi-keep-http200)
* [lsapi_mod_php_behaviour](/apache_mod_lsapi/#lsapi-mod-php-behaviour)
* [php_value, php_admin_value, php_flag, php_admin_flag](/apache_mod_lsapi/#php-valuephp-admin-valuephp-flagphp-admin-flag)

[Security](/apache_mod_lsapi/#security):
* [lsapi_use_suexec](/apache_mod_lsapi/#lsapi-use-suexec)
* [lsapi_user_group](/apache_mod_lsapi/#lsapi-user-group)
* [lsapi_uid_gid](/apache_mod_lsapi/#lsapi-uid-gid)
* [lsapi_use_default_uid](/apache_mod_lsapi/#lsapi-use-default-uid)
* [lsapi_target_perm](/apache_mod_lsapi/#lsapi-target-perm)
* [lsapi_paranoid](/apache_mod_lsapi/#lsapi-paranoid)
* [lsapi_check_document_root](/apache_mod_lsapi/#lsapi-check-document-root)
* [lsapi_disable_forced_pwd_var](/apache_mod_lsapi/#lsapi-disable-forced-pwd-var)
* [lsapi_max_resend_buffer](/apache_mod_lsapi/#lsapi-max-resend-buffer)

#### **mod_lsapi customization**

#### **lsapi_engine**

**Syntax** : lsapi_engine on/off  
**Default** : lsapi_engine off  
**Context** : httpd.conf, htaccess  

**Description** :  
Switching mod_lsapi handler on or off.

---

#### **lsapi_socket_path**

**Syntax** : lsapi_socket_path [path]
**Default** : lsapi_socket_path `/var/run/mod_lsapi`  
**Context** : httpd.conf  

**Description:**  
Path to backend lsphp sockets. By default `/var/run/mod_lsapi`

---

#### **lsapi_poll_timeout**

**Syntax** : lsapi_poll_timeout [number]  
**Default** : lsapi_poll_timeout 300  
**Context** : httpd.conf, htaccess  

**Description** :  
Time to wait for response from the lsphp daemon, in seconds. 0 stands for infinity. For preventing long running processes which can use EP (limit number of entry processes). Default value is 300. Should be more or equal to 0. In the case of wrong format, the default value will be used.

---

#### **lsapi_per_user**

**Syntax** : lsapi_per_user On/Off  
**Default** : lsapi_per_user Off  
**Context** : httpd.conf  

**Description** :  
Invoke master lsPHP process not per VirtualHost but per account.
When On, invoke backend not per VirtualHost but per account.
Default value is Off.
It is possible, for example, to set it to On in global config file and to Off in config files of some particular Virtual Hosts.
Then these Virtual Hosts will have a dedicated backend process, while others will have backend processes shared on account basis.

---

#### **lsapi_output_buffering**

**Syntax** : lsapi_output_buffering On/Off  
**Default** : lsapi_output_buffering On  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
Enable or disable output buffering on Apache level. Default value is On.

---

#### **lsapi_disable_reject_mode**

**Syntax** : lsapi_disable_reject_mode On/Off  
**Default** : lsapi_disable_reject_mode Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
If a new HTTP request is coming to LSPHP daemon when all LSPHP workers are still busy, it can process this situation in two different ways. In REJECT mode LSPHP daemon will reject such request immediately. Otherwise, in legacy mode, LSPHP daemon will put this request into infinite queue, until one or more LSPHP daemon becomes free. When HTTP request is rejected in REJECT mode, mod_lsapi will write into Apache error_log the following message: Connect to backend rejected, and the client will receive 507 HTTP response.
By default LSPHP daemon in CloudLinux uses REJECT mode. It can be switched off with this option.

---

#### **lsapi_terminate_backends_on_exit**

**Syntax** : lsapi_terminate_backends_on_exit On/Off  
**Default** : lsapi_terminate_backends_on_exit On  
**Context** : httpd.conf  

**Description** :  
httpd.conf, On - stop lsphp services on apache restart, Off - leave live started lsphp services on apache restart (for php+opcache). The lsphp will not restart, even if Apache gets restarted.

---

#### **lsapi_avoid_zombies**

**Syntax** : lsapi_avoid_zombies On/Off  
**Default** : lsapi_avoid_zombies Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
Enable or disable a mechanism to avoid creation of zombie processes by lsphp. Default value is Off.

---

#### **lsapi_use_req_hostname**

**Syntax** : lsapi_use_req_hostname On/Off  
**Default** : lsapi_use_req_hostname Off  
**Context** : httpd.conf, virtualhosts  

**Description** :  
By default, we are using hostname from the server_rec structure (off), it means that mod_lsapi takes hostname from the VirtualHost section of the configuration file. Using hostname from the request_rec structure (On) means that mod_lsapi takes hostname from the HOST section of the request. It could be useful for those who use dynamically generated configs for virtual hosts for example with mod_lua.

---

#### **lsapi_sentry**

**Syntax** : lsapi_sentry On/Off  
**Default** : lsapi_sentry On  
**Context** : httpd.conf  

**Description** :  
When this option is enabled, errors that occur in the operation of the mod_lsapi will be sent to the remote sentry server. You can see the error messages that were sent to the sentry server in the directory /var/log/mod_lsapi. If you do not want to send error notifications from your server, you can disable this directive in lsapi.conf.

---

#### **lsapi_debug**

**Syntax** : lsapi_debug On/Off  
**Default** : lsapi_debug Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
Extended debug logging.

---

#### **Tuning LSPHP backend**

#### **lsapi_set_env**

**Syntax** : lsapi_set_env VAR_NAME [VAR_VALUE]  
**Default** : -  
**Context** : httpd.conf  

**Description** :  
Pass env variable to lsphp. By default lsphp environment have only TEMP, TMP and PATH variables set.  
Example: lsapi_set_env TMP "/var/lsphp-tmp"  
Note: PATH env var default "/usr/local/bin:/usr/bin:/bin" cannot be changed because of security reasons.  
To change it, use explicitly lsapi_set_env_path option.

---

#### **lsapi_set_env_path**

**Syntax** : lsapi_set_env_path [path(s)]  
**Default** : lsapi_set_env_path /usr/local/bin:/usr/bin:/bin  
**Context** : httpd.conf  

**Description** :  
Change PATH variable in the environment of lsPHP processes. Default path /usr/local/bin:/usr/bin:/bin will be used if not set.

---

#### **lsapi_backend_children**

**Syntax** : lsapi_backend_children [number]  
**Default** : lsapi_backend_children [EP]  
**Context** : httpd.conf  

**Description** :  
Sets env variable LSAPI_CHILDREN  
Maximum number of simultaneously running child backend processes.  
Optional, a default value is equal to EP.  
min value is 2; max value is 10000. If var value is more, 10000 will be used.

---

#### **lsapi_backend_connect_tries**

**Syntax** : lsapi_backend_connect_tries [number]  
**Default** : lsapi_backend_connect_tries 20  
**Context** : httpd.conf  

**Description** :  
Number of retries to connects to lsPHP daemon.

---

#### **lsapi_backend_connect_timeout**

**Syntax** : lsapi_backend_connect_timeout [number]  
**Default** : lsapi_backend_connect_timeout 500000  
**Context** : httpd.conf  

**Description** :  
Number of usec to wait while lsPHP starts (if not started on request).

---

#### **lsapi_backend_max_process_time**

**Syntax** : lsapi_backend_max_process_time [number]  
**Default** : lsapi_backend_max_process_time 300  
**Context** : httpd.conf  

**Description** :  
Sets env variable LSAPI_MAX_PROCESS_TIME  
Optional. Default value is 300.  
Timeout to kill runaway processes.

---

#### **lsapi_backend_pgrp_max_idle**

**Syntax** : lsapi_backend_pgrp_max_idle [number]  
**Default** : lsapi_backend_pgrp_max_idle 30  
**Context** : httpd.conf  

**Description** :  
Sets env variable LSAPI_PGRP_MAX_IDLE, in seconds.    
Controls how long a control process will wait for a new request before it exits. # 0 stands for infinite.  
Optional, default value is 30.  
Should be more or equal to 0.  

---

#### **lsapi_backend_use_own_log**

**Syntax** : lsapi_backend_use_own_log On/Off  
**Default** : lsapi_backend_use_own_log Off  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
Redirecting log output of backend processes from Apache error_log to dedicated log file or files, depending on value of lsapi_backend_common_own_log option. If Off, use Apache error log file for backend output, or separate file otherwise.

---

#### **lsapi_backend_common_own_log**

**Syntax** : lsapi_backend_common_own_log On/Off  
**Default** : lsapi_backend_common_own_log Off  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
It will be used only when lsapi_backend_use_own_log set to On. On - backend processes of the all virtual hosts will share the common log file. Off - every virtual host will have its own backend log file.

---

#### **lsapi_backend_coredump**

**Syntax** : lsapi_backend_coredump On/Off  
**Default** : lsapi_backend_coredump Off  
**Context** : httpd.conf, htaccess  

**Description** :  
env variable LSAPI_ALLOW_CORE_DUMP (On or Off). Pass LSAPI_ALLOW_CORE_DUMP to lsphp or not. If it will be passed - core dump on lsphp crash will be created.  
Off by default.  
By default LSAPI application will not leave a core dump file when crashed. If you want to have LSAPI PHP dump a core file, you should set this environment variable. If set, regardless the value has been set to, core files will be created under the directory that the PHP script in.

---

#### **lsapi_backend_accept_notify**

**Syntax** : lsapi_backend_accept_notify On/Off  
**Default** : lsapi_backend_accept_notify On  
**Context** : httpd.conf, virtualhost  

**Description** :  
Switch LSAPI_ACCEPT_NOTIFY mode for lsphp. This option can be used both in Global and VirtualHost scopes.This mode is incompatible with PHP 4.4.

---

#### **Connection pool mode**

#### **lsapi_with_connection_pool**

**Syntax** : lsapi_with_connection_pool On/Off  
**Default** : lsapi_with_connection_pool Off  
**Context** : httpd.conf  

**Description** :  
On/Off - disable enable connect pool, default is Off.

---

#### **lsapi_backend_max_idle**

**Syntax** : lsapi_backend_max_idle [number]  
**Default** : lsapi_backend_max_idle 300  
**Context** : httpd.conf  

**Description** :  
It is relevant only with lsapi_with_connection_pool option switched on. Controls how long a worker process will wait for a new request before it exits. 0 stands for infinite. Should be more or equal to 0. In the case of wrong format default value will be used. Optional, default value is 300.

---

#### **lsapi_backend_max_reqs**

**Syntax** : lsapi_backend_max_reqs [number]  
**Default** : lsapi_backend_max_reqs 10000  
**Context** : httpd.conf  

**Description** :  
It is relevant only with lsapi_with_connection_pool option switched on. Controls how many requests a worker process will process before it exits. Should be more than 0. In the case of wrong format default value will be used. Optional, default value is 10000.

---

#### **CRIU support (CloudLinux 7 only)**

#### **lsapi_criu**

**Syntax** : lsapi_criu On/Off  
**Default** : lsapi_criu Off  
**Context** : httpd.conf  

**Description** :  
Enable/disable CRIU for lsphp freezing. Default: Off.

---

#### **lsapi_criu_socket_path**

**Syntax** : lsapi_criu_socket_path [path]  
**Default** : lsapi_criu_socket_path /var/run/criu/criu_service.socket  
**Context** : httpd.conf  

**Description** :  
Set path to socket for communication with criu service. Default: /var/run/criu/criu_service.socket.

---

#### **lsapi_criu_imgs_dir_path**

**Syntax** : lsapi_criu_imgs_dir_path [path]  
**Default** : lsapi_criu_imgs_dir_path /var/run/mod_lsapi/  
**Context** : httpd.conf  

**Description** :  
Path to folder where images of freezed PHP will be stored. Should be path. Default: /var/run/mod_lsapi/

---

#### **lsapi_backend_initial_start**

**Syntax** : lsapi_backend_initial_start [number]  
**Default** : lsapi_backend_initial_start 0  
**Context** : httpd.conf  

**Description** :  
Number of requests to virtualhost, when lsphp will be freezed.  Default: 0 - means disable freezing.

---

#### **lsapi_criu_use_shm**

**Syntax** : lsapi_criu_use_shm Off/Signals  
**Default** : lsapi_criu_use_shm Off  
**Context** : httpd.conf  

**Description** :  
Method of requests counting. Off - use shared memory. Signals - use signals from child processes to parent. Default: Off

---

#### **lsapi_backend_semtimedwait**

**Syntax** : lsapi_backend_semtimedwait On/Off  
**Default** : lsapi_backend_semtimedwait On  
**Context** : httpd.conf  

**Description** :  
Use semaphore for checking when lsphp process will be started. Speed of start lsphp increased with semaphore using. This method avoid cycles of waiting for lsphp start. Default: On.

----

#### **lsapi_reset_criu_on_apache_restart**

**Syntax** : lsapi_reset_criu_on_apache_restart On/Off  
**Default** : lsapi_reset_criu_on_apache_restart Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
This option allows cleaning all CRIU images on Apache restart.  
Setting lsapi_reset_criu_on_apache_restart to On means that on each Apache restart the CRIU images which are stored in directory specified by lsapi_criu_imgs_dir_path directive will be recreated on new request to domain(only after restart).  
If this option set to Off then CRIU images won’t be recreated on Apache restart.

----

#### **PHP configuration management**

#### **lsapi_process_phpini**

**Syntax** : lsapi_process_phpini On/Off  
**Default** : lsapi_process_phpini Off  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
Enable or disable phpini_* directive processing. Default value is Off.

---

#### **lsapi_phpini**

**Syntax** : lsapi_phpini [path]  
**Default** : lsapi_phpini -  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
When lsapi_process_phpini option switched to Off, these values will be silently ignored. lsapi_phpini values with absolute filename of php.ini file can be inserted into .htaccess files in order to set custom php.ini which will override/complement settings from system default php.ini.

---

#### **lsapi_phprc**

**Syntax** : lsapi_phprc [No | Env | Auto | DocRoot]  
**Default** : lsapi_phprc No  
**Context** : httpd.conf, virtualhost  

**Description** :
The value of PHPRC env variable.  
Special values are "No", "Env", "Auto" and "DocRoot".  
Default value is "No" - without PHPRC at all.  
"Auto" value stands for php.ini from DocumentRoot of the corresponding VirtualHost if it is present, or from user's home directory otherwise "DocRoot" value stands for php.ini from DocumentRoot of the corresponding VirtualHost.  
"Env" value for using PHPRC from the environment, to set it with SetEnv config option, for example  
lsapi_phprc No  
lsapi_phprc Auto  
lsapi_phprc DocRoot  
lsapi_phprc Env  
lsapi_phprc /etc/

---

#### **lsapi_tmpdir**

**Syntax** : lsapi_tmpdir [path]  
**Default** : lsapi_tmpdir /tmp  
**Context** : httpd.conf, virtualhost  

**Description** :  
Set alternate request body temporary files directory.

---

#### **lsapi_enable_user_ini**

**Syntax** : lsapi_enable_user_ini On/Off  
**Default** : lsapi_enable_user_ini Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
Enable .user.ini files for backend. Same as suphp, php-fpm and fcgid mechanism of .user.ini. Default value is Off.

---

#### **lsapi_user_ini_homedir**

**Syntax** : lsapi_user_ini_homedir On/Off  
**Default** : lsapi_user_ini_homedir Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
If lsapi_enable_user_ini option is set to On, then enable/disable processing .user.ini file in home directory also. Default value is Off.

---

#### **lsapi_keep_http200**

**Syntax** : lsapi_keep_http200 On/Off  
**Default** : lsapi_keep_http200 Off  
**Context** : httpd.conf, .htaccess  

**Description** :  
If set to On, always keep backend's response status as mod_php do. If set to Off, response status can be overridden by Apache as suphp do (in case of call via ErrorDocument directive).

---

#### **lsapi_mod_php_behaviour**

**Syntax** : lsapi_mod_php_behaviour On/Off  
**Default** : lsapi_mod_php_behaviour On  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
On/Off - disable php_* directives, default On.

---

#### **php_value, php_admin_value, php_flag, php_admin_flag**

**Syntax** : [php_value|php_admin_value|php_flag|php_admin_flag]  
**Default** :  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
mod_php emulation.

---

#### **Security**

#### **lsapi_use_suexec**

**Syntax** : lsapi_use_suexec On/Off  
**Default** : lsapi_use_suexec On  
**Context** : httpd.conf  

**Description** :  
Use or not suexec to a target user.

---

#### **lsapi_user_group**

**Syntax** : lsapi_user_group [user_name] [group_name]  
**Default** : -  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
Set user & group for requests.  

---

#### **lsapi_uid_gid**

**Syntax** : lsapi_uid_gid [uid] [gid]  
**Default** : -  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
Set user & group for request.

---

#### **lsapi_use_default_uid**

**Syntax** : lsapi_use_default_uid On/Off  
**Default** : lsapi_use_default_uid On  
**Context** : httpd.conf  

**Description** :  
Use default Apache UID/GID if no uid/gid set. Values: On/Off. If Off, and no UID/GID set, error 503 will be returned.

---

#### **lsapi_target_perm**

**Syntax** : lsapi_target_perm On/Off  
**Default** : lsapi_target_perm Off  
**Context** : httpd.conf  

**Description** :  
Check target PHP script permissions. If set to On, lsapi will check that script is owned by the same user, as user under which it is being executed. Return 503 error if they don't match. Default: Off.

---

#### **lsapi_paranoid**

**Syntax** : lsapi_paranoid On/Off  
**Default** : lsapi_paranoid Off  
**Context** : httpd.conf  

**Description** :  
Check or not permissions of target php scripts. Optional, default value is Off.

---

#### **lsapi_check_document_root**

**Syntax** : lsapi_check_document_root On/Off  
**Default** : lsapi_check_document_root On  
**Context** : httpd.conf  

**Description** :  
Check or not owner of DOCUMENT_ROOT. Optional, default value is On.

---

#### **lsapi_disable_forced_pwd_var**

**Syntax** : lsapi_disable_forced_pwd_var On/Off  
**Default** : lsapi_disable_forced_pwd_var Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
To disable addition of PWD variable. Default value is Off. If set to On, the PWD variable will not be added into a backend environment.

---

#### **lsapi_max_resend_buffer**

**Syntax** : lsapi_max_resend_buffer [number]tmp  
**Default** : lsapi_max_resend_buffer 200  
**Context** : httpd.conf, virtualhost  

**Description** :  
Maximum buffer in KiB to resend for request that has a body (like POST request body).


### Command-line tools

#### switch_mod_lsapi tool


switch_mod_lsapi is the command line tool used to manage mod_lsapi PRO.

It has the following syntax:

`/usr/bin/switch_mod_lsapi [OPTIONS]`

`[OPTIONS]`  can be the main and an additional (for usage together with any other main option).

**Main options**

| | |
|-|-|
|**Option** | **Description**|
|`--setup` | setup _mod_lsapi_ configurations for Apache, including PHP handlers setup; create native lsphp (if it doesn't exist) by doing: `cp /opt/alt/php56/usr/bin/lsphp /usr/local/bin/` <br> _* NOT supported for DirectAdmin_ |
|`--setup-light` | setup PHP handlers only<br> _* supported for cPanel EasyApache 4 only_|
|`--uninstall` | uninstall _mod_lsapi_ from Apache<br> _* supported for cPanel (EasyApache 3 and EasyApache 4), Plesk, and servers without control panel_|
|`--enable-domain` | enable _mod_lsapi_ for individual domain<br> _* supported for cPanel EasyApache 3 only_|
|`--disable-domain` | disable _mod_lsapi_ for individual domain<br> _* supported for cPanel EasyApache 3 only_|
|`--enable-global` | sets up _mod_lsapi_ as a default way to serve PHP, making it enabled for all domains. Once that mode is enabled, you cannot disable _mod_lsapi_ for an individual domain.<br> _* supported for cPanel only (EasyApache 3 and EasyApache 4)_|
|`--disable-global` | disable _mod_lsapi_ as a default way to serve PHP, disabling _mod_lsapi_ for all domains, including those selected earlier using<br> _--enable-domain_ _* supported for cPanel EasyApache 3 only_|
|`--build-native-lsphp` | build native _lsphp_ for cPanel EasyApache 3<br> _* supported for cPanel EasyApache 3 only_|
|`--build-native-lsphp-cust` | build native _lsphp_ for cPanel EasyApache 3 (with custom PHP source path)<br> _* supported for cPanel EasyApache 3 only_|
|`--check-php` | check PHP configuration<br> _* NOT supported for DirectAdmin_|
|`--stat` | return usage statistics in JSON format; the following statistics metrics are collected:<br> • control panel name;<br> • mod_lsapi version;<br> • liblsapi version;<br> • criu version and status;<br> • whether mod_lsapi is enabled;<br> • lsapi configuration options;<br> • number of domains, that use _mod_lsapi_, per each installed PHP version including those set in PHP Selector _(this metric is supported for cPanel EasyApache 4, Plesk and DirectAdmin)_ .|

**Additional options**

| | |
|-|-|
|**Option** | **Description**|
|`--verbose` | switch verbose level on|
|`--force` | switch force mode on|


The following table presents which `[OPTIONS]` are supported for various panels:

| |  |  |  |  |  |  | |
|-|--|--|--|--|--|--|-|
| | No Control Panel | cPanel EA3 | cPanel EA4 | DirectAdmin | Plesk | InterWorx | ISPManager|
|`setup` | + | + | + | custombuild | + | + | +|
|`setup-light` | - | - | + | - | - | - | -|
|`uninstall` | + | + | + | custombuild | + | + | +|
|`enable-domain` | - | + | - | - | - | - | -|
|`disable-domain` | - | + | - | - | - | - | -|
|`enable-global` | - | + | + | custombuild | - | - | -|
|`disable-global` | - | + | - | custombuild | - | - | -|
|`build-native-lsphp` | - | + | - | - | - | - | -|
|`build-native-lsphp-cust` | - | + | - | - | - | - | -|
|`check-php` | + | + | + | - | + | + | +|
|`verbose` | + | + | + | - | + | + | +|
|`force` | + | + | + | - | + | + | +|
|`stat` | + <br> _*without domain info_ | + <br> _*without domain info_ | + | + | + | + <br> _*without domain info_ | + <br> _*without domain info_|


### Troubleshooting

**Debugging mod_lsapi issues: error_log & sulsphp_log**


mod_lsapi errors will be located in error_log and sulsphp_log.
Note that errors can appear in both logs at the same time, and you might need to refer to both of them to solve the issue.

See next table for more details:

| |  | |
|-|--|-|
|**error_log** | **sulsphp_log** | **Solution**|
|Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused. Increase memory limit for LVE ID |uid: (xxx/xxxxxxxx) gid: (xxx/xxxxxxxxxx) cmd: /usr/local/bin/lsphp  | Increase pmem or vmem limits for the user uid.|
|Error sending request: ReceiveLSHeader: nothing to read from backend socket |No need to check this log.  | lsphp was killed. It can be due to apache restart or lfd. If you see this  message too often - change <span class="notranslate">  lsapi_terminate_backends_on_exit </span> to <span class="notranslate"> Off </span> in lsapi.conf or add to <span class="notranslate"> /etc/csf/csf.pignore </span> the following lines: <span class="notranslate"> exe:/usr/local/bin/lsphp </span> pexe:/opt/alt/php.*/usr/bin/lsphp|
|Error sending request (lsphp is killed?): ReceiveLSHeader: nothing to read from backend socket, referer: http://XXXXXXX  Child process with pid: XXXXX was killed by signal: 11, core dump: 0 |No need to check this log.  | lsphp has crashed. Next slide will explain what to do (core dump creating). Also, check configuration options for apc and suhosin in php.ini. Once you have a core file generated at DocumentRoot contact [https://cloudlinux.zendesk.com/](https://cloudlinux.zendesk.com/hc/) so we can investigate the cause.|
|Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused |file is writable by others: (///usr/local/bin/lsphp)  | Incorrect lsphp file permissions. For fixing: <span class="notranslate"> chmod 755 /usr/local/bin/lsphp </span> cagefsctl --force-update.|
|Could not determine uid/gid for request |No need to check this log.  | UID/GID are not set in  virtualhost. Set <span class="notranslate"> lsapi_use_default_uid On </span> in lsapi.conf (it is <span class="notranslate"> On </span> by default since 0.1-98 version, this solution is for older versions).|
|Own id for script file (/xxxx/xxx/xxxx) is xxx; should be xxxx |No need to check this log.  | File is not owned by the user PHP executed by. To overwrite (insecure), set <span class="notranslate"> lsapi_target_perm Off </span> in lsapi.conf. |
|Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused |Entering jail error  | Check if СageFS enabled. Try running <span class="notranslate"> cagefsctl --remount-all. </span>|
|connect_lsphp: connect to lsphp failed: tries XXX exceeded with timeout XXXXX  Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused |uid: (xxx/xxxxxxxx)  gid: (xxx/xxxxxxxxxx)  cmd: /usr/local/bin/lsphp | Check if <span class="notranslate"> /tmp/lshttpd (global /tmp </span> is not inside CageFS) exists and owner should be apache: apache for DirectAdmin, Plesk, iWorx, ISPManager and nobody for cPanel.|
|Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: backend process reset connection: errno 104 (possibly memory limit for LVE ID XXXX too small) |uid: (xxx/xxxxxxxx)  gid: (xxx/xxxxxxxxxx)  cmd: /usr/local/bin/lsphp  | Increase PMEM limits for the user UID.|
|Reached max children process limit: XX, extra: 0, current: XX, please increase LSAPI_CHILDREN.<br><br>Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: backend process reset connection: errno 104 (possibly memory limit for LVE ID XXXX too small) |uid: (xxx/xxxxxxxx)  gid: (xxx/xxxxxxxxxx)  cmd: /usr/local/bin/lsphp  | Increase value of <span class="notranslate"> lsapi_backend_children </span> for UID in vhost.conf or globally in lsapi.conf.|
|fork() failed, please increase process limit: Cannot allocate memory<br><br>Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: backend process reset connection: errno 104 (possibly memory limit for LVE ID XXXX too small) |uid:(xxx); gid:(xxx); uid limit warning: EP should be < than NPROC, current EP: XX, NPROC: XX<br><br>uid: (xxx/xxxxxxxx) gid: (xxx/xxxxxxxxxx) cmd: /usr/local/bin/lsphp  | Increase NPROC limits for the UID. It should be greater than EP and <span class="notranslate"> lsapi_backend_children. </span>|
|Child process with pid: XXXXXX was killed by signal: 9, core dump: 0<br><br>Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: nothing to read from backend socket (LVE ID XXXX |uid: (xxx/xxxxxxxx) gid: (xxx/xxxxxxxxxx) cmd: /usr/local/bin/lsphp  | These errors occurs when the amount of PMEM limits is incommensurable with the number of EP. Increase PMEM limits or decrease EP number for the user UID.|
|totBytesRead (X) != bodyLen (X), referer: XXXX<br><br>Backend error on sending request(POST /XXXX HTTP/1.1); uri(/XXXX) content-length(X) (lsphp is killed?): ReceiveAckHdr: nothing to read from backend socket (LVE ID XXXX)<br><br>lsphp(XXXX): Child process with pid: XXXX was killed by signal: 15, core dump: 0 |No need to check this log.  | Increase LimitRequestBody (Apache) or/and SecRequestBodyNoFilesLimit (mod_security) configuration limits|
|Connect to backend failed: connect to lsphp failed: 13 |No need to check this log.  | Check that `mod_ruid2` is disabled|
|Connect to backend rejected on sending request(POST /XXXXX HTTP/1.1); uri(/XXXXX) |No need to check this log.|Set <span class="notranslate">`lsapi_disable_reject_mode On`</span> in your <span class="notranslate">`lsapi.conf`</span> and reload Apache. This way LSPHP daemon will put requests that cannot be served by LSPHP daemon right away into infinite queue, until one or more LSPHP daemon becomes free. Visit [Configuration Reference](/apache_mod_lsapi/#configuration-references) for more info.|


**Non-standard apache user**

If apache runs under a username other than <span class="notranslate"> "apache" </span> or <span class="notranslate"> "nobody" </span> , you should rebuild sulsphp (where username is built in for security reasons) with corresponding username:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel   
$ cd ~$ wget [http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz)  
$ tar zxvf mod_lsapi.tar.gz  
$ cd mod-lsapi-0.1-37  
$ cmake -DHTTPD_USER=<new user name> .  
$ make
$ make install
```
</div>
This will:<br>  
- Install: <span class="notranslate"> /usr/lib/apache/mod_lsapi. </span> so (or to another correct httpd modules path)<br>
- Install: <span class="notranslate"> /usr/sbin/sulsphp </span>

**lsphp started under user apache/nobody**

Check if SuExecUserGroup specified for virtual hosts. This parameter is used by mod_lsapi for user identification.

**Could not connect to lsphp backend: connect(/tmp/lshttpd/lsapi_application-x-httpd-lsphp_XXX.sock) failed: 111 Connection refused**

* Switch in lsapi.conf or <span class="notranslate"> mod_lsapi.conf </span> value to: <span class="notranslate"> lsapi_terminate_backends_on_exit Off </span>

* Check if empty: <span class="notranslate"> cat /etc/cron.d/kill_orphaned_php-cron | grep lsphp </span> , then run:

<div class="notranslate">

```
yum install lve-utils
```
</div>
Then restart cron service.

**Running PHP for users with UID < 99**

If you need to run PHP using mod_lsapi using users with UID < 99, you would need to re-compile sulsphp:

<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ cd ~
$ wget [http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz)
$ tar zxvf mod_lsapi.tar.gz
$ cd mod-lsapi-0.1-XX
$ cmake -DUID_MIN=80 -DGID_MIN=80 .
$ make
$ make install
```
</div>
will be installed<br>  
- Installing: <span class="notranslate"> /usr/lib/apache/mod_lsapi.so </span> (or another httpd modules path)<br>
- Installing: <span class="notranslate"> /usr/sbin/sulsphp </span>

**Apache binary called not httpd (httpd.event, httpd.worker)**

<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel 
$ cd ~
$ wget http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz        
$ tar zxvf mod_lsapi.tar.gz
$ cd mod-lsapi-0.1-XX
$ cmake -DPARENT_NAME="<apache binary name>".
$ make
$ make install
```
</div>
Will be installed:<br>
- Installing: <span class="notranslate"> /usr/lib/apache/mod_lsapi.so </span> (or another httpd modules path)<br>
- Installing: <span class="notranslate"> /usr/sbin/sulsphp </span>

**WHMCS Status page not accessible after installing CL and mod_lsapi (cPanel).**

* add <span class="notranslate"> user: useradd </span> userstat
* add to file (to the end of file before <span class="notranslate"> </IfModule>) /usr/local/apache/conf/conf.d/lsapi.conf: <Directory /usr/local/apache/htdocs/>  </span>
lsapi_user_group userstat userstat
</Directory>
* service httpd restart

This is safe solution for easyapache rebuilding and cpanel-mod-lsapi updating.

**PHP page with Suhosin return 503 error**

Make php.ini for suhosin as recommended below:
<div class="notranslate">

```
[suhosin]
suhosin.simulation = Off
suhosin.mail.protect = 1
suhosin.cookie.disallow_nul = Off
suhosin.cookie.max_array_depth = 1000
suhosin.cookie.max_array_index_length = 500
suhosin.cookie.max_name_length = 500
suhosin.cookie.max_totalname_length = 500
suhosin.cookie.max_value_length = 200000
suhosin.cookie.max_vars = 16384
suhosin.get.disallow_nul = Off
suhosin.get.max_array_depth = 1000
suhosin.get.max_array_index_length = 500
suhosin.get.max_name_length = 500
suhosin.get.max_totalname_length = 500
suhosin.get.max_value_length = 1000000
suhosin.get.max_vars = 16384
suhosin.post.disallow_nul = Off
suhosin.post.max_array_depth = 1000
suhosin.post.max_array_index_length = 500
suhosin.post.max_name_length = 500
suhosin.post.max_totalname_length = 500
suhosin.post.max_value_length = 1000000
suhosin.post.max_vars = 16384
suhosin.request.disallow_nul = Off
suhosin.request.max_array_depth = 1000
suhosin.request.max_array_index_length = 500
suhosin.request.max_totalname_length = 500
suhosin.request.max_value_length = 1000000
suhosin.request.max_vars = 16384
suhosin.request.max_varname_length = 524288
suhosin.upload.max_uploads = 300
suhosin.upload.disallow_elf = Off
suhosin.session.cryptua = Off
suhosin.session.encrypt = Off
suhosin.session.max_id_length = 1024
suhosin.executor.allow_symlink = Off
suhosin.executor.disable_eval = Off
suhosin.executor.disable_emodifier = Off
suhosin.executor.include.max_traversal = 8
```
</div>

**PHP page with APC return 503 error**

Make php.ini for APC as recommended below:
<div class="notranslate">

```
[apc]...apc.shm_segments=1apc.shm_size=32...
```
</div>
shared memory should be not less than 32MB

**Messages appearing in error_log: Child process with pid: XXXXX was killed by signal: 11, core dump: 0**

This means that lsphp was crashed. The solution is:

* Check if apc for user enabled. Tune its options as described in previous slide.
* Check if suhosin is enabled for user. Tune its options as described in this article.
* If previous items do not help, contact us at [https://helpdesk.cloudlinux.com/](https://helpdesk.cloudlinux.com/)

**How to get lsphp core dump on crash**

* Configure mod_lsapi to allow lsphp to generate core dumps. In mod_lsapi.conf:

<div class="notranslate">

```
lsapi_backend_coredump On
```
</div>

* Enable core file generation in sysctl:

<div class="notranslate">

```
sysctl -w ‘kernel.core_uses_pid=1’
sysctl -w ‘kernel.core_pattern=core.%p’
```
</div>

* Configure system to change max size of core files. In <span class="notranslate">/etc/security/limits.conf</span> add:

<div class="notranslate">

```
user1 soft core unlimited
user1 hard core unlimited
```
</div>
where <span class="notranslate">user1</span> is the username for which lsphp crashes.

* If <span class="notranslate">/etc/profile.d/limits.sh</span> exists, look up for the following lines:

<div class="notranslate">

```
if [ "$LIMITUSER" != "root" ]; then
ulimit -n 100 -u 35 -m 200000 -d 200000 -s 8192 -c 200000 -v unlimited 2>/dev/null
```
</div>
Substring <span class="notranslate">“-c 200000”</span> must be replaced with <span class="notranslate">“-c unlimited”</span> .

* Add line into <span class="notranslate">ulimit -c unlimited into apachectl</span> script just after another invokes of the <span class="notranslate">ulimit</span> command.

* Do cold restart of Apache with the command like this:

<div class="notranslate">

```
service httpd stop; sleep 2; killall lsphp; service httpd start
```
</div>

* You can make sure that ulimit for lsphp is changed to unlimited successfully with the following command:

<div class="notranslate">

```
cat /proc/PID/limits | grep ‘Max core file size’
```
</div>

where PID is a pid of any lsphp process. <span class="notranslate">ps -u user1 | grep lsphp </span>

* Core dump of lsphp will be created in the DocumentRoot of the corresponding virtual server.
On cPanel server it should map to

**mod_lsapi is not included in output of httpd -M after installation and setup command for cPanel EasyApache 3**

1. Check if the file <span class="notranslate"> _/usr/local/apache/conf/conf.d/lsapi.conf_ </span> exists and not empty;

2. Check if output of the command

<div class="notranslate">

```
cat /usr/local/apache/conf/httpd.conf | grep "/usr/local/apache/conf/conf.d/\*\.conf"
```
</div>
is not empty.

If it is empty:

1. Add to <span class="notranslate"> "include" </span> section of <span class="notranslate"> _/var/cpanel/conf/apache/main_ </span> string:

<span class="notranslate"> </span>
```
"include": '"/usr/local/apache/conf/conf.d/*.conf"'
 "include":
 "directive": 'include'
 "items":
 ...
 -
 "include": '"/usr/local/apache/conf/conf.d/*.conf"' 
 "listen":
```

2. Do:

<div class="notranslate">

```
mkdir -p /usr/local/apache/conf/conf.d/;                                                                                 
cp /usr/share/lve/modlscapi/confs/lsapi.conf /usr/local/apache/conf/conf.d/lsapi.conf
```
</div>

3. Call:

<div class="notranslate">

```
/scripts/rebuildhttpdconf/scripts/restartsrv_httpd
```
</div>

### FAQ on mod_lsapi


Q: **_Is it compatible with EasyApache?_**

A: Yes, it is. EasyApache works/fully integrates with mod_lsapi.

Q: **_Is it compatible with <span class="notranslate"> PHP Selector </span> ?_**

A: Yes.

Q: **_Are .htaccess PHP directives supported? For example, mod_php like directives?_**

A: Yes. mod_lsapi can read php_* and php_admin_* directives.

Q: **_I have httpd.conf with SuExecUserGroup options. Do I need to add mod_lsapi related options for VirtualHost?_**

A: No need to change httpd.conf. mod_lsapi can read suPHP_UserGroup, RUidGid, SuExecUserGroup, AssignUserID parameters to determine user id under which site is running. Additionally you can use lsapi_uid_gid or lsapi_user_group as a native way to specify user / group ids.

Q: **_What is the difference between running mod_lsapi with lsapi_with_connection_pool mode_** <span class="notranslate"> On </span> **_and_** <span class="notranslate"> Off </span> **_?_**

A: When  lsapi_with_connection_pool mode is <span class="notranslate"> Off </span> , then the new backend lsphp process has to be created for each new incoming request. At least it requires mod_lsapi to connect to backend lsphp master-process and have it perform fork which leads to a slowdown.

With <span class="notranslate"> pool_mode enabled, mod_lsapi maintains persistent connections with backend which drastically increases performance (accelerates requests processing), but also increases the number of processes in LVE as well memory usage. Backend lsphp processes stays alive for lsapi_backend_max_idle time, or until lsapi_backend_max_reqs is reached (or Apache restarted).  </span>

Alternatively, we have another accelerating technology - [CRIU](/apache_mod_lsapi/#criu-support) , which is faster and uses less memory. But it is in Beta so far and available for CL7 only (stable version will appear in the near future).

Q: **_Your PHP installation appears to be missing the… How to manage native PHP with mod_lsapi under EasyApache 3?_**

A: There are several ways to do that.

1. _Using_ <span class="notranslate"> PHP Selector </span> _._

To find <span class="notranslate"> PHP Selector </span> in user’s panel choose <span class="notranslate"> _Select PHP Version_ </span> icon as follows:

![](/images/mod_lsapi_faq.jpg)

From <span class="notranslate"> PHP Selector </span> you can manage PHP version and choose the necessary extensions to be used by PHP. Choose proper PHP version from the drop-down and click <span class="notranslate"> _Set as current_ </span> . Mark proper checkboxes to choose extensions and click <span class="notranslate"> _Save_ </span> :

![](/images/mod_lsapi_faq_01.jpg)

This is a simple and convenient way to configure the user's PHP.

2. _Using native PHP from_ <span class="notranslate"> PHP Selector </span> _._

mod_lsapi installs alt-php56 as native by default (just copy of alt-php56):

![](/images/mod_lsapi_faq_02.jpg)

The native version is not designed to enable or disable PHP extensions through the web interface of the <span class="notranslate"> PHP Selector </span> . This can lead to missing of the proper PHP extensions for customers applications.

For example, you can get the following reply from the website that is using <span class="notranslate"> WordPress </span> and native PHP:

![](/images/mod_lsapi_faq_03.jpg)

There are two ways to solve this problem:

Use non-native PHP with proper extensions enabled via the <span class="notranslate"> PHP Selector </span> (described above).
Use native PHP with properly configured .ini files (described below).

To configure native PHP, use an additional .ini file <span class="notranslate"> _/opt/alt/php56/link/conf/default.ini_ </span> :

![](/images/mod_lsapi_faq_04.jpg)

By default it is empty. To solve the issue this way, the following strings must be added:

<div class="notranslate">

```
extension=/opt/alt/php56/usr/lib64/php/modules/mysqli.so
extension=/opt/alt/php56/usr/lib64/php/modules/pdo_mysql.so
extension=/opt/alt/php56/usr/lib64/php/modules/pdo.so
```
</div>
All available extensions for alt-php56 can be seen by running the command:

<div class="notranslate">

```
# ls /opt/alt/php56/usr/lib64/php/modules/
```
</div>

**Note.** Some extensions may conflict with each other, be careful when enabling them through the <span class="notranslate"> _default.ini_ </span> file.

3. _Using switch_mod_lsapi --build-native-lsphp as native._

You can find additional notes on native PHP installation (EasyApache 3 only) on the link: [https://docs.cloudlinux.com/apache_mod_lsapi/#installation](/apache_mod_lsapi/#installation)

To see what kind of native PHP is used, use the command:

<div class="notranslate">

```
# /usr/local/bin/php -v
```
</div>

Output example:
<div class="notranslate">

```
PHP 5.6.30 (cli) (built: Jun 13 2017 06:23:21) Copyright (c) 1997-2016 The PHP GroupZend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
```
</div>
The command <span class="notranslate">_switch_mod_lsapi --build-native-lsphp_ </span> builds the lsphp of the same version, it will be used as native via the PHP Selector, but with another .ini file to configure.

![](/images/mod_lsapi_faq_05.jpg)

We do not recommend to use this native PHP because it does not support [CRIU](/apache_mod_lsapi/#criu-support) .

To revert alt-php56 to the native PHP, execute the following command:

<div class="notranslate">

```
# cp /opt/alt/php56/usr/bin/lsphp /usr/local/bin/
```
</div>

Q: **_Is there any difference in using lsphp binaries from alt-php or ea-php packages with Litespeed Web Server compared to lsphp [from the source](https://www.litespeedtech.com/open-source/litespeed-sapi/php) ?_**

A: In this case, there is no difference. Our binaries fully correspond to the native behavior when used with Litespeed Web Server.

Q: **_Is it possible to use CRIU with Litespeed Web Server?_**

A: Yes, Litespeed Web Server officially supports CRIU on the servers with CloudLinux. For detailed information on setting up CRIU with a Litespeed Web Server, follow the [link](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:cloudlinux:lsphp_criu_enable) . You can also use lsphp binaries from alt-php or ea-php packages for that purpose.


Q: **_Is the <span class="notranslate">New Relic</span> extension compatible with the mod_lsapi PRO?_**

A: Yes, it is. Follow the next guide on how to enable it with mod_lsapi PRO.

#### Installation guide New Relic with mod_lsapi PRO

Currently, the <span class="notranslate">[New Relic PHP Agent](https://docs.newrelic.com/docs/agents/php-agent)</span> extension is supported for <span class="notranslate">alt-php</span> version 7.0 and higher. It can be installed for <span class="notranslate">alt-php</span> with the <span class="notranslate">`alt-php**-pecl-ext`</span> package (`**` - version 70 and higher).

For example:

<div class="notranslate">

```
# yum install alt-php70-pecl-ext
```
</div>

The next step is to enable the <span class="notranslate">New Relic</span> extension on the domain. You can do this through `php.ini` configuration or via <span class="notranslate">[PHP Selector](/php_selector/#using)</span>.

We assume that the <span class="notranslate">mod_lsapi PRO</span> is already installed and enabled on the domain. If not, visit [mod_lsapi PRO installation guide](/apache_mod_lsapi/#installation).

The next step is to specify the <span class="notranslate">New Relic</span> license and the name of your application on the domain. This can be easily done by adding the following lines to the main htaccess file of domain or to the virtual host section of the Apache configuration file:

<div class="notranslate">

```
<IfModule lsapi_module>
    php_value newrelic.appname  "My PHP Application"
    php_value newrelic.license  "<My license key>"
</IfModule>

```
</div>

The only thing you need to make sure that the directive <span class="notranslate">[`lsapi_mod_php_behaviour`](https://docs.cloudlinux.com/apache_mod_lsapi/#lsapi-mod-php-behaviour)</span> is on. To further configure the PHP agent use the [link](https://docs.newrelic.com/docs/agents/php-agent/configuration/php-agent-configuration).

### CRIU Support

:::tip Note
<span class="notranslate"> CloudLinux </span> 7 only
:::

CRIU is <span class="notranslate"> _Checkpoint/Restore In Userspace_ </span> , (pronounced <span class="notranslate"> kree-oo </span> ), is a software tool for Linux operating system. Using this tool, you can freeze a running application (or part of it) and checkpoint it as a collection of files on disk. You can then use the files to restore the application and run it exactly as it was during the time of freeze (more information on the link [https://criu.org/Main_Page](https://criu.org/Main_Page) ).

mod_lsapi-1.1-1 is the first beta version with freezing PHP implemented. mod_lsapi now supports the following parameters:

| |  |  | |
|-|--|--|-|
|**Option name** | **Description** | **Values** | **Default**|
|lsapi_criu | Enable/disable CRIU for lsphp freezing. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> Off </span>|
|lsapi_criu_socket_path | Set path to socket for communication with criu service. | [path to socket] | <span class="notranslate"> /var/run/criu/criu_service.socket </span>|
|lsapi_backend_semtimedwait | Enable/disable flag for notification about lsphp started. This method avoid cycles of waiting for lsphp start. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> On </span>|
|lsapi_backend_initial_start | Number of request when lsphp should be freezed. | [number] 0 - no freezing | 0|
|lsapi_criu_use_shm | Method of requests counting. <span class="notranslate"> Off </span> - use shared memory. <span class="notranslate"> Signals </span> - use signals from child processes to parent. | <span class="notranslate"> Off/Signals </span> | <span class="notranslate"> Off </span>|
|lsapi_criu_imgs_dir_path | Path to folder where imgs of freezed PHP will be stored. | [path] | <span class="notranslate"> /var/run/mod_lsapi/ </span>|
|lsapi_criu_debug | Enable/Disable CRIU related debug logging. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> Off </span>|

Example:
<div class="notranslate">

```
lsapi_criu On
lsapi_criu_socket_path /var/run/criu/criu_service.socket
lsapi_backend_semtimedwait On
lsapi_backend_initial_start 15
lsapi_criu_use_shm Off
lsapi_criu_debug Off
```
</div>

When Apache module mod_lsapi detects CRIU enabled (lsapi_criu On) it prepares a directory for images (on the first request of virtualhost) to store ( <span class="notranslate"> lsapi_criu_imgs_dir_path /var/run/mod_lsapi/[dir_name] </span> ), and starts lsphp process. Lsphp increases counter ( <span class="notranslate"> lsapi_criu_use_shm Off|Signals </span> ) via shared memory or signals, when counter reaches limit ( <span class="notranslate"> lsapi_backend_initial_start 15 </span> ), lsphp sends the request to CRIU for freezing. CRIU service makes images of requested processes. Lsphp will not be frozen if counter has not reached the limit. The next time when lsphp will be stopped, it will be unfrozen from the images.

The images of the processes will be saved even if Apache is restarted. But all images will be deleted after server restart by default configuration. This can be modified by setting the new path <span class="notranslate"> lsapi_criu_imgs_dir_path </span> .

**Important!** If php.ini or configuration file from php.d is changed, the images must be deleted manually.

**Note** that CRIU (version lower than criu-lve-3.6-1) can't correctly freeze <span class="notranslate"> lsphp </span> with <span class="notranslate"> PrivateTmp </span> enabled. For correct work, <span class="notranslate"> PrivateTmp </span> must be <span class="notranslate"> false </span> in <span class="notranslate"> httpd.service file </span> . For disabling:

Copy <span class="notranslate"> _httpd.service_ </span> to <span class="notranslate"> _/etc/systemd/system_ </span> and change there <span class="notranslate"> PrivateTmp: 
  </span>
<div class="notranslate">

```
# cat httpd.service
[Unit]
Description=Apache web server managed by cPanel Easy
ApacheConditionPathExists=!/etc/httpddisable
ConditionPathExists=!/etc/apachedisable
ConditionPathExists=!/etc/httpdisable

[Service]Type=forking
ExecStart=/usr/local/cpanel/scripts/restartsrv_httpd --no-verbose
PIDFile=/var/run/apache2/httpd.pid
PrivateTmp=false 

[Install]
WantedBy=multi-user.target 
```
</div>
Or it would be technically better to provide a small override of service file rather than copying the whole new version in <span class="notranslate"> /etc/systemd/system </span> 

[http://www.freedesktop.org/software/systemd/man/systemd.unit.html](http://www.freedesktop.org/software/systemd/man/systemd.unit.html)

<div class="notranslate">

```
mkdir /etc/systemd/system/httpd.service.d
echo "[Service]" >  /etc/systemd/system/httpd.service.d/nopt.conf
echo "PrivateTmp=false" >> /etc/systemd/system/httpd.service.d/nopt.conf
```
</div>

and

<div class="notranslate">

```
# systemctl daemon-reload
```
</div>

**Installation**

Criu is installed with dependency to mod_lsapi-1.1 package. To activate it:

1. Enable service and start it:

<div class="notranslate">

```
systemctl enable criu
systemctl start criu
```
</div>

2. Edit lsapi.conf file, turn CRIU On and set some defaults:

<div class="notranslate">

```
lsapi_criu On
lsapi_criu_socket_path /var/run/criu/criu_service.socket
lsapi_backend_semtimedwait On
lsapi_backend_initial_start 15
lsapi_criu_use_shm Off
```
</div>

3. Restart apache:

<div class="notranslate">

```
service httpd restart
```
</div>



1. An option added to the Apache configuration for cleaning all the images earlier saved by CRIU.

| |  |  | |
|-|--|--|-|
|**Option name** | **Description** | **Value** | **Default**|
|<span class="notranslate">lsapi_reset_criu_on_apache_restart</span> | This option allows cleaning all CRIU images on Apache restart. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> Off </span>|

On the next restart of Apache all of the images will be cleaned.

It can be enabled by writing <span class="notranslate">lsapi_reset_criu_on_apache_restart On </span> in _lsapi.conf_ (Virtual Host and .htaccess do not allow to use this option).

Note that this option works only if <span class="notranslate">lsapi_terminate_backends_on_exit</span> is <span class="notranslate">  On  </span> (default value is <span class="notranslate"> On </span> , it is set in _lsapi.conf_ too).

2. If you need to clean CRIU images for one user you can simply add file to the user's directory with CRIU images (default <span class="notranslate"> _/var/run/mod_lsapi/lsapi_ * _criu_imgs_ </span> ). On the next restart of lsphp the images will be cleaned.

3. Global reset flag for cleaning all earlier saved images by CRIU.

Current mod_lsapi allows cleaning all images only with one flag file.

Create <span class="notranslate"> /usr/share/criu/mod_lsapi/lsphp.criu.reset </span> file. Also don't forget to set such permissions <span class="notranslate"> [nobody:nobody] </span> (or <span class="notranslate"> [apache:apache] </span> for non cPanel) and access mode [700] to the <span class="notranslate"> /usr/share/criu/mod_lsapi </span> directory.

Steps to do :

<div class="notranslate">

```
mkdir /usr/share/criumkdir /usr/share/criu/mod_lsapi
chown nobody:nobody /usr/share/criu/mod_lsapi
touch /usr/share/criu/mod_lsapi/lsphp.criu.reset
```
</div>

On the next requests to all virtual hosts images will be recreated (deleted first and created again later - it depends on lsapi_backend_initial_start value).

4. Аdded possibility to clean CRIU images from user space.

If a user needs to clean CRIU images for lsphp, he should create a file: <span class="notranslate"> ~/mod_lsapi_reset_me_[vhost_name] </span>. Where <span class="notranslate"> [vhost_name] </span> is a ServerName from the VirtualHost block in the configuration file. On the next restart of lsphp, the images will be cleaned.

_Example:_

<div class="notranslate">

```
cd; touch mod_lsapi_reset_me_criu.test.com
```
</div>

where _vhost.conf_ contains:  
<span class="notranslate">_ServerName criu.test.com_ </span>



This mode is enabled by default and creates a separate lsphp process for each virtual host.

<span class="notranslate"> _mod_lsapi_reset_me[vhost_name]_ </span> flag will not work for a user when lsapi_per_user option is <span class="notranslate"> On </span> .

5. There is (default <span class="notranslate"> off </span> ) option in mod_lsapi that creates only one lsphp process for a user, regardless of the number of his virtual hosts. We don't recommend to use this option with CRIU, but if you use it, make sure that your virtual hosts (under the same user) have the same environment configurations. If they are not the same, this may cause undesirable lsphp process operation.


