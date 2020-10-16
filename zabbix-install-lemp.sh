yum update && yum upgrade -y
rpm -Uvh https://repo.zabbix.com/zabbix/4.4/rhel/7/x86_64/zabbix-release-4.4-1.el7.noarch.rpm
yum-config-manager --enable rhel-7-server-optional-rpms -y
yum install zabbix-server-mysql -y
yum install zabbix-web-mysql zabbix-nginx-conf -y
yum install epel-release -y
yum install zabbix-server-mysql -y
vi /etc/zabbix/zabbix_server.conf
systemctl enable zabbix-server nginx php-fpm
vi /etc/php-fpm.d/zabbix.conf
setsebool -P httpd_can_connect_zabbix on
setsebool -P httpd_can_network_connect_db on
setsebool -P zabbix_can_network on
rpm -ql zabbix-web | grep example.conf
vi /etc/php.ini
firewall-cmd --permanent --add-port=10050/tcp
firewall-cmd --permanent --add-port=10051/tcp
firewall-cmd --reload
systemctl start zabbix-server
systemctl enable zabbix-server
semodule -i zabbix-server.pp
chown -R nginx:nginx /var/lib/php/session
chown -R nginx:nginx /etc/zabbix/web
vi /etc/php-fpm.d/zabbix.conf
cd ~
curl https://support.zabbix.com/secure/attachment/53320/zabbix_server_add.te > zabbix_server_add.te
checkmodule -M -m -o zabbix_server_add.mod zabbix_server_add.te
semodule_package -m zabbix_server_add.mod -o zabbix_server_add.pp
semodule -i zabbix_server_add.pp
systemctl restart zabbix-server
nginx -t
nginx -s reload
systemctl restart zabbix-server
rpm -ql zabbix-web | grep example.conf
vi /etc/php-fpm.d/www.conf
systemctl restart zabbix-server
nginx -s reload
nginx -t
systemctl restart nginx
yum clean all
semodule -i zabbix_server_setrlimit.pp
checkmodule -M -m -o zabbix_server_add.mod zabbix_server_add.te
semodule_package -m zabbix_server_add.mod -o zabbix_server_add.pp
semodule -i zabbix_server_add.pp
semodule -i zabbix-server.pp
vi /etc/nginx/conf.d/zabbix.conf 
systemctl start zabbix-server
systemctl restart php-fpm
vi /etc/zabbix/zabbix_server.conf 
systemctl restart zabbix-server
systemctl restart php-fpm
nginx -s reload
nginx -t
systemctl restart nginx
yum install zabbix-agent -t
systemctl start zabbix-agent
systemctl enable zabbix-agent
systemctl status zabbix-server
yum update -y && yum upgrade -y
vi /etc/nginx/conf.d/zabbix.conf 
nginx -t
systemctl restart nginx
chown -R nginx:nginx /var/lib/php
systemctl restart php-fpm
nginx -s reload
