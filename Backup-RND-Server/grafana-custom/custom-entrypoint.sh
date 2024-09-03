#!/bin/bash

# Set the custom login title
sed -i 's/^;\?\(login_title = \).*$/\1Your Custom Login Title/' /etc/grafana/grafana.ini

# Execute the original entrypoint
exec /run.sh "$@"
