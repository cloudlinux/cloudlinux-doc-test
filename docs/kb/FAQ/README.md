# FAQ

## FAQ on PHP Selector integration with cPanel’s MultiPHP Manager

Q. **How could I set the Inherited option for all new accounts/websites by default?**

A. You won’t have to; cPanel already sets the Inherited by default for all newly created accounts. You can find more information about the way PHP Inheritance works [on this page](https://documentation.cpanel.net/display/EA4/PHP+Inheritance#PHPInheritance-Howinheritanceworks).

Q. **How could I set the Inherited option for all new accounts/websites when I transfer them from one server to another?**

A. If after transferring users, they do not have Inherited version set in MultiPHP Manager, you can run this script to switch ALL domains on the server to Inherited version: 

<div class="notranslate">

```
# for i in $(cut -d: -f1 /etc/userdatadomains );do whmapi1 php_set_vhost_versions version=inherit vhost-0=$i;done 
```
</div>

::: danger Attention!
Be very careful with that script because it will change PHP versions for ALL domains on your server to inherited. If you are not sure that you want exactly this, use WHM interface and manually select the domains you wish to switch PHP version for.
:::

Q. **What setup do you recommend for CL PHP Selector?**

A. The recommended setup is the one described in [this](/cloudlinux_os_components/#configuration-and-using) section of the document. Additionally, if you are using Apache web server, we recommend using mod_lsapi as PHP Handler. Install it using [this](/cloudlinux_os_components/#installing-on-cpanel-servers-with-easyapache-4) guide. Enable it in WHM » MultiPHP Manager » Handers.

Also, if you configured PHP Selector, we recommend to disable MultiPHP Manager for users. You can do that in <span class="notranslate">Home » Packages » Feature Manager » Feature Lists » Manage feature list » select Default and uncheck the box for MultiPHP INI Editor and MultiPHP Manager</span>. This will stop your customers from seeing MultiPHP Manager/Editor which can be very confusing.

Q. **Can I disable alt-phpXX versions from MultiPHP Manager’s dropdown list?**

A. You can do so by editing the `/opt/alt/alt-php-config/alt-php.cfg` file.

Once you edit it, run the `/opt/alt/alt-php-config/multiphp_reconfigure.py` script; it manages SCL prefixes for the Alt-PHP in `/etc/scl/prefixes`.

In this example, we keep the `alt-php72` visible in the list only:

<div class="notranslate">

```
[MultiPHP Manager]
alt-php44 = no
alt-php51 = no
alt-php52 = no
alt-php53 = no
alt-php54 = no
alt-php55 = no
alt-php56 = no
alt-php70 = no
alt-php71 = no
alt-php72 = yes
```
</div>

Q. **I don’t want to use the PHP Selector, but I’d like to select the alt-phpXX version for one account/website. Can I do that?**

A. Sure. You’ll need to choose the alt-phpXX in the MultiPHP Manager » PHP Version here:

![](/images/faq_01.jpg)

Q. **I followed the guide, but the PHP version is still not fetched for my website from PHP Selector. What did I miss?**

A. Make sure to check our Compatibility Matrix. It contains additional information on components that are incompatible with PHP Selector. You may need to remove mod_ruid2.

## Apache mod_lsapi PRO FAQ

Q: **Is it compatible with EasyApache?**

A: Yes, it is. EasyApache works/fully integrates with mod_lsapi.

Q: **Is it compatible with PHP Selector?**

A: Yes.

Q: **Are .htaccess PHP directives supported? For example, mod_php like directives?**

A: Yes. mod_lsapi can read php_* and php_admin_* directives.

Q: **I have httpd.conf with SuExecUserGroup options. Do I need to add mod_lsapi related options for VirtualHost?**

A: No need to change httpd.conf. mod_lsapi can read suPHP_UserGroup, RUidGid, SuExecUserGroup, AssignUserID parameters to determine user-id under which site is running. Additionally, you can use lsapi_uid_gid or lsapi_user_group as a native way to specify user/group ids.

Q: **What is the difference between running mod_lsapi with lsapi_with_connection_pool mode _On_ and _Off_?**

A: When lsapi_with_connection_pool mode is Off, then the new backend lsphp process has to be created for each new incoming request. At least it requires mod_lsapi to connect to backend lsphp master-process and have it perform fork which leads to a slowdown.

With pool_mode enabled, mod_lsapi maintains persistent connections with backend which drastically increases performance (accelerates requests processing) but also increases the number of processes in LVE as well as memory usage. Backend lsphp processes stay alive for lsapi_backend_max_idle time, or until lsapi_backend_max_reqs is reached (or Apache restarted).

Alternatively, we have another accelerating technology - [CRIU](/apache_mod_lsapi/#criu-support), which is faster and uses less memory. But it is available only for CL7.

Q: **Is there any difference in using lsphp binaries from alt-php or ea-php packages with Litespeed Web Server compared to lsphp [from the source](https://www.litespeedtech.com/open-source/litespeed-sapi/php)?**

A: In this case, there is no difference. Our binaries fully correspond to the native behavior when used with Litespeed Web Server.

Q: **Is it possible to use CRIU with Litespeed Web Server?**

A: Yes, Litespeed Web Server officially supports CRIU on the servers with CloudLinux. For detailed information on setting up CRIU with a Litespeed Web Server, follow the [link](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:cloudlinux:lsphp_criu_enable). You can also use lsphp binaries from alt-php or ea-php packages for that purpose.

Q: **Is the New Relic extension compatible with the mod_lsapi PRO?**

A: Yes, it is. Currently, the [New Relic PHP Agent](https://docs.newrelic.com/docs/agents/php-agent) extension is supported for alt-php version 7.0 and higher. It can be installed for alt-php with the `alt-php**-pecl-ext` package (`**` - version 70 and higher).

For example:

<div class="notranslate">

```
# yum install alt-php70-pecl-ext
```
</div>
The next step is to enable the New Relic extension on the domain. You can do this through `php.ini` configuration or via [PHP Selector](/php_selector/#using).

We assume that the mod_lsapi PRO is already installed and enabled on the domain. If not, visit [mod_lsapi PRO installation guide](/apache_mod_lsapi/#installation).

The next step is to specify the New Relic license and the name of your application on the domain. This can be easily done by adding the following lines to the main .htaccess file of a domain or the virtual host section of the Apache configuration file:

<div class="notranslate">

```
<IfModule lsapi_module>
    php_value newrelic.appname  "My PHP Application"
    php_value newrelic.license  "<My license key>"
</IfModule>
```
</div>

The only thing you need to make sure that the directive [`lsapi_mod_php_behaviour`](/cloudlinux_os_components/#lsapi-mod-php-behaviour) is on. To further configure the PHP agent use the [link](https://docs.newrelic.com/docs/agents/php-agent/configuration/php-agent-configuration).

## CloudLinux OS Installation FAQ

## How to delete the scan results in Imunify360’s database

## Imunify360/AV+ Hooks FAQ

## How to Clone Imunify360 Installation

## Imunify360 Dashboard FAQ

## WHM/cPanel Native feature management FAQ

## CloudLinux OS Installation Wizard FAQ

## Imunify360 CDN support FAQ (3.8.6 and newer)

## CloudLinux OS Dashboard

## ImunifyAV/AV+ FAQ

## CLN User Interface FAQ

## CLN Billing FAQ

## Imunify360 Malware Cleanup FAQ (Admin Part)

## Imunify360 Ubuntu Support FAQ

## Imunify360 Proactive Defense FAQ

## CloudLinux Backup On-Premises FAQ

## CloudLinux — Node.js Selector FAQ

## SELinux support

## Imunify360 - CloudLinux Backup FAQ

## MySQL_ND (native driver) vs MySQL PHP extensions

## CloudLinux - Reseller Limits FAQ
