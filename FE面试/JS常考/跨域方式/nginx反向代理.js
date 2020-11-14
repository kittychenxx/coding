server{
    listen   80;
    server_name  192.168.161.189;

    #charset koi8-r;
    #access_log logs/host.access.log main;
    location /{
        proxy_pass http://192.168.161.189:8070;
            root html;
            index index.html index.htm;
    }
}