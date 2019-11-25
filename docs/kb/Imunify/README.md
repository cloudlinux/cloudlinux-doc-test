# Imunify


## Imunify360 brute force protection FAQ

#### What is brute force protection and why it is important?

A brute force attack is a hacking method that uses an automated system to guess the password to your web server or services..

#### What mechanisms of brute force protection are included in Imunify360?

- RBL-based (via WAF rules) to protect web logins (e.g. CMS logins)
- PAM-based - for services that use PAM.
- OSSEC-based (including Active Response (AR)) - for non-web services

#### How do I know which brute force protection mechanism triggered blocking?

This information is available in Incidents tab of Imunify360 UI - see Sensor field of an incident entry. Both AR and PAM-based blocks are listed as ossec. 

#### How do I adjust brute force detection thresholds?

You can change limits for WAF rules at _/etc/sysconfig/imunify360/imunify360.config_

as described in [https://docs.imunify360.com/config_file_description/](https://docs.imunify360.com/config_file_description/)

PAM-based threshold can be found in _/etc/pam_imunify/i360.ini_

AR-based OSSEC blocks default timeout is 600 seconds.

#### How do I disable the rule that triggers false-positives?

This can be done in the _Incidents_ list - click on **[Disable rule]** icon at the right of the corresponding incident entry. You can also disable a WAF rule for a single domain, like:

<div class="notranslate">

```
# imunify360-agent rules disable --name rulename --id 333310 --plugin modsec --domains your-domain.com
```
</div>

#### What services can be protected by PAM-enabled brute force protection?

Only SSH is supported as of the initial release of PAM support (ver 4.4)

#### Will blocked users see any warning or redirected to some page (e.g. captcha for web services)?
Neither of these three mechanisms trigger greylisting, so users will not be presented with Captcha challenge. 

::: tip Note
You need to set SecRuleEngine to "On" for RBL-based WAF blocking to work.
:::

#### How can I disable RBL-based WAF protection?

If you need to exclude some IP, add it to **rbl_whitelist** file which should be located at

_/etc/apache2/conf.d/modsec_vendor_configs/imunify360_full_apache/rbl_whitelist_ or _/etc/apache2/conf.d/modsec_vendor_configs/imunify360_full_litespeed_ folder.

Another ways are disabling specific WAF rules (as described above) and setting **SecRuleEngine** to `DetectionOnly` (this will affect all WAF rules, not only RBL-based)

#### How do I disable PAM-enabled brute force protection?

This is possible by running:

<div class="notranslate">

```
# imunify360-pam disable
```
</div>

You can enable it back by running:

<div class="notranslate">

```
# imunify360-pam enable
```
</div>

#### How do I disable OSSEC-based protection?

You can disable only Active Response mechanism - on the _Settings_ page of Imunify360 UI. OSSEC IDS can be disabled completely only by activating coop mode with CSF. See [https://docs.imunify360.com/ids_integration/#csf-integration](https://docs.imunify360.com/ids_integration/#csf-integration) for more details.

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

#### What is the purpose of Imunify Hooks?

Imunify360 / AV / AV+ notifies subscribers when a particular event/action occurs in the app, for example, when malware is detected after scanning or when the license expires (starting ver. 4.3). It also passes some parameters and data specific for the event. Events could be handled in the scripts (hook/event handlers) and some further actions could be applied like, for example, a ticket might be submitted or email might be sent out to the user upon malware-detection event.

#### How do I enable Imunify Hooks?

You have to connect event handler (i.e. script) to every event you want to handle - you can find more information on how to do it in our [online docs](https://docs.imunify360.com/hooks/)

#### What scripting languages can I use to handle events?

Any scripting languages supported by your system can be used. The script gets a json-encoded string with a list of parameters depending on the type of event. The data shall be read from STDIN.

If you use Python 3.5, it is possible to use so-called native hooks. Refer to the [Imunify documentation](https://docs.imunify360.com/hooks/#cli) for more details on native hooks requirements.

#### Is it possible to have multiple handlers for a single event type? If so, what would be the priority of connected handlers (subscribers)?

Yes, it is possible. All handlers will be called one by one sequentially as soon as the event fires.

#### How do I know if an error occurs during event handler invocation?

Each handler invocation is logged into the _/var/log/imunify360/hook.log_ file

#### Is it possible that a hook handler can crash Imunify360 agent?

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

#### What kind of data is available in Imunify360 4.0 Dashboard?

The following data is available:

- Alerts (security incidents) total
- CAPTCHA events
- WAF alerts (security incidents)
- Web-based Bruteforce Attacks
- OSSEC: Network Level Attacks
- Denied Requests from Bad Bots
 
#### How is the data represented in the Dashboard?

You can choose either histogram or heatmap for any type of data except OSSEC alerts.

#### What are the time periods available in the Dashboard?

The periods available are 1, 7 and 30 days. No custom periods are available as of the initial release.

#### Is it possible to monitor multiple systems from a single Imunify360 dashboard?

Yes, this is possible in case you have access to all systems you need to monitor. You can copy the target server key to the clipboard by clicking on the key symbol button.
Alternatively, find your server key in the id field of the _/var/imunify360/license.json_ file.

## WHM/cPanel Native feature management

#### What is the difference between Feature Management in Imunify360 UI and WHM/cPanel Native FM?

You can perform the same actions with cPanel Native FM. The main benefit of cPanel Feature Management support is that admin can manage features on per package basis for the users that belong to those packages. Thus admin can apply changes to the whole group of users on the same package.

#### Which Imunify360 features are governed by WHM/cPanel Native Features Management?

As of Imunify360 4.0, it supports Proactive Defense and Malware Scanning/Cleanup.

#### Can I use standard and cPanel Native FM at the same time?

No. Once you switch to Native FM, Features Management tab in Imunify360 UI will inform that you have to use the Native one from WHM instead. You can switch back to Imunify360 UI FM at any time using CLI command:

<div class="notranslate">

```
feature-management native disable
```
</div>

## Imunify360 CDN support

#### Does Cloudflare firewall replace Imunify360 Firewall?

Cloudflare would work as an additional firewall layer, in front of Imunify360 firewall. Imunify360 will still filter all the traffic coming from Cloudflare, like it would for any other IP.

#### If an IP is blocked in Cloudflare, will it also be blocked in Imunify360?

Imunify360 doesn't see which IPs are blocked in Cloudflare. The two keep their blocked IPs separate.

#### Can I blacklist a visitor’s IP if the visitor comes in through CDN, or only greylisting work?

You can blacklist any visitor for supported CDNs. Use standard interface for blacklisting to do that. For CDN visitors, blacklisted IPs will result in 403 HTTP error. Greylisted IPs will be served captcha.

#### What happens if an IP first visits the web server from Cloudflare and then tries to visit some server ports like SSH?

If original customer IP (coming through Cloudflare) passes Captcha, and than directly visits the server on SSH or similar port, the IP will be whitelisted for 24 hours, and will be able to connect to the SSH port.

#### Is Cloudflare Spectrum proxying supported? [https://developers.cloudflare.com/spectrum/getting-started/getting-started/](https://developers.cloudflare.com/spectrum/getting-started/getting-started/)
 
No, Cloudflare IPs will be blocked on all none-HTTP(S) protocol ports

#### Is it possible to go for the FREE Cloudflare plan and activate Imunify360 CDN support to see IPs which come from Cloudflare?

Yes, for IPs coming from CloudFlare you can use this Imunify360 feature for clients' IPs detection.

## Imunify360 custom white/black lists

#### What are the target directories for Imunify360 custom white/blacklist files?

Add IPs into *.txt files to _/etc/imunify360/whitelist/_ and _/etc/imunify360/blacklist/_ directories

#### What is the format of custom Imunify360 white/blacklist files?

The format is X.Y.Z.A/mask, one entry per line

#### What is the precedence of existing Imunify360 lists and custom ones?
 
As with standard entries, a whitelist has precedence over a blacklist

#### Will the white/blacklist files persist Imunify360 agent upgrade?
 
Yes, the custom list files persist agent upgrade and uninstall

## Imunify360 Malware Cleanup (Admin Part)

#### How does Imunify360 Malware Cleanup work? What are the benefits of Imunify360 Malware Cleanup?

Malware Cleanup can remove malicious code from users' files or remove them completely if they cannot be cured. It works in a user-assisted way - i.e. a user has to choose the files to be cleaned up.

#### Is it possible Malware Cleanup can break my websites’ operation?

Malware Cleanup is designed to decrease the possibility of data loss and website malfunction after cleanup. It backs up an infected file before cleanup and trims a file instead of removing it.
The backup of an infected file let a user restore the file in a state, it had before cleanup.
File backups are stored in special folders outside user home directories and shouldn’t be managed manually. Names of these files are not altered.

#### How does Malware Cleanup module decide on when to remove a file or trim it?

This is a configurable option that can be set in Malware settings. Trimming is the default.

#### What does _Cleanup all_ button actually perform?

It will try to remove harmful content from all files, detected as infected or quarantined.

#### Can Malware Cleanup clean files that were detected by any of anti-malware engines of Imunify360?

Yes, all the files marked as _Infected_ or _Quarantined_ can be cleaned up or trimmed.

#### How can I clean/rotate the list of malicious files in Malware Scanner → Dashboard tab of Imunify360 UI?

Older entries are automatically removed as soon as the backup file of the cleaned file is removed (14 days by default).

#### What kind of malicious code/content can Malware Cleanup remove?

The cleanup engine detects and performs a cleanup for all content that might be considered as malicious: web-shells, backdoors, phishing pages, virus injections, doorways, droppers, miners, uploaders, etc.

#### Malware Cleanup did not clean up some of malicious files. What to do next?

There might be the following causes:

  - Infected file or its folder is write-protected so Malware Cleanup could not write or delete it. Contact your server administrator for clarification.
  - Infected file was missing or not readable at the time of the cleanup attempt. Check if the file is in place and if its permissions are correct.

## Imunify360 Ubuntu Support

#### Which Ubuntu versions are supported by Imunify360?

Imunify360 supports Ubuntu 16.04 and 18.04 LTS.

#### Which control panels are supported in Ubuntu version of Imunify360?

Plesk and DirectAdmin.

#### Is Imunify360 for Ubuntu available without a control panel?

Support for servers without control panel will be added in Imunify360 version 4.5 for CentOS, CloudLinux OS and Ubuntu.

#### Which Imunify360 features are available in Ubuntu?

All Imunify360 features are available in Ubuntu version.

#### What is the difference between Ubuntu and CentOS Imunify360 versions?

Nothing, Imunify360 works the same way as on all supported Linux operating systems.

#### Where can I find an installation guide and requirements?

Please find the information in Imunify360 online documentation at [https://docs.imunify360.com/installation/](https://docs.imunify360.com/installation/).

## Imunify360 Proactive Defense

#### What are the use cases for Proactive Defense?

Proactive Defense can help make PHP-based websites more secure by terminating PHP scripts with malicious activity, including insecure WordPress plugins and any other outdated and unpatched web applications that can be easily compromised.

#### What do IPs colors mean?

Colors mean the same as in the Incidents tab in the Imunify360 UI:

  - White/Grey/Black color means that an IP address is in the Imunify360 White/Grey/Black List respectively.
  - Blue color means that an IP address is not in the list.
  
The color corresponds to the time of the list viewing, not the time when the incident occurred.

#### Why there are several records for the same script in the table?

Incidents are grouped with one-minute intervals, so if some script is invoked multiple times during the longer time span, it will produce several records.

#### What is the default mode of operation for Proactive Defense?

DISABLED is the default mode. If, for example, the KILL mode is enabled in the admin UI, this mode will be default for all hosting accounts to be added in the future.

#### Can a user override the default mode of operation set by admin?

A user can disable Proactive Defense anytime. Any mode that is not disabled (for user’s hosting account) by admin can be activated by a user.

#### Can KILL mode break my website operation?

While we are extensively testing Proactive Defense on a large number of different software, it is possible that we will have a false positive, and PHP script will be prevented from executing, causing page not to load. In the production version you will have a possibility to whitelist such scripts, and more granularly — for particular execution path. In the current Beta version you can only disable Proactive Defense for the whole account to mitigate the issue.

#### Does Proactive Defense require CloudLinux OS?

No, it works with any OS supported by Imunify360.

#### Does Proactive Defense support web servers other than Apache?

Proactive Defense supports Apache, nginx, and Litespeed.

#### Can Proactive Defense prevent malicious activity of cron jobs? Can cron job execute in a way so Proactive Defense module is not loaded?

Proactive Defense is a PHP module that should execute any time PHP script is executed including running PHP using a cron job. Note that hackers can create a cron job with PHP script started from custom php.ini to skip loading Proactive Defense. To prevent this from happening, we recommend using exclusively HardenedPHP where Proactive Defense component cannot be skipped by using custom php.ini.

#### Are there any restrictions for use with different PHP handlers?

Proactive Defense can work with any PHP handler provided the PHP version 5.4 or higher.

#### Can I benefit from Proactive Defense if I have Cloudflare WAF enabled for my website?

Cloudflare WAF and other WAF check only HTTP requests and not the actual PHP execution. As a result, Proactive Defense adds another layer of protection to your site.

#### What is the difference between Proactive Defense and other services like Wordfence?

Most security tools like Wordfence are tailored for a single CMS (e.g. WordPress) and work only for hosting accounts they are installed for. In addition, they are signature-based, so they cannot block PHP script execution proactively.

#### Will Proactive Defense affect my website performance?

It slows down PHP script execution by approximately 3-5%. This means that if the script was loading in 0.2 seconds before, it will now take around 0.206 seconds.

#### Do I need an additional license to use Proactive Defense?

No, the module is included in Imunify360 license price.

#### Where is Proactive Defense configuration file located?**

  - System settings: _/etc/sysconfig/imunify360/imunify360.config: PROACTIVE.mode_
  - User settings: _/etc/imunify360/user_config/imunify360.config: PROACTIVE.mode_

#### What is PD Blamer and how can it help me make my system secure?

Blamer records malicious PHP invocation that allows to detect the way malware was injected. It is a part of PD extension and requires PD PHP module to be installed. This feature is added to make Imunify360 more effective in detecting PHP vulnerabilities.

## How do I submit a false positive result for malware scanner?

We do our best to create the most effective malware scanner for websites: continuously update the malware database, refine it and make accurate. But there might be a small chance that you face with so-called “false-positives” while scanning the websites for malware i.e. when antivirus software marks a legitimate file as malicious because the file may contain some specific piece of code previously noticed in malware.

False positives can be sent to Imunify team for analysis via a command line:  
(via SSH, on your server console, as a ROOT user)

**For ImunifyAV product**:

<div class="notranslate">

```
imunify-antivirus submit false-positive --scanner ai-bolit --reason <reason> <path_to_file>
``` 
</div>

**For Imunify360 product**:

<div class="notranslate">

```
imunify360-agent submit false-positive --scanner ai-bolit --reason <reason> <path_to_file>
```
</div>


## ImunifyAV/AV+ FAQ

#### What is the difference between ImunifyAV, ImunifyAV+ and Imunify360?
 
ImunifyAV provides only malware scanning. ImunifyAV+ provides both malware scanning and cleanup. Starting from ImunifyAV+ ver 4.4 it also provides Reputation Management. Imunify360 provides complete web server protection that includes all ImunifyAV+ features as well as firewall, WAF, Proactive Defense, Reputation Management, KernelCare and Backup integration.

#### I have ImunifyAV found some malware in users directories. What should I do to clean them?

If you have ImunifyAV, then you need to upgrade to ImunifyAV+. If you already have ImunifyAV+ or Imunify360, just click _Cleanup All) button in _Users_ or _Files_ tab.

#### My website/server got infected. What should I do to clean up and protect it?

ImunifyAV can only inform you about infected files. ImunifyAV+ can also perform reputation monitoring and malware cleanup. However, if you need protection from new infections in addition to malware cleanup, you have to use Imunify360. If you are not a system owner/admin, ask your hosting provider for available options.

#### I’d like to cleanup some of my files that I believe are infected. What should I do?

Install either ImunifyAV+ or Imunify360 and perform cleanup from the _Files_ tab.

#### Will Restore link in the Users tab restore a clean copy of a file from backup?

No, it will restore the version that existed prior to malware cleanup.

#### Can I view the latest scan/cleanup report for users that have scanning/cleanup queued?

Yes, this is available in the _Users_ tab.

#### How can I remove cleaned up entries from the Files tab?

They are automatically removed as soon as backups of cleaned files are purged. Backup file retention period can be set up in Settings tab. Default retention time is 14 days.

#### Are old entries removed from the History tab?

No, but this can be done manually. Refer to this [link](/kb/FAQ/#how-to-delete-the-scan-results-in-imunify360%E2%80%99s-database).

#### Are files automatically removed from the Ignore list when their checksums get changed?

No, a file will stay in the _Ignore_ list as long as its filename is the same.


## Imunify360 CloudLinux Backup FAQ

#### How does CloudLinux Backup work?

CloudLinux Backup provides a customer with the most integrated with Imunify360 backup solution. It is powered by the Acronis technology. When a feature is enabled for the first time, Imunify360 performs an initial backup of a server. In the event, a file is detected as infected it can be restored from the backup (Imunify360 can do it automatically depending on the configuration). Imunify360 will search for a clean version of the file and as soon as clean copy will be found, restore will be processed. If there is no clean version in backup then Imunify360 will be unable to restore file. In such case we recommend to clean up the file manually. You can learn more about the CloudLinux Backup for Imunify360 [here](http://cloudlinuxbackup.com/).
Note that as CloudLinux Backup performs a backup of the whole server it can be used to restore the whole server in case of server fault.

#### Why do I need CloudLinux Backup feature?

Starting from the version 2.7.0, Imunify360 provides customers with an ability to backup files via CloudLinux Backup, powered by Acronis. The CloudLinux Backup for Imunify360 can be used to automatically backup and restore files if they have become infected. The data is stored in a Cloud. We have several locations, so a user can choose where data should be stored. To learn more, [visit the CloudLinux Backup for Imunify360 page](https://www.imunify360.com/cloudlinux-backup).

#### How does Imunify360 use backups?

Imunify360 can use backups to restore malicious files in two ways: automatic or manual.

**Automatic Restore**

There are two ways to enable automatic restore: in the Imunify360 User Interface and in the configuration file.

  - In the Imunify360 User Interface go to _Settings → Malware_ tab and tick Try to restore from backup first. More details you can find in the [documentation](http://docs.imunify360.com/index.html?settings.htm).
  - To enable automatic restore you should configure Imunify360 configuration file appropriately. Use `try_restore_from_backup_first: false` value in the `MALWARE_SCANNING` section. More details you can find in the [documentation](http://docs.imunify360.com/index.html?config_file_description.htm).

**Manual Restore**

In case of manual restore, please go to _Imunify360 → Malware Scanner → Dashboard → Malicious files_ table. Click cog icon in a particular file row and click on _Try to restore clean version from backup_.

More details you can find in the [documentation](http://docs.imunify360.com/index.html?malware_scanner.htm).

#### How can I disable Backup feature?

To disable Backup feature, please go to _Imunify360 → Settings → BACKUPS_. On this page move _Backup and restore_ slider and confirm your action in a pop-up.

Note that this feature allows Imunify360 to restore a clean version of malicious and suspicious files from backup.

More details you can find in the [documentation](http://docs.imunify360.com/index.html?user_interface.htm).

#### How can I manage CloudLinux Backup?

To manage CloudLinux Backups go to _Imunify360 → Settings → BACKUPS_ tab and click on _Manage Backups_ button. The Backup Management Console opens. Here a user can manage backups: manage scheduler, observe files in the backup, download files and perform other actions.

More details you can find in the [documentation](http://docs.imunify360.com/index.html?user_interface.htm).

#### I have cPanel/Plesk/Acronis/custom backup. Can I use it with Imunify360?

  - If you have Plesk\cPanel backups you could use them as usual because Imunify360 is compatible with them. To do that, please go to _Imunify360 → Settings → Backups_ tab and enable Backup and restore feature by selecting cPanel/Plesk as backup provider. Or you could switch to CloudLinux Backup and get 10GB of storage space for free.
 See also - [How can I switch to CloudLinux Backup] below.
  - If you have Acronis backups you could use your Acronis account as usual. To do that, please go to _Imunify360 → Settings → Backups_ tab and enable Backup and restore feature by selecting Acronis as backup provider. Note that you need existing Acronis account. Or you could switch to CloudLinux Backup and get 10GB of storage space for free.
 See also - [How can I switch to CloudLinux Backup] below.
  - If you have custom hosting panel backup you could switch to CloudLinux Backup and get 10GB of storage space for free as we do not support custom panel backups.
 See also - [How can I switch to CloudLinux Backup] below.

#### How can I switch from cPanel/Plesk/Acronis backup to CloudLinux Backup?

To switch from cPanel/Plesk/Acronis backup you need to disable current backup system both on your hosting panel and on the Imunify360 (if you have enabled it before). And then activate CloudLinux Backup.

  - To disable a backup feature in the Imunify360 go to _Imunify360 → Settings → BACKUPS_ tab and move _Backup and restore_ slider. Then confirm your action in a pop-up.
  - When Backup and restore status becomes _Disabled_, choose CloudLinux Backup as a backup provider from a drop-down.
  - Click on _Connect Backup_ button. You will be redirected to the CloudLinux Network page where you can choose and purchase required size of backup space. Note that CloudLinux Backup provides 10GB of backup space for free. More details you can find in the [documentation](http://docs.imunify360.com/index.html?user_interface.htm).

#### Should I drop the old backups in CloudLinux Backup or they will be removed automatically?

There is no need to delete backups manually, old backups are deleted regularly.

#### What happens if I buy less CloudLinux Backup space than I need for initial backup?

If there is not enough space for initial backup, Imunify360 will return a warning message and prompt to resize the disk space for CloudLinux Backup. Note that initial backup takes about 60% of the real storage size, so a user needs to have more than just 60% of the actual storage size, because incremental backup needs space too.

#### Are there any special offers?

When purchasing CloudLinux Backup you get 10GB of backup space provided for free per server with Imunify360 installed!

#### What happens if CloudLinux Backup fails?

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

#### Which files on mу server does Imunify360 backup?

For CloudLinux Backup and Acronis, it creates a backup for the “Entire machine” (if it was not created yet) during the first initial backup process. The further backup process will make incremental snapshots of changes.

#### How much space do I need for CloudLinux Backup?

The amount of required space is determined by the size of your server and how often its content changes. If the content of your server changes on a daily basis, we recommend to get actual disk size*2.4 GB of disk space to be used for backups. Otherwise, we recommend to get actual disk size*1.4 GB of disk space. These coefficients include all incremental backups for the six-month scheduled backups.
Note that you can buy more disk space at any time.

#### Is it possible to do backup of all servers in one go?

No, it isn't. Backup is currently performed separately for each server.

#### What happens with my old cPanel/Plesk/Acronis backup if I switch to CloudLinux Backup?

Your old backups are stored by your old provider but you will be unable to use them with CloudLinux Backup as CloudLinux Backup creates a new backup of your server and will use it to restore files.
We do not recommend to use two backup providers simultaneously.

#### How does Imunify360 calculate the amount of space needed for CloudLinux Backup?

The amount of required space is determined by the size of your server and how often its content changes. If the content of your server changes on a daily basis, we recommend to get actual disk size*2.4 GB of disk space to be used for backups. Otherwise, we recommend to get actual disk size*1.4 GB of disk space. These coefficients include all incremental backups for the six-month scheduled backups.
Note that you can buy more disk space at any time.

#### How can I enable Backup feature?

To enable Backup feature, please do the following:

  - Go to _Imunify360 → Settings → BACKUPS_ tab.
  - Choose Backup provider and click on Connect Backup button.
  
According to a chosen backup provider, the system prompts you to do particular actions.
More details you can find in the [documentation](http://docs.imunify360.com/index.html?user_interface.htm).

#### What if I have no space anymore for the next incremental backup?

If there is no space for the next incremental backup you can resize the backup space. To do that go to _Imunify360 → Settings → BACKUPS_ tab and click on the _resize_ link. You will be redirected to the CloudLinux Network page where you can choose and purchase additional backup space. The previous backups are securely saved. You can still restore files from them.

#### What would happen to my backups if the Imunify360 license expires?

If your Imunify360 license expires your account will be locked for 30 days but your backups will be still available except new incremental backups will not be processed. If you haven’t paid for a license during this time, after these 30 days your account will be canceled but backups will be still available during 48 hours after cancellation. After this time, your backups will be deleted.

#### Will I have access to my backups when I migrate from trial to paid Imunify360 license?

Of course, you will. Learn more about the CloudLinux Backup for Imunify360 [here](http://cloudlinuxbackup.com/).
