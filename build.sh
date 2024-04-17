#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

# BUILD AND PUBLISH OBLJUBA DELA DOLG
sudo docker build -f backend/izvoli/Dockerfile -t izvoli:latest .
sudo docker tag izvoli:latest rg.fr-par.scw.cloud/djnd/izvoli:latest
sudo docker push rg.fr-par.scw.cloud/djnd/izvoli:latest