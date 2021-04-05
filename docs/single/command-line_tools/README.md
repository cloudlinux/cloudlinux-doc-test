# Command-line tools (CLI)

The list of the commands (CLI) you can use to manage CloudLinux OS components.

* [Website monitoring tool and Slow Site analyzer](/command-line_tools/#website-monitoring-tool-and-slow-site-analyzer)
* [Other CLI tools](/command-line_tools/#other-cli-tools)

## Website Monitoring tool and Slow Site analyzer

### The cloudlinux-ssa-manager utility



### The wmt-api utility



## Other CLI tools


* [cldeploy](/command-line_tools/#cldeploy)


### cldeploy

<span class="notranslate">`sh cldeploy --help`</span>

Usage:

| | |
|--|--|
|<span class="notranslate">`-h, --help`</span>|Print this message|
|<span class="notranslate">`-k, --key &lt;key&gt;`</span>|Update your system to CloudLinux with activation key|
|<span class="notranslate">`-i, --byip`</span>|Update your system to CloudLinux and register by IP|
|<span class="notranslate">`-c, --uninstall`</span>|Convert CloudLinux back to CentOS|
|<span class="notranslate">`--serverurl`</span>|Use non-default registration server (default is `https://xmlrpc.cln.cloudlinux.com/XMLRPC`)|
|<span class="notranslate">`--components-only`</span>|Install control panel components only|
|<span class="notranslate">`--conversion-only`</span>|Do not install control panel components after converting|
|<span class="notranslate">`--skip-kmod-check`</span>|Skip check for unsupported kmods|
|<span class="notranslate">`--skip-version-check`</span>|Do not check for script updates|
|<span class="notranslate">`--skip-registration`</span>|Don't register on CLN if already have access to CL repository|

The script will install the following to the server:

1. Register server with CLN.
2. Attempt to detect control panel

* To disable installation of CloudLinux Manager, please use <span class="notranslate">`--conversion-only`</span> option.

* To disable CLN registration, please use <span class="notranslate">`--components-only`</span> option.


Examples:

<div class="notranslate">

```
$ cldeploy --key xx-xxxxxx                            # convert RHEL/CentOS to CL by using activation key, install control panel components
$ cldeploy --byip --conversion-only                   # convert RHEL/CentOS to CL by ip, don't install control panel components
$ cldeploy --components-only                          # install control panel components on already converted system
```
</div>
