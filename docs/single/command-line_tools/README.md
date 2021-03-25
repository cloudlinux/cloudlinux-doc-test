# Command-line tools (CLI)

The list of the commands (CLI) you can use to manage CloudLinux OS components.

* [Website monitoring tool and Slow Site analyzer](/command-line_tools/#website-monitoring-tool-and-slow-site-analyzer)
* [Other CLI tools](/command-line_tools/#other-cli-tools)

## Website Monitoring tool and Slow Site analyzer

### The cloudlinux-ssa-manager utility

The `cloudlinux-ssa-manager` utility allows to manage Slow Site analyzer via CLI.

**Usage**

```
# /usr/sbin/cloudlinux-ssa-manager [command] [--optional arguments]
```

**Optional arguments**:

| | |
|-|-|
|`-h`, `--help`|show help message and exit|

**Commands**:

| | |
|-|-|
|`set-config`|set the SSA configuration|
|`get-config`|get the SSA configuration|
|`get-ssa-status`|get a current status of SSA|
|`enable-ssa`|enable SSA|
|`disable-ssa`|disable SSA|
|`get-report`|get the latest report|

You can use the `-h`, `--help` option with commands to get a full list of available optional arguments for each command.

Example of the `/usr/sbin/cloudlinux-ssa-manager set-config --help` command output:

```
# /usr/sbin/cloudlinux-ssa-manager set-config --help
usage: cloudlinux-ssa-manager set-config [-h]
                                         [--domains-number DOMAINS_NUMBER]
                                         [--urls-number URLS_NUMBER]
                                         [--requests-duration REQUESTS_DURATION]
                                         [--request-number REQUEST_NUMBER]
                                         [--time TIME]
                                         [--correlation CORRELATION]
                                         [--correlation-coefficient CORRELATION_COEFFICIENT]
                                         [--ignore-list IGNORE_LIST]
optional arguments:
  -h, --help            show this help message and exit
  --domains-number DOMAINS_NUMBER
                        Size of TOP list for slow domains
  --urls-number URLS_NUMBER
                        Size of TOP list for slow urls
  --requests-duration REQUESTS_DURATION
                        The threshold value of request duration in seconds
  --request-number REQUEST_NUMBER
                        The threshold value of slow requests number in the
                        period of time to mark URL as a slow one
  --time TIME           Period of time in hours required to analyze these
                        requests
  --correlation CORRELATION
                        Flag to enable or disable correlation
  --correlation-coefficient CORRELATION_COEFFICIENT
                        The threshold value of correlation coefficient
  --ignore-list IGNORE_LIST
                        List of URLs or domains that should not be included in
                        the daily report
```

### The wmt-api utility

The `wmt-api` utility allows to manage Website Monitoring tool via CLI.

**Usage**

```
# /usr/share/web-monitoring-tool/wmtbin/wmt-api [command] [--optional arguments]
```

**Optional arguments**:

| | |
|-|-|
|`-h`, `--help`|show help message and exit|

**Commands**:

| | |
|-|-|
|`config-change`|set the WMT configuration using the JSON string that follows|
|`config-get`|get the WMT configuration as JSON|
|`email-get`|get WMT email from the config file|
|`report-generate`|Generate a report JSON file|
|`send-clickhouse`|Send the summary report to ClickHouse|
|`start`|Start the WMT system|
|`status`|Check the status of the WMT system|
|`stop`|Stop the WMT system|

Example of the `/usr/share/web-monitoring-tool/wmtbin/wmt-api` command usage:

```
# /usr/share/web-monitoring-tool/wmtbin/wmt-api -config-change "{\"ping_connections\":8,\"report_top\":5,\"report_email\":\"user@example.com\"}"
```

This way you can set all or only certain parameters.

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
