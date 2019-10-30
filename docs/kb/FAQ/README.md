# FAQ

## PHP Selector integration with cPanel’s MultiPHP Manager

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

## Apache mod_lsapi PRO

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

## CloudLinux OS and EasyApache 4

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

## CloudLinux OS Installation Wizard

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

## CloudLinux — Node.js Selector

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

## CloudLinux - Reseller Limits

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

## Imunify360/AV+ Hooks

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

## Imunify360 Dashboard

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

## WHM/cPanel Native feature management

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

## Imunify360 CDN support

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

## Imunify360 custom white/black lists

- **What are the target directories for Imunify360 custom white/blacklist files?**

Add IPs into *.txt files to /etc/imunify360/whitelist/ and /etc/imunify360/blacklist/ directories

- **What is the format of custom Imunify360 white/blacklist files?**

The format is X.Y.Z.A/mask, one entry per line

- **What is the precedence of existing Imunify360 lists and custom ones?**
 
As with standard entries, a whitelist has precedence over a blacklist

- **Will the white/blacklist files persist Imunify360 agent upgrade?**
 
Yes, the custom list files persist agent upgrade and uninstall

## Imunify360 Malware Cleanup (Admin Part)

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

## Imunify360 Ubuntu Support

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

## Imunify360 Proactive Defense

- **What are the use cases for Proactive Defense?**

Proactive Defense can help make PHP-based websites more secure by terminating PHP scripts with malicious activity, including insecure WordPress plugins and any other outdated and unpatched web applications that can be easily compromised.

- **What do IPs colors mean?**

Colors mean the same as in the Incidents tab in the Imunify360 UI:

  - White/Grey/Black color means that an IP address is in the Imunify360 White/Grey/Black List respectively.
  - Blue color means that an IP address is not in the list.
  
The color corresponds to the time of the list viewing, not the time when the incident occurred.

- **Why there are several records for the same script in the table?**

Incidents are grouped with one-minute intervals, so if some script is invoked multiple times during the longer time span, it will produce several records.

- **What is the default mode of operation for Proactive Defense?**

DISABLED is the default mode. If, for example, the KILL mode is enabled in the admin UI, this mode will be default for all hosting accounts to be added in the future.

- **Can a user override the default mode of operation set by admin?**

A user can disable Proactive Defense anytime. Any mode that is not disabled (for user’s hosting account) by admin can be activated by a user.

- **Can KILL mode break my website operation?**

While we are extensively testing Proactive Defense on a large number of different software, it is possible that we will have a false positive, and PHP script will be prevented from executing, causing page not to load. In the production version you will have a possibility to whitelist such scripts, and more granularly — for particular execution path. In the current Beta version you can only disable Proactive Defense for the whole account to mitigate the issue.

- **Does Proactive Defense require CloudLinux OS?**

No, it works with any OS supported by Imunify360.

- **Does Proactive Defense support web servers other than Apache?**

Proactive Defense supports Apache, nginx, and Litespeed with cPanel and Plesk.

- **Can Proactive Defense prevent malicious activity of cron jobs? Can cron job execute in a way so Proactive Defense module is not loaded?**

Proactive Defense is a PHP module that should execute any time PHP script is executed including running PHP using a cron job. Note that hackers can create a cron job with PHP script started from custom php.ini to skip loading Proactive Defense. To prevent this from happening, we recommend using exclusively HardenedPHP where Proactive Defense component cannot be skipped by using custom php.ini.

- **Are there any restrictions for use with different PHP handlers?**

Proactive Defense can work with any PHP handler provided the PHP version 5.4 or higher.

- **Can I benefit from Proactive Defense if I have Cloudflare WAF enabled for my website?**

Cloudflare WAF and other WAF check only HTTP requests and not the actual PHP execution. As a result, Proactive Defense adds another layer of protection to your site.

- **What is the difference between Proactive Defense and other services like Wordfence?**

Most security tools like Wordfence are tailored for a single CMS (e.g. WordPress) and work only for hosting accounts they are installed for. In addition, they are signature-based, so they cannot block PHP script execution proactively.

- **Will Proactive Defense affect my website’s performance?**

It slows down PHP script execution by approximately 3-5%. This means that if the script was loading in 0.2 seconds before, it will now take around 0.206 seconds.

- **Do I need an additional license to use Proactive Defense?**

No, the module is included in Imunify360 license price.

- **Where is Proactive Defense configuration file located?**

  - System settings: _/etc/sysconfig/imunify360/imunify360.config: PROACTIVE.mode_
  - User settings: _/etc/imunify360/user_config/imunify360.config: PROACTIVE.mode_

- **What is PD Blamer and how can it help me make my system secure?**

Blamer records malicious PHP invocation that allows to detect the way malware was injected. It is a part of PD extension and requires PD PHP module to be installed. This feature is added to make Imunify360 more effective in detecting PHP vulnerabilities.

## Imunify360 CloudLinux Backup FAQ

- **How does CloudLinux Backup work?**

CloudLinux Backup provides a customer with the most integrated with Imunify360 backup solution. It is powered by the Acronis technology. When a feature is enabled for the first time, Imunify360 performs an initial backup of a server. In the event, a file is detected as infected it can be restored from the backup (Imunify360 can do it automatically depending on the configuration). Imunify360 will search for a clean version of the file and as soon as clean copy will be found, restore will be processed. If there is no clean version in backup then Imunify360 will be unable to restore file. In such case we recommend to clean up the file manually. You can learn more about the CloudLinux Backup for Imunify360 [here](http://cloudlinuxbackup.com/).
Note that as CloudLinux Backup performs a backup of the whole server it can be used to restore the whole server in case of server fault.

- **Why do I need CloudLinux Backup feature?**

Starting from the version 2.7.0, Imunify360 provides customers with an ability to backup files via CloudLinux Backup, powered by Acronis. The CloudLinux Backup for Imunify360 can be used to automatically backup and restore files if they have become infected. The data is stored in a Cloud. We have several locations, so a user can choose where data should be stored. To learn more, [visit the CloudLinux Backup for Imunify360 page](https://www.imunify360.com/cloudlinux-backup).

- **How does Imunify360 use backups?**

Imunify360 can use backups to restore malicious files in two ways: automatic or manual.

**Automatic Restore**

There are two ways to enable automatic restore: in the Imunify360 User Interface and in the configuration file.

  - In the Imunify360 User Interface go to _Settings → Malware_ tab and tick Try to restore from backup first. More details you can find in the [documentation](http://docs.imunify360.com/index.html?settings.htm).
  - To enable automatic restore you should configure Imunify360 configuration file appropriately. Use `try_restore_from_backup_first: false` value in the `MALWARE_SCANNING` section. More details you can find in the [documentation](http://docs.imunify360.com/index.html?config_file_description.htm).

**Manual Restore**

In case of manual restore, please go to _Imunify360 → Malware Scanner → Dashboard → Malicious files_ table. Click cog icon in a particular file row and click on _Try to restore clean version from backup_.

More details you can find in the [documentation](http://docs.imunify360.com/index.html?malware_scanner.htm).

- **How can I disable Backup feature?**

To disable Backup feature, please go to _Imunify360 → Settings → BACKUPS_. On this page move _Backup and restore_ slider and confirm your action in a pop-up.

Note that this feature allows Imunify360 to restore a clean version of malicious and suspicious files from backup.

More details you can find in the [documentation](http://docs.imunify360.com/index.html?user_interface.htm).

- **How can I manage CloudLinux Backup?**

To manage CloudLinux Backups go to _Imunify360 → Settings → BACKUPS_ tab and click on _Manage Backups_ button. The Backup Management Console opens. Here a user can manage backups: manage scheduler, observe files in the backup, download files and perform other actions.

More details you can find in the [documentation](http://docs.imunify360.com/index.html?user_interface.htm).

- **I have cPanel/Plesk/Acronis/custom backup. Can I use it with Imunify360?**

  - If you have Plesk\cPanel backups you could use them as usual because Imunify360 is compatible with them. To do that, please go to _Imunify360 → Settings → Backups_ tab and enable Backup and restore feature by selecting cPanel/Plesk as backup provider. Or you could switch to CloudLinux Backup and get 10GB of storage space for free.
 See also - [How can I switch to CloudLinux Backup] below.
  - If you have Acronis backups you could use your Acronis account as usual. To do that, please go to _Imunify360 → Settings → Backups_ tab and enable Backup and restore feature by selecting Acronis as backup provider. Note that you need existing Acronis account. Or you could switch to CloudLinux Backup and get 10GB of storage space for free.
 See also - [How can I switch to CloudLinux Backup] below.
  - If you have custom hosting panel backup you could switch to CloudLinux Backup and get 10GB of storage space for free as we do not support custom panel backups.
 See also - [How can I switch to CloudLinux Backup] below.

- **How can I switch from cPanel/Plesk/Acronis backup to CloudLinux Backup?**

To switch from cPanel/Plesk/Acronis backup you need to disable current backup system both on your hosting panel and on the Imunify360 (if you have enabled it before). And then activate CloudLinux Backup.

  - To disable a backup feature in the Imunify360 go to _Imunify360 → Settings → BACKUPS_ tab and move _Backup and restore_ slider. Then confirm your action in a pop-up.
  - When Backup and restore status becomes _Disabled_, choose CloudLinux Backup as a backup provider from a drop-down.
  - Click on _Connect Backup_ button. You will be redirected to the CloudLinux Network page where you can choose and purchase required size of backup space. Note that CloudLinux Backup provides 10GB of backup space for free. More details you can find in the [documentation](http://docs.imunify360.com/index.html?user_interface.htm).

- **Should I drop the old backups in CloudLinux Backup or they will be removed automatically?**

There is no need to delete backups manually, old backups are deleted regularly.

- **What happens if I buy less CloudLinux Backup space than I need for initial backup?**

If there is not enough space for initial backup, Imunify360 will return a warning message and prompt to resize the disk space for CloudLinux Backup. Note that initial backup takes about 60% of the real storage size, so a user needs to have more than just 60% of the actual storage size, because incremental backup needs space too.

- **Are there any special offers?**

When purchasing CloudLinux Backup you get 10GB of backup space provided for free per server with Imunify360 installed!

- **What happens if CloudLinux Backup fails?**

If you see an error message during the backup process, the backup fails. There are some cases.

1) **Backup fails during the initial backup process.** It means that CloudLinux is unable to create initial backup.
  - The possible reason is that there is not enough space for CloudLinux Backup. In this case, you can resize the backup space. Go to _Imunify360 → Settings → BACKUPS_ and click on resize link. You will be redirected to the CloudLinux Network page where you can choose and purchase additional backup space. **OR**
  - Go to _Imunify360 → Settings → BACKUPS_ tab and click on Manage Backup button. You will be redirected to the Backup Management Console. Here you can see notification about failed backup, possible reason and fix it solution.
2) **Backup fails during the incremental backup process.**
  - The possible reason is that there is not enough space for the next incremental backup. In this case, you can resize the backup space. Go to _Imunify360 → Settings → BACKUPS_ and click on _resize_ link. You will be redirected to the CloudLinux Network page where you can choose and purchase additional backup space. **OR**
  - Go to _Imunify360 → Settings → BACKUPS_ tab and click on _Manage Backup_ button. You will be redirected to the Backup Management Console. Here you can see notification about failed backup, possible reason and fix it solution.

::: tip Note
During incremental backup CloudLinux Backup adds snapshots of changes to the previously available backup.
:::

::: tip Note
In case of failed scheduled incremental backup, previous backups are still available on the Backup Management Console. So, Imunify360 can restore files from them.
:::

If you have any issues you are unable to handle, feel free to contact our support team at [link](https://cloudlinux.zendesk.com).

See also [How much space do I need for CloudLinux Backup] below.

More details you can find in the [documentation](http://docs.imunify360.com/index.html?user_interface.htm).

- **Which files on mу server does Imunify360 backup?**

For CloudLinux Backup and Acronis, it creates a backup for the “Entire machine” (if it was not created yet) during the first initial backup process. The further backup process will make incremental snapshots of changes.

- **How much space do I need for CloudLinux Backup?**

The amount of required space is determined by the size of your server and how often its content changes. If the content of your server changes on a daily basis, we recommend to get actual disk size*2.4 GB of disk space to be used for backups. Otherwise, we recommend to get actual disk size*1.4 GB of disk space. These coefficients include all incremental backups for the six-month scheduled backups.
Note that you can buy more disk space at any time.

- **Is it possible to do backup of all servers in one go?**

No, it isn't. Backup is currently performed separately for each server.

- **What happens with my old cPanel/Plesk/Acronis backup if I switch to CloudLinux Backup?**

Your old backups are stored by your old provider but you will be unable to use them with CloudLinux Backup as CloudLinux Backup creates a new backup of your server and will use it to restore files.
We do not recommend to use two backup providers simultaneously.

- **How does Imunify360 calculate the amount of space needed for CloudLinux Backup?**

The amount of required space is determined by the size of your server and how often its content changes. If the content of your server changes on a daily basis, we recommend to get actual disk size*2.4 GB of disk space to be used for backups. Otherwise, we recommend to get actual disk size*1.4 GB of disk space. These coefficients include all incremental backups for the six-month scheduled backups.
Note that you can buy more disk space at any time.

- **How can I enable Backup feature?**

To enable Backup feature, please do the following:

  - Go to _Imunify360 → Settings → BACKUPS_ tab.
  - Choose Backup provider and click on Connect Backup button.
  
According to a chosen backup provider, the system prompts you to do particular actions.
More details you can find in the [documentation](http://docs.imunify360.com/index.html?user_interface.htm).

- **What if I have no space anymore for the next incremental backup?**

If there is no space for the next incremental backup you can resize the backup space. To do that go to _Imunify360 → Settings → BACKUPS_ tab and click on the _resize_ link. You will be redirected to the CloudLinux Network page where you can choose and purchase additional backup space. The previous backups are securely saved. You can still restore files from them.

- **What would happen to my backups if the Imunify360 license expires?**

If your Imunify360 license expires your account will be locked for 30 days but your backups will be still available except new incremental backups will not be processed. If you haven’t paid for a license during this time, after these 30 days your account will be canceled but backups will be still available during 48 hours after cancellation. After this time, your backups will be deleted.

- **Will I have access to my backups when I migrate from trial to paid Imunify360 license?**

Of course, you will. Learn more about the CloudLinux Backup for Imunify360 [here](http://cloudlinuxbackup.com/).

## ImunifyAV/AV+ FAQ

- **What is the difference between ImunifyAV, ImunifyAV+ and Imunify360?**
 
ImunifyAV provides only malware scanning. ImunifyAV+ provides both malware scanning and cleanup. Starting from ImunifyAV+ ver 4.4 it also provides Reputation Management. Imunify360 provides complete web server protection that includes all ImunifyAV+ features as well as firewall, WAF, Proactive Defense, Reputation Management, KernelCare and Backup integration.

- **I have ImunifyAV found some malware in users directories. What should I do to clean them?**

If you have ImunifyAV, then you need to upgrade to ImunifyAV+. If you already have ImunifyAV+ or Imunify360, just click _Cleanup All) button in _Users_ or _Files_ tab.

- **My website/server got infected. What should I do to clean up and protect it?**

ImunifyAV can only inform you about infected files. ImunifyAV+ can also perform reputation monitoring and malware cleanup. However, if you need protection from new infections in addition to malware cleanup, you have to use Imunify360. If you are not a system owner/admin, ask your hosting provider for available options.

- **I’d like to cleanup some of my files that I believe are infected. What should I do?**

Install either ImunifyAV+ or Imunify360 and perform cleanup from the _Files_ tab.

- **Will Restore link in the Users tab restore a clean copy of a file from backup?**

No, it will restore the version that existed prior to malware cleanup.

- **Can I view the latest scan/cleanup report for users that have scanning/cleanup queued?**

Yes, this is available in the _Users_ tab.

- **How can I remove cleaned up entries from the Files tab?**

They are automatically removed as soon as backups of cleaned files are purged. Backup file retention period can be set up in Settings tab. Default retention time is 14 days.

- **Are old entries removed from the History tab?**

No, but this can be done manually. Refer to this [link](/kb/FAQ/#how-to-delete-the-scan-results-in-imunify360%E2%80%99s-database).

- **Are files automatically removed from the Ignore list when their checksums get changed?**

No, a file will stay in the _Ignore_ list as long as its filename is the same.

## CloudLinux Backup On-Premises FAQ

- **Where can I find documentation for CloudLinux Backup On-Premises?**

CloudLinux Backup is powered by Acronis. You can find complete documentation [here](https://www.acronis.com/en-us/support/documentation/BackupService/index.html#32952.html).

- **Where can I find documentation for my users?**

You can find all necessary documentation and guides to help your users manage their backups [here](https://www.acronis.com/en-us/support/documentation/BackupService/index.html#32952.html).

- **Can I migrate from CloudLinux Backup to CloudLinux Backup On-Premises in Imunify360?**

You cannot migrate actual backups, but you can switch to CloudLinux Backup On-Premises at any time. This means that your old backups will not work for CloudLinux Backup On-Premises and new backups will be created.
To switch from CloudLinux Backup to CloudLinux Backup On-Premises, follow these steps:

1) Contact our Sales Team at [sales@cloudlinux.com](sales@cloudlinux.com) for the price quote.
2) Contact our Support Team at [https://cloudlinux.zendesk.com/hc/requests/new](https://cloudlinux.zendesk.com/hc/requests/new) to setup CloudLinux Backup On-Premises.
3) Using [these](https://www.acronis.com/en-us/support/documentation/ManagementPortal/index.html#40064.html) instructions, create a user for the Imunify360 server to which you will switch CloudLinux Backup On-Premises. Next, you need to configure Imunify360.
4) In Imunify360 plugin, go to _Settings → Backups_, and disable CloudLinux Backup by clicking a radio button _Enabled_.
5) Choose backup provider → _CloudLinux Backup On-Premises_. Enter username/password of the user created in Management Portal and click _Connect Backup_.
6) Using Acronis Web Console, create a Backup Schedule for this server. 

You might want to deactivate CloudLinux Backup. To do so, login to CloudLinux Network (CLN). Go to _Servers → CloudLinux Backup_ and remove this server from the list.

- **How does CloudLinux Backup On-Premises work?**

CloudLinux Backup On-Premises consists of three parts: Management Portal, Storage, and Agent.

The Management Portal is a web interface that allows you to manage the backup cluster (servers and drives), as well as to check the cluster’s health and status.

The Storage is a set of servers with disks used for storing backups. The Storage can be resized at your discretion.

The Agent is software that needs to be installed on the server which you plan to backup.

After successful installation, the Agent starts the first initial backup of the server and sends it to the Storage (or part of the server, depends on schedule configuration) where it is installed. After that, the Agent initiates incremental backups according to the schedule configuration.

With backups, you are able to restore specific files, folders, or the whole server from the ISO image. You will have access to all backups and the files in them within the Management Portal.

- **How to configure Imunify360 to work with CloudLinux Backup On-Premises?**

1) In Imunify360 plugin, go to _Settings → Backups_, and disable CloudLinux Backup by clicking a radio button _Enabled_.
2) Choose the backup provider → _CloudLinux Backup On-Premises_. Enter username/password of the user created in Management Portal and click _Connect Backup_.
3) Using Acronis Web Console of a created user, create a backup schedule for this server using [this](https://www.acronis.com/en-us/support/documentation/BackupService/index.html#33507.html) documentation.
4) Make the initial backup (optional).

- **What are the differences between CloudLinux Backup and CloudLinux Backup On-Premises?**

CloudLinux Backup On-Premises can be installed within your infrastructure and operated on your own hardware, whereas CloudLinux Backup operates in the CloudLinux cloud. It means that you will be able to manage hardware on your own — add/remove servers and disks, and increase/decrease their size according to your own needs.

- **What are minimum hardware requirements for CloudLinux Backup On-Premises?**

CloudLinux Backup On-Premises **minimum** hardware requirements:
One physical node or virtual machine with:

  - 2 CPU cores;
  - 2GB RAM;
  - 3 HDDs with 100 GB minimum on each;
  - 1 Gbit Ethernet.

CloudLinux Backup On-Premises recommended hardware requirements:
Five nodes with:

  - 4 CPU cores;
  - 16GB RAM + 0.5 GB per HDD;
  - 0.25 CPU core per HDD;
  - 12+ disks per server;
  - 10 Gbit Ethernet.

For more details, please follow the [link](https://dl.acronis.com/u/storage2/html/AcronisStorage_2_installation_guide_en-US/planning-acronis-storage-infrastructure/planning-node-hardware-configurations.html#hardware-requirements).

- **What are software requirements for CloudLinux Backup On-Premises?**

CloudLinux Backup On-Premises needs a clean server — the software will be installed from the ISO image. Thus, nothing should be pre-installed on your servers.

- **How many physical disks should I have?**

We recommend to have at least 6 physical disks at 2 nodes. For more details, please follow the [link](https://dl.acronis.com/u/storage2/html/AcronisStorage_2_installation_guide_en-US/planning-acronis-storage-infrastructure/planning-node-hardware-configurations.html#recommended-configuration).

- **How much space do I need to backup my servers?**

The amount of required space is determined by the size of your servers and how often their content changes. If the content of your servers changes on a daily basis, we recommend to get actual server disks size*2.4 GB of disk space to be used for backups. Otherwise, we recommend to get actual disk size*1.4 GB of disk space. These coefficients include all incremental backups for the six-month scheduled backups.

- **Can CloudLinux Backup On-Premises be installed on cloud virtual servers?**

Yes, it can. However, physical servers are recommended (unless you use IaaS-based setup like S3-driven storage for back up your AWS instances).

- **How to buy CloudLinux Backup On-Premises?**

Contact our sales team at [sales@cloudlinux.com](sales@cloudlinux.com) for the price quote.

- **Is there a trial option?**

Please contact us at [sales@cloudlinux.com](sales@cloudlinux.com) and our team will help you to get setup with the trial.

- **How to cancel CloudLinux Backup On-Premises license?**

To cancel CloudLinux Backup On-Premises, please send a cancellation request to our support team at [https://cloudlinux.zendesk.com/hc/requests/new](https://cloudlinux.zendesk.com/hc/requests/new) and choose Imunify as a department.

- **I cannot see CloudLinux Backup On-Premises licenses in my CLN (CloudLinux Network) account. Why is that?**

CloudLinux Backup On-Premises is not yet available in CLN, but it will be in the future.

- **How to setup the backup schedule?**

Each server connected to CloudLinux Backup On-Premises has its own Web Console to manage backups. Login to Web Console [http://cloud.acronis.com](http://cloud.acronis.com) with your credentials (or click _Manage Backups_ button in _Settings_ tab of Imunify360 user interface) and use [this documentation](https://www.acronis.com/en-us/support/documentation/BackupService/index.html#33507.html) to schedule backups.

- **How to add a system/server to the CloudLinux Backup On-Premises so that the server will be backed up?**

Login to Web Console at [http://cloud.acronis.com](http://cloud.acronis.com/) with user credentials and click _Add_ button at the top of the page. Then choose appropriate Operating System and follow the installation instructions. Using login and password to the Web Console, activate the downloaded software.

- **How to create CloudLinux Backup On-Premises user with its own access level and limits, settings, and schedule limits?**

Login to Management Console [http://cloud.acronis.com/](http://cloud.acronis.com) as Admin with the credentials provided by CloudLinux and follow [these instructions](https://www.acronis.com/en-us/support/documentation/ManagementPortal/index.html#40064.html).

- **How to backup the whole server with CloudLinux Backup On-Premises?**

As soon as the server is connected to CloudLinux Backup On-Premises, the backup of the whole server will be created. All the following backups will be incremental, which means that only modified files and folders will be backed up.

- **How to scale CloudLinux Backup On-Premises?**
You can scale the CloudLinux Backup On-Premises at any time by adding more physical discs and nodes to your backup cluster.