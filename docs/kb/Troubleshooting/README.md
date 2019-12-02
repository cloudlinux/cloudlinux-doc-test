# Troubleshooting

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

### 