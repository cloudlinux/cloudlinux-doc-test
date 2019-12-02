# KernelCare

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

## Why uname is showing the old kernel version after KernelCare patches applied?

The **uname** command always shows the same kernel version as before installing KernelCare. The reason we don't change the output of the uname command is due to the fact that we don't change original kernel signature or ABI with KernelCare. Yet, many install scripts depend on uname output to decide which modules to install or which header files to use for compilation.

As such, changing the output of uname will create a lot of issues.

You can get 'effective' kernel uname info by running:

```
kcare-uname
```

## What IPs to whitelist for the proper KernelCare work?

Generally, KernelCare requires http(s) connection to two servers for the proper work:

`cln.cloudlinux.com`

`patches.kernelcare.com`  

As of November 2019, their IPs are:

69.175.3.9

69.175.106.203

## cPanel/WHM is asking for a reboot while KernelCare is used

**Problem:**  
WHM/cPanel is asking for a reboot to apply the kernel updates.

**Synopsis:**  
If you're using KernelCare, you don't need reboot the server after a kernel update because all security patches from the latest kernel are applied to a running kernel. But WHM/cPanel compares running kernel with boot kernel (the one selected as default in GRUB) as strings, so they have to match exactly, otherwise "reboot required" banner is shown. There are two known cases when this produce false-positives:

1. KernelCare applied patch that changed effective kernel version but new kernel package has not yet been installed by yum. In this case running kernel is newer than boot kernel, but since versions don't match as strings, WHM/cPanel shows the banner.
2. For some reason, a specific kernel version is chosen as default in GRUB and this is not the latest version. This can be fixed by running `grub2-set-default 0` command.

WHM/cPanel developers are aware of this and working on the fix, but currently, there is no ETA.

**Diagnostics:**

If you want to make sure you are safe, please run the following commands:

<div class="notranslate">

```
# kcarectl --update
# kcarectl --uname
```
</div>

If no errors were reported, you should be running the latest available kernel. Last command prints effective kernel version.

There is another command to check what WHM/cPanel thinks about kernels:

<div class="notranslate">

```
# /usr/local/cpanel/3rdparty/bin/perl -e 'use Cpanel::Kernel::Status; use Data::Dumper; my $kernel = Cpanel::Kernel::Status::kernel_status(); print Dumper \$kernel;'
```
</div>

Sample output:

<div class="notranslate">

```
$VAR1 = \{
  'unpatched_version' => '3.10.0-714.10.2.lve1.4.63.el7.x86_64',
  'running_version' => '3.10.0-714.10.2.lve1.4.65.el7',
  'reboot_required' => 1,
  'running_latest' => '',
  'boot_version' => '3.10.0-714.10.2.lve1.4.63.el7.x86_64',
  'has_kernelcare' => 1
};
```
</div>

Here you can see that **boot_version** is older than **running_version**, yet **reboot_reqired** is set to **1**, which means a banner will be shown. In fact, reboot is NOT required in this particular case.
