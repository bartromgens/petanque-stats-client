!#/bin/bash

ng build --prod
rsync -a dist/petanque-stats-client/ bartromgens@bartromgens.webfactional.com:/home/bartromgens/webapps/petanquestats_client
