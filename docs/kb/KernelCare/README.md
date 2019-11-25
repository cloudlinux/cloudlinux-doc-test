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
