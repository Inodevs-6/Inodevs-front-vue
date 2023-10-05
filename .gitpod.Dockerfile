FROM gitpod/workspace-mysql

USER gitpod

RUN /bin/bash -c ". /home/gitpod/.sdkman/bin/sdkman-init.sh && sdk install node 16"

RUN /bin/bash -c ". /home/gitpod/.sdkman/bin/sdkman-init.sh && sdk flush archives && sdk flush temp"
