# User interface (LVE Manager)

* [LVE Manager](/lve_manager/#lve-manager)
* [inodes](/limits/#inodes)
* [Control panel integration guide](/lve_manager/#control-panel-integration-guide)

<span class="notranslate">LVE Manager</span> is a plugin for most popular control panels including cPanel, Plesk, DirectAdmin and ISPmanager (InterWorx coming soon). It allows you to control and monitor limits, and set limits on per package bases.

<span class="notranslate">LVE Manager</span> is installed by default on most servers. If it is missing you can always install it by running:

<div class="notranslate">

```
$ yum install lvemanager
```
</div>


## LVE Manager

* [Notifications color codes](/lve_manager/#notifications-color-codes)

<span class="notranslate">cPanel LVE Manager</span> administrator interface allows monitoring and managing limits for hosts end users, managing packages and monitoring statistics.

Administrator credentials allow controlling limits for host users.

![](/images/lvemanagermainmenu_zoom80.png)

Log in as administrator to get access to the following functionality:

* <span class="notranslate">Dashboard</span> provides a quick overview of statistics and all administrative information for server administrators.
* <span class="notranslate">Current usage</span> tab - allows monitoring users resource usage at the moment;
* <span class="notranslate">Users</span> tab with the list of all users allows viewing and managing all the users limits;
* <span class="notranslate">Statistics</span> tab displays the statistics of resource usage for proper timeframe or proper users;
* <span class="notranslate">Options</span> tab - allows setting LVE Faults email notifications for users;
* <span class="notranslate">Packages</span> allows managing packages limits;
* <span class="notranslate">PHP Selector</span> tab.

For more details, please go to the [ImunifyAV documentation](https://docs.imunifyav.com/).

<div class="notranslate">

#### Notifications color codes <sup><Badge text="LVE Manager 5.3.7-1+"/></sup>

In the LVE Manager UI we use the following color codes for notifications:

* ![](/images/pic_warning.png) warning
* ![](/images/pic_error.png) error
* ![](/images/pic_info.png) information
* ![](/images/pic_success.png) success

The following actions are available in the action notifications (error, success)
 * follow a link
 * copy a command
 * copy a whole traceback

The following actions are available in the system notifications (information, warning):
* follow a link
* copy a command
* copy a whole message
* mark a notification as “Read”
* snooze a notification


</div>



### Website monitoring tool and Slow Site analyzer

* [Website monitoring tab](/lve_manager/#website-monitoring-tab)
* [Main](/lve_manager/#main)
* [PHP Slow Site analyzer](/lve_manager/#php-slow-site-analyzer)
* [Settings](/lve_manager/#settings)
* [What is the density threshold?](/lve_manager/#what-is-the-density-threshold)
* [Email notifications](/lve_manager/#email-notifications)
* [The cloudlinux-ssa-manager CLI utility](/command-line_tools/#the-cloudlinux-ssa-manager-utility)
* [The wmt-api CLI utility](/command-line_tools/#the-wmt-api-utility)
* [FAQ](/lve_manager/#faq)

**Website monitoring tool** is a new tool that collects the statistics of the domains' availability and responsiveness, as well as errors that occur when accessing these domains. An admin can get email reports with the statistics. The website monitoring tool uses the simple curl request like `curl http://domain.com` to get domains’ statistics.

**PHP Slow Site analyzer** is a new tool that generates daily reports for the server administrator with information about the top N slow PHP-based domains and URLs. Slow Site analyzer tracks all PHP-based requests and selects slow ones by certain rules.   

:::tip Note
Slow Site analyzer is not available for CloudLinux 6.
:::
 
**Installation**

To install the tool, run the following command:

```
yum update lvemanager
```

:::warning Warning
For now, there is no any possibility to remove the `alt-php-ssa` and `cl-web-monitoring-tool` packages so that the _Website monitoring_ tab will be removed. This possibility will be added in the future releases.

You can turn off the _Website monitoring_, _PHP Sites Analyzer_ in the _[Settings](/lve_manager/#settings)_ subtab, so sites statistics will stop collecting and there will be no additional load on the server.
:::

#### Website monitoring tab

You can configure the Website monitoring tool and Slow Site analyzer and view the daily reports in the LVE Manager -> Website monitoring tab.

There are Main, PHP Site analyzer, and Settings subtabs here.

#### Main

This subtab views the latest report (for the previous day) of the Website monitoring tool.

![](/images/WebsiteMonitoringMain.png)

Remember that report is created every 24 hours and all changes in configuration (the _Settings_ tab) or in the list of domains will be applied for the next 24 hours (from midnight).

* **Total number of requests** - requests that were sent to all domains, existing on the servers
* **Successful requests** - the number of requests for all domains with ![](/images/Code200.png)
* **Requests with errors** - the number of requests for all domains which status code is not 200
* **Not started requests due to short check interval** - this metric is used to adjust configuration. If it is not equal 0, an admin should increase the value of Requests sending interval, because the tool does not fit into this interval to send requests to all domains.
* **Slowest websites in 24h and Websites with most errors in 24h** - in these sections you can find the number of domains that was exposed here.

  ![](/images/TopSlow.png)


#### PHP Slow Site analyzer

:::tip Note
The Slow Site analyzer is not available for CloudLinux 6.
:::

![](/images/WebsiteMonitoringPHPSiteAnalyzer.png)

This is an example of a report from the Slow Site analyzer. The report shows the number of slow requests per domain and its URLs and the average duration of each slow URL.

You can find the explanation of the **Slow requests density in period** [here](/lve_manager/#what-is-the-density-threshold).


#### Settings

Here, an admin can configure the Website monitoring and the PHP Site analyzer.

:::tip Note
All settings which was changed after starting Website monitoring and Slow site analyzer will be applied for the next 24h (from midnight).
:::

To enable or disable **Website monitoring**, use the following slider.

![](/images/WebsiteMonitoringSlider.png)

* **Top N slow websites to show** - this number (N) will be used to select the top N domains from the list of all domains, sorted by response duration (Slowest websites list). And this number also will be used to select the top N domains from the list of all domains, sorted by amount of errors (Websites with most errors list).
* **Requests sending interval** - this is a period in minutes between requests to the same domain.
* **Domain response timeout** - if there is no answer from the website for this period of time, the Website Monitoring tool will regard this behaviour as the `HTTP 408` error.
* **Concurrent requests limit** - how many concurrent requests can be done by the Website Monitoring tool.

To enable or disable the **Slow site analyzer**, use the following slider.

:::tip Note
Slow Site analyzer is not available for CloudLinux 6.
:::

![](/images/WebsiteMonitoringSlider1.png)

* **Top N slow websites to show** - this number (N) will be used to select the top N domains from the list of all domains, marked as slow.
* **Top slow URLs** - this number (N) will be used to select the top N URLs for each domain, marked as slow.
* **Slow request duration** - the duration of a request in seconds. 
* **Slow requests number & Analysis time** - how many requests with a certain request duration should be done in time to mark the domain as a slow one.
* **Slow requests density threshold** can be in the interval [0..1], by default it is 0.8. The **density threshold** can be disabled. And the **Domains and URLs Ignore List** can be specified.

#### What is the density threshold?

We try to find the most interesting requests for the optimisation from all number of requests to domains during 24 hours. The _Density threshold_ parameter helps to find the most visited URLs and the most popular requests. 

A density threshold is a numerical measure of some type of correlation, meaning the power of the statistical relationship between slow requests and all requests to the domain. If this parameter is enabled then the resulting table will contain slow requests that have exceeded the specified threshold. Requests with the highest density are usually the most distributed per day and are considered valuable to users, thus interesting for optimization.

Slow requests that represent bursts of activity and are weakly related to all activity per domain typically have a low density and will be weeded out.

#### Email notifications

Email notifications are created by the Web monitoring tools. 

**Example of the Web monitoring tools report**.

![](/images/EmailNotifications.png)

**Example of the PHP Slow site analyzer report**.

![](/images/SlowSiteAnalyzerEmailNotifications.png)


#### FAQ

Q: Does this feature consume a lot server resources for collecting website and PHP data? If I enable it can this slow down the server?

A: The load depends on the number of websites and the Website monitoring tool settings. Basically, the Website monitoring should not create a significant load and you can keep it always on.

---

Q: Can I change the default value to 10, for example for the "Top N slow websites to show" setting?

A: This number is simply the number of the slowest responding sites. All sites are sampled during the day. When generating a report, all sites' responses are sorted by response time from highest to lowest, and to make the report readable, only the first N sites are taken. You can specify N as all existing sites or only the 5 slowest. This number does not affect the server load, it only affects the report that will be visible in the UI or emailed to the administrator.

---

Q: What would you recommend: to enable the Website monitoring tool for some days and then disable or I can keep it always turned on?

A: The load depends on the number of websites and the Website monitoring tool settings. Basically, the Website monitoring tool should not create a significant load and you can keep it always on.


### LVE plugins branding

:::tip Note
Requires <span class="notranslate">LVE Manager</span> 2.0-33+
:::

It is possible to apply branding to the LVE Plugins in cPanel end users’ interface. To brand the cPanel end users'  interface please do the following:

* Create a script that will patch <span class="notranslate">LVE Manager</span> files (with branding data, for example, image and logo) after every update of <span class="notranslate">`lvemanager rpm`</span> package;

* Locate this script in <span class="notranslate">`/usr/share/l.v.e-manager/branding_script`</span>;

* Make this script executable by running the command:

<div class="notranslate">

```
chmod a+x /usr/share/l.v.e-manager/branding_script
```
</div>

When done, the branding script will be executed while every update of <span class="notranslate">lvemanager</span> package and all branding changes will be applied in the end user’s interface.

:::tip Note
Modifying the <span class="notranslate">LVE Manager WHM</span> plugin (<span class="notranslate">`/usr/local/cpanel/whostmgr/docroot/cgi/CloudLinux.cgi`</span>) via <span class="notranslate">`branding_script`</span> is not allowed.
:::

