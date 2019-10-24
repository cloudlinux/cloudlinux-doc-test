# Technology

## MySQL_ND (native driver) vs MySQL PHP extensions

MySQL_ND and MySQL PHP extensions are the different sets of drivers. They are provided by the different teams of developers (MySQL and PHP, respectively). The most important is the fact that they are mutually exclusive - you can not select them both simultaneously or mix them in any way. Otherwise, the php code will throw errors about the connection to the MySQL database.

Since PHP 5.4, mysqlnd is used as the default MySQL driver for all PHP MySQL extensions. But for PHP 5.3 and older PHP versions libmysqlclient is used as a connector from PHP to MySQL.
For PHP Selector we need to support both methods, that is why we added nd_* prefix for PHP MySQL extensions compatible with mysqlnd.

So, as a result:
- libmysqlclient works with  mysql, mysqli, pdo_mysql extensions (PHP 4.4 - PHP 5.3);
- mysqlnd works with nd_mysql, nd_mysqli, nd_pdo_mysql extensions (PHP 5.4 - PHP 7.1).

**So you have to choose only one of the following sets:**

```
mysqlnd
nd_mysql
nd_mysqli 
nd_pdo_mysql​
```

**or**

```
mysql
mysqli
pdo_mysql​
```

Also <span class="notranlate">_/etc/cl.selector/php.extensions.conflicts_</span> file provides the information about the mutually incompatible php extensions.