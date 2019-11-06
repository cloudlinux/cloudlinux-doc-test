# Technology

## From which IP will CloudLinux staff connect to my server?

CloudLinux support team may only connect to your server from the following IP addresses:

```
69.175.106.198
69.175.3.6
```

Please do not forget to add our IP addresses to the "allow list" on the server firewall (CPHulk, Fail2Ban, CSF/iptables, etc.).

For passwordless authentication and in order to prevent the need in sharing the root password over the Internet, you can enable the key-based authentication. For that, you'll need to place our public key in the following file on your server: **/root/.ssh/authorized_keys**.

 Below you can find the public key (between the cut lines):

**---------- PUBLIC KEY BEGINNING ---------- PLEASE DO NOT COPY THIS LINE ----------**

ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAgEA0kzTrtnpG3awsKlQRzo8tLzG0Rb93XO6plRtFsVmAtqyuk1nfwC36ISL+AT2+r4+xuZiK8taVgbPVDU/+dHD3ObMQPIvIZOvQWGZH0zZApeXfbKD3DaLfh5aQeI9kbeo3cGQufFIxTkSLVXHTmjISf3gggP7m17hI4jxiu5Gaw/lNwlrQtsBgyEsF4+Y5jSOn1fMkx+R//8ul6L97EBEIGA9Pzcy4tHtTCNxfAGOmUmx8ijnieqNb95wxU5hrhirmWbICeMkgECEsIOPkweWoBNmrVxAigSQuM0uJZeFl5x2I5KaocmXbpeswDCWjGCtEDjcY9WqBSGehuUxArZvGEcaeJ+AM+xIlr0yPTx+3y4JsN/hluzRX9vbuzBZxhctP0BALu8uXKjYvJr9STU0umNZrRHBBQKCIF16FPwcJ7d+H4KYFvxOiVTDKtIZJ5gCtp/nUtVeQFUPEwgirgypP4hv3gkE73A+2vl3lwZ1p2YBmzzbAOpeXDtDFNSpK6Kfa7ujK70ouM0EDptPe/aGJMuDet7RGlnn/zQdpXrCLpUZSVrsTFjN+NZ6uTah5r5QsOhTpL1IoD+FrW9ovgr6KwtM6rl/XKzrzmbnQGaGQY5h5Kan2a0Y24eIXm5MnncOgwZZUCpT7SV2b7cjASf5xMfU87Ihe3c/Vmi33pblD8E= clsupport@sshbox.cloudlinux.com

**---------- PUBLIC KEY END ---------- PLEASE DO NOT COPY THIS LINE ----------**

## LVE Stats. How it works

First of all, there are three _lvestats-server.py_ processes: 

<div class="notranslate">

```
root 24006 0.1 1.7 312132 32620 ? SN Nov28 1:51 /opt/alt/python27/bin/python2.7 /usr/share/lve-stats/lvestats-server.py start --pidfile /var/run/lvestats.pid
root 24007 0.4 1.7 459596 32364 ? SNl Nov28 6:10 /opt/alt/python27/bin/python2.7 /usr/share/lve-stats/lvestats-server.py start --pidfile /var/run/lvestats.pid
root 24030 0.2 2.4 329940 45252 ? SN Nov28 3:45 /opt/alt/python27/bin/python2.7 /usr/share/lve-stats/lvestats-server.py start --pidfile /var/run/lvestats.pid
```
</div>

This is normal behavior, these processes are doing different things.

The main process handles the stats parsing routine, etc, while two others are working with [plugins](/cloudlinux_os_components/#plugins). 

The main _lvestats-server.py_ process parses the `/proc/lve/list` file every 5 seconds. The time interval could vary, it depends on the plugins installed, but usually, the average query time is around 5 seconds. 

Next, the gathered information is stored in the local sqlite database, but the locating can be easily changed via lve-stats [configuration](/cloudlinux_os_components/#configuration) file. Lve-stats can store the data in MySQL (MariaDB) or PostgreSQL servers. 

Next, the end user or server administrator can select a desired time period and check faults amount (if there were any) for all users or for a particular user. 

The default average value (A column in the graph) is  1 minute:

![lves2](/images/lves2.jpg)

Column "L" shows the current limit, and "F" shows the number of faults.

The chart can be generated from the [command line](/command-line_tools/#lvechart) as well.

And finally, the end user can see the processes snapshot directly from his panel, for example: 

![lves3](/images/lves3.PNG)

The [snapshots](/command-line_tools/#lve-read-snapshot) are available for admin from the command line as well.

## How big your swap partition to be

Typically - you should never have more than 2GB of swap. On shared hosting servers - you're better of with 0.5 or no swap at all.

Let us explain the problem.
 
1. In ancient times, swap was used so that computer can do its job (even if slow) even in the case when a program(s) doesn't fit into memory. We are past that.
 
2. In more modern time, it is mostly used so some of the programs that are not used right now could be pushed out of RAM, giving some extra RAM for caches/buffers to get extra performance out of the server.
 
Note that in that case, only programs that are rarely used (at most once for several minutes, more like once in a few hours) are good candidates for that. 
 
On a typical shared hosting server - there might be about 1/2GB of such programs.
 
Now, having more swap sounds like a non-issue until your server doesn't have problems.
 
Yet, it becomes a problem if something "happens" that causes a server to use up all the RAM.
 
With no/small swap, OOM killer (a kernel thread that monitors memory consumption) will detect that server doesn't have enough memory - decide which process to kill, and will kill it.
 
It will do it for as long as it needed, killing processes left and right.

This will result in servers acting badly, giving out 500 errors, or even stop serving HTTP requests at all. Yet, you will still be able to get into the server via SSH, and figure out/fix whatever is happening.
 
With the large swap, OOM killer (rightfully) thinks that there are plenty of memory left, so it doesn't act. Processes that were getting more ram, are the one that needs to be running (based on OS), so everything else will be pushed out to swap. That includes Apache/PHP processes, SSH, MySQL, etc...
 
And whatever is in swap - is VERY slow. 1000s of times slower...

So, now:
 
HTTP doesn't work. Requests timeout - though OS tries to bring up Apache/PHP from swap, causing something else into swap, trashing disks.
 
SSH doesn't work... probably timeouts as well. Maybe you can get it to work if you wait for 30 minutes, as it competes with all the HTTP requests/apache processes.
 
Logging doesn't work - your IO overloaded with all the swap disk IO that are trashing your disk.
 
As a result, you get an unresponsive server, and often - no idea what happened.
 
::: tip
Our advice - shrink swap to at most 0.5G-1GB, or turn it off completely, as by the time you have 2GB in SWAP - your server is hosed.
:::

## Disabling Virtual Memory limit

It is recommended to disable VMEM limits (set them to 0) in your system for all users and packages.

The VMEM limit is deprecated in CloudLinux 6 and 7 system and can cause unexpected issues.

There are several ways to disable VMEM limits.

The following command will replace all VMEM related entries in the limits configuration file “ve.cfg” to the correct value:

<div class="notranslate">

```
$ sed -r -i.old 's|<(v?)mem\s[^>]*>|<\1mem limit="0"/>|g' /etc/container/ve.cfg && lvectl apply all
```
</div>

Alternatively, limits can be adjusted using [LVE Manager](/lve_manager/#lve-manager) and via [lvectl](/command-line_tools/#lvectl) command line tool.

Please note that changing the default limit alone, like this (for example):
<div class="notranslate">

```
$ lvectl set default --vmem=0
$ lvectl apply all
```
</div>

is usually not enough, since it will just change the default limit set.

All the accounts with package limits and personal limits will stay intact.

So if you are about to change the limits via LVE Manager - please make sure to change limits for all accounts and packages.

## What is the doctor key/script and what it’s needed for?

To resolve issues more quickly, our support team would need to know the basic information about your server first. Our script collects such data as kernel version, list of LVE related packages installed and their versions. We also collect the content of some files, like _grub.cfg_, _/etc/container/ve.cfg_, etc.

Our script also performs some basic checks; for example, it checks if you still have vmem limit enabled or if the mod_hostinglimits module is loaded.

Here are the instructions on how to obtain the doctor key before submitting a support ticket for different departments:

For **CloudLinux OS** department:
Run the following command on your server (as root user):

<div class="notranslate">

```
wget -qq -O - https://www.cloudlinux.com/clinfo/cldoctor.sh|bash
```
</div>

If "wget" utility is not installed/available you can use "curl", like this:

<div class="notranslate">

```
curl -s https://www.cloudlinux.com/clinfo/cldoctor.sh|bash
Then paste the generated key into the ticket.
```
</div>

For **Imunify360** department:
Run the next command on your server (as root user):

<div class="notranslate">

```
imunify360-agent doctor
```
</div>

Then paste the generated key into the ticket.

For **ImunifyAV and ImunifyAV+** related support tickets:

<div class="notranslate">

```
imunify-antivirus doctor
```
</div>

For **KernelCare** department:
Run the next command on your server (as root user):

<div class="notranslate">

```
kcarectl --doctor
```
</div>

Then paste the generated key into the ticket.

::: tip Note
We do not collect any sensitive or personal information from your server, like passwords of any kinds, domain names or e-mail addresses, etc.
:::

All the collected information is used for diagnosis and troubleshooting purposes only.

## KernelCare installation, management and uninstall

KernelCare installation instructions are straightforward and are summarized on the following page: [https://www.kernelcare.com/install-kernelcare/](https://www.kernelcare.com/install-kernelcare/)

To uninstall KernelCare just execute:

<div class="notranslate">

```
yum remove kernelcare
```
</div>

KernelCare is set to check for updates, and update the kernel every 4 hours. If you want to run the update manually, execute as root:

<div class="notranslate">

```
/usr/bin/kcarectl --update
```
</div>

- **How Can I disable automatic updates?**

Edit file _/etc/sysconfig/kcare/kcare.conf_

<div class="notranslate">

```
Set AUTO_UPDATE=False
```
</div>

- **How can I see the 'updated' version of the kernel?**

Run:

<div class="notranslate">

```
/usr/bin/kcarectl --uname
```
</div>

We provide convenience script _/usr/bin/kcare-uname_ that has the same syntax as uname.

- **How can I see which patches were applied to my kernel?**

Execute as root:

<div class="notranslate">

```
/usr/bin/kcarectl --patch-info
```
</div>

- **Is KernelCare software released under open source?**

The kernel module is released under GPL2, and you can download it here: [http://downloads.kernelcare.com/kmod_kcare.tar.gz](http://downloads.kernelcare.com/kmod_kcare.tar.gz) 

Other components are distributed in binary format only under KernelCare License

## Can CloudLinux work in a virtual machine?

CloudLinux OS is fully compatible with all hypervisor based virtualization. This includes 32-bit and 64-bit Xen, KVM, Hyper-V, VMware, Parallels Baremetal.

OpenVZ and Virtuozzo support has been deprecated.

## Error on LVE enter -7 in Apache error log

It means that user was limited to a number of concurrent connections, and received 503 error.
 
Run:

<div class="notranslate">

```
# lveinfo --period=1d --by-fault=mep --display-username
```
</div>

to see affected users within past 24 hours

## Load Average is high on VMware VPS

If you are getting high LA on your VMware VPS, please make sure that VMware tools are installed.

To check VMware modules you can use:

<div class="notranslate">

```
# lsmod |grep vm
```
</div>

VMware tools installation guide can be found [here](https://kb.vmware.com/s/article/1018414)

## MySQL Governor and placing queries inside users LVE

Find the most recent information on this topic in our online [docs](/cloudlinux_os_components/#modes-of-operation)

## PHP Selector and DirectAdmin

CloudLinux PHP Selector works with DirectAdmin only if PHP is running in suPHP or FastCGI mode. Here is the complete set of commands to enable PHP Selector on DirectAdmin with suPHP:

<div class="notranslate">

```
/usr/local/directadmin/custombuild/build set php1_mode suphp
/usr/local/directadmin/custombuild/build set cloudlinux yes
/usr/local/directadmin/custombuild/build set cagefs yes
/usr/local/directadmin/custombuild/build update
/usr/local/directadmin/custombuild/build apache
/usr/local/directadmin/custombuild/build php y
/usr/local/directadmin/custombuild/build suphp
/usr/local/directadmin/custombuild/build rewrite_confs
cagefsctl --force-update
cagefsctl --remount-all
```
</div>

Same way for FastCGI mode.

## How do I configure Apache to have Python script run in CageFS?

If you want to run Python scripts in CageFS and have them fully secure you will have to use suexec with CGI or suexec with FastCGI.

## High load average without visible CPU consuming processes. CPU scaling, kondemand

When you see a high load average, however, no real CPU consuming processes, but with kondemand process in top command, then most probably CPU scaling is the core of the issue. 

Example 'top' output:

<div class="notranslate">

```
top - 22:22:07 up 15 min, 3 users, load average: 5.30, 4.03, 2.60
Tasks: 1022 total, 1 running, 1021 sleeping, 0 stopped, 0 zombie
Cpu(s): 0.0%us, 0.1%sy, 0.0%ni, 99.8%id, 0.0%wa, 0.0%hi, 0.1%si, 0.0%st
Mem: 32789164k total, 1858284k used, 30930880k free, 66368k buffers
Swap: 4194296k total, 0k used, 4194296k free, 798340k cached

PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND
4979 root 20 0 153m 7364 1780 S 2.6 0.0 0:15.20 lvestats-server
4024 root 20 0 0 0 0 S 2.3 0.0 0:18.44 kondemand/23
4025 root 20 0 0 0 0 S 2.3 0.0 0:19.45 kondemand/24
4023 root 20 0 0 0 0 S 2.0 0.0 0:14.85 kondemand/22
4026 root 20 0 0 0 0 S 2.0 0.0 0:17.60 kondemand/25
4027 root 20 0 0 0 0 S 2.0 0.0 0:16.24 kondemand/26
4022 root 20 0 0 0 0 S 1.6 0.0 0:12.68 kondemand/21
4028 root 20 0 0 0 0 S 1.6 0.0 0:13.79 kondemand/27
```
</div>

Check what scaling is set to:

<div class="notranslate">

```
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
```
</div>

If you see **kondemand** there, it means that scaling is enabled. It actually enables the operating system to scale the CPU frequency up or down in order to save power. CPU frequencies will be scaled automatically depending on the system load, in response to ACPI events, or manually by userspace programs. To be sure CPU has been scaled you may compare real CPU frequency to hardware:

<div class="notranslate">

```
grep -E '^model name|^cpu MHz' /proc/cpuinfo
```
</div>

_model name : Intel(R) Xeon(R) CPU X7550 @ 2.00GHz cpu MHz : 1067.000_

Resolution is simple - switch off scaling, this should be done for all CPU cores, but here is one-liner for it:

<div class="notranslate">

```
for CPUFREQ in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do [ -f $CPUFREQ ] || continue; echo -n performance > $CPUFREQ; done
```
</div>

This will help on an already running server, however, to resolve it completely you have to remove **cpuspeed** rpm package.

## How are average values in lveinfo over period calculated?

Average values in lveinfo are taken from current one-minute average. The calculations of all averages (aCPU, aPMEM aIO) are following: 

- every minute lvestats write current average CPU usage value per minute; 

- every 5 minutes lvestats calculates 5 minutes average based on previous 1 minute average (sum all and divide by 5); 

- every hour it calculates 1 hour average based on previously calculated 5 minutes (sum all then divide by 12);

This way we can keep important data and save enough space of lvestats database. 

To make the situation clear lets split lveinfo output to different sections:

<div class="notranslate">

```
$ lveinfo --id XXX --period=1d
```
</div>

**From To** _aCPU mCPU lCPU aIO mIO lIO aEP mEP lEP aVMem mVMem lVMem aPMem mPMem lPMem aNproc mNproc lNproc EPf VMemF PMemF NprocF_

Hourly:

**04-24 02:00 04-24 03:00** _0 4 4 3 169 5120 1 10 10 37.7M 209.6M 4.0G 23.4M 110.7M 4.0G 0 1 30 1 0 0 0_  
**04-24 03:00 04-24 04:00** _0 4 4 1 178 5120 1 10 10 53.2M 246.1M 4.0G 31.6M 126.5M 4.0G 0 1 30 0 0 0 0_  
**04-24 04:00 04-24 05:00** _0 2 4 0 73 5120 1 5 10 48.8M 139.0M 4.0G 30.4M 82.2M 4.0G 0 1 30 0 0 0 0_

5 min:

**04-24 05:00 04-24 05:05** _0 1 4 0 8 5120 1 3 10 50.7M 78.2M 4.0G 31.0M 46.6M 4.0G 0 0 30 0 0 0 0_  
**04-24 05:05 04-24 05:10** _0 0 4 0 0 5120 1 3 10 44.9M 74.7M 4.0G 28.1M 43.3M 4.0G 0 0 30 0 0 0 0_  
**04-24 05:10 04-24 05:15** _0 0 4 0 12 5120 1 2 10 36.4M 61.9M 4.0G 23.6M 42.1M 4.0G 0 0 30 0 0 0 0_

1 min: 

**04-24 05:14 04-24 05:15** _0 0 4 0 3 5120 1 3 10 40.4M 74.2M 4.0G 23.7M 41.0M 4.0G 0 0 30 0 0 0 0_  
**04-24 05:15 04-24 05:16** _0 0 4 0 0 5120 1 1 10 24.5M 30.6M 4.0G 16.1M 21.9M 4.0G 0 0 30 0 0 0 0_  
**04-24 05:16 04-24 05:17** _0 0 4 0 0 5120 1 2 10 28.3M 47.8M 4.0G 17.8M 27.0M 4.0G 0 0 30 0 0 0 0_

## Does CloudLinux OS support nginx/PHP-FPM/FCGID/LiteSpeed/Apache+mpm_itk?

Generally yes, it does support most of the features. However, in some cases, you need to apply some additional patches.

For more information and compatibility matrix, please see the following [article](/limits/#compatibility-matrix)

## CloudLinux OS Hybrid Kernels

Find the most recent information on this topic in our online [docs](/cloudlinux_os_kernel/#hybrid-kernels)

## What happens when a site reaches its resource limit?

Once a website reaches the limit of resources which has been set, the site will begin to slow down. Once the number of entry processes (Apache/HTTP requests is reached), a user will get a 503 error message. The website that is consuming too many resources will stop working but the other tenants on the server will continue to run normally.

## Plesk and PHP Selector

Plesk has its own PHP selection functionality since version 11.

It is fully compatible with our PHP Selector and CageFS. What happens is that Plesk selector switches 'native' PHP version, while CloudLinux OS PHP Selector switches sites to alternate PHP versions.

If you install different PHP versions from the link above to activate it for the customer you are required to run:

<div class="notranslate">

```
# cagefsctl --force-update
```
</div>

Resellers have no control over PHP-Selector, and shouldn't have any. Only admin & end customers have control over PHP-Selector.

## How to fix the issue with non-UTF symbols in packages names

Short issue description: if you see errors in console when runnning:  

<div class="notranslate">

```
lvectl paneluserslimits --json 
```
</div>

and some other commands, or in WHM - LVE Manager like this:

<div class="notranslate">

```
Traceback (most recent call last):
  File "/usr/sbin/lvectl", line 707, in <module>
    main()
  File "/usr/sbin/lvectl", line 598, in main
    lve_commands.paneluserslimits()
  File "/opt/alt/python27/lib/python2.7/site-packages/lvectllib.py", line 830, in paneluserslimits
    result += formatter(user)
  File "/opt/alt/python27/lib/python2.7/site-packages/lvectllib.py", line 774, in wrapper
    lve_apply(user, plan_id=package, reseller=reseller, result=True)
  File "/opt/alt/python27/lib/python2.7/site-packages/lvectllib.py", line 603, in lve_apply
    reseller = guess_reseller_by_package (plan_id)[0]
  File "/opt/alt/python27/lib/python2.7/site-packages/lvectllib.py", line 1828, in guess_reseller_by_package
    package = package.decode('utf-8')
  File "/opt/alt/python27/lib64/python2.7/encodings/utf_8.py", line 16, in decode
    return codecs.utf_8_decode(input, errors, True)
UnicodeDecodeError: 'utf8' codec can't decode byte 0xf1 in position 13: unexpected end of data
```
</div>

This means that your browser encoding was not set to UTF-8 during the package creation, and it was saved with gibberish symbols. Next, when the package is assigned to one or more users, you will see the error listed above. For example:

1. Your browser has ISO-8859-6 encoding set, and you create a package with some non-ASCII symbols (cyrillic in this case):
 
2. Next, you create a new user and assign the package to that user:

If you look at such user in the console, it usually looks as follows:

<div class="notranslate">

```
# cat /var/cpanel/users/username

BACKUP=1

BWLIMIT=unlimited

CONTACTEMAIL=

…..

OWNER=root

PLAN=п�&amp;#65533;�&amp;#65533;�&amp;#65533;т�&amp;#65533;щ�&amp;#65533;
```
</div>

The last line “PLAN=...” means which package is assigned to the user, and as you can see in the example above, the line contains gibberish symbols.

cPanel only supports UTF-8 encodings and they have no plans to change that, so the PLAN= line with gibberish symbols must be manually changed to the corresponding plan, i.e. it should look like this: PLAN=пакетище

Further recommendations:

Fix the browser encoding to use one compatible with UTF-8. Since UTF-8 became the standard for all data on the Internet in 2009 the primary browsers (Internet Explorer/Edge, Firefox, Chrome, Safari) provide language encodings compatible with UTF-8. 

## Different PHP versions per directories using mod_lsapi

Here is an easy instruction of how to setup different PHP versions per directories when using [mod_lsapi](/cloudlinux_os_components/#apache-mod-lsapi-pro/).

Assuming that you already have CageFS, PHP Selector and mod_lsapi installed, perform the following steps:

1. Setup mod_lsapi (either globally or per domain).

2. If EasyApache 4 is used - you should already have a _/etc/container/php.handler_ file with content inside:

<div class="notranslate">

```
application/x-httpd-ea-php44-lsphp /opt/cpanel/ea-php44/root/usr/bin/lsphp
application/x-httpd-ea-php51-lsphp /opt/cpanel/ea-php51/root/usr/bin/lsphp
application/x-httpd-ea-php52-lsphp /opt/cpanel/ea-php52/root/usr/bin/lsphp
application/x-httpd-ea-php53-lsphp /opt/cpanel/ea-php53/root/usr/bin/lsphp
application/x-httpd-ea-php54-lsphp /opt/cpanel/ea-php54/root/usr/bin/lsphp
application/x-httpd-ea-php55-lsphp /opt/cpanel/ea-php55/root/usr/bin/lsphp
application/x-httpd-ea-php56-lsphp /opt/cpanel/ea-php56/root/usr/bin/lsphp
application/x-httpd-ea-php70-lsphp /opt/cpanel/ea-php70/root/usr/bin/lsphp
application/x-httpd-ea-php71-lsphp /opt/cpanel/ea-php71/root/usr/bin/lsphp 
```
</div>

For other panels or no panel - create a _/etc/container/php.handler_ file with handlers for different PHP versions:

<div class="notranslate">

```
application/x-lsphp52 /opt/alt/php52/usr/bin/lsphp
application/x-lsphp53 /opt/alt/php53/usr/bin/lsphp
application/x-lsphp54 /opt/alt/php54/usr/bin/lsphp
application/x-lsphp55 /opt/alt/php55/usr/bin/lsphp
application/x-lsphp56 /opt/alt/php56/usr/bin/lsphp
application/x-lsphp71 /opt/alt/php71/usr/bin/lsphp 
```
</div>

Restart Apache.
 
3. Create _.htaccess_ file in the directory where you need to have a PHP version different from default with the right handler. 

For cPanel with EasyApache4:

<div class="notranslate">

```
<FilesMatch "\.(php4|php5|php3|php2|php|phtml)$">
SetHandler application/x-httpd-ea-php71-lsphp
</FilesMatch>
```
</div>

For other panels or no panel:

<div class="notranslate">

```
<FilesMatch "\.(php4|php5|php3|php2|php|phtml)$">
SetHandler application/x-lsphp71
</FilesMatch>
```
</div>

As a result, subdirectories will use the same PHP version as the parent unless you overwrite it with another _.htaccess_ entry in that subdirectory.

To match PHP extensions selection with extensions selected by the end user for that PHP version in PHP Selector you have to follow [this docs article](https://docs.cloudlinux.com/cloudlinux_os_components/#php-extensions).

This way, the main website can use native PHP handler (suphp/fcgi) while subdirectory is using lsapi with necessary PHP version.

::: tip Note 
There is one little trick that can be confusing. It applies only if you have PHP Selector enabled and you have non-native version selected there for a user. In that case, if the version that you assign through .htaccess is the same as ea-php version selected as system default version in WHM -> MultiPHP Manager -> System Default version, that version will not be applies, the version that you'll actually get will be the same as selected in PHP Selector.
:::


## Integrating LVE limits with packages for unsupported control panels

The following [documentation](https://docs.cloudlinux.com/lve_manager/#control-panel-integration-guide) should be used to integrate LVE limits with packages for all unsupported panels or even for servers without panels.

Here is an example script and the basic steps.

Before we start:

- the script is simplified as much as possible for better understanding;

- the script works only with one-word package names, without any spaces;

- _user_package_ file logic is not good enough to handle a large amount of users/packages (but this is just an example).  

1. Create the necessary directory and files:

<div class="notranslate">

```
mkdir /etc/clpackages
touch /etc/clpackages/user_package
touch /etc/clpackages/custompkg.sh
chmod 755 /etc/clpackages/custompkg.sh
```
</div>

2. The _user_package_ file is just a relation between users and packages, add the following content:

_501 Package1 502 BusinessPackage 503 Package1 504 Package1 505 BusinessPackage_

3. The _custompkg.sh_ is the main script which will handle all the management. Add the following code to it:

<div class="notranslate">

```
#!/bin/bash

PDIR="/etc/clpackages"
cd $PDIR

case "$1" in
        --list-all)

                cat user_package

        ;;
        --userid=*)
                uid=${1#*=}
                cat user_package | grep $uid | awk '{ print $2 }'
        ;;
        --package=*)
                pack=${1#*=}
                cat user_package | grep $pack | awk '{ print $1 }'
        ;;
        --list-packages)
                cat user_package | awk '{ print $2 }' | sort | uniq
        ;;
        *)
                echo "Usage:
--help               show this message
--list-all           prints <userid package> pairs (accepts no parameters);
--userid=id          prints package for a user specified
--package=package    prints users for a package specified
--list-packages      prints packages list"
        ;;
esac
```
</div>

4. Configure LVE to use the custom script: open /etc/sysconfig/cloudlinux and add there:

<div class="notranslate">

```
CUSTOM_GETPACKAGE_SCRIPT=/etc/clpackages/custompkg.sh
```
</div>

5. Set some limits for the packages:

<div class="notranslate">

```
lvectl package-set Package1 --speed=100% --pmem=1G
lvectl package-set BusinessPackage --speed=200% --pmem=2G
```
</div>

Check if they have been properly set:

<div class="notranslate">

```
lvectl package-list
```
</div> 

_ID   SPEED    NCPU    PMEM    VMEM      EP   NPROC      IO VE_DEFAULT     200       0      0M      0M      20      20       0 BusinessPackage     200       0   2048M      0M      20      20       0 Package1     100       0   1024M      0M      20      20       0_

6. Check users assignment (is already done by our script):

<div class="notranslate">

```
# getcontrolpaneluserspackages --list-all
```
</div>

_501 Package1 502 BusinessPackage 503 Package1 504 Package1 505 BusinessPackage_

7. Apply limits for all accounts:

<div class="notranslate">

```
lvectl apply all
lvectl list | grep 501
```
</div>

_501     100       1    1.0G      0K      20      20       0_
	 
## Why CageFS installation changes jailshell to regular bash on cPanel?

During CageFS package installation or update, all users with jailshell enabled will have it changed to regular /bin/bash in _/etc/passwd_ .

This is done to avoid possible conflict with virtfs when non-cagefs user enters virtfs, jailshell copies all mountpoints from cagefs-skeleton to _/home/virtfs/$USER_. Those mount points are duplicated for each user (approx 54 mount point per user).

<div class="notranslate">

```
/dev/sda1 /home/virtfs/korvin/usr/share/cagefs-skeleton/opt/alt ext4 ro,nosuid,relatime,barrier=1,data=ordered,jqfmt=vfsv0,usrjquota=quota.user 0 0
/dev/sda1 /home/virtfs/korvin/usr/share/cagefs-skeleton/usr/lib ext4 ro,nosuid,relatime,barrier=1,data=ordered,jqfmt=vfsv0,usrjquota=quota.user 0 0
/dev/sda1 /home/virtfs/korvin/usr/share/cagefs-skeleton/usr/lib64 ext4 ro,nosuid,relatime,barrier=1,data=ordered,jqfmt=vfsv0,usrjquota=quota.user 0 0
/dev/sda1 /home/virtfs/korvin/usr/share/cagefs-skeleton/usr/include ext4 ro,nosuid,relatime,barrier=1,data=ordered,jqfmt=vfsv0,usrjquota=quota.user 0 0
/dev/sda1 /home/virtfs/korvin/usr/local/cpanel/3rdparty/mailman/logs ext4 rw,relatime,barrier=1,data=ordered,jqfmt=vfsv0,usrjquota=quota.user 0 0
/proc/bus/usb /home/virtfs/korvin/usr/share/cagefs-skeleton/proc/bus/usb usbfs ro,nosuid,relatime 0 0
```
</div>

This could result in a really large number of mount points which could lead to slow system performance. It is secure to provide bash access to users as long as you have CageFS enabled.

## EP and NPROC limits - a look from inside

The main purpose of this article is to describe EP and NPROC limits in more details for better understanding of their operation.

So, **EP limits** purpose is to define the **maximum amount of active connections** to the web server inside LVE (1 user account = 1 LVE). When we set EP limits for an account, then we strictly limit the number of concurrent Apache connections to be served by a specific website. Each time a website request enters LVE, the EP counter is being incremented.

Note that the EP counter value wouldn't be incremented in case of a PHP process inside LVE is calling some external process (like cron, Sendmail, Exim, MySQL etc.), all of them would be considered as a single LVE entry - single connection, because EP counter doesn't include the child processes created inside LVE.

**NPROC limits** purpose is to define the **maximum number of processes inside LVE**. Such as ssh/cron/php/pop3/imap etc. They don't increment the value of the EP counter due to being executed with the LVE_NO_MAXENTER flag.

It's important to note, that the NPROC limits should always be higher than the EP. Sometimes you could see that there is only 1 EP connection, but the PNO value is much higher (using the "lvetop" utility). There are two possible reasons for such behavior:

1. The invoked PHP script has made a call to some external application from inside the user LVE (like cron, Sendmail, Exim, MySQL etc.)
2. In case you use any of the following handlers: PHP-LiteSpeed, FastCGI or PHP-FPM, there is a chance that additional child processes (like lsphp/fastcgi/php-fpm) could be spawned and stay inside LVE for some time.

It's also important to note that such behavior is only actual for the mentioned handlers. As suPHP for example, terminates the process upon the PHP request completion, and in this case, NPROC value most probably will be equal to EP value.

## Mod_lsapi, Number of Processes (NPROC) and EP explained

Apache [mod_lsapi](/cloudlinux_os_components/#apache-mod-lsapi-pro) is a great replacement for suPHP/FCGI engines. This article uncovers more about how lsphp works on a server by means of processes.   The scheme is that each time a process 'enters' into LVE, we increment the EP counter. Each time a process exits LVE, we decrement the counter. We don't count processes that are created inside LVE itself. When we talk about **lsapi**, the following image can explain more:
![lsapi](/images/mod_lsapidiagrammnew.jpg)

For the real request we have several processes: 
- Apache process that accepts a connection, it is actually one that increases **EP**, it performs **lve_enter**. 
- **lsphp** parent process (one per VirtualHost), which starts **lsphp** backends. 
- **lsphp** backend process that actually processes requested PHP file. 

Please review the results with a simple sleep.php script with sleep(30); inside presented below. The processes for single opening are:

<div class="notranslate">

```
# lveps -p
ID EP PNO COM TNO TID CPU MEM DT DO
bogdan1 1 3 --- 3 --- 0 15 39340 1865
--- --- lsphp:/home/bogdan1/publ --- 271509 0 4 N/A N/A
--- --- lsphp --- 271508 0 4 N/A N/A
--- --- /usr/sbin/httpd -k start --- 271024 0 4 N/A N/A
```
</div>

We have one **EP** and three **NPROC** here.  Where Apache creates **lsapi** master process and it creates **lsphp** workers like on a screenshot above. When opening the same URL twice simultaneously you can see the following:

<div class="notranslate">

```
# lveps -p
ID EP PNO COM TNO TID CPU MEM DT DO
bogdan1 2 5 --- 5 --- 0 20 39340 1865
--- --- lsphp:/home/bogdan1/publ --- 271518 0 4 N/A N/A
--- --- lsphp:/home/bogdan1/publ --- 271509 0 4 N/A N/A
--- --- lsphp --- 271508 0 4 N/A N/A
--- --- /usr/sbin/httpd -k start --- 271043 0 4 N/A N/A
--- --- /usr/sbin/httpd -k start --- 271024 0 4 N/A N/A
```
</div>

This time we have two **EPs** and five **NPROCs**, which is normal as parent lsphp is one per VirtualHost. If, for example, our PHP script creates another process (sending mail, etc.) the **EP** will remain the same as PHP script is already executed inside LVE. However, the number of processes for this LVE will increase. That is why **NPROC** should be greater than **EP**. There is no way to limit the number of parent PHP processes, it is only one per VirtualHost (not per account!). To keep users within limits you have to combine `lsapi_backend_children` with LVE NPROC/EP limits. Each lsphp worker process ends after the request is processed. Turning `"connection_pool_mode On"`  in lsapi config makes **lsphp** workers never finish - they stay alive for `lsapi_backend_max_idle` time, or until `lsapi_backend_max_reqs` is reached (or Apache restarted). All requests for every virtual host are spread across Apache worker almost equally. Connection pool grants faster processing mode, however, it will cause a higher number of processes per LVE (NPROC) and a bit higher memory usage.

## Why uname is showing the old kernel version after KernelCare patches applied?

The **uname** command always shows the same kernel version as before installing KernelCare. The reason we don't change the output of the uname command is due to the fact that we don't change original kernel signature or ABI with KernelCare. Yet, many install scripts depend on uname output to decide which modules to install or which header files to use for compilation.

As such, changing the output of uname will create a lot of issues.

You can get 'effective' kernel uname info by running:

```
kcare-uname
```

## We found that SELinux is disabled. Could you help us to enable it?

SELinux is not supported by CloudLinux OS and there are no plans to.

## MySQL_ND (native driver) vs MySQL PHP extensions

MySQL_ND and MySQL PHP extensions are the different sets of drivers. They are provided by the different teams of developers (MySQL and PHP, respectively). The most important is the fact that they are mutually exclusive - you can not select them both simultaneously or mix them in any way. Otherwise, the php code will throw errors about the connection to the MySQL database.

Since PHP 5.4, mysqlnd is used as the default MySQL driver for all PHP MySQL extensions. But for PHP 5.3 and older PHP versions libmysqlclient is used as a connector from PHP to MySQL.
For PHP Selector we need to support both methods, that is why we added nd_* prefix for PHP MySQL extensions compatible with mysqlnd.

So, as a result:
- libmysqlclient works with  mysql, mysqli, pdo_mysql extensions (PHP 4.4 - PHP 5.3);
- mysqlnd works with nd_mysql, nd_mysqli, nd_pdo_mysql extensions (PHP 5.4 - PHP 7.1).

**So you have to choose only one of the following sets:**

```
mysqlnd
nd_mysql
nd_mysqli 
nd_pdo_mysql​
```

**or**

```
mysql
mysqli
pdo_mysql​
```

Also <span class="notranlate">_/etc/cl.selector/php.extensions.conflicts_</span> file provides the information about the mutually incompatible php extensions.