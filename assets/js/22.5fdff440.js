(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{451:function(e,a,t){"use strict";t.r(a);var r=t(0),n=Object(r.a)({},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"kernelcare"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kernelcare"}},[e._v("#")]),e._v(" KernelCare")]),e._v(" "),t("h2",{attrs:{id:"kernelcare-installation-management-and-uninstall"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kernelcare-installation-management-and-uninstall"}},[e._v("#")]),e._v(" KernelCare installation, management and uninstall")]),e._v(" "),t("p",[e._v("KernelCare installation instructions are straightforward and are summarized on the following page: "),t("a",{attrs:{href:"https://www.kernelcare.com/install-kernelcare/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://www.kernelcare.com/install-kernelcare/"),t("OutboundLink")],1)]),e._v(" "),t("p",[e._v("To uninstall KernelCare just execute:")]),e._v(" "),t("div",{staticClass:"notranslate"},[t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("yum remove kernelcare\n")])])])]),e._v(" "),t("p",[e._v("KernelCare is set to check for updates, and update the kernel every 4 hours. If you want to run the update manually, execute as root:")]),e._v(" "),t("div",{staticClass:"notranslate"},[t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/usr/bin/kcarectl --update\n")])])])]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("How Can I disable automatic updates?")])])]),e._v(" "),t("p",[e._v("Edit file "),t("em",[e._v("/etc/sysconfig/kcare/kcare.conf")])]),e._v(" "),t("div",{staticClass:"notranslate"},[t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Set AUTO_UPDATE=False\n")])])])]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("How can I see the 'updated' version of the kernel?")])])]),e._v(" "),t("p",[e._v("Run:")]),e._v(" "),t("div",{staticClass:"notranslate"},[t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/usr/bin/kcarectl --uname\n")])])])]),e._v(" "),t("p",[e._v("We provide convenience script "),t("em",[e._v("/usr/bin/kcare-uname")]),e._v(" that has the same syntax as uname.")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("How can I see which patches were applied to my kernel?")])])]),e._v(" "),t("p",[e._v("Execute as root:")]),e._v(" "),t("div",{staticClass:"notranslate"},[t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/usr/bin/kcarectl --patch-info\n")])])])]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Is KernelCare software released under open source?")])])]),e._v(" "),t("p",[e._v("The kernel module is released under GPL2, and you can download it here: "),t("a",{attrs:{href:"http://downloads.kernelcare.com/kmod_kcare.tar.gz",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://downloads.kernelcare.com/kmod_kcare.tar.gz"),t("OutboundLink")],1)]),e._v(" "),t("p",[e._v("Other components are distributed in binary format only under KernelCare License")]),e._v(" "),t("h2",{attrs:{id:"why-uname-is-showing-the-old-kernel-version-after-kernelcare-patches-applied"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#why-uname-is-showing-the-old-kernel-version-after-kernelcare-patches-applied"}},[e._v("#")]),e._v(" Why uname is showing the old kernel version after KernelCare patches applied?")]),e._v(" "),t("p",[e._v("The "),t("strong",[e._v("uname")]),e._v(" command always shows the same kernel version as before installing KernelCare. The reason we don't change the output of the uname command is due to the fact that we don't change original kernel signature or ABI with KernelCare. Yet, many install scripts depend on uname output to decide which modules to install or which header files to use for compilation.")]),e._v(" "),t("p",[e._v("As such, changing the output of uname will create a lot of issues.")]),e._v(" "),t("p",[e._v("You can get 'effective' kernel uname info by running:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("kcare-uname\n")])])]),t("h2",{attrs:{id:"what-ips-to-whitelist-for-the-proper-kernelcare-work"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-ips-to-whitelist-for-the-proper-kernelcare-work"}},[e._v("#")]),e._v(" What IPs to whitelist for the proper KernelCare work?")]),e._v(" "),t("p",[e._v("Generally, KernelCare requires http(s) connection to two servers for the proper work:")]),e._v(" "),t("p",[t("code",[e._v("cln.cloudlinux.com")])]),e._v(" "),t("p",[t("code",[e._v("patches.kernelcare.com")])]),e._v(" "),t("p",[e._v("As of November 2019, their IPs are:")]),e._v(" "),t("p",[e._v("69.175.3.9")]),e._v(" "),t("p",[e._v("69.175.106.203")]),e._v(" "),t("h2",{attrs:{id:"cpanel-whm-is-asking-for-a-reboot-while-kernelcare-is-used"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cpanel-whm-is-asking-for-a-reboot-while-kernelcare-is-used"}},[e._v("#")]),e._v(" cPanel/WHM is asking for a reboot while KernelCare is used")]),e._v(" "),t("p",[t("strong",[e._v("Problem:")]),t("br"),e._v("\nWHM/cPanel is asking for a reboot to apply the kernel updates.")]),e._v(" "),t("p",[t("strong",[e._v("Synopsis:")]),t("br"),e._v("\nIf you're using KernelCare, you don't need reboot the server after a kernel update because all security patches from the latest kernel are applied to a running kernel. But WHM/cPanel compares running kernel with boot kernel (the one selected as default in GRUB) as strings, so they have to match exactly, otherwise \"reboot required\" banner is shown. There are two known cases when this produce false-positives:")]),e._v(" "),t("ol",[t("li",[e._v("KernelCare applied patch that changed effective kernel version but new kernel package has not yet been installed by yum. In this case running kernel is newer than boot kernel, but since versions don't match as strings, WHM/cPanel shows the banner.")]),e._v(" "),t("li",[e._v("For some reason, a specific kernel version is chosen as default in GRUB and this is not the latest version. This can be fixed by running "),t("code",[e._v("grub2-set-default 0")]),e._v(" command.")])]),e._v(" "),t("p",[e._v("WHM/cPanel developers are aware of this and working on the fix, but currently, there is no ETA.")]),e._v(" "),t("p",[t("strong",[e._v("Diagnostics:")])]),e._v(" "),t("p",[e._v("If you want to make sure you are safe, please run the following commands:")]),e._v(" "),t("div",{staticClass:"notranslate"},[t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("# kcarectl --update\n# kcarectl --uname\n")])])])]),e._v(" "),t("p",[e._v("If no errors were reported, you should be running the latest available kernel. Last command prints effective kernel version.")]),e._v(" "),t("p",[e._v("There is another command to check what WHM/cPanel thinks about kernels:")]),e._v(" "),t("div",{staticClass:"notranslate"},[t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("# /usr/local/cpanel/3rdparty/bin/perl -e 'use Cpanel::Kernel::Status; use Data::Dumper; my $kernel = Cpanel::Kernel::Status::kernel_status(); print Dumper \\$kernel;'\n")])])])]),e._v(" "),t("p",[e._v("Sample output:")]),e._v(" "),t("div",{staticClass:"notranslate"},[t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$VAR1 = \\{\n  'unpatched_version' => '3.10.0-714.10.2.lve1.4.63.el7.x86_64',\n  'running_version' => '3.10.0-714.10.2.lve1.4.65.el7',\n  'reboot_required' => 1,\n  'running_latest' => '',\n  'boot_version' => '3.10.0-714.10.2.lve1.4.63.el7.x86_64',\n  'has_kernelcare' => 1\n};\n")])])])]),e._v(" "),t("p",[e._v("Here you can see that "),t("strong",[e._v("boot_version")]),e._v(" is older than "),t("strong",[e._v("running_version")]),e._v(", yet "),t("strong",[e._v("reboot_reqired")]),e._v(" is set to "),t("strong",[e._v("1")]),e._v(", which means a banner will be shown. In fact, reboot is NOT required in this particular case.")])])},[],!1,null,null,null);a.default=n.exports}}]);