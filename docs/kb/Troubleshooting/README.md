# Troubleshooting

Start from interactive decision tree based troubleshooting entries located at [CloudLinux ZenDesk](https://cloudlinux.zendesk.com/hc/en-us/sections/115001345089-Troubleshooting)

### How To Deal With "Boot Partition is Full" Message

_This article is suitable for both CL6 and CL7 systems._

The error appears for different reasons. For example, you have a separate boot partition, and something went wrong during the kernel uninstall process, so vmlinuz and initramfs files were not removed.

First of all, you need to check the kernels which are already installed on your system by running the 
`# rpm -q kernel` , for example:

<div class="notranslate">

```
# rpm -q kernel
kernel-2.6.32-954.3.5.lve1.4.61.el6.x86_64
kernel-2.6.32-954.3.5.lve1.4.59.el6.x86_64
kernel-2.6.32-954.3.5.lve1.4.63.el6.x86_64
```
</div>

command, and then compare the output with the actual content of /boot partition:

<div class="notranslate">

```
# ls -la /boot

  total 108956

  dr-xr-xr-x. 4 root root 4096 Oct 29 19:31 .
  dr-xr-xr-x. 25 root root 4096 Oct 29 19:29 ..
  -rw-r--r--. 1 root root 109010 Sep 6 06:33 config-2.6.32-954.3.5.lve1.4.71.el6.x86_64
  -rw-r--r--. 1 root root 109010 Sep 19 05:45 config-2.6.32-954.3.5.lve1.4.72.el6.x86_64
  -rw-r--r-- 1 root root 149026 Oct 2 09:15 config-3.10.0-962.3.2.lve1.5.26.7.el6h.x86_64
  drwxr-xr-x. 3 root root 4096 Oct 17 2018 efi
  drwxr-xr-x. 2 root root 4096 Oct 29 19:29 grub
  -rw-------. 1 root root 20054199 Sep 23 14:21 initramfs-2.6.32-954.3.5.lve1.4.71.el6.x86_64.img
  -rw-------. 1 root root 20054014 Oct 3 11:11 initramfs-2.6.32-954.3.5.lve1.4.72.el6.x86_64.img
  -rw------- 1 root root 35678685 Oct 29 19:20 initramfs-3.10.0-962.3.2.lve1.5.26.7.el6h.x86_64.img
  -rw------- 1 root root 5003790 Oct 4 09:04 initrd-2.6.32-954.3.5.lve1.4.71.el6.x86_64kdump.img
  -rw------- 1 root root 5509691 Oct 29 19:31 initrd-3.10.0-962.3.2.lve1.5.26.7.el6h.x86_64kdump.img
```
</div>
  
If you see that files **initrafs-** or **vmlinuz-** does not match the $KVERSION (where `$KVERSION` is the version of the installed CloudLinux OS kernel), then you can safely delete those files manually.

Alternatively, you execute the next commands: 

<div class="notranslate">

```
package-cleanup --oldkernels --count=3
```
</div>

or

<div class="notranslate">

```
package-cleanup --oldkernels --count=2
```
</div>

After performing one of the commands above, all old kernels will be removed, except for 2/3 last ones.

You can automate this process by adding "installonly_limit=3 (or 2) " to yum.conf; during the next kernel update, old kernels will be removed (except for 2\3 last ones).

::: danger IMPORTANT
We don't recommend leaving only one kernel on the server; 2-3 kernels should be always installed on the server.
:::

### Errors reported in console during the kernel package installation

First of all, check the _/etc/grub2.cfg_ file, it should contain the record of the updated kernel like this (in the case below, the updated version is 3.10.0-962.3.2.lve1.5.24.8.el7.x86_64):

![kern1.jpg](/images/kern1.jpg)

Second, make sure that initramfs file for the updated kernel is present in _/boot_ folder (marked in yellow):

![kern2.jpg](/images/kern2.jpg)

If any of those conditions are not met, make sure that your _/boot_ partition has enough free space (at least 60-70Mb free to install a new kernel), but note, that _/boot_ does not always have to be a separate partition.

Let's assume that this is the right case, and there is not enough free space on _/boot_ partition to install a new kernel. In this case, you can remove the oldest kernel in the list, here is how to do it:

First, you should run this command: 

<div class="notranslate">

```
awk -F\' '$1=="menuentry " {print i++ " =  "$2}' /etc/grub2.cfg
```
</div>

The output should look like this: 

![kern3.jpg](/images/kern3.jpg)

So, basically, what you need to do is remove the oldest kernel in the list, in this example it is 3.10.0-714.10.2.lve1.5.17.1.el7.x86_64 version. So, to remove this kernel version, just run:

<div class="notranslate">

```
yum remove kernel-3.10.0-714.10.2.lve1.5.17.1.el7.x86_64
```
</div>

::: danger 
Yum should suggest removing only the kernel package, and not any other as a dependency!!
:::

You can also [submit a support ticket](https://cloudlinux.zendesk.com/hc/requests/new) with our support team and provide access to the server, so we could assist you with resolving the issue ASAP.

### Unable to get kernel-module for r1soft backup

If you are trying to setup r1soft backups and getting errors like:

- Failed to get suitable module for this system: Failed to read directory open *some dir*: no such file or directory
- Failed to find headers at *some dir*
- Unable to find a valid source directory. Please install the kernel headers for your operating system

This article should help you fix this.

First, let's ensure that r1soft kernel module not loaded so we don't do unnecessary work. Type to your console and execute:  

<div class="notranslate">

```
$ lsmod | grep hcp  
```
</div>

if it's showing you something like:

<div class="notranslate">

```
$root@ds-119 [~]# lsmod | grep hcp  
```
</div>

`hcpdriver 75664 4`

Then you don't have to do anything, module is already loaded and all you need to do - start **r1soft** agent.

If you see empty output, then we really have to get the module. Basically we need to ensure that system have corresponding kernel-devel and kernel-headers packages:

<div class="notranslate">

```
$ rpm -qa | grep kernel-headers-$(uname -r)
$ rpm -qa | grep kernel-devel-$(uname -r)
```
</div>

If both commands giving you something like:

<div class="notranslate">

```
$ kernel-devel-(your kernel version here).x86_64
$ kernel-headers-(your kernel version here).x86_64
```
</div>

and if r1soft module still can't be build, than there should be something related to current kernel you are running, maybe it's beta or not supported by r1soft. Try to update to latest stable kernel -> reboot -> install `kernel-devel` and `kernel-headers` -> try building module.

If you don't have modules installed, than we'll have to install them, but first - let's ensure that there are no packages for other kernels with:

<div class="notranslate">

```
$ rpm -qa | grep -e kernel-headers -e kernel-devel
```
</div>

and if there are any, let's remove them:

<div class="notranslate">

```
$ rpm -e kernel-header-xxxxx.elx.x86_64 –nodeps
$ rpm -e kernel-devel-xxxxx.elx.x86_64 –nodeps
```
</div>

Repeat for everything you can find.

After this we are ready for install missing packages:

<div class="notranslate">

```
$ yum install kernel-devel kernel-headers
```
</div>

Once this done, try to get r1soft kernel module with:

<div class="notranslate">

```
$ r1soft-setup --get-module
```
</div>

If r1soft module still can't be build, than there should be something related to current kernel you are running, maybe it's beta or not supported by r1soft. Try to update to latest stable kernel -> reboot -> install `kernel-devel` and `kernel-headers` -> try building module.

### Duplicate log entry for /var/lib/mysql/mysqld.log

In case logrotate complains

<div class="notranslate">

```
/etc/cron.daily/logrotate:
error: mysqld:21 duplicate log entry for /var/lib/mysql/mysqld.log
```
</div>

the simple workaround should be applied:

<div class="notranslate">

```
~# ls -lsa /etc/logrotate.d/mysql*
/etc/logrotate.d/mysql
/etc/logrotate.d/mysqld
~# rm /etc/logrotate.d/mysql
```
</div>

### What to do if your site is not working with opcache PHP extension enabled

The symptoms: your site throws error 503, or just a blank page with opcache extension enabled.

In some rare cases, you can try to add the next parameter to opcache.ini: 

<span class="notranslate>`opcache.optimization_level=0`</span>

 The opcache optimizer is not working very well in some cases, and PHP just crashes when opcache tries to optimize it. With <span class="notranslate>`opcache.optimization_level`</span> set to 0, it will just cache the content, no optimizations will be made.
 
### What does "Error : failed to create symlink (13)Permission denied" mean?

We have recently introduced new protection type, called [Link Traversal Protection](/cloudlinux_os_kernel/#link-traversal-protection)

In very rare cases, it might break some of the CloudLinux OS and cPanel functionality, for example: 

<div class="notranslate">

```
# selectorctl --set-user-current=5.4 --user=user
Error : failed to create symlink /home/user/.cagefs/opt/alt/php52/link/conf to /opt/alt/php52/etc/php.d: [Err code 13] Permission denied 
Error : failed to create symlink /home/user/.cagefs/opt/alt/php53/link/conf to /opt/alt/php53/etc/php.d: [Err code 13] Permission denied 
Error : failed to create symlink /home/user/.cagefs/opt/alt/php51/link/conf to /opt/alt/php51/etc/php.d: [Err code 13] Permission denied 
Error : failed to create symlink /home/user/.cagefs/opt/alt/php56/link/conf to /opt/alt/php56/etc/php.d: [Err code 13] Permission denied 
```
</div>

This means that the protection is enabled, both keys `fs.protected_symlinks_create` and `fs.protected_hardlinks_create` are set to 1, but the parameters set for `fs.protected_symlinks_allow_gid` and `fs.protected_hardlinks_allow_gid` are not correct. The values shall correspond to the **linksafe** group ID, for example: 

<div class="notranslate">

```
# getent group linksafe
linksafe:x:993:mailman
```

```
# sysctl -a |grep allow_gid
fs.protected_hardlinks_allow_gid = 993
fs.protected_symlinks_allow_gid = 993
```
</div>

### What does yum error "retry_no_cache=self._retry_no_cache" mean?

**The symptoms:** 

You are trying to convert your CentOS system to CloudLinux OS, and the conversion process fails with the next messages:

<div class="notranslate">

```
File "/usr/share/yum-plugins/rhnplugin.py", line 410, in _getFile 
start, end, copy_local, checkfunc, text, reget, cache, size) 
File "/usr/share/yum-plugins/rhnplugin.py", line 490, in _noExceptionWrappingGet
retry_no_cache=self._retry_no_cache 
AttributeError: 'RhnRepo' object has no attribute '_retry_no_cache'
```
</div>

In short, the issue is solved in newer yum versions, so you just need to update yum package before the conversion.

But anyway there are few ways to solve the issue directly.

**The first method:**

- disable **rhnplugin** in _/etc/yum/pluginconf.d/rhnplugin.conf_ (change enabled=1 to enabled=0)
- recover CentOS repos:  
`mv /etc/cl-convert-saved/CentOS* /etc/yum.repos.d/`
- run `yum update yum`
- remove CentOS repos:  
`mv /etc/yum.repos.d/CentOS* /etc/cl-convert-saved/`
- enable **rhnplugin** back by editing the _/etc/yum/pluginconf.d/rhnplugin.conf_ file

**The second method:** 

Use **rpm** to update required packages: 

<div class="notranslate">

```
wget http://repo.cloudlinux.com/cloudlinux/7.4/install/x86_64/Packages/yum-3.4.3-154.el7.cloudlinux.noarch.rpm
wget http://repo.cloudlinux.com/cloudlinux/7.4/install/x86_64/Packages/rpm-4.11.3-25.el7.x86_64.rpm
wget http://repo.cloudlinux.com/cloudlinux/7.4/install/x86_64/Packages/rpm-python-4.11.3-25.el7.x86_64.rpm
wget http://repo.cloudlinux.com/cloudlinux/7.4/install/x86_64/Packages/rpm-libs-4.11.3-25.el7.x86_64.rpm
wget http://repo.cloudlinux.com/cloudlinux/7.4/install/x86_64/Packages/rpm-build-libs-4.11.3-25.el7.x86_64.rpm
wget http://mirror.centos.org/centos/7/os/x86_64/Packages/rpm-build-4.11.3-25.el7.x86_64.rpm
wget http://repo.cloudlinux.com/cloudlinux/7.4/install/x86_64/Packages/python-urlgrabber-3.10-8.el7.noarch.rpm
```
</div>

and then: 

<div class="notranslate">

```
rpm -Uv rpm-4.11.3-25.el7.x86_64.rpm rpm-libs-4.11.3-25.el7.x86_64.rpm rpm-python-4.11.3-25.el7.x86_64.rpm yum-3.4.3-154.el7.cloudlinux.noarch.rpm rpm-build-4.11.3-25.el7.x86_64.rpm rpm-build-libs-4.11.3-25.el7.x86_64.rpm python-urlgrabber-3.10-8.el7.noarch.rpm
```
</div>

### Incorrect kernel name/release is shown in cPanel/WHM

**Description/resolution:**

_/var/cpanel/sysinfo.config_ was not updated properly during the latest kernel change. To fix this issue you need move/remove this config file:

<div class="notranslate">

```
# mv /var/cpanel/sysinfo.config /var/cpanel/sysinfo.config.bak
```
</div>

and recreate it by running:

<div class="notranslate">

```
# /scripts/gensysinfo
# /scripts/restartsrv_cpsrvd
```
</div>

In case if you receive the error: `""ERROR: The system cannot update the /var/cpanel/sysinfo.config file because it cannot determine your distribution's major version."` – please run the following command:

<div class="notranslate">

```
rpm -qf --queryformat '%{VERSION}\n' /etc/redhat-release
```
</div>
 
Output other than the numbers 6 or 7 indicates a problem and you need to [submit a support ticket](https://cloudlinux.zendesk.com/hc/requests/new) and provide all the information above.

### How to fix lveinfo database error?

**Problem:**

CloudLinux LVE Manager doesn't show anything on statistics tab, `lveinfo` utility displays errors.

**Synopsis:**

If you see errors when running `lveinfo` command-line tool and the last lines looks like these:

<div class="notranslate">

```
File "/opt/alt/python27/lib64/python2.7/site-packages/sqlalchemy/engine/default.py", line 436, in do_execute 
cursor.execute(statement, parameters) 
sqlalchemy.exc.DatabaseError: (DatabaseError) database disk image is malformed u'SELECT lve_stats2_servers.lve_version \nFROM lve_stats2_servers \nWHERE lve_stats2_servers.server_id = ?' ('0195404a-a',) 
Sentry is attempting to send 1 pending error messages 
Waiting up to 10 seconds 
Press Ctrl-C to quit
```
</div>

It means that LVE stats database is corrupted.

**Solution:**

Please follow these steps to backup and rebuild database and restore LVE statistics functionality:

<div class="notranslate">

```
# service lvestats stop
# tar -zcvf /root/lveinfo_backup_$(date +%Y-%m-%d).tar.gz /var/lve/
# mv /var/lve/lvestats2.db{,.old}
# lve-create-db --recreate
# service lvestats start
```
</div>

### Why there is no package ea-apache24_mod_hostinglimits or ea-apache24_mod_lsapi available?

Since EasyApache 4 switched from compiling everything from sources (Apache itself, its modules, PHP, etc) to a RPM based setup (Apache, its modules, PHP, etc are installed as RPMs), mentioned packages should be installed from **cl-ea4** repository, as the most packages from the EA4 cPanel repository are not compatible with CloudLinux packages and this can lead to various errors. 

But how to enable (or setup) **cl-ea4** repository and install all packages required by CloudLinux OS from this repo?

The answer is simple: you just need to run our script, which will do all the work. For example: 

<div class="notranslate">

```
# cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4
# sh cloudlinux_ea3_to_ea4 --convert
```
</div>

The script will install **cl-ea4** repository, and then install all required packages and EA4 profile.

For more detailed information, please refer to [this doc section](/kb/FAQ/#cloudlinux-os-and-easyapache-4).

### Why LVE stats are not collected for some accounts, or they are not visible in LVE Manager?

If you transfer one or more users from another server, please make sure that UID_MIN value in _/etc/login.defs_ file is lower than the UID for the transferred user(s).

For example, if you transfer accounts from an old server to a new one, and on the old server accounts have had UIDs below 1000, on the new server with UID_MIN 1000 the statistics won't be collected for transferred accounts, and those users won't be visible in LVE Manager as well.

### How to resolve “Missing perl module” during the packages update?

**Description:**

The update process failed with the following output (cut):

<div class="notranslate">

```
---> Package python2-hwdata.noarch 0:2.3.5-1.el6 will be obsoleting
--> Running transaction check
---> Package ea-openssl.x86_64 1:1.0.2k-6.el6.cloudlinux will be installed
--> Processing Dependency: perl(WWW::Curl::Easy) for package: 1:ea-openssl-1.0.2k-6.el6.cloudlinux.x86_64
--> Finished Dependency Resolution
Error: Package: 1:ea-openssl-1.0.2k-6.el6.cloudlinux.x86_64 (cl-ea4)
Requires: perl(WWW::Curl::Easy)
You could try using --skip-broken to work around the problem
You could try running: rpm -Va --nofiles --nodigest
```
</div> 

This is caused by exclude line in _/etc/yum.conf_, which contains `perl*`, and it means that all perl packages are excluded from the update.

To update just required package (**ea-openssl** in the above case), **perl** must be removed from the excludes.

The correct way to update the package is: 

<div class="notranslate">

```
# yum update ea-openssl --disableexcludes=main
```
</div>
 
After this, you can run `yum update` to update the rest of the packages.

### What to do if the Slab cache grows and overall server performance is bad?

**The issue description:**

Say, you have a large partition (1Tb or larger), for example _/home_, which is almost full. This means that there are a lot of user’s files on it, and when some software like backup scans all these files, Slab cache starts to grow. Here is an example of _/proc/meminfo_:

<div class="notranslate">

```
# cat /proc/meminfo
MemTotal:       131822716 kB
MemFree:         8396188 kB
MemAvailable:   125324428 kB
Buffers:           18040 kB
Cached:            94444 kB
SwapCached:       741444 kB
Active:           873220 kB
Inactive:         972620 kB
Active(anon):     818524 kB
Inactive(anon):   925616 kB
Active(file):      54696 kB
Inactive(file):    47004 kB
Unevictable:           0 kB
Mlocked:               0 kB
SwapTotal:      31999996 kB
SwapFree:       20412420 kB
Dirty:                 0 kB
Writeback:             0 kB
AnonPages:       1228792 kB
Mapped:            40932 kB
Shmem:              8124 kB
Slab:           120366508 kB
SReclaimable:   117102628 kB
SUnreclaim:      3263880 kB
```
</div> 

**Slab is over 100Gb !**

In this case, the overall server performance could decrease, especially when some heavy IO software is running.

There are a few settings to control the Slab cache size.

First, we recommend to set `vm.vfs_cache_min_ratio` to 0.

::: tip Note 
Setting vm.vfs_cache_min_ratio to 0 on the kernel version prior to 3.10.0-614.10.2.lve1.4.46 will crash it. So, you can safely set vm.vfs_cache_min_ratio to 0 if your server is running the kernel 3.10.0-614.10.2.lve1.4.46 or higher.
:::
 
This parameter controls the minimum amount (in percentage) of dentry\inode cache which can not be reclaimed. The default value is 2, which is rather small, but with a lot of cgroups used in the system, this two percents can be a very big value.

The second parameter is `vm.vfs_cache_pressure`, the default value is 100. Basically, this parameter controls how aggressively the kernel will try to shrink the dentry/inode cache, so setting it to a bigger value could help to reduce the Slab cache size. The value can be set to 500 or even 1000.

### "The SSL certificate failed verification" error while running yum

**Issue symptoms**

Yum is not working producing the following error:

<div class="notranslate">

```
$ yum check-update

The SSL certificate failed verification.
```
</div>

**Cause and resolution**

Please check the following causes: 

1. Server time should be correct, could be checked with

<div class="notranslate">

```
ntpdate -qv pt.pool.ntp.org
```
</div>

2. The server should be able to resolve repo/cln websites properly, if you use custom resolvers - disable them in _/etc/resolv.conf_ and set 8.8.4.4 :

<div class="notranslate">

```
nameserver 8.8.4.4
```
</div>

### Checking personal users disk cache (if lveinfo shows memory usage but no processes there)

If you see no processes under some user, but LVE Manager keeps telling it is using some memory, then most probably the memory is taken by users disk cache. To check personal users disk cache (if lveinfo shows memory usage but not processes there):

<div class="notranslate">

```
$ cat /proc/bc/XXX/meminfo
```

```
...
Cached: 67300 kB
...
```
</div>

where XXX is user ID, could be taken with:

<div class="notranslate">

```
$ id username
```
</div>

### mod_hostinglimits: Already inside LVE. POA/HostingNG

If you are using POA/HostingNG and see the following errors in logs:

<div class="notranslate">

```
[Thu Aug 14 14:11:37 2014] [error] mod_hostinglimits:Already inside LVE: LVE(121842) HANDLER(php-cgi-script) HOSTNAME(domain1.com) URL(/index.php) TID(8354) errno (1) Read more: http://e.cloudlinux.com/MHL-EPERM
[Thu Aug 14 14:11:37 2014] [error] mod_hostinglimits:Already inside LVE: LVE(123272) HANDLER(php-cgi-script) HOSTNAME(domain2.com) URL(/home.php) TID(8052) errno (1) Read more: http://e.cloudlinux.com/MHL-EPERM
```
</div>

The issue is in how Apache works on POA. To fix the issue on CloudLinux OS 6 we have to allow setting up LVE by other (not just LVE admin) users: Starting from kernel **2.6.32-673.8.1.lve1.4.3.1** :

<div class="notranslate">

```
$ echo "options kmodlve lve_user_setup=Y" > /etc/modprobe.d/lve.conf
$ echo "Y" > /sys/module/kmodlve/parameters/lve_user_setup
```
</div>

For kernels earlier than **2.6.32-673.8.1.lve1.4.3.1**:

<div class="notranslate">

```
$ echo "options lve lve_user_setup=Y" > /etc/modprobe.d/lve.conf
$ echo "Y" > /sys/module/lve/parameters/lve_user_setup
```
</div>

Unfortunately, `lve_setup_enter` used for POA (HostingNG) in `mod_hostinglimits` can not work correctly with CloudLinux OS 5, it always return `EPERM`. So it does not work on CL5 kernels (only on CL5 Hybrid and newer kernel branches). Hybrid kernel are described in the following [article](/cloudlinux_os_kernel/#hybrid-kernels)

### I see several security erratas in CLN, how can I resolve them?

CLN will display security erratas for your servers when some of the RPMs are not updated. This is ok for cPanel servers, as cPanel has quite a few packages in _/etc/yum.conf_ **exclude** line. Those packages are replicated by cPanel, or compiled from source by cPanel. You can safely ignore those erratas, as cPanel will make sure that all the software & packages are updated.

### A client is getting 508 Service Temporary Unavailable error on his site

The customer is most likely restricted due to high usage. You can diagnose the problem by running:

<div class="notranslate">

```
lveinfo --period=1d --by-fault=mep --display-username
```
</div>

If a user is limited to max entry processes, you will see how many times his site was limited (served 508) within past day (--period=1d). You can also monitor current usage via:

<div class="notranslate">

```
lvetop
```
</div>

**Solution:**

In most cases, you don't want to do anything, as this customer might overload the system by exhausting all Apache connections or some other resources of the system. Yet, in some cases you might want to increase the limit by doing:

<div class="notranslate">

```
lvectl set USER_ID --maxEntryProcs=NEW_LIMIT --save
```
</div>

Default limit is 20 concurrent connections (max entry processes).

### Fatal resource shortage: privvmpages, UB 185096

The following message appears in _/var/log/messages_:

`Fatal resource shortage: privvmpages, UB 185096`

The message means that some site was limited on memory. To find out which one run:

<div class="notranslate">

```
lveinfo --period=1d --by-fault=mem --display-username
```
</div>

It will show you users that hit memory limit. You can adjust memory limit for those users by running:

<div class="notranslate">

```
lvectl set USER_ID --mem=XXXXm
```
</div>

Default limit is 1024 megabytes

### Error installing r1soft module via r1soft-cki

If you are having issues installing **r1soft-cki**, and getting an error message like this:

`Unable to find a valid source directory. Please install the kernel headers for your operating system`
 
Do:

<div class="notranslate">

```
yum install kernel-devel
```
</div>

If you are running one of the beta kernels, add **--enablerepo=cloudlinux-updates-testing** to the end of the yum command, like:

<div class="notranslate">

```
yum install kernel-devel --enablerepo=cloudlinux-updates-testing
```
</div>

Re-run **r1soft-cki** tool after that.
  
### Why do I see processes using more CPU that I set the limit for?

Quite often you will see a process using 99% of CPU, even though the CPU limit is set to 25%.

This is due to the fact that top shows CPU usage based on a single CPU, while LVE allocates usage across all CPUs on the system.
 
So, on quad core server, 25% of CPU resources is 1 CPU And if top shows 99% usage - it is also just 1 CPU.
 
If you have dual-core server and set the limit at 25%, you will not see a process using more than 50% CPU when you view it via top.
 
And on single core server, the limits will match.
 
::: tip Note
LVE CPU limits are not exact, they can error within about 3% in either direction.
:::

### I have a lot of processes like: [migration/xxxx] running on my system

Migration processes are kernel level threads running on the system, one per LVE.

They don't take up much memory (about 4k each), or CPU resources. Their purpose is to better distribute the load on multi-core servers. Yet, even if you have a system with just one CPU - you will still see at least one such process per each LVE.
 
Those processes can be safely ignored.

### RPM or yum processes hangs

Occasionally, the RPM database on a CloudLinux machine can become corrupted. It can happen when an RPM transaction is interrupted at a critical time. Symptoms of this problem include one of the following programs not responding or freezing:

- up2date
- The CLN alert notification tool (applet in the Gnome or KDE panel)
- rhn_check
- rpm

This problem can also cause a system to stop checking in with CLN. To fix this problem, run the following commands as root:

1. Kill all RPM and yum processes (rhn_check, yum, rpm, rhn-applet):

<div class="notranslate">

```
ps -axwww | grep rpm
```
</div>

In the list of processes, the first number on each line is the PID. For all PIDs listed except for the one associated with grep:

<div class="notranslate">

```
kill -9 <PID>
```
</div>

Repeat the above steps for each of the programs listed.  

2. Remove any RPM lock files (/var/lib/rpm/__db*):

<div class="notranslate">

```
rm -rf /var/lib/rpm/__db*
```
</div>

3. Rebuild the RPM database:

<div class="notranslate">

```
rpm --rebuilddb
```
</div>

If the above steps do not work, please contact technical support for more assistance.

### yum doesn't work, returns Segmentation fault

A common reason for such yum failure is that **libxml2** or **zlib** was installed from source code.

Please, check _/usr/local/lib/_ directory for the files like: `libz*` or `libxml2*`

If you have such files, remove all of them, and run **ldconfig**, yum should start working after that. 

The issue happens mostly on DirectAdmin server, where custom libz/libxml2 files are placed there.

### I have mod_hostinglimits installed, but I don't see anything in lvetop, lve is not working

Try hitting some PHP page on the site on that server, while watching lvetop. LVEs are created on the fly when the first request to PHP/CGI script for a particular site is done. Additionally, lvetop will only show live information. 

You may also try to freeze PHP process to be shown longer by adding sleep function, for example place the following file and try to open it in a browser:

<div class="notranslate">

```
<?php
sleep(30);
phpinfo();
?>
```
</div>

### grub appends garbage characters

If you use "e" to edit currently selected command in the grub menu at boot time, you can face an issue that whatever you type - meaningless characters are added at the end of that command line. This might be due to missing splash file.

Please, edit _/boot/grub/grub.conf_ and comment out line that looks like this (by adding # in front of it)

<div class="notranslate">

```
splashimage=(hd0,0)/grub/splash.xpm.gz
```
</div>

It should look like this instead:

<div class="notranslate">

```
#splashimage=(hd0,0)/grub/splash.xpm.gz
```
</div>

### SNMP is not working properly

If you are having issues with SNMP info being incorrect, try adding the following into _snmpd.conf_ :

<div class="notranslate">

```
view all excluded .1.3.6.1.2.1.6
```
</div>

### ImageMagick is slow

ImageMagick tries to use all available cores. This causes a significant waste of resources due to process switching when running inside LVE with a number of available cores is less than the number of total cores on the server.

To fix the issue, limit the number of threads to the available processors to 1. This can be done by editing config.xml & policy.xml files:

_/usr/local/lib/ImageMagick-[version]/config/policy.xml_

_/usr/local/lib/ImageMagick-[version]/config/config.xml_  

Setting:

<div class="notranslate">

```
<policy domain="resource" name="thread" value="1"/>
```
</div>

### I am running CloudLinux in a Xen VM, and getting "4gb seg fixup"

There is an information that XEN memory management could break TLS in glibc. Try to switch to non-tls i386 glibc. Run the following commands:

<div class="notranslate">

```
yum install yum-utils

yum downloader glibc.i386

rpm -Uvh --force glibc-2.5-65.i386.rpm
```
</div>

Then reboot.

### Why in lveinfo I see zero aCPU value?

aCPU stands for Average CPU. In the shared hosting majority of customers have their sites hit very infrequently, often less than once a minute. Once you average CPU usage for such a customer across 1 day (or an hour or even 10 minutes), the actual CPU usage will often below 1%  

This is why when you run **lveinfo**, you often see aCPU to be 0 or 1. If you see some user using 5-6% of aCPU, this user is using a lot of resources.

You can probably have no more than 10-15 such users on a server (15 users *5%=75% of total CPU resources of the server). So, such users should be either upgraded to VPS or charged correspondingly to their usage.

### lve_zombi kernel threads appear. What are they?

**lve_zombi** kernel threads appear after `lvectl destroy` (or `cagefs --remount`) to clean up after LVE. They can be safely ignored.

### I see in my /var/log/messages lines like: access denied, uid 818, target uid 663!

These messages mean that someone is using symlink owned by user UID 818 trying to access file owned by user UID 663, etc. This is our SecureLinks protection on kernel level at work.

More information on SecureLinks can be found [here](/cloudlinux_os_kernel/#securelinks)

### Plesk backup: Apache keeps restarting while backup

**Symptoms:**
 
Customer creates a backup, but it does not contain the site's content upon completion.

`Failed to pack files server_backup_... Warning: hosting "test.com" /bin/tar: /tmp/fileBCmvZe: No such file or directory /bin/tar: Error is not recoverable: exiting now`
 
**Cause:**

[http://kb.parallels.com/en/114752](http://kb.parallels.com/en/114752) Backups and chrooted shell access for FTP users may work improperly on CloudLinux OS if **cagefs** package is installed and enabled for all users. When Plesk backup uses 'su', **cagefs** makes "chroots" (without actually using chroot() system call) into _/usr/share/cagefs-skeleton_ and because of that "chrooting", files in _/tmp_ are inaccessible and the error occurs. Such modification to 'su' is done by adding **pam_lve** to _/etc/pam.d/su_.
 
**Resolution:**

Remove **pam_lve** from _/etc/pam.d/su_.
 
::: tip Note 
Disabling pam_lve in /etc/pam.d/su will not affect cron jobs/etc., it will only affect su commands. Basically, it has no negative security implications at all.
:::

### MySQL/MariaDB crashes and restarts often on cPanel server

LFD kills MySQL every hour because the binary from CloudLinux is not installed in the same path as the cPanel MySQL. However, LFD won't kill anything unless the option PT_USERKILL is enabled, which is strongly recommended not to be enabled in the configuration file:

::: danger Warning
We don't recommend enabling this option unless absolutely necessary, as it can cause unexpected problems when processes are suddenly terminated. It can also lead to system processes being terminated, which could cause stability issues. It is much better to leave this option disabled and to investigate each case as it is reported when the triggers above are breached.
:::

If you still need PT_USERKILL enabled, please add the following lines in _/etc/csf/csf.pignore_:

<div class="notranslate">

```
exe:/usr/libexec/mysqld
exe:/usr/libexec/mysqld_safe
```
</div>

And then restart LFD.
  
### PHP Selector to work with Percona

Recently Percona has renamed its **libmysqlclient** into _/usr/lib64/libperconaserverclient_, so our **alt-php** packages will not find it. To fix the issue you should symlink percona libraries to **libmysql** the following way:

<div class="notranslate">

```
cd /usr/lib64/

ln -s libperconaserverclient.so libmysqlclient.so

ln -s libperconaserverclient.so.18 libmysqlclient.so.18

ln -s libperconaserverclient_r.so libmysqlclient_r.so

ln -s libperconaserverclient_r.so.18 libmysqlclient_r.so.18
```
</div>

### "Error while reading lve_version from database" in lveinfo

Information regarding the "LVE-Stats 2" database reset can be found [here](/command-line_tools/#lve-stats-2)

The mentioned error doesn't appear to be encountered in LVE-Stats 2.

If you are interested in storing the LVE stats in MySQL database, please refer to the following [article](/cloudlinux_os_components/#lve-stats2-and-db-servers-compatible-work-setup)

### I have installed CloudLinux OS on my server but i can not see LVE Manager in cPanel

Make sure that your system is running CloudLinux OS kernel:

<div class="notranslate">

```
# uname -a -- should give *lve* in kernel name.
```

```
# /usr/sbin/rhn_check -- should give NO output if the registration was successful.
```
</div>

If you getting an error from **rhn_check**, try to indicate an RHN mirror:

<div class="notranslate">

```
# /usr/sbin/rhnreg_ks --activationkey activationkey --serverUrl https://de-proxy.cl-mirror.net/XMLRPC/ --force
```
</div>

Mirrors list:

<div class="notranslate">

```
de-proxy.cl-mirror.net

vn-proxycl-mirror.net

syd-proxy.cl-mirror.net

slc-proxy.cl-mirror.net

chile-proxy.cl-mirror.net

ams-proxy.cl-mirror.net
```
</div>

### "GLib-WARNING **: GError set over the top of a previous GError" on yum

**Issue:** 

'yum' does not work properly and reports an error on every single run. Full error message:

<div class="notranslate">

```
# yum update


(process:364942): GLib-WARNING **: GError set over the top of a previous GError or uninitialized memory.
This indicates a bug in someone's code. You must ensure an error is NULL before it's set.
The overwriting error message was: Parsing primary.xml error: Premature end of data in tag format line 93382


(process:364942): GLib-WARNING **: GError set over the top of a previous GError or uninitialized memory.
This indicates a bug in someone's code. You must ensure an error is NULL before it's set.
The overwriting error message was: Parsing primary.xml error: Premature end of data in tag package line 93377


(process:364942): GLib-WARNING **: GError set over the top of a previous GError or uninitialized memory.
This indicates a bug in someone's code. You must ensure an error is NULL before it's set.
The overwriting error message was: Parsing primary.xml error: Premature end of data in tag metadata line 2

Traceback (most recent call last):
File "/usr/bin/yum", line 29, in <module>
yummain.user_main(sys.argv[1:], exit_code=True)
File "/usr/share/yum-cli/yummain.py", line 276, in user_main
errcode = main(args)
File "/usr/share/yum-cli/yummain.py", line 129, in main
result, resultmsgs = base.doCommands()
File "/usr/share/yum-cli/cli.py", line 434, in doCommands
self._getTs(needTsRemove)
File "/usr/lib/python2.6/site-packages/yum/depsolve.py", line 99, in _getTs
self._getTsInfo(remove_only)
File "/usr/lib/python2.6/site-packages/yum/depsolve.py", line 110, in _getTsInfo
pkgSack = self.pkgSack
File "/usr/lib/python2.6/site-packages/yum/__init__.py", line 883, in <lambda>
pkgSack = property(fget=lambda self: self._getSacks(),
File "/usr/lib/python2.6/site-packages/yum/__init__.py", line 668, in _getSacks
self.repos.populateSack(which=repos)
File "/usr/lib/python2.6/site-packages/yum/repos.py", line 294, in populateSack
sack.populate(repo, mdtype, callback, cacheonly)
File "/usr/lib/python2.6/site-packages/yum/yumRepo.py", line 186, in populate
dobj = repo_cache_function(xml, csum)
File "/usr/lib64/python2.6/site-packages/sqlitecachec.py", line 46, in getPrimary
self.repoid))
TypeError: Parsing primary.xml error: Premature end of data in tag file line 93382
```
</div>

**Reason:**
 
You have an outdated **alt-libxml2** package which actually has broken system **libxml2** library functionality.  

**Solution:** 

Update **alt-libxml2** after removing broken **ldconfig** path:

<div class="notranslate">

```
rm -f /etc/ld.so.conf.d/alt-libxml2.conf

ldconfig

yum update alt-libxml2
```
</div>

### Installing MySQL-Python on a cPanel server

The following common problem often pops up during installation of MySQL-Python on cPanel server:

<div class="notranslate">

```
# yum install MySQL-python --disableexcludes=all

--> Running transaction check
--> Package MySQL-python.x86_64 0:1.2.3-0.3.c1.1.el6 will be installed
--> Processing Dependency: libmysqlclient_r.so.16(libmysqlclient_16)(64bit) for package: MySQL-python-1.2.3-0.3.c1.1.el6.x86_64
--> Processing Dependency: libmysqlclient_r.so.16()(64bit) for package: MySQL-python-1.2.3-0.3.c1.1.el6.x86_64
--> Running transaction check
--> Package mysql-libs.x86_64 0:5.1.69-1.el6_4 will be installed
--> Finished Dependency Resolution
Dependencies Resolved ================================================================== Package Arch Version Repository Size ==================================================================Installing: MySQL-python x86_64 1.2.3-0.3.c1.1.el6 cloudlinux-x86_64-server-6 85 k Installing for dependencies: mysql-libs x86_64 5.1.69-1.el6_4 cloudlinux-x86_64-server-6 1.2 M Transaction Check Error: file /usr/share/mysql/charsets/README from install of mysql-libs-5.1.69-1.el6_4.x86_64 conflicts with file from package MySQL55-server-5.5.32-1.cp1136.x86_64 file /usr/share/mysql/charsets/Index.xml from install of mysql-libs-5.1.69-1.el6_4.x86_64 conflicts with file from package MySQL55-server-5.5.32-1.cp1136.x86_64 file /usr/share/mysql/charsets/armscii8.xml from install of mysql-libs-5.1.69-1.el6_4.x86_64 conflicts with file from package MySQL55-server-5.5.32-1.cp1136.x86_64 file /usr/share/mysql/charsets/ascii.xml from install of mysql-libs-5.1.69-1.el6_4.x86_64 conflicts with file from package MySQL55-server-5.5.32-1.cp1136.x86_64 file /usr/share/mysql/charsets/cp1250.xml from install of mysql-libs-5.1.69-1.el6_4.x86_64 conflicts with file from package MySQL55-server-5.5.32-1.cp1136.x86_64 Error Summary
```
</div>

The issue is with MySQL package. **Yum** is trying to satisfy requirements by installing **mysql-libX**, and that RPM conflicts with files from package **MySQL55-server**. To fix the issue, you should install **libmysqlclient_r.so.16** on your server. That can be done by installing **mysqlclient16** RPM from our _testing_ repository:

<div class="notranslate">

```
yum --enablerepo=cloudlinux-updates-testing install mysqlclient16 --disableexcludes=all
```
</div>

After that MySQL-Python will be installed without any issues.

### Segmentation Fault in different places (yum, clnreg_ks, cldeploy)

When you see different and random tools segfaulting, such as **yum**, **clnreg_rs**, **cldeploy**, it could be caused by bad/broken `libz*` and `libxml2`.

It usually happens on DirectAdmin server, when libraries are placed into _/usr/local/lib/_ directory.

To fix:

<div class="notranslate">

```
mkdir /usr/local/lib_back
mv /usr/local/lib/libz* /usr/local/lib_back
mv /usr/local/lib/libxml2.* /usr/local/lib_back
```
</div>

### Why some packages are absent in public repos at http://repo.cloudlinux.com/cloudlinux/?

Our public repositories at [http://repo.cloudlinux.com/cloudlinux/](http://repo.cloudlinux.com/cloudlinux/) do not have a lot of packages listed.

The reason is simple - they show only migration repositories (those packages which could be needed on migration/conversion stage) and do not provide all packages list.

To get all packages with the latest versions you should have an active subscription and use regular yum to install/update.

### CloudLinux OS error: specified activation token can not be found on the server

**Symptoms**

During the server registration or converting CentOS to CloudLinux OS, getting the following error:

<div class="notranslate">

```
Could not find token TPA.XXXXXXXX.YYYY
Error Class Code: 60
Error Class Info:
The activation token specified could not be found on the server.
Please retry with a valid key.
Unable to register at CLN server, please contact CloudLinux support at https://helpdesk.cloudlinux.com
```
</div>

**Cause**

Plesk license number is used in _TPA.XXXXXXXX.YYYY_ format, instead of CloudLinux OS product key.

**Resolution**

CloudLinux OS product key has the following format: _XXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_ Contact [Plesk Licensing and Purchase Support](https://cscontact.plesk.com/) to get the CloudLinux OS product key associated with your TPA license. Related Plesk article: [https://kb.plesk.com/en/126999](https://kb.plesk.com/en/126999)

### Error 503 on PHP websites when LiteSpeed is used

**Issue symptoms**

Sometimes PHP websites return Error 503 page when LiteSpeed is used; however, users are not reaching LVE EP limits.

**Cause**

The issue may be caused by CSF/LFD killing PHP processes. If you have it installed, then check the log:

<div class="notranslate">

```
grep -i kill /var/log/lfd.log
```
</div>

**Resolution**

To resolve the issue for good, the _/etc/csf/csf.pignore_ file should be modified - add the processes to be ignored:

<div class="notranslate">

```
echo "exe:/usr/local/lsws/bin/lshttpd.5.1.13" >> /etc/csf/csf.pignore
echo "exe:/usr/local/bin/lsphp" >> /etc/csf/csf.pignore
```
</div>

And restart LFD service:

<div class="notranslate">

```
service lfd restart
```
</div>

More information in official CSF documentation, Chapter 8 of [https://download.configserver.com/csf/readme.txt](https://download.configserver.com/csf/readme.txt)

### Registering server issue: unable to get hardware information

**Issue symptoms**

Can not register the server with **clnreg_ks**, **rhnreg_ks** or during `yum update`. The error shown is similar to:

<div class="notranslate">

```
Profilename: server.hostname.com
An error has occurred:
Error communicating with server. The message was:
Internal Server Error
See /var/log/up2date for more information
```
</div>

**Cause**

The issue may be caused by collecting hardware information. The following might be found in _/var/log/up2date_:

<div class="notranslate">

```
Traceback (most recent call last):
  File "/usr/sbin/clnreg_ks", line 221, in <module>
    cli.run()
  File "/usr/share/rhn/up2date_client/rhncli.py", line 96, in run
    sys.exit(self.main() or 0)
  File "/usr/sbin/clnreg_ks", line 150, in main
    rhnreg.sendHardware(systemId, hardwareList)
  File "/usr/share/rhn/up2date_client/rhnreg.py", line 475, in sendHardware
    s.registration.add_hw_profile(systemId, _encode_characters(hardwareList))
```
</div>

**Resolution**

Skip checking for hardware in **clnreg_ks** or **rhnreg_ks** with `--nohardware` key.

Example:

<div class="notranslate">

```
clnreg_ks --nohardware
```
</div>

### Improper PHP execution from cronjob

**Issue symptoms**

Some PHP scripts executed with cronjobs are not working properly, are interrupted, or just hang. Known affected website engines: Magento, CakePHP.

**Cause**

The issue is caused by PHP CGI binary is being called instead of PHP CLI version. It happens due to _PATH_ environment variable does not contain _/usr/local/bin/_.

**Resolution**

There are several ways to resolve the issue depending on which panel is used or if you edit cronjob via command line. Call PHP CLI binary manually:

<div class="notranslate">

```
* * * * * /usr/local/bin/php /home/user/cronjob.php
```
</div>

Add _/usr/local/bin/_ to users **crontab** as:

<div class="notranslate">

```
PATH="/usr/local/bin/:/usr/bin:/bin"
* * * * * php /home/user/cronjob.php
```
</div>

Force export path variable right before executing PHP script:

<div class="notranslate">

```
* * * * * export PATH=$PATH:/usr/local/bin; php /home/user/cronjob.php
```
</div>

::: tip Note
Engines like CakePHP use app/Console/cake wrapper to define which PHP to call. You may need to modify the file, and point to /usr/local/bin/php manually.
:::

::: tip Note
On DirectAdmin panel to force specified path to be used for user cron jobs you have to create /usr/local/directadmin/data/templates/custom/cron_template.txt with the following content:

<div class="notranslate">

```
PATH=/usr/local/bin:/usr/local/sbin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
SHELL=/bin/sh
MAILTO=|EMAIL|
|CRONS|
```
</div>

:::

More: [https://www.directadmin.com/features.php?id=621](https://www.directadmin.com/features.php?id=621)
