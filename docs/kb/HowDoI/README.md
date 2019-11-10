# How Do I

## What are the recommended resource limit values?

The recommended values don't depend on the power of your server. They only depend on how "fast" you want your hosting accounts to be.

_Typical Hosting Account_:

<div class="notranslate">

```
SPEED=100%
PMEM=512MB
VMEM=0
IO=1024KB/s
IOPS=1024
NPROC=100
EP=20
```
</div>

_High End Hosting Account_:

<div class="notranslate">

```
SPEED=200%  
PMEM=1GB  
VMEM=0  
IO=4096KB/s  
IOPS=1024  
NPROC=100  
EP=40
```
</div>

More information about LVE limits can be found at:
[https://docs.cloudlinux.com/limits/](https://docs.cloudlinux.com/limits/)

## How can I remove Alt-PHP binaries from Multi-PHP Manager in EA4?

You can remove Alt-PHP binaries from cPanel MultiPHP Manager.

To do so set 'yes' or 'no' for the Alt-PHP versions in config file _/opt/alt/alt-php-config/alt-php.cfg_ and run **/opt/alt/alt-php-config/multiphp_reconfigure.py**.

This script manages SCL prefixes for the Alt-PHP - removes or creates prefixes in _/etc/scl/prefixes_.

<div class="notranslate">

/opt/alt/alt-php-config/alt-php.cfg:

```
[MultiPHP Manager]
alt-php44 = no
alt-php51 = no
alt-php52 = no
alt-php53 = no
alt-php54 = no
alt-php55 = yes
alt-php56 = yes
alt-php70 = yes
alt-php71 = yes
alt-php72 = yes
```
</div>

## Adding CloudLinux OS image to DigitalOcean

Custom images are Linux distributions that have been modified to fit the specific needs of DigitalOcean users. In this guide, we will discuss some basics of importing a custom CloudLinux OS image.

Importing custom images to DigitalOcean is free, as you are only charged for the storage of your image. To save money, you can easily import your image, start a Droplet from your image, and delete the image, so you don’t incur any storage costs.

In this article we will describe how to add a qcow2 (QEMU/KVM) CloudLinux OS image as a custom image. You can find more information on image options at [https://www.digitalocean.com/docs/images/custom-images/overview/](https://www.digitalocean.com/docs/images/custom-images/overview/)

1. To choose the right image, navigate to [https://download.cloudlinux.com/cloudlinux/images/#kvm-tab](https://download.cloudlinux.com/cloudlinux/images/#kvm-tab)  
Several different images are available for download (with and without a control panel).
![KVM images](/images/unnamed-2.png)  
2. Copy the link for the image you are going to use and log into [cloud.digitalocean.com](https://blog.digitalocean.com/custom-images/cloud.digitalocean.com). Click on ‘Images’ on the left of the screen and then choose “Custom Images”. Click the “Import via URL” button and paste the CloudLinux OS image link.
![Custom images](/images/unnamed-3.png)  
There are several options here, but the most important is ‘Choose a datacenter region’, i.e. which datacenter region your Droplets should be created in for this image.  
![Upload](/images/unnamed-4.png)  
![Tags](/images/unnamed-5.png)  
Click the “Upload Image” button and wait until the image is successfully uploaded.

3. Add your public key to access your droplets using key-based authentication: navigate to the ‘Security’ sidebar menu and click the ‘Add SSH Key’ button. You can find more information about creating/adding SSH keys in [this article](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/).  
![New SSH Key](/images/unnamed-6.png)  
4. You will then be able to start a CloudLinux OS Droplet using the image. Note, your Droplet will be created in the same datacenter that your custom image resides in.  
![Start a droplet](/images/unnamed-7.png)
5. Now, use your preferred SSH client software to connect to your Droplet. You can find more information on SSH client setup [here](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/).  
![SSH Client](/images/unnamed-8.png)

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

## How can I switch CloudLinux usage statistics off?

Starting with lve-utils 3.0-21.12 Beta, it is possible to permanently disable statistics gathering by adding `cl_statistics_enabled=0` parameter to _/etc/sysconfig/cloudlinux_.

## PEAR installation

If you wish to install Pear for cPanel PHP (native PHP version) for some user, then you can use the standard way provided by WHM/cPanel, but if the alt-PHP (PHP Selector) is used, then you (as root or as an user) need to install necessary Pear modules by using pear for current user php like this:

<div class="notranslate">

```
# /opt/alt/phpXX/usr/bin/pear install moduleName
```
</div>

where **XX** is PHP version (for example 71 for PHP 7.1).
In this case `include_path` will contain the value _"/opt/alt/php71/usr/share/pear"_

Alternatively, you can set it manually in _/opt/alt/php71/etc/php.ini_ directly (for PHP 7.1 as an example):

<div class="notranslate">

```
include_path = ".:/usr/share/pear:/opt/alt/php71/usr/share/php:/opt/alt/php71/usr/share/pear"
```
</div>

## NewRelic configuration and troubleshooting steps

In case you want to configure NewRelic extension but get the errors like these

<div class="notranslate">

```
[Wed Mar 15 14:56:43.240939 2017] [cgi:error] [pid 566485] [client 5.44.233.42:44548] AH01215: PHP Warning: PHP Startup: Unable to load dynamic library '/opt/alt/php70/usr/lib64/php/modules/newrelic-20160303.so' - /opt/alt/php70/usr/lib64/php/modules/newrelic-20160303.so: cannot open shared object file: No such file or directory in Unknown on line 0: /usr/local/cpanel/cgi-sys/ea-php56
[Wed Mar 15 14:56:43.510520 2017] [cgi:error] [pid 566609] [client 52.21.231.226:59007] AH01215: PHP Warning: PHP Startup: Unable to load dynamic library '/opt/alt/php70/usr/lib64/php/modules/newrelic-20160303.so' - /opt/alt/php70/usr/lib64/php/modules/newrelic-20160303.so: cannot open shared object file: No such file or directory in Unknown on line 0: /usr/local/cpanel/cgi-sys/ea-php56
[Wed Mar 15 14:56:44.771648 2017] [cgi:error] [pid 566368] [client 45.33.61.252:64742] AH01215: PHP Warning: PHP Startup: Unable to load dynamic library '/opt/alt/php70/usr/lib64/php/modules/newrelic-20160303.so' - /opt/alt/php70/usr/lib64/php/modules/newrelic-20160303.so: cannot open shared object file: No such file or directory in Unknown on line 0: /usr/local/cpanel/cgi-sys/ea-php56
```
</div>

Please, make sure that Zend Extension Build and NewRelic PHP Extension Build are similar ( should be similar)
Zend Extension Build    API320151012,NTS
PHP Extension Build    API20151012,NTS

configuration steps:

<div class="notranslate">

```
# ln -s /usr/lib/newrelic-php5/agent/x64/newrelic-20151012.so /opt/alt/php56/usr/lib64/php/modules/newrelic-20151012.so
# echo "extension=newrelic-20151012.so" > /opt/alt/php56/etc/php.d.all/newrelic.ini
# cagefsctl --setup-cl-selector
# selectorctl -e newrelic -u myuser -v 5.6
```
</div>

_/usr/lib/newrelic-php5/agent/x64/_ -  this is directory with different newrelic agents php  
We need to choose the version that we need regarding zend version  
The /usr/lib/newrelic-php5/ is uncompressed tar from [https://download.newrelic.com/php_agent/release/newrelic-php5-7.0.0.186-linux.tar.gz](https://download.newrelic.com/php_agent/release/newrelic-php5-7.0.0.186-linux.tar.gz)

## How to add xvfb, wkhtmltopdf to the CageFS?

The steps are:
1. Create _/etc/cagefs/conf.d/xvfb.cfg_ and add:

<div class="notranslate">

```
[xvfb]
comment=xvfb
paths=/usr/bin/xvfb-run, /usr/bin/xauth, /usr/bin/Xvfb, /usr/bin/xkbcomp, /usr/bin/wkhtmltopdf, /usr/share/X11/xkb
```
</div>

2. Run:

<div class="notranslate">

```
cagefsctl --addrpm xkeyboard-config
```
</div>

## PHP composer installation howto

1. Download installer:

<div class="notranslate">

```
/opt/alt/php55/usr/bin/php -d extension=json.so -d extension=phar.so -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
```
</div>

2. Install composer itself:

<div class="notranslate">

```
php composer-setup.php --install-dir=/usr/local/bin/ --filename=composer
```
</div>

3. Generate cagefs config file to make it available for users:

<div class="notranslate">

```
echo -e "[composer]\ncomment=PHP Composer\npaths=/usr/local/bin/composer" > /etc/cagefs/conf.d/php-composer.cfg
```
</div>

4. Update cagefs:

<div class="notranslate">

```
/usr/sbin/cagefsctl --force-update
```
</div>

5. For the desired user enable JSON and PHAR with PHP-Selector as required for Composer.

6. To make composer work with suhosin, the following change is needed for _/opt/alt/phpXX/etc/php.d.all/suhosin.ini_  
(php70 example follows): 

<div class="notranslate">

```
$ echo "suhosin.executor.include.whitelist = phar" >> /opt/alt/php70/etc/php.d.all/suhosin.ini
$ cagefsctl --rebuild-alt-php-ini
```
</div>

## Fix HTTP Error 404 - Not Found errors in yum

If you cannot install or update software via yum and you see 404 errors like this:

<div class="notranslate">

```
http://repo.cloudlinux.com/kernelcare/7.4/x86_64/repodata/repomd.xml: [Errno 14] HTTP Error 404 - Not Found
http://repo.cloudlinux.com/other/cl7.3/mysqlmeta/cl-mariadb-10.1/x86_64/repodata/repomd.xml: [Errno 14] HTTP Error 404 - Not Found
```
</div>

Please comment out the following line in _/etc/yum.conf_:

<div class="notranslate">

```
distroverpkg=cloudlinux-release
```
</div>

You can run this command to comment out that line automatically:

<div class="notranslate">

```
sed -r -i 's/^\s*(distroverpkg\s*=\s*cloudlinux-release)/#\1/g' /etc/yum.conf
```
</div>

## How to migrate all CloudLinux OS settings to another server?

To move LVE and packages limits, just move the _/etc/container/ve.cfg_ file to a new server, and then run 

<div class="notranslate">

```
# lvectl apply all
```
</div>

If any modifications were made to CageFS - move the _/etc/cagefs/cagefs.mp_ file, and/or _/etc/cagefs/conf.d_ directory to a new server and run

<div class="notranslate">

```
# cagefsctl --force-update && cagefsctl--remount-all
```
</div>

For PHP-Selector - move the _/etc/cl.selector_ directory and run:

<div class="notranslate">

```
# cagefsctl --setup-cl-selector
```
</div>

To restore user's settings from PHP Selector, please refer to the following KnowledgeBase entry.

Basically, the custom PHP settings migration plan is:

1) restore user home dirs
2) remove all cagefs\selector directories with

<div class="notranslate">

```
# rm -rf /var/cagefs/*/*/etc/cl.selector
# rm -rf /var/cagefs/*/*/etc/cl.php.d
```
</div>

3) regenerate them with

<div class="notranslate">

```
# cagefsctl --force-update-etc
```
</div>

## How to restore PHP Selector options after restore or migration?

For restoring PHP Selector options and alternate PHP version from the backup (**cltest3** is an example user user) do the following:

1. Restore _~cltest3/.cl.selector/_ directory.
2. Remove PHP Selector current files from CageFS directory. First, take CageFS prefix:

<div class="notranslate">

```
$ /usr/sbin/cagefsctl --getprefix cltest3
```
</div>

```
04
```

Then remove _cl.selector_ and _cl.php.d_ in user's _etc_ directory:

<div class="notranslate">

```
$ rm -rf /var/cagefs/04/cltest3/etc/cl.selector
$ rm -rf /var/cagefs/04/cltest3/etc/cl.php.d
```
</div>

Run the command to recreate configs:

<div class="notranslate">

```
$ /usr/sbin/cagefsctl --force-update-etc cltest3
```
</div>

## How to check email pipe issue?
