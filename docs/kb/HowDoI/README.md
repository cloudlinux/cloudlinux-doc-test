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

To restore user's settings from PHP Selector, please refer to the [following](/kb/HowDoI/#how-to-restore-php-selector-options-after-restore-or-migration) KnowledgeBase entry.

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

The email piping is a technique of sending an email message as an input to a program rather than appending the message to the mailbox file, allowing for real-time email delivery and handling. Every mail server has its own rules and procedures for mail delivery, making it hard to provide common instructions for configuring an MTA.
In this article, we will discuss common email pipe issues on cPanel and Exim as MTA.

**Creating a script**

While creating a script, in the very first line we have to specify what should be used to interpret it (the shebang line). Suitable values may be:

<div class="notranslate">

```
#!/usr/bin/php -q
#!/usr/local/bin/php -q
```
</div>

If you are using CageFS+PHP Selector, _/usr/bin/php_ and _/usr/local/bin/php_ are used for CGI/CLI binary versions appropriately.

<div class="notranslate">

```
# cat /etc/cl.selector/native.conf 
php=/usr/bin/php
php-cli=/usr/local/bin/php
php.ini=/usr/local/lib/php.ini
php-fpm=/usr/local/sbin/php-fpm
```
</div>

Note the '-q' parameter. This suppresses header output as sometimes php just has to output something. If anything is output by php, the sender will receive a bounceback message containing, among other things, whatever php chose to output. We don't really want this.

**Setting up the correct permissions**

For mail to be piped to scripts, both the script and the directory it is in should have permissions of 0755.

**Settings up email piping**

Use the "Pipe to a Program" option to pipe email information to your script:  
_cpanel user > Forwarders > Add Forwarder button > Advanced Options > choose "Pipe to a Program"_  
When you use the "Pipe to a Program" option, enter a path that is relative to your home directory. For example, to use the _/home/user/script.php_ script,
enter _script.php_ in the "Pipe to a Program" text box, where user represents your username.

After that, this user will have the following entry in _/etc/valiases/domain.com_ file:

<div class="notranslate">

```
# cat /etc/valiases/domain.com 
test@domain.com: |/home/user/script.php
```
</div>

where _domain.com_ represents your domain name.

**Troubleshooting**

If you've written your script correctly, set the permissions on it and it's directory fine and created your email filter correctly everything will work.

If in doubt, quickly check that all of the following are correct:
1. You have the correct shebang line
2. Your script reads data from STDIN
3. Your script has permissions of 0755
4. The directory in which your script lives has permissions of 0755
5. Your Forwarder is set up properly. Double check that the path to your script is correct.
6. You have no extraneous carriage returns

Below is a simple php script, which can be used to test email piping:

<div class="notranslate">

```
#!/usr/local/bin/php -q
<?php
/* Read the message from STDIN */
$fd = fopen("php://stdin", "r");
$email = ""; // This will be the variable holding the data.
while (!feof($fd)) {
$email .= fread($fd, 1024);
}
fclose($fd);
/* Saves the data into a file */
$fdw = fopen("/tmp/pipemail.txt", "w+");
fwrite($fdw, $email);
fclose($fdw);
/* Script End */
?>
```
</div>

In order to setup this script, do the following:
1. Create php script with the content provided above inside user's home directory. For example:
_/home/user/test.php_

2. Make it executable:

<div class="notranslate">

```
# chmod 755 /home/user/test.php
```
</div>

3. Edit _/etc/valiases/domain.com_ file:  
`test@domain.com: |/home/user/test.php`

4. Tail exim_mainlog:

<div class="notranslate">

```
# tail -f /var/log/exim_mainlog
```
</div>

5. Sent an email to test@domain.com and check Exim log.

6. Check _/home/user/.cagefs/tmp/pipemail.txt_ file. If pipemail.txt has email content, then email piping works properly.
If pipemail.txt is empty or you still have issues, please submit a [ticket](https://cloudlinux.zendesk.com/hc/requests/new).

## Configure CloudLinux OS features, PHP and mod_lsapi on a server with no control panel

This is a practical manual of setting up Apache + mod_lsapi + CageFS + PHP Selector on a server with no panel installed.

It is assumed that our system has been converted and loaded with CloudLinux kernel. Since PHP Selector installation requires [CageFS](/cloudlinux_os_components/#cagefs/) and [LVE Manager](/lve_manager/) installed in the system, let's start with CageFS installation:

<div class="notranslate">

```
# yum install cagefs
```
</div>

Next we'll need to install LVE Manager:

<div class="notranslate">

```
# yum install lvemanager
```
</div>

Then install Apache and native PHP:

<div class="notranslate">

```
# yum install httpd
# yum install php-cli
```
</div>

Then install mod_lsapi:

<div class="notranslate">

```
# yum install liblsapi liblsapi-devel
# yum install mod_lsapi
```
</div>

Finally, install PHP Selector:

<div class="notranslate">

```
# yum groupinstall alt-php
```
</div>

Now let's configure components. Initialize CageFS and enable for all users:

<div class="notranslate">

```
# cagefsctl --init
# cagefsctl --enable-all
```
</div>

Initialize mod_lsapi (few errors will appear, this is normal, please ignore them):

<div class="notranslate">

```
# /usr/bin/switch_mod_lsapi --setup
```
</div>

Enable mod_lsapi PHP handler:

<div class="notranslate">

```
# sed -i 's/#AddType/AddType/' /etc/httpd/conf.d/lsapi.conf
```
</div>

Update CageFS skeleton:

<div class="notranslate">

```
# cagefsctl --force-update
```
</div>

We also need to open access to 80 port:

<div class="notranslate">

```
# firewall-cmd --zone=public --permanent --add-port=80/tcp
# firewall-cmd --reload
```
</div>

Now we are ready to set up a website. Let's create user first:

<div class="notranslate">

```
# adduser cltest1
```
</div>

Change home directory permissions to allow httpd access it:

<div class="notranslate">

```
# chmod 711 /home/cltest1
```
</div>

Create required directories:

<div class="notranslate">

```
# su cltest1 -c "mkdir ~/public_html{,/logs,/cgi-bin}"
```
</div>

Finally, let's add website to Apache configuration. Create a file _/etc/httpd/conf.d/vhosts.conf_ with the following contents:

<div class="notranslate">

```
<VirtualHost *:80>
  ServerName default
  DocumentRoot /var/www/html
</VirtualHost>
<VirtualHost *:80>
  ServerAdmin cltest1@example.com
  DocumentRoot "/home/cltest1/public_html"
  ServerName example.com
  ServerAlias www.example.com
  ErrorLog "/home/cltest1/public_html/logs/error.log"
  CustomLog "/home/cltest1/public_html/logs/access.log" common
  ScriptAlias /cgi-bin/ "/home/cltest1/public_html/cgi-bin/"
  SuexecUserGroup cltest1 cltest1
  <Directory "/home/cltest1">
    AllowOverride All
  </Directory>
  <Directory "/home/cltest1/public_html/cgi-bin">
    AllowOverride None
    Options None
  </Directory>
</VirtualHost>
```
</div>

Please note, first VirtualHost must be defined only once, it will be used for requests that didn't match any other VirtualHost. 

Everything is ready now. Restart Apache httpd:

<div class="notranslate">

```
# systemctl restart httpd.service
```
</div>
 
You can now use [selectorctl](/command-line_tools/#selectorctl) utility to select PHP versions for your users.

## Fix rpmdb: Thread died in Berkeley DB library

If you see rpmdb errors during package management (during yum/rpm operations), like this:

<div class="notranslate">

```
rpmdb: Thread/process 277623/140429100390144 failed: Thread died in Berkeley DB library
error: db3 error(-30974) from dbenv->failchk: DB_RUNRECOVERY: Fatal error, run database recovery
error: cannot open Packages index using db3 -  (-30974)
error: cannot open Packages database in /var/lib/rpm
CRITICAL:yum.verbose.cli.yumcompletets:Yum Error: Error: rpmdb open failed
```
</div>

It means that the RPM database is corrupted.

**A similar error can be triggered in LVE Manager Installation Wizard:**

![DB broken](/images/image001.png)

**Solution:**

Please follow these steps to backup and rebuild rpmdb database:

<div class="notranslate">

```
# mkdir /var/lib/rpm/backup
# cp -a /var/lib/rpm/__db* /var/lib/rpm/backup/
# rm -f /var/lib/rpm/__db.[0-9][0-9]*
# rpm --quiet -qa
# rpm --rebuilddb
# yum clean all
```
</div>

## How to move the mysql data folder

1. Make a full mysqldump file

<div class="notranslate">

```
# mysqldump --opt -uroot -proot_password > /tmp/mysqldump
```
</div>

2. Disable Mysql monitoring

<div class="notranslate">

```
whmapi1 configureservice service=mysql enabled=1 monitored=0
```
</div>

3. Stop MySQL

<div class="notranslate">

```
# systemctl stop mysql
```
</div>

4. Ensure that the following settings are present

check file _/etc/systemd/system/mariadb.service.d/homedir.conf_

<div class="notranslate">

```
[Service]
ProtectHome=false
ProtectSystem=off
```
</div>

5. Make the directory for MySQL in /home, move it and symlink it:

<div class="notranslate">

```
# mkdir /home/var_mysql
# mv /var/lib/mysql /home/var_mysql
# chown -R mysql:mysql /home/var_mysql/mysql
# ln -s /home/var_mysql/mysql /var/lib/mysql
```
</div>

6. Remount CageFS system-wide:

<div class="notranslate">

```
# cagefsctl --remount-all
```
</div>

7. Start MySQL:

<div class="notranslate">

```
# systemctl start mysql
```
</div>

8. Enable Mysq monitoring

<div class="notranslate">

```
whmapi1 configureservice service=mysql enabled=1 monitored=1
```
</div>

## How to obtain activation keys, register and migrate servers?

There are two ways to get started with CloudLinux OS. You can either convert your existing system or install CloudLinux on a new server. In either case, you will need the activation key.

If you purchased CloudLinux OS through one of our partners, they will provide you with an IP-based license directly.

**Getting the activation key**

You can start by using a 30-day free trial key, which can be obtained through the CloudLinux Network (our self-service web portal), also called CLN.
New CloudLinux OS activation key can be created through CLN as described [here](https://docs.cln.cloudlinux.com/index.html?cloudlinux_os_activation_keys.htm).

Note, you cannot use a new trial key on a system that is already using a trial key.
Otherwise, you will receive the following error message:

`The IP <ip-address> was already used for trialing on <registation date>`

This error message is valid for CloudLinux OS and KernelCare.

**Migrating licenses and servers**

When you migrate from the trial activation key to a paid one, you have to re-register your installation from the command line interface (server console - run it as root):

<div class="notranslate">

```
# rhnreg_ks --activationkey=<newkey> --force
```
</div>

For IP-based licenses you may have received from CloudLinux partners, the syntax is different:

<div class="notranslate">

```
# clnreg_ks --force
```
</div>

If you need to reinstall your server, migrate to new hardware or perform any kind of license migration, login to CLN, remove old server(s) in the "Servers" section. After that, you will be able to register a new server with the same activation key. More information about server management can be found [here](https://docs.cln.cloudlinux.com/index.html?servers.htm).

If you want to migrate key-based licenses provided by Plesk (starts with 7003*), please open a new support [ticket](https://cloudlinux.zendesk.com/hc/requests/new). 

Don't worry - the server removal will not affect your customer's websites' operation. Only software update (yum update) and the LVE Manager plugin will become inactive. All the other CloudLinux OS features will continue to work properly.

After removing the servers you no longer need, click on Licenses and pick an activation key with free license slots. Use that key to register your new CloudLinux server from CLI in two simple steps:

<div class="notranslate">

```
# yum install rhn-setup --enablerepo=cloudlinux-base
# rhnreg_ks --activationkey=<newkey> --force
```
</div>

for IP-based licenses:

<div class="notranslate">

```
# clnreg_ks --force
```
</div>

In case of server migration, you don’t need another activation key to proceed. First, remove the old server from CLN, activate the new server with the same activation key and proceed with the migration.

Otherwise, you will receive the following error message:

<div class="notranslate">

```
Error Message: 
Maximum usage count of X reached 
Error Class Code: 61 
Error Class Info: Too many systems registered using this registration token 
Explanation: 
An error has occurred while processing your request. If this problem 
persists please enter a bug report at helpdesk.cloudlinux.com. 
If you choose to submit the bug report, please be sure to include 
details of what you were trying to do when this error occurred and 
details on how to reproduce this problem.

See /var/log/up2date for more information
```
</div>

In case something went wrong or you need our assistance, please contact our [support](https://cloudlinux.zendesk.com/hc/requests/new).

## How do I fix duplicated packages issue?

Sometimes after incorrect updates duplicated packages appear in the system, for example:

<div class="notranslate">

```
<...>
alt-python27-2.7.13-3.el6.x86_64 is a duplicate with alt-python27-2.7.11-7.el6.x86_64
alt-python27-2.7.13-4.el6.x86_64 is a duplicate with alt-python27-2.7.13-3.el6.x86_64
alt-python27-libs-2.7.13-3.el6.x86_64 is a duplicate with alt-python27-libs-2.7.11-7.el6.x86_64
alt-python27-libs-2.7.13-4.el6.x86_64 is a duplicate with alt-python27-libs-2.7.13-3.el6.x86_64
<...>
```
</div> 

First of all, we need the full list of dupes:

<div class="notranslate">

```
package-cleanup --dupes | tail -n +3
```
</div>

We'll also need to save this list into a file:

<div class="notranslate">

```
package-cleanup --dupes | tail -n +3 > duplist.txt
```
</div>

**The main idea is to do the following (for each package)**:

1. Remove the lowest version from the rpmdb: `rpm -e --justdb --nodeps $PKGNAME`
2. Reinstall the highest version: `yum -y reinstall $PKGNAME`
 
It is a good idea to check what is going to be done before real operations:

(This will only display a list of all the commands without execution)

<div class="notranslate">

```
cat duplist.txt | sort --version-sort | awk 'NR % 2 {print "rpm -e --justdb --nodeps " $1 } !(NR % 2) {match($0, "-[0-9]");print "yum -y reinstall " substr($0,0,RSTART-1)}'
```
</div>

Then we perform the necessary operations:

("pipe sh" has been added at the end in order to execute the sequence):

<div class="notranslate">

```
cat duplist.txt | sort --version-sort | awk 'NR % 2 {print "rpm -e --justdb --nodeps " $1 } !(NR % 2) {match($0, "-[0-9]");print "yum -y reinstall " substr($0,0,RSTART-1)}' | sh
```
</div>

Alternatively, all this could be performed without an intermediary file:

<div class="notranslate">

```
package-cleanup --dupes | tail -n +3 | sort --version-sort | awk 'NR % 2 {print "rpm -e --justdb --nodeps " $1 } !(NR % 2) {match($0, "-[0-9]");print "yum -y reinstall " substr($0,0,RSTART-1)}' | sh
```
</div>

## How To Obtain Vmcore on Xen/KVM Virtual Machines with Virsh?

1. Make sure you have libvirt tools installed on your KVM host (dom0 for Xen):

<div class="notranslate">

```
yum install libvirt -y
```
</div>

2. Make sure virsh utility is installed:

<div class="notranslate">

```
virsh --version
2.0.0
```
</div>

3. Login to the Guest OS.

4. Let the VM wait before rebooting on kernel panic:

<div class="notranslate">

```
sysctl kernel.panic=10000 (number of seconds to wait)
```
</div>

5. Wait until the Guest OS is crashed.

6. Gather VM dump with virsh:

<div class="notranslate">

```
virsh dump domain_name --memory-only --format=kdump-zlib
```
</div>

FYI: If your virsh utility doesn’t support --format option, just skip it:

<div class="notranslate">

```
virsh dump domain_name --memory-only
```
</div>

7. Upload the dump onto the dump server.

## How to add java to CageFS?

If you would like to make java available from inside CageFS, perform the following steps:

1. Create _/etc/cagefs/conf.d/java.cfg_ and add proper binary files to it:

<div class="notranslate">

```
$ vi /etc/cagefs/conf.d/java.cfg
```

```
[java-custom]
comment=Java-custom
paths=/usr/bin/java, /etc/alternatives/java
```
</div>

2. Update skeleton and remount all:

<div class="notranslate">

```
$ cagefsctl --force-update
$ cagefsctl --remount-all
```
</div>

## PHP Selector useful commands

- Getting current PHP version for a user:

<div class="notranslate">

```
selectorctl --user-current --user=UU
```
</div>

- Changing PHP version for a user:

<div class="notranslate">

```
selectorctl --set-user-current=5.3 --user=UU
```
</div>

- Enabling some extensions for a user:

<div class="notranslate">

```
selectorctl --enable-user-extensions=pdo,phar --version=5.3 --user=UU
```
</div>

Extensions disabling is done the same way.

- List user extensions:

<div class="notranslate">

```
selectorctl --list-user-extensions --version=5.3 --user=UU
```
</div>

- Replace option in users php.ini:

<div class="notranslate">

```
selectorctl --replace-options=log_errors:on,display_errors:on --version=5.3 --user=UU
```
</div>

- Enable some PHP module for all existing accounts (cPanel servers only):

<div class="notranslate">

```
# cd /var/cpanel/users; ls -1 | grep -v '^.' | awk '{ print "selectorctl some_cool_keys --user="$1 }' | sh
```
</div>

Servers with other control panels or non-panel:

<div class="notranslate">

```
# for u in cat /etc/passwd|awk -F: '($3>=500)'| cut -f "1" -d :; do selectorctl some_cool_keys --user=$u; done
```
</div>

where 'some_cool_keys' - any selectorctl options from [here](/command-line_tools/#selectorctl)

- Reset user extensions to default settings:

<div class="notranslate">

```
selectorctl --list-users --version=5.6 | sed -e 's/,/\n/g' | sed 's/^/selectorctl --reset-user-extensions --version=5.6 --user=/'
```
</div>

If you run it:

1. The script will generate a list of users who use PHP 5.6 

2. The script will generate a separate command to reset the modules for each user 

3. If you add | sh at the end of the command, the modules will be reset for all users that have PHP 5.6 Example:

<div class="notranslate">

```
selectorctl --list-users --version=5.6 | sed -e 's/,/\n/g' | sed 's/^/selectorctl --reset-user-extensions --version=5.6 --user=/' | sh
```
</div>

- Change PHP version for all users:

<div class="notranslate">

```
# selectorctl --change-to-version=5.3 --version=native #this command changes PHP version to 5.3 for all users with native version
```
</div>

or, you can change PHP version for all users using the commands below:

<div class="notranslate">

```
# cd /var/cpanel/users
# ls -1 | awk '{ print "selectorctl --set-user-current=5.3 --user="$1 }' | sh
```
</div>

## How to install CWP (CentOS Web Panel) and configure it for PHP Selector?

CentOS Web Panel and its features are described on the official [website](http://centos-webpanel.com/features)

The installation is straightforward:

<div class="notranslate">

```
cd /usr/local/src
wget http://dl1.centos-webpanel.com/files/cwp-latest.sh
sh cwp-latest.sh
```
</div>

During the install, it builds Apache and PHP from source. To make PHP Selector work we need to build patched suPHP: 
- download/unpack suPHP (0.7.1 an as example):

<div class="notranslate">

```
cd /usr/local/src/
wget http://www.suphp.org/download/suphp-0.7.1.tar.gz
cd suphp-0.7.1
```
</div>

- download/unpack our patches:

<div class="notranslate">

```
wget http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz
tar xfz cl-apache-patches.tar.gz
```
</div>

- apply our patch:

<div class="notranslate">

```
patch -p1 < suphp-0.7.1-cagefs.patch
```
</div>

- if apache 2.4 is used - modify configure file to adopt suPHP sources for it, open a file:

<div class="notranslate">

```
vi configure
```
</div>

- find section

<div class="notranslate">

```
    major_version=`echo $APACHE_VERSION|cut -f1,2 -d.`
    if test "$major_version" = "2.0" -o "$major_version" = "2.2"; then
      APACHE_VERSION_2=true
      APACHE_VERSION_1_3=false
    else
      APACHE_VERSION_2=false
      APACHE_VERSION_1_3=true
```
</div>

and modify second line as follows:

<div class="notranslate">

```
    if test "$major_version" = "2.0" -o "$major_version" = "2.2" -o "$major_version" = "2.4"; then
```
</div>
	
- build suphp:

<div class="notranslate">

```
./configure --with-apr=/usr/local/apr/ --with-apxs=/usr/local/apache/bin/apxs -with-setid-mode=paranoid --with-apache-user=nobody --with-gnu-ld --disable-checkpath --sysconfdir=/usr/local/etc --sbindir=/usr/local/sbin
make
make install
```
</div>

When done, check if suPHP binary has necessary code, the output should be following:

<div class="notranslate">

```
strings /usr/local/sbin/suphp | grep jail
```
</div>

_`lve_jail_uid CageFS jail error`_

And change (create) _/etc/cl.selector/native.conf_ to look this way:

_`php=/usr/local/bin/php-cgi php-cli=/usr/local/bin/php php.ini=/usr/local/php/php.ini php-fpm=/usr/local/sbin/php-fpm`_

## How to manually update mod_hostinglimits on cPanel?

When we release an update for mod_hostinglimits, we send it to cPanel team to implement in EasyApache. Overall, the procedure requires some time due to quite complicated process. Here is the way to update mod_hostinglimits manually on cPanel servers. Check current version:

<div class="notranslate">

```
strings /usr/local/apache/modules/mod_hostinglimits.so | grep version -i
```
</div>

_`mod_hostinglimits: version 1.0-16. LVE mechanism enabled`_

Update from source (version 1.0-19 as an example):

<div class="notranslate">

```
wget http://repo.cloudlinux.com/cloudlinux/sources/da/mod_hostinglimits-1.0-19.tar.gz
tar xfz mod_hostinglimits-1.0-19.tar.gz
cd mod_hostinglimits-1.0-19
cmake .
make
make install
```
</div>

Check version:

<div class="notranslate">

```
strings /usr/local/apache/modules/mod_hostinglimits.so | grep version -i
```
</div>

_`mod_hostinglimits: version 1.0-19. LVE mechanism enabled`_

Finally, restart Apache to apply changes:

<div class="notranslate">

```
/etc/init.d/httpd restart
```
</div>

## How to move /opt/alt

In rare cases, customer wants to move _/opt/alt_ to a different place. To do this:

1. Move _/opt/alt_ somewhere (`mv /opt/alt /var/opt_alt`).

2. Create _/opt/alt_ directory (`mkdir /opt/alt`).

3. Bind mount the new path to the old one: (`mount -o bind /var/opt_alt /opt/alt`).

4. Remount CageFS (`cagefsctl --remount-all`).

5. Add an entry to _/etc/fstab_, for example: `/var/opt_alt /opt/alt none bind 0 0`.

## How do I enable LVE and PHP Selector in LiteSpeed?

In LiteSpeed admin interface do the following:

_Configuration -> Server -> Edit -> "Enable LVE" = "Yes" -> Save_
 
If you are using CageFS, then choose cagefs there.
 
To enable PHP Selector with LiteSpeed you have to adjust more settings in Admin:
1. CloudLinux (_Admin Console --> Configuration --> Server --> General_): CageFS;
2. Enable SuExec: _Server-> General -> PHP SuEXEC -> Yes_;
3. LSPHP5 external app runs in SUEXEC non-daemon mode ONLY (_Run On Start Up --> Yes or No_);
4. In LSPHP5 external app (_Admin Console --> Configuration --> Server --> External App --> lsphp5_).

Change

`command => $SERVER_ROOT/fcgi-bin/lsphp5`

To

`command => /usr/local/bin/lsphp`

::: tip Note
In order to use PHP Selector and custom php.ini, lsphp5 needs to be in SuEXEC non-daemon mode.
:::

::: tip Note
Some PHP configurations require more memory for SuEXEC to work properly. If you are getting error 500 after switching suEXEC to non-daemon mode, try to increase Memory Soft Limit and Memory Hard Limit for external App (Admin Console --> Configuration --> Server --> External App --> lsphp5 ) to at least 650/800M.
:::

## How do I use 3rd party RPM repositories without facing conflicts?

To protect packages from CloudLinux repositories from being updated from 3rd party repositories like rpmforge, and to prevent such dependencies issues, do the following:

**For CloudLinux OS 6.x**

<div class="notranslate">

```
# yum install yum-plugin-protectbase
```
</div>

Edit _/etc/yum/pluginconf.d/rhnplugin.conf_. Add:

<div class="notranslate">

```
[cloudlinux-x86_64-server-6]
protect = 1

[cloudlinux-base]
protect = 1
```
</div>

**For CloudLinux OS 7.x**

<div class="notranslate">

```
# yum install yum-plugin-protectbase
```
</div>

Edit _/etc/yum/pluginconf.d/rhnplugin.conf_, add:

<div class="notranslate">

```
[cloudlinux-x86_64-server-7]
protect = 1

[cloudlinux-base]
protect = 1
```
</div>

## How can I run service inside LVE?

It is possible to wrap service in LVE using lve-wrappers. To do that, install lve-wrappers first:

<div class="notranslate">

```
# yum install lve-wrappers
```
</div>

Then rename service that you want to wrap like:

<div class="notranslate">

```
# mv /etc/init.d/[service_name] /etc/init.d/[service_name].orig
```
</div>

Create a new script to start service instead:

<div class="notranslate">

```
# cat <<END > /etc/init.d/[service_name]
#!/bin/sh
lve_suwrapper [LVE_ID] /etc/init.d/[service_name].orig $@
END

# chmod +x /etc/init.d/[service_name]

# service [service_name] restart
```
</div>

That should be it.
You can specify any number as LVE_ID, just make it large enough so it would not clash with the user ID from _/etc/passwd_ file.

## How do I configure CloudLinux kernel on Xen PV?

1. In _/etc/sysconfig/kernel_ should be the following lines:

_`UPDATEDEFAULT=yes DEFAULTKERNEL=kernel-xen`_

If the file does not exist, you should create it. 

2. Install grub if it is not installed:

<div class="notranslate">

```
yum install grub
```
</div>

3. Check _/etc/modprobe.conf_, it usually contains the following:

<div class="notranslate">

```
cat /etc/modprobe.conf
```
</div>

_`alias eth0 xennet
alias scsi_hostadapter xenblk`_

If the file does not exist - create it, and then, in case you have not installed kernel yet - proceed to step **4**.

In case you have already installed kernel, rebuild initrd image:

<div class="notranslate">

```
mkinitrd -f /boot/initrd-2.6.xxxx.img 2.6.xxxx
```
</div>

where `xxxx` should be the same as you newly installed `kernel-xen` version and move to step **5**.

4. Run

<div class="notranslate">

```
yum install kernel-xen
```
</div>

5. Run

<div class="notranslate">

```
ln -s /boot/grub/grub.conf /boot/grub/menu.lst
ln -s /boot/grub/grub.conf /etc/grub.conf
```
</div>

If _/boot/grub/grub.conf_ does not exist, create it using the template in step 5, and repeat step 3.

6. Run

<div class="notranslate">

```
rpm -qa|grep kernel
```
</div>

You should remove all kernels except Xen kernel. For example, if the output looks like this:

_`kernel-2.6.18-338.5.1.el5.lve0.8.25 kernel-xen-2.6.18-374.3.1.el5.lve0.8.44 kernel-headers-2.6.18-374.3.1.el5.lve0.8.44`_ 
then you should run

<div class="notranslate">

```
rpm -e --nodeps kernel-2.6.18-338.5.1.el5.lve0.8.25
```
</div>

7. Make sure your _/etc/grub.conf_ looks like this:

_`default=0 timeout=10 title CloudLinux Server (2.6.18-374.3.1.el5.lve0.8.44xen) root (hd0,0) kernel /boot/vmlinuz-2.6.18-374.3.1.el5.lve0.8.44xen console=xvc0 root=/dev/sda1 ro initrd /boot/initrd-2.6.18-374.3.1.el5.lve0.8.44xen.img`_

::: tip Note
Mind the kernel version on vmlinuz and initrd, they should match the version of currently installed kernel.
:::

8. Switch to pygrub mode, and reboot the server. If you don't know how to switch in pygrub mode, contact your service provider, as they should be able to do it for you.

_`bootloader = '/usr/bin/pygrub'`_

## How do I install Hyper-V integrated components?

Hyper-V integrated components are included in the latest version of CloudLinux OS 6.

No additional actions required to install them.

## How do I move /usr/share/cagefs-skeleton to other place because of low disk space?

::: tip Note
If you are placing skeleton in /home directory on cPanel servers, you must configure the following option in cPanel WHM:
WHM -> Server Configuration -> Basic cPanel/WHM Setup -> Basic Config -> Additional home directories 
Change the value to blank (not to default "Home").
Without changing this option, cPanel will create new accounts in incorrect places.
:::

<div class="notranslate">

```
cagefsctl --disable-cagefs
cagefsctl --unmount-all
```
</div>

Verify that the following command gives empty output:

<div class="notranslate">

```
cat /proc/mounts | grep cagefs-skeleton
```
</div>

Verify that the directory `cagefs-skeleton.bak` does not exist (if it does exist - change the name `cagefs-skeleton.bak` to something else):

<div class="notranslate">

```
ls -d /usr/share/cagefs-skeleton.bak

mv /usr/share/cagefs-skeleton /usr/share/cagefs-skeleton.bak

mkdir -m 0755 /home/cagefs-skeleton
ln -s /home/cagefs-skeleton /usr/share/cagefs-skeleton
cagefsctl --init
cagefsctl --enable-cagefs
cagefsctl --remount-all
```
</div>

Verify that the following command gives empty output:

<div class="notranslate">

```
cat /proc/mounts | grep cagefs-skeleton.bak
```
</div>

Now you can safely remove `cagefs-skeleton.bak` directory:

<div class="notranslate">

```
rm -rf /usr/share/cagefs-skeleton.bak
```
</div>

## How do I move user's home folder to another location if I have CageFS installed?

You can move home directories of the users in the following way:

<div class="notranslate">

```
cagefsctl --disable username1 username2
cagefsctl --unmount username1 username2
```
</div>

Move home directories to a new location, edit _/etc/passwd_ to reflect new path then enable CageFS:

<div class="notranslate">

```
cagefsctl --update-etc username1 username2
cagefsctl --enable username1 username2
```
</div>

## How to install Xen tools (guest utilities) on Citrix Xenserver 6.1 or Xen Cloud Platform 6.1?

To install guest utilities, mount as usually CD ROM with tools to _/mnt/cdrom/_. Then do the following:

1. Enter cdrom mounted location:

<div class="notranslate">

```
cd  /mnt/cdrom/Linux
```
</div>

Install needed software, use '-m 6' for CloudLinux OS 6:

<div class="notranslate">

```
./install.sh -d rhel -m 6
```
</div>

## How do I calculate reasonable inode limit?

Inode limit can be considered as a number of files and directories one customer can own. Default WordPress installation has approximately 1,100 files/directories, default Magento install is 10,000, you would need to consider at least 30,000 to be an inode limit for a minimal package for your customers. You can calculate limits basing on current usage of your customers by running the following command. It will list top 50 entries that use inodes the most:

<div class="notranslate">

```
repquota -a | grep -v root | awk '{print $6" "$1 }' | sort -g | tail -50
```
</div>

Do not forget - temporary files and session files are also counted towards the inode limit.

## How do I create local CloudLinux repository mirror?

CloudLinux mirror requires a bit more than a typical repository mirror setup. We set up CLN proxy software to accommodate for authentication done by `yum-rhn-plugin` plugin.

::: danger Important 
To qualify as a CLN mirror, you need to have more than 50 servers in your datacenters.
:::

To host a mirror, please setup:

- a VM with 4GB of RAM and 200GB of disk space running CentOS 7;
- "firewalld" service should be running with sshd enabled;
- domain name pointed to that mirror, like cl-mirror.yourdomain.com;

Then create a support ticket and send us:

- your CLN login name;
- access to VM;
- domain name pointed to that VM.

We will setup a software that would act as a caching proxy allowing licensing to work. When done, your mirror will be added to the [mirror list](http://repo.cloudlinux.com/cloudlinux/mirrorlists/cln-mirrors)

ETA is about 2-3 business days.

## How do I install CloudLinux from scratch or convert existing server?

To install CloudLinux OS on a new server you have to download and use provided .iso files. The files themselves and all the necessary information you can find [here](/cloudlinux_installation/#installing-new-servers).

To convert existing server you need to download and run our script, which you can find [here](/cloudlinux_installation/#converting-existing-servers) with all the necessary instructions.

Also, we provide a variety of different images for most common virtual machines, more information [here](/cloudlinux_installation/#cloudlinux-os-images).

## How do I install VMware-Tools/Improving server performance when on VMware?

If you notice some server slowing down (IO/memory) and this server is running on VMware, then we strongly recommend you to install [VMware-Tools](https://kb.vmware.com/s/article/340) - a suite of utilities that enhance the performance of VM guest operating system and improves its management.

Check if they are installed and kernel modules are loaded, where `vmci` is the main one:

<div class="notranslate">

```
# lsmod | grep vm
```
</div>

_`vmci                   80373  1 vsock`_

If you see no `vmci` in the output, then most probably they are not installed.

We do recommend installing them from source code using this [article](https://kb.vmware.com/s/article/1018414)

Installation process:

Click in _VM menu > Guest > Install/Upgrade VMware tools_ (at least). After that, the cdrom will be attached as _/dev/cdrom_. Mount it:

<div class="notranslate">

```
mkdir /mnt/cdrom
mount /dev/cdrom /mnt/cdrom
```
</div>

Then install kernel headers and VMware-Tools:

<div class="notranslate">

```
yum install kernel-headers
cd /mnt/cdrom/vmware-tools-distrib
./vmware-install.pl
```
</div>

Follow the wizard (pressing enter in most cases), make them enabled on startup.

Check if `vmci` exists in lsmod.

If you see tools installed but no module loaded - run the configuration from the command line:

<div class="notranslate">

```
vmware-config-tools.pl
```
</div>

## How do I convert Linode CentOS VPS to CloudLinux?

For CentOS 6, please do the following steps:

1. Install packages:

<div class="notranslate">

```
yum install kernel grub
```
</div>

2. Make sure that your _/boot/grub/grub.conf_ looks like this (if it does not exist, you should create it):

<div class="notranslate">

```
default=0
timeout=10
title CentOS Server (2.6.32-279.5.2)
root (hd0)
kernel /boot/vmlinuz-2.6.32-279.5.2.el6.i686 root=/dev/xvda ro
initrd /boot/initramfs-2.6.32-279.5.2.el6.i686.img
```
</div>

3. Create symlinks:

<div class="notranslate">

```
ln -s /boot/grub/grub.conf /boot/grub/menu.lst; ln -s /boot/grub/grub.conf /etc/grub.conf
```
</div>

Once you are done, in the Linode Manager, edit your Linode configuration profile to use `pv-grub-x86_64` (or 32-bit one if you use 32-bit arch) as the Kernel.

Make sure the root device is specified as `xvda`. Save your changes by clicking _Save Profile_ at the bottom of the page, and reboot your Linode from the _Dashboard_ tab.

## How do I view lveinfo for more than 10 users?

By default when you run `lveinfo`, it assumes `--limit=10`, and shows only top 10 results. So, if you want to see more, just add `--limit 1000` like:

<div class="notranslate">

```
# lveinfo --period=1d --limit 1000
```
</div>

Also, it is possible to create a graphical chart for the particular user. You can use this command:

<div class="notranslate">

```
# lvechart -u USERNAME --period=1d --width=12 -o chart-USERNAME.png
```
</div>

## How do I enable pygrub in HyperVM?

To enable `pygrub`, please go to _Advanced --> Append To Xen Config_ and enter the line:

<div class="notranslate">

```
bootloader = "/usr/bin/pygrub"
```
</div>

Then click _Update_ and reboot the VM. Also, change one line in VM _/boot/grub/grub.conf_ file: `root (hd0,0)` to `root (hd0)`

::: tip Note 
This is only for HyperVM ver2.0, pygrub is officially supported in ver2.2.x
:::

## How do I set/resize my AWS instance storage size?

Before starting your instance, you can choose storage size in the _Storage_ section.

If your instance is already running, please refer to Amazon's [official instruction](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-expand-volume.html)

## How to install and configure kdump to obtain vmcore?

If you have a non-responding server and no useful errors are shown in _/var/log/messages_, the way to find the reason is to install and configure `kdump`, so it will create a core dump file when the server hangs. In some cases `kdump` could not help on XEN PV machines, however, in any case, you should try it as on regular servers it is really doing a good job. Here are the steps to install and configure kdump:

1. Install kexec-tools:

<div class="notranslate">

```
yum install kexec-tools
```
</div>

Edit _/etc/kdump.conf_, and set the path variable to point to a directory with enough space to hold kernel dump file (default location is _/var/crash/_). File size will be about the size of the server RAM + 1GB.

2. Edit /etc/grub.conf.

For CloudLinux OS 6 add to the kernel line as another boot parameter or modify existing one:

<div class="notranslate">

```
crashkernel=160M (or crashkernel=auto)
```
</div>

For CloudLinux OS 7 edit _/etc/default/grub_ and add `crashkernel=auto` to `GRUB_CMDLINE_LINUX` parameter (or modify existing one) so it should look like this:

_`GRUB_CMDLINE_LINUX="crashkernel=auto rhgb quiet"`_

Here is the link to the official RHEL recommendation regarding the crashkernel value: [https://access.redhat.com/solutions/916043](https://access.redhat.com/solutions/916043)

Rebuild grub config file with the following command:

<div class="notranslate">

```
grub2-mkconfig -o /boot/grub2/grub.cfg
```
</div>

3. For CloudLinux OS 6 - add `kdump` to `chkconfig` and turn it **On** during boot:

<div class="notranslate">

```
chkconfig --add kdump
chkconfig kdump on
```
</div>

4. Modify _/etc/sysctl.conf_ file and add the following block to catch all possible panic states:

<div class="notranslate">

```
# Enable reboots on panic to allow kdump make dumps
kernel.sysrq=1
kernel.hung_task_panic = 1
kernel.panic = 1
kernel.panic_on_io_nmi = 1
kernel.panic_on_oops = 1
kernel.panic_on_stackoverflow = 1
kernel.panic_on_unrecovered_nmi = 1
kernel.softlockup_panic = 1
kernel.unknown_nmi_panic = 1
```
</div>

5. Reboot.
After the server boot check if kdump is running with:

<div class="notranslate">

```
service kdump status
```
</div>

Obtaining coredump if server hangs is described [here](/kb/HowDoI/#how-to-obtain-kdump-if-server-hangs).

## How To Obtain Vmcore When the Server is Unresponsive?

Assuming you already have kdump configured and functioning.

If you need to generate a coredump from a server without physical access to it, you may want to allow the kernel to call the panic routine when it receives an unknown non-maskable interrupt (NMI). In order to allow it, you have to edit _/etc/sysctl.conf_ and add the following line:

<div class="notranslate">

```
kernel.unknown_nmi_panic = 1
```
</div>

Apply changes with:

<div class="notranslate">

```
sysctl -p
```
</div>

To generate a core you may use some web-based 'KVM' services, most of them have the ability to send NMI to host. Another possible way in case of IPMI has been configured is to send unknown NMI with the `impitool` command:

<div class="notranslate">

```
ipmitool -I lan -H <hostname> chassis power diag
```
</div>

In the case of _`"BUG: soft lockup - CPU#7 stuck for 67s"`_ messages in _/var/log/message_, you need to switch `kernel.softlockup_panic` to `1` to have the core file created automatically. To achieve that, edit _/etc/sysctl.conf_ and insert the following line:

<div class="notranslate">

```
kernel.softlockup_panic = 1
```
</div>

Apply changes with:

<div class="notranslate">

```
sysctl -p
```
</div>

## How to upgrade CloudLinux OS 6 to CloudLinux OS 7?

There is no direct upgrade path from CloudLinux OS 6 to CloudLinux OS 7, therefore the only way is to move accounts to a new server with CloudLinux OS 7 installed.

This is due to the fact that a large number of 3rd party components (such as control panels) are installed on a typical CloudLinux OS 7 server, which makes it impossible to gracefully upgrade the OS without breaking control panels.

We will work to improving the situation in the future, yet it depends on the collaboration of control panel providers.

## How do I choose which kernel to boot on CloudLinux OS 7?

CloudLinux OS 7 brings GRUB2 with the totally new scheme of booting the kernels, the old edit file is not applicable anymore. The correct way to boot needed kernel (use an older kernel, CentOS kernel one or debug kernel) is with `grub2-set-default` command.

1. Take a needed kernel with :

<div class="notranslate">

```
$ awk -F\' '$1=="menuentry " {print i++ " =  "$2}' /etc/grub2.cfg
```

```
0 =  CloudLinux (3.10.0-427.18.2.lve1.4.27.el7.x86_64) 7.3 (Yury Malyshev)
1 =  CloudLinux (3.10.0-427.36.1.lve1.4.26.el7.x86_64) 7.3 (Yury Malyshev)
2 =  CloudLinux (3.10.0-427.18.2.lve1.4.24.el7.x86_64) 7.2 (Valeri Kubasov)
3 =  CloudLinux (0-rescue-1d7e5b9aa3bd48e99e108700e5458d82) 7.2 (Valeri Kubasov)
```
</div>

::: tip Note
The position of a menu entry in the list is denoted by a number starting with zero, so we are numbering it especially in a correct way.
:::

2. Set to boot needed kernel with command line:

<div class="notranslate">

```
$ grub2-set-default 1
```
</div>

Use the following command to check currently selected kernel to be booted:

<div class="notranslate">

```
$ grub2-editenv list
```

`saved_entry=1`

</div>

More information about customizing GRUB2 could be found in the [official RedHat guide](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/System_Administrators_Guide/sec-Customizing_the_GRUB_2_Configuration_File.html).

## Sharing more directories with single user account over CageFS

Due to a design CageFS mounts user homes as _/home/username_, no matter in which _/home2/ .. /homeN/_ user reside on a real system.

This could cause some PHP scripts to work incorrectly, however, CageFS has a mechanism to make any additional location with users content available from inside. This is also a quite useful way to share needed backup directories for users if you are giving FTP/SSH access to them. Also, you can use this feature to provide access to _/homeabc/username_ when _/home/username_ is a symlink to it.

To enable this feature the following line should be added to _/etc/cagefs/cagefs.mp_ file:

`%/homeabc`

Then remount all with:

<div class="notranslate">

```
cagefsctl --remount-all
```
</div>

After that, a user can see both his _/home/username_ and _/homeabc/username_ from CageFS inside. Other directories in _/homeabc_ as well as in _/home_ will be still hidden for him.

## How CPU usage is calculated?

How to prove CPU usage is correct and it shows real data with `lveinfo`? Let us explain how `lvetop` works before answering this question.

The `lvetop` utility, as well as `lveps -d`, show dynamic CPU (and other) usage, collected during 3 seconds period. Before iteration, the process gets running PIDs/threads (let's call them list1), and after iteration, it gets them again (list2). If the thread is in both list1 and list2 it will show some CPU%. If the thread is only in list1 but is not in list2, then it is shown as NA. All newly created threads that exist in list2 but are absent in list1 will not be shown.

Without '-d' key it shows static processes/threads that are running 'now'. The values in CPU column (yellow square in this example) are the number of seconds LVE/process/thread has been running. This is an increasing counter and is reset with a reboot or with `lvectl destroy UID/all`. Overall, it is not a trivial task to show all the processes that generate CPU usage for any LVE, and process accounting is not cheap for the system. To summarize - there is no way to prove CPU usage shown in `lveinfo`/`lvetop`, like for example [memory usage](/kb/HowDoI/#checking-personal-users-disk-cache-if-lveinfo-show-memory-usage-but-no-processes-there/):

## High iowait and/or load average when APC enabled in PHP Selector

If you are experiencing high iowait or high IO usage by single LVE or load average jumps after enabling APC, the most probable reason is due to the following directive in _/opt/alt/php5*/etc/php.d.all/apc.ini_:

<div class="notranslate">

```
apc.mmap_file_mask = /tmp/apc.shm.XXXXXX
```
</div>

There are internet articles related to the same subject, like [this]( http://serverfault.com/questions/361032/high-disk-i-o-when-cache-is-used). We decided to change it to _/dev/zero_ by default, the same will be applied to all new installations. For existing installs you have to edit each _/opt/alt/php5*/etc/php.d.all/apc.ini_ and then execute:

<div class="notranslate">

```
cagefsctl --rebuild-alt-php-ini
```
</div>

## Why alt-php.ini files become overwritten after Alt-PHP updates?

During Alt-PHP packages update, we don't rewrite _*ini_ files at all. Only two PHP variables are reset to the values from the native _php.ini_ file, they are `error_log` and `date.timezone`.

To prevent this situation, you should define `error_log` and `date.timezone` values in _/etc/cl.selector/global_php.ini_ file and run the following command to apply changes:

<div class="notranslate">

```
cagefsctl --setup-cl-selector
```
</div>

As a result, all settings from the files above will be taken for _*ini_ files for all versions inside PHP-Selector.  

The current incarnation of PHP Selector is that it will not overwrite Alt-PHP ini files if values in them are different from defaults as that could break websites functionality. You have to run a command with a key to overwrite them. Please find more information [here](/cloudlinux_os_components/#configuring-global-php-ini-options-for-all-alt-php-versions)

## How to patch PHP-FPM binary file?

This article describes how to apply our patches for PHP-FPM. First of all, you should download "PHP" archive (Note that this link will be different for each PHP version). In this case we will use PHP 5.4.45 version:

<div class="notranslate">

```
wget http://nl3.php.net/get/php-5.4.45.tar.gz/from/this/mirror
```
</div>

When download completed, rename, unpack and change its directory:

<div class="notranslate">

```
mv mirror.1 php-5.4.45.tar.gz
tar -zxvf php-5.4.45.tar.gz
cd php-5.4.45/
```
</div>

Then download the following package which contains all the necessary files to apply patches:

<div class="notranslate">

```
wget http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz
tar -zxvf cl-apache-patches.tar.gz
```
</div>

Before applying CloudLinux patches, please make sure that `liblve-devel` has already been installed into the system:

<div class="notranslate">

```
rpm -qa | grep liblve-devel
```
</div>

`liblve-devel-1.3-1.10.el6.cloudlinux.x86_64`

If not, please run:

<div class="notranslate">

```
yum install liblve-devel -y
```
</div>

On CloudLinux OS 7 server - install `systemd-devel`:

<div class="notranslate">

```
yum install systemd-devel
```
</div>

Apply patch:

<div class="notranslate">

```
patch -p1 < fpm-lve-php5.4.patch
```
</div>

If everything looks fine, please run the following commands to build it (CloudLinux OS 6):

<div class="notranslate">

```
autoconf 
./configure --enable-fpm
make
```
</div>

CloudLinux OS 7 requires `systemd` support:

<div class="notranslate">

```
autoconf
./configure --enable-fpm --with-fpm-systemd
make
```
</div>

When rebuild completed, find a new PHP-FPM binary file:

<div class="notranslate">

```
find . | grep php-fpm
```
</div>

`./sapi/fpm/php-fpm`

To make sure that it contains all our patches run:

<div class="notranslate">

```
strings ./sapi/fpm/php-fpm | egrep "jail|lve"
```
</div>

`liblve.so.0 lve_exit init_lve lve_jail_uid destroy_lve lve_enter_flags fpm_lve_enter fpm_lve_leave`

If everything looks fine, please rename the current PHP-FPM file:

<div class="notranslate">

```
which php-fpm
```
</div>

`/usr/local/sbin/php-fpm`

<div class="notranslate">

```
mv /usr/local/sbin/php-fpm /usr/local/sbin/php-fpm.old
```
</div>

And copy the new one:

<div class="notranslate">

```
cp /root/php-5.4.45/sapi/fpm/php-fpm /usr/local/sbin/
```
</div>

Then you need to restart PHP-FPM service to apply changes and check PHP info page.

## Different PHP versions per directories using suPHP

We had few requests to support different PHP versions per directory. While this is not available using PHP Selector UI, it is fairly simple to do manually. The important requirement is that PHP must be set to run in suPHP mode. Tested with cPanel, however it will work on any other server.

Here is quick how-to:

1. Configure handlers for different versions and point them to already provided `php-cgi` binaries, they all are visible from inside CageFS.

Add the following section to `handlers` section in _/opt/suphp/etc/suphp.conf_:

<div class="notranslate">

```
application/x-httpd-php52="php:/opt/alt/php52/usr/bin/php-cgi"
application/x-httpd-php53="php:/opt/alt/php53/usr/bin/php-cgi"
application/x-httpd-php54="php:/opt/alt/php54/usr/bin/php-cgi"
application/x-httpd-php55="php:/opt/alt/php55/usr/bin/php-cgi"
application/x-httpd-php56="php:/opt/alt/php56/usr/bin/php-cgi"
application/x-httpd-php70="php:/opt/alt/php70/usr/bin/php-cgi"
application/x-httpd-php71="php:/opt/alt/php71/usr/bin/php-cgi"
```
</div>

for EasyApache 4 you need to add handlers into _/etc/suphp.conf_ file.

2. Add suPHP handlers for each version, this should be done before other configs. On cPanel server, edit _/usr/local/apache/conf/includes/pre_virtualhost_global.conf_ and add the following section:

<div class="notranslate">

```
<IfModule mod_suphp.c>
<Directory />
suPHP_AddHandler application/x-httpd-php52
suPHP_AddHandler application/x-httpd-php53
suPHP_AddHandler application/x-httpd-php54
suPHP_AddHandler application/x-httpd-php55
suPHP_AddHandler application/x-httpd-php56
suPHP_AddHandler application/x-httpd-php70
suPHP_AddHandler application/x-httpd-php71
</Directory>
</IfModule>
```
</div>

3. Restart Apache:

<div class="notranslate">

```
# service httpd restart
```
</div>

That’s it, now Apache understands what binary should be used for different mime types. To use the desired version in a particular directory, just add a line to .htaccess in that directory (or create .htaccess file with that line, if it is not there). For example, for php5.4, add the following line:

<div class="notranslate">

```
AddHandler application/x-httpd-php54 .php .php5
```
</div>

Subdirectories will use the same PHP version as the parent unless you override it with another .htaccess entry in that subdirectory. To match PHP extensions selection with extensions selected by an end user for that PHP version in PHP Selector you have to follow [this article](/cloudlinux_os_components/#php-extensions). This is not an officially supported way to run multiple PHP per account, but it is a safe hack that will work for anyone using suPHP.

::: tip Note
There is one little trick that can be confusing. It applies only if you have PHP Selector enabled and you have non-native version selected there for a user. In that case, if the version that you assign through .htaccess is the same as ea-php version selected as system default version in WHM -> MultiPHP Manager -> System Default version, that version will not be applies, the version that you'll actually get will be the same as selected in PHP Selector.
:::

## Integrating LDAP users with CageFS

When using LDAP to store user data it requires additional configuration to work properly with CageFS. By default CageFS does not see LDAP user, like this:

<div class="notranslate">

```
# id adam
uid=16859(adam) gid=100(users) groups=100(users)
# cagefsctl --enable adam
Error: user adam does not exist
```
</div>

The problem is that in LDAP `pwd.getpwall()` function doesn't work by default:

<div class="notranslate">

```
# python -c 'import pwd; print pwd.getpwall()' | grep adam
#
# python -c 'import pwd; print pwd.getpwnam("adam")'
pwd.struct_passwd(pw_name='adam', pw_passwd='*', pw_uid=16859, pw_gid=100, pw_gecos='adam', pw_dir='/home/adam', pw_shell='/bin/bash')
```
</div>

To fix it you should set `enumerate=true` in _sssd.conf_ file:

`enumerate (bool) Determines if the domain can be enumerated. This parameter can have one of the following values: TRUE = Users and groups are enumerated FALSE = No enumerations for this domain Default: FALSE`

## How to activate inode usage displaying in cPanel?

::: warning
cPanel only
:::

LVE Manager inodes Limits extension allows you to set inodes limits for your customers. An inode is a data structure on a file system used to keep information about a file or a folder. The number of inodes indicates the number of files and folders an account has. inodes limits work on the level of system disk quota.

To display inode usage in user's panel the following should correspond:

1. System quotas enabled and working.

2. cPanel inode count is turned off in _WHM > Tweak settings_. 

3. `Show end-user inodes usage` option is enabled in _WHM > CloudLinux LVE Manager > Options_.

## How to fix cPanel mailing list archiving functionality when link traversal protection is enabled?

If [link traversal protection](/cloudlinux_os_kernel/#link-traversal-protection) is enabled on cPanel server, the mailman archiving feature stops working as it creates some internal symlinks in _/usr/local/cpanel/3rdparty/mailman/archives/private/listname_domain.com/_. You may notice the following error in _/usr/local/cpanel/3rdparty/mailman/logs/error_ file:

`Oct 19 23:49:21 2015 (532564) Uncaught runner exception: [Errno 2] No such file or directory Oct 19 23:49:21 2015 (532564) Traceback (most recent call last): File "/usr/local/cpanel/3rdparty/mailman/Mailman/Queue/Runner.py", line 119, in _oneloop self._onefile(msg, msgdata) File "/usr/local/cpanel/3rdparty/mailman/Mailman/Queue/Runner.py", line 190, in _onefile keepqueued = self._dispose(mlist, msg, msgdata) File "/usr/local/cpanel/3rdparty/mailman/Mailman/Queue/ArchRunner.py", line 73, in _dispose mlist.ArchiveMail(msg) File "/usr/local/cpanel/3rdparty/mailman/Mailman/Archiver/Archiver.py", line 216, in ArchiveMail h.processUnixMailbox(f) File "/usr/local/cpanel/3rdparty/mailman/Mailman/Archiver/pipermail.py", line 586, in processUnixMailbox self.add_article(a) File "/usr/local/cpanel/3rdparty/mailman/Mailman/Archiver/pipermail.py", line 623, in add_article self.new_archive(arch, archivedir) File "/usr/local/cpanel/3rdparty/mailman/Mailman/Archiver/pipermail.py", line 608, in new_archive self.open_new_archive(archive, archivedir) File "/usr/local/cpanel/3rdparty/mailman/Mailman/Archiver/HyperArch.py", line 1047, in open_new_archive os.symlink(self.DEFAULTINDEX+'.html',index_html) OSError: [Errno 2] No such file or directory`

To fix the issue you should add `mailman` user to `linksafe` group, so it could manage symlinks as needed:

<div class="notranslate">

```
usermod -a -G linksafe mailman
```
</div>

## How to mount a directory inside CageFS for particular users only?

The easiest way is to use [split](/cloudlinux_os_components/#split-by-username) approach. But it will work only if you add a username inside the directory you want to share:

<div class="notranslate">

```
$ mkdir /sharedir
$ ln -s /share_dir /sharedir/username
$ ln -s /sharedir/username /usr/share/cagefs-skeleton/share_dir
$ echo "%/sharedir" >> /etc/cagefs/cagefs.mp
$ cagefsctl --remount-all
```
</div>

Please note that first you create empty `sharedir` directory, and the actual content is located in `share_dir`

## How to add own comments to PHP versions in PHP Selector?

CloudLInux OS provides an opportunity to add custom comments to PHP versions, chosen with PHP Selector by users. Usually, they are used to notify users about outdated or recommended versions.

Upon forming a list of available versions `selectorctl` tool is looking for _/opt/alt/phpXX/name_modifier_ file to append it as a comment to a version.

To add your own comments - create a file for desired PHP version and write a text inside:

<div class="notranslate">

```
$ vi /opt/alt/php54/name_modifier
```
</div>

Do the same for other PHP versions. The changes are applied instantly. Make sure to add just a few words not to break dropdown list. The text will be shown in brackets in the LVEmanager UI:

<div class="notranslate">

```
$ selectorctl -i php --summary
```

```
4.4 e - Totally unsupported version  
5.1 - - Totally unsupported version  
5.2 - - Totally unsupported version  
5.3 e - Outdated version  
5.4 e - Outdated version  
5.5 e - Safe to use  
5.6 e d Supported version  
7.0 e - Recommended version  
native e -
```
</div>

## Running CloudLinux OS 7 with OVH server

Servers from OVH can require additional configurations after converting to CloudLinux OS 7. Also, use this KB article if you are getting the following warning with cldeploy:

`Invalid /etc/mdadm.conf file detected`

Complete checklist to successfully run CloudLinux OS 7 kernel.

1. Check for proper UUIDs and correct _mdadm.conf_ file formatting

Obtain UUIDs for RAID devices with `mdadm` utility:

<div class="notranslate">

```
$ mdadm --detail --scan
```

```
ARRAY /dev/md2 metadata=0.90 UUID=70160d35:1398d208:a4d2adc2:26fd5302
ARRAY /dev/md3 metadata=0.90 UUID=5ccb84a1:516cc4d3:a4d2adc2:26fd5302
ARRAY /dev/md5 metadata=0.90 UUID=ae269fab:c345c72d:a4d2adc2:26fd5302
```
</div>

Modify _/etc/mdadm.conf_ file to make it look like in the example below. Note that AUTO command is required.

<div class="notranslate">

```
$ vi /etc/mdadm.conf
```

```
MAILADDR root
AUTO +imsm +1.x -all
ARRAY /dev/md2 level=raid1 num-devices=2 UUID=70160d35:1398d208:a4d2adc2:26fd5302
ARRAY /dev/md3 level=raid1 num-devices=2 UUID=5ccb84a1:516cc4d3:a4d2adc2:26fd5302
ARRAY /dev/md5 level=raid1 num-devices=2 UUID=ae269fab:c345c72d:a4d2adc2:26fd5302
```
</div>


::: tip Note
It is only an example, you need to use ARRAY entries from output of mdadm --detail --scan command.
:::

2. Check for the proper command line in _grub.cfg_ file

Check if `net.ifnames=0 rd.auto=1` are present in _grub.cfg_ file:

<div class="notranslate">

```
$ grep "net.ifnames=0 rd.auto=1" /boot/grub2/grub.cfg
```
</div>

If no output returned, you have to edit default grub:

<div class="notranslate">

```
$ vi /etc/default/grub
```
</div>

And add those options to `cmdline`:

<div class="notranslate">

```
GRUB_CMDLINE_LINUX="net.ifnames=0 rd.auto=1"
```
</div>

Rebuild _grub.cfg_:

<div class="notranslate">

```
$ grub2-mkconfig -o /boot/grub2/grub.cfg
```
</div>

3. Check if RAID drivers added

Make sure _raid.conf_ contains all the required options. In most cases `$add_drivers` is missing:

<div class="notranslate">

```
$ vi /etc/dracut.conf.d/raid.conf
```
</div>

It should look as follows:

<div class="notranslate">

```
add_drivers="$add_drivers raid1 raid0"
```
</div>

Rebuild _initramfs_ file, change kernel version in the example above to the latest one installed on your server:

<div class="notranslate">

```
$ dracut -f /boot/initramfs-3.10.0-427.18.2.lve1.4.24.el7.x86_64.img 3.10.0-427.18.2.lve1.4.24.el7.x86_64
```
</div>

3. Check if RAID drivers added

Make sure _raid.conf_ contains all the required options. In most cases `$add_drivers` is missing:

<div class="notranslate">

```
$ vi /etc/dracut.conf.d/raid.conf
```
</div>

It should look as follows:

<div class="notranslate">

```
add_drivers="$add_drivers raid1 raid0"
```
</div>

Rebuild _initramfs_ file, change kernel version in the example above to the latest one installed on your server:

<div class="notranslate">

```
$ dracut -f /boot/initramfs-3.10.0-427.18.2.lve1.4.24.el7.x86_64.img 3.10.0-427.18.2.lve1.4.24.el7.x86_64
```
</div>

4. Optional, switch to UUIDs in _/etc/fstab_
Obtain block IDs for `md` devices:

<div class="notranslate">

```
$ blkid | grep md
```

```
/dev/md2: LABEL="/boot" UUID="d154fcbd-7802-47a6-8d49-4be2688eee73" TYPE="ext4"
/dev/md3: LABEL="/tmp" UUID="ea5e8258-7be3-42ea-984f-3e1fc83f35d1" TYPE="ext4"
/dev/md5: LABEL="/" UUID="7936780f-36cc-4c13-a59e-3e599ba847d2" TYPE="ext4"
```
</div>

Open _/etc/fstab_ and replace `md*` with UUIDs:

<div class="notranslate">

```
$ vi /etc/fstab
```

```
# <file system> <mount point> <type> <options> <dump> <pass>
UUID=7936780f-36cc-4c13-a59e-3e599ba847d2 / ext4 errors=remount-ro,usrquota 0 1
UUID=d154fcbd-7802-47a6-8d49-4be2688eee73 /boot ext4 errors=remount-ro 0 1
UUID=ea5e8258-7be3-42ea-984f-3e1fc83f35d1 /tmp ext4 defaults 1 2

proc /proc proc defaults 0 0
sysfs /sys sysfs defaults 0 0
tmpfs /dev/shm tmpfs defaults 0 0
devpts /dev/pts devpts defaults 0 0
```
</div>

5. Check if CloudLinux OS kernel is going to be booted with grub

If needed - choose CloudLinux OS kernel. Please follow [this article ](#how-do-I-choose-which-kernel-to-boot-on-CloudLinux-os-7). If you experience any issues during server boot with CloudLinux OS 7 kernel - reboot the server into rescue console and create a ticket at [https://cloudlinux.zendesk.com/hc/en-us/requests/new](https://cloudlinux.zendesk.com/hc/en-us/requests/new).

## Managing MySQL packages on cPanel server for MySQL Governor installed

If you have MySQL Governor installed, all MySQL upgrades and version changes should be changed using MySQL Governor tools, e.g. [https://docs.cloudlinux.com/cloudlinux_os_components/#change-mysql-version](/cloudlinux_os_components/#change-mysql-version)
 
On cPanel servers, when `mysqlgovernor.py --install` is executed, we create _/var/cpanel/rpm.versions.d/cloudlinux.versions_
 
The file is required to disable management of MySQL related packages provided by cPanel and allow MySQL Governor to manage them.
 
**Note**. When you have an own definition for MySQL* in _local.versions_ or _cloudlinux.version_ file does not exist you have to run the following commands to ensure cPanel is no longer managing MySQL:

<div class="notranslate">

```
/usr/local/cpanel/scripts/update_local_rpm_versions --edit target_settings.MySQL50 unmanaged
/usr/local/cpanel/scripts/update_local_rpm_versions --edit target_settings.MySQL51 unmanaged
/usr/local/cpanel/scripts/update_local_rpm_versions --edit target_settings.MySQL55 unmanaged
/usr/local/cpanel/scripts/update_local_rpm_versions --edit target_settings.MySQL56 unmanaged
/usr/local/cpanel/scripts/update_local_rpm_versions --edit target_settings.MariaDB100 unmanaged
```
</div>

If you want to restore the original cPanel-provided MySQL packages after removing MySQL Governor, please run the following commands:

<div class="notranslate">

```
/usr/local/cpanel/scripts/update_local_rpm_versions --del target_settings.MySQL50
/usr/local/cpanel/scripts/update_local_rpm_versions --del target_settings.MySQL51
/usr/local/cpanel/scripts/update_local_rpm_versions --del target_settings.MySQL55
/usr/local/cpanel/scripts/update_local_rpm_versions --del target_settings.MySQL56
/usr/local/cpanel/scripts/update_local_rpm_versions --del target_settings.MariaDB100
```
</div>

and then run:

<div class="notranslate">

```
/scripts/upcp --force
```
</div>

## How to run Redmine with Ruby Selector?

**Preface**

Redmine is a flexible project management web application written using Ruby on Rails framework. It is easy to install it using CloudLinux [Ruby Selector](https://www.cloudlinux.com/ruby-selector]. Follow [this guide](/cloudlinux_os_components/#installation-and-update-6) to install Ruby Selector. It works with CageFS, so make sure to enable it for the account. Redmine version described in installation instructions is different from Redmine version used. The example given describes the process for version 3.3.1. For other versions please refer to _doc/INSTALL_ file provided with downloaded Redmine archive or to the official [Installation Guide](http://www.redmine.org/projects/redmine/wiki/RedmineInstall).

**Setting up a working environment**

1. In cPanel (as a user) create MySQL database, create MySQL user and Add user to Database granting all privileges.

![create DB](/images/mceclip0.png)

![add user](/images/mceclip1.png)

![add privileges](/images/mceclip2.png)

2. Create a new application with 'Setup Ruby Application' menu, use Ruby version 2.3. Domain root or any subdirectory can be used.

![setup Ruby app](/images/mceclip3.png)

3. (**if you'd like to use GUI**) After the application created, add the following modules with the proper version for each.

`bundle, bundler#1.9.0, rails#4.2.7.1, bigdecimal#1.4.4, rake#12.3.2, mysql2#0.3.21`

![add GUI modules](/images/mceclip4.png)

Click _Update_. It will take about 2 minutes to have them and dependent modules installed.

(**if you'd like to use CLI**) Log in as a cPanel user (`redmine` in this example):

<div class="notranslate">

```
su -l -s /bin/bash redmine
selectorctl --interpreter=ruby --version 2.3 --user redmine --create-webapp redmine /
```
</div>

This will create a web app in _document_root/redmine_ (example : _/home/redmine/redmine_) under the primary domain URI (Example: http://redmine.com/). Next, you'll need to install extensions:

<div class="notranslate">

```
selectorctl --interpreter=ruby --enable-user-extensions=bundle,bundler#1.9.0,rails#4.2.7.1,bigdecimal#1.4.4,rake#12.3.2,mysql2#0.3.21 redmine
TITLE:bigdecimal#1.4.4
STATUS:OK
TITLE:bundle
STATUS:OK
TITLE:bundler#1.9.0
STATUS:OK
TITLE:rails#4.2.7.1
STATUS:OK
TITLE:rake#12.3.2
STATUS:OK
```
</div>

This will enable all necessary modules required by redmine (here _redmine_ is your app folder)

::: warning IMPORTANT 
Rails gem will update bundler to 2.0.1 version, which is not compatible with the current installation, so it is important to remove this version and leave 1.9.0 in place.
:::

<div class="notranslate">

```
selectorctl --interpreter=ruby --disable-user-extensions=bundler#2.0.1 redmine
```
</div>

::: tip Note
In case mysql2 installation results in error, install it as root:
:::

<div class="notranslate">

```
[root@192-168-245-55 redmine]# source /home/redmine/rubyvenv/redmine/2.3/bin/activate
(redmine:2.4)[root@192-168-245-55 redmine]# gem install mysql2 -v 0.3.21
Building native extensions.  This could take a while...
Successfully installed mysql2-0.3.21
Parsing documentation for mysql2-0.3.21
Installing ri documentation for mysql2-0.3.21
Done installing documentation for mysql2 after 0 seconds
1 gem installed
```
</div>

4. Install `ImageMagick-devel` for `rmagick` gem:

<div class="notranslate">

```
$ yum install ImageMagick-devel
```
</div>

**Deploying Redmine**

1. Log in to the server as a user (ssh or su -):

<div class="notranslate">

```
$ su -l -s /bin/bash redmine
```
</div>

2. Download the latest Redmine:

<div class="notranslate">

```
$ wget http://www.redmine.org/releases/redmine-3.3.1.tar.gz
```
</div>

3. Unpack it and move to the chosen application directory (_redmine_ in this example):

<div class="notranslate">

```
$ tar xfz redmine-3.3.1.tar.gz
$ cp -rp redmine-3.3.1/* redmine/
```
</div>

4. Fill out database credentials that we have created with cPanel:

<div class="notranslate">

```
$ cd redmine
$ cp config/database.yml.example config/database.yml
$ vi config/database.yml
```

```
production:
 adapter: mysql2
 database: redtest_db
 host: localhost
 username: redtest_user
 password: "my1passwd"
 encoding: utf8
```
</div>
 
5. Activate the Ruby environment:

<div class="notranslate">

```
$ source ~/rubyvenv/redmine/2.3/bin/activate
```
</div>

6. Make sure that you are in the app directory. Add the `bigdecimal` gem into _Gemfile_:

<div class="notranslate">

```
$ cd redmine
$ pwd
/home/redmine/redmine
nano Gemfile
```
</div>

Install the modules required by Redmine:

<div class="notranslate">

```
$ bundle install --without development test
```
</div>

Redmine stores session data in cookies by default, which requires a secret token to be generated. Do it and create database structure:

<div class="notranslate">

```
$ bundle exec rake generate_secret_token
$ bundle exec rake db:migrate RAILS_ENV="production"
```
</div>

**First login**

1. Open Redmine location URL in the browser. Use the default administrator account to log in: login: **admin** password: **admin**
2. Change your password to a new one with the proposed form.
3. Go to _Administration_ on the top, choose a preferred language and load the default configuration.

::: tip Note
After adding some other modules to an Application with cPanel interface you may need to restart the application, which can be done on the same Ruby Selector page.
:::
