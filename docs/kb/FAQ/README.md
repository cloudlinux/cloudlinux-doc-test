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

## CloudLinux OS Installation Wizard FAQ

- **Why do I need to install CageFS if I want to enable PHP Selector?**

CageFS is a requirement to use PHP Selector.

- **How dependencies between packages are taken into account?**

All dependencies are automatically installed - even if you do not choose them explicitly.

- **How do I select Symlink Owner Match Protection to be enabled?**

It is enabled by default. Symlink Owner Match Protection protects against symlink attack where attacker tricks Apache web server to read some other user’s PHP config files. You can adjust its settings as described in [https://docs.cloudlinux.com/cloudlinux_os_kernel/#symlink-owner-match-protection](/cloudlinux_os_kernel/#symlink-owner-match-protection)

- **Can I enable Installation Wizard in case I’ve abandoned it by mistake?**

A single CLI command is required: 

<div class="notranslate">

```
touch /var/lve/wizard/is_first_installation.flag
```
</div>

Next time you start LVE Manager UI, you will see Installation Wizard starting page - you will only be able to add modules, not remove them. You can also install CloudLinux OS components using Dashboard in LVE Manager.

- **Can I perform any other actions in LVE manager while packages are being installed?**

Yes. The installation process will run in the background.

- **What do I do if some module failed to install?**

It is possible to review the installation logs to find the reason of failure. You can try to install the module once again when the issue causing the problem is resolved. In any case, you can submit a ticket with CloudLinux tech support at [https://cloudlinux.zendesk.com](https://cloudlinux.zendesk.com) so they can help you with the issue.

- **Where can I find Installation Wizard logs?**

The logs can be found at _/var/log/cloudlinux/wizard/_. Each module has its unique entry in this directory.

## CloudLinux OS Dashboard

- **Which limits are considered when calculating the number of users hitting limits?**

All limits that are configured for a user are taken into account

- **Can I manage CloudLinux OS components from CL Dashboard?**

CloudLinux Dashboard will redirect you to a corresponding section of LVE Manager UI upon your action with any component available (provided there is Manage button in the top right of the component box)

- **Can I track my users’ resource consumption from CL Dashboard?**

No. Use Current Usage tab of LVE Manager.

- **Can I set limits for my users using CL Dashboard?**

No. Use Users tab of LVE Manager for that.

- **Can I update CloudLinux OS packages or other system packages from CL Dashboard?**

No. This can be done either from CLI or by control panel periodic update scripts.

- **Can I remove boxes that I don’t need form CL Dashboard?**

No, it is not possible to remove/rearrange CL Dashboard boxes in the initial release of CL Dashboard. This feature might be added in the future.

- **Where can I find the active PHP handler information?**

As of the initial CL Dashboard release, this information will be available only if mod_lsapi is active (see LSAPI box for more information)

- **Can I switch MySQL Governor modes from CL Dashboard?**

Clicking on Manage button in MySQL Governor tab will redirect you to Options tab of LVE Manager plug-in/extension where you can adjust the settings.

- **Can I setup several DB versions from CL Dashboard?**

No, only one DB version can be set up in MySQL Governor of CloudLinux OS.

- **Does information in CL Dashboard automatically update?**

The information presented reflects the latest cached statistics available at the time of loading CL Dashboard. You can press Refresh button anytime to update it.

- **Why can’t I manage Ruby from CL Dashboard?**

This is because there are no controls available for Ruby in LVE Manager extension.

## CloudLinux — Node.js Selector FAQ

- **What Node.js versions are supported with Node.js Selector?**

The supported versions are 6.x, 8.x, 9.x and 10.x.

- **Can I move applications from one Node.js version to another?**

You can move them one by one. In further releases we will add a group-move option.

- **Can I delete Node.js version that is not in use?**

Yes, you can. This can be done from both LVE Manager UI or CLI.

- **Can I delete Node.js version if some applications use it?**

No, you can’t. You should move all existing applications to another Node.js version available first.

- **Can I set a disabled Node.js version as a default?**

No, you can’t. You should enable it first.

- **Can I install/uninstall more than one version at the same time?**

No, you can’t. You must wait until the previous process is finished (spinner in the last row of version’s table will be in processing mode).

- **What do I have to do if I don’t see some version which I want install in the UI, although they are available in the repository?**

Click Refresh and wait until the version is added. (Refresh for repodata is not implemented yet).

- **Can Node.js Selector be used in CLI-only mode?**

Sure. Please find the list of CLI commands at [https://docs.cloudlinux.com/command-line_tools/#node-js-selector](/command-line_tools/#node-js-selector)

- **I would like to install Node.js Selector on a system with LiteSpeed Web Server and CloudLinux OS. Can I install it that way?**

Please find all requirements at [https://docs.cloudlinux.com/cloudlinux_os_components/#requirements-3](/cloudlinux_os_components/#requirements-3).

- **Does Node.js Selector require CageFS installed (or active) to operate? Will it work inside CageFS?**

Users’ applications work inside CageFS if the latter is installed and enabled. Otherwise, they work in a “real” file system. Installing CageFS is not mandatory but is recommended as it makes your system more secure.

- **Can Node.js resources be limited by LVE like PHP scripts?**

Sure. Please find more information on resource limits at [https://docs.cloudlinux.com/limits/](/limits/).

- **Is it possible to use Node.js Selector with Nginx?**

No, it isn’t.

## CloudLinux - Reseller Limits FAQ

- **Will all my resellers have Reseller Limits automatically after installing LVE Manager version 3.0-18?**

No, they won't. To start using two level limits you’d first have to enable them for a particular reseller on _Users_ tab where you normally set limits. From that moment reseller will be able to set up limits for its end users. Please find more details in [CloudLinux documentation](/cloudlinux_os_components/#installation-enabling-and-disabling).

- **What happens to existing resellers? Will they have Reseller Limits right away?**

Existing resellers with its limits will keep working same as before until hoster allows Reseller Limits. Find more details in [Reseller Limits documentation](/cloudlinux_os_components/#reseller-limits).

- **If I enable Reseller Limits will my resellers be limited?**

Total resource usage of all users that belong to the reseller will be limited according to the reseller limit (including reseller personal usage).

- **How do I start using Reseller Limits?**

To start using two-level limits you’d first have to enable them for a particular reseller on _Users_ tab where you normally set limits. From that moment reseller will be able to set up limits for his end users.

- **How do I enable Reseller Limits?**

To start using two-level limits you’d first have to enable them for a particular reseller on _Users_ Tab where you normally set limits. From that moment reseller will be able to set up limits for its end users. Please find more details in the [Reseller Limits documentation](/cloudlinux_os_components/#installation-enabling-and-disabling).

- **How do I set Reseller Limits?**

First, you need to enable Reseller Limits. For more details go to [Reseller Limits documentation](/cloudlinux_os_components/#installation-enabling-and-disabling). Then, go to _Users_ tab and click a _pencil_ icon for a particular reseller. In the pop-up window you can enable and set limits for the reseller. See also [Users tab documentation](/lve_manager/#reseller-limits).

- **How do I disable Reseller Limits?**

You can do it the same way as you enable Reseller Limits - by switching off _Manage Limits_ slider. If you are not keen on this feature at all, the best way for you then do not enable Reseller Limits. In this case, everything will work the same as before as Reseller Limits are disabled by default.

If you have already enabled Reseller Limits for your resellers and now want to bulk disable these limits, you should run

<div class="notranslate">

```
# lvectl remove-reseller RESELLERNAME
```
</div>

for each reseller.

- **Can I have some resellers with Reseller Limits and some without?**

Surely, you can. Resellers for who you have not enabled Reseller Limits will not have them. At the same time, you can have other resellers with Reseller Limits enabled.

- **How do I disable Reseller Limits for the particular reseller?**

Go to WHM -> CloudLinux LVE Manager -> Users tab, then click _pencil_ icon in order to change parameters for the desired reseller, then disable _Manage Limits_ option. For more details, please go to [Reseller Limits documentation](/cloudlinux_os_components/#installation-enabling-and-disabling).

- **What happens to resellers’ end users when I enable Reseller Limits?**

Those end users will no longer be limited by Hoster Limits but Reseller Limits will be applied.

- **Do Reseller Limits affect all end users?**

No, they do not. They only affect users that belong to a reseller that has Reseller Limits enabled.

- **What limits should reseller set for his users?**

Recommend your resellers to set limits in a similar pattern as you would for your end users. Yet, we recommend that no reseller set limits below:


  - SPEED 50; 
  - PMEM 128 MB; 
  - IO 256 KB/sec; 
  - IOPS 256; 
  - EP/NPROC 10.

- **What kernels support Reseller Limits?**

Only CloudLinux 7 and CloudLinux 6 Hybrid kernel versions 3.10.0-714.10.2.lve1.5.3 and later support Reseller Limits.

To be able to use Reseller Limits you should have the latest CloudLinux 7 kernel installed. Installation command:

<div class="notranslate">

```
yum install kernel --enablerepo=cloudlinux-updates-testing
```
</div>

Users with CloudLinux 6 kernel should migrate to CloudLinux 6 Hybrid.

For more details, please go to [Reseller Limits documentation](/cloudlinux_os_components/#installation-enabling-and-disabling).

- **How to upgrade to the kernel with Reseller Limits support?**

To upgrade, please run the command:

<div class="notranslate">

```
yum install kernel --enablerepo=cloudlinux-updates-testing
```
</div>

And reboot a server.

- **Do I need to install new kernel if I want to enable Reseller Limits, if I have already run KernelCare?**

KernelCare doesn't deliver functionality needed by Reseller Limits, as it is too big of a change. Reboot is required.

- **Can hoster manage reseller’s end user limits?**

If Reseller Limits are disabled, a hoster is able to manage limits for resellers’ end users.

If Reseller Limits are enabled, a hoster has to log in as a reseller to manage limits for resellers’ end users.

- **What is the difference between End User and Reseller's End User?**

**End User** does not buy his resources from a reseller but from a hoster directly.

**Reseller's End User** buys his resources from a reseller, who buys them from a hoster.

- **Can I use the packages on a server with control panels other than cPanel?**

Reseller limits are available for DirectAdmin and Plesk panels as well.

- **Is it possible to integrate Reseller Limits with custom control panel?**

No, it isn't. At the moment Reseller Limits are only available for the cPanel, DirectAdmin and Plesk panels.

- **Can I use Reseller Limits on CloudLinux 6?**

You can use Reseller Limits on CloudLinux 6 by using CloudLinux 6 hybrid kernel. Please find more details in [Cloud Linux documentation](/cloudlinux_os_kernel/#hybrid-kernels).

- **Can resellers manage CageFS?**

No, they can't. That would be a security issue.

- **Can reseller manage MySQL Governor?**

If MySQL Governor is set to ALL mode, a reseller will be able to manage MySQL limits by managing LVE limits for the end user (as they are the same). For all other modes, default MySQL Governor limits will be applied.

- **How can I migrate to hybrid kernel? Will my data still be the same as before?**

Please use this instruction to migrate to CloudLinux 6 Hybrid kernel.

- **What are the minimum requirements for Reseller Limits?**

Reseller Limits are only supported in kernel starting with the version 3.10.0-714.10.2.lve1.5.3.el7 for CloudLinux 7 kernel and 3.10.0-714.10.2.lve1.5.3.el6h for CloudLinux 6 Hybrid kernel.

Please find more details in [Reseller Limits documentation](/cloudlinux_os_components/#installation-enabling-and-disabling).

- **What happens when reseller hits the limit?**

Reseller is a virtual entity. He cannot hit the limit. There is reseller's end user with the same name as a reseller. This end user is limited as any other reseller's end user.

Reseller's end user can hit reseller limit when end user's limit is bigger than reseller's limit. In such case, end user will be limited by reseller limit.

Or reseller limit can be hit when all resellers’ end users in total use as much resources as reseller limit.

- **What happens when reseller's end user hits his limit?**

Reseller's end user can hit his limit when end user limit is lower than reseller limit. In such case end user will be limited by his limit.

- **Does reseller get notifications when his end users hit the limit?**

Yes, he does. Reseller gets a notification on his users' faults. Reseller can configure notifications in WHM -> Plugins -> LVE Manager -> Options.

- **Does reseller's end user get notification when he hits reseller limit?**

No, he doesn't. End user gets a notification about his own limits/faults only.

- **How do Reseller Limits work?**

Reseller Limits limit the total amount of resources resellers’ end users can consume altogether. They also provide reseller with an ability to set limits for his end users.

More details can be found [here](/cloudlinux_os_components/#reseller-limits).

- **Can sum of resellers’ end users limits be bigger than reseller limit?**

Sure, it can. Reseller Limits limit actual total usage of resellers’ end users, but not values of their limits. Resellers’ end users can have limit bigger than reseller limit.

- **Can I set end user limit to be bigger than reseller limit?**

Yes, a reseller can set user limit bigger than reseller limit. But our system will automatically trim exceeded user limit.

- **Is overselling allowed?**

Sure thing!

- **What limits can I set for reseller?**

Hoster can set and manage the following limits for reseller:

  - SPEED
  - PMEM
  - IO
  - IOPS
  - EP
  - NPROC
  - Inodes (default for all users)
  - MySQL limits (ALL mode only)
  
Please find more details in the [documentation]((/cloudlinux_os_components/#reseller-limits)).

- **Which limits can reseller set for his users?**

Reseller can set and manage the following limits for end user:

  - SPEED
  - PMEM
  - IO
  - IOPS
  - EP
  - NPROC
  - MySQL limits (ALL mode only)
  
Please find more details in the [documentation]((/cloudlinux_os_components/#reseller-limits)).

- **What does reseller's end user see in his control panel?**

Reseller's end user can see the same charts as for regular end users.

- **Can resellers see which users use most resources?**

Yes, they can.

Go to WHM -> Plugins -> LVE Manager -> Historical Usage.

Here you can find resellers’ end users with high usage (top 5 users). More detailed statistics can be found in WHM -> Plugins -> LVE Manager -> Statistics.

Please find more details in the [documentation](/lve_manager/#statistics-tab).

- **Can hosters see how much each reseller uses?**

Yes, they can. Go to WHM -> Server Configuration -> CloudLinux LVE Manager -> Statistics.

Please find more details in the [documentation](/lve_manager/#statistics-tab).

- **Can hosters see which reseller uses most of the resources now?**

Yes, they can.

Go to WHM -> Server Configuration -> CloudLinux LVE Manager -> Current Usage.

Please find more details in the [documentation](/lve_manager/#statistics-tab).

- **Can reseller set limits for his individual end user?**

Sure, Reseller can set limits for his users via WHM -> Plugins -> LVE Manager -> Users.

Please find more details in the [documentation](/lve_manager/#users-tab).

- **Can reseller set limits for his packages?**

Sure, reseller can set limits for his packages via WHM -> Plugins -> LVE Manager -> Packages.

Please find more details in the [documentation](/lve_manager/#packages-tab).

- **What kernels support Reseller Limits?**

CloudLinux 7 kernel starting with the version 3.10.0-714.10.2.lve1.5.3.el7.

CloudLinux 6 Hybrid kernel starting with the version 3.10.0-714.10.2.lve1.5.3.el6h.

- **What are the recommended values for the Reseller Limits?**

At the moment we do not have any strict recommendations in regards to the values of Reseller Limits. We need to accumulate more usage information and review a lot of use cases to come up with such suggestion. For now, if you are not sure what values to set, please use as high values as possible in your consideration.

See also: _Which limits should reseller set for his users?_ above 

- **How can I downgrade to the previous kernel?**

To downgrade please do the following:

**For Cloud Linux OS 7**

  - Go to _/etc/default/grub_ and replace the value of variable GRUB_DEFAULT to 1;  
  - Run: `grub2-mkconfig -o /boot/grub2/grub.cfg`  
  - Reboot the system;  
  - Run the commands:

<div class="notranslate">

```
rpm -e --nodeps kernel-3.10.0-714.10.2.lve1.5.3.el7.x86_64
yum install kmod-lve
yum downgrade lvemanager lve-utils lve-stats alt-python27-cllib
```
</div>

**For CloudLinux OS 6 Hybrid**

  - Go to _/etc/grub.conf_ and replace the value of default variable to 1;
  - Reboot the system;
  - Run the commands:

<div class="notranslate">

```
rpm -e --nodeps kernel-3.10.0-714.10.2.lve1.5.3.el6h.x86_64
yum install kmod-lve
yum downgrade lvemanager lve-utils lve-stats alt-python27-cllib
```
</div>

- **What are my resellers will be limited to when I enable Reseller Limits?**

Total resource usage of all users that belong to the reseller will be limited according to the reseller limit (including reseller personal usage).

- **Can Reseller Limits be enabled automatically for all new Resellers created on the server?**

There is no such feature available out of the box, but all supported control panels have a possibility to setup custom hooks when a new account is created. So you can use these hooks in combination with these commands:

<div class="notranslate">

```
# lvectl set-reseller res1 --speed=N% --pmem=N --nproc=N --vmem=N --maxEntryProcs=N --iops=N --io=N
```
</div>

Check the corresponding hooks documentation here:

for cPanel: [https://documentation.cpanel.net/display/DD/Guide+to+Standardized+Hooks](https://documentation.cpanel.net/display/DD/Guide+to+Standardized+Hooks)

for DirectAdmin: [https://help.directadmin.com/item.php?id=294](https://help.directadmin.com/item.php?id=294) 

for Plesk: [https://docs.plesk.com/en-US/onyx/administrator-guide/59205/](https://docs.plesk.com/en-US/onyx/administrator-guide/59205/)

- **What are the default limits applied to a Reseller when I enable Reseller limits for them?**

The default limits are applied to a reseller when you first press Enable Reseller Limits in UI or when you simply fire _lvectl set-reseller_ without specifying the limits. Those limits are hard-coded and cannot be changed.

<div class="notranslate">

```
# Default parameters for lvp
LVP_DEFAULT = {
 'cpu': 100,
 'ncpu': 1,
 'io': 0,
 'ep': 0,
 'mem': 0,
 'pmem': 0,
 'nproc': 0,
 'iops': 0
}
```
</div>

- **Can I create  package for my resellers and apply that package as a reseller limit for different resellers?**

No, you cannot, Reseller limits have no connection with packages, these limits should be applied manually, limits from Packages cannot be assigned to a reseller.

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

- **What is the purpose of Imunify Hooks?**

Imunify360 / AV / AV+ notifies subscribers when a particular event/action occurs in the app, for example, when malware is detected after scanning or when the license expires (starting ver. 4.3). It also passes some parameters and data specific for the event. Events could be handled in the scripts (hook/event handlers) and some further actions could be applied like, for example, a ticket might be submitted or email might be sent out to the user upon malware-detection event.

- **How do I enable Imunify Hooks?**

You have to connect event handler (i.e. script) to every event you want to handle - you can find more information on how to do it in our [online docs](https://docs.imunify360.com/hooks/)

- **What scripting languages can I use to handle events?**

Any scripting languages supported by your system can be used. The script gets a json-encoded string with a list of parameters depending on the type of event. The data shall be read from STDIN.

If you use Python 3.5, it is possible to use so-called native hooks. Refer to the [Imunify documentation](https://docs.imunify360.com/hooks/#cli) for more details on native hooks requirements.

- **Is it possible to have multiple handlers for a single event type? If so, what would be the priority of connected handlers (subscribers)?**

Yes, it is possible. All handlers will be called one by one sequentially as soon as the event fires.

- **How do I know if an error occurs during event handler invocation?**

Each handler invocation is logged into the _/var/log/imunify360/hook.log_ file

- **Is it possible that a hook handler can crash Imunify360 agent?**

This is possible only in case of using native hooks which are essentially Python modules. Thus, special care should be taken when using native hooks.

## How to Clone Imunify360 Installation

Sometimes you may need to install Imunify360 on several servers with identical configurations or copy existing configs to other servers. Here you can find the list of steps on how to clone the installation of Imunify360 for several servers with identical configuration.

**Installation**

Firstly, Imunify360 usual installation comes. All necessary changes including integration with 3rd party components will be applied during installation & agent startup.

([see manual for details](https://docs.imunify360.com/installation/#installation-instructions))

**Config files**

Secondly, copy the following files from the existing installation.

1) /etc/sysconfig/imunify360/imunify360.config
2) /usr/share/i360-php-opts/module.ini
3) /usr/share/i360-php-opts/rules_whitelist (if it exists)
 

All required settings will be picked up and applied automatically.

**Whitelists / Blacklists / Blocked Ports**

Whitelist and blacklist entries that are distributed as files can be found at _/etc/imunify360/whitelist/*.txt_ and _/etc/imunify360/blacklist/*.txt_  

([see manual for details](https://docs.imunify360.com/dashboard/#how-to-use-external-files-with-the-list-of-black-white-ips))

Finally, if you want to export local Imunify360 firewall entries and then import them into a new Imunify360 instance, use the following CLI command

<div class="notranslate">

```
imunify360-agent blacklist [subject] [command] <value> [--option]
```
</div>

([see manual for details](https://docs.imunify360.com/command_line_interface/#blacklist))

<div class="notranslate">

```
imunify360-agent blocked-port [command] <value> [--option]
```
</div>

([see manual for details](https://docs.imunify360.com/command_line_interface/#blocked-ports))

<div class="notranslate">

```
imunify360-agent whitelist [subject] [command] <value> [--option]
```
</div>

([see manual for details](https://docs.imunify360.com/command_line_interface/#whitelist))

## Imunify360 Dashboard FAQ

- **What kind of data is available in Imunify360 4.0 Dashboard?**

The following data is available:

- Alerts (security incidents) total
- CAPTCHA events
- WAF alerts (security incidents)
- Web-based Bruteforce Attacks
- OSSEC: Network Level Attacks
- Denied Requests from Bad Bots
 
- **How is the data represented in the Dashboard?**

You can choose either histogram or heatmap for any type of data except OSSEC alerts.

- **What are the time periods available in the Dashboard?**

The periods available are 1, 7 and 30 days. No custom periods are available as of the initial release.

- **Is it possible to monitor multiple systems from a single Imunify360 dashboard?**

Yes, this is possible in case you have access to all systems you need to monitor. You can copy the target server key to the clipboard by clicking on the key symbol button.
Alternatively, find your server key in the id field of the _/var/imunify360/license.json_ file.

## WHM/cPanel Native feature management FAQ

- **What is the difference between Feature Management in Imunify360 UI and WHM/cPanel Native FM?**

You can perform the same actions with cPanel Native FM. The main benefit of cPanel Feature Management support is that admin can manage features on per package basis for the users that belong to those packages. Thus admin can apply changes to the whole group of users on the same package.

- **Which Imunify360 features are governed by WHM/cPanel Native Features Management?**

As of Imunify360 4.0, it supports Proactive Defense and Malware Scanning/Cleanup.

- **Can I use standard and cPanel Native FM at the same time?**

No. Once you switch to Native FM, Features Management tab in Imunify360 UI will inform that you have to use the Native one from WHM instead. You can switch back to Imunify360 UI FM at any time using CLI command:

<div class="notranslate">

```
feature-management native disable
```
</div>

## Imunify360 CDN support FAQ

- **Does Cloudflare firewall replace Imunify360 Firewall?**

Cloudflare would work as an additional firewall layer, in front of Imunify360 firewall. Imunify360 will still filter all the traffic coming from Cloudflare, like it would for any other IP.

- **If an IP is blocked in Cloudflare, will it also be blocked in Imunify360?**

Imunify360 doesn't see which IPs are blocked in Cloudflare. The two keep their blocked IPs separate.

- **Can I blacklist a visitor’s IP if the visitor comes in through CDN, or only greylisting work?**

You can blacklist any visitor for supported CDNs. Use standard interface for blacklisting to do that. For CDN visitors, blacklisted IPs will result in 403 HTTP error. Greylisted IPs will be served captcha.

- **What happens if an IP first visits the web server from Cloudflare and then tries to visit some server ports like SSH?**

If original customer IP (coming through Cloudflare) passes Captcha, and than directly visits the server on SSH or similar port, the IP will be whitelisted for 24 hours, and will be able to connect to the SSH port.

- **Is Cloudflare Spectrum proxying supported? [https://developers.cloudflare.com/spectrum/getting-started/getting-started/](https://developers.cloudflare.com/spectrum/getting-started/getting-started/)**
 
No, Cloudflare IPs will be blocked on all none-HTTP(S) protocol ports

- **Is it possible to go for the FREE Cloudflare plan and activate Imunify360 CDN support to see IPs which come from Cloudflare?**

Yes, for IPs coming from CloudFlare you can use this Imunify360 feature for clients' IPs detection.

## Imunify360 custom white/black lists FAQ

- **What are the target directories for Imunify360 custom white/blacklist files?**

Add IPs into *.txt files to /etc/imunify360/whitelist/ and /etc/imunify360/blacklist/ directories

- **What is the format of custom Imunify360 white/blacklist files?**

The format is X.Y.Z.A/mask, one entry per line

- **What is the precedence of existing Imunify360 lists and custom ones?**
 
As with standard entries, a whitelist has precedence over a blacklist

- **Will the white/blacklist files persist Imunify360 agent upgrade?**
 
Yes, the custom list files persist agent upgrade and uninstall

## Imunify360 Malware Cleanup FAQ (Admin Part)

- **How does Imunify360 Malware Cleanup work? What are the benefits of Imunify360 Malware Cleanup?**

Malware Cleanup can remove malicious code from users' files or remove them completely if they cannot be cured. It works in a user-assisted way - i.e. a user has to choose the files to be cleaned up.

- **Is it possible Malware Cleanup can break my websites’ operation?**

Malware Cleanup is designed to decrease the possibility of data loss and website malfunction after cleanup. It backs up an infected file before cleanup and trims a file instead of removing it.
The backup of an infected file let a user restore the file in a state, it had before cleanup.
File backups are stored in special folders outside user home directories and shouldn’t be managed manually. Names of these files are not altered.

- **How does Malware Cleanup module decide on when to remove a file or trim it?**

This is a configurable option that can be set in Malware settings. Trimming is the default.

- **What does _Cleanup all_ button actually perform?**

It will try to remove harmful content from all files, detected as infected or quarantined.

- **Can Malware Cleanup clean files that were detected by any of anti-malware engines of Imunify360?**

Yes, all the files marked as _Infected_ or _Quarantined_ can be cleaned up or trimmed.

- **How can I clean/rotate the list of malicious files in Malware Scanner → Dashboard tab of Imunify360 UI?**

Older entries are automatically removed as soon as the backup file of the cleaned file is removed (14 days by default).

- **What kind of malicious code/content can Malware Cleanup remove?**

The cleanup engine detects and performs a cleanup for all content that might be considered as malicious: web-shells, backdoors, phishing pages, virus injections, doorways, droppers, miners, uploaders, etc.

- **Malware Cleanup did not clean up some of malicious files. What to do next?**

There might be the following causes:

  - Infected file or its folder is write-protected so Malware Cleanup could not write or delete it. Contact your server administrator for clarification.
  - Infected file was missing or not readable at the time of the cleanup attempt. Check if the file is in place and if its permissions are correct.

## Imunify360 Ubuntu Support FAQ

- **Which Ubuntu versions are supported by Imunify360?**

Imunify360 supports Ubuntu 16.04 and 18.04 LTS.

- **Which control panels are supported in Ubuntu version of Imunify360?**

Plesk and DirectAdmin.

- **Is Imunify360 for Ubuntu available without a control panel?**

Support for servers without control panel will be added in Imunify360 version 4.5 for CentOS, CloudLinux OS and Ubuntu.

- **Which Imunify360 features are available in Ubuntu?**

All Imunify360 features are available in Ubuntu version.

- **What is the difference between Ubuntu and CentOS Imunify360 versions?**

Nothing, Imunify360 works the same way as on all supported Linux operating systems.

- **Where can I find an installation guide and requirements?**

Please find the information in Imunify360 online documentation at [https://docs.imunify360.com/installation/](https://docs.imunify360.com/installation/).

## Imunify360 Proactive Defense FAQ

## Imunify360 CloudLinux Backup FAQ

## CloudLinux Backup On-Premises FAQ

## ImunifyAV/AV+ FAQ

## CLN User Interface FAQ

## CLN Billing FAQ