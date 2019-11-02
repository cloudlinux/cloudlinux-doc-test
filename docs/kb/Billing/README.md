# Billing and Licensing

## General

- **How do I become a CloudLinux partner?**

Becoming a CloudLinux partner is easy, see details on our partner program on the link: [http://www.cloudlinux.com/partners/](http://www.cloudlinux.com/partners/)

- **Can I sell CloudLinux to my dedicated server/VPS customers?**

We have partner program for datacenters & dedicated server/VPS providers. You can find more information on the link:

[http://www.cloudlinux.com/partners](http://www.cloudlinux.com/partners)

- **Where can I buy CloudLinux? How much does it cost?**

You can buy it on the [link](https://cln.cloudlinux.com/console/purchase/cloudlinux/acquire?cl=1)
You can start a trial or get pricing information by following the [link](https://www.cloudlinux.com/all-products/try-or-buy)

- **Where can I get server with CloudLinux?**

CloudLinux OS is available as an add-on from our [partners](https://www.cloudlinux.com/partners/overview/find-a-partner)

- **What is the refund policy?**

We provide 30 days refund policy.

If within thirty (30) days of your payment for CloudLinux Programs (I) you do not agree to the terms of the CloudLinux License Agreement, or (II) you become entitled to a refund of Program license fees pursuant to the exclusive remedy set forth in the CloudLinux License Agreement, and you paid for CloudLinux Programs by credit card, then CloudLinux will credit your credit card account upon certification that all CloudLinux Programs have been removed from your computer system. Contact billing@cloudlinux.com if you are entitled to a refund.

- **Can I use your products on systems behind NAT?**

You can use our products with a public IP-address or 1:1 NAT. IP-address can be checked with the following command:

<div class="notranslate">

```
curl https://cloudlinux.com/showip.php
```
</div>

## CLN User Interface

- **How do I start a trial?**

A trial can be started only once for each product in an account. The trial period is 30 days. You can register one server for CloudLinux OS and Imunify360 trials and unlimited number of servers for KernelCare licenses. A trial can be started from _Dashboard_ tab which is the default tab in CLN UI.

- **Where can I find my server licenses?**

Server licenses can be found on the _Dashboard_ tab. Each purchased product has a number of used/total server licenses specified in its box.

- **Where can I find my servers?**

Servers can be found in _Servers_ left sidebar menu of the _Dashboard_ tab. This tab is the default tab of CLN UI. Servers can also be found by clicking the corresponding activation key in _Activation Keys_ left sidebar menu in products' tabs.

- **Which payment methods are available? Where can I add/update payment methods?**

PayPal and credit card are the payment methods available. They can be set in _Payment methods_ left sidebar menu of the _Billing_ tab.

- **Where can I update my CLN password?**

This can be found on _Personal Information_ tab of _Account details_ page. You can get to this page by clicking your account name at the top right of CLN UI and choosing Settings in the pop-up menu.

- **What do I use as a login for CLN?**

You can use either your email or CLN login name. CLN logins have to be unique.

- **What are the sub-logins?**

Sub-logins are additional logins that can be used to access an account. The privilege level is actually the same for primary login and sub-logins. Sub-logins can only exist in form of email address.

- **Where can I find my invoices? How can I pay off my debt?**

Invoices can be found in _Invoices_ left sidebar menu of _Billing_ tab. You can pay a debt by clicking _Pay Now_ button on _Invoices_ page.

- **How can I purchase a server license?**

This can be done on _Purchase_ sidebar menu of _Billing_ tab.

- **How can I configure report mailing?**

This can be set on _Billing information_ tab of _Payment methods_ sidebar menu on _Billing_ tab.

- **How can I submit a ticket with technical support?**

This can be done by clicking _Submit ticket_ on the left sidebar menu (_Help_ section).

- **How can I create/manage an activation key?**

You can create/manage activation keys only for products that have purchased licenses or an active trial. Activation key management is performed in the corresponding product’s tab (available at the top of the page). You can generate a new activation key, set server limit for it, add a note and remove a key. It is also possible to set IP range and enable Sticky tag for KernelCare keys.

- **Which activation keys are shown in my dashboard upon logging to CLN UI?**

Those are the default activation keys for each product.

- **What is a default activation key?**

A default activation key is generated automatically on server license purchase for each product.

- **Is it possible to have Paypal and Credit Card payment methods set up at the same time?**

No, you have to choose one payment method to be active in a single CLN account.

- **How to add another product to my CLN account?**

All the purchases are done the same way — adding a product to a cart and proceeding with the checkout. Each subscription type will have its own invoice generated every month/year. For example, KernelCare, CloudLinux OS, Imunify360 single-user and Imunify360 unlimited user will all have separate invoices generated every billing period.

- **Where can I update my personal and company information?**

Personal information and Password can be set in _Personal Information_ tab of _Account details_ left sidebar menu (see _Your Login → Settings_ at the top right). Company Information can be set in _Account details_ menu as well.

- **How do I cancel a license?**

If you wish to continue using XX license(s) only, you need to cancel the unused one(s). To cancel the subscription for unused license(s), do the following, please:

1. Login to your CLN account
2. Click on _Dashboard -> CloudLinux OS/KernelCare OS/Imunify360 OS_
3. Click on _Manage servers_ -> select the server that is no longer needed
4. Click on _CloudLinux OS/KernelCare OS/Imunify360 OS_ -> _Remove unused server licenses_

Please, note that **step 4** results in removing the unused license and stopping the billing for that license. 

::: danger
If step 4 is not performed, the license will remain active and must be paid for regardless it's in use or not.
:::

- **Where can I get API username and password for WHMCS plugin?**

To setup WHMCS plugin you need to enter your API username and password, which can be done in:

WHMCS Module Settings > CloudLinux Licenses.

Please note, the access to the CloudLinux API is available to the reseller level accounts only.

The "username" here is your cln.cloudlinux.com login.

The "password" is the IP secret key from _Personal Information_ tab at [https://cln.cloudlinux.com/console/profile/details](https://cln.cloudlinux.com/console/profile/details)

CloudLinux WHMCS plugin documentation PDF file is available at [http://repo.cloudlinux.com/plugins/whmcs-cl-docs-latest.pdf](http://repo.cloudlinux.com/plugins/whmcs-cl-docs-latest.pdf)

- **How can I add CloudLinux OS activation keys when I became a reseller?**

As an IP partner, you cannot create activation keys.

You need to add server IP into the partner interface, and then use:

```
# sh cldeploy.sh -i
```

to convert the server to CloudLinux OS;

or

```
# clnreg_ks --force
```

to register an existing server.

::: tip Note
This works only with servers with public IP address or 1:1 NAT.
:::

### **How do I move a license from one server to another?**

To move a license from one server to another, do the following:

1) Log in to [https://cln.cloudlinux.com](https://cln.cloudlinux.com);
2) Choose _Dashboard_ at the top menu and click on _Servers_ on the left hand side;
3) Delete an old server;
4) Click on the product name at the top menu;
5) Pick a key with 'Usage' like 0/1 or any other key where usage is smaller than the total (the syntax is usage/total);
6) Use that key to register a new server according to the product documentation.

## Troubleshooting

- **I have been billed for a higher amount of licenses than I have in my account. What is the reason for that?**

This might happen when you have added additional licenses to active subscriptions. So, as you are not charged for these licenses immediately, the charge is added as a prorated price to the next due invoice along with the renewal price of the total number of active licenses. This is the reason the amount billed is higher.

- **What is the reason for the error: You can register the IP: X.X.X.X under a paid license only.**

This can happen when you are trying to register a server using a trial license but the trial license has already been used for this IP, which is the reason why only a paid license is allowed for the registration. If you are sure you are using a trial license for the first time, please contact the Billing department for further assistance at [https://cloudlinux.zendesk.com](https://cloudlinux.zendesk.com).

- **What should I do if there’s a problem with visa/MasterCard or PayPal payment?**

If, for any reason, the payment via the selected payment method has failed, please try again several minutes later. If the problem persists, use one of the alternative methods (a credit/debit card, PayPal, or PayPal Express Checkout), or contact the Billing department for further assistance at [https://cloudlinux.zendesk.com](https://cloudlinux.zendesk.com).

There can be lots of reasons for the decline of the payment, starting from the inactive card to insufficient funds on the card balance, etc. Each case requires an investigation on the Billing side, which is the reason the Billing will help to fix the issue faster. Also, you may see an error with a general description while we can get more details from our payment provider. Possible reasons include but not limited to:

  - Expired card.
  - The card hasn't been confirmed yet.
  - PayPal agreement has been canceled.
  - Card declined by issuer — contact card issuer to determine the reason.
  - Card reported lost or stolen — contact card issuer for resolution‌.

- **What to do in case invoice has multiple products but only one was paid after clicking Pay now?**

If you have more than one outstanding invoice and only one of them has been paid while you intended to settle all unpaid invoices, you will need to contact the Billing department for further clarification at [https://cloudlinux.zendesk.com](https://cloudlinux.zendesk.com). In most cases, it means that there might be no balance on your card or PayPal account left or the payment hasn't been completed due to technical problems, which requires a further investigation on our side.

- **What to do if my account is blocked due to a debt?**

If your account has been blocked due to non-payment, you will receive a billing notification with instructions on how to settle the debt and unlock the account via email. The billing notification will also contain the alternative payment link that you can use for a quick payment. If the problem persists, please contact the Billing department at [https://cloudlinux.zendesk.com](https://cloudlinux.zendesk.com) for further assistance and investigation.

- **CloudLinux Network Status Report: Systems Not Checking In (for CloudLinux OS)**

If you receive an email saying that your system failed to check in, like:

<div class="notranslate">

```
Systems Not Checking In:
-------------------------
The following systems recently stopped checking in with CloudLinux Network:

System Id System Name Last Checkin
11111111 server1.hostcompany.com 2011-05-10 20:39:20.0
```
</div>

It means that for some reason, system server1.hostcompany.com hasn't checked in to CLN. If that server is still in use, try running:

<div class="notranslate">

```
/usr/sbin/rhn_check
```
</div>

If you don't get any output - everything is good and you can ignore it.  If you get some message, it most probably means that system cannot connect to CLN. Create a trouble ticket and our support will check the reason from inside.

- **An error when registering the server: Maximum usage count of 1 reached**

If you want to use the license on another server or reuse it on the same server after reinstalling, you need to remove the server from CLN and then register the license on your new server.

You may use [the following](/kb/Billing/#how-do-i-move-a-license-from-one-server-to-another) as a reference to remove the server from CLN.

::: tip Note
Don't remove the license, remove only the server.
:::