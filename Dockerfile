# Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
# TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET

FROM node:6.9.0

RUN apt-get update && apt-get install -y xvfb chromium

COPY xvfb-chromium /usr/bin/xvfb-chromium
RUN chmod a+x /usr/bin/xvfb-chromium
ENV CHROME_BIN /usr/bin/xvfb-chromium
ENV DISPLAY :99

RUN mkdir -p /usr/src/tdmc-ui

# Add the actual source code to the container
COPY ./ /usr/src/tdmc-ui
WORKDIR /usr/src/tdmc-ui

# Pull all the deps
RUN npm install -g @angular/cli@1.0.0
RUN npm install

CMD ["/bin/bash"]
