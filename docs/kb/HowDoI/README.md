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

1. In /etc/sysconfig/kernel should be the following lines:

UPDATEDEFAULT=yes DEFAULTKERNEL=kernel-xen
If the file does not exist, you should create it. 

2. Install grub if it is not installed:

yum install grub

3. Check /etc/modprobe.conf It usually contains the following:

cat /etc/modprobe.conf
alias eth0 xennet

alias scsi_hostadapter xenblk

If the file does not exist - create it, and then, in case you have not installed kernel yet - proceed to step 4.

In case you have already installed kernel: rebuild initrd image:

mkinitrd -f /boot/initrd-2.6.xxxx.img 2.6.xxxx
where 'xxxx' should be the same as you newly installed kernel-xen version and move to step 5.

4. Run

yum install kernel-xen

5. Run

ln -s /boot/grub/grub.conf /boot/grub/menu.lst
ln -s /boot/grub/grub.conf /etc/grub.conf
If /boot/grub/grub.conf does not exist, create it using the template in step 5, and repeat step 3. 5.

Run

rpm -qa|grep kernel
You should remove all kernels except Xen kernel. For example, if the output looks like this:

kernel-2.6.18-338.5.1.el5.lve0.8.25 kernel-xen-2.6.18-374.3.1.el5.lve0.8.44 kernel-headers-2.6.18-374.3.1.el5.lve0.8.44
then you should run

rpm -e --nodeps kernel-2.6.18-338.5.1.el5.lve0.8.25

6. Make sure your /etc/grub.conf looks like this:

default=0 timeout=10 title CloudLinux Server (2.6.18-374.3.1.el5.lve0.8.44xen) root (hd0,0) kernel /boot/vmlinuz-2.6.18-374.3.1.el5.lve0.8.44xen console=xvc0 root=/dev/sda1 ro initrd /boot/initrd-2.6.18-374.3.1.el5.lve0.8.44xen.img

::: tip Note
Mind the kernel version on vmlinuz and initrd, they should match the version of currently installed kernel.
:::

7. Switch to pygrub mode, and reboot the server. If you don't know how to switch in pygrub mode, contact your service provider, as they should be able to do it for you.

bootloader = '/usr/bin/pygrub'

##