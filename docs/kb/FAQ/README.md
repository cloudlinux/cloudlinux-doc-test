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

## CloudLinux OS and EasyApache 4 FAQ

Q: **When do we need to call the EA4 migration script?**

<div class="notranslate">

```
cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4
sh cloudlinux_ea3_to_ea4 --convert
```
</div>

### Migration from EasyApache 3 to EasyApache 4.

The main difference between EasyApache 3 and EasyApache 4 for CloudLinux OS is the repositories used for Apache RPM packages. For this reason, we need to use packages from the _cl-ea4_ repository or _cl-ea4-testing_ beta for EasyApache 4. Running this script we update all native ea-* packages from CloudLinux repository. In this case, non-native packages for Apache include mod_lsapi and alt-mod-passenger (CloudLinux OS feature). So, if mod_lsapi or alt-mod-passenger (or both) were installed on EasyApache 3, the script should be run with the additional options as described here.

Also, our script starts cPanel EasyApache 3 migration to EasyApache 4 Process. Read more about Profile changes, Apache changes, PHP changes on the link [https://documentation.cpanel.net/display/EA4/The+EasyApache+3+to+EasyApache+4+Migration+Process](https://documentation.cpanel.net/display/EA4/The+EasyApache+3+to+EasyApache+4+Migration+Process)

### Conversion from EasyApache 4 CentOS to EasyApache 4 CloudLinux OS.

When cPanel is installed with EasyApache 4 on a clean CloudLinux OS (or it was CentOS converted to CloudLinux OS), the installation of the ea-* packages comes from the EA4 cPanel repository. Most packages from the EA4 cPanel repository are not compatible with CloudLinux OS packages and this can lead to various errors. For this reason, we need to run this script to update the ea-* packages from the CloudLinux repository.

If there was a need to return to EasyApache 4 packages from the EA4 cPanel repository, we need to run:

<div class="notranslate">

```
cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4
sh cloudlinux_ea3_to_ea4 --restore-cpanel-ea4-repo
```
</div>

Q: **When do we need to revert changes made by EA4 migration script?**

<div class="notranslate">

```
cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4
sh cloudlinux_ea3_to_ea4 --revert
```
</div> 

### Reverting to EasyApache 3.

Reverting is possible only if EasyApache 3 was previously installed, and then converted to EasyApache 4. If cPanel was originally installed with EasyApache 4, there is no way to convert to EasyApache 3.

## How to delete the scan results in Imunify360’s database

Sometimes, you may need to delete all users’ scan results from the server. This should not be common practice, and we do not recommend doing it on a regular basis. But, if you do need to erase the results of all Imunify360 scans, you can find the instructions below.

1) First, you need to stop the agent:

<div class="notranslate">

```
systemctl stop imunify360
```
</div>

(on CentOS 7)

<div class="notranslate">

```
service imunify360 stop
```
</div>

(on CentOS 6, Ubuntu)

2) connect to the Imunify360 database by running this command:

<div class="notranslate">

```
sqlite3 /var/imunify360/imunify360.db
```
</div>

3) execute the following SQL commands:

::: danger IMPORTANT
This removes all scan results from Imunify360!
:::

<div class="notranslate">

```
DELETE FROM malware_history;
DELETE FROM malware_hits;
DELETE FROM malware_scans;
DELETE FROM malware_user_infected;
```
</div>

4) Lastly, start the agent:

<div class="notranslate">

```
systemctl start imunify360
```
</div>

(on CentOS 7)

<div class="notranslate">

```
service imunify360 start
```
</div>

(on CentOS 6, Ubuntu)

We don’t recommend cleaning the scan results for specific users, as it may cause inconsistencies in the _malware_scans_ table. But, in emergencies, you can do it with these SQL commands:

<div class="notranslate">

``` 
DELETE FROM malware_history WHERE file_onwer = <user>;
DELETE FROM malware_hits WHERE user = <user>;
DELETE FROM malware_user_infected WHERE user = <user>;
```
</div>

Unfortunately, there’s no easy way to delete records in the _malware_scans_ table for a specific user, so the table should be either truncated with the other tables shown in step 2 above, or the records should just be ignored.

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
