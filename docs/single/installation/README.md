# Installation

* [Hardware compatibility](/cloudlinux_installation/#hardware-compatibility)
* [Converting existing servers](/cloudlinux_installation/#converting-existing-servers)
* [Activation](/cloudlinux_installation/#activation)
* [Installing new servers](/cloudlinux_installation/#installing-new-servers)
* [CloudLinux OS images](/cloudlinux_installation/#cloudlinux-os-images)
* [Net install](/cloudlinux_installation/#net-install)
* [Provider-specific guidelines](/cloudlinux_installation/#provider-specific-guidelines)
* [Uninstalling](/cloudlinux_installation/#uninstalling)

### Hardware compatibility

CloudLinux supports all the hardware supported by RHEL/CentOS, with few exceptions. Exceptions are usually hardware that require binary drivers, and that doesn't have any open source alternatives.

:::tip Note
CloudLinux OS does not support ARM-based CPUs (e.g. Graviton)
:::


With RHEL 8 (**CloudLinux 8**), some devices are no longer supported. You can check the entire list here:
[https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/considerations_in_adopting_rhel_8/hardware-enablement_considerations-in-adopting-rhel-8#removed-hardware-support_hardware-enablement](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/considerations_in_adopting_rhel_8/hardware-enablement_considerations-in-adopting-rhel-8#removed-hardware-support_hardware-enablement)


## Converting existing servers

It is easy to convert your existing CentOS or AlmaLinux server to CloudLinux. The process takes a few minutes and replaces just a handful of RPMs.

* [CLDeploy Explained](/cloudlinux_installation/#cldeploy-explained).

* Get <span class="notranslate">`<activation_key>`</span> either by getting [trial subscription](/cloudlinux_installation/#getting-trial-license) or by [purchasing subscription](https://cln.cloudlinux.com/clweb/buy.html).
* Download the conversion script: <span class="notranslate">[cldeploy](https://repo.cloudlinux.com/cloudlinux/sources/cln/cldeploy)</span>.
* If you have an activation key, run the following commands:
  
<div class="notranslate">

```
$ wget https://repo.cloudlinux.com/cloudlinux/sources/cln/cldeploy
$ sh cldeploy -k <activation_key>
```
</div>

* If you have an IP-based license, run the following commands:
  
<div class="notranslate">

```
$ sh cldeploy -i
```
</div>

* Reboot by running the following command:
  
<div class="notranslate">

```
$ reboot
```
</div>

The script automatically detects and supports the following control panels:
* cPanel with EA4 ([EA3 is not supported](https://blog.cpanel.com/its-been-a-long-road-but-it-will-be-time-to-say-goodbye-soon/))
* Plesk
* DirectAdmin
* InterWorx <sup>*</sup>


:::warning
CloudLinux 8 supports cPanel 11.94 and newer, Plesk Obsidian 18.0.33.0 and newer and DirectAdmin out of the box.
:::

#### CLDeploy Explained

By its design, CloudLinux OS is very close to the upstream operating system, CentOS. This makes the conversion process relatively straightforward, requiring just one reboot. Here's what the cldeploy script does when you run it:

* Backups the original repository settings into <span class="notranslate">`/etc/cl-convert-saved`</span>.
* Backups RHEL system ID into <span class="notranslate">`/etc/cl-convert-saved`</span> (RHEL systems only).
* Installs CL repository settings & imports CL RPM key.
* Replaces redhat/centos-release, redhat-release-notes, redhat-logos with CL version.
* Removes cpuspeed RPM (as it conflicts with CPU limits).
* Re-installs CL version of rhnlib/rhnplugin.
* Checks for binary kernel modules, finds replacement if needed.
* Detects OVH servers and fixes mkinitrd issues.
* Detects Linode servers and fixes grub issues.
* Checks if LES is installed.
* Checks that <span class="notranslate">`/etc/fstab`</span> has correct <span class="notranslate">`/dev/root`</span>
* Checks for efi.
* Installs CloudLinux Manager for cPanel, Plesk, DirectAdmin, and ISPManager<sup>*</sup>

#### CLDeploy Explained - reverting back to CentOS:

Here's what the cldeploy script does, if one runs it to revert the system back to CentOS:

* Restores CentOS repositories, and centos-release/release-notes/logos.

Note that **cldeploy doesn't remove the kernel** to prevent condition when server has no kernels and wouldn't boot. Instead, we provie the instructions on how you could remove it manually later, when it is safe to do so.

On cPanel servers, rebuild of Apache with EasyApache will complete the conversion back, but doesn't have to be performed immediately.<sup> *</sup>

On DirectAdmin servers, rebuild of Apache with custombuild will complete the conversion back, but doesn't have to be performed immediately.

## Activation

### Getting trial license

You will need a trial activation key to be able to convert your CentOS server to CloudLinux OS Single. The trial license subscription will work for 30 days.

To get the activation key:

1. Register with CloudLinux Network: [https://cln.cloudlinux.com/console/register/customer](https://cln.cloudlinux.com/console/register/customer) (skip it if you already registered)
2. You will receive an email with activation link
3. Login at [https://cln.cloudlinux.com/console/auth/login](https://cln.cloudlinux.com/console/auth/login)
4. Click on `Get Trial Activation Key`

You will get a key that looks like: `12314-d34463a182fede4f4d7e140f1841bcf2`

Use it to register your system or to [convert CentOS server to CloudLinux]() server.

### License activation

To register your server with CloudLinux Network using activation key run:

<div class="notranslate">

```
$ yum install rhn-setup --enablerepo=cloudlinux-base
$ /usr/sbin/rhnreg_ks --activationkey=<activation key>
```
</div>

Where activation key is like `1231-2b48feedf5b5a0e0609ae028d9275c93`

If you have IP based license, use <span class="notranslate">`clnreg_ks`</span> command:

<div class="notranslate">

```
$ yum install rhn-setup --enablerepo=cloudlinux-base
$ /usr/sbin/clnreg_ks --force
```
</div>


## Installing new servers

You can download the latest CloudLinux ISO and use it to install CloudLinux on your server:

* **Latest stable CloudLinux 8 ISO**:

* [https://www.repo.cloudlinux.com/cloudlinux/8/iso/x86_64/](https://www.repo.cloudlinux.com/cloudlinux/8/iso/x86_64/) - network/DVD installation ISOs

:::tip Note
Once you install server from the ISO, make sure you [register your system](/cloudlinux_installation/#license-activation) and then run `yum update`.
:::

:::warning Note
We recommend to reinstall the `cl-manager` package after installing a control panel.
:::

Mount and boot the image, then follow the steps.

1. Configure a network connection as shown below.
    * the network name depends on your operating system
    * you can specify your hostname

   ![](/images/network_settings.png)

2. Configure installation sources:
   * select the <span class="notranslate">_On the network_</span> installation source and enter the following repository URL: <span
   class="notranslate">`https://repo.cloudlinux.com/cloudlinux/8/BaseOS/x86_64/os`</span> for CloudLinux 8.
   * also, in case you'd like to get the latest packages from the **Update** repository, add the additional **Update** repository URL: 
   <span class="notranslate">`https://repo.cloudlinux.com/cloudlinux/8/AppStream/x86_64/os/`</span> for CloudLinux 8.   

   ![](/images/repository_settings.png)

3. Select software: select the <span class="notranslate">_Minimal install_</span> environment.

   ![](/images/software_selection.png)

## Net install

To install CloudLinux over network:

1. Download & boot using the netboot image from: 

**For CloudLinux 8**: [https://repo.cloudlinux.com/cloudlinux/8/iso/x86_64/CloudLinux-8.3-x86_64-boot.iso](https://repo.cloudlinux.com/cloudlinux/8/iso/x86_64/CloudLinux-8.3-x86_64-boot.iso).

Alternatively, you can configure your PXE server using following folder as reference: [https://repo.cloudlinux.com/cloudlinux/8/install/x86_64/os/images/pxeboot/](https://repo.cloudlinux.com/cloudlinux/8/install/x86_64/os/images/pxeboot/)

2. During the CloudLinux installation, select URL as installation source and enter URL: 

**For CloudLinux 8**: [https://repo.cloudlinux.com/cloudlinux/8/install/x86_64/os/](https://repo.cloudlinux.com/cloudlinux/8/install/x86_64/os/) and continue with installation. 

Same URLs can be used to install para-virtualized Xen using either command-line or virt manager.


## Provider-specific guidelines

### AWS

CloudLinux OS image list can be found [here](https://download.cloudlinux.com/cloudlinux/images/#aws-tab)

If you are going to use Cloudlinux OS with cPanel image, you may find useful the following [article](https://cloudlinux.zendesk.com/hc/en-us/articles/360014130320-How-to-get-CloudLinux-OS-with-cPanel-AMI-working-on-AWS)

### DigitalOcean

* [Adding CloudLinux OS image to DigitalOcean](/cloudlinux_installation/#adding-cloudlinux-os-image-to-digitalocean)

How to make CloudLinux work on DigitalOcean:

DigitalOcean doesn't support custom kernels. The droplet (VM) always runs DigitalOcean's kernel. CloudLinux requires its own kernel. To enable CloudLinux work on DigitalOcean droplets, we provide ability to boot into CloudLinux kernel using `kexec` functionality.

How does this work:

* <span class="notranslate"> cldeploy </span> script checks for presence of <span class="notranslate">`/etc/digitalocean`</span>. If the file detected, we assume that this is DigitalOcean droplet;
* <span class="notranslate">`kexec-tools`</span> are installed;
* <span class="notranslate">`kexec`</span> script will be created in <span class="notranslate">`/etc/rc.d/init.d/`</span> and set to run right after <span class="notranslate">`rc.sysinit`</span>.

When executed, script <span class="notranslate">`/etc/rc.d/init.d/kexec`</span> detects the latest installed CloudLinux kernel, and loads that kernel.

If the system cannot boot into CloudLinux kernel (due to any reason), subsequent reboot will skip <span class="notranslate">`kexec`</span>, allow droplet to boot into DigitalOceans' kernel.

To disable booting into Cloudlinux kernel, run:

<div class="notranslate">

```
chkconfig --del kexec
```
</div>

To re-enable booting into CloudLinux kernel, run:
<div class="notranslate">

```
chkconfig --add kexec
```
</div>

#### Adding CloudLinux OS image to DigitalOcean

Custom images are Linux distributions that have been modified to fit the specific needs of DigitalOcean users. You can find some basics of importing a custom CloudLinux OS image below.

Importing custom images to DigitalOcean is free, as you are only charged for the storage of your image. To save money, you can easily import your image, start a Droplet from your image, and delete the image, so you don’t incur any storage costs.

Below, we will describe how to add a qcow2 (QEMU/KVM) CloudLinux OS image as a custom image. You can find more information on image options at [https://www.digitalocean.com/docs/images/custom-images/overview/](https://www.digitalocean.com/docs/images/custom-images/overview/)

1. To choose the right image, navigate to [https://download.cloudlinux.com/cloudlinux/images/#kvm-tab](https://download.cloudlinux.com/cloudlinux/images/#kvm-tab). Several different images are available for download (with and without a control panel).

![](/images/cloudlinuximages.png)

2. Copy the link for the image you are going to use and log into [cloud.digitalocean.com](https://blog.digitalocean.com/custom-images/cloud.digitalocean.com).

Click <span class="notranslate">_Images_</span> on the left of the screen and then choose <span class="notranslate">_Custom Images_</span>. Click the <span class="notranslate">_Import via URL_</span> button and paste the CloudLinux OS image link.

![](/images/customimages.png)

There are several options here, but the most important is <span class="notranslate">_Choose a datacenter region_</span>, i.e. which datacenter region your Droplets should be created in for this image.

![](/images/uploadimage.png)

Click the <span class="notranslate">_Upload Image_</span> button and wait until the image is successfully uploaded.

3. Add your public key to access your droplets using key-based authentication: navigate to the <span class="notranslate">_Security_</span> sidebar menu and click the <span class="notranslate">_Add SSH Key_</span> button.

You can find more information about creating/adding SSH keys in [this article](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/).

![](/images/addsshkey.png)

4. You will then be able to start a CloudLinux OS Droplet using the image.
   
   :::tip Note
   Your Droplet will be created in the same datacenter that your custom image resides in.
   :::

![](/images/startdroplet.png)

5. Now, use your preferred SSH client software to connect to your Droplet. You can find more information on SSH client setup [here](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/).

![](/images/sshclient.png)

## Uninstalling

You can always uninstall CloudLinux OS. In this case, the system will be converted back to CentOS (even if the original system was RHEL)

The following actions will be taken:

1. CloudLinux repositories & <span class="notranslate">yum</span> plugin will be removed.
2. CentOS repositories will be set up.

In the end, the script will provide instructions on how to finish the conversion back to CentOS. 

:::warning
Do not forget to free up a CloudLinux OS license by removing the server from the [Servers section of your CLN account](https://docs.cln.cloudlinux.com/dashboard/#servers). After that, if you don't intend to use the license anymore, you can [remove it](https://docs.cln.cloudlinux.com/dashboard/#cloudlinux-os-activation-keys) to avoid being billed for it. 
:::

To uninstall CloudLinux OS, run:

<div class="notranslate">

```
$ wget -O cldeploy https://repo.cloudlinux.com/cloudlinux/sources/cln/cldeploy
$ sh cldeploy -c
```
</div>

Now you have your system converted back to CentOS.


