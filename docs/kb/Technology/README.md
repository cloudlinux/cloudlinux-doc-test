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