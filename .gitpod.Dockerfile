FROM gitpod/workspace-mysql

USER gitpod

RUN /bin/bash -c ". /home/gitpod/.sdkman/bin/sdkman-init.sh && sdk install node 18.18.0"

RUN /bin/bash -c ". /home/gitpod/.sdkman/bin/sdkman-init.sh && sdk flush archives && sdk flush temp"
